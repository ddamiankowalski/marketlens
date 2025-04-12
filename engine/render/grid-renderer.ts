import { Renderer } from './renderer';

export class GridRenderer extends Renderer {
  public render(): void {
    super.clear();

    console.log(this);
  }
}
