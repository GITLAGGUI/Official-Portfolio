import { Textarea, HStack, Text, Box, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";

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
  const [isFocused, setIsFocused] = useState(false);
  const { colorMode } = useColorMode();

  // Dynamic theme colors
  const getThemeColors = () => {
    if ((colorMode as any) === 'dracula') {
      return {
        keywordColor: "#FF79C6",
        variableColor: "#F8F8F2", 
        stringColor: "#F1FA8C",
        spotlightColor: "#BD93F9",
      };
    } else if (colorMode === 'dark') {
      return {
        keywordColor: "#569CD6",
        variableColor: "#9CDCFE",
        stringColor: "#CE9178", 
        spotlightColor: "#0BCEAF",
      };
    } else {
      return {
        keywordColor: "#7E57C2",
        variableColor: "#d6deeb",
        stringColor: "#C5E478",
        spotlightColor: "#7E57C2",
      };
    }
  };

  const { keywordColor, variableColor, stringColor, spotlightColor } = getThemeColors();

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
    const lines = target.value.split("\n").length;
    setMessageLines(lines);
  };

  return (
    <Box
      position="relative"
      _before={isFocused ? {
        content: '""',
        position: "absolute",
        top: "-2px",
        left: "-4px",
        right: "-4px", 
        bottom: "-2px",
        background: `linear-gradient(90deg, ${spotlightColor}20, transparent, ${spotlightColor}20)`,
        borderRadius: "4px",
        zIndex: -1,
        animation: "spotlight 2s ease-in-out infinite",
      } : {}}
      sx={{
        "@keyframes spotlight": {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 0.7 },
        }
      }}
    >
      <HStack spacing={2}>
        <Text color={keywordColor}>const</Text>
        <Text color={variableColor}>{name}</Text>
        <Text color={keywordColor}>=</Text>
      </HStack>
      <Textarea
        pt={1}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur(e);
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        onInput={handleInput}
        variant="unstyled"
        color={stringColor}
        placeholder={placeholder}
        _placeholder={{ color: "gray.600" }}
        minH="32px"
        maxH="300px"
        h="auto"
        resize="none"
        fontFamily="monospace"
        bg="transparent"
        width="100%"
        overflow="hidden"
        lineHeight="27.48px"
        sx={{
          "::placeholder": {
            color: "gray.600",
          },
          ":not(:placeholder-shown)": {
            WebkitTextFillColor: stringColor,
          },
          caretColor: stringColor,
        }}
      />
    </Box>
  );
};

export default ContactTextarea;
