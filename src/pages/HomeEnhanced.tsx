import {
  Text,
  VStack,
  Box,
  useColorMode,
  HStack,
  Link,
  Icon,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { 
  VscFiles, 
  VscAccount, 
  VscMail, 
  VscDebugAlt,
  VscSettingsGear,
  VscFolderOpened,
} from "react-icons/vsc";
import { keyframes } from "@emotion/react";
import { useEffect } from "react";

interface Props {
  setPage: (page: string) => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HomeEnhanced = ({ setPage }: Props) => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    setPage("home.js");
    // Scroll to top when home page loads to fix scroll position bug
    window.scrollTo(0, 0);
  }, [setPage]);

  // Dynamic theme colors based on current color mode
  const getThemeColors = () => {
    if ((colorMode as string) === 'dracula') {
      return {
        accentColor: "#BD93F9",
        textColor: "#F8F8F2",
        secondaryText: "#6272A4",
        headingColor: "#FF79C6",
        linkColor: "#8BE9FD",
        badgeBg: "#FF79C6",
      };
    } else if (colorMode === 'light') {
      return {
        accentColor: "#C792EA",
        textColor: "#D6DEEB",
        secondaryText: "#7E8B99",
        headingColor: "#82AAFF",
        linkColor: "#82AAFF",
        badgeBg: "#ADDB67",
      };
    } else {
      return {
        accentColor: "#007ACC",
        textColor: "#CCCCCC",
        secondaryText: "#808080",
        headingColor: "#569CD6",
        linkColor: "#3794FF",
        badgeBg: "#0E639C",
      };
    }
  };

  const { accentColor, textColor, secondaryText, linkColor, badgeBg } = getThemeColors();

  // Navigation items like VSCode Welcome
  const startItems = [
    { icon: VscFiles, label: "View Projects", link: "/projects" },
    { icon: VscAccount, label: "About Me", link: "/about" },
    { icon: VscMail, label: "Contact", link: "/contact" },
    { icon: VscSettingsGear, label: "Change Theme", link: "/theme" },
  ];

  // Recent/Featured projects
  const recentItems = [
    { name: "ISU Lost & Found System", path: "Web Application • PHP, MySQL" },
    { name: "TopShoppe E-commerce", path: "Full Stack • React, Node.js" },
    { name: "PinoyAI CLI", path: "CLI Tool • Python, OpenAI" },
    { name: "Pest Sentinel App", path: "Mobile • Flutter, Firebase" },
  ];

  // Skills/Walkthroughs equivalent
  const walkthroughs = [
    { icon: VscDebugAlt, label: "Full Stack Development", badge: "Expert" },
    { icon: VscFolderOpened, label: "React & TypeScript", badge: "Primary" },
    { icon: VscFiles, label: "Flutter & Mobile Apps", badge: "Active" },
    { icon: VscSettingsGear, label: "PHP & Backend Systems", badge: "Experienced" },
  ];

  return (
    <Box 
      h={{ base: "auto", md: "100vh" }}
      minH={{ base: "100vh", md: "auto" }}
      overflow={{ base: "auto", md: "hidden" }}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      px={{ base: 3, md: 6, lg: 12 }}
      py={{ base: 4, md: 6 }}
      pb={{ base: 20, md: 4 }}
    >
      {/* Main Content - VSCode Welcome Style */}
      <Box
        maxW="800px"
        w="100%"
        animation={`${fadeIn} 0.5s ease-out`}
      >
        {/* Title Section */}
        <VStack spacing={0} mb={{ base: 6, md: 4 }} align={{ base: "center", md: "flex-start" }}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="300"
            color={textColor}
            letterSpacing="tight"
          >
            Joel Laggui Jr.
          </Heading>
          <Text 
            fontSize={{ base: "sm", md: "md" }} 
            color={secondaryText}
            fontWeight="300"
          >
            Full Stack Developer
          </Text>
        </VStack>

        {/* Two Column Layout like VSCode Welcome */}
        <Grid 
          templateColumns="1fr 1fr"
          gap={{ base: 4, md: 6, lg: 8 }}
        >
          {/* Left Column - Start & Recent */}
          <GridItem>
            <VStack align="flex-start" spacing={3}>
              {/* Start Section */}
              <Box>
                <Text 
                  fontSize={{ base: "sm", md: "sm" }} 
                  fontWeight="600" 
                  color={textColor} 
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Start
                </Text>
                <VStack align="flex-start" spacing={1}>
                  {startItems.map((item, index) => (
                    <HStack 
                      key={index}
                      as={Link}
                      href={item.link}
                      spacing={2}
                      color={linkColor}
                      _hover={{ color: accentColor, textDecoration: "none" }}
                      transition="color 0.2s"
                      cursor="pointer"
                    >
                      <Icon as={item.icon} fontSize={{ base: "sm", md: "sm" }} />
                      <Text fontSize={{ base: "xs", md: "sm" }}>{item.label}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Recent Section */}
              <Box>
                <Text 
                  fontSize={{ base: "sm", md: "sm" }} 
                  fontWeight="600" 
                  color={textColor} 
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Recent Projects
                </Text>
                <VStack align="flex-start" spacing={0}>
                  {recentItems.map((item, index) => (
                    <Box key={index} mb={1}>
                      <Link
                        href="/projects"
                        color={linkColor}
                        fontSize={{ base: "xs", md: "sm" }}
                        _hover={{ color: accentColor }}
                      >
                        {item.name}
                      </Link>
                      <Text 
                        fontSize={{ base: "10px", md: "12px" }} 
                        color={secondaryText}
                        ml={0}
                      >
                        {item.path}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* Contact Info */}
              <Box>
                <Text 
                  fontSize={{ base: "sm", md: "sm" }} 
                  fontWeight="600" 
                  color={textColor} 
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Contact
                </Text>
                <VStack align="flex-start" spacing={1}>
                  <HStack spacing={2} color={secondaryText}>
                    <Icon as={FaEnvelope} fontSize="12px" />
                    <Text fontSize={{ base: "xs", md: "sm" }}>jlaggui47@gmail.com</Text>
                  </HStack>
                  <HStack spacing={2} color={secondaryText}>
                    <Icon as={FaPhone} fontSize="12px" />
                    <Text fontSize={{ base: "xs", md: "sm" }}>+63 915 368 3496</Text>
                  </HStack>
                  <HStack spacing={2} color={secondaryText}>
                    <Icon as={FaMapMarkerAlt} fontSize="12px" />
                    <Text fontSize={{ base: "xs", md: "sm" }}>Philippines</Text>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </GridItem>

          {/* Right Column - Walkthroughs/Skills */}
          <GridItem>
            <Box>
              <Text 
                fontSize={{ base: "sm", md: "sm" }} 
                fontWeight="600" 
                color={textColor} 
                mb={2}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Expertise
              </Text>
              <VStack align="stretch" spacing={1}>
                {walkthroughs.map((item, index) => (
                  <HStack 
                    key={index}
                    spacing={2}
                    py={1}
                    px={2}
                    borderRadius="md"
                    _hover={{ bg: "whiteAlpha.50" }}
                    transition="background 0.2s"
                  >
                    <Icon as={item.icon} fontSize={{ base: "sm", md: "sm" }} color={secondaryText} />
                    <Text fontSize={{ base: "xs", md: "sm" }} color={textColor} flex={1}>
                      {item.label}
                    </Text>
                    <Box
                      bg={badgeBg}
                      color="white"
                      px={1.5}
                      py={0}
                      borderRadius="sm"
                      fontSize={{ base: "9px", md: "11px" }}
                      fontWeight="500"
                    >
                      {item.badge}
                    </Box>
                  </HStack>
                ))}
              </VStack>

              {/* Social Links */}
              <Box mt={4}>
                <Text 
                  fontSize={{ base: "sm", md: "sm" }} 
                  fontWeight="600" 
                  color={textColor} 
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Connect
                </Text>
                <HStack spacing={3}>
                  <Link href="https://github.com/GITLAGGUI" isExternal>
                    <Icon 
                      as={FaGithub} 
                      fontSize={{ base: "lg", md: "lg" }} 
                      color={secondaryText}
                      _hover={{ color: textColor }}
                      transition="color 0.2s"
                    />
                  </Link>
                  <Link href="https://www.linkedin.com/in/joellagguijr-dev/" isExternal>
                    <Icon 
                      as={FaLinkedin} 
                      fontSize={{ base: "lg", md: "lg" }} 
                      color={secondaryText}
                      _hover={{ color: textColor }}
                      transition="color 0.2s"
                    />
                  </Link>
                  <Link href="https://www.facebook.com/joellagguijr/" isExternal>
                    <Icon 
                      as={FaFacebook} 
                      fontSize={{ base: "lg", md: "lg" }} 
                      color={secondaryText}
                      _hover={{ color: textColor }}
                      transition="color 0.2s"
                    />
                  </Link>
                  <Link href="https://www.instagram.com/jlaggui.jr/#" isExternal>
                    <Icon 
                      as={FaInstagram} 
                      fontSize={{ base: "lg", md: "lg" }} 
                      color={secondaryText}
                      _hover={{ color: textColor }}
                      transition="color 0.2s"
                    />
                  </Link>
                </HStack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomeEnhanced;