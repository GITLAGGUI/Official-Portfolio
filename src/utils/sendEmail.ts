import emailjs from '@emailjs/browser';

// EmailJS Configuration from read.txt
const SERVICE_ID = 'Portfolio_Contact';
const TEMPLATE_ID = 'template_jnkruwp';
const PUBLIC_KEY = 'xbstR31xaERF_RP_O';

// Initialize EmailJS with public key
emailjs.init(PUBLIC_KEY);

export const sendEmail = async (values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const { name, email, subject, message } = values;

  try {
    // Try multiple parameter formats to ensure compatibility
    const templateParams = {
      // Standard EmailJS parameters
      user_name: name,
      user_email: email,
      user_subject: subject,
      user_message: message,
      
      // Alternative parameter names
      from_name: name,
      from_email: email,
      reply_to: email,
      subject: subject,
      message: message,
      name: name,
      email: email,
      
      // Additional parameters that might be expected
      to_name: 'Joel Laggui Jr.',
      to_email: 'jlaggui47@gmail.com',
      sender_name: name,
      sender_email: email,
      contact_name: name,
      contact_email: email,
      contact_subject: subject,
      contact_message: message,
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return {
      status: 200,
      text: response.text,
    };
  } catch (error: any) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};