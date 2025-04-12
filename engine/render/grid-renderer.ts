import { Renderer } from './renderer';

export class GridRenderer extends Renderer {
  public render(): void {
    super.clear();

    if (!this.timeScaleModel) {
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
  }
}
