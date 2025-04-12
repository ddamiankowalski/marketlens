import { Renderer } from './renderer';

export class GridRenderer extends Renderer {
  public render(): void {
    super.clear();

    if (!this.timeScaleModel || !this.priceScaleModel) {
      return;
    }

    this.context.strokeStyle = 'black';
    let currentXCoord = 0;

    while (currentXCoord < this.view.width) {
      this.context.beginPath();
      this.context.moveTo(currentXCoord, 0);
      this.context.lineTo(currentXCoord, this.view.height);
      this.context.stroke();

      currentXCoord += this.timeScaleModel.colDist;
    }

    let currentYCoord = 0;

    while (currentYCoord < this.view.width) {
      this.context.beginPath();
      this.context.moveTo(0, currentYCoord);
      this.context.lineTo(this.view.width, currentYCoord);
      this.context.stroke();

      currentYCoord += this.priceScaleModel.rowDist;
    }
  }
}
