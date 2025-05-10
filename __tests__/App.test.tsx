import React from 'react';
import {render} from '@testing-library/react-native';
import {Text} from 'react-native';

describe('App', () => {
  it('renderiza o texto corretamente', () => {
    const {getByText} = render(<Text>Bem-vindo</Text>);
    expect(getByText('Bem-vindo')).toBeTruthy();
  });
});
