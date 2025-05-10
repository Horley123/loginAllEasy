describe('getManufacturer util', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('resolves com o nome do fabricante quando DeviceInfo.getManufacturer está presente', async () => {
    const mockGet = jest.fn().mockResolvedValue('Samsung');
    jest.doMock('react-native', () => ({
      NativeModules: {DeviceInfo: {getManufacturer: mockGet}},
    }));
    const {
      getManufacturer,
    } = require('../src/NativeModules/android/DeviceInfo');
    await expect(getManufacturer()).resolves.toBe('Samsung');
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('rejects quando DeviceInfo não está definido', async () => {
    jest.doMock('react-native', () => ({
      NativeModules: {},
    }));
    const {
      getManufacturer,
    } = require('../src/NativeModules/android/DeviceInfo');
    await expect(getManufacturer()).rejects.toThrow(
      'DeviceInfo module not found or getManufacturer is not a function',
    );
  });

  it('rejects quando getManufacturer não é função', async () => {
    jest.doMock('react-native', () => ({
      NativeModules: {DeviceInfo: {getManufacturer: 123}},
    }));
    const {
      getManufacturer,
    } = require('../src/NativeModules/android/DeviceInfo');
    await expect(getManufacturer()).rejects.toThrow(
      'DeviceInfo module not found or getManufacturer is not a function',
    );
  });
});
