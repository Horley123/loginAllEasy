import {ILogin, ILoginResponse} from '../../dtos/login';
import api from '../api';

export const requestLogin = async ({
  email,
  senha,
}: ILogin): Promise<ILoginResponse | undefined> => {
  if (email === 'teste@example.com' && senha === '123TA@a') {
    // await new Promise(resolve => setTimeout(resolve, 10000));
    return {
      email,
      senha,
      token: '1234',
    };
  }

  await api.post('/auth', {
    email,
    senha,
  });
};
