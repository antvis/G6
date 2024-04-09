import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      style: {
        cluster: 'a',
        x: 370.4520211407446,
        y: 292.93584848755455,
      },
    },
    {
      id: '1',
      style: {
        cluster: 'a',
        x: 253.56229931420336,
        y: 243.34486624655648,
      },
    },
    {
      id: '2',
      style: {
        cluster: 'a',
        x: 336.4983503243457,
        y: 249.39006069536507,
      },
    },
    {
      id: '3',
      style: {
        cluster: 'a',
        x: 371.6646616570811,
        y: 201.5575523946438,
      },
    },
    {
      id: '4',
      style: {
        cluster: 'a',
        x: 332.0586584066424,
        y: 228.00944206610959,
      },
    },
    {
      id: '5',
      style: {
        cluster: 'a',
        x: 325.65917799065426,
        y: 186.74016708571452,
      },
    },
    {
      id: '6',
      style: {
        cluster: 'a',
        x: 273.18677786306154,
        y: 192.77016798200515,
      },
    },
    {
      id: '7',
      style: {
        cluster: 'a',
        x: 355.92436080257215,
        y: 257.88756388677,
      },
    },
    {
      id: '8',
      style: {
        cluster: 'a',
        x: 411.5572028075279,
        y: 232.76431623587672,
      },
    },
    {
      id: '9',
      style: {
        cluster: 'a',
        x: 304.65495130442986,
        y: 250.08987799012783,
      },
    },
    {
      id: '10',
      style: {
        cluster: 'a',
        x: 322.50004225062463,
        y: 330.8883280978989,
      },
    },
    {
      id: '11',
      style: {
        cluster: 'a',
        x: 301.0977427142802,
        y: 296.7359716093439,
      },
    },
    {
      id: '12',
      style: {
        cluster: 'a',
        x: 417.46604339203805,
        y: 279.9166838486554,
      },
    },
    {
      id: '13',
      style: {
        cluster: 'b',
        x: 454.53530234411994,
        y: 415.17941562914456,
      },
    },
    {
      id: '14',
      style: {
        cluster: 'b',
        x: 450.8766418435361,
        y: 382.498604856537,
      },
    },
    {
      id: '15',
      style: {
        cluster: 'b',
        x: 487.6058782052607,
        y: 410.0519945933262,
      },
    },
    {
      id: '16',
      style: {
        cluster: 'b',
        x: 422.43062870866913,
        y: 427.65795511997504,
      },
    },
    {
      id: '17',
      style: {
        cluster: 'b',
        x: 457.03718916704463,
        y: 441.9753459864875,
      },
    },
    {
      id: '18',
      style: {
        cluster: 'c',
        x: 309.8100489062979,
        y: 495.426539153474,
      },
    },
    {
      id: '19',
      style: {
        cluster: 'c',
        x: 235.12215979969076,
        y: 503.35738046350815,
      },
    },
    {
      id: '20',
      style: {
        cluster: 'c',
        x: 270.25991516360136,
        y: 431.8199639827049,
      },
    },
    {
      id: '21',
      style: {
        cluster: 'c',
        x: 231.6921512437599,
        y: 449.03001513623497,
      },
    },
    {
      id: '22',
      style: {
        cluster: 'c',
        x: 270.6529782657436,
        y: 475.0510511179986,
      },
    },
    {
      id: '23',
      style: {
        cluster: 'c',
        x: 240.99694480618518,
        y: 545.6999470286062,
      },
    },
    {
      id: '24',
      style: {
        cluster: 'c',
        x: 204.08947189443103,
        y: 396.80371021816967,
      },
    },
    {
      id: '25',
      style: {
        cluster: 'c',
        x: 186.44446705202617,
        y: 455.7705486462334,
      },
    },
    {
      id: '26',
      style: {
        cluster: 'c',
        x: 145.49412102788372,
        y: 427.31365327326284,
      },
    },
    {
      id: '27',
      style: {
        cluster: 'c',
        x: 177.97758838522893,
        y: 537.4542710742172,
      },
    },
    {
      id: '28',
      style: {
        cluster: 'c',
        x: 199.12702650480708,
        y: 490.7697877945314,
      },
    },
    {
      id: '29',
      style: {
        cluster: 'c',
        x: 144.73078715286746,
        y: 491.16435843649487,
      },
    },
    {
      id: '30',
      style: {
        cluster: 'c',
        x: 217.92566693077742,
        y: 475.26195046942223,
      },
    },
    {
      id: '31',
      style: {
        cluster: 'd',
        x: 379.30407850165994,
        y: 588.0268864758729,
      },
    },
    {
      id: '32',
      style: {
        cluster: 'd',
        x: 397.14127306279465,
        y: 587.9920601245864,
      },
    },
    {
      id: '33',
      style: {
        cluster: 'd',
        x: 360.90664470040156,
        y: 588.1785856221188,
      },
    },
  ],
  edges: [
    {
      id: 'g2476',
      source: '0',
      target: '1',
    },
    {
      id: 'g2477',
      source: '0',
      target: '2',
    },
    {
      id: 'g2478',
      source: '0',
      target: '3',
    },
    {
      id: 'g2479',
      source: '0',
      target: '4',
    },
    {
      id: 'g2480',
      source: '0',
      target: '5',
    },
    {
      id: 'g2481',
      source: '0',
      target: '7',
    },
    {
      id: 'g2482',
      source: '0',
      target: '8',
    },
    {
      id: 'g2483',
      source: '0',
      target: '9',
    },
    {
      id: 'g2484',
      source: '0',
      target: '10',
    },
    {
      id: 'g2485',
      source: '0',
      target: '11',
    },
    {
      id: 'g2486',
      source: '0',
      target: '13',
    },
    {
      id: 'g2487',
      source: '0',
      target: '14',
    },
    {
      id: 'g2488',
      source: '0',
      target: '15',
    },
    {
      id: 'g2489',
      source: '0',
      target: '16',
    },
    {
      id: 'g2490',
      source: '2',
      target: '3',
    },
    {
      id: 'g2491',
      source: '4',
      target: '5',
    },
    {
      id: 'g2492',
      source: '4',
      target: '6',
    },
    {
      id: 'g2493',
      source: '5',
      target: '6',
    },
    {
      id: 'g2494',
      source: '7',
      target: '13',
    },
    {
      id: 'g2495',
      source: '8',
      target: '14',
    },
    {
      id: 'g2496',
      source: '9',
      target: '10',
    },
    {
      id: 'g2497',
      source: '10',
      target: '22',
    },
    {
      id: 'g2498',
      source: '10',
      target: '14',
    },
    {
      id: 'g2499',
      source: '10',
      target: '12',
    },
    {
      id: 'g2500',
      source: '10',
      target: '24',
    },
    {
      id: 'g2501',
      source: '10',
      target: '21',
    },
    {
      id: 'g2502',
      source: '10',
      target: '20',
    },
    {
      id: 'g2503',
      source: '11',
      target: '24',
    },
    {
      id: 'g2504',
      source: '11',
      target: '22',
    },
    {
      id: 'g2505',
      source: '11',
      target: '14',
    },
    {
      id: 'g2506',
      source: '12',
      target: '13',
    },
    {
      id: 'g2507',
      source: '16',
      target: '17',
    },
    {
      id: 'g2508',
      source: '16',
      target: '18',
    },
    {
      id: 'g2509',
      source: '16',
      target: '21',
    },
    {
      id: 'g2510',
      source: '16',
      target: '22',
    },
    {
      id: 'g2511',
      source: '17',
      target: '18',
    },
    {
      id: 'g2512',
      source: '17',
      target: '20',
    },
    {
      id: 'g2513',
      source: '18',
      target: '19',
    },
    {
      id: 'g2514',
      source: '19',
      target: '20',
    },
    {
      id: 'g2515',
      source: '19',
      target: '33',
    },
    {
      id: 'g2516',
      source: '19',
      target: '22',
    },
    {
      id: 'g2517',
      source: '19',
      target: '23',
    },
    {
      id: 'g2518',
      source: '20',
      target: '21',
    },
    {
      id: 'g2519',
      source: '21',
      target: '22',
    },
    {
      id: 'g2520',
      source: '22',
      target: '24',
    },
    {
      id: 'g2521',
      source: '22',
      target: '25',
    },
    {
      id: 'g2522',
      source: '22',
      target: '26',
    },
    {
      id: 'g2523',
      source: '22',
      target: '23',
    },
    {
      id: 'g2524',
      source: '22',
      target: '28',
    },
    {
      id: 'g2525',
      source: '22',
      target: '30',
    },
    {
      id: 'g2526',
      source: '22',
      target: '31',
    },
    {
      id: 'g2527',
      source: '22',
      target: '32',
    },
    {
      id: 'g2528',
      source: '22',
      target: '33',
    },
    {
      id: 'g2529',
      source: '23',
      target: '28',
    },
    {
      id: 'g2530',
      source: '23',
      target: '27',
    },
    {
      id: 'g2531',
      source: '23',
      target: '29',
    },
    {
      id: 'g2532',
      source: '23',
      target: '30',
    },
    {
      id: 'g2533',
      source: '23',
      target: '31',
    },
    {
      id: 'g2534',
      source: '23',
      target: '33',
    },
    {
      id: 'g2535',
      source: '32',
      target: '33',
    },
  ],
  combos: [],
};

const groupedNodesByCluster = data.nodes.reduce((acc, node) => {
  const cluster = node.style.cluster;
  acc[cluster] ||= [];
  acc[cluster].push(node.id);
  return acc;
}, {});

const graph = new Graph({
  container: 'container',
  data,
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  node: {
    palette: {
      type: 'group',
      field: (node) => node.style.cluster,
    },
  },
  plugins: [
    {
      key: 'hull-a',
      type: 'hull',
      corner: 'rounded', // 'rounded' | 'sharp' | 'smooth'
      members: groupedNodesByCluster['a'],
      labelText: 'cluster-a',
      labelPlacement: 'top',
      fill: '#1783FF',
      stroke: '#1783FF',
    },
    {
      key: 'hull-b',
      type: 'hull',
      members: groupedNodesByCluster['b'],
      fill: '#00C9C9',
      stroke: '#00C9C9',
      labelText: 'cluster-b',
      labelPlacement: 'right',
      labelAutoRotate: false,
    },
    {
      key: 'hull-c',
      type: 'hull',
      members: groupedNodesByCluster['c'],
      fill: '#F08F56',
      stroke: '#F08F56',
      labelText: 'cluster-c',
      labelPlacement: 'left',
      labelAutoRotate: false,
    },
    {
      key: 'hull-d',
      type: 'hull',
      members: groupedNodesByCluster['d'],
      fill: '#D580FF',
      stroke: '#D580FF',
      labelText: 'cluster-d',
      labelPlacement: 'bottom',
      labelCloseToHull: false,
    },
  ],
  autoFit: 'center',
});

graph.render();
