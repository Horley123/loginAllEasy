import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

// mocks de hooks
jest.mock('@/hooks/appError', () => ({useError: () => ({loading: false})}));
jest.mock('@/store/useThemeStore', () => ({
  __esModule: true,
  default: () => ({
    theme: {
      tokens: {
        colors: {red100: '#FFEEEE', coolGray100: '#F5F5F5', red500: '#FF0000'},
      },
    },
  }),
}));

// mocks de Gluestack UI
jest.mock('@gluestack-ui/themed', () => {
  const React = require('react');
  const {View, Text, TextInput} = require('react-native');
  return {
    Box: ({children}: {children: React.ReactNode}) =>
      React.createElement(View, null, children),
    Heading: ({children}: {children: React.ReactNode}) =>
      React.createElement(Text, null, children),
    Input: React.forwardRef((props: any, ref: any) =>
      React.createElement(TextInput, {...props, ref}),
    ),
    InputField: ({
      placeholder,
      value,
      onChangeText,
      testID,
    }: {
      placeholder: string;
      value: string;
      onChangeText: any;
      testID: string;
    }) =>
      React.createElement(TextInput, {
        placeholder,
        value,
        onChangeText,
        testID,
      }),
    InputSlot: ({
      children,
      onPress,
    }: {
      children: React.ReactNode;
      onPress: () => void;
    }) => React.createElement(View, {onTouchEnd: onPress}, children),
    Text: ({children, style}: {children: React.ReactNode; style: any}) =>
      React.createElement(Text, {style}, children),
    InputIcon: ({children}: {children: React.ReactNode}) =>
      React.createElement(View, null, children),
  };
});

// mock de FontAwesome para alternar ícone
jest.mock('react-native-vector-icons/FontAwesome', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return ({name, onPress}: {name: string; onPress?: () => void}) =>
    React.createElement(Text, {onPress, testID: `icon-${name}`}, name);
});

import InputComponent from '@/components/Input';

describe('Input component', () => {
  const mockOnText = jest.fn();

  beforeEach(() => {
    mockOnText.mockClear();
  });

  it('renderiza label quando fornecido', () => {
    const {getByText} = render(
      <InputComponent label="Meu Label" onText={mockOnText} placeholder="" />,
    );
    expect(getByText('Meu Label')).toBeTruthy();
  });

  it('chama onText ao digitar no campo', () => {
    const {getByPlaceholderText} = render(
      <InputComponent onText={mockOnText} placeholder="Digite aqui" />,
    );
    const input = getByPlaceholderText('Digite aqui');
    fireEvent.changeText(input, 'novo valor');
    expect(mockOnText).toHaveBeenCalledWith('novo valor');
  });

  it('exibe mensagem de erro quando prop error for fornecido', () => {
    const {getByText} = render(
      <InputComponent
        error="Erro encontrado"
        onText={mockOnText}
        placeholder=""
      />,
    );
    expect(getByText('Erro encontrado')).toBeTruthy();
  });

  it('alterna visibilidade da senha ao pressionar ícone eye', () => {
    const {getByTestId, queryByTestId} = render(
      <InputComponent
        secureTextEntry
        onText={mockOnText}
        placeholder="Senha"
      />,
    );

    const eye = getByTestId('icon-eye-slash');
    expect(eye).toBeTruthy();
    fireEvent.press(eye);

    const slash = getByTestId('icon-eye');
    expect(slash).toBeTruthy();
  });
});
