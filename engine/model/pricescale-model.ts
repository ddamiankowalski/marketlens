import { SourceController } from 'engine/source/types/source-controller';
import { IPriceScaleMetadata, PriceScaleMode } from './types/imodel';

export class PriceScaleModel {
  private _rowDist = 1;
  private _offset = 0;
  private _mode: PriceScaleMode = PriceScaleMode.Fixed;

  private _pipSize = 1;

  constructor(
    private _sourceController: SourceController,
    { pipSize }: IPriceScaleMetadata = { pipSize: 1 },
  ) {
    this._pipSize = pipSize;

    setInterval(() => {
      this._rowDist += 0.01;
    }, 10);
  }

  /**
   * Returns the current price scale mode.
   */
  get mode(): PriceScaleMode {
    return this._mode;
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
    if (this._mode === PriceScaleMode.Fixed) {
      return 5;
    }

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

  /**
   * Returns current maximum value
   */
  get maxPrice(): number {
    if (this._mode === PriceScaleMode.Fixed) {
      return this._sourceController.maxPrice;
    }

    return 0;
  }

  get minPrice(): number {
    if (this._mode === PriceScaleMode.Fixed) {
      return this._sourceController.minPrice;
    }

    return 0;
  }
}
