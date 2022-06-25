import { InjectionKey, inject } from 'vue';
/**
 * @description Use Vue inject with types
 * @param key Injectable key
 * @param fallback Default value
 * @returns Provided value for that key
 */
export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback);
  if (!resolved) {
    throw new Error(`Could not resolve ${key.toString()}`);
  }
  return resolved;
}

export * from './app';
