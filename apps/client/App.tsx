import CameraView from "Screens/Camera";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <CameraView />
    </>
  );
}
