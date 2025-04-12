import { Component } from './component';
import { ChartDataComponent } from './chart-data-component';
import { PriceAxisComponent } from './price-axis-component';

export class ChartRowComponent extends Component {
  private _dataComponent = new ChartDataComponent(this.element, { flexBasis: '100%' });
  private _priceAxisComponent = new PriceAxisComponent(this.element, { flexBasis: '3rem', flexShrink: '0' });
}
