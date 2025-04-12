import { assertDefined } from '../utils';
import { ViewRescaler } from './view-rescaler';

export class View {
  private _canvas: HTMLCanvasElement;
  private _rescaler: ViewRescaler;

  constructor(private _hostElement: HTMLElement) {
    this._canvas = this._createCanvas();
    this._rescaler = new ViewRescaler(_hostElement, this._canvas, this.context);
  }

  /**
   * Returns the context for the view.
   */
  get context(): CanvasRenderingContext2D {
    const ctx = this._canvas.getContext('2d');
    return assertDefined(ctx);
  }

  public destroy(): void {
    this._rescaler.destroy();
  }

  private _createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    this._hostElement.appendChild(canvas);

    return canvas;
  }
}
