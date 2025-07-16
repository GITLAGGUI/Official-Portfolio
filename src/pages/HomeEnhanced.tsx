import {
  Image,
  Text,
  VStack,
  Flex,
  Box,
  keyframes,
  useColorModeValue,
  Badge,
  HStack,
  SimpleGrid,
  Icon,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaMobile, 
  FaChartBar,
  FaAward,
  FaCode,
  FaBrain,
  FaGraduationCap,
  FaRocket,
  FaUsers,
  FaProjectDiagram
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiMongodb, SiPostgresql, SiAmazonaws, SiDocker, SiPowerbi } from "react-icons/si";
import HomeItem from "../components/HomeItem";
import { homeData } from "../../public/data/home";

interface Props {
  setPage: (page: string) => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const HomeEnhanced = ({ setPage }: Props) => {
  const [visitorCount, setVisitorCount] = useState(1247);

  useEffect(() => {
    setPage("home.js");
    // Simulate visitor count increment
    const timer = setTimeout(() => {
      setVisitorCount(prev => prev + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const accentColor = useColorModeValue("syntax.keyword", "#0BCEAF");
  const textColor = useColorModeValue("nightOwl.text", "whiteAlpha.900");
  const headingColor = useColorModeValue("nightOwl.text", "whiteAlpha.900");
  const cardBg = useColorModeValue(
    "rgba(1, 22, 39, 0.7)",
    "rgba(31, 36, 40, 0.7)"
  );
  const cardBorderColor = useColorModeValue(
    "rgba(126, 87, 194, 0.2)",
    "rgba(11, 206, 175, 0.2)"
  );
  const statsBg = useColorModeValue(
    "rgba(1, 22, 39, 0.5)",
    "rgba(31, 36, 40, 0.5)"
  );

  // Skills data with proficiency levels
  const skills = [
    { name: "React.js", icon: FaReact, level: 95, color: "#61DAFB" },
    { name: "Node.js", icon: FaNodeJs, level: 90, color: "#339933" },
    { name: "TypeScript", icon: SiTypescript, level: 88, color: "#3178C6" },
    { name: "Python", icon: FaPython, level: 85, color: "#3776AB" },
    { name: "Next.js", icon: SiNextdotjs, level: 92, color: "#000000" },
    { name: "MongoDB", icon: SiMongodb, level: 80, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, level: 78, color: "#336791" },
    { name: "AWS", icon: SiAmazonaws, level: 75, color: "#FF9900" },
    { name: "Docker", icon: SiDocker, level: 70, color: "#2496ED" },
    { name: "Power BI", icon: SiPowerbi, level: 88, color: "#F2C811" },
    { name: "React Native", icon: FaMobile, level: 82, color: "#61DAFB" },
    { name: "Data Analysis", icon: FaChartBar, level: 90, color: "#FF6B6B" },
  ];

  // Recent achievements
  const achievements = [
    {
      title: "SPUP Innovation Certificate",
      date: "March 2025",
      icon: FaAward,
      color: "gold"
    },
    {
      title: "Huawei Algorithm Certificate",
      date: "February 2025",
      icon: FaBrain,
      color: "blue.400"
    },
    {
      title: "10K+ App Downloads",
      date: "Eskwelahan.ph",
      icon: FaMobile,
      color: "green.400"
    },
    {
      title: "Enterprise Dashboard",
      date: "Power BI Project",
      icon: FaChartBar,
      color: "purple.400"
    }
  ];

  // Portfolio stats
  const portfolioStats = [
    { label: "Projects Completed", value: 25, change: 12, icon: FaProjectDiagram },
    { label: "Happy Clients", value: 18, change: 8, icon: FaUsers },
    { label: "Technologies Mastered", value: 15, change: 3, icon: FaCode },
    { label: "Years Experience", value: 3, change: 0, icon: FaGraduationCap }
  ];

  const renderSection = (items: typeof homeData.contactInfo) => (
    <Card
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorderColor}
      boxShadow="xl"
      width="100%"
      transition="all 0.3s"
      backdropFilter="blur(10px)"
      _hover={{ transform: "translateY(-2px)", boxShadow: "2xl" }}
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          {items.map((item, index) => (
            <HomeItem key={index} {...item} />
          ))}
        </VStack>
      </CardBody>
    </Card>
  );

  const renderSkillsGrid = () => (
    <Card
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorderColor}
      boxShadow="xl"
      backdropFilter="blur(10px)"
    >
      <CardHeader>
        <Heading size="md" color={headingColor} display="flex" alignItems="center">
          <Icon as={FaCode} mr={2} color={accentColor} />
          Technical Skills
        </Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {skills.map((skill, index) => (
            <Box key={index}>
              <HStack justify="space-between" mb={2}>
                <HStack>
                  <Icon as={skill.icon} color={skill.color} />
                  <Text fontSize="sm" color={textColor}>{skill.name}</Text>
                </HStack>
                <Text fontSize="xs" color={accentColor}>{skill.level}%</Text>
              </HStack>
              <Progress 
                value={skill.level} 
                size="sm" 
                colorScheme="teal"
                bg="whiteAlpha.200"
                borderRadius="full"
              />
            </Box>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );

  const renderAchievements = () => (
    <Card
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorderColor}
      boxShadow="xl"
      backdropFilter="blur(10px)"
    >
      <CardHeader>
        <Heading size="md" color={headingColor} display="flex" alignItems="center">
          <Icon as={FaAward} mr={2} color={accentColor} />
          Recent Achievements
        </Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {achievements.map((achievement, index) => (
            <Box
              key={index}
              p={4}
              borderRadius="lg"
              bg="whiteAlpha.50"
              border="1px solid"
              borderColor="whiteAlpha.200"
              transition="all 0.3s"
              _hover={{ bg: "whiteAlpha.100", transform: "translateY(-2px)" }}
            >
              <HStack spacing={3}>
                <Icon as={achievement.icon} color={achievement.color} size="20px" />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="bold" color={textColor}>
                    {achievement.title}
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.700">
                    {achievement.date}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );

  const renderPortfolioStats = () => (
    <Card
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorderColor}
      boxShadow="xl"
      backdropFilter="blur(10px)"
    >
      <CardHeader>
        <Heading size="md" color={headingColor} display="flex" alignItems="center">
          <Icon as={FaRocket} mr={2} color={accentColor} />
          Portfolio Statistics
        </Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          {portfolioStats.map((stat, index) => (
            <Stat key={index} textAlign="center">
              <Box mb={2}>
                <Icon as={stat.icon} color={accentColor} size="24px" />
              </Box>
              <StatNumber color={headingColor} fontSize="2xl">
                {stat.value}
              </StatNumber>
              <StatLabel color={textColor} fontSize="xs">
                {stat.label}
              </StatLabel>
              {stat.change > 0 && (
                <StatHelpText color="green.400" fontSize="xs">
                  <StatArrow type="increase" />
                  +{stat.change} this year
                </StatHelpText>
              )}
            </Stat>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );

  return (
    <Box minHeight="100%" px={{ base: 4, md: 8 }} py={{ base: 8, md: 6 }}>
      {/* Hero Section */}
      <Flex
        minHeight="60vh"
        justify="space-around"
        align="center"
        direction={{ base: "column-reverse", lg: "row" }}
        gap={{ base: 8, md: 16 }}
        mb={12}
      >
        <VStack
          alignItems={{ base: "center", lg: "flex-start" }}
          justify="center"
          spacing={6}
          animation={`${fadeIn} 0.5s ease-out`}
          color={textColor}
          flex={1}
        >
          <Box textAlign={{ base: "center", lg: "left" }}>
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              letterSpacing="wide"
              color={headingColor}
            >
              JOEL LAGGUI JR.
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              color={accentColor}
              mb={4}
            >
              Full-Stack Developer (Web & Mobile) | Data Analyst
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.800"
              maxW="500px"
              lineHeight="1.6"
              mb={6}
            >
              Passionate about creating innovative digital solutions with modern technologies. 
              Specialized in React, Node.js, Python, and data visualization.
            </Text>
            
            {/* Visitor Counter */}
            <Box mt={6} p={3} borderRadius="lg" bg={statsBg} maxW="fit-content">
              <HStack spacing={2}>
                <Icon as={FaUsers} color={accentColor} />
                <Text fontSize="sm" color={textColor}>
                  Portfolio Visitors: 
                  <Text as="span" fontWeight="bold" color={accentColor} ml={2}>
                    {visitorCount.toLocaleString()}
                  </Text>
                </Text>
              </HStack>
            </Box>
          </Box>

          {/* Contact Info */}
          {renderSection(homeData.contactInfo)}
        </VStack>

        {/* Profile Image */}
        <Box 
          position="relative" 
          animation={`${fadeIn} 0.5s ease-out`}
          flex={{ base: "none", lg: "0 0 auto" }}
        >
          <Box
            position="absolute"
            inset="0"
            borderRadius="50%"
            bgGradient={`radial(${accentColor}, transparent 70%)`}
            opacity={useColorModeValue("0.1", "0.15")}
            filter="blur(15px)"
            animation={`${pulse} 3s infinite`}
          />
          <Image
            src={homeData.myImage}
            width={{ base: "250px", sm: "300px", md: "350px", lg: "400px" }}
            height="auto"
            borderRadius="50%"
            border="4px solid"
            borderColor={accentColor}
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.02)" }}
            animation={`${float} 6s ease-in-out infinite`}
          />
          
          {/* Status Badge */}
          <Badge
            position="absolute"
            bottom="20px"
            right="20px"
            colorScheme="green"
            fontSize="sm"
            p={2}
            borderRadius="full"
            animation={`${pulse} 2s infinite`}
          >
            Available for Work
          </Badge>
        </Box>
      </Flex>

      {/* Enhanced Sections Grid */}
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={8}
        mb={8}
      >
        <GridItem>
          {renderSkillsGrid()}
        </GridItem>
        <GridItem>
          {renderAchievements()}
        </GridItem>
      </Grid>

      {/* Portfolio Stats */}
      <Box mb={8}>
        {renderPortfolioStats()}
      </Box>

      {/* Additional Sections */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={8}
      >
        <GridItem>
          {renderSection(homeData.education)}
        </GridItem>
        <GridItem>
          {renderSection(homeData.social)}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomeEnhanced;