import G6 from '../../../src';
import { mathEqual } from './util';

const data = {
  nodes: [
    { id: '0', label: '0' },
    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3', label: '3' },
    { id: '4', label: '4' },
    { id: '5', label: '5' },
    { id: '6', label: '6' },
    { id: '7', label: '7' },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    { source: '3', target: '4' },
    { source: '5', target: '6' },
    { source: '6', target: '7' },
  ],
};

const div = document.createElement('div');
div.id = 'pipes-layout';
document.body.appendChild(div);

describe('pipes layout', () => {
  it('pipe circular and grid layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        pipes: [
          {
            type: 'circular',
            nodesFilter: (node) => (+node.id) <= 4
          },
          {
            type: 'grid',
            begin: [100, 0],
            nodesFilter: (node) => (+node.id) > 4
          }],
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    graph.on('afterlayout', () => {
      expect(graph.getNodes()[0].getModel().x != null).toEqual(true);
      // graph.destroy();
    });
  });

  it('pipe circular and grid layout with center configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        pipes: [
          {
            type: 'circular',
            center: [300, 300],
            nodesFilter: (node) => node.id <= 4
          },
          {
            type: 'grid',
            nodesFilter: (node) => node.id > 4
          }],
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    graph.on('afterlayout', () => {
      const firstNode = graph.getNodes()[0].getModel();
      expect(mathEqual(firstNode.x, 450)).toEqual(true);
      expect(mathEqual(firstNode.y, 300)).toEqual(true);
      // graph.destroy();
    });
  });

  it('pipe circular and grid layout with adjust configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        pipes: [
          {
            type: 'circular',
            nodesFilter: (node) => node.id <= 4
          },
          {
            type: 'grid',
            nodesFilter: (node) => node.id > 4
          }],
        adjust: 'circular'
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
      modes: {
        default: ['drag-canvas', 'zoom-canvas']
      }
    });
    graph.data(data);
    graph.render();

    graph.on('afterlayout', () => {
      const firstNode = graph.getNodes()[0].getModel();
      expect(mathEqual(firstNode.x, 677)).toEqual(true);
      expect(mathEqual(firstNode.y, 399)).toEqual(true);
      // graph.destroy();
    });
  });
});
