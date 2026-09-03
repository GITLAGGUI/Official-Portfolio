const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

const EMAILJS_CONFIG = {
  service_id: "Portfolio_Contact",
  template_id: "template_6jj62jf",
  user_id: "TVttJrxgE7gKmoM6o",
};

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendEmail(values: ContactMessage) {
  const templateParams = {
    user_name: values.name,
    user_email: values.email,
    user_subject: values.subject,
    user_message: values.message,
    title: values.subject,
    from_name: values.name,
    from_email: values.email,
    reply_to: values.email,
    subject: values.subject,
    message: values.message,
    name: values.name,
    email: values.email,
    to_name: "Joel Laggui Jr.",
    to_email: "jlaggui47@gmail.com",
    business_email: "jlaggui47@gmail.com",
    website_url: "https://joellaggui.vercel.app",
    inquiry_type: "Portfolio inquiry",
    event_type: "Website contact",
    preferred_date: "Not specified",
    guest_estimate: "Not applicable",
    contact_method: "Email",
    phone: "Not provided",
    submission_time: new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" }),
    sender_name: values.name,
    sender_email: values.email,
    contact_name: values.name,
    contact_email: values.email,
    contact_subject: values.subject,
    contact_message: values.message,
  };

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...EMAILJS_CONFIG, template_params: templateParams }),
  });

  if (!response.ok) {
    throw new Error(`Email service returned ${response.status}`);
  }
}
