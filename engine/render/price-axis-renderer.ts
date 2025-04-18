import { lerp } from 'engine/utils/math';
import { Renderer } from './renderer';

export class PriceAxisRenderer extends Renderer {
  public render(): void {
    super.clear();

    if (!this.priceScaleModel) {
      return;
    }

    const { range, value0, valueStep, pipPrecision } = this.priceScaleModel;
    const { min, max } = range;

    let y = 0;
    let value = value0;

    while (y < this.view.height) {
      y = lerp(value, min, this.view.height, max, 0);

      this.context.textBaseline = 'middle';
      this.context.beginPath();
      this.context.fillText(value.toFixed(pipPrecision), 0, y);
      this.context.stroke();

      value -= valueStep;
    }
  }
}
