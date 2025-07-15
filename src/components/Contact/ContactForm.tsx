import { useBreakpointValue, VStack } from "@chakra-ui/react";
import ContactInput from "./ContactInput";
import ContactTextarea from "./ContactTextarea";

interface Props {
  values: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  setMessageLines: React.Dispatch<React.SetStateAction<number>>;
}

const ContactForm = ({
  values,
  handleChange,
  handleBlur,
  setMessageLines,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack align="stretch" w="full" minW={isMobile ? "300px" : "auto"}>
      <ContactInput
        name="name"
        value={values.name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder='"Your name"'
      />

      <ContactInput
        name="email"
        value={values.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder='"your.email@example.com"'
      />

      <ContactInput
        name="subject"
        value={values.subject}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder='"Message subject"'
      />

      <ContactTextarea
        name="message"
        value={values.message}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder='"Your message here..."'
        setMessageLines={setMessageLines}
      />
    </VStack>
  );
};

export default ContactForm;
