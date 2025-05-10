// __tests__/Backdrop.test.tsx
import React from 'react';
import {render} from '@testing-library/react-native';

jest.mock('@gluestack-ui/themed', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    Box: ({children, testID, style}: any) => (
      <View testID={testID} style={style}>
        {children}
      </View>
    ),
  };
});

jest.mock('@/hooks/appError', () => ({
  useError: () => ({
    loading: false,
  }),
}));

import {Backdrop} from '@/components/Backdrop';

describe('Backdrop component', () => {
  it('não deve renderizar nada quando loading for false', () => {
    const {queryByTestId} = render(<Backdrop />);
    expect(queryByTestId('backdrop')).toBeNull();
  });

  it('deve renderizar a caixa de backdrop quando loading for true', () => {
    jest.resetModules();
    jest.doMock('@/hooks/appError', () => ({
      useError: () => ({loading: true}),
    }));
    const {Backdrop: ReloadedBackdrop} = require('@/components/Backdrop');

    const {getByTestId} = render(<ReloadedBackdrop />);
    expect(getByTestId('backdrop')).toBeTruthy();
  });
});
