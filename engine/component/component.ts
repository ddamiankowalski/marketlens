import { ViewFactory } from 'engine/view/view-factory';
import { IComponentStyle } from './types/icomponent';
import { View } from 'engine/view/view';
import { ViewId } from 'engine/view/types/iview';

export class Component {
  private _element: HTMLElement;
  private _viewFactory = new ViewFactory();

  constructor(
    private _hostElement: HTMLElement,
    private _style: IComponentStyle = {
      width: '100%',
      height: '100%',
    },
  ) {
    this._element = this._createElement();
  }

  /**
   * Component html element.
   */
  get element(): HTMLElement {
    return this._element;
  }

  /**
   * Creates a view inside the component.
   */
  public createView(): void {
    this._viewFactory.createView(this._element);
  }

  public getView(id: ViewId): View {
    return this._viewFactory.getView(id);
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
    if (!this._style) {
      return;
    }

    Object.entries(this._style).forEach(([declaration, value]) => {
      if (declaration && value) {
        (element.style as any)[declaration] = value;
      }
    });
  }
}
