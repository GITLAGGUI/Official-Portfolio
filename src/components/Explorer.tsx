import { Box, HStack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import ExplorerItem from "./ExplorerItem";
import JSImage from "/assets/javascript.webp";
import HTMLImage from "/assets/html.webp";
import JSONImage from "/assets/json.webp";
import CSSImage from "/assets/css.webp";
import TSImage from "/assets/typescript.webp";

interface Props {
  selectedPage: string;
  onSelectPage: (page: string) => void;
}

const Explorer = ({ onSelectPage }: Props) => {
  const backgroundColor = useColorModeValue("gray-100", "gray.900");
  const [isOpen, setIsOpen] = useState(true);
  const pages = [
    { Label: "home.js", Icon: JSImage, boxSize: "14px", Link: "/" },
    { Label: "about.html", Icon: HTMLImage, boxSize: "15px", Link: "/about" },
    {
      Label: "projects.json",
      Icon: JSONImage,
      boxSize: "17px",
      Link: "/projects",
    },
    //{ Label: "github.css", Icon: CSSImage, boxSize: "15px", Link: "/github" },
    { Label: "contact.ts", Icon: TSImage, boxSize: "15px", Link: "/contact" },
    { Label: "theme.css", Icon: CSSImage, boxSize: "14px", Link: "/theme" },
  ];
  return (
    <VStack
      height="inherit"
      bg={backgroundColor}
      borderRightColor="#393E42"
      borderRightWidth="1px"
    >
      <HStack width="100%" paddingX={3} paddingTop={2}>
        <Text>EXPLORER</Text>
      </HStack>
      <Box width="100%">
        <HStack
          marginTop={2}
          paddingLeft={2}
          gap={0}
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
          <Text userSelect="none" fontSize={13} fontWeight="bold">
            PORTFOLIO
          </Text>
        </HStack>
        {isOpen && (
          <VStack width="100%" paddingLeft={3} marginTop={2} gap={0}>
            {pages.map((page) => (
              <ExplorerItem
                key={page.Label}
                Icon={page.Icon}
                Label={page.Label}
                boxSize={page.boxSize}
                Link={page.Link}
                onSelectPage={onSelectPage}
              />
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
};

export default Explorer;