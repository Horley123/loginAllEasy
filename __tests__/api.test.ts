import MockAdapter from 'axios-mock-adapter';
import api, {setupApiInterceptors} from './../src/services/api';

describe('API Module', () => {
  let mock: MockAdapter;
  let showLoading: jest.Mock<any, any, any>;
  let showError: jest.Mock<any, any, any>;

  beforeEach(() => {
    mock = new MockAdapter(api);
    showLoading = jest.fn();
    showError = jest.fn();
    // @ts-ignore
    api.interceptors.request.handlers = [];
    // @ts-ignore
    api.interceptors.response.handlers = [];
    setupApiInterceptors(showError, showLoading);
  });

  afterEach(() => {
    mock.restore();
  });

  test('should call showLoading on request and response', async () => {
    mock.onGet('/test').reply(200, {});
    await api.get('/test');
    expect(showLoading).toHaveBeenCalledTimes(2);
    expect(showLoading.mock.calls[0][0]).toBe(true);
    expect(showLoading.mock.calls[1][0]).toBe(false);
  });

  test('should set Authorization header and hide loading on success', async () => {
    mock.onGet('/success').reply(200, {data: 123});
    await api.get('/success');
    expect(showLoading).toHaveBeenCalledTimes(2);
    expect(showLoading.mock.calls[1][0]).toBe(false);
    const auth = api.defaults.headers.common.Authorization;
    expect(auth).toMatch(/^Bearer [a-z0-9]+$/);
  });

  test('should handle API error response', async () => {
    const errorMessage = 'Fail';
    mock.onGet('/error').reply(400, {message: errorMessage});

    await expect(api.get('/error')).rejects.toThrow();

    expect(showLoading).toHaveBeenCalledTimes(2);
    expect(showLoading.mock.calls[1][0]).toBe(false);
    expect(showError).toHaveBeenCalledWith({
      message: errorMessage,
      visible: true,
    });
  });

  test('should handle config error', async () => {
    api.interceptors.request.use(() => {
      throw new Error('Config failed');
    });
    await expect(api.get('/any')).rejects.toThrow('Config failed');
  });
});
