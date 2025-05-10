import React from 'react';
import {render} from '@testing-library/react-native';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {Backdrop} from '.';

// Mock do hook 'useError' que está no caminho relativo correto
jest.mock('../../hooks/appError', () => ({
  useError: jest.fn(),
}));

// Importação do hook mockado
import {useError} from '../../hooks/appError';

describe('Backdrop', () => {
  it('não deve renderizar quando loading for false', () => {
    // Mock para o estado loading ser false
    (useError as jest.Mock).mockReturnValue({loading: false});

    const {queryByTestId} = render(
      <GluestackUIProvider config={config}>
        <Backdrop />{' '}
      </GluestackUIProvider>,
    );
    // Verifica se o Backdrop não está presente na árvore de componentes
    expect(queryByTestId('backdrop')).toBeNull();
  });

  it('deve renderizar quando loading for true', () => {
    // Mock para o estado loading ser true
    (useError as jest.Mock).mockReturnValue({loading: true});

    const {getByTestId} = render(
      <GluestackUIProvider config={config}>
        <Backdrop />{' '}
      </GluestackUIProvider>,
    );
    // Verifica se o Backdrop foi renderizado
    expect(getByTestId('backdrop')).toBeTruthy();
  });
});
