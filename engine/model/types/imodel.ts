import { PriceScaleModel } from '../pricescale-model';
import { TimeScaleModel } from '../timescale-model';

export type IModel = {
  timeScaleModel?: TimeScaleModel;
  priceScaleModel?: PriceScaleModel;
};

export type IPriceScaleMetadata = {
  pipSize: number;
};

export enum PriceScaleMode {
  Fixed = 'FIXED',
  FreePan = 'FREE_PAN',
}
