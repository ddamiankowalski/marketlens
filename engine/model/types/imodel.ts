import { PriceScaleModel } from '../pricescale-model';
import { TimeScaleModel } from '../timescale-model';

export type IModel = {
  timeScaleModel?: TimeScaleModel | null;
  priceScaleModel?: PriceScaleModel | null;
};

export type IPriceScaleMetadata = {
  pipSize: number;
};

export enum PriceScaleMode {
  Fixed = 'FIXED',
  FreePan = 'FREE_PAN',
}

export interface IPriceRange {
  max: number;
  min: number;
}

export interface ITimeRange {
  max: number;
  min: number;
}
