import React from 'react';
import {render} from '@testing-library/react-native';
import {StyledProvider} from '@gluestack-style/react';
import {Login} from '../src/pages/auth/Login/index';


jest.mock('@/store/useThemeStore', () => jest.fn(() => ({
  theme: {
    tokens: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        blue100: '#0000FF',
      },
    },
  },
  toggleTheme: jest.fn(),
})));


jest.mock('./../src/assets/logo.svg', () => 'MockedLogo');

describe('Login', () => {
  it('deve renderizar o componente corretamente', () => {
    const {getByText} = render(
      <StyledProvider config={{tokens: {colors: {}}}}>
        <Login />
      </StyledProvider>
    );

    expect(getByText('Login')).toBeTruthy();
  });
});

