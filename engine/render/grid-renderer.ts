import { lerp } from 'engine/utils/math';
import { Renderer } from './renderer';

export class GridRenderer extends Renderer {
  public render(): void {
    super.clear();

    this._renderRows();
    this._renderColumns();
  }

  private _renderRows(): void {
    if (!this.priceScaleModel) {
      return;
    }

    const { range, value0, valueStep } = this.priceScaleModel;
    const { min, max } = range;

    let y = 0;
    let value = value0;

    while (y < this.view.height) {
      y = lerp(value, min, this.view.height, max, 0);

      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.view.width, y);
      this.context.stroke();

      value -= valueStep;
    }
  }

  private _renderColumns(): void {
    if (!this.timeScaleModel) {
      return;
    }

    const { localRange, range, viewWidth } = this.timeScaleModel;
    const { min, max } = range;
    let { max: value } = localRange;

    let x = 0;

    while (value < min) {
      x = lerp(value, max, viewWidth, min, 0);

      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.view.height);
      this.context.stroke();

      value += 1;
    }
  }
}
