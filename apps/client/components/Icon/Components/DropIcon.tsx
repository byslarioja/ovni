import Svg, { Path } from "react-native-svg";
import { IconProps } from "../type";

export const DropIcon = ({ size, color }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.35625 0.848441C6.31224 0.797048 6.25763 0.755791 6.19617 0.727504C6.13471 0.699217 6.06785 0.68457 6.0002 0.68457C5.93254 0.68457 5.86568 0.699217 5.80422 0.727504C5.74276 0.755791 5.68815 0.797048 5.64414 0.848441C4.40742 2.29493 0.375 7.29571 0.375 11C0.375 14.452 2.54844 16.625 6 16.625C9.45156 16.625 11.625 14.452 11.625 11C11.625 7.29571 7.59258 2.29493 6.35625 0.848441ZM6.625 14.5938C6.54992 14.5939 6.4759 14.576 6.40917 14.5416C6.34244 14.5072 6.28495 14.4573 6.24154 14.3961C6.19812 14.3348 6.17006 14.264 6.1597 14.1897C6.14935 14.1153 6.15701 14.0395 6.18203 13.9688C6.214 13.8764 6.27428 13.7965 6.3543 13.7404C6.43433 13.6843 6.53001 13.6548 6.62773 13.6563C7.2482 13.6549 7.84287 13.4078 8.2816 12.9691C8.72034 12.5304 8.96741 11.9357 8.96875 11.3152C8.96732 11.2175 8.99676 11.1218 9.05286 11.0418C9.10897 10.9618 9.18889 10.9015 9.28125 10.8695C9.35203 10.8445 9.42779 10.8369 9.50215 10.8472C9.57651 10.8576 9.6473 10.8856 9.70855 10.929C9.76981 10.9725 9.81974 11.0299 9.85414 11.0967C9.88854 11.1634 9.90641 11.2374 9.90625 11.3125C9.90532 12.1825 9.55932 13.0165 8.94417 13.6317C8.32901 14.2468 7.49496 14.5928 6.625 14.5938Z"
        fill={color}
      />
    </Svg>
  );
};
