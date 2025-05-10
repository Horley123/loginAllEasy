import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import AppProvider from './../src/hooks';
import {useAuth} from './../src/hooks/useAuth';
import {useError} from './../src/hooks/appError';
import {Text, Button} from 'react-native';

// Consumer to test Auth context
const AuthConsumer: React.FC = () => {
  const {user} = useAuth();
  return <Text testID="auth-value">{user ? user.name : 'no-user'}</Text>;
};

// Consumer to test Error context
const ErrorConsumer: React.FC = () => {
  // Ajustando para usar array se useError retornar tuple
  const errorContext = useError();
  const error = Array.isArray(errorContext)
    ? errorContext[0]
    : errorContext.error;
  const setError = Array.isArray(errorContext)
    ? errorContext[1]
    : errorContext.setError;

  return (
    <>
      <Text testID="error-value">{error || 'no-error'}</Text>
      <Button title="Trigger Error" onPress={() => setError('test-error')} />
    </>
  );
};

describe('AppProvider (React Native)', () => {
  it('renders children with default context values', () => {
    const {getByTestId} = render(
      <AppProvider>
        <AuthConsumer />
        <ErrorConsumer />
      </AppProvider>,
    );

    expect(getByTestId('auth-value')).toHaveTextContent('no-user');
    expect(getByTestId('error-value')).toHaveTextContent('no-error');
  });
});
