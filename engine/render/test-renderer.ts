import { Renderer } from './renderer';

export class TestRenderer implements Renderer {
  public render(): void {
    console.log('i am rendering!!');
  }
}
