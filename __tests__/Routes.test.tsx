import React from 'react';
import {render} from '@testing-library/react-native';
import Routes from '../src/routes';
import * as useAuthHook from '../src/hooks/useAuth';
import {Text} from 'react-native'; // <--- ok aqui!
import {ILogin} from '@/dtos/login';

// Mocks dentro de escopo seguro:
const MockAuthRoutes = () => <Text>AuthRoutes</Text>;
const MockAppRoutes = () => <Text>AppRoutes</Text>;

jest.mock('./../src/routes/auth.routes', () => () => MockAuthRoutes());
jest.mock('./../src/routes/app.routes', () => ({
  AppRoutes: () => MockAppRoutes(),
}));

describe('Routes', () => {
  it('renders AuthRoutes if not authenticated', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      userData: {
        token: '',
        email: '',
        senha: 0,
      },
      signIn: function (login: ILogin): Promise<void> {
        throw new Error('Function not implemented.');
      },
      signOut: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    const {getByText} = render(<Routes />);
    expect(getByText('AuthRoutes')).toBeTruthy();
  });

  it('renders AppRoutes if authenticated', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      userData: {
        token: '123',
        email: '',
        senha: 0,
      },
      signIn: function (login: ILogin): Promise<void> {
        throw new Error('Function not implemented.');
      },
      signOut: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    const {getByText} = render(<Routes />);
    expect(getByText('AppRoutes')).toBeTruthy();
  });
});
