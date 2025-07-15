import { HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  Icon: string;
  Label: string;
  boxSize: string;
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  Link: string;
}

const TabsBarItem = ({
  Icon,
  Label,
  boxSize,
  selectedTab,
  onSelectTab,
  Link,
}: Props) => {
  const navigate = useNavigate();

  const selectedBg = useColorModeValue("rgba(86, 156, 214, 0.3)", "gray.800");
  const borderColor = useColorModeValue("gray.600", "gray.900");
  const selectedBorderColor = useColorModeValue("syntax.keyword", "gray.400");
  const textColor = useColorModeValue("gray.300", "gray.200");
  const hoverTextColor = useColorModeValue("nightOwl.text", "white");

  const handleClick = () => {
    onSelectTab(Label);
    navigate(Link);
  };

  const isSelected = Label === selectedTab;

  return (
    <HStack
      height={6}
      minWidth="130px"
      justifyContent="center"
      padding={4}
      bg={isSelected ? selectedBg : "transparent"}
      borderTopColor={isSelected ? selectedBorderColor : borderColor}
      borderRightColor={borderColor}
      borderLeftColor={borderColor}
      borderTopWidth="1px"
      borderLeftWidth="1px"
      borderRightWidth="1px"
      cursor="pointer"
      userSelect="none"
      onClick={handleClick}
      _hover={{
        bg: useColorModeValue("rgba(1, 22, 39, 0.5)", "gray.700"),
      }}
    >
      <HStack gap={1} alignItems="center">
        <Image boxSize={boxSize} src={Icon} />
        <Text
          fontSize="14px"
          width="100%"
          color={textColor}
          _hover={{ color: hoverTextColor }}
          fontWeight={isSelected ? "medium" : "normal"}
        >
          {Label}
        </Text>
      </HStack>
    </HStack>
  );
};

export default TabsBarItem;
