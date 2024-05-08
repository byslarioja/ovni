import { TextInput, View } from "react-native";
import React from "react";
import useInputStyles from "./useInputStyles";
import { CustomTextInputProps } from "./types";
import { styles } from "./styles";
import { Hint, Label } from "Components/Typography";
import Theme from "Shared/theme";

export function CustomTextInput({
  placeholder,
  label,
  keyboardType,
  rightIcon,
  isPassword,
  onBlur,
  onChangeText,
  value,
  error,
}: CustomTextInputProps) {
  const {
    stylesInput,
    colorText,
    stylesInputSection,
    isFocused,
    handleFocus,
    stylesIconRight,
  } = useInputStyles(rightIcon);

  const errorStyles = error
    ? {
        borderColor: Theme.color.states.danger.normal,
        backgroundColor: Theme.color.states.danger.normal,
      }
    : {};

  return (
    <View style={styles.container}>
      {label && <Label>{label}</Label>}
      <View style={stylesInputSection}>
        <TextInput
          placeholder={isFocused ? "" : placeholder}
          placeholderTextColor={error ? Theme.color.text.light : colorText}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          style={[stylesInput, errorStyles]}
          secureTextEntry={isPassword}
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={value}
        />
        {rightIcon && (
          <View style={stylesIconRight}>
            {rightIcon &&
              React.cloneElement(rightIcon as React.ReactElement, {
                color: error ? Theme.color.text.light : colorText,
              })}
          </View>
        )}
      </View>
      {error && (
        <Hint
          customStyle={{
            marginTop: 5,
            color: Theme.color.states.danger.normal,
          }}
        >
          {error}
        </Hint>
      )}
    </View>
  );
}
