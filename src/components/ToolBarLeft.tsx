import { HStack, Image, Show, Text } from "@chakra-ui/react";
import WebLogo from "/assets/vscode_icon.svg";

const ToolBarLeft = () => {
  const tools = ["File", "Edit", "View", "Go", "Run", "Terminal", "Help"];
  return (
    <HStack>
      <Image marginRight={2} marginTop="3px" src={WebLogo} boxSize="20px" />
      <Show above="lg">
        {tools.map((tool) => (
          <Text
            fontSize="13px"
            marginX="3px"
            key={tool}
            userSelect="none"
            cursor="pointer"
          >
            {tool}
          </Text>
        ))}
      </Show>
    </HStack>
  );
};

export default ToolBarLeft;
