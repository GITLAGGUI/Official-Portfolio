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
  Divider,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { 
  FaPython, 
  FaCloud, 
  FaQuoteLeft,
  FaStar,
  FaBrain,
  FaCode,
  FaGear,
  FaDatabase,
  FaJs,
  FaReact,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaGoogle,
  FaHtml5,
  FaMobile,
  FaAndroid,
  FaApple,
} from "react-icons/fa6";
import { 
  SiPowerbi, 
  SiTableau,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiJupyter,
  SiVisualstudiocode,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiR,
  SiTypescript,
  SiNextdotjs,
  SiGooglecolab,
  SiSelenium,
  SiMicrosoftexcel,
  SiFlutter,
  SiDart,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiPhp,
  SiBootstrap,
} from "react-icons/si";
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
  const fullText = '"But if we hope for what we do not see, we keep eagerly waiting for it with endurance." - Romans 8:25';

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
    } else if (colorMode === 'light') {
      // Night Owl theme
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
      // VSCode theme (dark mode)
      return {
        mainBg: "#1E1E1E",
        cardBg: "#252526",
        textColor: "#CCCCCC",
        secondaryText: "#808080",
        accentColor: "#007ACC",
        borderColor: "#3C3C3C",
        linkColor: "#569CD6",
        buttonBg: "#0E639C",
        buttonText: "#FFFFFF",
      };
    }
  };

  const { mainBg, cardBg, textColor, secondaryText, accentColor, borderColor, buttonText } = getThemeColors();

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'core data analysis': return FaPython;
      case 'business intelligence & visualization': return SiPowerbi;
      case 'machine learning & analytics': return FaBrain;
      case 'programming & development': return FaCode;
      case 'web development': return FaHtml5;
      case 'mobile development': return FaMobile;
      case 'database & cloud technologies': return FaCloud;
      case 'tools & workflow': return FaGear;
      default: return FaStar;
    }
  };

  const getSkillIcon = (skill: string) => {
    const skillLower = skill.toLowerCase();
    
    // Programming Languages
    if (skillLower.includes('python')) return FaPython;
    if (skillLower.includes('javascript') || skillLower === 'js' || skillLower.includes('es6')) return FaJs;
    if (skillLower.includes('typescript')) return SiTypescript;
    if (skillLower.includes('r programming')) return SiR;
    if (skillLower.includes('php')) return SiPhp;
    if (skillLower.includes('dart')) return SiDart;
    
    // Web Technologies
    if (skillLower.includes('html') || skillLower.includes('html5')) return SiHtml5;
    if (skillLower.includes('css') || skillLower.includes('css3')) return SiCss3;
    if (skillLower.includes('bootstrap')) return SiBootstrap;
    if (skillLower.includes('tailwind')) return SiTailwindcss;
    if (skillLower.includes('responsive design')) return FaMobile;
    
    // Data Science Libraries
    if (skillLower.includes('pandas')) return SiPandas;
    if (skillLower.includes('numpy')) return SiNumpy;
    if (skillLower.includes('tensorflow')) return SiTensorflow;
    if (skillLower.includes('scikit-learn')) return SiScikitlearn;
    
    // Business Intelligence
    if (skillLower.includes('power bi')) return SiPowerbi;
    if (skillLower.includes('tableau')) return SiTableau;
    if (skillLower.includes('excel')) return SiMicrosoftexcel;
    if (skillLower.includes('google data studio')) return FaGoogle;
    
    // Databases
    if (skillLower.includes('mysql')) return SiMysql;
    if (skillLower.includes('postgresql')) return SiPostgresql;
    if (skillLower.includes('mongodb')) return SiMongodb;
    if (skillLower.includes('firebase')) return SiFirebase;
    if (skillLower.includes('sql') && !skillLower.includes('mysql') && !skillLower.includes('postgresql')) return FaDatabase;
    
    // Cloud & Infrastructure
    if (skillLower.includes('aws')) return FaAws;
    if (skillLower.includes('google cloud') || skillLower.includes('gcp')) return FaGoogle;
    
    // Mobile Development
    if (skillLower.includes('flutter')) return SiFlutter;
    if (skillLower.includes('android')) return FaAndroid;
    if (skillLower.includes('ios')) return FaApple;
    if (skillLower.includes('cross-platform')) return SiFlutter;
    if (skillLower.includes('mobile ui/ux')) return FaMobile;
    
    // Development Frameworks & Libraries
    if (skillLower.includes('react') && !skillLower.includes('next')) return FaReact;
    if (skillLower.includes('next.js') || skillLower.includes('nextjs')) return SiNextdotjs;
    
    // Development Tools
    if (skillLower.includes('git')) return FaGitAlt;
    if (skillLower.includes('docker')) return FaDocker;
    if (skillLower.includes('vs code') || skillLower.includes('visual studio')) return SiVisualstudiocode;
    if (skillLower.includes('jupyter')) return SiJupyter;
    if (skillLower.includes('google colab')) return SiGooglecolab;
    if (skillLower.includes('selenium')) return SiSelenium;
    
    // General methodologies and processes
    if (skillLower.includes('machine learning') || skillLower.includes('ml')) return FaBrain;
    if (skillLower.includes('predictive modeling')) return FaBrain;
    if (skillLower.includes('classification') || skillLower.includes('regression')) return FaBrain;
    if (skillLower.includes('clustering')) return FaBrain;
    if (skillLower.includes('time series')) return FaBrain;
    if (skillLower.includes('statistical analysis')) return FaPython;
    if (skillLower.includes('hypothesis testing')) return FaPython;
    if (skillLower.includes('data cleaning') || skillLower.includes('preprocessing')) return FaPython;
    if (skillLower.includes('exploratory data analysis') || skillLower.includes('eda')) return FaPython;
    if (skillLower.includes('web scraping')) return SiSelenium;
    if (skillLower.includes('beautifulsoup')) return FaPython;
    if (skillLower.includes('interactive dashboards')) return SiPowerbi;
    if (skillLower.includes('kpi development')) return SiPowerbi;
    if (skillLower.includes('report automation')) return SiPowerbi;
    if (skillLower.includes('dax') || skillLower.includes('m query')) return SiPowerbi;
    if (skillLower.includes('etl processes')) return FaDatabase;
    if (skillLower.includes('api integration')) return FaCode;
    if (skillLower.includes('agile methodology')) return FaGear;
    if (skillLower.includes('advanced functions') || skillLower.includes('vba')) return SiMicrosoftexcel;
    
    // Database specific
    if (skillLower.includes('database') || skillLower.includes('db')) return FaDatabase;
    if (skillLower.includes('cloud')) return FaCloud;
    
    // Default to code icon instead of star for programming-related skills
    if (skillLower.includes('programming') || skillLower.includes('development') || skillLower.includes('coding')) return FaCode;
    
    // Default icon - try to avoid star
    return FaCode;
  };

  return (
    <Box width="100%" minHeight="100vh" bg={mainBg}>
      <Container maxW="7xl" position="relative" zIndex="1" px={{ base: 4, md: 6 }}>
        <VStack spacing={0} align="stretch" minHeight="100vh">
          
          {/* Main Content Section - Newspaper Style Float */}
          <Box py={{ base: 4, md: 6, lg: 8 }}>
            
            {/* Floating Profile Picture */}
            <Box
              float="right"
              ml={{ base: 3, md: 6 }}
              mb={{ base: 3, md: 4 }}
              animation={`${slideInFromRight} 0.8s ease-out 0.2s both`}
            >
              <VStack spacing={{ base: 2, md: 4 }}>
                <Box
                  position="relative"
                  animation={`${floatAnimation} 3s ease-in-out infinite`}
                >
                  <Avatar
                    size={{ base: "xl", md: "2xl" }}
                    src="/assets/Me.jpg"
                    name="Joel Laggui Jr."
                    border="4px solid"
                    borderColor={accentColor}
                    boxShadow={`0 0 20px ${accentColor}40`}
                    width={{ base: "100px", sm: "120px", md: "180px", lg: "250px" }}
                    height={{ base: "100px", sm: "120px", md: "180px", lg: "250px" }}
                  />
                </Box>
                
                <VStack spacing={1} textAlign="center">
                  <Heading size={{ base: "xs", sm: "sm", md: "md" }} color={textColor} fontWeight="bold">
                    Joel Laggui Jr.
                  </Heading>
                  <HStack spacing={1} color={secondaryText} display={{ base: "none", sm: "flex" }}>
                    <Icon as={FaMapMarkerAlt} boxSize={{ base: 3, md: 4 }} />
                    <Text fontSize={{ base: "xs", md: "sm" }}>Santa Maria, Isabela</Text>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            {/* About Me Content - Text wraps around floated image */}
            <Box animation={`${slideInFromLeft} 0.8s ease-out`}>
              <Heading
                size={{ base: "xl", md: "2xl" }}
                color={accentColor}
                mb={{ base: 3, md: 6 }}
                fontWeight="bold"
                background={`linear-gradient(45deg, ${accentColor}, ${textColor})`}
                backgroundSize="200% 200%"
                backgroundClip="text"
                animation={`${gradientShift} 3s ease infinite`}
              >
                About Me
              </Heading>
              
              {aboutMe.description.map((paragraph, index) => (
                <Text 
                  key={index}
                  fontSize={{ base: "sm", md: "lg" }}
                  color={textColor} 
                  lineHeight="tall"
                  textAlign="justify"
                  mb={4}
                >
                  {paragraph}
                </Text>
              ))}
            </Box>

            {/* Clear float */}
            <Box clear="both" />

            {/* Bible Quote Section */}
            <Box 
              p={{ base: 4, md: 6 }}
              bg={cardBg}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
              position="relative"
              animation={`${fadeIn} 0.8s ease-out 0.4s both`}
              mt={6}
              width="100%"
              overflow="hidden"
            >
              <Icon 
                as={FaQuoteLeft} 
                fontSize={{ base: "lg", md: "2xl" }}
                color={accentColor} 
                position="absolute"
                top={4}
                left={4}
              />
              <Text 
                fontSize={{ base: "sm", md: "lg" }}
                color={textColor} 
                fontStyle="italic"
                lineHeight="tall"
                pl={{ base: 6, md: 8 }}
                mt={2}
              >
                {displayText}
              </Text>
            </Box>

          </Box>

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
            
            <Grid templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={{ base: 2, md: 6 }} w="100%">
              {Object.entries(technicalSkills).map(([category, skills]) => {
                const CategoryIcon = getCategoryIcon(category);
                return (
                  <Box
                    key={category}
                    bg={cardBg}
                    p={{ base: 2, md: 6 }}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    transition="all 0.3s ease"
                    _hover={{
                      borderColor: accentColor,
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 25px ${accentColor}20`
                    }}
                    w="100%"
                    overflow="hidden"
                  >
                    <HStack mb={{ base: 2, md: 4 }} spacing={{ base: 1, md: 3 }} flexWrap="wrap">
                      <Icon
                        as={CategoryIcon}
                        fontSize={{ base: "sm", md: "xl" }}
                        color={buttonText}
                        bg={accentColor}
                        borderRadius="md"
                        p={{ base: 1, md: 2 }}
                        boxSize={{ base: "24px", md: "40px" }}
                        flexShrink={0}
                      />
                      <Text 
                        fontWeight="bold" 
                        fontSize={{ base: "xs", sm: "sm", md: "lg" }} 
                        color={textColor} 
                        flex="1"
                        noOfLines={2}
                        lineHeight="short"
                      >
                        {category}
                      </Text>
                    </HStack>
                    
                    <VStack spacing={{ base: 2, md: 3 }} align="stretch">
                      {skills.map((skill: string, index: number) => {
                        const SkillIcon = getSkillIcon(skill);
                        return (
                          <Badge
                            key={index}
                            px={{ base: 2, md: 3 }}
                            py={2}
                            borderRadius="md"
                            bg={cardBg}
                            color={textColor}
                            fontSize={{ base: "xs", md: "sm" }}
                            textAlign="left"
                            border="1px solid"
                            borderColor={borderColor}
                            _hover={{ 
                              bg: accentColor, 
                              color: buttonText,
                              borderColor: accentColor,
                              transform: 'scale(1.02)',
                              '& .skill-icon': {
                                color: buttonText
                              }
                            }}
                            transition="all 0.2s ease"
                            fontWeight="medium"
                            display="flex"
                            alignItems="center"
                            gap={2}
                            cursor="default"
                          >
                            <Icon 
                              as={SkillIcon} 
                              fontSize={{ base: "sm", md: "md" }}
                              color={accentColor}
                              flexShrink={0}
                              className="skill-icon"
                              transition="color 0.2s ease"
                            />
                            <Text flex="1" minW={0}>
                              {skill}
                            </Text>
                          </Badge>
                        );
                      })}
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
