import { ActivityIndicator, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Theme from "Shared/theme";

export const DoneIcon = () => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke={Theme.color.states.success.pressed}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle
        cx="12"
        cy="12"
        r="10"
        fill={Theme.color.states.success.pressed}
      />
      <Path d="m9 12 2 2 4-4" stroke="#fff" strokeWidth="2" />
    </Svg>
  );
};

export const ErrorIcon = () => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke={Theme.color.states.danger.pressed}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx="12" cy="12" r="10" fill={Theme.color.states.danger.pressed} />
      <Path d="m15 9-6 6" stroke="#fff" strokeWidth="2" />
      <Path d="m9 9 6 6" stroke="#fff" strokeWidth="2" />
    </Svg>
  );
};

export const UploadingIcon = () => {
  return (
    <View
      style={{
        backgroundColor: Theme.color.states.info.normal,
        borderRadius: 200,
        height: 20,
        width: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.9,
      }}
    >
      <ActivityIndicator color="#fff" size={12} />
    </View>
  );
};

export const WaitingIcon = () => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke={Theme.color.states.warning.pressed}
      fill={Theme.color.states.warning.pressed}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle
        cx="12"
        cy="12"
        r="10"
        fill={Theme.color.states.warning.pressed}
      />
      <Path d="m16 12-4-4-4 4" stroke="#fff" strokeWidth="2" />
      <Path d="M12 16V8" stroke="#fff" strokeWidth="2" />
    </Svg>
  );
};
