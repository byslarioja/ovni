import { TextInput, View, Text } from "react-native";
import React from "react";
import useInputStyles from "./useInputStyles";
import { CustomTextInputProps } from "./types";
import { styles } from "./styles";
import { Controller } from "react-hook-form";

export function CustomTextInput({
  name,
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
    handleBlur,
    stylesIconRight,
  } = useInputStyles(rightIcon);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={stylesInputSection}>
        <Controller
          name={name}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder={isFocused ? "" : placeholder}
              placeholderTextColor={colorText}
              value={value}
              onChangeText={onChange}
              keyboardType={keyboardType}
              onFocus={handleFocus}
              onBlur={() => handleBlur(onBlur)}
              style={stylesInput}
            />
          )}
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
