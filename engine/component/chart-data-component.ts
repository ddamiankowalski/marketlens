import { TimeScaleModel } from 'engine/model/timescale-model';
import { Component } from './component';
import { IComponentStyle } from './types/icomponent';
import { PriceScaleModel } from 'engine/model/pricescale-model';

export class ChartDataComponent extends Component {
  constructor(
    timeScaleModel: TimeScaleModel,
    priceScaleModel: PriceScaleModel,
    _hostElement: HTMLElement,
    _style: IComponentStyle = {
      width: '100%',
      height: '100%',
    },
  ) {
    super(_hostElement, _style);
    this._model = { timeScaleModel, priceScaleModel };
    this.createView();

    // const view = this.getView('');
    // view.setRenderer('TEST');
  }
}
