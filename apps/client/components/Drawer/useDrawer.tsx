import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

export function useDrawer() {
  const sheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["40%"], []);

  const handleOpenOptions = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const handleCloseOptions = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return {
    sheetRef,
    snapPoints,
    handleOpenOptions,
    handleCloseOptions,
  };
}
