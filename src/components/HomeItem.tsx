import { HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface Props {
  Icon: IconType;
  Label: string;
  Link: string;
}

const HomeItem = ({ Icon, Label, Link }: Props) => {
  const navigate = useNavigate();

  // Theme-aware colors
  const defaultTextColor = useColorModeValue("nightOwl.text", "gray.300");
  const hoverColor = useColorModeValue("syntax.keyword", "#0BCEAF");

  const handleClick = () => {
    if (Link === "/contact") navigate(Link);
    else if (Link) window.open(Link, "_blank");
  };

  return (
    <HStack
      spacing={3}
      textColor={defaultTextColor}
      opacity={Link ? 1 : 0.7}
      cursor={Link ? "pointer" : "default"}
      transition="all 0.3s ease-in-out"
      _hover={
        Link
          ? {
              textColor: hoverColor,
              transform: "translateX(5px)",
            }
          : undefined
      }
      onClick={handleClick}
    >
      <Icon size={20} />
      <Text fontSize="md" fontWeight="medium">
        {Label}
      </Text>
    </HStack>
  );
};

export default HomeItem;
