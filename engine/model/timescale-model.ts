import { View } from 'engine/view/view';
import { ITimeRange } from './types/imodel';

export class TimeScaleModel {
  private _colDist: number = 100;
  private _offset: number = 0;

  constructor(private _view: View) {}

  /**
   * Distance in pixels between two nearest
   * data points.
   */
  get colDist(): number {
    return this._colDist;
  }

  /**
   * Offset in pixels
   */
  get offset(): number {
    return this._offset;
  }

  get viewWidth(): number {
    if (isNaN(this._view.width)) {
      return 0;
    }

    return this._view.width;
  }

  get rangeDiff(): number {
    const { max, min } = this.range;
    return Math.abs(max - min);
  }

  /**
   * Time axis range where max represents the right
   * bound column and min represents left bound
   * column.
   */
  get range(): ITimeRange {
    const max = this.offset / this.colDist;
    const min = this.viewWidth / this.colDist + max;

    return {
      min,
      max,
    };
  }

  /**
   * Time axis local range representing columns
   * where max and min values are integers
   */
  get localRange(): ITimeRange {
    const { min, max } = this.range;

    return {
      min: Math.ceil(min),
      max: Math.floor(max),
    };
  }

  public setOffset(factor: number): void {
    this._offset += factor;
  }

  public setColDist(factor: number): void {
    let resultDist = this._colDist - factor / 20;

    if (resultDist < 1) {
      resultDist = 1;
    } else if (resultDist > 100) {
      resultDist = 100;
    }

    const ratio = this._offset / this._colDist;

    this._colDist = resultDist;
    this._offset = ratio * resultDist;
  }
}
