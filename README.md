<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/aa531873-5933-490c-8d09-f8433772cd74

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Contact form delivery

The contact form now routes messages directly from the browser:

- Gmail deliveries go through [EmailJS](https://www.emailjs.com/). Configure your EmailJS service/template/public key and add the values below; the form sends every field (name, email, phone, project type, message) to the selected founder.
- Phone/WhatsApp deliveries open a `wa.me` link pre-filled with the same details; the user can then tap to send the WhatsApp message.

```
VITE_EMAILJS_SERVICE_ID=your_emailjs_service
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

If the EmailJS keys are missing, the form will still record the lead in Firestore, but Gmail delivery will not work and an error message will be shown to the user.
