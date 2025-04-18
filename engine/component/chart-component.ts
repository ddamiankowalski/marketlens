import { ViewController } from 'engine/view/view-controller';
import { ChartRowComponent } from './chart-row-component';
import { Component } from './component';
import { TimeAxisComponent } from './time-axis-component';
import { TimeScaleModel } from 'engine/model/timescale-model';
import { SourceController } from 'engine/source/types/source-controller';

export class ChartComponent extends Component {
  private _viewController = new ViewController();

  private _timeAxisComponent = new TimeAxisComponent(this.element, {
    flexBasis: '3rem',
    flexShrink: '0',
    order: '1',
    width: 'calc(100% - 3rem)',
  });

  private _sourceController = new SourceController(this.timeScaleModel);

  private _chartRowComponent = new ChartRowComponent(this._sourceController, this.timeScaleModel, this.element, {
    flexBasis: '100%',
    display: 'flex',
    order: '0',
  });

  get timeScaleModel(): TimeScaleModel {
    return this._timeAxisComponent.timeScaleModel;
  }
}
