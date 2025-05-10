import api from '../src/services/api';
import {requestLogin} from '../src/services/requests/auth';
import {ILoginResponse} from '../src/dtos/login';

describe('requestLogin', () => {
  const validCredentials = {email: 'teste@example.com', senha: '123TA@a'};
  const invalidCredentials = {email: 'foo@bar.com', senha: 'wrong'};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns ILoginResponse for valid credentials without calling api.post', async () => {
    const postSpy = jest.spyOn(api, 'post');

    const result = await requestLogin(validCredentials);

    expect(result).toEqual<ILoginResponse>({
      email: validCredentials.email,
      senha: validCredentials.senha,
      token: '1234',
    });
    expect(postSpy).not.toHaveBeenCalled();
  });

  test('calls api.post and returns undefined for invalid credentials', async () => {
    const postSpy = jest
      .spyOn(api, 'post')
      .mockResolvedValue({data: {success: true}});

    const result = await requestLogin(invalidCredentials);

    expect(postSpy).toHaveBeenCalledWith('/auth', invalidCredentials);
    expect(result).toBeUndefined();
  });

  test('propagates errors from api.post', async () => {
    const error = new Error('Network Error');
    jest.spyOn(api, 'post').mockRejectedValue(error);

    await expect(requestLogin(invalidCredentials)).rejects.toThrow(
      'Network Error',
    );
  });
});
