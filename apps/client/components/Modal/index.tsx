import Theme from "Shared/theme";
import { ReactNode } from "react";
import { Modal, Pressable, StyleProp, View, ViewStyle } from "react-native";

export function ModalInfo({
  children,
  isVisible,
  handleVisibility,
  customStyles,
}: {
  children: ReactNode;
  isVisible: boolean;
  handleVisibility: (a: boolean) => void;
  customStyles?: StyleProp<ViewStyle>;
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        handleVisibility(!isVisible);
      }}
    >
      <Pressable
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)", // This is the semi-transparent background
        }}
        onPressOut={() => handleVisibility(false)} // This will close the modal when the transparent background is pressed
      >
        <View
          style={[
            {
              backgroundColor: Theme.color.text.disabled,
              padding: 20,
              borderRadius: 10,
              width: "80%", // This will make the modal 80% of the screen width
              maxHeight: "90%", // This will make the modal 90% of the screen height
            },
            customStyles,
          ]}
          onStartShouldSetResponder={() => true} // This prevents the onPressOut event from triggering when pressing inside the modal
        >
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}
