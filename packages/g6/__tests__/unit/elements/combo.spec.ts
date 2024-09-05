import type { Graph } from '@/src';
import { elementCombo } from '@@/demos';
import { createDemoGraph, createGraph } from '@@/utils';

describe('combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementCombo, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('collapse circle combo', async () => {
    const expandCombo = async () => {
      await graph.expandElement('combo-2');
    };
    const collapseCombo = async () => {
      graph.updateComboData([
        {
          id: 'combo-2',
          style: {
            collapsedMarker: false,
          },
        },
      ]);
      await graph.collapseElement('combo-2');
    };
    await collapseCombo();
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-center');
    await expandCombo();
  });

  it('collapse rect combo', async () => {
    const expandCombo = async () => {
      await graph.expandElement('combo-1');
    };
    const collapseCombo = async () => {
      graph.updateComboData([
        {
          id: 'combo-1',
          type: 'rect',
          style: {
            collapsedMarker: false,
          },
        },
      ]);
      await graph.collapseElement('combo-1');
    };

    await collapseCombo();
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-center');
    await expandCombo();
  });

  it('collapse combo with collapsed marker', async () => {
    const expandCombo = async () => {
      graph.updateComboData([
        {
          id: 'combo-2',
          style: {
            collapsed: false,
          },
        },
      ]);
      await graph.render();
    };
    const collapseCombo = async (type: any | ((children: any) => string)) => {
      graph.updateComboData([
        {
          id: 'combo-2',
          style: {
            collapsed: true,
            collapsedMarker: true,
            collapsedMarkerType: type,
          },
        },
      ]);
      graph.render();
    };
    await collapseCombo('child-count');
    await expect(graph).toMatchSnapshot(__filename, 'circle-marker-childCount');
    await expandCombo();
    await collapseCombo('descendant-count');
    await expect(graph).toMatchSnapshot(__filename, 'circle-marker-descendantCount');
    await expandCombo();
    await collapseCombo('node-count');
    await expect(graph).toMatchSnapshot(__filename, 'circle-marker-nodeCount');
    await expandCombo();
    await collapseCombo((children: any) => children.length.toString() + 'nodes');
    await expect(graph).toMatchSnapshot(__filename, 'circle-marker-custom');
  });
});

describe('combo drag zIndex', () => {
  it('drag combo will bring related edges forward', async () => {
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', combo: 'combo-2', style: { x: 120, y: 100 } },
          { id: 'node-2', combo: 'combo-1', style: { x: 300, y: 200 } },
          { id: 'node-3', combo: 'combo-1', style: { x: 200, y: 300 } },
        ],
        edges: [
          { id: 'edge-1', source: 'node-1', target: 'node-2' },
          { id: 'edge-2', source: 'node-2', target: 'node-3' },
        ],
        combos: [
          {
            id: 'combo-1',
            type: 'rect',
            combo: 'combo-2',
          },
          {
            id: 'combo-2',
          },
        ],
      },
      edge: {
        style: {
          stroke: 'red',
        },
      },
      combo: {
        style: {
          lineWidth: 1,
          fillOpacity: 1,
          stroke: 'black',
        },
      },
    });

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename, 'combo-zIndex');

    await graph.frontElement('combo-1');

    await expect(graph).toMatchSnapshot(__filename, 'combo-zIndex');

    await graph.frontElement('combo-2');

    await expect(graph).toMatchSnapshot(__filename, 'combo-zIndex');
  });
});

describe('combo with position', () => {
  it('combo with position', async () => {
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', combo: 'combo-1', style: { x: 50, y: 100 } },
          { id: 'node-2', combo: 'combo-2' },
          { id: 'node-3', combo: 'combo-3' },
        ],
        combos: [
          { id: 'combo-1', style: { x: 0, y: 0, collapsed: true } },
          { id: 'combo-2', style: { x: 100, y: 100, collapsed: true } },
          { id: 'combo-3', style: { collapsed: true } },
        ],
      },
      node: {
        style: {
          labelText: (d) => d.id,
        },
      },
      combo: {
        style: {
          labelText: (d) => d.id,
        },
      },
    });

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'combo-with-position');
  });
});
