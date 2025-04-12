import { Renderer } from 'engine/render/renderer';
import { assertDefined } from '../utils/assert';
import { ViewRescaler } from './view-rescaler';
import { IRendererType } from 'engine/render/types/irenderer';

export class View {
  private _canvas: HTMLCanvasElement;
  private _rescaler: ViewRescaler;

  private _renderer: Renderer | null = null;

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

  public setRenderer(type: IRendererType): void {}

  /**
   * Renders the current view using the provided renderer.
   */
  public render(): void {
    if (this._renderer) {
      this._renderer.render();
    }
  }

  /**
   * Destroys a given view.
   */
  public destroy(): void {
    this._rescaler.destroy();
  }

  private _createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    this._hostElement.appendChild(canvas);

    return canvas;
  }
}
