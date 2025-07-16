import {
  Button,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  Box,
  Collapse,
  Flex,
  IconButton,
  Input,
  VStack,
  Spinner,
  useToast,
  HStack,
  Badge,
  Alert,
  AlertIcon,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane, FaRedo } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";
import PortfolioDataService from "../utils/portfolioDataService";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  isOffline?: boolean;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const ChatBotFooterButton = () => {
  const { isOpen, onToggle } = useDisclosure();
  
  // Initialize portfolio data service for accurate responses
  const portfolioService = PortfolioDataService.getInstance();
  
  // Responsive sizes
  const iconFontSize = useBreakpointValue({
    base: "10px",
    md: "16px",
  });
  const textFontSize = useBreakpointValue({ base: "8px", md: "13px" });

  // Theme-aware colors
  const tooltipBgColor = useColorModeValue("gray.100", "gray.800");
  const tooltipTextColor = useColorModeValue("gray.800", "gray.100");
  const buttonHoverBg = useColorModeValue(
    "rgba(126, 87, 194, 0.1)",
    "rgba(86, 156, 214, 0.1)"
  );
  const iconColor = useColorModeValue("syntax.keyword", "#0BCEAF");
  const textColor = useColorModeValue("gray.300", "gray.300");
  
  // Chat-specific theme colors
  const bgColor = useColorModeValue("#ffffff", "#1e1e1e");
  const borderColor = useColorModeValue("#e1e4e8", "#30363d");
  const inputBg = useColorModeValue("#f6f8fa", "#21262d");
  const chatTextColor = useColorModeValue("#24292f", "#f0f6fc");
  const headerBg = useColorModeValue("#f6f8fa", "#161b22");
  const assistantMsgBg = useColorModeValue("#f6f8fa", "#21262d");
  const userMsgBg = useColorModeValue("#0969da", "#0969da");
  
  // Enhanced text formatting function with contact links and better spacing
  const formatText = (text: string): React.ReactNode => {
    // First handle line breaks and bullet points for better spacing
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    return (
      <Box>
        {lines.map((line, lineIndex) => {
          // Process each line for bold text and contact links
          const parts = line.split(/(\*\*.*?\*\*|jlaggui47@gmail\.com|github\.com\/GITLAGGUI|linkedin\.com\/in\/joel-laggui-801104369)/g);
          
          const formattedLine = parts.map((part, partIndex) => {
            // Handle bold text
            if (part.startsWith('**') && part.endsWith('**')) {
              const boldText = part.slice(2, -2);
              return (
                <Text as="span" key={`${lineIndex}-${partIndex}`} fontWeight="bold" color="inherit">
                  {boldText}
                </Text>
              );
            }
            
            // Handle email links
            if (part === 'jlaggui47@gmail.com') {
              return (
                <Link
                  key={`${lineIndex}-${partIndex}`}
                  href="mailto:jlaggui47@gmail.com"
                  color="blue.400"
                  textDecoration="underline"
                  _hover={{ color: "blue.300" }}
                >
                  {part}
                </Link>
              );
            }
            
            // Handle GitHub links
            if (part === 'github.com/GITLAGGUI') {
              return (
                <Link
                  key={`${lineIndex}-${partIndex}`}
                  href="https://github.com/GITLAGGUI"
                  color="blue.400"
                  textDecoration="underline"
                  _hover={{ color: "blue.300" }}
                  isExternal
                >
                  {part}
                </Link>
              );
            }
            
            // Handle LinkedIn links
            if (part === 'linkedin.com/in/joel-laggui-801104369') {
              return (
                <Link
                  key={`${lineIndex}-${partIndex}`}
                  href="https://linkedin.com/in/joel-laggui-801104369"
                  color="blue.400"
                  textDecoration="underline"
                  _hover={{ color: "blue.300" }}
                  isExternal
                >
                  {part}
                </Link>
              );
            }
            
            // Return regular text
            return part;
          });
          
          // Add proper spacing between lines and bullet points
          return (
            <Text
              key={lineIndex}
              mb={line.startsWith('•') ? 1 : 2}
              pl={line.startsWith('•') ? 2 : 0}
              lineHeight="1.6"
            >
              {formattedLine}
            </Text>
          );
        })}
      </Box>
    );
  };
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'retrying' | 'error' | 'offline'>('connected');
  const [useOfflineMode, setUseOfflineMode] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Proper OpenRouter API Configuration
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
  const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
  
  // Updated model list with proper OpenRouter model IDs
  const OPENROUTER_MODELS = [
    "moonshotai/kimi-k2:free",
    "cognitivecomputations/dolphin-mistral-24b-venice-edition:free", 
    "moonshotai/kimi-dev-72b:free",
    "tngtech/deepseek-r1t2-chimera:free"
  ];

  // Updated system prompt with actual portfolio data
  const systemPrompt = `You are an AI assistant for Joel Laggui Jr's portfolio website. You help visitors understand Joel's expertise and how he can solve their development challenges.

PROFESSIONAL SUMMARY:
Joel is a passionate Full-Stack Developer and Data Analyst with proven expertise in modern web technologies, mobile development, and data science. He delivers scalable applications, insightful data visualizations, and innovative digital solutions.

ACTUAL TECHNICAL SKILLS (from portfolio files):
• Programming Languages: JavaScript, TypeScript, Python, Java, C#
• Frontend Development: React, Next.js, Vue.js, HTML5, CSS3, Bootstrap, Tailwind CSS, Chakra UI, Redux
• Backend Development: Node.js, Express.js, Python (Django/Flask), MongoDB, MySQL, PostgreSQL, REST APIs
• Mobile Development: React Native, Flutter, Expo, Android Development, iOS Development
• Data Analysis: Python (Pandas, NumPy), SQL, Power BI, Tableau, Excel, Data Visualization
• Tools & Technologies: Git, GitHub, Docker, AWS, Firebase, Agile (Scrum, Kanban), Algorithm Design, System Architecture

RECENT CERTIFICATIONS (2025):
• Innovate, Transform, Sustain: Shaping a Smarter World - SPUP (March 2025)
• Algorithm and Program Design - Huawei (February 2025)

ACTUAL FEATURED PROJECTS:
1. Eskwelahan.ph - Educational mobile application built with Flutter and Dart for school management
2. Interactive Dashboard - Comprehensive Power BI dashboard with data visualization and business intelligence
3. Maria Lourdes Mansion - Modern hospitality website with HTML, CSS, JavaScript and responsive design

CONTACT INFORMATION:
• Email: jlaggui47@gmail.com
• Phone: +63 915 368 3496
• GitHub: github.com/GITLAGGUI
• LinkedIn: linkedin.com/in/joel-laggui-801104369
• Location: Philippines (serves global clients)

EDUCATION:
• Isabela State University - Cabagan Campus
• Computer Science/IT Degree

INSTRUCTIONS:
- Provide accurate information based on actual portfolio data
- Keep responses concise and focused (max 100 words)
- Use bold formatting for emphasis (**text**)
- Always provide specific examples from actual projects and skills
- End with clear call-to-action for contact or next steps
- Focus on how Joel can solve the visitor's specific needs`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check connection status on component mount and when chat opens
  useEffect(() => {
    if (isOpen) {
      checkConnectionStatus();
    }
  }, [isOpen]);

  // Performance optimization: Reduce API call delays
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Enhanced connection status check with better debugging
  const checkConnectionStatus = async () => {
    console.log(`🔍 Checking connection status...`);
    console.log(`🌐 Navigator online: ${navigator.onLine}`);
    console.log(`🔑 API Key available: ${OPENROUTER_API_KEY ? 'Yes' : 'No'}`);
    
    // Always start as connected for better user experience
    setConnectionStatus('connected');
    setUseOfflineMode(false);

    // Only check if browser is online - if offline, switch to offline mode
    if (!navigator.onLine) {
      console.log(`📴 Browser offline - switching to offline mode`);
      setConnectionStatus('offline');
      setUseOfflineMode(true);
      return;
    }

    // If API key is missing, stay connected but show warning in console
    if (!OPENROUTER_API_KEY) {
      console.warn('⚠️ OpenRouter API key not found - using fallback responses');
      console.log('💡 To fix: Set VITE_OPENROUTER_API_KEY in environment variables');
      console.log('💡 For Vercel: Add environment variable in dashboard');
      console.log('💡 For local: Create .env file with VITE_OPENROUTER_API_KEY=your_key');
      // Keep connected status for better UX
      return;
    }

    // Validate API key format
    if (!OPENROUTER_API_KEY.startsWith('sk-or-v1-')) {
      console.error('❌ Invalid API key format. OpenRouter keys should start with "sk-or-v1-"');
      console.log('💡 Check your API key in OpenRouter dashboard');
      return;
    }

    // Try a simple API test call
    try {
      console.log(`🧪 Testing API connection...`);
      setConnectionStatus('retrying');
      
      const testResponse = await fetch(`${OPENROUTER_BASE_URL}/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
        },
      });

      console.log(`🧪 Test response: ${testResponse.status} ${testResponse.statusText}`);

      if (testResponse.ok) {
        console.log(`✅ API connection successful`);
        setConnectionStatus('connected');
        setUseOfflineMode(false);
      } else {
        const errorText = await testResponse.text();
        console.warn(`⚠️ API test failed but staying connected: ${testResponse.status} - ${errorText}`);
        // Stay connected even if API test fails for better UX
      }
    } catch (error) {
      console.warn(`⚠️ Connection test failed but staying connected:`, error);
      // Stay connected even if there's an error for better UX
    }
  };

  const findBestResponse = (userInput: string): string => {
    // Use portfolio data service for accurate responses based on actual files
    return portfolioService.analyzeQuery(userInput);
  };

  // Enhanced API debugging and error logging
  const makeOpenRouterAPICall = async (model: string, conversationMessages: Message[]): Promise<string> => {
    if (!OPENROUTER_API_KEY) {
      console.error("❌ OpenRouter API key not found. Check environment variables.");
      console.log("Expected variable: VITE_OPENROUTER_API_KEY");
      console.log("Current value:", OPENROUTER_API_KEY ? "Set (hidden)" : "Not set");
      throw new Error("OpenRouter API key not configured");
    }

    // Validate API key format
    if (!OPENROUTER_API_KEY.startsWith('sk-or-v1-')) {
      console.error("❌ Invalid OpenRouter API key format. Should start with 'sk-or-v1-'");
      throw new Error("Invalid API key format");
    }

    // Prepare messages in the correct format for OpenRouter
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...conversationMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    console.log(`🔄 Attempting API call to model: ${model}`);
    console.log(`📡 API Endpoint: ${OPENROUTER_BASE_URL}/chat/completions`);
    console.log(`🔑 API Key: ${OPENROUTER_API_KEY.substring(0, 12)}...`);

    try {
      const requestBody = {
        model: model,
        messages: apiMessages,
        max_tokens: 300,
        temperature: 0.7,
        stream: false,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      };

      console.log(`📤 Request body:`, JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Joel Laggui Jr Portfolio',
        },
        body: JSON.stringify(requestBody)
      });

      console.log(`📥 Response status: ${response.status} ${response.statusText}`);
      console.log(`📥 Response headers:`, Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error Response:`, errorText);
        
        // Parse error details if possible
        try {
          const errorData = JSON.parse(errorText);
          console.error(`❌ Parsed error:`, errorData);
        } catch (e) {
          console.error(`❌ Raw error text:`, errorText);
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data: OpenRouterResponse = await response.json();
      console.log(`✅ API Response:`, data);

      if (!data.choices || data.choices.length === 0) {
        console.error(`❌ No choices in response:`, data);
        throw new Error("No choices returned from API");
      }

      const content = data.choices[0]?.message?.content;
      if (!content) {
        console.error(`❌ No content in response:`, data.choices[0]);
        throw new Error("No content in API response");
      }

      console.log(`✅ Successfully got response from ${model}: ${content.substring(0, 100)}...`);
      return content.trim();

    } catch (error) {
      console.error(`❌ API call failed for model ${model}:`, error);
      
      // Log additional debugging info
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error(`❌ Network error - check internet connection and CORS settings`);
      }
      
      throw error;
    }
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
    if (useOfflineMode || connectionStatus === 'offline') {
      setTimeout(() => {
        const response = findBestResponse(currentInput);
        const assistantMessage: Message = {
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          isOffline: true
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 300);
      return;
    }

    // Try OpenRouter API calls with proper error handling
    let responseReceived = false;
    setConnectionStatus('retrying');

    for (const model of OPENROUTER_MODELS) {
      try {
        // Include the current user message in the conversation
        const currentConversation = [...messages, userMessage];
        const content = await makeOpenRouterAPICall(model, currentConversation);
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: content,
          timestamp: new Date(),
          model: model
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConnectionStatus('connected');
        setCurrentModel(model);
        setIsLoading(false);
        responseReceived = true;

        console.log(`Successfully got response from model: ${model}`);
        return;
        
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        await delay(200);
      }
    }

    // Fallback to offline mode if all API calls failed
    if (!responseReceived) {
      console.log("All API calls failed, switching to offline mode");
      setConnectionStatus('offline');
      setUseOfflineMode(true);
      
      const response = findBestResponse(currentInput);
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
        description: "OpenRouter API unavailable. Using offline responses.",
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
        content: "Hi! I'm Joel's AI assistant. I can provide accurate information about his **technical skills**, **projects** like Eskwelahan.ph and Maria Lourdes Mansion, **certifications**, and **contact details**. What would you like to know?",
        timestamp: new Date()
      }
    ]);
    // Re-check connection status when resetting
    checkConnectionStatus();
    setCurrentModel("");
    console.log('Chat reset completed');
  };

  const getStatusText = () => {
    if (useOfflineMode || connectionStatus === 'offline') return '🔵 Offline Mode';
    switch (connectionStatus) {
      case 'connected': return `🟢 Assistant Ready${currentModel ? ` (${currentModel.split('/')[0]})` : ''}`;
      case 'retrying': return '🟡 Connecting...';
      case 'error': return '🔴 Connection Error';
      default: return '⚪ Checking Connection...';
    }
  };

  const renderButton = () => (
    <Button
      bg="transparent"
      borderRadius={0}
      size="xs"
      onClick={onToggle}
      _hover={{
        bg: buttonHoverBg,
      }}
      transition="background-color 0.2s ease"
    >
      <VscGithubInverted fontSize={iconFontSize} color={iconColor} />
      <Text fontSize={textFontSize} marginLeft="4px" color={textColor}>
        AI Assistant
      </Text>
    </Button>
  );

  return (
    <>
      <Tooltip
        hasArrow
        label="Chat with Joel's AI Assistant"
        placement="top"
        bg={tooltipBgColor}
        color={tooltipTextColor}
        fontSize="xs"
      >
        {renderButton()}
      </Tooltip>

      {/* Chat Window */}
      <Collapse in={isOpen}>
        <Box
          position="fixed"
          bottom="50px"
          right="20px"
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="8px"
          shadow="2xl"
          w="380px"
          h="480px"
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
              <VscGithubInverted fontSize="16px" color={iconColor} />
              <Text fontWeight="500" fontSize="13px" color={chatTextColor}>
                Joel's AI Assistant
              </Text>
              <Badge 
                size="sm" 
                colorScheme={useOfflineMode || connectionStatus === 'offline' ? 'blue' : connectionStatus === 'connected' ? 'green' : connectionStatus === 'retrying' ? 'yellow' : 'red'}
              >
                {useOfflineMode || connectionStatus === 'offline' ? 'Offline' : 'OpenRouter'}
              </Badge>
            </HStack>
            <HStack spacing={1}>
              <IconButton
                aria-label="Reset chat"
                icon={<FaRedo />}
                size="xs"
                variant="ghost"
                color={chatTextColor}
                onClick={resetChat}
                _hover={{ bg: buttonHoverBg }}
                title="Reset chat"
              />
              <IconButton
                aria-label="Close chat"
                icon={<FaTimes />}
                size="xs"
                variant="ghost"
                color={chatTextColor}
                onClick={onToggle}
                _hover={{ bg: buttonHoverBg }}
              />
            </HStack>
          </Flex>

          {/* Status */}
          <Box p={2} bg={headerBg} borderBottom="1px solid" borderColor={borderColor}>
            <Text fontSize="11px" color={chatTextColor}>
              {getStatusText()}
            </Text>
          </Box>

          {/* Connection Error Alert */}
          {connectionStatus === 'error' && (
            <Alert status="warning" size="sm" py={2}>
              <AlertIcon />
              <Text fontSize="11px">
                Connection issues detected. Using offline responses.
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
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: borderColor,
                borderRadius: '2px',
              },
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                maxW="85%"
                mb={4}
              >
                <Box
                  bg={message.role === 'user' ? userMsgBg : assistantMsgBg}
                  color={message.role === 'user' ? 'white' : chatTextColor}
                  p={4}
                  borderRadius="12px"
                  fontSize="13px"
                  lineHeight="1.6"
                  position="relative"
                  boxShadow="sm"
                >
                  {message.role === 'assistant' ? formatText(message.content) : message.content}
                  
                  {message.isOffline && (
                    <Badge size="xs" colorScheme="blue" mt={1}>
                      Offline
                    </Badge>
                  )}
                  {message.model && (
                    <Badge size="xs" colorScheme="green" mt={1}>
                      {message.model.split('/')[0]}
                    </Badge>
                  )}
                </Box>
                <Text fontSize="9px" color="gray.500" mt={1} textAlign={message.role === 'user' ? 'right' : 'left'}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </Box>
            ))}
            
            {isLoading && (
              <Box alignSelf="flex-start" maxW="85%">
                <Box
                  bg={assistantMsgBg}
                  color={chatTextColor}
                  p={3}
                  borderRadius="8px"
                  fontSize="12px"
                >
                  <HStack spacing={2}>
                    <Spinner size="xs" />
                    <Text>Thinking...</Text>
                  </HStack>
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input */}
          <Box p={3} borderTop="1px solid" borderColor={borderColor}>
            <HStack spacing={2}>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Joel's skills, projects, or contact info..."
                size="sm"
                fontSize="12px"
                bg={inputBg}
                border="1px solid"
                borderColor={borderColor}
                color={chatTextColor}
                _placeholder={{ color: "gray.500" }}
                _focus={{
                  borderColor: iconColor,
                  boxShadow: `0 0 0 1px ${iconColor}`,
                }}
                disabled={isLoading}
              />
              <IconButton
                aria-label="Send message"
                icon={<FaPaperPlane />}
                size="sm"
                colorScheme="blue"
                onClick={sendMessage}
                isLoading={isLoading}
                disabled={!inputMessage.trim() || isLoading}
              />
            </HStack>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};

export default ChatBotFooterButton;