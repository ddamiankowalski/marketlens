import { View } from './engine/view/view';

const host = document.getElementById('chart');

if (host) {
  const view = new View(host);
  console.log(view);
}
