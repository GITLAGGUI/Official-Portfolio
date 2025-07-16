import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Image,
  Tooltip,
  keyframes,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useState } from "react";
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaStar,
  FaEye,
  FaDownload,
  FaHeart,
  FaShare
} from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`;

interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planning';
  featured: boolean;
  metrics?: {
    users?: number;
    downloads?: number;
    stars?: number;
    views?: number;
  };
  gallery?: string[];
  videoUrl?: string;
  completionDate?: string;
  teamSize?: number;
  duration?: string;
  challenges?: string[];
  achievements?: string[];
}

interface ProjectsEnhancedProps {
  projects: ProjectData[];
  showFilters?: boolean;
  showMetrics?: boolean;
  variant?: 'grid' | 'list' | 'featured';
}

const ProjectsEnhanced = ({ 
  projects, 
  showFilters = true, 
  showMetrics = true,
  variant = 'grid'
}: ProjectsEnhancedProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleLike = (projectId: string) => {
    const newLikedProjects = new Set(likedProjects);
    if (newLikedProjects.has(projectId)) {
      newLikedProjects.delete(projectId);
      toast({
        title: "Removed from favorites",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else {
      newLikedProjects.add(projectId);
      toast({
        title: "Added to favorites",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    setLikedProjects(newLikedProjects);
  };

  const handleShare = (project: ProjectData) => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: project.liveUrl || project.githubUrl || window.location.href,
      });
    } else {
      navigator.clipboard.writeText(project.liveUrl || project.githubUrl || window.location.href);
      toast({
        title: "Link copied to clipboard",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const openProjectModal = (project: ProjectData) => {
    setSelectedProject(project);
    onOpen();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'yellow';
      case 'planning': return 'blue';
      default: return 'gray';
    }
  };

  const renderProjectCard = (project: ProjectData, index: number) => (
    <Card
      key={project.id}
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorderColor}
      boxShadow="xl"
      backdropFilter="blur(10px)"
      transition="all 0.3s"
      _hover={{ 
        transform: "translateY(-4px)", 
        boxShadow: "2xl",
        borderColor: accentColor 
      }}
      animation={`${fadeIn} ${0.5 + index * 0.1}s ease-out`}
      cursor="pointer"
      onClick={() => openProjectModal(project)}
      position="relative"
      overflow="hidden"
    >
      {project.featured && (
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme="yellow"
          zIndex={1}
          animation={`${pulse} 2s infinite`}
        >
          Featured
        </Badge>
      )}

      <Box position="relative" overflow="hidden">
        <Image
          src={project.image}
          alt={project.title}
          height="200px"
          width="100%"
          objectFit="cover"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          opacity={0}
          transition="opacity 0.3s"
          _hover={{ opacity: 1 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <HStack spacing={2}>
            {project.liveUrl && (
              <Tooltip label="View Live Demo">
                <Button
                  size="sm"
                  colorScheme="teal"
                  leftIcon={<FaExternalLinkAlt />}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveUrl, '_blank');
                  }}
                >
                  Demo
                </Button>
              </Tooltip>
            )}
            {project.githubUrl && (
              <Tooltip label="View Source Code">
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  leftIcon={<FaGithub />}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank');
                  }}
                >
                  Code
                </Button>
              </Tooltip>
            )}
          </HStack>
        </Box>
      </Box>

      <CardBody>
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between" align="start">
            <Heading size="md" color={textColor} noOfLines={1}>
              {project.title}
            </Heading>
            <Badge colorScheme={getStatusColor(project.status)} size="sm">
              {project.status.replace('-', ' ')}
            </Badge>
          </HStack>

          <Text color="whiteAlpha.800" fontSize="sm" noOfLines={3}>
            {project.description}
          </Text>

          <HStack wrap="wrap" spacing={1}>
            {project.technologies.slice(0, 4).map((tech, i) => (
              <Badge key={i} size="xs" colorScheme="teal" variant="subtle">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge size="xs" colorScheme="gray" variant="subtle">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </HStack>

          {showMetrics && project.metrics && (
            <SimpleGrid columns={2} spacing={2}>
              {project.metrics.users && (
                <HStack spacing={1}>
                  <Icon as={FaUsers} color={accentColor} size="12px" />
                  <Text fontSize="xs" color={textColor}>
                    {project.metrics.users.toLocaleString()} users
                  </Text>
                </HStack>
              )}
              {project.metrics.stars && (
                <HStack spacing={1}>
                  <Icon as={FaStar} color="yellow.400" size="12px" />
                  <Text fontSize="xs" color={textColor}>
                    {project.metrics.stars} stars
                  </Text>
                </HStack>
              )}
              {project.metrics.downloads && (
                <HStack spacing={1}>
                  <Icon as={FaDownload} color={accentColor} size="12px" />
                  <Text fontSize="xs" color={textColor}>
                    {project.metrics.downloads.toLocaleString()} downloads
                  </Text>
                </HStack>
              )}
              {project.metrics.views && (
                <HStack spacing={1}>
                  <Icon as={FaEye} color={accentColor} size="12px" />
                  <Text fontSize="xs" color={textColor}>
                    {project.metrics.views.toLocaleString()} views
                  </Text>
                </HStack>
              )}
            </SimpleGrid>
          )}

          <HStack justify="space-between">
            <HStack spacing={2}>
              <Tooltip label={likedProjects.has(project.id) ? "Remove from favorites" : "Add to favorites"}>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme={likedProjects.has(project.id) ? "red" : "gray"}
                  leftIcon={<FaHeart />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(project.id);
                  }}
                >
                  {likedProjects.has(project.id) ? 'Liked' : 'Like'}
                </Button>
              </Tooltip>
              <Tooltip label="Share project">
                <Button
                  size="xs"
                  variant="ghost"
                  leftIcon={<FaShare />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(project);
                  }}
                >
                  Share
                </Button>
              </Tooltip>
            </HStack>
            {project.completionDate && (
              <HStack spacing={1}>
                <Icon as={FaCalendarAlt} color={accentColor} size="12px" />
                <Text fontSize="xs" color="whiteAlpha.700">
                  {project.completionDate}
                </Text>
              </HStack>
            )}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );

  const renderProjectModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg={cardBg} border="1px solid" borderColor={cardBorderColor}>
        <ModalHeader color={textColor}>
          <HStack justify="space-between">
            <Text>{selectedProject?.title}</Text>
            <Badge colorScheme={getStatusColor(selectedProject?.status || '')}>
              {selectedProject?.status.replace('-', ' ')}
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color={textColor} />
        <ModalBody pb={6}>
          {selectedProject && (
            <Tabs colorScheme="teal">
              <TabList>
                <Tab>Overview</Tab>
                {selectedProject.gallery && <Tab>Gallery</Tab>}
                <Tab>Technical Details</Tab>
                {selectedProject.achievements && <Tab>Achievements</Tab>}
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack align="stretch" spacing={6}>
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      borderRadius="lg"
                      maxH="400px"
                      objectFit="cover"
                    />
                    
                    <Text color="whiteAlpha.900" lineHeight="1.6">
                      {selectedProject.longDescription || selectedProject.description}
                    </Text>

                    {selectedProject.metrics && (
                      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                        {Object.entries(selectedProject.metrics).map(([key, value]) => (
                          <Box key={key} textAlign="center" p={3} bg="whiteAlpha.100" borderRadius="lg">
                            <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                              {typeof value === 'number' ? value.toLocaleString() : value}
                            </Text>
                            <Text fontSize="sm" color="whiteAlpha.700" textTransform="capitalize">
                              {key}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    )}

                    <HStack spacing={4}>
                      {selectedProject.liveUrl && (
                        <Button
                          leftIcon={<FaExternalLinkAlt />}
                          colorScheme="teal"
                          onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                        >
                          View Live Demo
                        </Button>
                      )}
                      {selectedProject.githubUrl && (
                        <Button
                          leftIcon={<FaGithub />}
                          variant="outline"
                          colorScheme="teal"
                          onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                        >
                          View Source Code
                        </Button>
                      )}
                    </HStack>
                  </VStack>
                </TabPanel>

                {selectedProject.gallery && (
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                      {selectedProject.gallery.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`${selectedProject.title} screenshot ${index + 1}`}
                          borderRadius="lg"
                          transition="transform 0.3s"
                          _hover={{ transform: "scale(1.05)" }}
                          cursor="pointer"
                        />
                      ))}
                    </SimpleGrid>
                  </TabPanel>
                )}

                <TabPanel>
                  <VStack align="stretch" spacing={6}>
                    <Box>
                      <Heading size="sm" color={textColor} mb={3}>Technologies Used</Heading>
                      <HStack wrap="wrap" spacing={2}>
                        {selectedProject.technologies.map((tech, i) => (
                          <Badge key={i} colorScheme="teal" p={2}>
                            {tech}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {selectedProject.teamSize && (
                        <Box>
                          <Heading size="sm" color={textColor} mb={2}>Team Size</Heading>
                          <HStack>
                            <Icon as={FaUsers} color={accentColor} />
                            <Text color="whiteAlpha.900">{selectedProject.teamSize} members</Text>
                          </HStack>
                        </Box>
                      )}

                      {selectedProject.duration && (
                        <Box>
                          <Heading size="sm" color={textColor} mb={2}>Duration</Heading>
                          <HStack>
                            <Icon as={FaCalendarAlt} color={accentColor} />
                            <Text color="whiteAlpha.900">{selectedProject.duration}</Text>
                          </HStack>
                        </Box>
                      )}
                    </SimpleGrid>

                    {selectedProject.challenges && (
                      <Box>
                        <Heading size="sm" color={textColor} mb={3}>Challenges Overcome</Heading>
                        <VStack align="stretch" spacing={2}>
                          {selectedProject.challenges.map((challenge, i) => (
                            <Text key={i} color="whiteAlpha.800" fontSize="sm">
                              • {challenge}
                            </Text>
                          ))}
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </TabPanel>

                {selectedProject.achievements && (
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      <Heading size="sm" color={textColor}>Key Achievements</Heading>
                      {selectedProject.achievements.map((achievement, i) => (
                        <HStack key={i} spacing={3} p={3} bg="whiteAlpha.100" borderRadius="lg">
                          <Icon as={FaStar} color="yellow.400" />
                          <Text color="whiteAlpha.900">{achievement}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  return (
    <VStack spacing={8} align="stretch">
      {showFilters && (
        <HStack spacing={2} wrap="wrap" justify="center">
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? "solid" : "outline"}
              colorScheme="teal"
              onClick={() => setSelectedCategory(category)}
              textTransform="capitalize"
            >
              {category === 'all' ? 'All Projects' : category}
            </Button>
          ))}
        </HStack>
      )}

      <SimpleGrid
        columns={{ 
          base: 1, 
          md: variant === 'list' ? 1 : 2, 
          lg: variant === 'list' ? 1 : variant === 'featured' ? 2 : 3 
        }}
        spacing={6}
      >
        {filteredProjects.map((project, index) => renderProjectCard(project, index))}
      </SimpleGrid>

      {renderProjectModal()}
    </VStack>
  );
};

export default ProjectsEnhanced;