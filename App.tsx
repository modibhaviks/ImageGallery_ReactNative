import './src/i18n';
import { initLanguage } from './src/i18n/initLanguage';

import { I18nManager, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './src/types';
import { ScreenIdentifier, ScreenTitle } from './src/utils/navigationConstants';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './src/graphql/client/apolloClient';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { useSelector } from 'react-redux';
import { RootState } from './src/redux/store';

/// Import Screens
import RegistrationScreen from './src/screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ImageDetailScreen from './src/screens/ImageDetailScreen/ImageDetailScreen';
import DeviceScreen from './src/screens/DeviceDetails/DeviceDetailsScreen';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from './src/theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      await initLanguage();
      setAppReady(true);
    };

    bootstrap();
  }, []);

  if (!appReady) return null; // or splash screen

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppContent />
          </SafeAreaProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

function AppContent() {
  const { t } = useTranslation();
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          loggedInUser
            ? ScreenIdentifier.homeScreen
            : ScreenIdentifier.loginScreen
        }
        screenOptions={({ navigation }) => ({
          headerBackButtonDisplayMode: 'minimal',
          headerTransparent: true,
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <Ionicons
                name={I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
                size={24}
                color={Colors.backIconColor}
                onPress={() => navigation.goBack()}
                style={{ marginRight: 12 }}
              />
            ) : null,
        })}
      >
        <Stack.Screen
          name={ScreenIdentifier.loginScreen}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenIdentifier.registrationScreen}
          component={RegistrationScreen}
          options={{
            title: t('screenTitle.registration'),
          }}
        />
        <Stack.Screen
          name={ScreenIdentifier.homeScreen}
          component={HomeScreen}
          options={{
            title: t('screenTitle.home'),
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name={ScreenIdentifier.imageDetailScreen}
          component={ImageDetailScreen}
          options={{
            title: t('screenTitle.imageDetail'),
          }}
        />
        <Stack.Screen
          name={ScreenIdentifier.deviceDetailsScreen}
          component={DeviceScreen}
          options={{
            title: t('screenTitle.deviceDetails'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
