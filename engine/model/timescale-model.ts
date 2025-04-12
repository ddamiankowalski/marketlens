export class TimeScaleModel {
  private _colDist: number = 6;

  constructor() {
    setInterval(() => {
      this._colDist += 0.01;
    }, 10);
  }

  /**
   * Distance in pixels between two nearest
   * data points.
   */
  get colDist(): number {
    return this._colDist;
  }
}
