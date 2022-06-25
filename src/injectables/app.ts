import { InjectionKey, ref } from 'vue';
/**
 * @class AppInjectable
 */
class AppInjectable {
  private _leftDrawer = ref(false);
  private _title = ref('Rentas Palrey');
  /**
   * -----------------------------------------
   *	Getters & Setter
   * -----------------------------------------
   */
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
