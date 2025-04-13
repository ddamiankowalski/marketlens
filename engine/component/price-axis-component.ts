import { PriceScaleModel } from 'engine/model/pricescale-model';
import { Component } from './component';
import { SourceController } from 'engine/source/types/source-controller';
import { IComponentStyle } from './types/icomponent';

export class PriceAxisComponent extends Component {
  private _priceScaleModel: PriceScaleModel;

  constructor(
    private _sourceController: SourceController,
    _hostElement: HTMLElement,
    _style: IComponentStyle = {
      width: '100%',
      height: '100%',
    },
  ) {
    super(_hostElement, _style);
    this._priceScaleModel = new PriceScaleModel(this._sourceController);
  }

  get priceScaleModel(): PriceScaleModel {
    return this._priceScaleModel;
  }
}
