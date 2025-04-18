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

    const view = this.getView('');
    view.setRenderer('GRID');

    this.element.addEventListener('wheel', (ev) => {
      ev.preventDefault();

      this._model.timeScaleModel?.setColDist(ev.deltaY);
    });

    let isDragging = false;

    this.element.addEventListener('mousedown', () => {
      isDragging = true;
    });

    this.element.addEventListener('mousemove', (ev) => {
      if (!isDragging) {
        return;
      }

      this._model.timeScaleModel?.setOffset(ev.movementX);
      this._model.priceScaleModel?.setOffset(ev.movementY);
    });

    this.element.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }
}
