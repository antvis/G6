import { Graph, idOf } from '@/src';
import data from '@@/dataset/cluster.json';
import { commonGraph } from '@@/demos/common-graph';
import { createDemoGraph, createGraph } from '@@/utils';

describe('Graph', () => {
  let graph: Graph;
  beforeAll(async () => {
    graph = await createDemoGraph(commonGraph, { animation: false });
  });

  it('getOptions/setOptions', () => {
    graph.setOptions({ zoomRange: [-10, 10] });
    expect(graph.getOptions().zoomRange).toEqual([-10, 10]);
  });

  it('setZoomRange/getZoomRange', () => {
    graph.setZoomRange([-5, 5]);
    expect(graph.getZoomRange()).toEqual([-5, 5]);
  });

  it('setNode/getNode', () => {
    const options = graph.getOptions();
    graph.setNode(Object.assign({}, options.node, { state: { selected: { fill: 'pink' } } }));
    expect(graph.getOptions().node!.state!.selected).toEqual({
      fill: 'pink',
    });
  });

  it('setEdge/getEdge', () => {
    const options = graph.getOptions();
    graph.setEdge(Object.assign({}, options.edge, { state: { selected: { stroke: 'pink' } } }));
    expect(graph.getOptions().edge!.state!.selected).toEqual({
      stroke: 'pink',
    });
  });

  it('setCombo/getCombo', () => {
    const options = graph.getOptions();
    graph.setCombo(Object.assign({}, options.combo, { state: { selected: { fill: 'pink' } } }));
    expect(graph.getOptions().combo!.state!.selected).toEqual({
      fill: 'pink',
    });
  });

  it('setSize/getSize', () => {
    expect(graph.getSize()).toEqual([500, 500]);
    expect(createGraph({}).getSize()).toEqual([0, 0]);

    const g = createGraph({ width: 100, height: 50 });
    expect(g.getSize()).toEqual([100, 50]);
    g.setSize(400, 100);
    expect(g.getSize()).toEqual([400, 100]);
  });

  it('setTheme', () => {
    graph.setTheme('light');
    expect(graph.getTheme()).toEqual('light');
  });

  it('getTheme', () => {
    expect(graph.getTheme()).toEqual('light');
  });

  it('getLayout', () => {
    expect(graph.getLayout()).toEqual({ type: 'd3-force' });
  });

  it('getBehaviors/setBehaviors/updateBehavior', () => {
    expect(graph.getBehaviors()).toEqual(['zoom-canvas', 'drag-canvas']);
    graph.setBehaviors(['drag-canvas']);
    expect(graph.getBehaviors()).toEqual(['drag-canvas']);
    graph.setBehaviors([{ key: 'behavior-1', type: 'zoom-canvas', enable: false }]);
    expect(graph.getBehaviors()).toEqual([{ key: 'behavior-1', type: 'zoom-canvas', enable: false }]);
    graph.updateBehavior({ key: 'behavior-1', enable: true });
    expect(graph.getBehaviors()).toEqual([{ key: 'behavior-1', type: 'zoom-canvas', enable: true }]);

    expect(createGraph({}).getBehaviors()).toEqual([]);
  });

  it('getPlugins/setPlugins/updatePlugin', () => {
    expect(graph.getPlugins()).toEqual([]);
    graph.setPlugins([{ type: 'test' }]);
    expect(graph.getPlugins()).toEqual([{ type: 'test' }]);
    graph.setPlugins([{ key: 'plugin-1', type: 'test' }]);
    expect(graph.getPlugins()).toEqual([{ key: 'plugin-1', type: 'test' }]);
    graph.updatePlugin({ key: 'plugin-1', enable: false });
    expect(graph.getPlugins()).toEqual([{ key: 'plugin-1', type: 'test', enable: false }]);
    graph.setPlugins([]);

    const g = createGraph({});
    expect(g.getPlugins()).toEqual([]);
    g.setPlugins([
      { type: 'test', key: 'test' },
      { type: 'test2', key: 'test2' },
    ]);
    g.updatePlugin({ key: 'test', enable: false });
    expect(g.getPlugins()).toEqual([
      { type: 'test', key: 'test', enable: false },
      { type: 'test2', key: 'test2' },
    ]);
  });

  it('getTransforms/setTransforms/updateTransform', () => {
    expect(graph.getTransforms()).toEqual([]);
    graph.setTransforms([{ type: 'flow', key: 'flow-1' }]);
    expect(graph.getTransforms()).toEqual([{ type: 'flow', key: 'flow-1' }]);
    graph.updateTransform({ key: 'flow-1', props1: 'a' });
    expect(graph.getTransforms()).toEqual([{ type: 'flow', key: 'flow-1', props1: 'a' }]);
    graph.setTransforms([
      { type: 'flow', key: 'flow-1' },
      { type: 'flow', key: 'flow-2' },
    ]);
    graph.updateTransform({ key: 'flow-2', props1: 'b' });
    expect(graph.getTransforms()).toEqual([
      { type: 'flow', key: 'flow-1' },
      { type: 'flow', key: 'flow-2', props1: 'b' },
    ]);
    graph.setTransforms([]);
  });

  it('updateData/getData/setData', () => {
    // 调整之后，getData 获取的为当前 graph 最新的数据，而不是初始化时的数据
    // After adjustment, the data obtained by getData is the latest data of the graph, not the data when it is initialized
    const currData = graph.getData();
    expect(currData.nodes?.map(idOf)).toEqual(data.nodes.map(idOf));
    expect(currData.edges?.map(idOf)).toEqual(data.edges.map(idOf));

    graph.setData({
      nodes: [{ id: 'node-1' }, { id: 'node-2' }],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    });
    expect(graph.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: {}, style: { zIndex: 0 } },
        { id: 'node-2', data: {}, style: { zIndex: 0 } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: {}, style: { zIndex: -1 } }],
      combos: [],
    });

    graph.updateData({ edges: [{ id: 'edge-1', style: { lineWidth: 5 } }] });
    expect(graph.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: {}, style: { zIndex: 0 } },
        { id: 'node-2', data: {}, style: { zIndex: 0 } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: {}, style: { lineWidth: 5, zIndex: -1 } }],
      combos: [],
    });
  });

  it('addData/updateData/setData callback', () => {
    const g = createGraph({
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });
    g.updateData((data) => {
      expect(data).toEqual({
        nodes: [
          { id: 'node-1', data: {}, style: { zIndex: 0 } },
          { id: 'node-2', data: {}, style: { zIndex: 0 } },
        ],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: {}, style: { zIndex: -1 } }],
        combos: [],
      });
      return { nodes: [{ id: 'node-1', data: { value: 1 } }] };
    });
    expect(g.getNodeData('node-1')).toEqual({ id: 'node-1', data: { value: 1 }, style: { zIndex: 0 } });
    g.setData((data) => {
      expect(data).toEqual({
        nodes: [
          { id: 'node-1', data: { value: 1 }, style: { zIndex: 0 } },
          { id: 'node-2', data: {}, style: { zIndex: 0 } },
        ],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: {}, style: { zIndex: -1 } }],
        combos: [],
      });
      return { nodes: [], edges: [] };
    });
    g.addData((data) => {
      expect(data).toEqual({
        nodes: [],
        edges: [],
        combos: [],
      });
      return { nodes: [{ id: 'node-1' }] };
    });
    expect(g.getNodeData('node-1')).toEqual({ id: 'node-1', data: {}, style: { zIndex: 0 } });
  });

  it('getElementData', () => {
    expect(graph.getElementData('node-1').id).toEqual('node-1');
    expect(graph.getElementData(['node-1']).map(idOf)).toEqual(['node-1']);
  });

  it('getXxxData/addXxxData/updateXxxData/removeXxxData', () => {
    expect(graph.getNodeData('node-1').id).toEqual('node-1');
    expect(graph.getNodeData(['node-1']).map(idOf)).toEqual(['node-1']);
    expect(graph.getNodeData().map(idOf)).toEqual(['node-1', 'node-2']);
    expect(graph.getEdgeData('edge-1').id).toEqual('edge-1');
    expect(graph.getEdgeData(['edge-1']).map(idOf)).toEqual(['edge-1']);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1']);
    expect(graph.getComboData()).toEqual([]);

    graph.addComboData([{ id: 'combo-2', style: {} }]);
    graph.addComboData([{ id: 'combo-1', combo: 'combo-2', style: {} }]);
    graph.addNodeData([
      { id: 'node-3', combo: 'combo-1' },
      { id: 'node-4', combo: 'combo-1' },
    ]);
    graph.addEdgeData([{ id: 'edge-2', source: 'node-3', target: 'node-4' }]);
    expect(graph.getNodeData().map(idOf)).toEqual(['node-1', 'node-2', 'node-3', 'node-4']);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1', 'edge-2']);
    expect(graph.getComboData('combo-1').id).toEqual('combo-1');
    expect(graph.getComboData(['combo-1']).map(idOf)).toEqual(['combo-1']);
    expect(graph.getComboData()).toEqual([
      { id: 'combo-2', data: {}, style: { zIndex: 0 } },
      { id: 'combo-1', combo: 'combo-2', data: {}, style: { zIndex: 1 } },
    ]);
    expect(graph.getChildrenData('combo-1').map(idOf)).toEqual(['node-3', 'node-4']);
    expect(graph.getDescendantsData('combo-2').map(idOf)).toEqual(['combo-1', 'node-3', 'node-4']);
    graph.removeComboData(['combo-2']);
    graph.updateNodeData([{ id: 'node-3', style: { x: 100, y: 100 } }]);
    graph.updateEdgeData([{ id: 'edge-2', style: { lineWidth: 10 } }]);
    graph.updateComboData([{ id: 'combo-1', style: { stroke: 'red' } }]);
    expect(graph.getNodeData()).toEqual([
      { id: 'node-1', data: {}, style: { zIndex: 0 } },
      { id: 'node-2', data: {}, style: { zIndex: 0 } },
      { id: 'node-3', data: {}, combo: 'combo-1', style: { x: 100, y: 100, zIndex: 2 } },
      { id: 'node-4', data: {}, combo: 'combo-1', style: { zIndex: 2 } },
    ]);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1', 'edge-2']);
    expect(graph.getComboData()).toEqual([{ id: 'combo-1', data: {}, style: { stroke: 'red', zIndex: 1 } }]);
    graph.removeComboData(['combo-1']);
    graph.removeNodeData(['node-3', 'node-4']);
    expect(graph.getNodeData().map(idOf)).toEqual(['node-1', 'node-2']);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1']);
    expect(graph.getComboData()).toEqual([]);
  });

  it('getXxxData/addXxxData/updateXxxData/removeXxxData callback', () => {
    const g = createGraph({
      data: {
        nodes: [{ id: 'node-1' }],
      },
    });
    g.addNodeData((data) => {
      expect(data).toEqual([{ id: 'node-1', data: {}, style: { zIndex: 0 } }]);
      return [{ id: 'node-2' }];
    });
    expect(g.getNodeData().map(idOf)).toEqual(['node-1', 'node-2']);
    g.updateNodeData((data) => {
      expect(data).toEqual([
        { id: 'node-1', data: {}, style: { zIndex: 0 } },
        { id: 'node-2', data: {}, style: { zIndex: 0 } },
      ]);
      return [{ id: 'node-2', style: { x: 100 } }];
    });
    expect(g.getNodeData()).toEqual([
      { id: 'node-1', data: {}, style: { zIndex: 0 } },
      { id: 'node-2', data: {}, style: { x: 100, zIndex: 0 } },
    ]);

    g.addEdgeData((data) => {
      expect(data).toEqual([]);
      return [{ id: 'edge-1', source: 'node-1', target: 'node-2' }];
    });
    expect(g.getEdgeData().map(idOf)).toEqual(['edge-1']);
    g.updateEdgeData((data) => {
      expect(data).toEqual([{ id: 'edge-1', source: 'node-1', target: 'node-2', data: {}, style: { zIndex: -1 } }]);
      return [{ id: 'edge-1', style: { lineWidth: 5, zIndex: 1 } }];
    });
    expect(g.getEdgeData()).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2', data: {}, style: { lineWidth: 5, zIndex: 1 } },
    ]);

    g.addComboData((data) => {
      expect(data).toEqual([]);
      return [{ id: 'combo-1' }];
    });
    expect(g.getComboData().map(idOf)).toEqual(['combo-1']);
    g.updateComboData((data) => {
      expect(data).toEqual([{ id: 'combo-1', data: {}, style: { zIndex: 0 } }]);
      return [{ id: 'combo-1', style: { stroke: 'red' } }];
    });
    expect(g.getComboData()).toEqual([{ id: 'combo-1', data: {}, style: { stroke: 'red', zIndex: 0 } }]);

    g.removeEdgeData((data) => {
      expect(data.length).toBe(1);
      return ['edge-1'];
    });
    expect(g.getEdgeData()).toEqual([]);

    g.removeNodeData((data) => {
      expect(data.length).toBe(2);
      return ['node-1'];
    });
    expect(g.getNodeData().map(idOf)).toEqual(['node-2']);

    g.removeComboData((data) => {
      expect(data.length).toBe(1);
      return ['combo-1'];
    });
    expect(g.getComboData()).toEqual([]);
  });

  it('draw', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'before-draw');
    await graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'after-draw');
    expect(graph.getElementRenderStyle('node-1')).toBeDefined();
  });

  it('getElementType', () => {
    expect(graph.getElementType('node-1')).toEqual('node');
    expect(graph.getElementType('edge-1')).toEqual('edge');
  });

  it('getRelatedEdgesData', () => {
    expect(graph.getRelatedEdgesData('node-1').map(idOf)).toEqual(['edge-1']);

    expect(graph.getRelatedEdgesData('node-1', 'in')).toEqual([]);

    expect(graph.getRelatedEdgesData('node-1', 'out').map(idOf)).toEqual(['edge-1']);
  });

  it('getNeighborNodesData', () => {
    expect(graph.getNeighborNodesData('node-1')).toEqual([{ id: 'node-2', data: {}, style: { zIndex: 0 } }]);
  });

  it('getParentData', () => {
    expect(graph.getParentData('node-1', 'combo')).toBeUndefined();
  });

  it('getAncestors', () => {
    const tree = createGraph({
      data: {
        nodes: [{ id: 'node-1', children: ['node-2'] }, { id: 'node-2', children: ['node-3'] }, { id: 'node-3' }],
      },
    });
    expect(tree.getAncestorsData('node-3', 'tree').map(idOf)).toEqual(['node-2', 'node-1']);
    expect(tree.getAncestorsData('node-2', 'tree').map(idOf)).toEqual(['node-1']);
    expect(tree.getAncestorsData('node-1', 'tree')).toEqual([]);

    const combo = createGraph({
      data: {
        nodes: [
          { id: 'node-1', combo: 'combo-1' },
          { id: 'node-2', combo: 'combo-1' },
        ],
        combos: [{ id: 'combo-1' }, { id: 'combo-2', combo: 'combo-1' }],
      },
    });
    expect(combo.getAncestorsData('node-1', 'combo').map(idOf)).toEqual(['combo-1']);
    expect(combo.getAncestorsData('node-2', 'combo').map(idOf)).toEqual(['combo-1']);
    expect(combo.getAncestorsData('combo-1', 'combo')).toEqual([]);
    expect(combo.getAncestorsData('combo-2', 'combo').map(idOf)).toEqual(['combo-1']);
  });

  it('getElementRenderBounds', () => {
    const renderBounds = graph.getElementRenderBounds('node-1');
    // the default size of the node is 32
    expect(renderBounds.min).toEqual([-16, -16, 0]);
    expect(renderBounds.max).toEqual([16, 16, 0]);
  });

  it('setElementState/getElementState/getElementDataByState', async () => {
    await graph.setElementState('node-2', 'selected');
    expect(graph.getElementState('node-2')).toEqual(['selected']);
    await graph.setElementState('node-2', []);
    expect(graph.getElementState('node-2')).toEqual([]);

    await graph.setElementState({ 'node-1': 'selected' });
    expect(graph.getElementState('node-1')).toEqual(['selected']);
    expect(graph.getElementState('node-2')).toEqual([]);
    expect(graph.getElementDataByState('node', 'selected')).toEqual([
      { id: 'node-1', data: {}, style: { zIndex: 0 }, states: ['selected'] },
    ]);
  });

  it('setElementZIndex/getElementZIndex', async () => {
    await graph.setElementZIndex('node-1', 2);
    expect(graph.getElementZIndex('node-1')).toBe(2);
    await graph.setElementZIndex({ 'node-1': 0 });
    expect(graph.getElementZIndex('node-1')).toBe(0);

    const baseNodeZIndex = 0;
    await graph.frontElement('node-1');
    expect(graph.getElementZIndex('node-1')).toBe(baseNodeZIndex + 1);
    expect(graph.getElementZIndex('node-2')).toBe(baseNodeZIndex);
  });

  it('setElementVisibility/getElementVisibility', async () => {
    await graph.hideElement('node-1');
    expect(graph.getElementVisibility('node-1')).toBe('hidden');
    await graph.showElement('node-1');
    expect(graph.getElementVisibility('node-1')).toBe('visible');

    await graph.setElementVisibility({ 'node-1': 'hidden' });
    expect(graph.getElementVisibility('node-1')).toBe('hidden');
    expect(graph.getElementVisibility('node-2')).toBe('visible');
    await graph.setElementVisibility({ 'node-1': 'visible' });
    expect(graph.getElementVisibility('node-1')).toBe('visible');
  });

  it('layout', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'before-layout');
    await graph.layout();
    await expect(graph).toMatchSnapshot(__filename, 'after-layout');
    expect(graph.getElementPosition('node-1')).toBeDefined();
  });

  it('translateBy/translateTo', async () => {
    const [px, py] = graph.getPosition();
    await graph.translateBy([100, 100]);
    expect(graph.getPosition()).toBeCloseTo([px + 100, py + 100]);
    await expect(graph).toMatchSnapshot(__filename, 'after-translate');
    await graph.translateTo([0, 0]);
    expect(graph.getPosition()).toBeCloseTo([px, py]);
  });

  it('zoomTo/zoomBy', async () => {
    const zoom = graph.getZoom();
    expect(zoom).toBeCloseTo(1);
    await graph.zoomTo(2);
    expect(graph.getZoom()).toBeCloseTo(2);
    await expect(graph).toMatchSnapshot(__filename, 'after-zoom-2');
    graph.zoomBy(0.5);
    expect(graph.getZoom()).toBeCloseTo(1);
  });

  it('rotateTo/rotateBy', async () => {
    const rotate = graph.getRotation();
    expect(rotate).toBeCloseTo(0);
    graph.rotateTo(90);
    expect(graph.getRotation()).toBeCloseTo(90);
    await expect(graph).toMatchSnapshot(__filename, 'after-rotate-90');
    graph.rotateBy(-90);
    expect(graph.getRotation()).toBeCloseTo(0);
  });

  it('translateElementTo/translateElementBy', async () => {
    const [px, py] = graph.getElementPosition('node-1');
    graph.translateElementBy({ 'node-1': [100, 100] }, false);
    await expect(graph).toMatchSnapshot(__filename, 'after-translate-node-1');
    expect(graph.getElementPosition('node-1')).toBeCloseTo([px + 100, py + 100, 0]);
    graph.translateElementTo({ 'node-1': [px, py] }, false);
    expect(graph.getElementPosition('node-1')).toBeCloseTo([px, py, 0]);
  });

  it('getCanvasByViewport', () => {
    expect(graph.getCanvasByViewport([250, 250])).toBeCloseTo([250, 250, 0]);
  });

  it('getViewportByCanvas', () => {
    expect(graph.getViewportByCanvas([250, 250])).toBeCloseTo([250, 250, 0]);
  });

  it('getClientByCanvas', () => {
    expect(graph.getClientByCanvas([250, 250])).toBeCloseTo([250, 250, 0]);
  });

  it('getCanvasByClient', () => {
    expect(graph.getCanvasByClient([250, 250])).toBeCloseTo([250, 250, 0]);
  });

  it('getViewportCenter', () => {
    expect(graph.getViewportCenter()).toBeCloseTo([250, 250, 0]);
  });

  it('toDataURL', async () => {
    expect(await graph.toDataURL()).toBeDefined();
    expect(await graph.toDataURL({ mode: 'overall' })).toBeDefined();
    expect((await graph.toDataURL({ type: 'image/jpeg' })).startsWith('data:image/jpeg')).toBe(true);
    expect((await graph.toDataURL({ type: 'image/png' })).startsWith('data:image/png')).toBe(true);
  });

  it('resize', () => {
    graph.resize(600, 600);
    expect(graph.getSize()).toEqual([600, 600]);
  });

  it('clear/removeData', async () => {
    graph.removeEdgeData(['edge-1']);
    expect(graph.getEdgeData()).toEqual([]);
    graph.removeData({ nodes: ['node-1'] });
    expect(graph.getNodeData().map(idOf)).toEqual(['node-2']);
    await graph.clear();
    expect(graph.getData()).toEqual({ nodes: [], edges: [], combos: [] });
  });

  it('destroy', () => {
    graph.destroy();
    // @ts-expect-error context is private.
    expect(graph.context).toEqual({});
    expect(graph.destroyed).toBe(true);
  });
});
