const Theme = {
  color: {
    neutral: {
      background: "#202224",
      overlay: "rgba(0, 0, 0, 0.75)",
      border: "#B3B3B3",
    },
    text: {
      dark: "#323232",
      light: "#F2F2F2",
      placeholder: "rgba(32, 34, 36, 0.35)",
      disabled: "#CACACA",
    },
    button: {
      neutral: "#F2F2F2",
      primary: "#446CA1",
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
  spacing: {
    borderRadiusLow: 5,
    screenPadding: 20,
  },
  border: {
    width: 0.5,
  },
};

export default Theme;
