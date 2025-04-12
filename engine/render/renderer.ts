import { IModel } from 'engine/model/types/imodel';
import { View } from 'engine/view/view';

export abstract class Renderer {
  constructor(
    private _view: View,
    private _model?: IModel,
  ) {}

  get model(): IModel | null {
    return this._model || null;
  }

  get view(): View {
    return this._view;
  }

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
