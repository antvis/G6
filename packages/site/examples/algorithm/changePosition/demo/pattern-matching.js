/**
 * 图模式匹配
 */
import { GADDI } from '@antv/algorithm';
import { Graph } from '@antv/g6';

// 颜色数组
const colors = ['#5F95FF', '#61DDAA', '#65789B'];

// 默认色板配置
const defaultPalette = {
  type: 'group',
  field: 'cluster',
  color: colors, // 传入颜色数组
};

let data;
const button = document.createElement('button');
button.innerHTML = `Click Here to Match 点此开始匹配`;
document.getElementById('container').appendChild(button);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

const graph = new Graph({
  container: 'container',
  width,
  height,
  fitView: true,
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  node: {
    style: {
      labelPlacement: 'center',
      labelText: (d) => d.label,
      stroke: '#5F95FF',
      lineWidth: 1,
    },
    palette: defaultPalette,
  },
  edge: {
    style: {
      endArrow: true,
    },
    palette: defaultPalette,
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      position: 'top',
    },
    {
      key: 'hull-0',
      type: 'hull',
      members: [],
    },
    {
      key: 'hull-1',
      type: 'hull',
      members: [],
    },
  ],
});
fetch('https://assets.antv.antgroup.com/g6/gaddi.json')
  .then((res) => res.json())
  .then((_data) => {
    data = _data;
    graph.setData(data);
    graph.render();
  });

const pattern = {
  nodes: [
    {
      id: 'pn0',
      cluster: 'nodeType-0',
    },
    {
      id: 'pn1',
      cluster: 'nodeType-1',
    },
    {
      id: 'pn2',
      cluster: 'nodeType-2',
    },
  ],
  edges: [
    { source: 'pn1', target: 'pn0', cluster: 'edgeType-1' },
    { source: 'pn1', target: 'pn2', cluster: 'edgeType-0' },
    { source: 'pn2', target: 'pn0', cluster: 'edgeType-2' },
  ],
};

button.addEventListener('click', (e) => {
  const matches = GADDI(data, pattern, true, undefined, undefined, 'cluster', 'cluster');

  matches.forEach((match, i) => {
    graph.updatePlugin({
      key: `hull-${i}`,
      members: match.nodes.map((node) => node.id),
    });
  });
  graph.render();
  button.innerHTML = `The results are marked with hulls 结果已用轮廓标记`;
  button.disabled = true;
});
