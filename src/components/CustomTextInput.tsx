import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors, { TextStyles } from '../theme/theme';
import React, { useState } from 'react';
import { rtl } from '../theme/rtlStyles';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  style,
  onBlur,
  onFocus,
  isPassword = false,
  secureTextEntry,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[TextStyles.body, { textAlign: rtl.textAlign }, styles.label]}
        >
          {label}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error ? styles.errorInput : null, style]}
          textAlign={rtl.inputTextAlign}
          placeholderTextColor={TextStyles.inputPlaceholder.color}
          onBlur={onBlur}
          onFocus={onFocus}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color={TextStyles.body.color}
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text style={[styles.errorText, { textAlign: rtl.textAlign }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 10,
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});
