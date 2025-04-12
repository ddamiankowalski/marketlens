import { assertDefined } from 'engine/utils';
import { ViewId } from './types/iview';
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

  private _componentViews = new Map<string, View>();

  private get _views(): View[] {
    return [...this._componentViews.values()];
  }

  /**
   * Creates a view and saves the referance of the view
   * inside the component registry as well as the global
   * registry.
   *
   * @param hostElement
   */
  public createView(hostElement: HTMLElement): void {
    const view = new View(hostElement);

    ViewFactory._allViews.add(view);
    this._componentViews.set('', view);
  }

  /**
   * Returns a view for a given component.
   *
   * @param id
   */
  public getView(id: ViewId): View {
    return assertDefined(this._componentViews.get(id), 'The view is destroyed or not-existing');
  }

  /**
   * Destroys all views inside a given factory, which
   * means inside a given component.
   */
  public destroy(): void {
    this._views.forEach((view) => {
      view.destroy();
      ViewFactory._allViews.delete(view);
    });
  }
}
