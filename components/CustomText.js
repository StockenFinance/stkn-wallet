import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const CustomTextInput = ({placeholder, onChangeText, value}) => {
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
        placeholderTextColor={'grey'}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '85%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  // focusedContainer: {
  //   borderBottomColor: 'blue', // Change the border color when focused
  // },
  input: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 8,
    color: '#000000',
  },
});

export default CustomTextInput;
