// src/App.test.tsx
import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import App from './../src/App';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: jest.fn()}),
}));

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    GestureHandlerRootView: ({style, children}: any) =>
      React.createElement(View, {style}, children),
  };
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    SafeAreaProvider: ({children}: any) =>
      React.createElement(View, null, children),
    SafeAreaView: ({style, children}: any) =>
      React.createElement(View, {style}, children),
  };
});

jest.mock('@gluestack-ui/themed', () => ({
  GluestackUIProvider: ({children}: any) => children,
}));
jest.mock('@gluestack-ui/config', () => ({config: {}}));

jest.mock('./../src/hooks', () => {
  const React = require('react');
  return () =>
    ({children}: {children: React.ReactNode}) =>
      children;
});
jest.mock('./../src/routes', () => {
  const React = require('react');
  return () => React.createElement(React.Fragment, null);
});
jest.mock('./../src/components/Backdrop', () => {
  const React = require('react');
  return {Backdrop: () => React.createElement(React.Fragment, null)};
});
jest.mock('./../src/components/TooltipeError', () => {
  const React = require('react');
  return () => React.createElement(React.Fragment, null);
});

jest.mock('./../src/store/useThemeStore', () => () => ({theme: {}}));

describe('App', () => {
  it('deve renderizar sem crashar e bater snapshot', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('App', () => {
  it('renderiza o texto corretamente', () => {
    const {getByText} = render(<Text>Bem-vindo</Text>);
    expect(getByText('Bem-vindo')).toBeTruthy();
  });
});
