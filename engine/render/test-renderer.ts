import { Renderer } from './renderer';

export class TestRenderer extends Renderer {
  public render(): void {
    super.clear();

    this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, Math.random() * this.view.width, Math.random() * this.view.height);
  }
}
