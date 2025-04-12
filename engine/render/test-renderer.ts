import { Renderer } from './renderer';

export class TestRenderer extends Renderer {
  public render(): void {
    super.render();

    this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, 50, 50);
  }
}
