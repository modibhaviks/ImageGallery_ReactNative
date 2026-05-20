import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Colors, { TextStyles } from '../theme/theme';

type Props = PressableProps & {
  title: string;
  variant?: 'primary' | 'outlined';
  style?: StyleProp<ViewStyle>;
};

export default function CustomButton({
  title,
  onPress,
  disabled,
  variant = 'primary',
  style,
  ...props
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' && styles.primaryButton,
        variant === 'outlined' && styles.outlinedButton,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          TextStyles.buttonTitle,
          variant === 'outlined' && styles.outlinedText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  // Primary button (purple)
  primaryButton: {
    backgroundColor: Colors.buttonBackground.primary,
  },

  outlinedButton: {
    borderWidth: 1,
    borderColor: Colors.buttonBackground.primary,
  },

  outlinedText: {
    color: Colors.buttonBackground.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  buttonPressed: {
    opacity: 0.8,
  },
});
