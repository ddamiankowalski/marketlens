import { View } from './view';

export class ViewFactory {
  private static _allViews = new Set<View>();

  /**
   * Returns all views.
   *
   * @returns
   */
  public static allViews(): View[] {
    return [...this._allViews.values()];
  }

  private _componentViews = new Set();

  public createView(hostElement: HTMLElement): void {
    const view = new View(hostElement);

    ViewFactory._allViews.add(view);
    this._componentViews.add(view);
  }
}
