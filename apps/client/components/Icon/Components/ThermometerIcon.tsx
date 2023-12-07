import Svg, { Path } from "react-native-svg";
import { IconProps } from "../type";

export const ThermometerIcon = ({ size, color }: IconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ marginTop: 3 }}
    >
      <Path
        d="M16.25 0.5C14.1836 0.5 12.5 2.18359 12.5 4.25C12.5 6.31641 14.1836 8 16.25 8C18.3164 8 20 6.31641 20 4.25C20 2.18359 18.3164 0.5 16.25 0.5ZM16.25 5.5C15.5586 5.5 15 4.94141 15 4.25C15 3.55859 15.5586 3 16.25 3C16.9414 3 17.5 3.55859 17.5 4.25C17.5 4.94141 16.9414 5.5 16.25 5.5ZM10 4.875C10 2.45703 8.04297 0.5 5.625 0.5C3.20703 0.5 1.25 2.45703 1.25 4.875V11.3789C0.480469 12.3438 0 13.5469 0 14.875C0 17.9805 2.51953 20.5 5.625 20.5C8.73047 20.5 11.25 17.9805 11.25 14.875C11.25 13.5469 10.7695 12.3398 10 11.3789V4.875ZM5.625 18C3.90234 18 2.5 16.5977 2.5 14.875C2.5 13.8789 2.97656 12.9648 3.75 12.3828V4.875C3.75 3.83984 4.58984 3 5.625 3C6.66016 3 7.5 3.83984 7.5 4.875V12.3828C8.27344 12.9609 8.75 13.8789 8.75 14.875C8.75 16.5977 7.34766 18 5.625 18ZM6.25 13.1133V12.375C6.25 12.0312 5.96875 11.75 5.625 11.75C5.28125 11.75 5 12.0312 5 12.375V13.1133C4.27344 13.3711 3.75 14.0586 3.75 14.875C3.75 15.9102 4.58984 16.75 5.625 16.75C6.66016 16.75 7.5 15.9102 7.5 14.875C7.5 14.0586 6.97656 13.3711 6.25 13.1133Z"
        fill={color}
      />
    </Svg>
  );
};
