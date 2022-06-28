import { ROUTE_NAME } from './routes/name';
import { NavigationGuard } from 'vue-router';
import { isAuth } from 'src/helpers';
/**
 * authGuard
 * @param _to
 * @param _from
 * @param _next
 */
export const authGuard: NavigationGuard = (to, from, next) => {
  if (!isAuth()) {
    next({ name: ROUTE_NAME.AUTH_LOGIN });
  } else {
    next();
  }
};
