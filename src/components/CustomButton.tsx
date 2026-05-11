import { Pressable, PressableProps, Text, StyleSheet } from 'react-native';
import Colors, { TextStyles } from '../theme/theme';

type Props = PressableProps & {
  title: string;
};

export default function CustomButton({
  title,
  onPress,
  disabled,
  ...props
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
      {...props}
    >
      <Text style={TextStyles.buttonTitle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.buttonBackground.primary,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  buttonPressed: {
    opacity: 0.8,
  },
});
