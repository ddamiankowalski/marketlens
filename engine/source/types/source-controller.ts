import { TimeScaleModel } from 'engine/model/timescale-model';
import { SourceId } from './isource';
import { IPriceRange } from 'engine/model/types/imodel';

export class SourceController {
  private _baseSourceId: SourceId | null = null;

  constructor(private _timeScaleModel: TimeScaleModel) {}

  get priceRange(): IPriceRange {
    return { min: 50, max: 100 };
  }
}
