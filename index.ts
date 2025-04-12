import { Component } from 'engine/component/component';

const host = document.getElementById('chart');

if (host) {
  const component = new Component(host);
  console.log(component);
}
