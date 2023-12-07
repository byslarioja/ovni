import Svg, { Path } from "react-native-svg";
import { IconProps } from "../type";

export const LocationIcon = ({ size, color }: IconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ marginTop: 3 }}
    >
      <Path
        d="M7.22922 20.0965C1.55352 11.8684 0.5 11.0239 0.5 8C0.5 3.85785 3.85785 0.5 8 0.5C12.1421 0.5 15.5 3.85785 15.5 8C15.5 11.0239 14.4465 11.8684 8.77078 20.0965C8.39832 20.6345 7.60164 20.6345 7.22922 20.0965ZM8 11.125C9.7259 11.125 11.125 9.7259 11.125 8C11.125 6.2741 9.7259 4.875 8 4.875C6.2741 4.875 4.875 6.2741 4.875 8C4.875 9.7259 6.2741 11.125 8 11.125Z"
        fill={color}
      />
    </Svg>
  );
};
