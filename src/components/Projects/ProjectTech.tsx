import { Box } from "@chakra-ui/react";

interface Props {
  label: string;
  borderColor?: string; // Made optional since we're not using it
  textColor?: string;
}

const ProjectTech = ({ label, textColor = "white" }: Props) => {
  return (
    <Box
      borderRadius="full"
      color={textColor}
      bg="rgba(255, 255, 255, 0.1)"
      border="none"
      px={{ base: 2, md: 3 }}
      py={{ base: 1, md: 2 }}
      fontSize={{ base: "xs", md: "sm" }}
      fontWeight="medium"
      backdropFilter="blur(10px)"
      transition="all 0.2s ease"
      _hover={{
        bg: "rgba(255, 255, 255, 0.2)",
        transform: "translateY(-1px)"
      }}
    >
      {label}
    </Box>
  );
};

export default ProjectTech;
