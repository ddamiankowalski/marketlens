import { PriceScaleModel } from '../pricescale-model';
import { TimeScaleModel } from '../timescale-model';

export type IModel = {
  timeScaleModel?: TimeScaleModel;
  priceScaleModel?: PriceScaleModel;
};
