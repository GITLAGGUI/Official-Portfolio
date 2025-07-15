import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#2E3440", // VSCode Dark - sidebar, panels
      800: "#24292E", // VSCode Dark - editor bg
      900: "#1F2428", // VSCode Dark - darker panels
    },
    syntax: {
      keyword: "#569CD6",
      variable: "#9CDCFE",
      string: "#CE9178",
      function: "#DCDCAA",
      number: "#B5CEA8",
      comment: "#6A9955",
    },
    nightOwl: {
      bg: "#011627", // Night Owl background
      text: "#d6deeb", // Night Owl text
      highlight: "#143D56", // Selection/highlight
      accent: "#7E57C2", // Purple accent
    },
    vscode: {
      editorBg: "#1E1E1E", // VS Code editor background
      sidebarBg: "#252526", // VS Code sidebar
      activityBar: "#333333", // VS Code activity bar
      statusBar: "#007ACC", // VS Code status bar
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        // Default VS Code dark theme colors
        bg: props.colorMode === "dark" ? "gray.800" : "nightOwl.bg",
        color: props.colorMode === "dark" ? "whiteAlpha.900" : "nightOwl.text",

        // Classes for specific components
        "&.explorer": {
          bg: props.colorMode === "dark" ? "gray.900" : "#0D293E",
        },
        "&.status-bar": {
          bg:
            props.colorMode === "dark" ? "vscode.statusBar" : "nightOwl.accent",
        },
        "&.activity-bar": {
          bg: props.colorMode === "dark" ? "vscode.activityBar" : "#0D293E",
        },
      },
    }),
  },
  components: {
    // You can add component-specific styles here
    Button: {
      variants: {
        vscode: {
          bg: "gray.700",
          _hover: { bg: "gray.600" },
        },
        "night-owl": {
          bg: "nightOwl.accent",
          _hover: { bg: "purple.600" },
        },
      },
    },
  },
  semanticTokens: {
    colors: {
      "chakra-body-text": {
        default: "nightOwl.text",
        _dark: "whiteAlpha.900",
      },
      "chakra-body-bg": {
        default: "nightOwl.bg",
        _dark: "gray.800",
      },
      "panel-bg": {
        default: "#0D293E", // Night Owl panel
        _dark: "gray.900", // VS Code panel
      },
      "sidebar-bg": {
        default: "#0D293E", // Night Owl sidebar
        _dark: "gray.700", // VS Code sidebar
      },
    },
  },
});

export default theme;
