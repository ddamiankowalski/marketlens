import { TimeScaleModel } from 'engine/model/timescale-model';
import { SourceId } from './isource';

export class SourceController {
  private _baseSourceId: SourceId | null = null;

  constructor(private _timeScaleModel: TimeScaleModel) {}

  get maxPrice(): number {
    return 100;
  }

  get minPrice(): number {
    return 50;
  }
}
