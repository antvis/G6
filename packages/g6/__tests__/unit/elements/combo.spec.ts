import { type Graph } from '@/src';
import { combo } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(combo, { animation: false });
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('collapse circle combo', async () => {
    const expandCombo = () => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-2',
          style: {
            collapsed: false,
          },
        },
      ]);
      graph.render();
    };
    const collapseCombo = (collapsedOrigin: string) => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-2',
          style: {
            collapsed: true,
            collapsedOrigin,
            collapsedMarker: false,
          },
        },
      ]);
      graph.render();
    };
    collapseCombo('top');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-top');
    expandCombo();
    collapseCombo('right');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-right');
    collapseCombo('left');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-left');
    expandCombo();
    collapseCombo('bottom');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-bottom');
    expandCombo();
    collapseCombo('center');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-center');
    expandCombo();
    collapseCombo('top-left');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-topLeft');
    expandCombo();
    collapseCombo('top-right');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-topRight');
    expandCombo();
    collapseCombo('bottom-left');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-bottomLeft');
    expandCombo();
    collapseCombo('bottom-right');
    await expect(graph).toMatchSnapshot(__filename, 'circle-collapse-bottomRight');
    expandCombo();
  });

  it('collapse rect combo', async () => {
    const expandCombo = () => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-1',
          style: {
            type: 'rect',
            collapsed: false,
          },
        },
      ]);
      graph.render();
    };
    const collapseCombo = (collapsedOrigin: string) => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-1',
          style: {
            type: 'rect',
            collapsed: true,
            collapsedOrigin,
            collapsedMarker: false,
          },
        },
      ]);
      graph.render();
    };
    collapseCombo('top');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-top');
    expandCombo();
    collapseCombo('right');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-right');
    collapseCombo('left');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-left');
    expandCombo();
    collapseCombo('bottom');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-bottom');
    expandCombo();
    collapseCombo('center');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-center');
    expandCombo();
    collapseCombo('top-left');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-topLeft');
    expandCombo();
    collapseCombo('top-right');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-topRight');
    expandCombo();
    collapseCombo('bottom-left');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-bottomLeft');
    expandCombo();
    collapseCombo('bottom-right');
    await expect(graph).toMatchSnapshot(__filename, 'rect-collapse-bottomRight');
    expandCombo();
  });

  it('collapse combo with collapsed marker', async () => {
    const expandCombo = () => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-2',
          style: {
            collapsed: false,
          },
        },
      ]);
      graph.render();
    };
    const collapseCombo = (type: string | ((children: any) => string)) => {
      graph.updateComboData((data) => [
        ...data,
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
    collapseCombo('child-count');
    await expect(graph).toMatchSnapshot(__filename, 'circle-marker-childCount');
    expandCombo();
    collapseCombo('descendant-count');
    await expect(graph).toMatchSnapshot(__filename, 'circle-marker-descendantCount');
    expandCombo();
    collapseCombo('node-count');
    await expect(graph).toMatchSnapshot(__filename, 'circle-marker-nodeCount');
    expandCombo();
    collapseCombo((children: any) => children.length.toString() + 'nodes');
    await expect(graph).toMatchSnapshot(__filename, 'circle-marker-custom');
  });
});
