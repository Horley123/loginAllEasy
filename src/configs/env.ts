interface IEnv {
  name: 'dev' | 'test' | 'production';
  api: string;
}

const AMBIENTE = 'dev';

const envs: IEnv[] = [
  {
    name: 'dev',
    api: `http://localhost:3000/`,
  },
  {
    name: 'test',
    api: `http://localhost:3333`,
  },
  {
    name: 'production',
    api: `http://localhost:3333`,
  },
];

const currentEnv = envs.find(env => env.name === AMBIENTE);
export const isProduction = (): boolean => {
  return !!currentEnv && currentEnv.name === 'production';
};

export default currentEnv;
