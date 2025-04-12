import { ViewController } from 'engine/view/view-controller';
import { ChartRowComponent } from './chart-row-component';
import { Component } from './component';
import { TimeAxisComponent } from './time-axis-component';
import { TimeScaleModel } from 'engine/model/timescale-model';

export class ChartComponent extends Component {
  private _viewController = new ViewController();
  private _timeScaleModel = new TimeScaleModel();

  private _chartRowComponent = new ChartRowComponent(this._timeScaleModel, this.element, {
    flexBasis: '100%',
    display: 'flex',
  });

  private _timeAxisComponent = new TimeAxisComponent(this.element, { flexBasis: '3rem', flexShrink: '0' });
}
