import { Component } from './component';
import { ChartDataComponent } from './chart-data-component';
import { PriceAxisComponent } from './price-axis-component';
import { PriceScaleModel } from 'engine/model/pricescale-model';
import { IComponentStyle } from './types/icomponent';
import { TimeScaleModel } from 'engine/model/timescale-model';
import { SourceController } from 'engine/source/types/source-controller';

export class ChartRowComponent extends Component {
  private _priceAxisComponent = new PriceAxisComponent(this._sourceController, this.element, {
    flexBasis: '3rem',
    flexShrink: '0',
    order: '1',
  });

  private _chartDataComponent = new ChartDataComponent(this._timeScaleModel, this.priceScaleModel, this.element, {
    flexBasis: '100%',
    order: '0',
  });

  constructor(
    private _sourceController: SourceController,
    private _timeScaleModel: TimeScaleModel,
    _hostElement: HTMLElement,
    _style: IComponentStyle = {
      width: '100%',
      height: '100%',
    },
  ) {
    super(_hostElement, _style);
  }

  get priceScaleModel(): PriceScaleModel {
    return this._priceAxisComponent.priceScaleModel;
  }
}
