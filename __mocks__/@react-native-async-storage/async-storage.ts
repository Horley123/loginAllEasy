const mockAsyncStorage = (() => {
  let store: Record<string, string> = {};

  return {
    setItem: jest.fn((key, value) => {
      store[key] = value;
      return Promise.resolve();
    }),
    getItem: jest.fn(key => {
      return Promise.resolve(store[key] || null);
    }),
    removeItem: jest.fn(key => {
      delete store[key];
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      store = {};
      return Promise.resolve();
    }),
  };
})();

export default mockAsyncStorage;
