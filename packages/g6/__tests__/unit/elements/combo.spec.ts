import { combo } from '@/__tests__/demos';
import { type Graph } from '@/src';
import { createDemoGraph } from '@@/utils';

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
    const collapseCombo = async (collapsedOrigin: any) => {
      graph.updateComboData([
        {
          id: 'combo-2',
          style: {
            collapsed: true,
            collapsedOrigin,
            collapsedMarker: false,
          },
        },
      ]);
      await graph.render();
    };
    await collapseCombo('top');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-top');
    await expandCombo();
    await collapseCombo('right');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-right');
    await collapseCombo('left');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-left');
    await expandCombo();
    await collapseCombo('bottom');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-bottom');
    await expandCombo();
    await collapseCombo('center');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-center');
    await expandCombo();
    await collapseCombo('top-left');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-topLeft');
    await expandCombo();
    await collapseCombo('top-right');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-topRight');
    await expandCombo();
    await collapseCombo('bottom-left');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-bottomLeft');
    await expandCombo();
    await collapseCombo('bottom-right');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-bottomRight');
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
    const collapseCombo = async (collapsedOrigin: any) => {
      graph.updateComboData([
        {
          id: 'combo-1',
          type: 'rect',
          style: {
            collapsed: true,
            collapsedOrigin,
            collapsedMarker: false,
          },
        },
      ]);
      await graph.render();
    };
    await collapseCombo('top');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-top');
    await expandCombo();
    await collapseCombo('right');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-right');
    await collapseCombo('left');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-left');
    await expandCombo();
    await collapseCombo('bottom');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-bottom');
    await expandCombo();
    await collapseCombo('center');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-center');
    await expandCombo();
    await collapseCombo('top-left');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-topLeft');
    await expandCombo();
    await collapseCombo('top-right');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-topRight');
    await expandCombo();
    await collapseCombo('bottom-left');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-bottomLeft');
    await expandCombo();
    await collapseCombo('bottom-right');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-bottomRight');
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
            collapsedOrigin: 'top',
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
