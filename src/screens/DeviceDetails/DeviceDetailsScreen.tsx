import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getDeviceInfo, DeviceInfo } from '../../native/DeviceDetails';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import { useTranslation } from 'react-i18next';
import { rtl } from '../../theme/rtlStyles';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.deviceDetailsScreen
>;

const DeviceScreen = () => {
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const { t } = useTranslation();

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
        <Text style={styles.title}>{t('deviceDetails')}</Text>

        {device && (
          <>
            <Text style={styles.content}>
              {t('name')}: {device.name}
            </Text>
            <Text style={styles.content}>
              {t('model')}: {device.model}
            </Text>
            <Text style={styles.content}>
              {t('system')}: {device.systemName}
            </Text>
            <Text style={styles.content}>
              {t('version')}: {device.systemVersion}
            </Text>
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
    textAlign: rtl.textAlign,
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
    textAlign: rtl.textAlign,
  },
});
