import {ILogin, ILoginResponse} from '../../dtos/login';
import api from '../api';

export const requestLogin = async ({
  email,
  senha,
}: ILogin): Promise<ILoginResponse | undefined> => {
  return await api.get(`/users?email=${email}&senha=${senha}`);
};
