export class TimeScaleModel {
  private _colDist: number = 6;

  /**
   * Distance in pixels between two nearest
   * data points.
   */
  get colDist(): number {
    return this._colDist;
  }
}
