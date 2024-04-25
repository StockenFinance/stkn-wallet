import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { styles } from "./styles";

const CustomTextInput = ({ placeholder, onChangeText, value }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.inputContainer, isFocused && styles.focusedContainer]}>
      <TextInput
        placeholderTextColor={"grey"}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input, { multiline: true }]}
        multiline
        textAlign="center"
      />
    </View>
  );
};

export default CustomTextInput;
