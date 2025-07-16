import { Box, VStack } from "@chakra-ui/react";
import {
  VscFiles,
  VscDebugAlt,
  //VscGithub,
  VscAccount,
  VscSettingsGear,
  VscMail,
} from "react-icons/vsc";
import ActivityBarIcon from "./ActivityBarIcon";

interface Props {
  selectedPage: string;
  onSelectPage: (page: string) => void;
}

const ActivityBar = ({ selectedPage, onSelectPage }: Props) => {
  const topAreaPages = [
    { Label: "Home", Icon: VscFiles, Navigate: "home.js", Link: "/" },
    {
      Label: "Projects",
      Icon: VscDebugAlt,
      Navigate: "projects.json",
      Link: "/projects",
    },
    // {
    //   Label: "GitHub",
    //   Icon: VscGithub,
    //   Navigate: "github.css",
    //   Link: "/github",
    // },

    {
      Label: "Contact me",
      Icon: VscMail,
      Navigate: "contact.ts",
      Link: "/contact",
    },
  ];

  return (
    <VStack height="inherit" justify="space-between" width={"100%"}>
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
      <Box marginBottom={2} width={"100%"}>
        <ActivityBarIcon
          Label="About"
          Image={VscAccount}
          Navigate="about.html"
          Link="/about"
          selectedPage={selectedPage}
          onSelectPage={onSelectPage}
        />
        <ActivityBarIcon
          Label="Change Theme"
          Image={VscSettingsGear}
          Navigate="theme.css"
          Link="/theme"
          selectedPage={selectedPage}
          onSelectPage={onSelectPage}
        />
      </Box>
    </VStack>
  );
};

export default ActivityBar;