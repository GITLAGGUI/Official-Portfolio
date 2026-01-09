import { HStack, Text } from "@chakra-ui/react";
import ToolBarLeft from "./ToolBarLeft";
import ToolBarRight from "./ToolBarRight";

interface Props {
  selectedPage?: string;
  onSelectPage?: (page: string) => void;
}

const ToolBar = ({ selectedPage = "", onSelectPage = () => {} }: Props) => {
  // selectedPage and onSelectPage kept for compatibility but not used since we removed MobileMenu
  void selectedPage;
  void onSelectPage;
  
  return (
    <HStack justifyContent="space-between" marginX={2} w="100%">
      <HStack spacing={2}>
        <ToolBarLeft />
      </HStack>
      <Text
        fontSize={{ base: "8px", sm: "10px", md: "13px", lg: "13px", xl: "15px" }}
        transform={{ base: "none", md: "translateX(-50%)" }}
        position={{ base: "static", md: "absolute" }}
        left={{ base: "auto", md: "50%" }}
        textAlign="center"
        flex={{ base: 1, md: "none" }}
        mx={{ base: 2, md: 0 }}
        isTruncated
      >
        Joel Laggui - Full Stack Developer
      </Text>
      <ToolBarRight />
    </HStack>
  );
};

export default ToolBar;
