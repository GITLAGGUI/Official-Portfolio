import { HStack, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  Icon: string;
  Label: string;
  boxSize: string;
  Link: string;
  onSelectPage: (page: string) => void;
}

const ExplorerItem = ({ Icon, Label, boxSize, Link, onSelectPage }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelectPage(Label);
    navigate(Link);
  };
  return (
    <HStack
      width="100%"
      height={6}
      cursor="pointer"
      userSelect="none"
      _hover={{ bg: "gray.800" }}
      onClick={handleClick}
    >
      <Image boxSize={boxSize} src={Icon} />
      <Text
        fontSize="15px"
        width="100%"
        color="gray.200"
        _hover={{ color: "white" }}
      >
        {Label}
      </Text>
    </HStack>
  );
};

export default ExplorerItem;
