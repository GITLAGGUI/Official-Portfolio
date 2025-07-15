import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import NightOwl from "/assets/nightowl.webp";
import VSCode from "/assets/vscode.webp";

const themes = [
  {
    key: "dark",
    name: "VSCode",
    image: VSCode,
    description: "Classic VSCode theme.",
  },
  {
    key: "light",
    name: "Night Owl",
    image: NightOwl,
    description: "Vibrant and readable theme.",
  },
];

const ThemeSwitcher = () => {
  const { setColorMode, colorMode } = useColorMode();

  const cardBg = useColorModeValue("rgba(1, 22, 39, 0.8)", "gray.800");
  const borderColor = useColorModeValue(
    "rgba(126, 87, 194, 0.3)",
    "rgba(86, 156, 214, 0.3)"
  );
  const activeBorderColor = useColorModeValue("syntax.keyword", "#0BCEAF");
  const textColor = useColorModeValue("nightOwl.text", "whiteAlpha.900");
  const descriptionColor = useColorModeValue("gray.400", "gray.300");

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={8}
      width="100%"
      maxW="700px"
      mx="auto"
    >
      {themes.map((theme) => {
        const isActive = colorMode === theme.key;
        return (
          <Box
            key={theme.key}
            bg={cardBg}
            borderWidth="2px"
            borderColor={isActive ? activeBorderColor : borderColor}
            borderRadius="lg"
            boxShadow={isActive ? `0 0 0 2px ${activeBorderColor}` : "none"}
            p={6}
            textAlign="center"
            transition="all 0.3s ease"
            backdropFilter="blur(10px)"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: `0 4px 6px ${useColorModeValue(
                "rgba(126, 87, 194, 0.2)",
                "rgba(86, 156, 214, 0.2)"
              )}`,
            }}
          >
            <Image
              src={theme.image}
              alt={theme.name}
              boxSize="100px"
              objectFit="cover"
              mb={4}
              mx="auto"
            />
            <Text fontWeight="bold" fontSize="xl" mb={2} color={textColor}>
              {theme.name}
            </Text>
            <Text fontSize="sm" color={descriptionColor} mb={4}>
              {theme.description}
            </Text>
            <Button
              color={isActive ? "white" : activeBorderColor}
              bg={isActive ? activeBorderColor : "transparent"}
              border={`1px solid ${activeBorderColor}`}
              _hover={{
                bg: isActive
                  ? activeBorderColor
                  : useColorModeValue(
                      "rgba(126, 87, 194, 0.1)",
                      "rgba(86, 156, 214, 0.1)"
                    ),
              }}
              onClick={() => setColorMode(theme.key)}
              isDisabled={isActive}
              width="100%"
              transition="all 0.2s ease"
            >
              {isActive ? "Selected" : "Use Theme"}
            </Button>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default ThemeSwitcher;
