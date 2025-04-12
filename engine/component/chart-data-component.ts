import { TimeScaleModel } from 'engine/model/timescale-model';
import { Component } from './component';
import { IComponentStyle } from './types/icomponent';

export class ChartDataComponent extends Component {
  constructor(
    timeScaleModel: TimeScaleModel,
    _hostElement: HTMLElement,
    _style: IComponentStyle = {
      width: '100%',
      height: '100%',
    },
  ) {
    super(_hostElement, _style);
    this._model = { timeScaleModel };
    this.createView();

    const view = this.getView('');
    view.setRenderer('TEST');
  }
}
