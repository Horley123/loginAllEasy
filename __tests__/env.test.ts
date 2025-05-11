import currentEnv, {isProduction} from './../src/configs/env';

describe('Environment configuration', () => {
  it('should return the dev environment config when AMBIENTE is dev', () => {
    expect(currentEnv).toEqual(
      expect.objectContaining({
        name: 'dev',
        api: expect.stringContaining('http://localhost:3000/'),
      }),
    );
  });

  it('isProduction should return false when environment is not production', () => {
    expect(isProduction()).toBe(false);
  });
});
