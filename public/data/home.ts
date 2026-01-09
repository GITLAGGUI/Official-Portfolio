import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export const homeData = {
  // To use your own photo, just place it in /public/assets and write the link as I did: eg: /assets/my_image.jpg
  // Of course it's best to convert your image file type to webp for better performance on the web!
  // The links are optional
  myImage: "/assets/web-Logo.png",
  contactInfo: [
    {
      Icon: IoMdMail,
      Label: "jlaggui47@gmail.com",
      Link: "/contact", // This refers to the Contact page in the website, you can change it to whatever you like
    },
    {
      Icon: FaLocationDot,
      Label: "Philippines",
      Link: "https://www.google.com/maps/place/Philippines", // This is just a simple location of my country
    },
    {
      Icon: FaPhoneAlt,
      Label: "+63 915 368 3496",
      Link: "tel:+639153683496",
    },
    {
      Icon: FaWhatsapp,
      Label: "WhatsApp",
      Link: "https://wa.me/639153683496",
    },
  ],
  education: [
    {
      Icon: FaUniversity,
      Label: "Isabela State University - Cabagan Campus",
      Link: "#",
    },
    {
      Icon: FaGraduationCap,
      Label: "Bachelor of Science in Computer Science",
      Link: "#",
    },
  ],
  social: [
    {
      Icon: FaGithub,
      Label: "GitHub",
      Link: "https://github.com/GITLAGGUI",
    },
    {
      Icon: FaLinkedin,
      Label: "LinkedIn",
      Link: "https://www.linkedin.com/in/joellagguijr-dev/",
    },
    {
      Icon: FaFacebook,
      Label: "Facebook",
      Link: "https://www.facebook.com/joellagguijr",
    },
    {
      Icon: FaInstagram,
      Label: "Instagram",
      Link: "https://www.instagram.com/jlaggui.jr/#",
    },
  ],
};