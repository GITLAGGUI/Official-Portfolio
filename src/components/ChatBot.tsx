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
  Badge,
  Button,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane, FaRedo } from "react-icons/fa";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

interface KnowledgeBase {
  [key: string]: string[];
}

const ChatBot = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Joel's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'retrying' | 'error' | 'offline'>('connected');
  const [useOfflineMode, setUseOfflineMode] = useState(false);
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

  // API Configuration
  const API_KEY = "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";
  const API_MODELS = [
    "microsoft/phi-3-mini-128k-instruct:free",
    "nousresearch/hermes-3-llama-3.1-405b:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "qwen/qwen-2.5-7b-instruct:free"
  ];

  // Knowledge base for offline responses
  const knowledgeBase: KnowledgeBase = {
    skills: [
      "Joel is a Full-Stack Developer and Data Analyst with expertise in JavaScript, TypeScript, React.js, Next.js, Node.js, Python, and more.",
      "His technical skills include Frontend (React, Vue, Angular), Backend (Node.js, Python, PHP), Mobile (React Native, Flutter), and Data Analysis (Python, R, Power BI).",
      "Joel is proficient in modern web technologies including HTML5, CSS3, Chakra UI, Material-UI, Tailwind CSS, and various databases like MongoDB, PostgreSQL, MySQL."
    ],
    experience: [
      "Joel is currently working as a Freelance Full-Stack Developer & Data Analyst (2023-Present) and Independent Software Developer (2022-Present).",
      "He has proven track record in building scalable applications, creating insightful data visualizations, and delivering innovative digital solutions.",
      "Joel has experience with DevOps tools like Git, GitHub, AWS, Google Cloud, Vercel, Docker, and Kubernetes."
    ],
    projects: [
      "Joel's featured projects include Eskwelahan.ph (Educational Mobile Application built with React Native and Firebase), Advanced Power BI Analytics Dashboard, and Maria Lourdes Mansion luxury hotel website.",
      "He has built various web applications using React, TypeScript, and modern UI frameworks, focusing on user experience and performance.",
      "His projects demonstrate expertise in both frontend development and data visualization, creating solutions that are both functional and visually appealing."
    ],
    certifications: [
      "Joel recently earned SPUP Innovation & Transformation Certificate (March 2025) and Huawei Algorithm & Program Design Certificate (February 2025).",
      "These certifications demonstrate his commitment to continuous learning and staying updated with the latest technologies and methodologies."
    ],
    contact: [
      "You can contact Joel at jlaggui47@gmail.com or call +63 915 368 3496.",
      "Check out his GitHub profile at GITLAGGUI to see his latest projects and contributions.",
      "Joel is based in the Philippines and available for freelance projects and full-time opportunities."
    ],
    services: [
      "Joel offers full-stack web development, mobile app development, data analysis and visualization, and custom software solutions.",
      "He can help with React/Next.js applications, Node.js backends, database design, API development, and Power BI dashboards.",
      "Joel provides end-to-end development services from planning and design to deployment and maintenance."
    ]
  };

  const systemPrompt = `You are an AI assistant for Joel Laggui Jr's portfolio website. You should help visitors learn about Joel's skills, experience, and projects. Here's information about Joel:

PROFESSIONAL SUMMARY:
Joel is a passionate Full-Stack Developer and Data Analyst with expertise in modern web technologies, mobile development, and data science. He has proven track record in building scalable applications, creating insightful data visualizations, and delivering innovative digital solutions.

RECENT CERTIFICATIONS (2025):
- SPUP Innovation & Transformation Certificate (March 2025)
- Huawei Algorithm & Program Design Certificate (February 2025)

TECHNICAL SKILLS:
Frontend: JavaScript (ES6+), TypeScript, HTML5, CSS3, React.js, Next.js, Vue.js, Chakra UI, Material-UI, Tailwind CSS
Backend: Node.js, Python, PHP, Express.js, FastAPI, Django, MongoDB, PostgreSQL, MySQL, Firebase
Mobile: React Native, Flutter, iOS, Android development
Data Analysis: Python (Pandas, NumPy), R, SQL, Power BI, Tableau, Excel, Machine Learning (Scikit-learn, TensorFlow)
DevOps: Git, GitHub, AWS, Google Cloud, Vercel, Docker, Kubernetes

FEATURED PROJECTS:
1. Eskwelahan.ph - Educational Mobile Application (React Native, Firebase)
2. Advanced Power BI Analytics Dashboard (Power BI, DAX)
3. Maria Lourdes Mansion - Luxury Hotel Website (React, TypeScript, Chakra UI)

EXPERIENCE:
- Freelance Full-Stack Developer & Data Analyst (2023-Present)
- Independent Software Developer (2022-Present)

CONTACT:
- Email: jlaggui47@gmail.com
- Phone: +63 915 368 3496
- GitHub: GITLAGGUI
- Location: Philippines

INSTRUCTIONS:
- Be helpful, friendly, and informative
- Answer questions about Joel's skills, experience, projects, and how he can help potential clients or employers
- Keep responses concise but informative (max 100 words per response)
- If asked about topics outside Joel's portfolio, politely redirect to his professional information
- Always maintain a professional yet conversational tone`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const findBestResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm here to help you learn about Joel's skills and experience. What would you like to know?";
    }

    // Skills-related keywords
    if (input.includes('skill') || input.includes('technology') || input.includes('tech') || 
        input.includes('programming') || input.includes('language') || input.includes('framework')) {
      return knowledgeBase.skills[Math.floor(Math.random() * knowledgeBase.skills.length)];
    }

    // Experience-related keywords
    if (input.includes('experience') || input.includes('work') || input.includes('job') || 
        input.includes('career') || input.includes('background')) {
      return knowledgeBase.experience[Math.floor(Math.random() * knowledgeBase.experience.length)];
    }

    // Project-related keywords
    if (input.includes('project') || input.includes('portfolio') || input.includes('work') || 
        input.includes('app') || input.includes('website') || input.includes('application')) {
      return knowledgeBase.projects[Math.floor(Math.random() * knowledgeBase.projects.length)];
    }

    // Contact-related keywords
    if (input.includes('contact') || input.includes('email') || input.includes('phone') || 
        input.includes('reach') || input.includes('hire') || input.includes('github')) {
      return knowledgeBase.contact[Math.floor(Math.random() * knowledgeBase.contact.length)];
    }

    // Services-related keywords
    if (input.includes('service') || input.includes('help') || input.includes('develop') || 
        input.includes('build') || input.includes('create') || input.includes('offer')) {
      return knowledgeBase.services[Math.floor(Math.random() * knowledgeBase.services.length)];
    }

    // React-specific
    if (input.includes('react') || input.includes('frontend') || input.includes('ui')) {
      return "Joel is highly skilled in React.js and Next.js development. He builds modern, responsive web applications using React, TypeScript, and UI libraries like Chakra UI and Material-UI.";
    }

    // Backend-specific
    if (input.includes('backend') || input.includes('server') || input.includes('api') || input.includes('node')) {
      return "Joel has strong backend development skills using Node.js, Express.js, Python, and PHP. He can build RESTful APIs, handle databases, and create scalable server-side applications.";
    }

    // Data analysis
    if (input.includes('data') || input.includes('analysis') || input.includes('analytics') || 
        input.includes('visualization') || input.includes('powerbi') || input.includes('dashboard')) {
      return "Joel specializes in data analysis and visualization using Python (Pandas, NumPy), R, SQL, Power BI, and Tableau. He creates insightful dashboards and analytics solutions.";
    }

    // Mobile development
    if (input.includes('mobile') || input.includes('app') || input.includes('android') || 
        input.includes('ios') || input.includes('react native') || input.includes('flutter')) {
      return "Joel develops mobile applications using React Native and Flutter, creating cross-platform apps for both iOS and Android with native performance and user experience.";
    }

    // Default responses
    const defaultResponses = [
      "I'd be happy to tell you more about Joel's expertise! He's a skilled Full-Stack Developer and Data Analyst. Would you like to know about his skills, projects, or experience?",
      "Joel has extensive experience in web development, mobile apps, and data analysis. What specific area interests you most?",
      "Feel free to ask about Joel's technical skills, recent projects, certifications, or how to contact him for opportunities!",
      "Joel offers comprehensive development services from frontend React applications to backend APIs and data visualization. What would you like to learn more about?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const makeAPICall = async (model: string, messages: any[]): Promise<string> => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'https://joellaggui-portfolio.vercel.app',
        'X-Title': 'Joel Laggui Jr Portfolio',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(msg => ({ role: msg.role, content: msg.content }))
        ],
        max_tokens: 300,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I apologize, but I couldn't process your request.";
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

    // If offline mode is enabled or we've had connection issues, use offline response
    if (useOfflineMode || connectionStatus === 'error') {
      setTimeout(() => {
        const response = findBestResponse(currentInput);
        const assistantMessage: Message = {
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500);
      return;
    }

    // Try API calls
    let responseReceived = false;
    setConnectionStatus('retrying');

    for (const model of API_MODELS) {
      try {
        console.log(`Trying model: ${model}`);
        const content = await makeAPICall(model, messages);
        
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
        await delay(1000);
      }
    }

    // If all API calls failed, fall back to offline mode
    if (!responseReceived) {
      setConnectionStatus('error');
      setUseOfflineMode(true);
      
      const response = findBestResponse(currentInput);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response + " (Note: I'm currently running in offline mode. For real-time assistance, please contact Joel directly at jlaggui47@gmail.com)",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      toast({
        title: "Switched to Offline Mode",
        description: "AI service unavailable. Using offline responses.",
        status: "warning",
        duration: 3000,
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
        content: "Hi! I'm Joel's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
        timestamp: new Date()
      }
    ]);
    setConnectionStatus('connected');
    setUseOfflineMode(false);
  };

  const getStatusColor = () => {
    if (useOfflineMode) return 'blue.500';
    switch (connectionStatus) {
      case 'connected': return 'green.500';
      case 'retrying': return 'yellow.500';
      case 'error': return 'red.500';
      default: return 'gray.500';
    }
  };

  const getStatusText = () => {
    if (useOfflineMode) return '🔵 Offline Assistant';
    switch (connectionStatus) {
      case 'connected': return '🟢 AI Assistant Ready';
      case 'retrying': return '🟡 Connecting...';
      case 'error': return '🔴 Connection Error';
      default: return '⚪ Initializing...';
    }
  };

  const quickQuestions = [
    "What are Joel's skills?",
    "Tell me about his projects",
    "How can I contact Joel?",
    "What services does he offer?"
  ];

  return (
    <>
      {/* Floating AI Assistant Logo */}
      <Box
        position="fixed"
        bottom="50px"
        right="20px"
        zIndex={999}
      >
        <IconButton
          aria-label="AI Assistant"
          icon={
            <Image 
              src="/assets/chatbot-icon.webp" 
              alt="AI Assistant" 
              boxSize="24px"
              borderRadius="4px"
              fallback={<Text fontSize="24px">🤖</Text>}
            />
          }
          onClick={onToggle}
          size="lg"
          bg={bgColor}
          border="2px solid"
          borderColor={borderColor}
          borderRadius="full"
          boxShadow="lg"
          _hover={{ 
            bg: hoverBg,
            transform: "scale(1.05)",
            boxShadow: "xl"
          }}
          transition="all 0.2s"
          width="56px"
          height="56px"
        />
      </Box>

      {/* Chat Window */}
      <Collapse in={isOpen}>
        <Box
          position="fixed"
          bottom="120px"
          right="20px"
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="8px"
          shadow="2xl"
          w="400px"
          h="520px"
          zIndex={1000}
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          {/* Header */}
          <Flex
            align="center"
            justify="space-between"
            p={3}
            borderBottom="1px solid"
            borderColor={borderColor}
            bg={headerBg}
            borderTopRadius="8px"
          >
            <HStack spacing={2}>
              <Image 
                src="/assets/chatbot-icon.webp" 
                alt="AI Assistant" 
                boxSize="16px"
                borderRadius="2px"
                fallback={<Text fontSize="16px">🤖</Text>}
              />
              <Text fontWeight="500" fontSize="13px" color={textColor}>
                Joel's AI Assistant
              </Text>
              <Badge 
                size="sm" 
                colorScheme={useOfflineMode ? 'blue' : connectionStatus === 'connected' ? 'green' : connectionStatus === 'retrying' ? 'yellow' : 'red'}
              >
                {useOfflineMode ? 'Offline' : 'OpenRouter'}
              </Badge>
            </HStack>
            <HStack spacing={1}>
              <IconButton
                aria-label="Reset chat"
                icon={<FaRedo />}
                size="xs"
                variant="ghost"
                color={textColor}
                onClick={resetChat}
                _hover={{ bg: hoverBg }}
                title="Reset chat"
              />
              <IconButton
                aria-label="Close chat"
                icon={<FaTimes />}
                size="xs"
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
              <AlertIcon boxSize="12px" />
              <Text fontSize="11px">
                Running in offline mode. Contact Joel directly for real-time assistance.
              </Text>
            </Alert>
          )}

          {/* Messages */}
          <VStack
            flex={1}
            overflowY="auto"
            p={3}
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
                  px={3}
                  py={2}
                  borderRadius="8px"
                  maxW="85%"
                  fontSize="13px"
                  lineHeight="1.4"
                  border={message.role === 'assistant' ? "1px solid" : "none"}
                  borderColor={message.role === 'assistant' ? borderColor : "transparent"}
                >
                  {message.content}
                  {message.model && (
                    <Text fontSize="9px" color="gray.500" mt={1} fontStyle="italic">
                      via {message.model.split('/')[0]}
                    </Text>
                  )}
                </Box>
              </Flex>
            ))}
            
            {/* Quick Questions */}
            {messages.length === 1 && (
              <VStack spacing={2} align="stretch" mt={2}>
                <Text fontSize="11px" color="gray.500" textAlign="center">
                  Quick questions:
                </Text>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    size="xs"
                    variant="outline"
                    fontSize="11px"
                    onClick={() => setInputMessage(question)}
                    borderColor={borderColor}
                    color={textColor}
                    _hover={{ bg: hoverBg }}
                  >
                    {question}
                  </Button>
                ))}
              </VStack>
            )}
            
            {isLoading && (
              <Flex justify="flex-start">
                <Box
                  bg={assistantMsgBg}
                  border="1px solid"
                  borderColor={borderColor}
                  px={3}
                  py={2}
                  borderRadius="8px"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Spinner size="xs" />
                  <Text fontSize="13px" color={textColor}>
                    {connectionStatus === 'retrying' ? 'Connecting to AI...' : 'Thinking...'}
                  </Text>
                </Box>
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input */}
          <Flex
            p={3}
            borderTop="1px solid"
            borderColor={borderColor}
            gap={2}
            bg={bgColor}
          >
            <Input
              placeholder="Ask me about Joel's skills and experience..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              bg={inputBg}
              border="1px solid"
              borderColor={borderColor}
              size="sm"
              fontSize="13px"
              disabled={isLoading}
              color={textColor}
              _placeholder={{ color: "gray.500" }}
              _focus={{ 
                borderColor: "#0969da",
                boxShadow: "0 0 0 1px #0969da"
              }}
            />
            <IconButton
              aria-label="Send message"
              icon={<FaPaperPlane />}
              size="sm"
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
            />
          </Flex>

          {/* Status Bar */}
          <Box
            px={3}
            py={1}
            borderTop="1px solid"
            borderColor={borderColor}
            bg={headerBg}
            borderBottomRadius="8px"
          >
            <Text fontSize="10px" color={getStatusColor()} textAlign="center" fontWeight="500">
              {getStatusText()}
            </Text>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};

export default ChatBot;