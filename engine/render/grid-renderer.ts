import { Renderer } from './renderer';

export class GridRenderer extends Renderer {
  public render(): void {
    super.clear();

    if (!this.priceScaleModel) {
      return;
    }

    let currentYCoord = 0;
    let value = this.priceScaleModel.range.max.toString();

    while (currentYCoord < this.view.height) {
      this.context.beginPath();
      this.context.fillText(value, 0, currentYCoord);
      this.context.stroke();

      currentYCoord += this.priceScaleModel.rowDist;
      value = (+value - this.priceScaleModel.pipSize).toString();
    }
  }
}
