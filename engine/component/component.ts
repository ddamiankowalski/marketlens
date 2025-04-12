import { ViewFactory } from 'engine/view/view-factory';
import { IComponentStyle } from './types/icomponent';

export class Component {
  private _element: HTMLElement;
  private _viewFactory = new ViewFactory();

  constructor(
    private _hostElement: HTMLElement,
    private _styles: IComponentStyle = {
      width: '100%',
      height: '100%',
    },
  ) {
    this._element = this._createElement();
  }

  /**
   * Creates a view inside the component.
   */
  public createView(): void {
    this._viewFactory.createView(this._element);
  }

  /**
   * Destroys the component.
   */
  public destroy(): void {
    this._viewFactory.destroy();
    this._element.remove();
  }

  private _createElement(): HTMLElement {
    const element = document.createElement('div');
    this._addStyles(element);

    this._hostElement.appendChild(element);

    return element;
  }

  private _addStyles(element: HTMLElement) {
    if (!this._styles) {
      return;
    }

    Object.entries(this._styles).forEach(([declaration, value]) => {
      if (declaration && value) {
        (element.style as any)[declaration] = value;
      }
    });
  }
}
