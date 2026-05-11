import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Colors from '../theme/theme';

type Props = {
  children: React.ReactNode;
};

export default function ScreenContainer({ children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    //<SafeAreaView style={{ flex: 1 }}>
    <View style={[styles.container, { paddingTop: insets.top + 60 }]}>
      {children}
    </View>
    //</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.baseBackground,
  },
});
