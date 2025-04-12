export class PriceScaleModel {
  private _rowDist = 6;

  constructor() {
    setInterval(() => {
      this._rowDist += 0.01;
    }, 10);
  }

  /**
   * The distance in px that represents the distance between
   * the given value on price axis and the first price that is
   * bigger than that price.
   */
  get rowDist(): number {
    return this._rowDist;
  }
}
