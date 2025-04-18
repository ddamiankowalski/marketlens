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
    { pipSize }: IPriceScaleMetadata = { pipSize: 0.00001 },
  ) {
    this._pipSize = pipSize;
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
   * Returns precision of pips
   */
  get pipPrecision(): number {
    const pipSize = this.pipSize;

    var e = 1,
      p = 0;
    while (Math.round(pipSize * e) / e !== pipSize) {
      e *= 10;
      p++;
    }
    return p;
  }

  /**
   * Number of pips represented as float number
   * that is currently visible on screen.
   */
  get pips(): number {
    return this.valueDiff / this.pipSize;
  }

  get rowStep(): number {
    const zoomFactor = Math.floor(Math.log2(75 / this.rowDist));
    return Math.max(Math.pow(2, zoomFactor), this.pipSize);
  }

  /**
   * The distance in px that represents the distance between
   * the given value on price axis and the first price that is
   * bigger than that price.
   */
  get rowDist(): number {
    return this._view.height / this.pips;
  }

  /**
   * Absolute min max price range that represents
   * the maximum value (top of the canvas) and minimum value
   * (bottom of the canvas)
   */
  get range(): IPriceRange {
    if (this._mode === PriceScaleMode.Fixed) {
      return this._sourceController.priceRange;
    }

    return assertDefined(this._freePanRange, 'Cannot return free pan range for FREE_VIEW');
  }

  /**
   * Represents local range.
   */
  get localRange(): IPriceRange {
    const { max, min } = this.range;
    const pipSize = this.pipSize;

    return {
      max: Math.floor(max / pipSize) * pipSize + pipSize,
      min: Math.ceil(min / pipSize) * pipSize,
    };
  }

  /**
   * Current grid step in value.
   */
  get valueStep(): number {
    return this.pipSize * this.rowStep;
  }

  /**
   * The first value that is rendered in grid.
   */
  get value0(): number {
    const { max } = this.localRange;
    const precision = this.pipPrecision;

    const rounded = parseFloat(max.toFixed(precision)) * Math.pow(10, precision);
    const rowStep = this.rowStep;

    return parseFloat((Math.floor(rounded / rowStep) * rowStep * Math.pow(10, -precision)).toFixed(precision));
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

  /**
   * Updates the row dist between two price points
   *
   * @param factor
   * @returns
   */
  public setRowDist(factor: number): void {
    this._setMode(PriceScaleMode.FreePan);

    if (!this._freePanRange) {
      return;
    }

    let { min, max } = this._freePanRange;
    factor *= (5 / 100) * this.valueDiff;

    this._freePanRange = { min: min - factor, max: max + factor };
  }

  /**
   * Sets price scale mode.
   *
   * @param mode
   */
  public setMode(mode: PriceScaleMode): void {
    this._setMode(mode);
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
