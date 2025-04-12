import { ChartRowComponent } from './chart-row-component';
import { Component } from './component';
import { TimeAxisComponent } from './time-axis-component';

export class ChartComponent extends Component {
  private _chartRowComponent = new ChartRowComponent(this.element, { flexBasis: '100%', display: 'flex' });
  private _timeAxisComponent = new TimeAxisComponent(this.element, { flexBasis: '3rem', flexShrink: '0' });
}
