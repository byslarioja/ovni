import { TextInput, View, Text } from "react-native";
import React from "react";
import useInputStyles from "./useInputStyles";
import { CustomTextInputProps } from "./types";
import { styles } from "./styles";
import { Controller, useFormContext } from "react-hook-form";

export function CustomTextInput({
  name,
  placeholder,
  label,
  keyboardType,
  lines = 1,
  isDisabled,
  rightIcon,
  isEditable,
  focus,
}: CustomTextInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    stylesInput,
    colorText,
    stylesInputSection,
    isFocused,
    handleFocus,
    handleBlur,
    stylesIconRight,
  } = useInputStyles(!!errors[name], isDisabled, rightIcon, lines);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={stylesInputSection}>
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder={isFocused ? "" : placeholder}
              placeholderTextColor={colorText}
              value={value}
              onChangeText={onChange}
              keyboardType={keyboardType}
              numberOfLines={lines}
              onFocus={handleFocus}
              onBlur={() => handleBlur(onBlur)}
              editable={isEditable}
              multiline={lines > 1}
              style={stylesInput}
              autoFocus={focus}
            />
          )}
        />
        {rightIcon && (
          <View style={stylesIconRight}>
            {rightIcon &&
              lines === 1 &&
              React.cloneElement(rightIcon as React.ReactElement, {
                color: colorText,
              })}
          </View>
        )}
      </View>
      {errors[name] && <Text>{errors[name].message as string}</Text>}
    </View>
  );
}
