import { VStack, Text, HStack, Box, Tooltip } from "@chakra-ui/react";

interface Props {
  totalLines: number;
  errorLines: number[];
  errorMessages: Record<number, string>;
}

const ContactCodeLines = ({ totalLines, errorLines, errorMessages }: Props) => {
  return (
    <VStack
      pr={2}
      borderRight="1px"
      borderColor="gray.600"
      color="gray.500"
      minW="40px"
      align="flex-end"
      flexShrink={0}
    >
      {Array.from({ length: totalLines }, (_, i) => {
        const lineNumber = i + 1;
        const hasError = errorLines.includes(lineNumber);
        const errorMsg = errorMessages[lineNumber];

        return (
          <HStack key={lineNumber} spacing={1}>
            {hasError ? (
              <Tooltip label={errorMsg} hasArrow bg="red.500" color="white">
                <Box w="8px" h="8px" bg="red.500" borderRadius="sm" />
              </Tooltip>
            ) : null}
            <Text>{lineNumber}</Text>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default ContactCodeLines;
