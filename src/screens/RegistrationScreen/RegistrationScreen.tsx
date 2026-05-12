import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import ScreenContainer from '../../components/ScreenContainer';
import { TextStyles } from '../../theme/theme';
import { useRegistrationFormValidation } from '../../hooks/useRegistrationFormValidations';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.registrationScreen
>;

function RegistrationScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();

  const { values, errors, touched, setFieldValue, handleBlur, isValid } =
    useRegistrationFormValidation();

  function onRegister() {
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      }),
    );
    navigation.navigate(ScreenIdentifier.homeScreen as never);
  }

  return (
    <ScreenContainer>
      <Text style={[TextStyles.title, { paddingBottom: 30 }]}>
        Create your account!
      </Text>
      <CustomTextInput
        label="Name"
        placeholder="Enter name"
        keyboardType="default"
        autoCapitalize="words"
        value={values.name}
        onChangeText={text => setFieldValue('name', text)}
        onBlur={() => handleBlur('name')}
        error={touched.name ? errors.name : ''}
      />
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
        label="Phone Number"
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        maxLength={10}
        value={values.phone}
        onChangeText={text => {
          const onlyNumbers = text.replace(/[^0-9]/g, '');
          setFieldValue('phone', onlyNumbers);
        }}
        onBlur={() => handleBlur('phone')}
        error={touched.phone ? errors.phone : ''}
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
      <CustomButton title="Register" onPress={onRegister} disabled={!isValid} />
    </ScreenContainer>
  );
}

export default RegistrationScreen;
