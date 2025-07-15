import { HStack, IconButton } from "@chakra-ui/react";

const ToolBarRight = () => {
  const customStyle = { width: "10px", height: "10px", padding: "8px" };
  return (
    <HStack>
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="yellow"
        aria-label="Done"
        size="xsm"
        style={customStyle}
      />
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="green"
        aria-label="Done"
        size="xsm"
        style={customStyle}
      />
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="red"
        aria-label="Done"
        size="xsm"
        style={customStyle}
      />
    </HStack>
  );
};

export default ToolBarRight;
