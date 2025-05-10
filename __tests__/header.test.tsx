import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

const mockSignOut = jest.fn();
const mockToggleTheme = jest.fn();

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({signOut: mockSignOut}),
}));

jest.mock('@/store/useThemeStore', () => ({
  __esModule: true,
  default: () => ({
    theme: {tokens: {colors: {blue100: '#0000FF', white: '#FFFFFF'}}},
    toggleTheme: mockToggleTheme,
    isDarkMode: false,
  }),
}));

jest.mock('react-native-theme-switch-animation', () => ({
  __esModule: true,
  default: jest.fn(({switchThemeFunction}) => switchThemeFunction()),
}));

jest.mock('@gluestack-ui/themed', () => {
  const React = require('react');
  const {View, Text} = require('react-native');
  return {
    Box: ({
      children,
      testID,
      style,
    }: {
      children: React.ReactNode;
      testID?: string;
      style?: any;
    }) => (
      <View testID={testID} style={style}>
        {children}
      </View>
    ),
    Text: ({
      children,
      onPress,
      testID,
    }: {
      children: React.ReactNode;
      onPress?: () => void;
      testID?: string;
    }) => (
      <Text testID={testID} onPress={onPress}>
        {children}
      </Text>
    ),
    Icon: () => null,
  };
});

// mock FontAwesome to expose icon press
jest.mock('react-native-vector-icons/FontAwesome', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return ({
    name,
    onPress,
    testID,
  }: {
    name: string;
    onPress?: () => void;
    testID?: string;
  }) => (
    <Text testID={testID || `icon-${name}`} onPress={onPress}>
      {name}
    </Text>
  );
});

import {Header} from '@/components/Header';

describe('Header component', () => {
  it('deve exibir o título corretamente', () => {
    const {getByText} = render(<Header title="Meu Título" />);
    expect(getByText('Meu Título')).toBeTruthy();
  });

  it('deve chamar signOut ao pressionar o texto Sair', () => {
    const {getByText} = render(<Header title="Título" />);
    const sair = getByText('Sair');
    fireEvent.press(sair);
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it('deve alternar o tema ao pressionar o ícone', () => {
    const {getByTestId} = render(<Header title="Título" />);
    const icon = getByTestId('icon-sun-o');
    fireEvent.press(icon);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
