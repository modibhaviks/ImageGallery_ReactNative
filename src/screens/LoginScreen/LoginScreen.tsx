import React from 'react';
import { Text, View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

import ScreenContainer from '../../components/ScreenContainer';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

import { loginUser } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import { RootStackParamList } from '../../types';
import { TextStyles } from '../../theme/theme';
import { rtl } from '../../theme/rtlStyles';
import { setAppLanguage } from '../../i18n/setLanguage';
import { validators } from '../../utils/validation';

type FormValues = {
  email: string;
  password: string;
};

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.loginScreen
>;

function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const users = useSelector((state: RootState) => state.auth.users);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = (values: FormValues) => {
    if (!users?.length) {
      Alert.alert('Login Failed', 'No users found');
      return;
    }

    const user = users.find(
      u =>
        u.email.trim().toLowerCase() === values.email.trim().toLowerCase() &&
        u.password === values.password,
    );

    if (!user) {
      Alert.alert('Login Failed', 'Invalid email or password');
      return;
    }

    dispatch(loginUser(values));

    Alert.alert('Success', 'Login successful');
    navigation.navigate(ScreenIdentifier.homeScreen as never);
  };

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

      {/* EMAIL */}
      <Controller
        control={control}
        name="email"
        rules={{
          validate: validators.email,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label={t('email')}
            placeholder={t('emailPlaceholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      />

      {/* PASSWORD */}
      <Controller
        control={control}
        name="password"
        rules={{
          validate: validators.password,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label={t('password')}
            placeholder={t('passwordPlaceholder')}
            secureTextEntry
            isPassword
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />

      <CustomButton
        title={t('login')}
        onPress={handleSubmit(onLogin)}
        disabled={!isValid}
      />

      <CustomButton
        title={t('register')}
        onPress={() =>
          navigation.navigate(ScreenIdentifier.registrationScreen as never)
        }
      />

      <CustomButton
        title={t('deviceDetails')}
        variant="outlined"
        onPress={() =>
          navigation.navigate(ScreenIdentifier.deviceDetailsScreen as never)
        }
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
