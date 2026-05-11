import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './src/types';
import { ScreenIdentifier, ScreenTitle } from './src/utils/navigationConstants';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './src/graphql/client/apolloClient';

/// Import Screens
import RegistrationScreen from './src/screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ImageDetailScreen from './src/screens/ImageDetailScreen/ImageDetailScreen';
import DeviceScreen from './src/screens/DeviceDetails/DeviceDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreenIdentifier.loginScreen}
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerTransparent: true,
        }}
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
            title: ScreenTitle.registration,
          }}
        />
        <Stack.Screen
          name={ScreenIdentifier.homeScreen}
          component={HomeScreen}
          options={{
            title: ScreenTitle.home,
          }}
        />
        <Stack.Screen
          name={ScreenIdentifier.imageDetailScreen}
          component={ImageDetailScreen}
          options={{
            title: ScreenTitle.imageDetail,
          }}
        />
        <Stack.Screen
          name={ScreenIdentifier.deviceDetailsScreen}
          component={DeviceScreen}
          options={{
            title: ScreenTitle.deviceDetails,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
