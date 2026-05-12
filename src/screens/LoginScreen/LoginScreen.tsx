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

import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.loginScreen
>;

function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.auth.users);

  const { values, errors, touched, setFieldValue, handleBlur, isValid } =
    useLoginFormValidation();

  // Navigation functions
  function onRegister() {
    navigation.navigate(ScreenIdentifier.registrationScreen as never);
  }

  function onLogin() {
    const user = users.find(
      item =>
        item.email.trim().toLowerCase() === values.email.trim().toLowerCase() &&
        item.password === values.password,
    );

    if (!user) {
      Alert.alert('Login Failed', 'Invalid email or password');
      return;
    }

    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      }),
    );

    Alert.alert('Success', 'Login successful');

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
        isPassword={true}
        value={values.password}
        onChangeText={text => setFieldValue('password', text)}
        onBlur={() => handleBlur('password')}
        error={touched.password ? errors.password : ''}
      />
      <CustomButton title="Login" onPress={onLogin} disabled={!isValid} />
      <CustomButton title="Register" onPress={onRegister} />

      <CustomButton
        title="Device Details"
        variant="outlined"
        onPress={onDeviceDetails}
      />
    </ScreenContainer>
  );
}

export default LoginScreen;
