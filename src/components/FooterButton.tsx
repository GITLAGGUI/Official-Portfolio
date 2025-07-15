import {
  Button,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  Content: string;
  TooltipLabel: string;
}

const FooterButton = ({ Icon, Content, TooltipLabel }: Props) => {
  // Responsive sizes
  const iconFontSize = useBreakpointValue({
    base: "10px",
    md: "16px",
  });
  const textFontSize = useBreakpointValue({ base: "8px", md: "13px" });

  // Theme-aware colors
  const tooltipBgColor = useColorModeValue("gray.100", "gray.800");
  const tooltipTextColor = useColorModeValue("gray.800", "gray.100");
  const buttonHoverBg = useColorModeValue(
    "rgba(126, 87, 194, 0.1)",
    "rgba(86, 156, 214, 0.1)"
  );
  const iconColor = useColorModeValue("syntax.keyword", "#0BCEAF");
  const textColor = useColorModeValue("gray.300", "gray.300");

  const renderButton = () => (
    <Button
      bg="transparent"
      borderRadius={0}
      size="xs"
      _hover={{
        bg: buttonHoverBg,
      }}
      transition="background-color 0.2s ease"
    >
      <Icon fontSize={iconFontSize} color={iconColor} />
      <Text fontSize={textFontSize} marginLeft="4px" color={textColor}>
        {Content}
      </Text>
    </Button>
  );

  return TooltipLabel ? (
    <Tooltip
      hasArrow
      label={TooltipLabel}
      placement="top"
      bg={tooltipBgColor}
      color={tooltipTextColor}
      fontSize="xs"
    >
      {renderButton()}
    </Tooltip>
  ) : (
    renderButton()
  );
};

export default FooterButton;
