import { IPriceScaleMetadata } from './types/imodel';

export class PriceScaleModel {
  private _rowDist = 6;
  private _offset = 0;

  private _pipSize = 1;

  constructor({ pipSize }: IPriceScaleMetadata = { pipSize: 1 }) {
    this._pipSize = pipSize;
  }

  /**
   * The value representing the minimal possible price
   * change.
   */
  get pipSize(): number {
    return this._pipSize;
  }

  /**
   * The distance in px that represents the distance between
   * the given value on price axis and the first price that is
   * bigger than that price.
   */
  get rowDist(): number {
    return this._rowDist;
  }

  /**
   * Disance in value that represents the distance in value
   * between two closest rows.
   */
  get rowValueDist(): number {
    return this.pipSize / this.rowDist;
  }

  /**
   * Returns the offset in pixels that the user moved
   * either to top or bottom.
   */
  get offset(): number {
    return this._offset;
  }
}
