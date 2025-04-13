import { SourceController } from 'engine/source/types/source-controller';
import { IPriceRange, IPriceScaleMetadata, PriceScaleMode } from './types/imodel';
import { View } from 'engine/view/view';
import { assertDefined } from 'engine/utils';

export class PriceScaleModel {
  private _mode: PriceScaleMode = PriceScaleMode.Fixed;
  private _freePanRange: IPriceRange | null = null;

  private _pipSize: number;

  constructor(
    private _sourceController: SourceController,
    private _view: View,
    { pipSize }: IPriceScaleMetadata = { pipSize: 1 },
  ) {
    this._pipSize = pipSize;

    setTimeout(() => {
      this._setMode(PriceScaleMode.FreePan);

      setInterval(() => {
        this.setOffset(1);
      }, 1);
    }, 1000);

    setTimeout(() => {
      setInterval(() => {
        this.setRowDist('negative');
      }, 1);
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
    console.log(this.range);

    return this._view.height / this.pips;
  }

  get range(): IPriceRange {
    if (this._mode === PriceScaleMode.Fixed) {
      return this._sourceController.priceRange;
    }

    return assertDefined(this._freePanRange, 'Cannot return free pan range for FREE_VIEW');
  }

  get localRange(): IPriceRange {
    const { max, min } = this.range;
    const pipSize = this.pipSize;

    return {
      max: Math.floor((max - 1) / pipSize) * pipSize + pipSize,
      min: Math.ceil((min + 1) / pipSize) * pipSize,
    };
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

    if (!this._freePanRange) {
      return;
    }

    const { min, max } = this._freePanRange;
    this._freePanRange = { min: min + offset, max: max + offset };
  }

  public setRowDist(type: 'positive' | 'negative'): void {
    this._setMode(PriceScaleMode.FreePan);

    if (!this._freePanRange) {
      return;
    }

    let { min, max } = this._freePanRange;
    const factor = this.pipSize * 0.01;

    if (type === 'negative') {
      const range = { min: min + factor, max: max - factor };

      if (range.min < range.max) {
        this._freePanRange = range;
      }
    } else {
      const range = { min: min - factor, max: max + factor };

      if (range.min < range.max) {
        this._freePanRange = { min: min - factor, max: max + factor };
      }
    }
  }

  /**
   * Sets price scale mode. Additionally it sets the free pan range
   * as the price range inside the source controller.
   *
   * @param mode
   */
  private _setMode(mode: PriceScaleMode): void {
    if (this._mode === mode) {
      return;
    }

    if (mode === PriceScaleMode.FreePan) {
      this._freePanRange = this._sourceController.priceRange;
    } else {
      this._freePanRange = null;
    }

    this._mode = mode;
  }
}
