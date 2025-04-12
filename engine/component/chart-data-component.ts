import { Component } from './component';
import { IComponentStyle } from './types/icomponent';

export class ChartDataComponent extends Component {
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
    view.setRenderer('TEST');
  }
}
