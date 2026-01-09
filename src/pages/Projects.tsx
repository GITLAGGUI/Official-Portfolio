import { SimpleGrid, Box, Heading, VStack, useColorMode } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import Project from "../components/Projects/Project";
import { projects } from "../../public/data/projects";

interface Props {
  setPage: (page: string) => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const titleGlow = keyframes`
  0% { text-shadow: 0 0 5px rgba(99, 179, 237, 0.3); }
  50% { text-shadow: 0 0 20px rgba(99, 179, 237, 0.6), 0 0 30px rgba(99, 179, 237, 0.4); }
  100% { text-shadow: 0 0 5px rgba(99, 179, 237, 0.3); }
`;

const Projects = ({ setPage }: Props) => {
  const { colorMode } = useColorMode();
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>(() => {
    // Initialize with all projects hidden (blurred)
    return new Array(projects.length).fill(false);
  });
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Dynamic theme colors based on current color mode
  const getThemeColors = () => {
    if ((colorMode as any) === 'dracula') {
      return {
        mainBg: "#282A36", // Single consistent Dracula background
        titleGradient: "linear(to-r, draculaSoft.purple, draculaSoft.pink, draculaSoft.cyan)",
      };
    } else if (colorMode === 'dark') {
      return {
        mainBg: "#1A202C", // Single consistent dark background
        titleGradient: "linear(to-r, #63B3ED, #4299E1, #3182CE)",
      };
    } else {
      // Night Owl theme
      return {
        mainBg: "#011627", // Single consistent Night Owl background
        titleGradient: "linear(to-r, nightOwl.accent, #7E57C2, #B39DDB)",
      };
    }
  };

  const { mainBg, titleGradient } = getThemeColors();

  useEffect(() => {
    setPage("projects.json");
    
    // Intersection Observer for scroll animations with staggered effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          
          if (entry.isIntersecting) {
            setVisibleProjects(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          } else {
            // Re-add blur effect when element leaves viewport
            setVisibleProjects(prev => {
              const newVisible = [...prev];
              newVisible[index] = false;
              return newVisible;
            });
          }
        });
      },
      {
        threshold: 0.3, // Increased threshold for better trigger point
        rootMargin: '0px 0px -100px 0px' // Adjusted margin for better timing
      }
    );

    // Start observing all projects (including first 2)
    setTimeout(() => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const getProjectPairs = () => {
    const pairs = [];
    for (let i = 0; i < projects.length; i += 2) {
      pairs.push(projects.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <Box width="100%" minHeight="100vh" bg={mainBg}>
      <VStack spacing={0} width="100%" minHeight="100vh">
        {/* Title Section */}
        <Box 
          width="100%" 
          py={{ base: 4, md: 8, lg: 12 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg={mainBg}
          minHeight={{ base: "15vh", md: "25vh", lg: "30vh" }}
          px={{ base: 4, md: 0 }}
        >
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl", lg: "2xl" }}
            textAlign="center"
            bgGradient={titleGradient}
            bgClip="text"
            fontWeight="bold"
            animation={`${fadeIn} 0.8s ease-out, ${titleGlow} 3s ease-in-out infinite`}
            letterSpacing="wider"
          >
            Featured Projects
          </Heading>
        </Box>

        {/* Projects Section */}
        <Box width="100%" flex="1" bg={mainBg}>
          {getProjectPairs().map((pair, pairIndex) => (
            <Box
              key={pairIndex}
              minHeight={{ base: "auto", md: "50vh", lg: "70vh" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              py={{ base: 2, md: 4, lg: 8 }}
              bg={mainBg}
            >
              <Box
                maxWidth={{ base: "100%", md: "95%", lg: "1200px" }}
                width="100%"
                px={{ base: 2, sm: 4, md: 6, lg: 8 }}
              >
                <SimpleGrid
                  columns={{ base: 1, lg: 2 }}
                  spacing={{ base: 3, sm: 4, md: 6, lg: 8 }}
                  width="100%"
                >
                  {pair.map((project, indexInPair) => {
                    const globalIndex = pairIndex * 2 + indexInPair;
                    return (
                      <Box
                        key={globalIndex}
                        ref={(el) => (projectRefs.current[globalIndex] = el)}
                        data-index={globalIndex}
                        opacity={visibleProjects[globalIndex] ? 1 : 0.3}
                        filter={visibleProjects[globalIndex] ? 'blur(0px)' : 'blur(8px)'}
                        transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                        _hover={{
                          filter: visibleProjects[globalIndex] ? 'blur(0px) brightness(1.05)' : undefined,
                          transition: "all 0.3s ease"
                        }}
                        height="fit-content"
                        mb={{ base: 4, md: 0 }}
                        bg="transparent"
                        border="none"
                        boxShadow="none"
                      >
                        <Project
                          ImageURL={project.ImageURL}
                          Title={project.Title}
                          Description={project.Description}
                          Technologies={project.Technologies}
                          Source={project.Source}
                          Demo={project.Demo}
                          projectIndex={globalIndex}
                        />
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Box>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default Projects;
