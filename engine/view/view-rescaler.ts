import { ViewController } from './view-controller';

export class ViewRescaler {
  private _observer: ResizeObserver;

  constructor(
    private _hostElement: HTMLElement,
    private _canvas: HTMLCanvasElement,
    private _context: CanvasRenderingContext2D,
  ) {
    this._observer = this._createObserver();
  }

  /**
   * Unobserves the observer when the view is destroyed.
   */
  public destroy(): void {
    this._observer.unobserve(this._hostElement);
  }

  /**
   * Creates resize observer instance.
   *
   * @returns resize observer instance
   */
  private _createObserver(): ResizeObserver {
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      const rect = this._hostElement.getBoundingClientRect();
      const canvas = this._canvas;
      const ctx = this._context;

      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;

      ctx.scale(devicePixelRatio, devicePixelRatio);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.style.position = 'absolute';
      canvas.style.top = '0px';
      canvas.style.left = '0px';

      ViewController.forceRender();
    });

    observer.observe(this._hostElement);
    return observer;
  }
}
