import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Icon,
  Progress,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Badge,
  Tooltip,
  keyframes,
} from "@chakra-ui/react";
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDatabase, 
  FaMobile, 
  FaChartBar,
  FaCode,
  FaServer,
  FaCloud,
  FaTools
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiMongodb, 
  SiPostgresql, 
  SiAmazonaws, 
  SiDocker,
  SiKubernetes,
  SiPowerbi,
  SiTableau,
  SiGit,
  SiVuedotjs,
  SiAngular,
  SiFlutter,
  SiDjango,
  SiFastapi,
  SiRedis,
  SiElasticsearch
} from "react-icons/si";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

interface Skill {
  name: string;
  icon: any;
  level: number;
  color: string;
  category: string;
}

interface SkillsShowcaseProps {
  variant?: 'grid' | 'compact' | 'detailed';
  showCategories?: boolean;
  maxItems?: number;
}

const SkillsShowcase = ({ 
  variant = 'grid', 
  showCategories = true, 
  maxItems 
}: SkillsShowcaseProps) => {
  const accentColor = useColorModeValue("syntax.keyword", "#0BCEAF");
  const textColor = useColorModeValue("nightOwl.text", "whiteAlpha.900");
  const cardBg = useColorModeValue(
    "rgba(1, 22, 39, 0.7)",
    "rgba(31, 36, 40, 0.7)"
  );
  const cardBorderColor = useColorModeValue(
    "rgba(126, 87, 194, 0.2)",
    "rgba(11, 206, 175, 0.2)"
  );

  const allSkills: Skill[] = [
    // Frontend
    { name: "React.js", icon: FaReact, level: 95, color: "#61DAFB", category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, level: 92, color: "#000000", category: "Frontend" },
    { name: "TypeScript", icon: SiTypescript, level: 88, color: "#3178C6", category: "Frontend" },
    { name: "Vue.js", icon: SiVuedotjs, level: 75, color: "#4FC08D", category: "Frontend" },
    { name: "Angular", icon: SiAngular, level: 70, color: "#DD0031", category: "Frontend" },
    
    // Backend
    { name: "Node.js", icon: FaNodeJs, level: 90, color: "#339933", category: "Backend" },
    { name: "Python", icon: FaPython, level: 85, color: "#3776AB", category: "Backend" },
    { name: "Django", icon: SiDjango, level: 80, color: "#092E20", category: "Backend" },
    { name: "FastAPI", icon: SiFastapi, level: 78, color: "#009688", category: "Backend" },
    
    // Database
    { name: "MongoDB", icon: SiMongodb, level: 80, color: "#47A248", category: "Database" },
    { name: "PostgreSQL", icon: SiPostgresql, level: 78, color: "#336791", category: "Database" },
    { name: "Redis", icon: SiRedis, level: 72, color: "#DC382D", category: "Database" },
    { name: "Elasticsearch", icon: SiElasticsearch, level: 68, color: "#005571", category: "Database" },
    
    // Mobile
    { name: "React Native", icon: FaMobile, level: 82, color: "#61DAFB", category: "Mobile" },
    { name: "Flutter", icon: SiFlutter, level: 75, color: "#02569B", category: "Mobile" },
    
    // Data & Analytics
    { name: "Power BI", icon: SiPowerbi, level: 88, color: "#F2C811", category: "Data & Analytics" },
    { name: "Tableau", icon: SiTableau, level: 82, color: "#E97627", category: "Data & Analytics" },
    { name: "Data Analysis", icon: FaChartBar, level: 90, color: "#FF6B6B", category: "Data & Analytics" },
    
    // DevOps & Cloud
    { name: "AWS", icon: SiAmazonaws, level: 75, color: "#FF9900", category: "DevOps & Cloud" },
    { name: "Docker", icon: SiDocker, level: 70, color: "#2496ED", category: "DevOps & Cloud" },
    { name: "Kubernetes", icon: SiKubernetes, level: 65, color: "#326CE5", category: "DevOps & Cloud" },
    { name: "Git", icon: SiGit, level: 95, color: "#F05032", category: "DevOps & Cloud" },
  ];

  const skills = maxItems ? allSkills.slice(0, maxItems) : allSkills;
  const categories = [...new Set(skills.map(skill => skill.category))];

  const getSkillsByCategory = (category: string) => 
    skills.filter(skill => skill.category === category);

  const renderSkillItem = (skill: Skill, index: number) => {
    const skillContent = (
      <Box
        key={skill.name}
        p={variant === 'compact' ? 3 : 4}
        borderRadius="lg"
        bg="whiteAlpha.50"
        border="1px solid"
        borderColor="whiteAlpha.200"
        transition="all 0.3s"
        _hover={{ 
          bg: "whiteAlpha.100", 
          transform: "translateY(-2px)",
          borderColor: skill.color
        }}
        animation={`${float} ${3 + index * 0.2}s ease-in-out infinite`}
        cursor="pointer"
      >
        {variant === 'detailed' ? (
          <VStack spacing={3} align="stretch">
            <HStack justify="space-between">
              <HStack>
                <Icon as={skill.icon} color={skill.color} size="20px" />
                <Text fontSize="sm" fontWeight="medium" color={textColor}>
                  {skill.name}
                </Text>
              </HStack>
              <Badge colorScheme="teal" fontSize="xs">
                {skill.level}%
              </Badge>
            </HStack>
            <Progress 
              value={skill.level} 
              size="sm" 
              colorScheme="teal"
              bg="whiteAlpha.200"
              borderRadius="full"
            />
          </VStack>
        ) : variant === 'compact' ? (
          <HStack spacing={2}>
            <Icon as={skill.icon} color={skill.color} size="16px" />
            <Text fontSize="xs" color={textColor}>{skill.name}</Text>
            <Text fontSize="xs" color={accentColor}>{skill.level}%</Text>
          </HStack>
        ) : (
          <VStack spacing={2}>
            <Icon as={skill.icon} color={skill.color} size="24px" />
            <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="center">
              {skill.name}
            </Text>
            <Text fontSize="xs" color={accentColor}>{skill.level}%</Text>
          </VStack>
        )}
      </Box>
    );

    return (
      <Tooltip
        key={skill.name}
        label={`${skill.name} - ${skill.level}% proficiency in ${skill.category}`}
        placement="top"
        hasArrow
        bg={cardBg}
        color={textColor}
      >
        {skillContent}
      </Tooltip>
    );
  };

  if (variant === 'compact') {
    return (
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={2}>
        {skills.map((skill, index) => renderSkillItem(skill, index))}
      </SimpleGrid>
    );
  }

  if (!showCategories) {
    return (
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {skills.map((skill, index) => renderSkillItem(skill, index))}
      </SimpleGrid>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      {categories.map((category, categoryIndex) => (
        <Card
          key={category}
          bg={cardBg}
          border="1px solid"
          borderColor={cardBorderColor}
          boxShadow="xl"
          backdropFilter="blur(10px)"
          animation={`${float} ${2 + categoryIndex * 0.3}s ease-in-out infinite`}
        >
          <CardHeader pb={2}>
            <Heading size="sm" color={textColor} display="flex" alignItems="center">
              <Icon 
                as={
                  category === 'Frontend' ? FaCode :
                  category === 'Backend' ? FaServer :
                  category === 'Database' ? FaDatabase :
                  category === 'Mobile' ? FaMobile :
                  category === 'Data & Analytics' ? FaChartBar :
                  category === 'DevOps & Cloud' ? FaCloud :
                  FaTools
                } 
                mr={2} 
                color={accentColor} 
              />
              {category}
              <Badge ml={2} colorScheme="teal" size="sm">
                {getSkillsByCategory(category).length}
              </Badge>
            </Heading>
          </CardHeader>
          <CardBody pt={0}>
            <SimpleGrid 
              columns={{ 
                base: variant === 'detailed' ? 1 : 2, 
                md: variant === 'detailed' ? 2 : 3, 
                lg: variant === 'detailed' ? 3 : 4 
              }} 
              spacing={4}
            >
              {getSkillsByCategory(category).map((skill, index) => 
                renderSkillItem(skill, index)
              )}
            </SimpleGrid>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

export default SkillsShowcase;