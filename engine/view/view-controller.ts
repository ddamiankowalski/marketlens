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
        requestAnimationFrame(_raf);

        console.log('teraz render');
      }
    };

    requestAnimationFrame(_raf);
  }
}
