const scheme = {
  black: {
    50: "#EFEFF0",
    100: "#E0E0E1",
    200: "#C3C3C5",
    300: "#A4A4A7",
    400: "#87878C",
    500: "#69696D",
    600: "#555558",
    700: "#3F3F41",
    800: "#2B2B2C",
    900: "#141415",
    950: "#0A0A0A",
  },
  accent: {
    50: "#F1F3FE",
    100: "#E3E7FD",
    200: "#C6D0FB",
    300: "#AAB8F8",
    400: "#8DA1F6",
    500: "#718AF4",
    600: "#2F52EF",
    700: "#0F31C7",
    800: "#0A2185",
    900: "#051042",
    950: "#030821",
  },
  secondary: {
    50: "#E7E8EE",
    100: "#CFD0DD",
    200: "#A0A2BB",
    300: "#707399",
    400: "#4C4E6B",
    500: "#2A2B3B",
    600: "#222330",
    700: "#191A24",
  },
  white: {
    50: "#FFFFFF",
    100: "#FFFFFF",
    200: "#FAFBFF",
    300: "#FAFBFF",
    400: "#FAFBFF",
    500: "#F8F9FF",
  },
};

const Theme = {
  color: {
    scheme,
    neutral: {
      background: scheme.black["600"],
      overlay: "rgba(0, 0, 0, 0.75)",
      border: "rgba(242, 242, 242, .25)",
    },
    text: {
      dark: scheme.black["800"],
      light: scheme.white["100"],
      placeholder: "rgba(32, 34, 36, 0.35)",
      disabled: "#CACACA",
    },
    button: {
      neutral: "#F2F2F2",
      primary: scheme.accent["500"],
      secondary: "#D95D5D",
    },
    states: {
      danger: {
        normal: "#EA4853",
        pressed: "#B72B36",
      },
      warning: {
        normal: "#EBCA47",
        pressed: "#C9A735",
      },
      info: {
        normal: "#625FED",
        pressed: "#403DBB",
      },
      success: {
        normal: "#A8CF46",
        pressed: "#7FA62F",
      },
    },
  },
};

export default Theme;
