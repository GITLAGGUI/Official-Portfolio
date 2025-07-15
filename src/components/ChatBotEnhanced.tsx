import {
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  Collapse,
  Spinner,
  useToast,
  HStack,
  Image,
  Alert,
  AlertIcon,
  Button,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane, FaRedo, FaLightbulb, FaLock } from "react-icons/fa";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  isOffline?: boolean;
}

interface APIConfig {
  apiKey: string;
  baseURL: string;
  models: string[];
  maxRetries: number;
  retryDelay: number;
}

interface KnowledgeBase {
  [key: string]: string[];
}

const ChatBotEnhanced = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Joel's enhanced AI assistant. I can help you learn about his skills, projects, experience, and how he can help with your development needs. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'retrying' | 'error' | 'offline'>('connected');
  const [useOfflineMode, setUseOfflineMode] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Theme-aware colors
  const bgColor = useColorModeValue("#ffffff", "#1e1e1e");
  const borderColor = useColorModeValue("#e1e4e8", "#30363d");
  const inputBg = useColorModeValue("#f6f8fa", "#21262d");
  const textColor = useColorModeValue("#24292f", "#f0f6fc");
  const headerBg = useColorModeValue("#f6f8fa", "#161b22");
  const assistantMsgBg = useColorModeValue("#f6f8fa", "#21262d");
  const userMsgBg = useColorModeValue("#0969da", "#0969da");
  const hoverBg = useColorModeValue("#f3f4f6", "#30363d");
  const successColor = useColorModeValue("#28a745", "#28a745");
  const warningColor = useColorModeValue("#ffc107", "#ffc107");
  const errorColor = useColorModeValue("#dc3545", "#dc3545");

  // Secure API Configuration using environment variables
  const getAPIConfig = (): APIConfig => {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const baseURL = import.meta.env.VITE_API_BASE_URL || "https://openrouter.ai/api/v1";
    const maxRetries = parseInt(import.meta.env.VITE_MAX_RETRIES || "3");
    const retryDelay = parseInt(import.meta.env.VITE_RETRY_DELAY || "1000");

    if (!apiKey) {
      console.warn("API key not found in environment variables");
      setUseOfflineMode(true);
    }

    return {
      apiKey,
      baseURL,
      models: [
        "microsoft/phi-3-mini-128k-instruct:free",
        "nousresearch/hermes-3-llama-3.1-405b:free",
        "meta-llama/llama-3.2-3b-instruct:free",
        "qwen/qwen-2.5-7b-instruct:free",
        "huggingface/zephyr-7b-beta:free"
      ],
      maxRetries,
      retryDelay
    };
  };

  // Enhanced knowledge base for offline responses
  const knowledgeBase: KnowledgeBase = {
    greeting: [
      "Hello! I'm here to help you learn about Joel's expertise and how he can assist with your development projects.",
      "Hi there! I can provide detailed information about Joel's skills, experience, and recent projects. What interests you most?",
      "Welcome! I'm Joel's AI assistant, ready to help you understand his capabilities and services."
    ],
    skills: [
      "Joel is a Full-Stack Developer and Data Analyst with expertise in JavaScript/TypeScript, React.js, Next.js, Node.js, Python, and modern web technologies. He specializes in building scalable applications with excellent user experience.",
      "His technical stack includes Frontend (React, Vue, Angular), Backend (Node.js, Python, PHP), Mobile (React Native, Flutter), and Data Analysis (Python, R, Power BI, Tableau). He's proficient in cloud platforms like AWS and Google Cloud.",
      "Joel excels in modern development practices including responsive design, API development, database optimization, and DevOps with tools like Docker, Kubernetes, and CI/CD pipelines."
    ],
    experience: [
      "Joel is currently working as a Freelance Full-Stack Developer & Data Analyst (2023-Present) and Independent Software Developer (2022-Present). He has successfully delivered numerous projects ranging from educational apps to luxury hotel websites.",
      "His experience includes building complex web applications, creating insightful data visualizations, developing mobile apps, and implementing modern UI/UX designs. He focuses on performance optimization and user-centered design.",
      "Joel has worked with various clients providing end-to-end development services, from initial planning and architecture to deployment and maintenance."
    ],
    projects: [
      "Featured projects include Eskwelahan.ph (Educational Mobile App with React Native & Firebase), Advanced Power BI Analytics Dashboard with complex DAX calculations, and Maria Lourdes Mansion luxury hotel website with modern React architecture.",
      "His portfolio showcases expertise in e-commerce platforms, educational technology, data visualization dashboards, and responsive web applications. Each project demonstrates attention to detail and modern development practices.",
      "Joel's projects emphasize clean code, scalable architecture, excellent performance, and outstanding user experience. He uses modern tools and follows industry best practices."
    ],
    certifications: [
      "Recent certifications include SPUP Innovation & Transformation Certificate (March 2025) and Huawei Algorithm & Program Design Certificate (February 2025), demonstrating commitment to continuous learning.",
      "These certifications validate his expertise in modern development methodologies, algorithm design, and innovative problem-solving approaches."
    ],
    contact: [
      "Contact Joel at jlaggui47@gmail.com or call +63 915 368 3496. He's available for freelance projects, full-time opportunities, and consulting work.",
      "Check out his GitHub profile at GITLAGGUI to see his latest projects, contributions, and code quality. He's based in the Philippines and works with international clients.",
      "Joel offers free initial consultations to discuss project requirements and provide technical recommendations."
    ],
    services: [
      "Joel provides comprehensive development services: Full-stack web development, mobile app development, data analysis & visualization, API development, database design, and cloud deployment.",
      "Specialized services include React/Next.js applications, Node.js backends, Python data analysis, Power BI dashboards, e-commerce solutions, and custom software development.",
      "He offers complete project lifecycle support from planning and design to development, testing, deployment, and ongoing maintenance with competitive rates and flexible engagement models."
    ],
    technologies: [
      "Frontend: React.js, Next.js, Vue.js, TypeScript, HTML5, CSS3, Chakra UI, Material-UI, Tailwind CSS, responsive design, progressive web apps.",
      "Backend: Node.js, Express.js, Python (Django, FastAPI), PHP, RESTful APIs, GraphQL, microservices architecture, serverless functions.",
      "Data & Analytics: Python (Pandas, NumPy), R, SQL, Power BI, Tableau, machine learning, data visualization, statistical analysis.",
      "Mobile: React Native, Flutter, cross-platform development, native performance optimization.",
      "DevOps: Git, GitHub, AWS, Google Cloud, Vercel, Docker, Kubernetes, CI/CD pipelines, automated testing."
    ]
  };

  const systemPrompt = `You are an enhanced AI assistant for Joel Laggui Jr's portfolio website. You help visitors understand Joel's expertise and how he can solve their development challenges.

PROFESSIONAL SUMMARY:
Joel is a passionate Full-Stack Developer and Data Analyst with proven expertise in modern web technologies, mobile development, and data science. He delivers scalable applications, insightful data visualizations, and innovative digital solutions.

RECENT ACHIEVEMENTS (2025):
- SPUP Innovation & Transformation Certificate (March 2025)
- Huawei Algorithm & Program Design Certificate (February 2025)
- Multiple successful client projects with 100% satisfaction rate

CORE EXPERTISE:
Frontend: JavaScript (ES6+), TypeScript, React.js, Next.js, Vue.js, modern CSS frameworks
Backend: Node.js, Python, PHP, API development, database optimization
Mobile: React Native, Flutter, cross-platform development
Data Science: Python analytics, Power BI, machine learning, statistical analysis
DevOps: AWS, Google Cloud, Docker, Kubernetes, CI/CD

FEATURED PROJECTS:
1. Eskwelahan.ph - Educational Mobile App (React Native, Firebase, 10K+ users)
2. Advanced Analytics Dashboard - Power BI with complex DAX (Enterprise client)
3. Maria Lourdes Mansion - Luxury hotel website (React, TypeScript, premium UX)

CURRENT STATUS:
- Freelance Full-Stack Developer & Data Analyst (2023-Present)
- Independent Software Developer (2022-Present)
- Available for new projects and collaborations

CONTACT & AVAILABILITY:
- Email: jlaggui47@gmail.com
- Phone: +63 915 368 3496
- GitHub: GITLAGGUI
- Location: Philippines (serves global clients)
- Offers free initial consultations

INSTRUCTIONS:
- Be enthusiastic, professional, and solution-focused
- Highlight Joel's unique value proposition and problem-solving abilities
- Provide specific examples of how Joel can help with their needs
- Keep responses engaging and informative (max 120 words)
- Always end with a call-to-action or invitation to connect
- Focus on business value and technical excellence`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const findEnhancedResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('good')) {
      return knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)];
    }

    // Skills and technology queries
    if (input.includes('skill') || input.includes('technology') || input.includes('tech') || 
        input.includes('programming') || input.includes('language') || input.includes('framework') ||
        input.includes('react') || input.includes('node') || input.includes('python')) {
      return knowledgeBase.technologies[Math.floor(Math.random() * knowledgeBase.technologies.length)];
    }

    // Experience and background
    if (input.includes('experience') || input.includes('work') || input.includes('job') || 
        input.includes('career') || input.includes('background') || input.includes('freelance')) {
      return knowledgeBase.experience[Math.floor(Math.random() * knowledgeBase.experience.length)];
    }

    // Projects and portfolio
    if (input.includes('project') || input.includes('portfolio') || input.includes('app') || 
        input.includes('website') || input.includes('application') || input.includes('build')) {
      return knowledgeBase.projects[Math.floor(Math.random() * knowledgeBase.projects.length)];
    }

    // Services and offerings
    if (input.includes('service') || input.includes('help') || input.includes('develop') || 
        input.includes('create') || input.includes('offer') || input.includes('cost') || input.includes('price')) {
      return knowledgeBase.services[Math.floor(Math.random() * knowledgeBase.services.length)];
    }

    // Contact and hiring
    if (input.includes('contact') || input.includes('email') || input.includes('phone') || 
        input.includes('reach') || input.includes('hire') || input.includes('github') || input.includes('available')) {
      return knowledgeBase.contact[Math.floor(Math.random() * knowledgeBase.contact.length)];
    }

    // Certifications and achievements
    if (input.includes('certificate') || input.includes('certification') || input.includes('achievement') || 
        input.includes('education') || input.includes('qualification')) {
      return knowledgeBase.certifications[Math.floor(Math.random() * knowledgeBase.certifications.length)];
    }

    // Default enhanced responses
    const defaultResponses = [
      "I'd love to tell you more about Joel's expertise! He's a skilled Full-Stack Developer and Data Analyst ready to tackle your next project. What specific area interests you - web development, mobile apps, or data analytics?",
      "Joel offers comprehensive development services with a focus on modern technologies and excellent user experience. Whether you need a React application, mobile app, or data dashboard, he's got you covered. What's your project about?",
      "Great question! Joel specializes in creating scalable, high-performance applications using cutting-edge technologies. He's available for new projects and offers free consultations. What development challenge can he help you solve?",
      "Joel's proven track record includes successful projects in education, hospitality, and enterprise analytics. He combines technical expertise with business understanding to deliver exceptional results. How can he help bring your vision to life?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const makeAPICall = async (config: APIConfig, model: string, messages: any[]): Promise<string> => {
    const response = await fetch(`${config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'HTTP-Referer': import.meta.env.VITE_APP_URL || 'https://joellaggui-portfolio.vercel.app',
        'X-Title': import.meta.env.VITE_APP_TITLE || 'Joel Laggui Jr Portfolio',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(msg => ({ role: msg.role, content: msg.content }))
        ],
        max_tokens: 350,
        temperature: 0.8,
        stream: false,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      })
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I apologize, but I couldn't process your request properly.";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    // Check if we should use offline mode
    if (useOfflineMode) {
      setTimeout(() => {
        const response = findEnhancedResponse(currentInput);
        const assistantMessage: Message = {
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          isOffline: true
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 800);
      return;
    }

    const config = getAPIConfig();
    if (!config.apiKey) {
      setUseOfflineMode(true);
      setConnectionStatus('offline');
      const response = findEnhancedResponse(currentInput);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response + " (Note: Running in offline mode. For real-time assistance, contact Joel directly at jlaggui47@gmail.com)",
        timestamp: new Date(),
        isOffline: true
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      return;
    }

    // Try API calls with enhanced error handling
    let responseReceived = false;
    setConnectionStatus('retrying');

    for (const model of config.models) {
      try {
        setCurrentModel(model);
        const content = await makeAPICall(config, model, messages);
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: content,
          timestamp: new Date(),
          model: model
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConnectionStatus('connected');
        setIsLoading(false);
        responseReceived = true;
        return;
        
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        await delay(config.retryDelay);
      }
    }

    // Fallback to offline mode if all API calls failed
    if (!responseReceived) {
      setConnectionStatus('error');
      setUseOfflineMode(true);
      
      const response = findEnhancedResponse(currentInput);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response + " (Note: AI service temporarily unavailable. Contact Joel directly at jlaggui47@gmail.com for immediate assistance.)",
        timestamp: new Date(),
        isOffline: true
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      toast({
        title: "Switched to Offline Mode",
        description: "AI service unavailable. Using enhanced offline responses.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm Joel's enhanced AI assistant. I can help you learn about his skills, projects, experience, and how he can help with your development needs. What would you like to know?",
        timestamp: new Date()
      }
    ]);
    setConnectionStatus('connected');
    setUseOfflineMode(false);
    setCurrentModel("");
  };

  const getStatusColor = () => {
    if (useOfflineMode) return 'blue.500';
    switch (connectionStatus) {
      case 'connected': return successColor;
      case 'retrying': return warningColor;
      case 'error': return errorColor;
      default: return 'gray.500';
    }
  };

  const getStatusText = () => {
    if (useOfflineMode) return '🔵 Enhanced Offline Mode';
    switch (connectionStatus) {
      case 'connected': return '🟢 AI Assistant Ready';
      case 'retrying': return '🟡 Connecting...';
      case 'error': return '🔴 Connection Error';
      default: return '⚪ Initializing...';
    }
  };

  const quickQuestions = [
    "What are Joel's main skills?",
    "Tell me about his recent projects",
    "How can I contact Joel?",
    "What services does he offer?",
    "Show me his certifications"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <>
      {/* Enhanced Floating AI Assistant Button */}
      <Box
        position="fixed"
        bottom="50px"
        right="20px"
        zIndex={999}
      >
        <Tooltip 
          label="Chat with Joel's AI Assistant" 
          placement="left"
          hasArrow
          bg={bgColor}
          color={textColor}
          borderColor={borderColor}
          border="1px solid"
        >
          <IconButton
            aria-label="AI Assistant"
            icon={
              <Image 
                src="/assets/chatbot-icon.webp" 
                alt="AI Assistant" 
                boxSize="28px"
                borderRadius="6px"
                fallback={<Text fontSize="28px">🤖</Text>}
              />
            }
            onClick={onToggle}
            size="lg"
            bg={bgColor}
            border="2px solid"
            borderColor={getStatusColor()}
            borderRadius="full"
            boxShadow="xl"
            _hover={{ 
              bg: hoverBg,
              transform: "scale(1.08)",
              boxShadow: "2xl",
              borderColor: getStatusColor()
            }}
            transition="all 0.3s ease"
            width="64px"
            height="64px"
            position="relative"
          >
            {/* Status indicator */}
            <Box
              position="absolute"
              top="2px"
              right="2px"
              width="12px"
              height="12px"
              borderRadius="full"
              bg={getStatusColor()}
              border="2px solid"
              borderColor={bgColor}
            />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Enhanced Chat Window */}
      <Collapse in={isOpen}>
        <Box
          position="fixed"
          bottom="130px"
          right="20px"
          bg={bgColor}
          border="2px solid"
          borderColor={borderColor}
          borderRadius="12px"
          shadow="2xl"
          w="420px"
          h="580px"
          zIndex={1000}
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          {/* Enhanced Header */}
          <Flex
            align="center"
            justify="space-between"
            p={4}
            borderBottom="2px solid"
            borderColor={borderColor}
            bg={headerBg}
            borderTopRadius="10px"
          >
            <HStack spacing={3}>
              <Image 
                src="/assets/chatbot-icon.webp" 
                alt="AI Assistant" 
                boxSize="20px"
                borderRadius="4px"
                fallback={<Text fontSize="20px">🤖</Text>}
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="600" fontSize="14px" color={textColor}>
                  Joel's AI Assistant
                </Text>
                <Text fontSize="11px" color="gray.500">
                  Enhanced with latest AI models
                </Text>
              </VStack>
              <Badge 
                size="sm" 
                colorScheme={useOfflineMode ? 'blue' : connectionStatus === 'connected' ? 'green' : connectionStatus === 'retrying' ? 'yellow' : 'red'}
                variant="subtle"
              >
                <HStack spacing={1}>
                  <FaLock size="8px" />
                  <Text>{useOfflineMode ? 'Secure Offline' : 'Live AI'}</Text>
                </HStack>
              </Badge>
            </HStack>
            <HStack spacing={1}>
              <Tooltip label="Reset conversation" hasArrow>
                <IconButton
                  aria-label="Reset chat"
                  icon={<FaRedo />}
                  size="sm"
                  variant="ghost"
                  color={textColor}
                  onClick={resetChat}
                  _hover={{ bg: hoverBg }}
                />
              </Tooltip>
              <IconButton
                aria-label="Close chat"
                icon={<FaTimes />}
                size="sm"
                variant="ghost"
                color={textColor}
                onClick={onToggle}
                _hover={{ bg: hoverBg }}
              />
            </HStack>
          </Flex>

          {/* Status Alert */}
          {connectionStatus === 'error' && (
            <Alert status="warning" size="sm" py={2}>
              <AlertIcon boxSize="14px" />
              <Text fontSize="12px">
                Using enhanced offline mode. All responses are based on Joel's latest information.
              </Text>
            </Alert>
          )}

          {/* Messages Container */}
          <VStack
            flex={1}
            overflowY="auto"
            p={4}
            spacing={3}
            align="stretch"
            bg={bgColor}
          >
            {messages.map((message, index) => (
              <Flex
                key={index}
                justify={message.role === 'user' ? 'flex-end' : 'flex-start'}
              >
                <Box
                  bg={message.role === 'user' ? userMsgBg : assistantMsgBg}
                  color={message.role === 'user' ? 'white' : textColor}
                  px={4}
                  py={3}
                  borderRadius="12px"
                  maxW="85%"
                  fontSize="14px"
                  lineHeight="1.5"
                  border={message.role === 'assistant' ? "1px solid" : "none"}
                  borderColor={message.role === 'assistant' ? borderColor : "transparent"}
                  position="relative"
                  boxShadow="sm"
                >
                  {message.content}
                  {(message.model || message.isOffline) && (
                    <Text fontSize="10px" color="gray.500" mt={2} fontStyle="italic">
                      {message.isOffline ? '🔵 Offline Mode' : `🤖 ${message.model?.split('/')[0]}`}
                    </Text>
                  )}
                </Box>
              </Flex>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <Flex justify="flex-start">
                <Box
                  bg={assistantMsgBg}
                  border="1px solid"
                  borderColor={borderColor}
                  px={4}
                  py={3}
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  gap={3}
                >
                  <Spinner size="sm" color={getStatusColor()} />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="14px" color={textColor}>
                      {connectionStatus === 'retrying' ? 'Connecting to AI...' : 'Thinking...'}
                    </Text>
                    {currentModel && (
                      <Text fontSize="10px" color="gray.500">
                        Trying {currentModel.split('/')[0]}
                      </Text>
                    )}
                  </VStack>
                </Box>
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <Box p={3} borderTop="1px solid" borderColor={borderColor}>
              <HStack spacing={2} mb={2}>
                <FaLightbulb color="orange" size="12px" />
                <Text fontSize="12px" color="gray.600" fontWeight="500">
                  Quick questions:
                </Text>
              </HStack>
              <VStack spacing={2}>
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    size="xs"
                    variant="outline"
                    width="100%"
                    fontSize="11px"
                    onClick={() => handleQuickQuestion(question)}
                    _hover={{ bg: hoverBg }}
                    borderColor={borderColor}
                    color={textColor}
                  >
                    {question}
                  </Button>
                ))}
              </VStack>
            </Box>
          )}

          {/* Enhanced Input */}
          <Flex
            p={4}
            borderTop="2px solid"
            borderColor={borderColor}
            gap={3}
            bg={bgColor}
            borderBottomRadius="10px"
          >
            <Input
              placeholder="Ask about Joel's skills, projects, or how he can help..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              bg={inputBg}
              border="2px solid"
              borderColor={borderColor}
              size="md"
              fontSize="14px"
              disabled={isLoading}
              color={textColor}
              borderRadius="8px"
              _placeholder={{ color: "gray.500" }}
              _focus={{ 
                borderColor: "#0969da",
                boxShadow: "0 0 0 1px #0969da"
              }}
            />
            <IconButton
              aria-label="Send message"
              icon={<FaPaperPlane />}
              size="md"
              bg="#0969da"
              color="white"
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              _hover={{ bg: "#0860ca" }}
              _disabled={{ 
                bg: "gray.300", 
                color: "gray.500",
                cursor: "not-allowed"
              }}
              borderRadius="8px"
            />
          </Flex>

          {/* Enhanced Status Bar */}
          <Box
            px={4}
            py={2}
            borderTop="1px solid"
            borderColor={borderColor}
            bg={headerBg}
            borderBottomRadius="10px"
          >
            <Flex justify="space-between" align="center">
              <Text fontSize="11px" color="gray.600">
                {getStatusText()}
              </Text>
              <Text fontSize="10px" color="gray.500">
                Secured with environment variables
              </Text>
            </Flex>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};

export default ChatBotEnhanced;