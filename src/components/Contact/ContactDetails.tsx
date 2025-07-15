import { VStack, Text, HStack, Show } from "@chakra-ui/react";
import { contactInfo } from "../../../public/data/contact";

const ContactDetails = () => {
  return (
    <VStack align="stretch" color="#6A9955">
      <Text>/**</Text>
      <Text pl={2}>* Contact Information:</Text>

      {contactInfo.map(({ icon: Icon, label, value }) => (
        <HStack pl={2} key={label}>
          <Text>*</Text>
          <Icon size={14} />
          <Text>
            <Show above="sm">{label}: </Show>
            {value}
          </Text>
        </HStack>
      ))}

      <Text>*/</Text>
    </VStack>
  );
};

export default ContactDetails;
