import { ROUTE_NAME } from 'src/router';
import { $router } from 'src/boot/router';
import { LocationQueryRaw, RouteParamsRaw } from 'vue-router';
import { Platform } from 'quasar';
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
 * @param error
 */
export function handleAxiosError(error: unknown) {
  console.log(error);
}
/**
 * isMobile
 * @returns
 */
export const isMobile = Platform.is.mobile;
export * from './notification';
