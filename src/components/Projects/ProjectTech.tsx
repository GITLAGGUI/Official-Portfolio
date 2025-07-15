import { Box } from "@chakra-ui/react";

interface Props {
  label: string;
  borderColor: string;
  textColor?: string;
}

const ProjectTech = ({ label, borderColor, textColor = "white" }: Props) => {
  return (
    <Box
      borderTopLeftRadius="20px"
      borderBottomLeftRadius="20px"
      borderTopRightRadius="20px"
      borderBottomRightRadius="20px"
      color={textColor}
      borderColor={borderColor}
      borderWidth="1px"
      padding="2px"
      paddingX={2}
      fontSize="sm"
    >
      {label}
    </Box>
  );
};

export default ProjectTech;
