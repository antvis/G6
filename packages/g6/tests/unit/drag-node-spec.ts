import G6 from '../../src/index';
import { DragNodeOptions } from '../../src/stdlib/behavior/drag-node';
import { IGraph } from '../../src/types';
import { Behavior } from '../../src/types/behavior';
import { extend } from '../../src/util/extend';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);

const createGraph = (dragNodeOptions: DragNodeOptions): IGraph => {
  return new G6.Graph({
    container,
    width: 500,
    height: 500,
    type: 'graph',
    data: {
      nodes: [
        { id: 'node1', data: { x: 100, y: 200, keyShape: { fill: '#0f0' } } },
        { id: 'node2', data: { x: 200, y: 250, keyShape: { fill: '#f00' } } },
        { id: 'node3', data: { x: 200, y: 100, keyShape: { fill: '#00f' } } },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: { keyShape: { stroke: '#00f', lineWidth: 5 } },
        },
        {
          id: 'edge2',
          source: 'node1',
          target: 'node3',
          data: { keyShape: { stroke: '#00f', lineWidth: 5 } },
        },
      ],
    },
    nodeState: {
      selected: {
        keyShape: {
          stroke: '#0f0',
          lineWidth: 2,
        },
      },
      highlight: {
        keyShape: {
          stroke: '#00f',
          r: 30,
          opacity: 0.5,
        },
      },
    },
    modes: {
      default: [
        {
          type: 'drag-node',
          key: '1',
          ...dragNodeOptions,
        },
      ],
    },
  });
};

describe('drag-node', () => {
  test('move single node', (done) => {
    const graph = createGraph({});
    graph.on('afterlayout', () => {
      graph.emit('node:pointerdown', {
        itemId: 'node1',
        client: { x: 100, y: 200 },
      });
      graph.emit('pointermove', { client: { x: 250, y: 350 } });
      graph.emit('pointerup', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(250);
      expect(graph.getNodeData('node1').data.y).toEqual(350);
      done();
    });
  });

  test('move multiple selected nodes', (done) => {
    const graph = createGraph({});
    graph.on('afterlayout', () => {
      graph.setItemState(['node1', 'node2'], 'selected', true);
      graph.emit('node:pointerdown', {
        itemId: 'node1',
        client: { x: 100, y: 200 },
      });
      graph.emit('pointermove', { client: { x: 250, y: 350 } });
      graph.emit('pointerup', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(250);
      expect(graph.getNodeData('node1').data.y).toEqual(350);
      expect(graph.getNodeData('node2').data.x).toEqual(350);
      expect(graph.getNodeData('node2').data.y).toEqual(400);
      done();
    });
  });

  test('enableTransient: true', (done) => {
    const graph = createGraph({});
    graph.on('afterlayout', () => {
      graph.hideItem('edge2');
      graph.emit('node:pointerdown', {
        itemId: 'node1',
        client: { x: 100, y: 200 },
      });

      // Should NOT update position while dragging.
      graph.emit('pointermove', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(100);
      expect(graph.getNodeData('node1').data.y).toEqual(200);
      expect(graph.getItemVisible('node1')).toBe(false);
      expect(graph.getItemVisible('edge1')).toBe(false);
      expect(graph.getItemVisible('edge2')).toBe(false);
      // @ts-ignore
      expect(
        graph.itemController.transientItemMap['node1'].model.data.x,
      ).toEqual(250);
      // @ts-ignore
      expect(
        graph.itemController.transientItemMap['node1'].model.data.y,
      ).toEqual(350);

      // Should update position when drag ends.
      graph.emit('pointerup', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(250);
      expect(graph.getNodeData('node1').data.y).toEqual(350);
      expect(graph.getItemVisible('node1')).toBe(true);
      expect(graph.getItemVisible('edge1')).toBe(true);
      // edge2 should NOT be visible, because it's hidden before dragging.
      expect(graph.getItemVisible('edge2')).toBe(false);
      // @ts-ignore
      expect(graph.itemController.transientItemMap).toEqual({});

      done();
    });
  });

  test('enableTransient: false', (done) => {
    const graph = createGraph({
      enableTransient: false,
    });
    graph.on('afterlayout', () => {
      graph.emit('node:pointerdown', {
        itemId: 'node1',
        client: { x: 100, y: 200 },
      });

      // Update positions immediately while dragging.
      graph.emit('pointermove', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(250);
      expect(graph.getNodeData('node1').data.y).toEqual(350);
      expect(graph.getItemVisible('node1')).toBe(true);
      expect(graph.getItemVisible('edge1')).toBe(true);
      // @ts-ignore
      expect(graph.itemController.transientItemMap).toEqual({});

      graph.emit('pointerup', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(250);
      expect(graph.getNodeData('node1').data.y).toEqual(350);

      done();
    });
  });

  test('enableDelegate: true', (done) => {
    const graph = createGraph({
      enableDelegate: true,
    });
    graph.on('afterlayout', () => {
      graph.emit('node:pointerdown', {
        itemId: 'node1',
        client: { x: 100, y: 200 },
      });

      // Should NOT update position while dragging.
      graph.emit('pointermove', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(100);
      expect(graph.getNodeData('node1').data.y).toEqual(200);
      expect(graph.getItemVisible('node1')).toBe(true);
      expect(graph.getItemVisible('edge1')).toBe(true);
      // @ts-ignore
      expect(graph.itemController.transientObjectMap).toHaveProperty(
        'g6-drag-node-delegate-shape',
      );

      // Should update position when drag ends.
      graph.emit('pointerup', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(250);
      expect(graph.getNodeData('node1').data.y).toEqual(350);
      expect(graph.getItemVisible('node1')).toBe(true);
      expect(graph.getItemVisible('edge1')).toBe(true);
      // @ts-ignore
      expect(graph.itemController.transientObjectMap).toEqual({});

      done();
    });
  });

  test('hideRelatedEdges: true', (done) => {
    const graph = createGraph({
      enableTransient: false,
      hideRelatedEdges: true,
    });
    graph.on('afterlayout', () => {
      // Hides related edges after pointerdown.
      graph.emit('node:pointerdown', {
        itemId: 'node1',
        client: { x: 100, y: 200 },
      });
      expect(graph.getItemVisible('edge1')).toBe(false);

      // Update positions immediately while dragging.
      graph.emit('pointermove', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(250);
      expect(graph.getNodeData('node1').data.y).toEqual(350);

      // Restores related edges after pointerup.
      graph.emit('pointerup', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(250);
      expect(graph.getNodeData('node1').data.y).toEqual(350);
      expect(graph.getItemVisible('edge1')).toBe(true);

      done();
    });
  });

  test('debounce', (done) => {
    const graph = createGraph({
      debounce: 100,
      enableTransient: false,
    });
    graph.on('afterlayout', async () => {
      graph.emit('node:pointerdown', {
        itemId: 'node1',
        client: { x: 100, y: 200 },
      });

      // Move nodes after 100ms.
      graph.emit('pointermove', { client: { x: 250, y: 350 } });
      expect(graph.getNodeData('node1').data.x).toEqual(100);
      expect(graph.getNodeData('node1').data.y).toEqual(200);

      await new Promise((resolve) => setTimeout(resolve, 120));
      expect(graph.getNodeData('node1').data.x).toEqual(250);
      expect(graph.getNodeData('node1').data.y).toEqual(350);

      graph.emit('pointerup', { client: { x: 250, y: 350 } });
      done();
    });
  });

  test('abort dragging by press esc', (done) => {
    const graph = createGraph({
      enableTransient: false,
    });
    graph.on('afterlayout', () => {
      graph.emit('node:pointerdown', {
        itemId: 'node1',
        client: { x: 100, y: 200 },
      });
      graph.emit('pointermove', { client: { x: 250, y: 350 } });
      graph.emit('keydown', { key: 'Esc' });

      expect(graph.getNodeData('node1').data.x).toEqual(100);
      expect(graph.getNodeData('node1').data.y).toEqual(200);

      done();
    });
  });
});
