import { Input, HStack, Text, Box } from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";

type Props = {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const ContactInput = ({
  name,
  value,
  handleChange,
  handleBlur,
  placeholder,
}: Props) => {
  const [inputWidth, setInputWidth] = useState(200);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [value, placeholder]);

  return (
    <Box height="19.5px" position="relative" maxW="100%">
      {/* Hidden span to measure text width */}
      <Box
        as="span"
        ref={spanRef}
        visibility="hidden"
        whiteSpace="pre"
        fontFamily="monospace"
        fontSize="inherit"
        px={2}
        position="absolute"
        top="0"
      >
        {value || placeholder}
      </Box>

      <HStack spacing={2} height="19.5px">
        <Text color="#569CD6">const</Text>
        <Text color="#9CDCFE">{name}</Text>
        <Text color="#569CD6">=</Text>

        <Input
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="unstyled"
          color="#CE9178"
          placeholder={placeholder}
          _placeholder={{ color: "gray.600" }}
          display="inline-block"
          width={`${inputWidth}px`}
          fontFamily="monospace"
          fontSize="inherit"
          bg="transparent"
          sx={{
            "::placeholder": {
              color: "gray.600",
            },
            ":not(:placeholder-shown)": {
              WebkitTextFillColor: "#CE9178",
            },
            caretColor: "#CE9178",
          }}
        />
      </HStack>
    </Box>
  );
};

export default ContactInput;
