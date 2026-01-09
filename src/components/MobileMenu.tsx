import {
  Box,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import MobileActivityBar from "./MobileActivityBar";

interface Props {
  selectedPage: string;
  onSelectPage: (page: string) => void;
}

const MobileMenu = ({ selectedPage, onSelectPage }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const getThemeColors = () => {
    if ((colorMode as any) === 'dracula') {
      return {
        bg: "#282A36",
        borderColor: "#6272A4",
      };
    } else if (colorMode === 'dark') {
      return {
        bg: "#1A202C",
        borderColor: "#2D3748",
      };
    } else {
      return {
        bg: "#011627",
        borderColor: "#1E2A3A",
      };
    }
  };

  const { bg, borderColor } = getThemeColors();

  return (
    <>
      <IconButton
        aria-label="Open menu"
        icon={<FaBars />}
        onClick={onOpen}
        variant="ghost"
        size="sm"
        display={{ base: "flex", md: "none" }}
        color="gray.400"
        _hover={{ color: "white", bg: "gray.700" }}
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent 
          bg={bg} 
          borderRight="1px solid" 
          borderColor={borderColor}
          onClick={(e) => e.stopPropagation()}
          maxW="200px"
        >
          <DrawerCloseButton color="gray.400" />
          <DrawerHeader color="gray.200" fontSize="md" py={4}>
            Navigation & Tools
          </DrawerHeader>

          <DrawerBody p={0} onClick={(e) => e.stopPropagation()}>
            <VStack spacing={4} align="stretch">
              {/* Mobile Activity Bar (includes AI Assistant Toggle) */}
              <Box onClick={(e) => e.stopPropagation()}>
                <MobileActivityBar
                  selectedPage={selectedPage}
                  onSelectPage={(page) => {
                    onSelectPage(page);
                    onClose();
                  }}
                  onDrawerClose={onClose}
                />
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;
