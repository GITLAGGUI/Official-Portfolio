import {
  Box,
  VStack,
  HStack,
  IconButton,
  Text,
  Input,
  Spinner,
  useToast,
  Badge,
  Alert,
  AlertIcon,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaTimes, FaPaperPlane, FaRedo } from "react-icons/fa";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  isOffline?: boolean;
}

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Dynamic theme colors
  const getThemeColors = () => {
    if ((colorMode as any) === 'dracula') {
      return {
        bg: "#282A36",
        cardBg: "#44475A",
        textColor: "#F8F8F2",
        borderColor: "#6272A4",
        accentColor: "#BD93F9",
        inputBg: "#44475A",
        userMsgBg: "#BD93F9",
        assistantMsgBg: "#44475A",
        headerBg: "#44475A",
      };
    } else if (colorMode === 'light') {
      // Night Owl theme
      return {
        bg: "#011627",
        cardBg: "#1D3A5F",
        textColor: "#D6DEEB",
        borderColor: "#2E5984",
        accentColor: "#C792EA",
        inputBg: "#1D3A5F",
        userMsgBg: "#C792EA",
        assistantMsgBg: "#1D3A5F",
        headerBg: "#1D3A5F",
      };
    } else {
      // VSCode theme
      return {
        bg: "#1E1E1E",
        cardBg: "#252526",
        textColor: "#CCCCCC",
        borderColor: "#3C3C3C",
        accentColor: "#007ACC",
        inputBg: "#252526",
        userMsgBg: "#007ACC",
        assistantMsgBg: "#252526",
        headerBg: "#252526",
      };
    }
  };

  const themeColors = getThemeColors();

  // Enhanced text formatting function
  const formatText = (text: string): React.ReactNode => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    return (
      <Box>
        {lines.map((line, lineIndex) => {
          const parts = line.split(/(\*\*.*?\*\*|jlaggui47@gmail\.com|github\.com\/GITLAGGUI|linkedin\.com\/in\/joel-laggui-801104369)/g);
          
          const formattedLine = parts.map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const boldText = part.slice(2, -2);
              return (
                <Text as="span" key={`${lineIndex}-${partIndex}`} fontWeight="bold" color="inherit">
                  {boldText}
                </Text>
              );
            }
            
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
            
            return <Text as="span" key={`${lineIndex}-${partIndex}`}>{part}</Text>;
          });
          
          return (
            <Text key={lineIndex} mb={line.startsWith('•') ? 1 : 2}>
              {formattedLine}
            </Text>
          );
        })}
      </Box>
    );
  };

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Enhanced prompt with comprehensive portfolio context
      const portfolioContext = `You are assisting visitors to Joel Laggui Jr.'s portfolio website. Joel is a Full Stack Developer (Web & Mobile) with expertise in React, TypeScript, Flutter, PHP, and Python. He has led cybersecurity teams in national competitions (TRON 2026) and participated in DICT startup challenges (Team Kaagapay). His projects include mobile apps (Hotplate, Eskwelahan.ph), web applications (TopShoppe E-commerce, ISU Lost & Found), and developer tools (PinoyAI CLI). Contact: jlaggui47@gmail.com, +63 915 368 3496, GitHub: github.com/GITLAGGUI.`;
      const enhancedPrompt = `${portfolioContext}\n\nUser question: ${userMessage.content}`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': import.meta.env.VITE_APP_URL || 'https://joellaggui-portfolio.vercel.app',
          'X-Title': import.meta.env.VITE_APP_TITLE || 'Joel Laggui Jr Portfolio',
        },
        body: JSON.stringify({
          model: "z-ai/glm-4.5-air:free",
          messages: [
            {
              role: "system",
              content: `You are Joel Assistant Pro, Joel Laggui Jr.'s personal AI assistant. You know everything about Joel and his portfolio.

ABOUT JOEL LAGGUI JR.:
- Full Name: Joel Laggui Jr.
- Profession: Full Stack Developer (Web & Mobile) with expertise in building modern applications from concept to deployment
- Education: Bachelor of Science in Computer Science from Isabela State University - Cabagan Campus
- Location: Philippines
- Email: jlaggui47@gmail.com
- Phone/WhatsApp: +63 915 368 3496
- Cybersecurity Team Leader at TRON 2026 Cyber Defense Exercise

EXPERTISE AREAS:
• Frontend Development: React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Chakra UI, Tailwind CSS, Responsive Design, Framer Motion
• Backend Development: PHP, Laravel, Python (Flask, FastAPI), Node.js, Express, RESTful API Design, Authentication & Authorization
• Mobile Development: Flutter, Dart, Cross-Platform Development, Android, iOS, Firebase Integration
• Database & Cloud: MySQL, PostgreSQL, MongoDB, Firebase, Supabase, AWS (S3, EC2), Vercel, Netlify
• Programming Languages: TypeScript, JavaScript, Python, PHP, Dart, C++ (Arduino)
• Tools & DevOps: Git, GitHub, Docker, VS Code, Vite, npm, Agile Methodology
• Data & Analytics: Power BI, Python (Pandas, NumPy), Data Visualization, SQL Queries

MAJOR PROJECTS:
1. Hotplate - Modern food delivery app built with Flutter/Dart, Firebase authentication, real-time order tracking
2. Eskwelahan.ph - Comprehensive school management mobile application with Flutter
3. ISU Lost & Found System - PHP/MySQL lost and found tracking platform for Isabela State University
4. TopShoppe E-commerce - Full-featured e-commerce website with product catalog, shopping cart, user authentication
5. PinoyAI CLI - Python-based AI pair programming assistant powered by OpenRouter
6. Maria Lourdes Mansion - Modern hospitality website with responsive design
7. Prostate Cancer Risk Analysis Dashboard - Healthcare analytics dashboard with Streamlit and machine learning
8. ROBOFUSION Line Following Robot - Championship-winning autonomous robot with Arduino/C++

CONTACT INFORMATION:
- Email: jlaggui47@gmail.com
- Phone/WhatsApp: +63 915 368 3496
- GitHub: github.com/GITLAGGUI
- LinkedIn: linkedin.com/in/joellagguijr-dev
- Facebook: facebook.com/joellagguijr
- Instagram: instagram.com/jlaggui.jr

ACHIEVEMENTS & CERTIFICATIONS:
- DICT Philippine Startup Challenge X 2025 - Team Kaagapay (Regional Pitching Competition)
- TRON 2026 Cyber Defense Exercise - Team Leader, 3rd Place (Team ISUC-CompSci)
- Champion in Data Analytics Challenge at ISU ICT Competition
- Champion in ROBOFUSION Line Following Robot Competition
- Huawei Talent Online Certificate of Completion
- Regional ITE Convention 2025 participant

Always respond as Joel's knowledgeable assistant. Provide specific details about his skills in web development, mobile development, and full stack technologies. When asked about his skills, emphasize React, TypeScript, Flutter, PHP, and Python. Highlight his cybersecurity leadership and startup competition experience.`
            },
            { 
              role: "user", 
              content: enhancedPrompt 
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.choices[0].message.content || "I apologize, but I couldn't generate a response at this time.",
          timestamp: new Date(),
          model: data.model
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('Chat error:', error);
      
      // Simple offline response
      const offlineResponse = "I apologize, but I'm currently having trouble connecting to the AI service. Please check back later or feel free to explore Joel's portfolio directly to learn about his skills in data analysis, Python programming, and business intelligence.";
      const assistantMessage: Message = {
        role: 'assistant',
        content: offlineResponse,
        timestamp: new Date(),
        isOffline: true
      };
      setMessages(prev => [...prev, assistantMessage]);

      toast({
        title: "Connection Issue",
        description: "Using offline responses. Please check your API key and connection.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [input, isLoading, toast]);

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "Conversation history has been reset.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          zIndex={9998}
          onClick={onClose}
        />
      )}
      <Box
        position="fixed"
        left={{ base: isOpen ? "0" : "-100%", md: "auto" }}
        right={{ base: "auto", md: isOpen ? "0" : "-400px" }}
        top="0"
        height="100vh"
        width={{ base: "85vw", sm: "320px", md: "400px" }}
        maxW={{ base: "320px", md: "400px" }}
        bg={themeColors.bg}
        borderRight={{ base: `1px solid ${themeColors.borderColor}`, md: "none" }}
        borderLeft={{ base: "none", md: `1px solid ${themeColors.borderColor}` }}
        zIndex={9999}
        transition="all 0.3s ease"
        boxShadow={isOpen ? "2px 0 10px rgba(0,0,0,0.3)" : "none"}
      >
      <VStack height="100%" spacing={0}>
        {/* Header */}
        <HStack
          width="100%"
          p={4}
          bg={themeColors.headerBg}
          borderBottom={`1px solid ${themeColors.borderColor}`}
          justify="space-between"
        >
          <HStack spacing={3}>
            <Box
              as="img"
              src="/assets/chatbot-icon.png"
              alt="Joel Assistant"
              boxSize="20px"
              filter="invert(1)"
            />
            <Text fontWeight="bold" color={themeColors.textColor} fontSize="sm">
              Joel Assistant Pro
            </Text>
          </HStack>
          <HStack spacing={2}>
            <IconButton
              aria-label="Clear chat"
              icon={<FaRedo />}
              size="sm"
              variant="ghost"
              color={themeColors.textColor}
              onClick={clearChat}
              _hover={{ bg: themeColors.cardBg }}
            />
            <IconButton
              aria-label="Close assistant"
              icon={<FaTimes />}
              size="sm"
              variant="ghost"
              color={themeColors.textColor}
              onClick={onClose}
              _hover={{ bg: themeColors.cardBg }}
            />
          </HStack>
        </HStack>

        {/* Messages */}
        <Box
          flex="1"
          width="100%"
          overflowY="auto"
          p={4}
        >
          <VStack spacing={4} align="stretch">
            {messages.length === 0 && (
              <Alert status="info" bg={themeColors.cardBg} color={themeColors.textColor}>
                <AlertIcon />
                <Text fontSize="sm">
                  Hello! I'm Joel Assistant Pro, your personal portfolio guide. I know everything about Joel's skills, projects, experience, and contact information. Ask me anything!
                </Text>
              </Alert>
            )}
            
            {messages.map((message, index) => (
              <Box
                key={index}
                alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                maxWidth="85%"
              >
                <Box
                  bg={message.role === 'user' ? themeColors.userMsgBg : themeColors.assistantMsgBg}
                  color={message.role === 'user' ? "#FFFFFF" : themeColors.textColor}
                  p={3}
                  borderRadius="lg"
                  borderBottomRightRadius={message.role === 'user' ? "sm" : "lg"}
                  borderBottomLeftRadius={message.role === 'user' ? "lg" : "sm"}
                  position="relative"
                >
                  {message.role === 'assistant' ? formatText(message.content) : (
                    <Text fontSize="sm">{message.content}</Text>
                  )}
                  
                  {message.isOffline && (
                    <Badge colorScheme="yellow" size="sm" mt={2}>
                      Offline Mode
                    </Badge>
                  )}
                </Box>
                
                <Text 
                  fontSize="xs" 
                  color={themeColors.textColor} 
                  opacity={0.6}
                  textAlign={message.role === 'user' ? 'right' : 'left'}
                  mt={1}
                >
                  {message.timestamp.toLocaleTimeString()}
                  {message.model && ` • ${message.model.split('/')[1]}`}
                </Text>
              </Box>
            ))}
            
            {isTyping && (
              <Box alignSelf="flex-start" maxWidth="85%">
                <Box
                  bg={themeColors.assistantMsgBg}
                  color={themeColors.textColor}
                  p={3}
                  borderRadius="lg"
                  borderBottomLeftRadius="sm"
                >
                  <HStack spacing={2}>
                    <Spinner size="sm" color={themeColors.accentColor} />
                    <Text fontSize="sm">AI is thinking...</Text>
                  </HStack>
                </Box>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </VStack>
        </Box>

        {/* Input */}
        <Box
          width="100%"
          p={4}
          borderTop={`1px solid ${themeColors.borderColor}`}
          bg={themeColors.headerBg}
        >
          <HStack spacing={2}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Joel's portfolio..."
              size="sm"
              bg={themeColors.inputBg}
              border={`1px solid ${themeColors.borderColor}`}
              color={themeColors.textColor}
              _placeholder={{ color: themeColors.textColor, opacity: 0.6 }}
              _focus={{ borderColor: themeColors.accentColor }}
              disabled={isLoading}
            />
            <IconButton
              aria-label="Send message"
              icon={isLoading ? <Spinner size="sm" /> : <FaPaperPlane />}
              size="sm"
              colorScheme="blue"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              bg={themeColors.accentColor}
              _hover={{ bg: themeColors.accentColor, opacity: 0.8 }}
            />
          </HStack>
        </Box>
      </VStack>
    </Box>
    </>
  );
};

export default AIAssistantPanel;
