import { lerp } from 'engine/utils/math';
import { Renderer } from './renderer';

export class GridRenderer extends Renderer {
  public render(): void {
    super.clear();

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
      this.context.fillText(value.toString(), 0, y);
      this.context.stroke();

      value -= valueStep;
    }
  }
}
