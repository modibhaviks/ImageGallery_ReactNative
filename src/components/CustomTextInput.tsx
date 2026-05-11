import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';

import Colors, { TextStyles } from '../theme/theme';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  style,
  onBlur,
  onFocus,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={[TextStyles.body, styles.label]}>{label}</Text>}

      <TextInput
        style={[styles.input, error ? styles.errorInput : null, style]}
        placeholderTextColor={TextStyles.inputPlaceholder.color}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
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
