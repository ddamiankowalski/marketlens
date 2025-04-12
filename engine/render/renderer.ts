import { PriceScaleModel } from 'engine/model/pricescale-model';
import { TimeScaleModel } from 'engine/model/timescale-model';
import { IModel } from 'engine/model/types/imodel';
import { View } from 'engine/view/view';

export abstract class Renderer {
  constructor(private _view: View) {}

  get model(): IModel | null {
    return this._view.model;
  }

  /**
   * Getter for the current time scale model.
   */
  get timeScaleModel(): TimeScaleModel | null {
    return this.model?.timeScaleModel || null;
  }

  /**
   * Getter for the current price scale model.
   */
  get priceScaleModel(): PriceScaleModel | null {
    return this.model?.priceScaleModel || null;
  }

  /**
   * A getter for the view that is being rendered.
   */
  get view(): View {
    return this._view;
  }

  /**
   * A getter for the canvas context
   */
  get context(): CanvasRenderingContext2D {
    return this._view.context;
  }

  public abstract render(): void;

  /**
   * Clears the view completely.
   */
  public clear(): void {
    this.context.clearRect(0, 0, this.view.width, this.view.height);
  }
}
