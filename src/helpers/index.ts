import { ROUTE_NAME } from 'src/router';
import { $router } from 'src/boot/router';
import { LocationQueryRaw, RouteParamsRaw } from 'vue-router';
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

export * from './notification';
