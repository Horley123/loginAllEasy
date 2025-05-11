import MockAdapter from 'axios-mock-adapter';
import api from '../src/services/api';
import {requestLogin} from '../src/services/requests/auth';

describe('requestLogin', () => {
  let mock: MockAdapter;
  const email = 'user@example.com';
  const senha = 'pass';
  const url = `/users?email=${email}&senha=${senha}`;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it('returns AxiosResponse with data array when API responds with array', async () => {
    const responseData = [{id: 1, name: 'Test', token: 'tok'}];
    mock.onGet(url).reply(200, responseData);

    const result = await requestLogin({email, senha});
    // Should return full AxiosResponse
    expect(result).toBeDefined();
    expect(result?.data).toEqual(responseData);
  });

  it('propagates error on HTTP failure', async () => {
    mock.onGet(url).reply(500);
    await expect(requestLogin({email, senha})).rejects.toThrow();
  });

  it('returns AxiosResponse with data object on non-array response', async () => {
    const nonArray = {unexpected: true};
    mock.onGet(url).reply(200, nonArray);

    const result = await requestLogin({email, senha});
    expect(result).toBeDefined();
    expect(result?.data).toEqual(nonArray);
  });
});
