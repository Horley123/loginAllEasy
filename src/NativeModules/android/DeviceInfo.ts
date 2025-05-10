import {NativeModules} from 'react-native';

const {DeviceInfo} = NativeModules;

export const getManufacturer = async (): Promise<string> => {
  if (!DeviceInfo || typeof DeviceInfo.getManufacturer !== 'function') {
    throw new Error(
      'DeviceInfo module not found or getManufacturer is not a function',
    );
  }
  return await DeviceInfo.getManufacturer();
};
