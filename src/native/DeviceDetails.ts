import { NativeModules } from 'react-native';

const { DeviceDetails } = NativeModules;

export interface DeviceInfo {
  name: string;
  model: string;
  systemName: string;
  systemVersion: string;
}

export const getDeviceInfo = async (): Promise<DeviceInfo> => {
  return await DeviceDetails.getDeviceInfo();
};
