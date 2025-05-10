import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: jest
    .fn()
    .mockImplementation(({children}) => children),
  PanGestureHandler: jest.fn().mockImplementation(({children}) => children),
  TapGestureHandler: jest.fn().mockImplementation(({children}) => children),
  State: {},
  Directions: {},
  FlingGestureHandler: jest.fn().mockImplementation(({children}) => children),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

jest.mock('@gluestack-ui/config', () => ({config: {}}));

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
}));
