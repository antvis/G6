import { combo } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';
import { type Graph } from '@antv/g6';

describe('combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(combo, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('collapse circle combo', async () => {
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
    const collapseCombo = async () => {
      graph.updateComboData([
        {
          id: 'combo-2',
          style: {
            collapsed: true,
            collapsedMarker: false,
          },
        },
      ]);
      await graph.render();
    };
    await collapseCombo();
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-center');
    await expandCombo();
  });

  it('collapse rect combo', async () => {
    const expandCombo = async () => {
      graph.updateComboData([
        {
          id: 'combo-1',
          type: 'rect',
          style: {
            collapsed: false,
          },
        },
      ]);
      await graph.render();
    };
    const collapseCombo = async () => {
      graph.updateComboData([
        {
          id: 'combo-1',
          type: 'rect',
          style: {
            collapsed: true,
            collapsedMarker: false,
          },
        },
      ]);
      await graph.render();
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
