import axios from 'axios';
import {Platform} from 'react-native';
import env from '../configs/env';

const api = axios.create({
  baseURL: env?.api,
});

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
    showLoading(true);
    return config;
  });

  api.interceptors.response.use(
    response => {
      if (!response.data[0].token) {
        showLoading(false);
        showError?.({
          message: 'login ou senha incorretos',
          visible: true,
        });

        return {} as any;
      }

      api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      showLoading(false);

      return response.data[0];
    },
    error => {
      showLoading(false);

      if (error.response) {
        showError?.({
          message: error.response.data.message || 'Erro na API',
          visible: true,
        });
      } else {
        console.log('Error', error);
        showError?.({
          message: 'Erro inesperado. Tente novamente.',
          visible: true,
        });
      }
      // else if (error.request) {
      //   showError?.({
      //     message: 'Erro de conexão. Verifique sua internet.',
      //     visible: true,
      //   });
      // }

      return Promise.reject(error);
    },
  );
};
