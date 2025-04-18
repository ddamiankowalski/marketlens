import { TimeScaleModel } from 'engine/model/timescale-model';
import { Component } from './component';
import { IComponentStyle } from './types/icomponent';

export class TimeAxisComponent extends Component {
  private _timeScaleModel: TimeScaleModel;

  constructor(
    _hostElement: HTMLElement,
    _style: IComponentStyle = {
      width: '100%',
      height: '100%',
    },
  ) {
    super(_hostElement, _style);

    this.createView();
    const view = this.getView('');

    this._timeScaleModel = new TimeScaleModel(view);
  }

  get timeScaleModel(): TimeScaleModel {
    return this._timeScaleModel;
  }
}
