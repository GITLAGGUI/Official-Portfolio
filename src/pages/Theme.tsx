import { Box, Heading, VStack, useColorModeValue } from "@chakra-ui/react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useEffect } from "react";

interface Props {
  setPage: (page: string) => void;
}

const Theme = ({ setPage }: Props) => {
  useEffect(() => {
    setPage("theme.css");
  }, []);

  // Theme-aware colors
  const headingColor = useColorModeValue("syntax.keyword", "#0BCEAF");
  const bgColor = useColorModeValue("nightOwl.bg", "gray.800");

  return (
    <Box
      minH="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      bg={bgColor}
      transition="background-color 0.3s ease"
    >
      <VStack spacing={8} width="100%">
        <Heading
          color={headingColor}
          fontSize={{ base: "2xl", md: "3xl" }}
          textAlign="center"
        >
          Pick Your VSCode Theme
        </Heading>
        <ThemeSwitcher />
      </VStack>
    </Box>
  );
};

export default Theme;
