// export const lightTheme = {
//   colors: {
//     primary: "tomato",
//     secondary: "royalblue",
//     text: "#333",
//     background: "#fafafa",
//   },
//   space: [0, 4, 8, 16, 32, 64], // spacing scale
//   fontSizes: [12, 14, 16, 20, 24, 32],
// };

export const lightTheme = {
  colors: {
    primary: "#6366F1",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    text: "#333333",
    background: "#fafafa",
    textOnPrimary: "#F9FAFB",
    error: "#DF3F40",
    border: "#E3E6EA",
    muted: "#9CA3AF",
    greenC: "#059669",
    violetC: "#7c3aed",
    purpleC: "#6d28d9",
    tealC: "#0284c7",
  },

  gradients: {
    purple: "linear-gradient(to right, #a78bfa, #6d28d9)",
    teal: "linear-gradient(to right, #22d3ee, #0284c7)",
    violet: "linear-gradient(to right, #c4b5fd, #7c3aed)",
    green: "linear-gradient(to right, #34d399, #059669)",
  },
  space: [0, 4, 8, 16, 20, 24],

  fonts: {
    body: "system-ui, sans-serif", // general text
    heading: "Georgia, serif", // headings
    monospace: "Menlo, monospace", // code blocks
  },
  fontSizes: [12, 14, 16, 20, 24, 32],
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  radii: [4, 6, 8],
  borders: {
    thin: "1px solid",
  },

  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.2)",
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    primary: "#818CF8", // lighter version of light.primary
    secondary: "#A78BFA", // lighter secondary
    accent: "#22D3EE", // bright accent for dark background
    error: "#F87171", // error color stands out
    border: "#4B5563", // dark border for contrast
    background: "#111827", // dark background
    text: "#F9FAFB", // light text
    textOnPrimary: "#F9FAFB",
    muted: "#9CA3AF", // muted text for secondary info
    greenC: "#059669",
    violetC: "#7c3aed",
    purpleC: "#6d28d9",
    tealC: "#0284c7",
  },
};
