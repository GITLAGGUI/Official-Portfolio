import {
  VStack,
  Image,
  Text,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import ProjectTech from "./ProjectTech";

interface Props {
  ImageURL: string;
  Title: string;
  Description: string;
  Technologies: string[];
  Source?: string;
  Demo?: string;
}

const Project = ({
  ImageURL,
  Title,
  Description,
  Technologies,
  Source,
  Demo,
}: Props) => {
  const cardBg = useColorModeValue("rgba(1, 22, 39, 0.8)", "gray.900");
  const textColor = useColorModeValue("nightOwl.text", "whiteAlpha.900");
  const secondaryText = useColorModeValue("gray.400", "gray.300");
  const borderColor = useColorModeValue(
    "rgba(126, 87, 194, 0.3)",
    "rgba(86, 156, 214, 0.3)"
  );
  const accentColor = useColorModeValue("syntax.keyword", "#0BCEAF");
  const techBorderColor = useColorModeValue("purple.500", "#0BCEAF");

  return (
    <VStack
      bg={cardBg}
      borderRadius="10px"
      height="100%"
      border="1px solid"
      borderColor={borderColor}
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: useColorModeValue(
          "0 10px 20px rgba(126, 87, 194, 0.2)",
          "0 10px 20px rgba(86, 156, 214, 0.2)"
        ),
      }}
    >
      <Image
        width="100%"
        src={ImageURL}
        borderTopRadius="10px"
        borderBottom="1px solid"
        borderBottomColor={borderColor}
      />
      <VStack align="left" width="100%" padding={5} height="100%" spacing={3}>
        <Text fontWeight="bold" fontSize="lg" color={textColor}>
          {Title}
        </Text>
        <Text color={secondaryText} fontSize="sm">
          {Description}
        </Text>
        <HStack wrap="wrap" spacing={2} marginY={2}>
          {Technologies.map((t) => (
            <ProjectTech
              key={t}
              label={t}
              borderColor={techBorderColor}
              textColor={textColor}
            />
          ))}
        </HStack>

        {(Source || Demo) && (
          <HStack spacing={4} marginTop="auto">
            {Source && (
              <Link
                href={Source}
                color={accentColor}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="sm"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
              >
                Source
              </Link>
            )}
            {Demo && (
              <Link
                href={Demo}
                color={accentColor}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="sm"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
              >
                Demo
              </Link>
            )}
          </HStack>
        )}
      </VStack>
    </VStack>
  );
};

export default Project;
