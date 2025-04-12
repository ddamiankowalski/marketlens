import { View } from 'engine/view/view';

export abstract class Renderer {
  constructor(private _view: View) {}

  get view(): View {
    return this._view;
  }

  get context(): CanvasRenderingContext2D {
    return this._view.context;
  }

  /**
   * A generic render method that all renderers need
   * to implement
   */
  public render(): void {
    this.context.clearRect(0, 0, this.view.width, this.view.height);
  }
}
