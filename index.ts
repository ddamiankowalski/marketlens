import { ChartComponent } from 'engine/component/chart-component';

const host = document.getElementById('chart');

if (host) {
  const component = new ChartComponent(host, {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  });
  console.log(component);
}
