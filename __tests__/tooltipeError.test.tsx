import React from 'react';
import {render} from '@testing-library/react-native';
import TooltipeError from '../src/components/TooltipeError/index';

jest.mock('@/hooks/appError', () => ({
  useError: jest.fn(() => ({
    tooltipeError: {visible: true, message: 'Erro de teste'},
    hideTooltipeError: jest.fn(),
  })),
}));

jest.mock('@gluestack-ui/themed', () => {
  const mockShow = jest.fn();
  return {
    useToast: jest.fn(() => ({
      show: mockShow,
    })),
    Toast: jest.fn(() => null),
    ToastDescription: jest.fn(() => null),
  };
});

describe('TooltipeError Component', () => {
  it('deve chamar toast.show quando tooltipeError.visible for true', () => {
    const {useToast} = require('@gluestack-ui/themed');
    const mockShow = useToast().show;

    render(<TooltipeError />);

    expect(mockShow).toHaveBeenCalled();
    expect(mockShow).toHaveBeenCalledWith(
      expect.objectContaining({
        render: expect.any(Function),
      }),
    );
  });
});
