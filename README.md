# Joel Laggui Jr.'s Portfolio with the Visual Studio Code Theme

## Table of Contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
- [How to Use](#how-to-use)
- [Make It Your Own](#make-it-your-own)
- [Deploy on Vercel](#deploy-on-vercel)
- [EmailJS Implementation](#emailjs-implementation)
- [Author](#author)

---

## Overview

### Screenshot

![](./public/assets/My%20Portfolio.png)

### Links

- **Live Demo**: [https://joellaggui.vercel.app/](https://joellaggui.vercel.app/)

---

## My Process

### Built With

- [Vite](https://vitejs.dev/) – Frontend build tool
- [React](https://reactjs.org/) – JavaScript library for building UIs
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript
- [Chakra UI](https://chakra-ui.com/) – Component library for styling
- [EmailJS](https://www.emailjs.com/) – For email sending functionality
- [Formik](https://formik.org/) – For form handling

---

## How to Use

1. **Fork** this repository to your GitHub account.
2. **Clone** the forked repository:
   ```bash
   git clone https://github.com/GITLAGGUI/Official-Portfolio.git
   ```
3. Navigate to the project folder:
   ```bash
   cd Official-Portfolio
   ```
4. Install all dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and go to [http://localhost:5173](http://localhost:5173) to view your local version.

---

## Make It Your Own

This project was designed to be **developer-friendly and customizable**.

- Go to the `/public/data` folder.
- You'll find simple `.ts` files containing your:
  - Bio
  - Skills
  - Projects
  - Contact Info
- Modify those JavaScript objects with your own content.
- Restart the dev server to apply changes:
  ```bash
  npm run dev
  ```

No complicated setup or backend configuration required!

---

## Deploy on Vercel

You can **deploy this portfolio in minutes** using [Vercel](https://vercel.com/):

1. **Fork** the repo.
2. Head over to [https://vercel.com/new](https://vercel.com/new).
3. Connect your GitHub account and import your forked repo.
4. Vercel will auto-detect the project settings (no manual config needed).
5. Click **Deploy**, and your portfolio will be live almost instantly!

> 💡 All necessary Vercel settings are already in place in the project structure.

---

## EmailJS Implementation

This portfolio uses **EmailJS** for handling contact form submissions directly from the frontend, eliminating the need for a custom backend.

### Current Configuration ✅

- **Service**: SERVICE_ID
- **Template**: TEMPLATE_ID
- **Recipient**: jlaggui47@gmail.com
- **Library**: @emailjs/browser (already installed)

### How It Works

The contact form sends emails directly through EmailJS using the configuration in `/src/utils/sendEmail.ts`:

```typescript
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const SERVICE_ID = 'YOUR SERVICE_ID';
const TEMPLATE_ID = 'YOUR TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR PUBLIC_KEY';

export const sendEmail = async (values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const templateParams = {
    from_name: values.name,
    reply_to: values.email,
    subject: values.subject,
    message: values.message,
    to_email: 'jlaggui47@gmail.com',
  };

  return await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};
```

### Setting Up Your Own EmailJS

If you want to configure your own EmailJS service:

1. **Create EmailJS Account**
   - Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create a new email service (Gmail recommended)

2. **Configure Email Template**
   - Create a template with variables: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`
   - Note your Service ID and Template ID

3. **Update Configuration**
   - Replace the constants in `/src/utils/sendEmail.ts` with your own IDs
   - Update the recipient email address

4. **Test Implementation**
   - Run the development server: `npm run dev`
   - Navigate to the contact page and send a test message

> 💡 **Benefits**: No backend required, instant setup, reliable delivery, and free tier available.

---

## Author

- Website – [Joel Laggui Jr.](https://joellaggui.vercel.app/)
- LinkedIn – [Joel Laggui Jr.](https://www.linkedin.com/in/joel-laggui-801104369/)