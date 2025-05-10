import axios from 'axios';
import {Platform} from 'react-native';
import env from '../configs/env';

const api = axios.create({
  baseURL: env?.api,
});

// Parametros padrões
api.defaults.headers.common.platform = Platform.OS;
api.defaults.headers.common.remoteId = 'unkown';
api.defaults.maxBodyLength = 10000000;
api.defaults.maxContentLength = 10000000;

export default api;

export const setupApiInterceptors = (
  showError: (props: {message: string; visible: boolean}) => void,
  showLoading: (visible: boolean) => void,
) => {
  api.interceptors.request.use(config => {
    console.log('aqui,', {config});
    showLoading(true); // Exibe o loading antes da requisição
    return config;
  });

  api.interceptors.response.use(
    response => {
      const randomToken = Math.random().toString(36).substring(2);
      api.defaults.headers.common.Authorization = `Bearer ${randomToken}`;
      showLoading(false);
      return response;
    },
    error => {
      showLoading(false);

      if (error.response) {
        console.error(
          'Erro na resposta da API:',
          error.response.status,
          error.response.data,
        );
        showError?.({
          message: error.response.data.message || 'Erro na API',
          visible: true,
        });
      } else if (error.request) {
        // Nenhuma resposta recebida da API
        console.error('Nenhuma resposta recebida da API:', error.request);
        showError?.({
          message: 'Erro de conexão. Verifique sua internet.',
          visible: true,
        });
      } else {
        // Erro ao configurar a requisição
        console.error('Erro ao configurar a requisição:', error.message);
        showError?.({
          message: 'Erro inesperado. Tente novamente.',
          visible: true,
        });
      }

      return Promise.reject(error);
    },
  );
};
