import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { $appInjectable } from 'src/injectables';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
export const baseURL = 'https://api.palrey.com';
// export const baseURL = 'http://127.0.0.1:8000';

const $api = axios.create({
  baseURL: `${baseURL}`,
  timeout: 30000,
  timeoutErrorMessage: 'Error en la red',
  withCredentials: true,
});

export default boot(({ app }) => {
  /**
   * Api request Interceptor
   */
  $api.interceptors.request.use((_request) => {
    /* Append content type header if its not present */
    if (!(_request.headers as AxiosRequestHeaders)['Content-Type']) {
      (_request.headers as AxiosRequestHeaders)['Content-Type'] =
        'application/json';
    }

    /* Check if authorization is set */
    if (!(_request.headers as AxiosRequestHeaders)['Authorization']) {
      const token = $appInjectable.api_token;
      if (token && token.length > 0) {
        (_request.headers as AxiosRequestHeaders).Authorization =
          'Bearer ' + token;
      } else {
        (_request.headers as AxiosRequestHeaders).Authorization =
          'Bearer ApiToken';
      }
    }

    return _request;
  });

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = $api;
});

export { $api };
