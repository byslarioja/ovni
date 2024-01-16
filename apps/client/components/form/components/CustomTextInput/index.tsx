import { TextInput, View, Text } from "react-native";
import React from "react";
import useInputStyles from "./useInputStyles";
import { CustomTextInputProps } from "./types";
import { styles } from "./styles";

export function CustomTextInput({
  placeholder,
  label,
  keyboardType,
  rightIcon,
}: CustomTextInputProps) {
  const {
    stylesInput,
    colorText,
    stylesInputSection,
    isFocused,
    handleFocus,
    stylesIconRight,
  } = useInputStyles(rightIcon);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={stylesInputSection}>
        <TextInput
          placeholder={isFocused ? "" : placeholder}
          placeholderTextColor={colorText}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          style={stylesInput}
        />
        {rightIcon && (
          <View style={stylesIconRight}>
            {rightIcon &&
              React.cloneElement(rightIcon as React.ReactElement, {
                color: colorText,
              })}
          </View>
        )}
      </View>
    </View>
  );
}
