import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getDeviceInfo, DeviceInfo } from '../../native/DeviceDetails';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.deviceDetailsScreen
>;

const DeviceScreen = () => {
  const [device, setDevice] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    loadDeviceInfo();
  }, []);

  const loadDeviceInfo = async () => {
    const info = await getDeviceInfo();
    setDevice(info);
  };

  return (
    <ScreenContainer>
      <View>
        <Text style={styles.title}>Device Details</Text>

        {device && (
          <>
            <Text style={styles.content}>Name: {device.name}</Text>
            <Text style={styles.content}>Model: {device.model}</Text>
            <Text style={styles.content}>System: {device.systemName}</Text>
            <Text style={styles.content}>Version: {device.systemVersion}</Text>
          </>
        )}
      </View>
    </ScreenContainer>
  );
};

export default DeviceScreen;

const styles = StyleSheet.create({
  content: {
    fontSize: 16,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
