import React from 'react';
import {AuthProvider} from './useAuth';
import {ErrorProvider} from './appError';

const AppProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthProvider>
      <ErrorProvider>{children}</ErrorProvider>
    </AuthProvider>
  );
};

export default AppProvider;
