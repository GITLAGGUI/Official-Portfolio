import { IconButton, Tooltip, useColorModeValue, Image } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import AIAssistantPanel from "./AIAssistantPanel";

interface AIAssistantToggleProps {
  onPanelOpen?: () => void;
}

const AIAssistantToggle = ({ onPanelOpen }: AIAssistantToggleProps) => {
  const [panelOpen, setPanelOpen] = useState(false);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPanelOpen(prev => {
      const newState = !prev;
      if (newState && onPanelOpen) {
        onPanelOpen();
      }
      return newState;
    });
  }, [onPanelOpen]);

  const handleClose = useCallback(() => {
    setPanelOpen(false);
  }, []);

  // Theme-aware colors to match other ActivityBar icons
  const iconColor = useColorModeValue("gray.500", "gray.400");
  const hoverColor = useColorModeValue("#007ACC", "#007ACC");
  const hoverBg = useColorModeValue("rgba(0, 122, 204, 0.1)", "rgba(0, 122, 204, 0.1)");

  return (
    <>
      <Tooltip label="Joel's AI Assistant" placement="right">
        <IconButton
          aria-label="Toggle AI Assistant"
          icon={
            <Image 
              src="/assets/chatbot-icon.png" 
              alt="AI Assistant" 
              boxSize="20px"
              filter="brightness(0) saturate(100%)"
              _hover={{ filter: "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)" }}
            />
          }
          variant="ghost"
          color={iconColor}
          _hover={{ color: hoverColor, bg: hoverBg }}
          _active={{ bg: "rgba(0, 122, 204, 0.2)" }}
          size="lg"
          width="100%"
          height="48px"
          borderRadius="0"
          onClick={handleToggle}
        />
      </Tooltip>
      <AIAssistantPanel isOpen={panelOpen} onClose={handleClose} />
    </>
  );
};

export default AIAssistantToggle;
