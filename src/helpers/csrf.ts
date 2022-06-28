import { $api } from 'src/boot/axios';
/**
 * getCookie
 * @param name
 * @returns
 */
function getCookie(name: string): string | null {
  const nameLenPlus = name.length + 1;
  if (document.cookie) {
    document.cookie
      .split(';')
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }
  return null;
}
/**
 * csrfToken
 * @returns AxiosPromise
 */
export async function csrfToken() {
  if (!getCookie('XSRF-TOKEN')) return $api.get<void>('/sanctum/csrf-cookie');
}
