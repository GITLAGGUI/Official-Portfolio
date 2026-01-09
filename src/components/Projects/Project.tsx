import React, { useState } from "react";
import {
  VStack,
  Image,
  Text,
  HStack,
  useColorMode,
  Box,
  Icon,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaExternalLinkAlt, FaFacebook, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProjectTech from "./ProjectTech";

interface Props {
  ImageURL: string;
  Title: string;
  Description: string;
  Technologies: string[];
  Source?: string;
  Demo?: string;
  projectIndex: number; // Add project index for navigation
}

const Project = ({
  ImageURL,
  Title,
  Description,
  Technologies,
  Source,
  Demo,
  projectIndex,
}: Props) => {
  const { colorMode } = useColorMode();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Dynamic theme colors based on current color mode
  const getThemeColors = () => {
    if ((colorMode as any) === 'dracula') {
      return {
        cardBg: "rgba(40, 42, 54, 0.9)",
        textColor: "#F8F8F2",
        secondaryText: "#6272A4",
        accentColor: "#BD93F9",
        techBorderColor: "#FF79C6",
      };
    } else if (colorMode === 'dark') {
      return {
        cardBg: "rgba(26, 32, 44, 0.9)",
        textColor: "whiteAlpha.900",
        secondaryText: "gray.300",
        accentColor: "#0BCEAF",
        techBorderColor: "#0BCEAF",
      };
    } else { // light/night owl
      return {
        cardBg: "rgba(1, 22, 39, 0.9)",
        textColor: "#d6deeb",
        secondaryText: "gray.400",
        accentColor: "#7E57C2",
        techBorderColor: "#7E57C2",
      };
    }
  };

  const { cardBg, accentColor } = getThemeColors();

  // Function to determine the appropriate icon for demo links
  const getDemoIcon = (demoUrl: string) => {
    if (demoUrl.includes('facebook.com')) return FaFacebook;
    return FaExternalLinkAlt;
  };

  // Enhanced animations
  const slideUp = keyframes`
    0% { transform: translateY(30px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  `;

  return (
    <Box
      position="relative"
      animation={`${slideUp} 0.6s ease-out`}
      width="100%"
      maxWidth={{ base: "100%", md: "500px" }}
      mx="auto"
    >
      <VStack
        bg={cardBg}
        borderRadius={{ base: "12px", md: "16px" }}
        border="none"
        transition="all 0.3s ease"
        overflow="hidden"
        position="relative"
        cursor="pointer"
        onClick={() => navigate(`/projects/${projectIndex}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        spacing={0}
        _hover={{
          transform: { base: "translateY(-2px)", md: "translateY(-4px)" },
          bg: cardBg,
        }}
      >
        <Box
          position="relative"
          width="100%"
          height={{ base: "200px", sm: "250px", md: "300px" }}
          overflow="hidden"
          borderRadius={{ base: "12px", md: "16px" }}
        >
          <Image
            width="100%"
            height="100%"
            objectFit="cover"
            src={ImageURL}
            borderRadius={{ base: "12px", md: "16px" }}
            transition="transform 0.3s ease"
            loading="lazy"
          />
          
          {/* Overlay that appears on hover */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.85)"
            opacity={isHovered ? 1 : 0}
            transition="opacity 0.3s ease"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={{ base: 4, md: 6 }}
            borderRadius={{ base: "12px", md: "16px" }}
          >
            <Text 
              fontWeight="bold" 
              fontSize={{ base: "lg", md: "xl" }}
              color="white"
              mb={{ base: 2, md: 3 }}
              textAlign="center"
            >
              {Title}
            </Text>
            
            <Text 
              color="gray.300" 
              fontSize={{ base: "xs", md: "sm" }}
              lineHeight="1.5"
              textAlign="center"
              mb={{ base: 3, md: 4 }}
              noOfLines={{ base: 2, md: 3 }}
              px={2}
            >
              {Description}
            </Text>
            
            <HStack 
              wrap="wrap" 
              spacing={{ base: 1, md: 2 }} 
              mb={{ base: 3, md: 4 }} 
              justifyContent="center"
              maxWidth="100%"
            >
              {Technologies.slice(0, 4).map((t) => (
                <ProjectTech
                  key={t}
                  label={t}
                  borderColor="white"
                  textColor="white"
                />
              ))}
              {Technologies.length > 4 && (
                <Text color="gray.400" fontSize="xs">
                  +{Technologies.length - 4} more
                </Text>
              )}
            </HStack>

            {(Source || Demo) && (
              <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap" justifyContent="center">
                <Box
                  as="button"
                  color="white"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    navigate(`/projects/${projectIndex}`);
                  }}
                  _hover={{ 
                    color: accentColor,
                    transform: "translateY(-1px)"
                  }}
                  transition="all 0.2s ease"
                >
                  <Icon as={FaEye} boxSize={{ base: 3, md: 4 }} />
                  View Details
                </Box>
                {Demo && (
                  <Box
                    as="button"
                    color="white"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      window.open(Demo, '_blank');
                    }}
                    _hover={{ 
                      color: accentColor,
                      transform: "translateY(-1px)"
                    }}
                    transition="all 0.2s ease"
                  >
                    <Icon as={getDemoIcon(Demo)} boxSize={{ base: 3, md: 4 }} />
                    Demo
                  </Box>
                )}
              </HStack>
            )}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default Project;
