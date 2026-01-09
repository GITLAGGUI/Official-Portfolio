import { Box, HStack, IconButton, Text, VStack, useColorMode } from "@chakra-ui/react";
import { VscFiles, VscAccount, VscMail, VscDebugAlt, VscSettingsGear } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode } = useColorMode();

  const getThemeColors = () => {
    if ((colorMode as string) === 'dracula') {
      return {
        bg: "#282A36",
        borderColor: "#6272A4",
        activeColor: "#BD93F9",
        inactiveColor: "#6272A4",
      };
    } else if (colorMode === 'dark') {
      return {
        bg: "#1E1E1E",
        borderColor: "#333333",
        activeColor: "#007ACC",
        inactiveColor: "#808080",
      };
    } else {
      return {
        bg: "#011627",
        borderColor: "#1E2A3A",
        activeColor: "#82AAFF",
        inactiveColor: "#7E8B99",
      };
    }
  };

  const { bg, borderColor, activeColor, inactiveColor } = getThemeColors();

  const navItems = [
    { icon: VscFiles, label: "Home", path: "/", navigate: "home.js" },
    { icon: VscDebugAlt, label: "Projects", path: "/projects", navigate: "projects.json" },
    { icon: VscAccount, label: "About", path: "/about", navigate: "about.html" },
    { icon: VscMail, label: "Contact", path: "/contact", navigate: "contact.ts" },
    { icon: VscSettingsGear, label: "Theme", path: "/theme", navigate: "theme.css" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={bg}
      borderTop="1px solid"
      borderColor={borderColor}
      display={{ base: "block", md: "none" }}
      zIndex={1000}
      px={2}
      py={1}
      backdropFilter="blur(10px)"
    >
      <HStack justify="space-around" spacing={0}>
        {navItems.map((item) => (
          <VStack
            key={item.path}
            spacing={0}
            cursor="pointer"
            onClick={() => navigate(item.path)}
            py={2}
            px={3}
            borderRadius="md"
            transition="all 0.2s"
            color={isActive(item.path) ? activeColor : inactiveColor}
            _hover={{ color: activeColor }}
          >
            <IconButton
              aria-label={item.label}
              icon={<item.icon size={20} />}
              variant="ghost"
              size="sm"
              color="inherit"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              minW="auto"
              h="auto"
              p={0}
            />
            <Text fontSize="9px" fontWeight={isActive(item.path) ? "600" : "400"}>
              {item.label}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default MobileBottomNav;
