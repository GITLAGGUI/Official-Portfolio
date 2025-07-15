import { Textarea, HStack, Text, Box } from "@chakra-ui/react";
import React from "react";

type ContactTextareaProps = {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  setMessageLines: React.Dispatch<React.SetStateAction<number>>;
};

const ContactTextarea: React.FC<ContactTextareaProps> = ({
  name,
  value,
  handleChange,
  handleBlur,
  placeholder,
  setMessageLines,
}) => {
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
    const lines = target.value.split("\n").length;
    setMessageLines(lines);
  };

  return (
    <Box>
      <HStack spacing={2}>
        <Text color="#569CD6">const</Text>
        <Text color="#9CDCFE">{name}</Text>
        <Text color="#569CD6">=</Text>
      </HStack>
      <Textarea
        pt={1}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onInput={handleInput}
        variant="unstyled"
        color="#CE9178"
        placeholder={placeholder}
        _placeholder={{ color: "gray.600" }}
        minH="32px"
        maxH="300px"
        h="auto"
        resize="none"
        width="100%"
        overflow="hidden"
        lineHeight="27.48px"
      />
    </Box>
  );
};

export default ContactTextarea;
