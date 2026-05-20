import { Text, View } from 'react-native';
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
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { setAppLanguage } from '../../i18n/setLanguage';
import { rtl } from '../../theme/rtlStyles';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.loginScreen
>;

function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const users = useSelector((state: RootState) => state.auth.users);

  const { values, errors, touched, setFieldValue, handleBlur, isValid } =
    useLoginFormValidation();

  // Navigation functions
  function onRegister() {
    navigation.navigate(ScreenIdentifier.registrationScreen as never);
  }

  function onLogin() {
    if (!users || users.length === 0) {
      Alert.alert('Login Failed', 'No users found');
      return;
    }

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

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    setAppLanguage(newLang);
  };

  return (
    <ScreenContainer>
      <Text
        style={[
          TextStyles.title,
          { textAlign: rtl.textAlign, paddingBottom: 30 },
        ]}
      >
        {t('login')}
      </Text>
      <CustomTextInput
        label={t('email')}
        placeholder={t('emailPlaceholder')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={values.email}
        onChangeText={text => setFieldValue('email', text)}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : ''}
      />
      <CustomTextInput
        label={t('password')}
        placeholder={t('passwordPlaceholder')}
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
      <CustomButton title={t('login')} onPress={onLogin} disabled={!isValid} />
      <CustomButton title={t('register')} onPress={onRegister} />

      <CustomButton
        title={t('deviceDetails')}
        variant="outlined"
        onPress={onDeviceDetails}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <CustomButton
          style={{ flex: 1, alignItems: 'center' }}
          title={i18n.language === 'en' ? t('arabic') : t('english')}
          variant="outlined"
          onPress={toggleLanguage}
        />
      </View>
    </ScreenContainer>
  );
}

export default LoginScreen;
