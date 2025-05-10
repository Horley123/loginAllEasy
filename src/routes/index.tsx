import React from 'react';
import {useAuth} from '../hooks/useAuth';
import AuthRoutes from './auth.routes';
import {AppRoutes} from './app.routes';

const Routes = () => {
  const {userData} = useAuth();

  return !userData.token ? <AuthRoutes /> : <AppRoutes />;
};

export default Routes;
