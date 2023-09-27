import { Graph } from '../../src/index';
import { pxCompare } from '../unit/util';
import { sleep } from './utils';

const container = document.createElement('div');
//@ts-ignore
document.querySelector('body').appendChild(container);

const createGraph = (plugins) => {
  return new Graph({
    container,
    width: 500,
    height: 500,
    data: {
      nodes: [
        { id: 'node1', data: { x: 100, y: 200 } },
        { id: 'node2', data: { x: 200, y: 250 } },
        { id: 'node3', data: { x: 200, y: 350 } },
        { id: 'node4', data: { x: 300, y: 250 } },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: { edgeType: 'e1' },
        },
        {
          id: 'edge2',
          source: 'node2',
          target: 'node3',
          data: { edgeType: 'e2' },
        },
        {
          id: 'edge3',
          source: 'node3',
          target: 'node4',
          data: { edgeType: 'e3' },
        },
        {
          id: 'edge4',
          source: 'node1',
          target: 'node4',
          data: { edgeType: 'e3' },
        },
      ],
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
    modes: {
      default: ['brush-select'],
    },
    plugins,
  });
};

describe('plugin', () => {
  it('watermarker with default config', (done) => {
    const graph = createGraph(['watermarker']);
    graph.on('afterlayout', (e) => {
      const watermakerDiv =
        document.getElementsByClassName('g6-watermarker')?.[0];
      expect(watermakerDiv).not.toBe(undefined);
      graph.destroy();
      done();
    });
  });

  it('watermarker with general config', (done) => {
    const graph = createGraph([
      {
        key: 'watermarker-1',
        type: 'watermarker',
        width: 200,
        height: 200,
      },
    ]);
    graph.on('afterlayout', (e) => {
      const watermakerDiv =
        document.getElementsByClassName('g6-watermarker')?.[0];
      expect(watermakerDiv).not.toBe(undefined);
      graph.destroy();
      done();
    });
  });

  it('watermarker with image config', (done) => {
    const graph = createGraph([
      {
        key: 'watermarker-1',
        type: 'watermarker',
        mode: 'image',
        image: {
          imgURL:
            'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
          x: 50,
          y: 50,
          width: 84,
          height: 38,
          rotate: 20,
        },
      },
    ]);
    graph.on('afterlayout', (e) => {
      const watermakerDiv =
        document.getElementsByClassName('g6-watermarker')?.[0];
      expect(watermakerDiv).not.toBe(undefined);
      graph.destroy();
      done();
    });
  });

  it('watermarker with text config', (done) => {
    const graph = createGraph([
      {
        key: 'watermarker-1',
        type: 'watermarker',
        mode: 'text',
        text: {
          texts: ['Test', 'AntV'],
          x: 10,
          y: 80,
          lineHeight: 20,
          rotate: 30,
          fontSize: 16,
          fontFamily: 'Microsoft YaHei',
          fill: 'rgba(255, 0, 0, 1)',
          baseline: 'Middle',
        },
      },
    ]);
    graph.on('afterlayout', (e) => {
      const watermakerDiv =
        document.getElementsByClassName('g6-watermarker')?.[0];
      expect(watermakerDiv).not.toBe(undefined);
      graph.destroy();
      done();
    });
  });
});
