import { PropsWithChildren } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Backdrop from "../../components/Drawer/Backdrop";
import { useDrawer } from "./useDrawer";
import { StyleSheet } from "react-native";
import Theme from "Shared/theme";

export function Drawer({
  children,
  onClose,
}: PropsWithChildren & { onClose: () => void }) {
  const { sheetRef, snapPoints } = useDrawer();
  return (
    <BottomSheet
      backgroundStyle={{
        backgroundColor: Theme.color.scheme.black[900],
      }}
      handleIndicatorStyle={{ backgroundColor: Theme.color.scheme.black[400] }}
      onClose={onClose}
      enablePanDownToClose
      ref={sheetRef}
      snapPoints={snapPoints}
      backdropComponent={Backdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
