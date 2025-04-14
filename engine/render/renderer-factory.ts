import { View } from 'engine/view/view';
import { GridRenderer } from './grid-renderer';
import { Renderer } from './renderer';
import { IRendererType } from './types/irenderer';
import { PriceAxisRenderer } from './price-axis-renderer';

export class RendererFactory {
  public static createRenderer(type: IRendererType, view: View): Renderer {
    switch (type) {
      case 'GRID':
        return new GridRenderer(view);
      case 'PRICE_SCALE':
        return new PriceAxisRenderer(view);
    }
  }
}
