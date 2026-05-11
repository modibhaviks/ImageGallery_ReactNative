import { Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import { RootStackParamList } from '../../types';
import { TextStyles } from '../../theme/theme';
import { useLoginFormValidation } from '../../hooks/useLoginFormValidations';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.loginScreen
>;

function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const { values, errors, touched, setFieldValue, handleBlur, isValid } =
    useLoginFormValidation();

  // Navigation functions
  function onRegister() {
    navigation.navigate(ScreenIdentifier.registrationScreen as never);
  }

  function onLogin() {
    navigation.navigate(ScreenIdentifier.homeScreen as never);
  }

  function onDeviceDetails() {
    navigation.navigate(ScreenIdentifier.deviceDetailsScreen as never);
  }

  return (
    <ScreenContainer>
      <Text style={[TextStyles.title, { paddingBottom: 30 }]}>Login</Text>
      <CustomTextInput
        label="Email"
        placeholder="your@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={values.email}
        onChangeText={text => setFieldValue('email', text)}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : ''}
      />
      <CustomTextInput
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        value={values.password}
        onChangeText={text => setFieldValue('password', text)}
        onBlur={() => handleBlur('password')}
        error={touched.password ? errors.password : ''}
      />
      <CustomButton title="Login" onPress={onLogin} disabled={!isValid} />
      <CustomButton title="Register" onPress={onRegister} />

      <CustomButton title="Device Details" onPress={onDeviceDetails} />
    </ScreenContainer>
  );
}

export default LoginScreen;
