export interface ILogin {
  email: string;
  senha: string;
}

export interface ILoginResponse {
  email: string;
  senha: string;
  token: string;
}
