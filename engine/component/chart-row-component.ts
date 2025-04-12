import { Component } from './component';
import { ChartDataComponent } from './chart-data-component';
import { PriceAxisComponent } from './price-axis-component';
import { PriceScaleModel } from 'engine/model/pricescale-model';
import { IComponentStyle } from './types/icomponent';
import { TimeScaleModel } from 'engine/model/timescale-model';

export class ChartRowComponent extends Component {
  private _priceScaleModel = new PriceScaleModel();

  private _chartDataComponent = new ChartDataComponent(this._timeScaleModel, this.element, { flexBasis: '100%' });
  private _priceAxisComponent = new PriceAxisComponent(this.element, { flexBasis: '3rem', flexShrink: '0' });

  constructor(
    private _timeScaleModel: TimeScaleModel,
    _hostElement: HTMLElement,
    _style: IComponentStyle = {
      width: '100%',
      height: '100%',
    },
  ) {
    super(_hostElement, _style);
  }
}
