import { ViewFactory } from 'engine/view/view-factory';
import { IComponentStyle } from './types/icomponent';
import { View } from 'engine/view/view';
import { ViewId } from 'engine/view/types/iview';
import { IModel } from 'engine/model/types/imodel';
import { TimeScaleModel } from 'engine/model/timescale-model';
import { PriceScaleModel } from 'engine/model/pricescale-model';

export class Component {
  protected _element: HTMLElement;
  protected _viewFactory = new ViewFactory();
  protected _model: IModel = { timeScaleModel: null, priceScaleModel: null };

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
   * Sets a reference to price scale model inside
   * a given component.
   *
   * @param model
   */
  public setPriceScaleModel(model: PriceScaleModel): void {
    this._model.priceScaleModel = model;
  }

  /**
   * Sets a reference to time scale model inside a
   * given component.
   *
   * @param model
   */
  public setTimeScaleModel(model: TimeScaleModel): void {
    this._model.timeScaleModel = model;
  }

  /**
   * Creates a view inside the component.
   */
  public createView(): void {
    this._viewFactory.createView(this._element, this._model);
  }

  /**
   * Retrieves the view by a given id.
   *
   * @param id
   * @returns
   */
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
