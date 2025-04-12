import { ViewFactory } from './view-factory';

export class ViewController {
  constructor() {
    this._runFrames();
  }

  private _runFrames(): void {
    let lastFrameTime: DOMHighResTimeStamp | null = null;

    /**
     * Given the current frame time the request animation frame loop decides
     * whether to render the next frame.
     */
    const _raf = (currentFrameTime: DOMHighResTimeStamp): void => {
      if (!lastFrameTime || currentFrameTime - lastFrameTime > 30) {
        lastFrameTime = currentFrameTime;

        const views = ViewFactory.allViews();
        views.forEach((view) => view.render());
      }

      requestAnimationFrame(_raf);
    };

    requestAnimationFrame(_raf);
  }
}
