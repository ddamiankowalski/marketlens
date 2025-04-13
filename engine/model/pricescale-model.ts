import { SourceController } from 'engine/source/types/source-controller';
import { IPriceRange, IPriceScaleMetadata, PriceScaleMode } from './types/imodel';
import { View } from 'engine/view/view';
import { assertDefined } from 'engine/utils';

export class PriceScaleModel {
  private _rowDist = 1;
  private _offset = 0;

  private _mode: PriceScaleMode = PriceScaleMode.Fixed;
  private _freePanRange: IPriceRange | null = null;

  private _pipSize = 1;

  constructor(
    private _sourceController: SourceController,
    private _view: View,
    { pipSize }: IPriceScaleMetadata = { pipSize: 1 },
  ) {
    this._pipSize = pipSize;

    setTimeout(() => {
      this._setMode(PriceScaleMode.FreePan);

      setInterval(() => {
        this._rowDist += 0.01;
      }, 10);
    }, 3000);
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
   * Number of pips represented as float number
   * that is currently visible on screen.
   */
  get pips(): number {
    return this.valueDiff / this.pipSize;
  }

  /**
   * The distance in px that represents the distance between
   * the given value on price axis and the first price that is
   * bigger than that price.
   */
  get rowDist(): number {
    if (this._mode === PriceScaleMode.Fixed) {
      return this._view.height / this.pips;
    }

    return this._rowDist;
  }

  /**
   * Returns the offset in pixels that the user moved
   * either to top or bottom.
   */
  get offset(): number {
    return this._offset;
  }

  get range(): IPriceRange {
    if (this._mode === PriceScaleMode.Fixed) {
      return this._sourceController.priceRange;
    }

    return assertDefined(this._freePanRange, 'Cannot return free pan range for FREE_VIEW');
  }

  /**
   * Difference between the maximum and minimum values
   * inside the pricescale.
   */
  get valueDiff(): number {
    const { min, max } = this.range;
    return Math.abs(max - min);
  }

  /**
   * Indicates how much value is in one pixel
   */
  get pixelValue(): number {
    return this.valueDiff / this._view.height;
  }

  /**
   * Sets offset
   *
   * @param px
   */
  public setOffset(px: number): void {
    this._setMode(PriceScaleMode.FreePan);

    const offset = px * this.pixelValue;
    this._offset += offset;
  }

  /**
   * Sets price scale mode. Additionally it sets the free pan range
   * as the price range inside the source controller.
   *
   * @param mode
   */
  private _setMode(mode: PriceScaleMode): void {
    if (mode === PriceScaleMode.FreePan) {
      this._freePanRange = this._sourceController.priceRange;
      this._rowDist = this.rowDist;
    } else {
      this._freePanRange = null;
    }

    this._mode = mode;
  }
}
