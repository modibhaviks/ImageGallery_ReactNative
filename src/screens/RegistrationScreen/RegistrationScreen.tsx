import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import ScreenContainer from '../../components/ScreenContainer';
import { TextStyles } from '../../theme/theme';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { rtl } from '../../theme/rtlStyles';
import { useForm, Controller } from 'react-hook-form';
import { validators } from '../../utils/validation';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.registrationScreen
>;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

function RegistrationScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const onRegister = (values: FormValues) => {
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      }),
    );
    navigation.navigate(ScreenIdentifier.homeScreen as never);
  };

  return (
    <ScreenContainer>
      <Text
        style={[
          TextStyles.title,
          { textAlign: rtl.textAlign, paddingBottom: 30 },
        ]}
      >
        {t('createYourAccount')}
      </Text>

      <Controller
        control={control}
        name="name"
        rules={{
          validate: validators.name,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label={t('name')}
            placeholder={t('namePlaceholder')}
            keyboardType="default"
            autoCapitalize="words"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
          />
        )}
      />

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

      <Controller
        control={control}
        name="phone"
        rules={{
          validate: validators.phone,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label={t('phone')}
            placeholder={t('phonePlaceholder')}
            keyboardType="phone-pad"
            maxLength={10}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.phone?.message}
          />
        )}
      />

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
            keyboardType="default"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            isPassword={true}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />

      <CustomButton
        title={t('register')}
        onPress={handleSubmit(onRegister)}
        disabled={!isValid}
      />
    </ScreenContainer>
  );
}

export default RegistrationScreen;
