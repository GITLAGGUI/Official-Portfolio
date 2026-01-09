import {
  VStack,
  Text,
  HStack,
  Button,
  Grid,
  GridItem,
  Box,
  Heading,
  Icon,
  useColorMode,
  Avatar,
  Container,
  Flex,
  Badge,
  Progress,
  Divider,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { 
  FaDownload, 
  FaPython, 
  FaDatabase, 
  FaChartBar, 
  FaCloud, 
  FaGitAlt, 
  FaReact,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { aboutMe, technicalSkills } from "../../public/data/about";
import CertificationTestimonial from "../components/CertificationTestimonial";

interface Props {
  setPage: (page: string) => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInFromLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInFromRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const About = ({ setPage }: Props) => {
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();

  const downloadCV = () => {
    setLoading(true);
    const link = document.createElement("a");
    link.href = aboutMe.cvPath;
    link.setAttribute("download", aboutMe.cvFileNameAfterDownload);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  };

  useEffect(() => {
    setPage("about.html");
  });

  // Dynamic theme colors based on current color mode
  const getThemeColors = () => {
    if ((colorMode as any) === 'dracula') {
      return {
        mainBg: "#282A36",
        cardBg: "rgba(40, 42, 54, 0.8)",
        accentColor: "#BD93F9",
        textColor: "#F8F8F2",
        secondaryText: "#6272A4",
        borderColor: "#44475A",
      };
    } else if ((colorMode as any) === 'nightowl') {
      return {
        mainBg: "#011627",
        cardBg: "rgba(1, 22, 39, 0.8)",
        accentColor: "#7E57C2",
        textColor: "#D6DEEB",
        secondaryText: "#5F7E97",
        borderColor: "#1D3A5F",
      };
    } else if (colorMode === 'dark') {
      return {
        mainBg: "#1A202C",
        cardBg: "rgba(26, 32, 44, 0.8)",
        accentColor: "#7E57C2",
        textColor: "#E2E8F0",
        secondaryText: "#A0AEC0",
        borderColor: "#2D3748",
      };
    } else {
      return {
        mainBg: "#FFFFFF",
        cardBg: "rgba(255, 255, 255, 0.8)",
        accentColor: "#7E57C2",
        textColor: "#2D3748",
        secondaryText: "#4A5568",
        borderColor: "#E2E8F0",
      };
    }
  };

  const { mainBg, cardBg, accentColor, textColor, secondaryText, borderColor } = getThemeColors();

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming languages':
        return FaPython;
      case 'databases':
        return FaDatabase;
      case 'data analysis':
        return FaChartBar;
      case 'cloud platforms':
        return FaCloud;
      case 'tools & technologies':
        return FaGitAlt;
      case 'web development':
        return FaReact;
      default:
        return FaPython;
    }
  };

  return (
    <Box 
      width="100%" 
      minHeight="100vh" 
      bg={mainBg}
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background */}
      <Box
        position="absolute"
        inset="0"
        bgGradient={`linear(45deg, ${accentColor}20, transparent, ${accentColor}10)`}
        backgroundSize="200% 200%"
        animation={`${gradientAnimation} 8s ease infinite`}
        opacity="0.1"
      />

      <Container maxW="7xl" position="relative" zIndex="1">
        <VStack spacing={12} py={{ base: 8, md: 16 }}>
          
          {/* Hero Section */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            justify="space-between"
            w="100%"
            gap={8}
            animation={`${fadeIn} 0.8s ease-out`}
          >
            {/* Left Side - Content */}
            <VStack 
              spacing={6} 
              align={{ base: "center", lg: "flex-start" }}
              flex="1"
              animation={`${slideInFromLeft} 0.8s ease-out 0.2s both`}
            >
              <VStack spacing={2} textAlign={{ base: "center", lg: "left" }} align={{ base: "center", lg: "flex-start" }}>
                <Heading
                  size="2xl"
                  bgGradient={`linear(to-r, ${accentColor}, #4299E1)`}
                  bgClip="text"
                  fontWeight="bold"
                >
                  Joel Laggui Jr.
                </Heading>
                <Text fontSize="xl" color={secondaryText} fontWeight="medium">
                  Data Analyst | Python, SQL, Power BI Expert | Business Intelligence Specialist
                </Text>
                <HStack spacing={4} pt={2}>
                  <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                    <Icon as={FaMapMarkerAlt} mr={1} />
                    Philippines
                  </Badge>
                  <Badge colorScheme="green" px={3} py={1} borderRadius="full">
                    Available for hire
                  </Badge>
                </HStack>
              </VStack>

              {/* Quote Section */}
              <Box 
                bg={cardBg} 
                p={6} 
                borderRadius="xl" 
                border="1px solid" 
                borderColor={borderColor}
                backdropFilter="blur(10px)"
                position="relative"
                maxW="500px"
                textAlign={{ base: "center", lg: "justify" }}
                _hover={{ transform: "translateY(-2px)" }}
                transition="all 0.3s ease"
              >
                <Icon
                  as={FaQuoteLeft}
                  color={accentColor}
                  boxSize={6}
                  position="absolute"
                  top={4}
                  left={4}
                />
                <Text
                  fontSize="md"
                  color={textColor}
                  fontStyle="italic"
                  lineHeight="1.8"
                  pl={8}
                >
                  "But if we hopek for what we do not see,l we keep eagerly waiting for it with endurance."
                </Text>
                <Text
                  fontSize="sm"
                  color={secondaryText}
                  fontWeight="bold"
                  mt={3}
                  textAlign="right"
                >
                   - Romans 8:25
                </Text>
              </Box>

              <Button
                size="lg"
                bg={accentColor}
                color="white"
                leftIcon={<FaDownload />}
                onClick={downloadCV}
                isLoading={loading}
                loadingText="Downloading..."
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                  bg: accentColor,
                }}
                _active={{ transform: "scale(0.96)" }}
                transition="all 0.2s ease"
                borderRadius="full"
                px={8}
                animation={`${scaleIn} 0.8s ease-out 0.5s both`}
              >
                Download Resume
              </Button>
            </VStack>

            {/* Right Side - Profile Picture */}
            <Box
              animation={`${slideInFromRight} 0.8s ease-out 0.4s both`}
            >
              <Box position="relative">
                <Avatar
                  size="2xl"
                  src="/assets/Me.jpg"
                  border="4px solid"
                  borderColor={accentColor}
                  boxShadow="0 0 30px rgba(126, 87, 194, 0.3)"
                  animation={`${floatingAnimation} 3s ease-in-out infinite`}
                />
                <Box
                  position="absolute"
                  top="-2"
                  right="-2"
                  bg={accentColor}
                  color="white"
                  borderRadius="full"
                  p={2}
                  animation={`${scaleIn} 0.8s ease-out 1s both`}
                >
                  <Icon as={FaStar} boxSize={4} />
                </Box>
              </Box>
            </Box>
          </Flex>

          <Divider borderColor={borderColor} />

          {/* About Description */}
          <Box 
            w="100%" 
            animation={`${fadeIn} 0.8s ease-out 0.6s both`}
          >
            <Heading
              size="xl"
              color={accentColor}
              mb={6}
              textAlign="center"
            >
              About Me
            </Heading>
            <VStack spacing={4} maxW="4xl" mx="auto">
              {aboutMe.description.map((text, idx) => (
                <Text
                  key={idx}
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight="tall"
                  color={textColor}
                  textAlign="center"
                  animation={`${fadeIn} 0.8s ease-out ${0.8 + idx * 0.2}s both`}
                >
                  {text}
                </Text>
              ))}
            </VStack>
          </Box>

          <Divider borderColor={borderColor} />

          {/* Certifications */}
          <Box w="100%" animation={`${fadeIn} 0.8s ease-out 1s both`}>
            <CertificationTestimonial />
          </Box>

          <Divider borderColor={borderColor} />

          {/* Technical Skills */}
          <Box w="100%" animation={`${fadeIn} 0.8s ease-out 1.2s both`}>
            <Heading
              size="xl"
              color={accentColor}
              mb={8}
              textAlign="center"
            >
              Technical Expertise
            </Heading>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={8}
            >
              {Object.entries(technicalSkills).map(([category, skills], index) => {
                const CategoryIcon = getCategoryIcon(category);
                return (
                  <GridItem
                    key={category}
                    bg={cardBg}
                    borderRadius="xl"
                    p={6}
                    border="1px solid"
                    borderColor={borderColor}
                    boxShadow="xl"
                    backdropFilter="blur(10px)"
                    _hover={{
                      transform: "translateY(-4px) scale(1.02)",
                      boxShadow: "2xl",
                      borderColor: accentColor,
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    animation={`${scaleIn} 0.8s ease-out ${1.4 + index * 0.1}s both`}
                  >
                    <VStack spacing={4} align="stretch">
                      <HStack spacing={3}>
                        <Box
                          bg={accentColor}
                          p={2}
                          borderRadius="lg"
                          animation={`${floatingAnimation} 3s ease-in-out infinite`}
                          style={{ animationDelay: `${index * 0.5}s` }}
                        >
                          <Icon as={CategoryIcon} color="white" boxSize={6} />
                        </Box>
                        <Text fontWeight="bold" fontSize="lg" color={accentColor}>
                          {category}
                        </Text>
                      </HStack>
                      
                      <VStack align="stretch" spacing={3}>
                        {skills.map((skill, skillIndex) => (
                          <HStack 
                            key={skill} 
                            spacing={3} 
                            width="100%"
                            animation={`${slideInFromLeft} 0.5s ease-out ${1.6 + index * 0.1 + skillIndex * 0.05}s both`}
                          >
                            <Box 
                              w="3" 
                              h="3" 
                              borderRadius="full" 
                              bg={accentColor}
                              animation={`${scaleIn} 0.3s ease-out ${1.8 + index * 0.1 + skillIndex * 0.05}s both`}
                            />
                            <Text fontSize="md" color={textColor} flex="1">
                              {skill}
                            </Text>
                            <Progress
                              value={85 + Math.random() * 15}
                              size="sm"
                              colorScheme="purple"
                              bg={borderColor}
                              borderRadius="full"
                              width="60px"
                              animation={`${scaleIn} 0.5s ease-out ${2 + index * 0.1 + skillIndex * 0.05}s both`}
                            />
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>

        </VStack>
      </Container>
    </Box>
  );
};

export default About;
