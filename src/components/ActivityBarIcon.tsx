import {
  Tooltip,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface Props {
  Label: string;
  Image: IconType;
  Navigate: string;
  Link: string;
  selectedPage: string;
  onSelectPage: (page: string) => void;
}

const ActivityBarIcon = ({
  Label,
  Image,
  Navigate,
  Link,
  selectedPage,
  onSelectPage,
}: Props) => {
  const tooltipBgColor = useColorModeValue("gray.200", "gray.700");
  const tooltipTextColor = useColorModeValue("gray.800", "gray.200");
  const iconSize = useBreakpointValue({ base: "20px", sm: "28px" });
  const navigate = useNavigate();
  const handleClick = (page: string, link: string) => {
    onSelectPage(page);
    navigate(link);
  };
  return (
    <Tooltip
      width="100%"
      hasArrow
      label={Label}
      placement="right"
      bg={tooltipBgColor}
      color={tooltipTextColor}
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        padding={3}
        borderLeftWidth="2px"
        borderLeftColor={selectedPage === Navigate ? "gray.500" : "gray.800"}
        cursor={"pointer"}
        _hover={{
          color: "white",
          "> svg": {
            color: "white",
          },
        }}
        onClick={() => handleClick(Navigate, Link)}
      >
        <Icon
          as={Image}
          boxSize={iconSize}
          color={selectedPage === Navigate ? "white" : "gray.400"}
        />
      </Box>
    </Tooltip>
  );
};

export default ActivityBarIcon;
