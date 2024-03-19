import Svg, { Path } from "react-native-svg";

export const VideoCameraIcon = ({ size, color }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 217 147" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.6902 0.371338C12.3308 0.371338 0.690186 12.0119 0.690186 26.3713V120.416C0.690186 134.775 12.3308 146.416 26.6902 146.416H143.919C154.819 146.416 164.153 139.708 168.017 130.195V135.114H168.017V130.195C169.244 127.176 169.919 123.875 169.919 120.416V109.269L216.37 135.114H216.416V11.6731H216.416L169.919 37.5442V26.3713C169.919 22.9408 169.255 19.6655 168.047 16.667V11.6731H168.017V16.5922C164.153 7.07919 154.819 0.371338 143.919 0.371338H26.6902ZM139.654 36.5759C144.934 36.5759 149.215 32.2952 149.215 27.0146C149.215 21.7341 144.934 17.4534 139.654 17.4534C134.373 17.4534 130.093 21.7341 130.093 27.0146C130.093 32.2952 134.373 36.5759 139.654 36.5759ZM25.7903 110.704C25.7903 107.64 28.2737 105.157 31.3371 105.157H138.701C141.764 105.157 144.248 107.64 144.248 110.704C144.248 113.767 141.764 116.251 138.701 116.251H31.3371C28.2737 116.251 25.7903 113.767 25.7903 110.704Z"
        fill={color}
      />
    </Svg>
  );
};
