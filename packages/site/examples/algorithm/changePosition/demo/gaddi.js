/**
 * 图模式匹配
 */
import { GADDI } from '@antv/algorithm';
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
      style: {
        x: 217.86420885505296,
        y: 114.28884847734246,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '1',
      label: '1',
      style: {
        x: 113.58792632732174,
        y: 25.785315472468127,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '2',
      label: '2',
      style: {
        x: 179.59682070334452,
        y: 38.87850516662148,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '3',
      label: '3',
      style: {
        x: 204.20226244579672,
        y: -5.33508012158744,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '4',
      label: '4',
      style: {
        x: 308.74171746938134,
        y: 10.554714934145961,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '5',
      label: '5',
      style: {
        x: 341.99836557519745,
        y: 48.30310308747067,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '6',
      label: '6',
      style: {
        x: 376.62085426957793,
        y: -10.286527884559707,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '7',
      label: '7',
      style: {
        x: 254.42832676365109,
        y: 62.51510456243093,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '8',
      label: '8',
      style: {
        x: 139.32504277036227,
        y: 135.40373347960067,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '9',
      label: '9',
      style: {
        x: 245.24964464688256,
        y: 166.03052347036282,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '10',
      label: '10',
      style: {
        x: 250.33418485239127,
        y: 227.6830390965898,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '11',
      label: '11',
      style: {
        x: 176.79897890681895,
        y: 235.80422881594598,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '12',
      label: '12',
      style: {
        x: 331.32653587613936,
        y: 158.8731219947074,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '13',
      label: '13',
      style: {
        x: 292.8309736938475,
        y: 106.794007203338,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '14',
      label: '14',
      style: {
        x: 175.6768625027686,
        y: 179.3951732038534,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '15',
      label: '15',
      style: {
        x: 83.26466725029928,
        y: 96.50488885477502,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '16',
      label: '16',
      style: {
        x: 318.09206038019914,
        y: 241.38853020289633,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '17',
      label: '17',
      style: {
        x: 397.2096443837184,
        y: 251.11323425020436,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '18',
      label: '18',
      style: {
        x: 396.9307017482416,
        y: 305.79619379078093,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '19',
      label: '19',
      style: {
        x: 323.19884694585255,
        y: 354.7889914141042,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '20',
      label: '20',
      style: {
        x: 334.7320270398703,
        y: 289.0437229111331,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '21',
      label: '21',
      style: {
        x: 276.9512819725375,
        y: 284.9808595526045,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '22',
      label: '22',
      style: {
        x: 235.086300958203,
        y: 348.23515388308186,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '23',
      label: '23',
      style: {
        x: 263.36101059763547,
        y: 442.4976175844671,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '24',
      label: '24',
      style: {
        x: 195.01142425098806,
        y: 287.081197770762,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '25',
      label: '25',
      style: {
        x: 120.39188452563401,
        y: 337.8524937873151,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '26',
      label: '26',
      style: {
        x: 109.74700930888443,
        y: 407.5171194512714,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '27',
      label: '27',
      style: {
        x: 328.18870325041166,
        y: 527.9726877901181,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '28',
      label: '28',
      style: {
        x: 221.745767731853,
        y: 400.38906283199213,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '29',
      label: '29',
      style: {
        x: 243.98258526664858,
        y: 553.9974335527247,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '30',
      label: '30',
      style: {
        x: 179.30103487685315,
        y: 433.1126685019916,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
    {
      id: '31',
      label: '31',
      style: {
        x: 221.65781762707928,
        y: 474.10779931544715,
      },
      data: {
        cluster: 'nodeType-1',
      },
      cluster: 'nodeType-1',
    },
    {
      id: '32',
      label: '32',
      style: {
        x: 349.13614579528684,
        y: 422.65934738145364,
      },
      data: {
        cluster: 'nodeType-2',
      },
      cluster: 'nodeType-2',
    },
    {
      id: '33',
      label: '33',
      style: {
        x: 300.5432325124777,
        y: 401.2786277319002,
      },
      data: {
        cluster: 'nodeType-0',
      },
      cluster: 'nodeType-0',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge0',
    },
    {
      source: '0',
      target: '2',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge1',
    },
    {
      source: '0',
      target: '3',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge2',
    },
    {
      source: '0',
      target: '4',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge3',
    },
    {
      source: '0',
      target: '5',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge4',
    },
    {
      source: '0',
      target: '7',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge5',
    },
    {
      source: '0',
      target: '8',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge6',
    },
    {
      source: '0',
      target: '9',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge7',
    },
    {
      source: '0',
      target: '10',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge8',
    },
    {
      source: '0',
      target: '11',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge9',
    },
    {
      source: '0',
      target: '13',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge10',
    },
    {
      source: '0',
      target: '14',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge11',
    },
    {
      source: '0',
      target: '15',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge12',
    },
    {
      source: '0',
      target: '16',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge13',
    },
    {
      source: '2',
      target: '3',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge14',
    },
    {
      source: '4',
      target: '5',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge15',
    },
    {
      source: '4',
      target: '6',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge16',
    },
    {
      source: '5',
      target: '6',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge17',
    },
    {
      source: '7',
      target: '13',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge18',
    },
    {
      source: '8',
      target: '14',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge19',
    },
    {
      source: '9',
      target: '10',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge20',
    },
    {
      source: '10',
      target: '22',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge21',
    },
    {
      source: '10',
      target: '14',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge22',
    },
    {
      source: '10',
      target: '12',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge23',
    },
    {
      source: '10',
      target: '24',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge24',
    },
    {
      source: '10',
      target: '21',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge25',
    },
    {
      source: '10',
      target: '20',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge26',
    },
    {
      source: '11',
      target: '24',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge27',
    },
    {
      source: '11',
      target: '22',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge28',
    },
    {
      source: '11',
      target: '14',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge29',
    },
    {
      source: '12',
      target: '13',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge30',
    },
    {
      source: '16',
      target: '17',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge31',
    },
    {
      source: '16',
      target: '18',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge32',
    },
    {
      source: '16',
      target: '21',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge33',
    },
    {
      source: '16',
      target: '22',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge34',
    },
    {
      source: '17',
      target: '18',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge35',
    },
    {
      source: '17',
      target: '20',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge36',
    },
    {
      source: '18',
      target: '19',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge37',
    },
    {
      source: '19',
      target: '20',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge38',
    },
    {
      source: '19',
      target: '33',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge39',
    },
    {
      source: '19',
      target: '22',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge40',
    },
    {
      source: '19',
      target: '23',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge41',
    },
    {
      source: '20',
      target: '21',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge42',
    },
    {
      source: '21',
      target: '22',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge43',
    },
    {
      source: '22',
      target: '24',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge44',
    },
    {
      source: '22',
      target: '25',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge45',
    },
    {
      source: '22',
      target: '26',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge46',
    },
    {
      source: '22',
      target: '23',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge47',
    },
    {
      source: '22',
      target: '28',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge48',
    },
    {
      source: '22',
      target: '30',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge49',
    },
    {
      source: '22',
      target: '31',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge50',
    },
    {
      source: '22',
      target: '32',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge51',
    },
    {
      source: '22',
      target: '33',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge52',
    },
    {
      source: '23',
      target: '28',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge53',
    },
    {
      source: '23',
      target: '27',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge54',
    },
    {
      source: '23',
      target: '29',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge55',
    },
    {
      source: '23',
      target: '30',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge56',
    },
    {
      source: '23',
      target: '31',
      data: {
        cluster: 'edgeType-0',
      },
      cluster: 'edgeType-0',
      id: 'edge57',
    },
    {
      source: '23',
      target: '33',
      data: {
        cluster: 'edgeType-1',
      },
      cluster: 'edgeType-1',
      id: 'edge58',
    },
    {
      source: '32',
      target: '33',
      data: {
        cluster: 'edgeType-2',
      },
      cluster: 'edgeType-2',
      id: 'edge59',
    },
  ],
};

// 颜色数组
const colors = ['#5F95FF', '#61DDAA', '#65789B'];

// 默认色板配置
const defaultPalette = {
  type: 'group',
  field: 'cluster',
  color: colors, // 传入颜色数组
};

const button = document.createElement('button');
button.innerHTML = `Click Here to Match 点此开始匹配`;
document.getElementById('container').appendChild(button);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

const graph = new Graph({
  container: 'container',
  data,
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

graph.render();

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
