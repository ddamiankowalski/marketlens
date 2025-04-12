import { ViewFactory } from 'engine/view/view-factory';

export class Component {
  private _element: HTMLElement;
  private _viewFactory = new ViewFactory();

  constructor() {
    this._element = this._createElement();
  }

  public createView(): void {}

  public destroy(): void {
    this._element.remove();
  }

  private _createElement(): HTMLElement {
    const element = document.createElement('div');
    return element;
  }
}
