import { ViewController } from 'engine/view/view-controller';
import { ChartRowComponent } from './chart-row-component';
import { Component } from './component';
import { TimeAxisComponent } from './time-axis-component';
import { TimeScaleModel } from 'engine/model/timescale-model';
import { SourceController } from 'engine/source/types/source-controller';

export class ChartComponent extends Component {
  private _timeScaleModel = new TimeScaleModel();

  private _sourceController = new SourceController(this._timeScaleModel);
  private _viewController = new ViewController();

  private _chartRowComponent = new ChartRowComponent(this._sourceController, this._timeScaleModel, this.element, {
    flexBasis: '100%',
    display: 'flex',
  });

  private _timeAxisComponent = new TimeAxisComponent(this.element, { flexBasis: '3rem', flexShrink: '0' });
}
