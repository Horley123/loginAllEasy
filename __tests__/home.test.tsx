import React from 'react';
import {render} from '@testing-library/react-native';
import {Home} from '@/pages/app/Home';
import {StyledProvider} from '@gluestack-style/react';

jest.mock('@/store/useThemeStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    theme: {
      tokens: {
        colors: {
          backgroundLight900: '#ffffff',
          white: '#000000',
        },
      },
    },
  })),
}));

describe('Home', () => {
  it('deve renderizar as mensagens corretamente', () => {
    const {getByText} = render(
      <StyledProvider config={{tokens: {colors: {}}}}>
        <Home />
      </StyledProvider>,
    );

    expect(getByText('Ola, seja bem vindo')).toBeTruthy();
  });
});
