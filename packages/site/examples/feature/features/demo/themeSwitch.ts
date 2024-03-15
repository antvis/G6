import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '0', data: { cluster: 'a' } },
    { id: '1', data: { cluster: 'a' } },
    { id: '2', data: { cluster: 'a' } },
    { id: '3', data: { cluster: 'a' } },
    { id: '4', data: { cluster: 'a' } },
    { id: '5', data: { cluster: 'a' } },
    { id: '6', data: { cluster: 'a' } },
    { id: '7', data: { cluster: 'a' } },
    { id: '8', data: { cluster: 'a' } },
    { id: '9', data: { cluster: 'a' } },
    { id: '10', data: { cluster: 'a' } },
    { id: '11', data: { cluster: 'a' } },
    { id: '12', data: { cluster: 'a' } },
    { id: '13', data: { cluster: 'b' } },
    { id: '14', data: { cluster: 'b' } },
    { id: '15', data: { cluster: 'b' } },
    { id: '16', data: { cluster: 'b' } },
    { id: '17', data: { cluster: 'b' } },
    { id: '18', data: { cluster: 'c' } },
    { id: '19', data: { cluster: 'c' } },
    { id: '20', data: { cluster: 'c' } },
    { id: '21', data: { cluster: 'c' } },
    { id: '22', data: { cluster: 'c' } },
    { id: '23', data: { cluster: 'c' } },
    { id: '24', data: { cluster: 'c' } },
    { id: '25', data: { cluster: 'c' } },
    { id: '26', data: { cluster: 'c' } },
    { id: '27', data: { cluster: 'c' } },
    { id: '28', data: { cluster: 'c' } },
    { id: '29', data: { cluster: 'c' } },
    { id: '30', data: { cluster: 'c' } },
    { id: '31', data: { cluster: 'd' } },
    { id: '32', data: { cluster: 'd' } },
    { id: '33', data: { cluster: 'd' } },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '3' },
    { source: '0', target: '4' },
    { source: '0', target: '5' },
    { source: '0', target: '7' },
    { source: '0', target: '8' },
    { source: '0', target: '9' },
    { source: '0', target: '10' },
    { source: '0', target: '11' },
    { source: '0', target: '13' },
    { source: '0', target: '14' },
    { source: '0', target: '15' },
    { source: '0', target: '16' },
    { source: '2', target: '3' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '5', target: '6' },
    { source: '7', target: '13' },
    { source: '8', target: '14' },
    { source: '9', target: '10' },
    { source: '10', target: '22' },
    { source: '10', target: '14' },
    { source: '10', target: '12' },
    { source: '10', target: '24' },
    { source: '10', target: '21' },
    { source: '10', target: '20' },
    { source: '11', target: '24' },
    { source: '11', target: '22' },
    { source: '11', target: '14' },
    { source: '12', target: '13' },
    { source: '16', target: '17' },
    { source: '16', target: '18' },
    { source: '16', target: '21' },
    { source: '16', target: '22' },
    { source: '17', target: '18' },
    { source: '17', target: '20' },
    { source: '18', target: '19' },
    { source: '19', target: '20' },
    { source: '19', target: '33' },
    { source: '19', target: '22' },
    { source: '19', target: '23' },
    { source: '20', target: '21' },
    { source: '21', target: '22' },
    { source: '22', target: '24' },
    { source: '22', target: '25' },
    { source: '22', target: '26' },
    { source: '22', target: '23' },
    { source: '22', target: '28' },
    { source: '22', target: '30' },
    { source: '22', target: '31' },
    { source: '22', target: '32' },
    { source: '22', target: '33' },
    { source: '23', target: '28' },
    { source: '23', target: '27' },
    { source: '23', target: '29' },
    { source: '23', target: '30' },
    { source: '23', target: '31' },
    { source: '23', target: '33' },
    { source: '32', target: '33' },
  ],
};

const themes = {
  '🌞 Light': {
    background: '#fff',
    theme: 'light',
    node: {
      palette: {
        type: 'group',
        field: 'cluster',
        color: 'antv',
      },
    },
  },
  '🌚 Dark': {
    background: '#000',
    theme: 'dark',
    node: {
      palette: {
        type: 'group',
        field: 'cluster',
        color: 'antv',
      },
    },
  },
  '🌎 Blue': {
    background: '#f3faff',
    theme: 'light',
    node: {
      palette: {
        type: 'group',
        field: 'cluster',
        color: 'blues',
        invert: true,
      },
    },
  },
  '🌕 yellow': {
    background: '#fcf9f1',
    theme: 'light',
    node: {
      palette: {
        type: 'group',
        field: 'cluster',
        color: ['#ffe7ba', '#ffd591', '#ffc069', '#ffa940', '#fa8c16', '#d46b08', '#ad4e00', '#873800', '#612500'],
      },
    },
  },
};

const graph = new Graph({
  container: 'container',
  autoFit: 'view',
  background: '#fff',
  theme: 'light',
  data,
  node: {
    palette: {
      type: 'group',
      field: 'cluster',
      color: 'antv',
    },
  },
  layout: {
    type: 'circular',
  },
});

graph.render();

const container = document.getElementById('container')!;
const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
btnContainer.style.zIndex = '10';
container.appendChild(btnContainer);
const tip2 = document.createElement('span');
tip2.innerHTML = '🌊 Fetching data....';
btnContainer.appendChild(tip2);
const tip = document.createElement('span');
tip.innerHTML = '<br />👉 Change Theme:';
btnContainer.appendChild(tip);

Object.keys(themes).forEach((name, i) => {
  const btn = document.createElement('a');
  btn.innerHTML = name;
  btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  btn.style.padding = '4px';
  btn.style.marginLeft = i > 0 ? '24px' : '8px';
  btnContainer.appendChild(btn);
  btn.addEventListener('click', () => {
    graph.setOptions(themes[name]);
    graph.render();
  });
});
