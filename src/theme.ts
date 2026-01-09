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
    dracula: {
      bg: "#1A1A2E", // Deep purple-tinted background
      currentLine: "#2D2B55", // Rich purple line highlight
      foreground: "#EEFFFF", // Bright foreground
      comment: "#8B8EAC", // Muted purple comment
      cyan: "#89DDFF", // Bright cyan
      green: "#C3E88D", // Lime green
      orange: "#FFCB6B", // Golden orange
      pink: "#FF80AB", // Hot pink
      purple: "#C792EA", // Vibrant purple
      red: "#FF5370", // Coral red
      yellow: "#FFEB95", // Warm yellow
      accent: "#FF79C6", // Magenta accent
    },
    draculaSoft: {
      bg: "#16162A", // Deep space purple background
      currentLine: "#252545", // Subtle purple highlight
      foreground: "#E4E4FC", // Soft lavender white
      comment: "#6E6E9C", // Muted purple comment
      cyan: "#7DCFFF", // Electric cyan
      green: "#9ECE6A", // Fresh green
      orange: "#E0AF68", // Sunset orange
      pink: "#F778BA", // Neon pink
      purple: "#BB9AF7", // Lavender purple
      red: "#F7768E", // Rose red
      yellow: "#E0C080", // Soft gold
      accent: "#9D6DD3", // Deep violet accent
      sidebar: "#1E1E3F", // Purple-tinted sidebar
      statusBar: "#663399", // Rebecca purple status bar
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        // Theme-specific colors based on color mode
        bg: props.colorMode === "dark" 
          ? "gray.800" 
          : props.colorMode === "dracula" 
          ? "draculaSoft.bg" 
          : "nightOwl.bg",
        color: props.colorMode === "dark" 
          ? "whiteAlpha.900" 
          : props.colorMode === "dracula" 
          ? "draculaSoft.foreground" 
          : "nightOwl.text",

        // Classes for specific components
        "&.explorer": {
          bg: props.colorMode === "dark" 
            ? "gray.900" 
            : props.colorMode === "dracula" 
            ? "draculaSoft.currentLine" 
            : "#0D293E",
        },
        "&.status-bar": {
          bg: props.colorMode === "dark"
            ? "vscode.statusBar" 
            : props.colorMode === "dracula" 
            ? "draculaSoft.purple" 
            : "nightOwl.accent",
        },
        "&.activity-bar": {
          bg: props.colorMode === "dark" 
            ? "vscode.activityBar" 
            : props.colorMode === "dracula" 
            ? "draculaSoft.currentLine" 
            : "#0D293E",
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
        "dracula": {
          bg: "dracula.purple",
          color: "dracula.foreground",
          _hover: { bg: "dracula.pink" },
        },
        "dracula-soft": {
          bg: "draculaSoft.purple",
          color: "draculaSoft.foreground",
          _hover: { 
            bg: "draculaSoft.pink",
            transform: "translateY(-2px)",
            boxShadow: "lg"
          },
        },
      },
    },
  },
  semanticTokens: {
    colors: {
      "chakra-body-text": {
        default: "nightOwl.text",
        _dark: "whiteAlpha.900",
        _dracula: "draculaSoft.foreground",
      },
      "chakra-body-bg": {
        default: "nightOwl.bg",
        _dark: "gray.800",
        _dracula: "draculaSoft.bg",
      },
      "panel-bg": {
        default: "#0D293E", // Night Owl panel
        _dark: "gray.900", // VS Code panel
        _dracula: "draculaSoft.currentLine", // Dracula panel
      },
      "sidebar-bg": {
        default: "#0D293E", // Night Owl sidebar
        _dark: "gray.700", // VS Code sidebar
        _dracula: "draculaSoft.currentLine", // Dracula sidebar
      },
    },
  },
});

export default theme;
