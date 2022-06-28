import { LocalStorage } from 'quasar';
import { InjectionKey, ref } from 'vue';

const STORAGE_KEY = 'STORAGE/AppInjectable';
interface IStorage {
  api_token: string | undefined;
}
/**
 * @class AppInjectable
 */
class AppInjectable {
  private _api_token = ref<string>();
  private _leftDrawer = ref(false);
  private _title = ref('Rentas Palrey');
  /**
   * -----------------------------------------
   *	Getters & Setter
   * -----------------------------------------
   */
  get api_token() {
    return this._api_token.value;
  }
  set api_token(a: string | undefined) {
    this._api_token.value = a;
  }
  get leftDrawer() {
    return this._leftDrawer.value;
  }
  set leftDrawer(p: boolean) {
    this._leftDrawer.value = p;
  }
  get title() {
    return this._title.value;
  }
  set title(p: string) {
    this._title.value = p;
  }
  /**
   * -----------------------------------------
   *	Methods
   * -----------------------------------------
   */
  load() {
    const value = LocalStorage.getItem<IStorage>(STORAGE_KEY);
    this.api_token = value?.api_token;
  }
  /**
   * save
   */
  save() {
    const value: IStorage = {
      api_token: this.api_token,
    };
    LocalStorage.set(STORAGE_KEY, value);
  }
  /**
   * Toggle Left Drawer
   */
  toggleLeftDrawer() {
    this.leftDrawer = !this.leftDrawer;
  }
}

export const $appInjectable = new AppInjectable();
export const _appInjectable: InjectionKey<AppInjectable> =
  Symbol('AppInjectable');
