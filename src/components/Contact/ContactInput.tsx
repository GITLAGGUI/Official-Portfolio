import { Input, HStack, Text, Box, useColorMode } from "@chakra-ui/react";
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
  const [isFocused, setIsFocused] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [value, placeholder]);

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

  return (
    <Box 
      height="19.5px" 
      position="relative" 
      maxW="100%"
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
        <Text color={keywordColor}>const</Text>
        <Text color={variableColor}>{name}</Text>
        <Text color={keywordColor}>=</Text>

        <Input
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur(e);
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          variant="unstyled"
          color={stringColor}
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
              WebkitTextFillColor: stringColor,
            },
            caretColor: stringColor,
          }}
        />
      </HStack>
    </Box>
  );
};

export default ContactInput;
