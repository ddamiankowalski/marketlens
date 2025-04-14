import { ViewFactory } from './view-factory';

export class ViewController {
  constructor() {
    this._runFrames();
  }

  public static forceRender(): void {
    const views = ViewFactory.allViews();
    views.forEach((view) => view.render());
  }

  private _runFrames(): void {
    let lastFrameTime: DOMHighResTimeStamp | null = null;

    /**
     * Given the current frame time the request animation frame loop decides
     * whether to render the next frame.
     */
    const _raf = (currentFrameTime: DOMHighResTimeStamp): void => {
      if (!lastFrameTime || currentFrameTime - lastFrameTime > 1) {
        lastFrameTime = currentFrameTime;
        this._renderAll();
      }

      requestAnimationFrame(_raf);
    };

    requestAnimationFrame(_raf);
  }

  private _renderAll(): void {
    const views = ViewFactory.allViews();
    views.forEach((view) => view.render());
  }
}
