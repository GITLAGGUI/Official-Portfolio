import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane, FaChevronUp, FaChevronDown } from "react-icons/fa";
import OpenAI from 'openai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Theme-aware colors that work in all themes
  const bgColor = useColorModeValue("#ffffff", "#1e1e1e");
  const borderColor = useColorModeValue("#e1e4e8", "#30363d");
  const inputBg = useColorModeValue("#f6f8fa", "#21262d");
  const textColor = useColorModeValue("#24292f", "#f0f6fc");
  const headerBg = useColorModeValue("#f6f8fa", "#161b22");
  const assistantMsgBg = useColorModeValue("#f6f8fa", "#21262d");
  const userMsgBg = useColorModeValue("#0969da", "#0969da");
  const hoverBg = useColorModeValue("#f3f4f6", "#30363d");

  // Initialize OpenAI client
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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",
    defaultHeaders: {
      "HTTP-Referer": "https://joellaggui-portfolio.vercel.app",
      "X-Title": "Joel Laggui Jr Portfolio",
    },
    dangerouslyAllowBrowser: true
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: "moonshotai/kimi-k2:free",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for Joel Laggui Jr's portfolio website. You should help visitors learn about Joel's skills, experience, and projects. Here's information about Joel:

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

Be helpful, friendly, and informative. Answer questions about Joel's skills, experience, projects, and how he can help potential clients or employers. Keep responses concise but informative.`
          },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: "user",
            content: inputMessage
          }
        ],
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: completion.choices[0].message.content || "I apologize, but I couldn't process your request. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* VSCode Copilot-style Bottom Bar */}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg={headerBg}
        borderTop="1px solid"
        borderColor={borderColor}
        zIndex={999}
        height="32px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        fontSize="13px"
        color={textColor}
      >
        <HStack spacing={4}>
          <Text fontSize="12px" color="gray.500">
            Ready
          </Text>
          <Text fontSize="12px" color="gray.500">
            JavaScript JSX
          </Text>
        </HStack>
        
        <HStack spacing={2}>
          <Button
            size="xs"
            variant="ghost"
            leftIcon={
              <Image 
                src="/assets/chatbot-icon.webp" 
                alt="AI Assistant" 
                boxSize="14px"
                borderRadius="2px"
              />
            }
            onClick={onToggle}
            fontSize="12px"
            height="24px"
            px={2}
            color={textColor}
            _hover={{ bg: hoverBg }}
            rightIcon={isOpen ? <FaChevronDown size="10px" /> : <FaChevronUp size="10px" />}
          >
            AI Assistant
          </Button>
        </HStack>
      </Box>

      {/* Chat Window */}
      <Collapse in={isOpen}>
        <Box
          position="fixed"
          bottom="32px"
          right={4}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="8px"
          shadow="2xl"
          w="400px"
          h="500px"
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
              />
              <Text fontWeight="500" fontSize="13px" color={textColor}>
                Joel's AI Assistant
              </Text>
            </HStack>
            <IconButton
              aria-label="Close chat"
              icon={<FaTimes />}
              size="xs"
              variant="ghost"
              color={textColor}
              onClick={onToggle}
              _hover={{ bg: hoverBg }}
            />
          </Flex>

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
                </Box>
              </Flex>
            ))}
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
                  <Text fontSize="13px" color={textColor}>Thinking...</Text>
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
            borderBottomRadius="8px"
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
        </Box>
      </Collapse>
    </>
  );
};

export default ChatBot;