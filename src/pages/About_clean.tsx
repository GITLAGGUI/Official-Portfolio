import {
  VStack,
  Text,
  HStack,
  Grid,
  GridItem,
  Box,
  Heading,
  Icon,
  useColorMode,
  Avatar,
  Container,
  Badge,
  Progress,
  Divider,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { 
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

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const About = ({ setPage }: Props) => {
  const { colorMode } = useColorMode();
  const [displayText, setDisplayText] = useState("");
  const fullText = '"But hope that is seen is no hope at all. Who hopes for what they already have?" - Romans 8:25';
  
  useEffect(() => {
    setPage("about.tsx");
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [setPage]);

  // Dynamic theme colors based on current color mode
  const getThemeColors = () => {
    if ((colorMode as any) === 'dracula') {
      return {
        mainBg: "#282A36",
        cardBg: "#44475A",
        textColor: "#F8F8F2",
        secondaryText: "#6272A4",
        accentColor: "#BD93F9",
        borderColor: "#6272A4",
        linkColor: "#8BE9FD",
        buttonBg: "#50FA7B",
        buttonText: "#282A36",
      };
    } else if ((colorMode as any) === 'nightowl') {
      return {
        mainBg: "#011627",
        cardBg: "#1D3A5F",
        textColor: "#D6DEEB",
        secondaryText: "#7E8B99",
        accentColor: "#C792EA",
        borderColor: "#2E5984",
        linkColor: "#82AAFF",
        buttonBg: "#ADDB67",
        buttonText: "#011627",
      };
    } else {
      return {
        mainBg: "#1A202C",
        cardBg: "#2D3748",
        textColor: "#E2E8F0",
        secondaryText: "#A0AEC0",
        accentColor: "#7E57C2",
        borderColor: "#4A5568",
        linkColor: "#82AAFF",
        buttonBg: "#7E57C2",
        buttonText: "#ffffff",
      };
    }
  };

  const { mainBg, cardBg, textColor, secondaryText, accentColor, borderColor, buttonText } = getThemeColors();

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming languages': return FaPython;
      case 'data analysis': return FaChartBar;
      case 'database': return FaDatabase;
      case 'cloud platforms': return FaCloud;
      case 'version control': return FaGitAlt;
      case 'frameworks': return FaReact;
      default: return FaStar;
    }
  };

  return (
    <Box width="100%" minHeight="100vh" bg={mainBg}>
      <Container maxW="7xl" position="relative" zIndex="1">
        <VStack spacing={0} align="stretch" minHeight="100vh">
          
          {/* Main Content Section */}
          <Grid templateColumns={{ base: "1fr", lg: "1fr 400px" }} gap={8} py={8}>
            
            {/* Left Column - About Content */}
            <GridItem>
              <VStack spacing={8} align="stretch" textAlign="left">
                
                {/* About Me Section */}
                <Box animation={`${slideInFromLeft} 0.8s ease-out`}>
                  <Heading
                    size="2xl"
                    color={accentColor}
                    mb={6}
                    fontWeight="bold"
                    background={`linear-gradient(45deg, ${accentColor}, ${textColor})`}
                    backgroundSize="200% 200%"
                    backgroundClip="text"
                    animation={`${gradientShift} 3s ease infinite`}
                  >
                    About Me
                  </Heading>
                  <Text 
                    fontSize="lg" 
                    color={textColor} 
                    lineHeight="tall"
                    mb={6}
                    textAlign="justify"
                  >
                    {aboutMe.description.map((paragraph, index) => (
                      <Box key={index} mb={4}>
                        {paragraph}
                      </Box>
                    ))}
                  </Text>
                </Box>

                {/* Bible Quote Section */}
                <Box 
                  p={6}
                  bg={cardBg}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  position="relative"
                  animation={`${fadeIn} 0.8s ease-out 0.4s both`}
                >
                  <Icon 
                    as={FaQuoteLeft} 
                    fontSize="2xl" 
                    color={accentColor} 
                    position="absolute"
                    top={4}
                    left={4}
                  />
                  <Text 
                    fontSize="lg" 
                    color={textColor} 
                    fontStyle="italic"
                    lineHeight="tall"
                    pl={8}
                    mt={2}
                  >
                    {displayText}
                  </Text>
                </Box>

              </VStack>
            </GridItem>

            {/* Right Column - Profile Picture */}
            <GridItem>
              <VStack spacing={6} animation={`${slideInFromRight} 0.8s ease-out 0.2s both`}>
                <Box
                  position="relative"
                  animation={`${floatAnimation} 3s ease-in-out infinite`}
                >
                  <Avatar
                    size="2xl"
                    src="/assets/Me.jpg"
                    name="Joel Laggui Jr."
                    border="4px solid"
                    borderColor={accentColor}
                    boxShadow={`0 0 20px ${accentColor}40`}
                    width="300px"
                    height="300px"
                  />
                </Box>
                
                <VStack spacing={2} textAlign="center">
                  <Heading size="lg" color={textColor} fontWeight="bold">
                    Joel Laggui Jr.
                  </Heading>
                  <HStack spacing={2} color={secondaryText}>
                    <Icon as={FaMapMarkerAlt} />
                    <Text fontSize="md">Ilagan City, Isabela</Text>
                  </HStack>
                </VStack>
              </VStack>
            </GridItem>

          </Grid>

          <Divider borderColor={borderColor} />

          {/* Certifications Section */}
          <Box w="100%" animation={`${fadeIn} 0.8s ease-out 0.6s both`}>
            <CertificationTestimonial />
          </Box>

          <Divider borderColor={borderColor} />

          {/* Technical Skills Section */}
          <Box w="100%" animation={`${fadeIn} 0.8s ease-out 1s both`}>
            <Heading
              size="xl"
              color={accentColor}
              mb={8}
              textAlign="center"
              fontWeight="bold"
            >
              Technical Skills
            </Heading>
            
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {Object.entries(technicalSkills).map(([category, skills]) => {
                const CategoryIcon = getCategoryIcon(category);
                return (
                  <Box
                    key={category}
                    bg={cardBg}
                    p={6}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    transition="all 0.3s ease"
                    _hover={{
                      borderColor: accentColor,
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 25px ${accentColor}20`
                    }}
                  >
                    <HStack mb={4} spacing={3}>
                      <Icon
                        as={CategoryIcon}
                        fontSize="xl"
                        color={accentColor}
                        bg={accentColor}
                        borderRadius="md"
                        p={2}
                        boxSize="40px"
                      />
                      <Text fontWeight="bold" fontSize="lg" color={accentColor}>
                        {category}
                      </Text>
                    </HStack>
                    
                    <VStack spacing={3} align="stretch">
                      {skills.map((skill: any, index: number) => (
                        <Box key={index}>
                          <HStack justify="space-between" mb={2}>
                            <Badge
                              px={3}
                              py={1}
                              borderRadius="full"
                              bg={accentColor}
                              color={buttonText}
                            >
                              <Text fontSize="md" color={textColor} flex="1">
                                {skill.name}
                              </Text>
                            </Badge>
                          </HStack>
                          <Progress
                            value={skill.level}
                            bg={borderColor}
                            borderRadius="full"
                            height="6px"
                            colorScheme="purple"
                          />
                        </Box>
                      ))}
                    </VStack>
                  </Box>
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
