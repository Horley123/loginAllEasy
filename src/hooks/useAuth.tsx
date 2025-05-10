import React from 'react';
import {requestLogin} from '../services/requests/auth';
import {ILogin} from '@/dtos/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContextData {
  signIn(login: ILogin): Promise<void>;
  signOut(): void;

  userData: IUserData;
}

export interface IUserData {
  email: string;
  senha: number;
  token: string;
}

export const AuthContext = React.createContext<IAuthContextData>(
  {} as IAuthContextData,
);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [data, setData] = React.useState<IUserData>({} as IUserData);
  const [userData, setUserData] = React.useState<IUserData>({} as IUserData);

  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('@User');
      if (user) {
        setUserData(JSON.parse(user));
      }
    })();
  }, [data]);

  const signIn = React.useCallback(
    async ({email, senha}: ILogin) => {
      const user: any = await requestLogin({email, senha});

      if (!user) {
        return;
      }
      console.log({user});
      await AsyncStorage.setItem('@User', JSON.stringify(user));
      setData(user);
    },
    [data],
  );

  const signOut = React.useCallback(async () => {
    await AsyncStorage.removeItem('@User');
    setUserData({} as IUserData);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        userData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
