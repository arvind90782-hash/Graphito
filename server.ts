import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  const contactDirectory = {
    arman: {
      name: 'Arman Ali',
      email: 'contact@graphitoagency.com',
      phone: '+91 7705090700'
    },
    editor: {
      name: 'Editor Nishant',
      email: 'arvind90782@gmail.com',
      phone: '+91 9277072409'
    }
  };

  const channelLabels: Record<string, string> = {
    email: 'Email',
    phone: 'Phone / WhatsApp'
  };

  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL ?? 'contact@graphitoagency.com';
  const sendgridFromName = process.env.SENDGRID_FROM_NAME ?? 'Graphito Contact';
  const sendgridEnabled = Boolean(sendgridApiKey && sendgridFromEmail);

  app.post("/api/notify", async (req, res) => {
    const { type, data } = req.body ?? {};
    if (type !== 'contact') {
      console.warn('Unsupported notification type', type);
      return res.status(400).json({ success: false, error: 'Unsupported notification type' });
    }

    const recipientId = data?.recipientId ?? 'arman';
    const recipient = contactDirectory[recipientId] ?? contactDirectory.arman;
    const projectType = (data?.projectType ?? 'General').toString().replace(/-/g, ' ');
    const channel = (data?.channel as string) ?? 'email';
    const channelLabel = channelLabels[channel] ?? channel;
    const senderName = data?.senderName ?? 'Visitor';
    const senderEmail = data?.senderEmail ?? 'not provided';
    const senderPhone = data?.senderPhone ?? 'not provided';

    console.log('[NOTIFICATION] Incoming contact lead:', {
      senderName,
      senderEmail,
      senderPhone,
      projectType,
      message: data?.message,
      recipient,
      channel: channelLabel
    });

    const subject = `Graphito: ${projectType} request from ${senderName}`;
    const htmlBody = `
      <h2>New Graphito contact</h2>
      <p><strong>Recipient:</strong> ${recipient.name} (${channelLabel})</p>
      <p><strong>Project type:</strong> ${projectType}</p>
      <p><strong>Message:</strong><br/>${(data?.message ?? '—').toString().replace(/\n/g, '<br/>')}</p>
      <div style="margin-top:16px;">
        <p><strong>Sender name:</strong> ${senderName}</p>
        <p><strong>Sender email:</strong> ${senderEmail}</p>
        <p><strong>Sender phone:</strong> ${senderPhone}</p>
      </div>
    `;
    const textBody = `
      Recipient: ${recipient.name} (${channelLabel})
      Project type: ${projectType}
      Message: ${(data?.message ?? '—')}
      Sender name: ${senderName}
      Sender email: ${senderEmail}
      Sender phone: ${senderPhone}
    `;

    let emailResponse: { success: boolean; details?: Record<string, unknown> } = { success: false };
    if (sendgridEnabled) {
      try {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sendgridApiKey}`
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: recipient.email, name: recipient.name }],
                subject
              }
            ],
            from: {
              email: sendgridFromEmail,
              name: sendgridFromName
            },
            reply_to: {
              email: senderEmail,
              name: senderName
            },
            content: [
              { type: 'text/plain', value: textBody },
              { type: 'text/html', value: htmlBody }
            ]
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`SendGrid error ${response.status}: ${errorText}`);
        }

        emailResponse = { success: true };
      } catch (emailError) {
        console.error('Unable to send contact email', emailError);
        return res.status(502).json({ success: false, error: 'Email delivery failed' });
      }
    } else {
      console.warn('SENDGRID_API_KEY missing; email not sent');
    }

    res.json({
      success: true,
      emailSent: emailResponse.success,
      recipient: {
        id: recipientId,
        name: recipient.name,
        email: recipient.email,
        phone: recipient.phone
      },
      emailChannel: channelLabel
    });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true'
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
