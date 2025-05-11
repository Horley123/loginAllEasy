import MockAdapter from 'axios-mock-adapter';
import api, {setupApiInterceptors} from '../src/services/api';

describe('API Interceptors (minimal)', () => {
  let mock: MockAdapter;
  const showLoading = jest.fn();
  const showError = jest.fn();

  beforeEach(() => {
    mock = new MockAdapter(api);
    // reset interceptors
    // @ts-ignore
    api.interceptors.request.handlers = [];
    // @ts-ignore
    api.interceptors.response.handlers = [];
    setupApiInterceptors(showError, showLoading);
  });

  afterEach(() => {
    mock.restore();
    jest.clearAllMocks();
  });

  it('toggles loading on request and response', async () => {
    mock.onGet('/login').reply(200, [{token: 'any'}]);

    await api.get('/login');

    expect(showLoading).toHaveBeenCalledTimes(2);
    expect(showLoading).toHaveBeenNthCalledWith(1, true);
    expect(showLoading).toHaveBeenNthCalledWith(2, false);
  });

  it('returns first item on successful response', async () => {
    const data = [{token: 't'}];
    mock.onGet('/login').reply(200, data);

    const result = await api.get('/login');
    expect(result).toEqual(data[0]);
  });

  it('shows error on invalid data structure', async () => {
    mock.onGet('/login').reply(200, [{}]);

    const result = await api.get('/login');
    expect(showError).toHaveBeenCalledWith({
      message: 'login ou senha incorretos',
      visible: true,
    });
    expect(result).toEqual({});
  });

  it('shows API error message on HTTP error', async () => {
    mock.onGet('/login').reply(400, {message: 'Err'});

    await expect(api.get('/login')).rejects.toThrow();
    expect(showError).toHaveBeenCalledWith({message: 'Err', visible: true});
  });

  it('shows unexpected error on network failure', async () => {
    mock.onGet('/login').networkError();

    await expect(api.get('/login')).rejects.toThrow();
    expect(showError).toHaveBeenCalledWith({
      message: 'Erro inesperado. Tente novamente.',
      visible: true,
    });
  });
});
