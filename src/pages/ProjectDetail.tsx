import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Image,
  Grid,
  Badge,
  Icon,
  useColorMode,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';
import { 
  FaArrowLeft, 
  FaGithub, 
  FaExternalLinkAlt, 
  FaFacebook,
  FaCode,
} from 'react-icons/fa';
import { projects } from '../../public/data/projects';

interface Props {
  setPage: (page: string) => void;
}

const ProjectDetail = ({ setPage }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const projectIndex = parseInt(id);
      if (projectIndex >= 0 && projectIndex < projects.length) {
        setProject(projects[projectIndex]);
        setPage(`${projects[projectIndex].Title.toLowerCase().replace(/\s+/g, '-')}.tsx`);
      }
    }
  }, [id, setPage]);

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
    } else if (colorMode === 'dark') {
      return {
        mainBg: "#1A202C",
        cardBg: "#2D3748",
        textColor: "#E2E8F0",
        secondaryText: "#A0AEC0",
        accentColor: "#0BCEAF",
        borderColor: "#4A5568",
        linkColor: "#63B3ED",
        buttonBg: "#0BCEAF",
        buttonText: "#1A202C",
      };
    } else {
      // Night Owl theme
      return {
        mainBg: "#011627",
        cardBg: "#0E293F",
        textColor: "#d6deeb",
        secondaryText: "#637777",
        accentColor: "#7E57C2",
        borderColor: "#1D3A5F",
        linkColor: "#82AAFF",
        buttonBg: "#7E57C2",
        buttonText: "#ffffff",
      };
    }
  };

  const { mainBg, cardBg, textColor, secondaryText, accentColor, borderColor, linkColor, buttonBg, buttonText } = getThemeColors();

  // Function to determine the appropriate icon for demo links
  const getDemoIcon = (demoUrl: string) => {
    if (demoUrl.includes('facebook.com')) return FaFacebook;
    return FaExternalLinkAlt;
  };

  // Generate language statistics based on actual GitHub repository analysis
  const getLanguageStats = (projectTitle: string) => {
    switch (projectTitle) {
      case 'Hotplate': // Flutter/Dart Restaurant App
        return [
          { name: 'Dart', percentage: '80.6', color: '#0175C2' },
          { name: 'C++', percentage: '9.9', color: '#00599C' },
          { name: 'CMake', percentage: '7.6', color: '#064F8C' },
          { name: 'Swift', percentage: '1.4', color: '#FA7343' },
          { name: 'C', percentage: '0.5', color: '#A8B9CC' }
        ];
      case 'Maria Lourdes Mansion': // TypeScript/Next.js Website
        return [
          { name: 'TypeScript', percentage: '77.8', color: '#3178C6' },
          { name: 'CSS', percentage: '15.8', color: '#1572B6' },
          { name: 'JavaScript', percentage: '5.6', color: '#F7DF1E' },
          { name: 'Shell', percentage: '0.8', color: '#89E051' }
        ];
      case 'Prostate Cancer Risk Analysis Dashboard': // Python Streamlit
      case 'Prostate Cancer Analytics Dashboard':
        return [
          { name: 'Jupyter Notebook', percentage: '95.5', color: '#DA5B0B' },
          { name: 'Python', percentage: '4.5', color: '#3776AB' }
        ];
      case 'ISU Lost & Found System': // PHP/MySQL
        return [
          { name: 'PHP', percentage: '52.9', color: '#777BB4' },
          { name: 'CSS', percentage: '38.3', color: '#1572B6' },
          { name: 'JavaScript', percentage: '8.8', color: '#F7DF1E' }
        ];
      case 'TopShoppe E-commerce Website': // Next.js E-commerce
        return [
          { name: 'TypeScript', percentage: '72.5', color: '#3178C6' },
          { name: 'CSS', percentage: '18.3', color: '#1572B6' },
          { name: 'JavaScript', percentage: '9.2', color: '#F7DF1E' }
        ];
      case 'PinoyAI - AI Pair Programming Assistant': // Python CLI
        return [
          { name: 'Python', percentage: '100.0', color: '#3776AB' }
        ];
      case 'Eskwelahan.ph': // Flutter School App
        return [
          { name: 'Dart', percentage: '85.0', color: '#0175C2' },
          { name: 'C++', percentage: '8.0', color: '#00599C' },
          { name: 'CMake', percentage: '5.0', color: '#064F8C' },
          { name: 'Other', percentage: '2.0', color: '#808080' }
        ];
      case 'Interactive Dashboard': // Power BI
        return [
          { name: 'Power BI', percentage: '100.0', color: '#F2C811' }
        ];
      case 'ROBOFUSION Line Following Robot - Champion': // Arduino
        return [
          { name: 'C++', percentage: '95.0', color: '#00599C' },
          { name: 'C', percentage: '5.0', color: '#A8B9CC' }
        ];
      case 'Data Analytics Challenge - Champion': // Python
        return [
          { name: 'Python', percentage: '70.0', color: '#3776AB' },
          { name: 'Jupyter Notebook', percentage: '30.0', color: '#DA5B0B' }
        ];
      default:
        // Fallback for other projects
        const languageMap: Record<string, number> = {};
        const languageColors: Record<string, string> = {
          typescript: '#3178C6',
          javascript: '#F7DF1E',
          python: '#3776AB',
          dart: '#0175C2',
          flutter: '#02569B',
          html: '#E34F26',
          css: '#1572B6',
          'c++': '#00599C',
          firebase: '#FFCA28',
          'power bi': '#F2C811',
          php: '#777BB4',
        };

        let total = 0;
        project?.Technologies?.forEach((tech: string) => {
          const normalizedTech = tech.toLowerCase();
          if (languageColors[normalizedTech]) {
            languageMap[normalizedTech] = (languageMap[normalizedTech] || 0) + 1;
            total++;
          }
        });

        return Object.entries(languageMap).map(([lang, count]) => ({
          name: lang,
          percentage: ((count / total) * 100).toFixed(1),
          color: languageColors[lang] || accentColor,
        }));
    }
  };

  // Generate README content based on actual GitHub repository data
  const getReadmeContent = (projectTitle: string) => {
    switch (projectTitle) {
      case 'Hotplate':
        return {
          overview: "A comprehensive Flutter-based restaurant application featuring user authentication, restaurant browsing, cart management, and Firebase backend integration. The app provides a seamless food ordering experience with real-time data synchronization.",
          features: [
            "Secure authentication with Firebase Auth",
            "Multiple sign-in options (Email, Google, Facebook, Apple)",
            "Restaurant browsing with advanced search and filtering",
            "Intuitive cart management and order customization",
            "Cross-platform support (Android, iOS, Web)",
            "Real-time order tracking and notifications",
            "Zero-latency keyboard performance optimization",
            "Professional Material Design 3 UI"
          ],
          installation: [
            "1. Clone repository: git clone https://github.com/GITLAGGUI/App_1.git",
            "2. Install Flutter SDK 3.32.5 or higher",
            "3. Run flutter pub get to install dependencies",
            "4. Configure Firebase project and add config files",
            "5. Run flutter run to start the application"
          ],
          techDetails: "Built with Flutter 3.32.5 and Dart 3.8.1, utilizing Firebase for backend services including authentication, Firestore database, and cloud storage. Features Provider pattern for state management and Material Design 3 components."
        };
      case 'Prostate Cancer Analytics Dashboard':
        return {
          overview: "A comprehensive analytics dashboard for prostate cancer patient data analysis, providing healthcare professionals with advanced tools for clinical decision support, risk stratification, and treatment effectiveness analysis.",
          features: [
            "Interactive data visualizations with Plotly",
            "Advanced risk stratification algorithms",
            "Treatment effectiveness analysis",
            "Patient demographics analysis",
            "Clinical indicators monitoring",
            "Outcomes and survival analysis",
            "Clinical decision support system",
            "Responsive web interface"
          ],
          installation: [
            "1. Clone repository: git clone https://github.com/GITLAGGUI/Prostate-Cancer-Analysis.git",
            "2. Install Python 3.8+ and required dependencies",
            "3. Run pip install -r requirements.txt",
            "4. Launch with streamlit run dashboard.py",
            "5. Access dashboard at http://localhost:8501"
          ],
          techDetails: "Developed using Python with Streamlit framework, featuring Plotly visualizations, Pandas data processing, and advanced statistical analysis capabilities. Includes comprehensive filtering, real-time updates, and professional medical-grade interface design."
        };
      case 'Maria Lourdes Mansion':
        return {
          overview: "A high-performance, modern website for Maria Lourdes Mansion featuring responsive design, optimized performance, and professional user experience. Built with Next.js and TypeScript for optimal performance.",
          features: [
            "Responsive design with mobile-first approach",
            "Sticky header navigation with smooth animations",
            "GPU acceleration for 90fps performance",
            "Mobile-optimized touch interactions",
            "Professional glass morphism effects",
            "Optimized loading performance",
            "Security headers implementation",
            "Netlify deployment ready"
          ],
          installation: [
            "1. Clone repository and navigate to project directory",
            "2. Install Node.js 18 or higher",
            "3. Run npm install to install dependencies",
            "4. Run npm run dev for development server",
            "5. Build with npm run build for production"
          ],
          techDetails: "Built with Next.js, TypeScript, and Tailwind CSS. Features GPU-accelerated animations, optimized font loading with display swap, and comprehensive security headers. Deployed on Netlify with automatic CI/CD."
        };
      case 'ISU Lost & Found System':
        return {
          overview: "A comprehensive web application designed to help members of Isabela State University report and find lost or found items. This modernized platform streamlines how students, faculty, and security manage lost and found items with an intuitive interface and robust backend.",
          features: [
            "User registration and authentication system",
            "Post lost or found items with details and images",
            "Browse listings with filters for categories, keywords, and status",
            "View recent lost and found items on homepage",
            "Password recovery system",
            "Admin panel for reviewing and approving item postings",
            "Category management for administrators",
            "Statistics and activity logs dashboard"
          ],
          installation: [
            "1. Clone repository: git clone https://github.com/GITLAGGUI/Lost-And-Found-ISUC.git",
            "2. Install XAMPP and start Apache/MySQL services",
            "3. Import the database schema from /database folder",
            "4. Configure database connection in config.php",
            "5. Access via http://localhost/Lost-And-Found-ISUC"
          ],
          techDetails: "Built with PHP and MySQL backend, featuring responsive Bootstrap frontend with custom CSS styling. Implements secure user authentication, image upload handling, and admin dashboard for comprehensive item management."
        };
      case 'TopShoppe E-commerce Website':
        return {
          overview: "A full-stack e-commerce platform for fashion retail built with Next.js 14, TypeScript, Prisma, and PostgreSQL. Features customer shopping experience, seller dashboard with analytics, order management with J&T Express shipping integration, and PayMongo/PayPal payments.",
          features: [
            "Browse products with advanced filters and search",
            "Add to cart & wishlist functionality",
            "Guest or registered checkout with PayMongo/PayPal",
            "Order tracking with J&T Express integration",
            "Seller dashboard with analytics and product management",
            "Admin controls for platform-wide management",
            "Returns & refunds within 7 days",
            "Mobile-first responsive design"
          ],
          installation: [
            "git clone <repo-url> && cd e-commerce",
            "npm install",
            "cp .env.example .env",
            "npx prisma migrate dev --name init",
            "npm run dev"
          ],
          techDetails: "Built with Next.js 14 App Router, TypeScript, and Tailwind CSS frontend. Backend uses Prisma ORM with PostgreSQL, NextAuth.js for authentication, Zustand for state management. Integrates Cloudinary for images, PayMongo for payments, and J&T Express for shipping."
        };
      case 'PinoyAI - AI Pair Programming Assistant':
        return {
          overview: "A command-line AI pair programming assistant powered by OpenRouter and free AI models. Designed to help developers write, debug, and understand code more efficiently with an intuitive CLI interface.",
          features: [
            "Intuitive CLI interface with ASCII art branding",
            "Real-time AI responses for coding questions",
            "Support for multiple programming languages",
            "Code explanation and debugging assistance",
            "OpenRouter API integration",
            "Free AI model access",
            "Command history and context awareness",
            "Easy installation and setup"
          ],
          installation: [
            "1. Clone the repository",
            "2. Install Python 3.8 or higher",
            "3. Run pip install -r requirements.txt",
            "4. Configure OpenRouter API key in environment",
            "5. Run python pinoyai.py to start"
          ],
          techDetails: "Built with Python, featuring OpenRouter API integration for AI model access. Uses rich library for beautiful terminal output and implements conversation context management for natural coding assistance."
        };
      case 'Eskwelahan.ph':
        return {
          overview: "A comprehensive school management mobile application built with Flutter and Dart, providing efficient solutions for educational institutions with student, teacher, and administrator portals.",
          features: [
            "Student and teacher portals",
            "Attendance tracking system",
            "Grade management and reporting",
            "Schedule and timetable management",
            "Announcement and notification system",
            "Cross-platform (Android & iOS)",
            "Offline capability",
            "Real-time data synchronization"
          ],
          installation: [
            "1. Clone the repository",
            "2. Install Flutter SDK",
            "3. Run flutter pub get",
            "4. Configure Firebase backend",
            "5. Run flutter run for development"
          ],
          techDetails: "Built with Flutter and Dart, featuring Firebase backend for real-time data, Provider state management, and Material Design UI. Supports both Android and iOS platforms."
        };
      case 'ROBOFUSION Line Following Robot - Champion':
        return {
          overview: "Championship-winning autonomous line following robot developed for the ROBOFUSION competition. Features advanced sensor integration and control algorithms for precise path following.",
          features: [
            "Autonomous navigation along predetermined paths",
            "High-precision infrared sensor array",
            "PID control algorithm for smooth movement",
            "Real-time obstacle detection",
            "Speed optimization for competition",
            "Robust chassis design",
            "Efficient power management",
            "Quick response time"
          ],
          installation: [
            "1. Assemble hardware components according to schematic",
            "2. Install Arduino IDE",
            "3. Connect Arduino board to computer",
            "4. Upload the firmware code",
            "5. Calibrate sensors on the track"
          ],
          techDetails: "Built on Arduino platform using C/C++, featuring multiple IR sensors for line detection, DC motors with H-bridge driver, and PID control algorithm optimized for competition-level speed and accuracy."
        };
      case 'Data Analytics Challenge - Champion':
        return {
          overview: "First place winning project in the Data Analytics Challenge, demonstrating exceptional skills in data analysis, visualization, and business intelligence with actionable insights.",
          features: [
            "Comprehensive data exploration and cleaning",
            "Advanced statistical analysis",
            "Interactive data visualizations",
            "Business intelligence insights",
            "Predictive modeling",
            "Clear data storytelling",
            "Executive summary and recommendations",
            "Professional presentation"
          ],
          installation: [
            "1. Install Python 3.8+ with Jupyter",
            "2. Install required packages: pandas, numpy, matplotlib, seaborn",
            "3. Open Jupyter Notebook",
            "4. Load the analysis notebook",
            "5. Run cells to reproduce analysis"
          ],
          techDetails: "Python-based analysis using Pandas for data manipulation, Matplotlib and Seaborn for visualization, and statistical libraries for advanced analysis. Presented insights using Power BI dashboards."
        };
      case 'Interactive Dashboard':
        return {
          overview: "A comprehensive interactive dashboard built with Power BI, providing data visualization and business intelligence insights for better decision-making.",
          features: [
            "Interactive charts and graphs",
            "Real-time data refresh",
            "Drill-down capabilities",
            "Custom KPI metrics",
            "Responsive design",
            "Cross-filtering between visuals",
            "Export to PDF/PowerPoint",
            "Share and collaborate features"
          ],
          installation: [
            "1. Install Power BI Desktop",
            "2. Open the .pbix file",
            "3. Configure data source connections",
            "4. Refresh data to update visuals",
            "5. Publish to Power BI Service for sharing"
          ],
          techDetails: "Built with Microsoft Power BI, featuring DAX measures for complex calculations, custom visuals, and optimized data model for performance. Connected to various data sources for comprehensive analysis."
        };
      case 'Prostate Cancer Risk Analysis Dashboard':
        return {
          overview: "A comprehensive analytics dashboard for prostate cancer patient data analysis, providing healthcare professionals with advanced tools for clinical decision support, risk stratification, and treatment effectiveness analysis.",
          features: [
            "Interactive data visualizations with Plotly",
            "Advanced risk stratification algorithms",
            "Treatment effectiveness analysis",
            "Patient demographics analysis",
            "Clinical indicators monitoring",
            "Outcomes and survival analysis",
            "Clinical decision support system",
            "Responsive web interface"
          ],
          installation: [
            "1. Clone repository: git clone https://github.com/GITLAGGUI/Prostate-Cancer-Analysis.git",
            "2. Install Python 3.8+ and required dependencies",
            "3. Run pip install -r requirements.txt",
            "4. Launch with streamlit run dashboard.py",
            "5. Access dashboard at http://localhost:8501"
          ],
          techDetails: "Developed using Python with Streamlit framework, featuring Plotly visualizations, Pandas data processing, and advanced statistical analysis capabilities. Includes comprehensive filtering, real-time updates, and professional medical-grade interface design."
        };
      default:
        return {
          overview: "A comprehensive software project showcasing modern development practices and technologies.",
          features: [
            "Modern technology stack",
            "Responsive design",
            "Modular architecture",
            "Professional UI/UX",
            "Performance optimized",
            "Security best practices"
          ],
          installation: [
            "1. Clone the repository",
            "2. Install dependencies",
            "3. Configure environment",
            "4. Run the application",
            "5. Access via browser"
          ],
          techDetails: "Built with modern frameworks and best practices for scalability and maintainability."
        };
    }
  };

  // Get project screenshots based on project title
  const getProjectScreenshots = (projectTitle: string): { src: string; caption: string }[] => {
    switch (projectTitle) {
      case 'Hotplate':
        return [
          { src: '/assets/hotplate/Homescreen.jpg', caption: 'Home Screen' },
          { src: '/assets/hotplate/Sign-in.jpg', caption: 'Sign In' },
          { src: '/assets/hotplate/Sign-up.jpg', caption: 'Sign Up' },
          { src: '/assets/hotplate/Cart.jpg', caption: 'Shopping Cart' },
          { src: '/assets/hotplate/Account.jpg', caption: 'Account Page' },
          { src: '/assets/hotplate/Icon.jpg', caption: 'App Icon' },
        ];
      default:
        return [];
    }
  };

  if (!project) {
    return (
      <Box 
        width="100%" 
        minHeight="100vh" 
        bg={mainBg}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color={textColor} fontSize="xl">Project not found</Text>
      </Box>
    );
  }

  const languageStats = getLanguageStats(project.Title);

  return (
    <Box width="100%" minHeight="100vh" bg={mainBg}>
      {/* Header with Back Button */}
      <Box 
        position="sticky" 
        top="0" 
        zIndex="10" 
        bg={cardBg} 
        borderBottom="1px solid"
        borderColor={borderColor}
        p={4}
      >
        <HStack spacing={4}>
          <Button
            leftIcon={<FaArrowLeft />}
            onClick={() => navigate('/projects')}
            variant="ghost"
            color={linkColor}
            _hover={{ bg: borderColor, transform: 'translateX(-2px)' }}
            transition="all 0.2s ease"
          >
            Back to Projects
          </Button>
          <Heading size="md" color={textColor}>
            {project.Title}
          </Heading>
        </HStack>
      </Box>

      {/* Main Content - Two Column Layout */}
      <Box p={{ base: 4, md: 8 }} maxWidth="1400px" mx="auto">
        
        {/* Project Title Section */}
        <VStack spacing={6} mb={8} textAlign="center">
          <Heading 
            size="2xl" 
            color={textColor}
            fontWeight="bold"
          >
            {project.Title}
          </Heading>
          <Text 
            fontSize="lg" 
            color={secondaryText} 
            maxWidth="800px"
            lineHeight="tall"
          >
            {project.Description}
          </Text>
        </VStack>

        {/* Two Column Layout */}
        <Grid 
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }} 
          gap={12} 
          alignItems="start"
        >
          
          {/* Left Column - Documentation/Details */}
          <VStack spacing={8} align="stretch">
            
            {/* Links Section */}
            <Box>
              <Heading size="lg" color={textColor} mb={6} fontWeight="bold">
                Links
              </Heading>
              <VStack spacing={4} align="stretch">
                {project.Source && (
                  <Link href={project.Source} isExternal>
                    <Button
                      leftIcon={<FaGithub />}
                      variant="outline"
                      borderColor={borderColor}
                      color={linkColor}
                      _hover={{ 
                        bg: borderColor, 
                        borderColor: accentColor,
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg'
                      }}
                      transition="all 0.2s ease"
                      w="100%"
                      justifyContent="flex-start"
                      size="lg"
                      p={6}
                    >
                      View {project.Title} source code on GitHub
                    </Button>
                  </Link>
                )}
                {project.Demo && (
                  <Link href={project.Demo} isExternal>
                    <Button
                      leftIcon={<Icon as={getDemoIcon(project.Demo)} />}
                      bg={buttonBg}
                      color={buttonText}
                      _hover={{ 
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                        opacity: 0.9
                      }}
                      transition="all 0.2s ease"
                      w="100%"
                      justifyContent="flex-start"
                      size="lg"
                      p={6}
                    >
                      Visit {project.Title} demo
                    </Button>
                  </Link>
                )}
              </VStack>
            </Box>

            {/* Language Used Section - GitHub Style */}
            <Box>
              <Heading size="lg" color={textColor} mb={6} fontWeight="bold">
                Languages
              </Heading>
              <Box 
                bg={cardBg} 
                p={6} 
                borderRadius="lg" 
                border="1px solid" 
                borderColor={borderColor}
              >
                {/* GitHub-style horizontal segmented bar */}
                <HStack 
                  w="100%" 
                  h="10px" 
                  borderRadius="full" 
                  overflow="hidden" 
                  spacing={0}
                  mb={4}
                >
                  {languageStats.map((lang, index) => (
                    <Box 
                      key={index}
                      bg={lang.color} 
                      h="100%" 
                      w={`${lang.percentage}%`}
                      _first={{ borderLeftRadius: "full" }}
                      _last={{ borderRightRadius: "full" }}
                    />
                  ))}
                </HStack>
                
                {/* Legend with dots - GitHub style */}
                <HStack flexWrap="wrap" gap={4} spacing={0}>
                  {languageStats.map((lang, index) => (
                    <HStack key={index} spacing={2}>
                      <Box 
                        w={3} 
                        h={3} 
                        borderRadius="full" 
                        bg={lang.color} 
                        flexShrink={0}
                      />
                      <Text 
                        fontSize="sm" 
                        color={textColor} 
                        fontWeight="600"
                      >
                        {lang.name}
                      </Text>
                      <Text 
                        fontSize="sm" 
                        color={secondaryText}
                      >
                        {lang.percentage}%
                      </Text>
                    </HStack>
                  ))}
                </HStack>
              </Box>
            </Box>

            {/* Technologies Used Section */}
            <Box>
              <Heading size="lg" color={textColor} mb={6} fontWeight="bold">
                Technologies Used
              </Heading>
              <Box 
                bg={cardBg} 
                p={6} 
                borderRadius="lg" 
                border="1px solid" 
                borderColor={borderColor}
              >
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                  {project.Technologies.map((tech: string, index: number) => (
                    <Badge
                      key={index}
                      px={3}
                      py={2}
                      borderRadius="md"
                      bg={borderColor}
                      color={textColor}
                      textTransform="capitalize"
                      fontSize="sm"
                      textAlign="center"
                      border="1px solid"
                      borderColor={accentColor}
                      _hover={{ 
                        bg: accentColor, 
                        color: buttonText,
                        transform: 'scale(1.05)'
                      }}
                      transition="all 0.2s ease"
                    >
                      {tech}
                    </Badge>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>

            {/* Project Info Section */}
            <Box>
              <Heading size="lg" color={textColor} mb={6} fontWeight="bold">
                Project Information
              </Heading>
              <Box 
                bg={cardBg} 
                p={6} 
                borderRadius="lg" 
                border="1px solid" 
                borderColor={borderColor}
              >
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text color={secondaryText} fontWeight="medium">Status:</Text>
                    <Badge colorScheme="green" px={3} py={1} borderRadius="full">
                      Completed
                    </Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color={secondaryText} fontWeight="medium">Project Type:</Text>
                    <Text color={textColor} fontWeight="medium">
                      {project.Technologies.includes('mobile') ? 'Mobile Application' : 
                       project.Technologies.includes('web') ? 'Web Application' : 
                       project.Technologies.includes('dashboard') ? 'Data Dashboard' : 
                       'Software Project'}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color={secondaryText} fontWeight="medium">Technologies:</Text>
                    <Text color={textColor} fontWeight="medium">{project.Technologies.length} technologies</Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>

          </VStack>

          {/* Right Column - README and Screenshots */}
          <VStack spacing={8} align="stretch">
            
            {/* README Section - GitHub Style */}
            <Box>
              {/* GitHub-style README header */}
              <HStack 
                bg={cardBg} 
                p={3} 
                borderTopRadius="md" 
                border="1px solid" 
                borderColor={borderColor}
                borderBottom="none"
              >
                <Icon as={FaCode} color={secondaryText} />
                <Text color={textColor} fontWeight="medium" fontSize="sm">README.md</Text>
              </HStack>
              
              {/* README Content - GitHub Markdown Style */}
              <Box 
                bg={cardBg} 
                p={6} 
                borderBottomRadius="md" 
                border="1px solid" 
                borderColor={borderColor}
                borderTop="1px solid"
                borderTopColor={borderColor}
              >
                {(() => {
                  const readme = getReadmeContent(project.Title);
                  return (
                    <VStack spacing={6} align="stretch">
                      {/* Project Title - H1 */}
                      <Box borderBottom="1px solid" borderColor={borderColor} pb={3}>
                        <Heading size="xl" color={textColor} fontWeight="600">
                          {project.Title}
                        </Heading>
                        <Text color={secondaryText} mt={2} fontSize="md">
                          {project.Description}
                        </Text>
                      </Box>

                      {/* Overview Section - H2 */}
                      <Box>
                        <Heading 
                          size="lg" 
                          color={textColor} 
                          fontWeight="600" 
                          borderBottom="1px solid" 
                          borderColor={borderColor} 
                          pb={2} 
                          mb={4}
                        >
                          📋 Overview
                        </Heading>
                        <Text color={textColor} lineHeight="1.8" fontSize="md">
                          {readme.overview}
                        </Text>
                      </Box>

                      {/* Features Section - H2 */}
                      <Box>
                        <Heading 
                          size="lg" 
                          color={textColor} 
                          fontWeight="600" 
                          borderBottom="1px solid" 
                          borderColor={borderColor} 
                          pb={2} 
                          mb={4}
                        >
                          ✨ Features
                        </Heading>
                        <VStack align="stretch" spacing={2}>
                          {readme.features.map((feature, index) => (
                            <HStack key={index} spacing={3} align="flex-start">
                              <Text color={accentColor} fontSize="md">•</Text>
                              <Text color={textColor} fontSize="md" lineHeight="1.6">
                                {feature}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>

                      {/* Installation Section - H2 */}
                      <Box>
                        <Heading 
                          size="lg" 
                          color={textColor} 
                          fontWeight="600" 
                          borderBottom="1px solid" 
                          borderColor={borderColor} 
                          pb={2} 
                          mb={4}
                        >
                          🚀 Installation & Setup
                        </Heading>
                        <Box 
                          bg={mainBg} 
                          borderRadius="md" 
                          p={4} 
                          border="1px solid" 
                          borderColor={borderColor}
                          fontFamily="'Consolas', 'Monaco', 'Courier New', monospace"
                        >
                          <VStack align="stretch" spacing={1}>
                            {readme.installation.map((step, index) => (
                              <Text 
                                key={index}
                                color={textColor} 
                                fontSize="sm" 
                                lineHeight="1.8"
                              >
                                <Text as="span" color={secondaryText}>$</Text> {step.replace(/^\d+\.\s*/, '')}
                              </Text>
                            ))}
                          </VStack>
                        </Box>
                      </Box>

                      {/* Tech Stack Section - H2 */}
                      <Box>
                        <Heading 
                          size="lg" 
                          color={textColor} 
                          fontWeight="600" 
                          borderBottom="1px solid" 
                          borderColor={borderColor} 
                          pb={2} 
                          mb={4}
                        >
                          🛠️ Tech Stack
                        </Heading>
                        <Text color={textColor} lineHeight="1.8" fontSize="md">
                          {readme.techDetails}
                        </Text>
                        
                        {/* Tech badges */}
                        <HStack mt={4} flexWrap="wrap" gap={2}>
                          {project.Technologies.slice(0, 6).map((tech: string, index: number) => (
                            <Badge
                              key={index}
                              px={3}
                              py={1}
                              borderRadius="full"
                              bg={borderColor}
                              color={textColor}
                              fontSize="xs"
                              textTransform="capitalize"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>

                      {/* License Section */}
                      <Box>
                        <Heading 
                          size="lg" 
                          color={textColor} 
                          fontWeight="600" 
                          borderBottom="1px solid" 
                          borderColor={borderColor} 
                          pb={2} 
                          mb={4}
                        >
                          📄 License
                        </Heading>
                        <Text color={textColor} fontSize="md">
                          This project is licensed under the MIT License - see the LICENSE file for details.
                        </Text>
                      </Box>

                      {/* Author Section */}
                      <Box>
                        <Heading 
                          size="lg" 
                          color={textColor} 
                          fontWeight="600" 
                          borderBottom="1px solid" 
                          borderColor={borderColor} 
                          pb={2} 
                          mb={4}
                        >
                          👨‍💻 Author
                        </Heading>
                        <HStack spacing={3}>
                          <Box 
                            w={10} 
                            h={10} 
                            borderRadius="full" 
                            bg={accentColor} 
                            display="flex" 
                            alignItems="center" 
                            justifyContent="center"
                          >
                            <Text color="white" fontWeight="bold">JL</Text>
                          </Box>
                          <VStack align="start" spacing={0}>
                            <Text color={textColor} fontWeight="medium">Joel Laggui Jr.</Text>
                            <Link href="https://github.com/GITLAGGUI" isExternal>
                              <Text color={linkColor} fontSize="sm">@GITLAGGUI</Text>
                            </Link>
                          </VStack>
                        </HStack>
                      </Box>
                    </VStack>
                  );
                })()}
              </Box>
            </Box>

            <Box>
              <Heading size="lg" color={textColor} mb={6} fontWeight="bold">
                Screenshots
              </Heading>
              
              {/* Project Screenshots - Two Column Grid */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* Main Screenshot */}
                <Box position="relative">
                  <Image
                    src={project.ImageURL}
                    alt={`${project.Title} - Main View`}
                    borderRadius="lg"
                    boxShadow="xl"
                    w="100%"
                    h="250px"
                    objectFit="cover"
                    border="1px solid"
                    borderColor={borderColor}
                  />
                  <Text 
                    textAlign="center" 
                    mt={2} 
                    color={secondaryText} 
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    Main Interface
                  </Text>
                </Box>

                {/* Additional Screenshots from getProjectScreenshots */}
                {getProjectScreenshots(project.Title).map((screenshot, index) => (
                  <Box key={index} position="relative">
                    <Image
                      src={screenshot.src}
                      alt={`${project.Title} - ${screenshot.caption}`}
                      borderRadius="lg"
                      boxShadow="xl"
                      w="100%"
                      h="250px"
                      objectFit="cover"
                      border="1px solid"
                      borderColor={borderColor}
                    />
                    <Text 
                      textAlign="center" 
                      mt={2} 
                      color={secondaryText} 
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      {screenshot.caption}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

          </VStack>
        </Grid>

      </Box>
    </Box>
  );
};

export default ProjectDetail;
