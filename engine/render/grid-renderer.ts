import { lerp } from 'engine/utils/math';
import { Renderer } from './renderer';

export class GridRenderer extends Renderer {
  public render(): void {
    super.clear();

    if (!this.priceScaleModel) {
      return;
    }

    const { min, max } = this.priceScaleModel.range;
    let value = this.priceScaleModel.localRange.max;
    let y = lerp(value, min, this.view.height, max, 0);

    while (y < this.view.height) {
      y = lerp(value, min, this.view.height, max, 0);

      this.context.beginPath();
      this.context.fillText(value.toString(), 0, y);
      this.context.stroke();

      value = value - this.priceScaleModel.pipSize;
    }
  }
}
