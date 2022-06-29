import { ROUTE_NAME } from 'src/router';
import { $router } from 'src/boot/router';
import { LocationQueryRaw, RouteParamsRaw } from 'vue-router';
import { Platform } from 'quasar';
import { $appInjectable } from 'src/injectables';
import { AxiosError } from 'axios';
import { $notificationHelper } from './notification';
/**
 * Go To
 * @param name s
 */
export function goTo(
  name: ROUTE_NAME,
  extra?: {
    query: LocationQueryRaw;
    params: RouteParamsRaw;
  }
) {
  void $router.push({
    name,
    query: extra?.query,
    params: extra?.params,
  });
}
/**
 * Handle Axios Error
 * @param _error
 */
export function handleAxiosError(_error: unknown) {
  const error = _error as AxiosError;
  console.log({ error });
  if (error.response) {
    // Unauthorized
    if (error.response.status === 401) {
      $appInjectable.api_token = undefined;
      $appInjectable.save();
      return $router.push({ name: ROUTE_NAME.AUTH_LOGIN });
    }
  }
  $notificationHelper.error('Se ha producido un error');
}
/**
 * isAuth
 */
export const isAuth = () => ($appInjectable.api_token ? true : false);
/**
 * isMobile
 * @returns
 */
export const isMobile = Platform.is.mobile;

export * from './csrf';
export * from './notification';
