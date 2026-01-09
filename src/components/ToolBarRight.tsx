import { HStack, IconButton } from "@chakra-ui/react";

const ToolBarRight = () => {
  const customStyle = { width: "10px", height: "10px", padding: "8px" };
  return (
    <HStack flexShrink={0} mr={2} spacing={1}>
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="yellow"
        aria-label="Minimize"
        size="xsm"
        style={customStyle}
      />
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="green"
        aria-label="Maximize"
        size="xsm"
        style={customStyle}
      />
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="red"
        aria-label="Close"
        size="xsm"
        style={customStyle}
      />
    </HStack>
  );
};

export default ToolBarRight;
