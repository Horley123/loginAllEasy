interface IEnv {
  name: 'dev' | 'test' | 'production';
  api: string;
}
// const AMBIENTE = 'dev';
const AMBIENTE = 'dev';

const envs: IEnv[] = [
  {
    name: 'dev',
    api: `http://${'192.168.1.7'}:3333`,
  },
  {
    name: 'test',
    api: '',
  },
  {
    name: 'production',
    api: '',
  },
];

const currentEnv = envs.find(env => env.name === AMBIENTE);
export const isProduction = (): boolean => {
  return !!currentEnv && currentEnv.name === 'production';
};

export default currentEnv;
