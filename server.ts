import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  app.post("/api/notify", (req, res) => {
    const { type, data } = req.body;
    if (type === 'contact') {
      const recipient = contactDirectory[data?.recipientId] ?? null;
      console.log('[NOTIFICATION] Incoming contact lead:', {
        senderName: data?.senderName,
        senderEmail: data?.senderEmail,
        senderPhone: data?.senderPhone,
        projectType: data?.projectType,
        message: data?.message,
        recipient,
        channel: data?.channel
      });
    } else {
      console.log(`[NOTIFICATION] ${type}:`, data);
    }
    // In a real app, hook this data to your email / whatsapp provider here
    res.json({ success: true, message: "Notification logged" });
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
