import { Box, VStack } from "@chakra-ui/react";
import {
  VscFiles,
  VscDebugAlt,
  VscAccount,
  VscSettingsGear,
  VscMail,
} from "react-icons/vsc";
import ActivityBarIcon from "./ActivityBarIcon";
import AIAssistantToggle from "./AIAssistantToggle";

interface Props {
  selectedPage: string;
  onSelectPage: (page: string) => void;
  onDrawerClose?: () => void;
}

const MobileActivityBar = ({ selectedPage, onSelectPage, onDrawerClose }: Props) => {
  const topAreaPages = [
    { Label: "Home", Icon: VscFiles, Navigate: "home.js", Link: "/" },
    {
      Label: "Projects",
      Icon: VscDebugAlt,
      Navigate: "projects.json",
      Link: "/projects",
    },
    {
      Label: "Contact me",
      Icon: VscMail,
      Navigate: "contact.ts",
      Link: "/contact",
    },
  ];

  const bottomAreaPages = [
    {
      Label: "About",
      Icon: VscAccount,
      Navigate: "about.html",
      Link: "/about",
    },
    {
      Label: "Change Theme",
      Icon: VscSettingsGear,
      Navigate: "theme.css",
      Link: "/theme",
    },
  ];

  return (
    <VStack height="inherit" justify="space-between" width={"100%"} spacing={4}>
      <Box width={"100%"}>
        {topAreaPages.map((page) => (
          <ActivityBarIcon
            Label={page.Label}
            Image={page.Icon}
            Navigate={page.Navigate}
            Link={page.Link}
            selectedPage={selectedPage}
            onSelectPage={onSelectPage}
            key={page.Label}
          />
        ))}
      </Box>
      
      {/* AI Assistant - separate section for mobile */}
      <Box width={"100%"} py={2}>
        <AIAssistantToggle onPanelOpen={onDrawerClose} />
      </Box>
      
      <Box marginBottom={2} width={"100%"}>
        {bottomAreaPages.map((page) => (
          <ActivityBarIcon
            Label={page.Label}
            Image={page.Icon}
            Navigate={page.Navigate}
            Link={page.Link}
            selectedPage={selectedPage}
            onSelectPage={onSelectPage}
            key={page.Label}
          />
        ))}
      </Box>
    </VStack>
  );
};

export default MobileActivityBar;
