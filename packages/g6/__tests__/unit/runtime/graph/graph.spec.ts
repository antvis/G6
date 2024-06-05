import { commonGraph } from '@/__tests__/demos/common-graph';
import { Graph, idOf } from '@/src';
import data from '@@/dataset/cluster.json';
import { createDemoGraph } from '@@/utils';

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

  it('setBackground/getBackground', () => {
    expect(graph.getBackground()).toEqual('#ffffff');
  });

  it('getSize', () => {
    expect(graph.getSize()).toEqual([500, 500]);
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
        { id: 'node-1', data: {}, style: {} },
        { id: 'node-2', data: {}, style: {} },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: {}, style: {} }],
      combos: [],
    });

    graph.updateData({ edges: [{ id: 'edge-1', style: { lineWidth: 5 } }] });
    expect(graph.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: {}, style: {} },
        { id: 'node-2', data: {}, style: {} },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: {}, style: { lineWidth: 5 } }],
      combos: [],
    });
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

    graph.addComboData([{ id: 'combo-1', style: {} }]);
    graph.addNodeData([
      { id: 'node-3', combo: 'combo-1' },
      { id: 'node-4', combo: 'combo-1' },
    ]);
    graph.addEdgeData([{ id: 'edge-2', source: 'node-3', target: 'node-4' }]);
    expect(graph.getNodeData().map(idOf)).toEqual(['node-1', 'node-2', 'node-3', 'node-4']);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1', 'edge-2']);
    expect(graph.getComboData('combo-1').id).toEqual('combo-1');
    expect(graph.getComboData(['combo-1']).map(idOf)).toEqual(['combo-1']);
    expect(graph.getComboData().map(idOf)).toEqual(['combo-1']);
    expect(graph.getChildrenData('combo-1').map(idOf)).toEqual(['node-3', 'node-4']);
    graph.updateNodeData([{ id: 'node-3', style: { x: 100, y: 100 } }]);
    graph.updateEdgeData([{ id: 'edge-2', style: { lineWidth: 10 } }]);
    graph.updateComboData([{ id: 'combo-1', style: { stroke: 'red' } }]);
    expect(graph.getNodeData()).toEqual([
      { id: 'node-1', data: {}, style: {} },
      { id: 'node-2', data: {}, style: {} },
      { id: 'node-3', data: {}, combo: 'combo-1', style: { x: 100, y: 100 } },
      { id: 'node-4', data: {}, combo: 'combo-1', style: {} },
    ]);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1', 'edge-2']);
    expect(graph.getComboData()).toEqual([{ id: 'combo-1', data: {}, style: { stroke: 'red' } }]);
    graph.removeComboData(['combo-1']);
    graph.removeNodeData(['node-3', 'node-4']);
    expect(graph.getNodeData().map(idOf)).toEqual(['node-1', 'node-2']);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1']);
    expect(graph.getComboData()).toEqual([]);
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
    expect(graph.getNeighborNodesData('node-1')).toEqual([{ id: 'node-2', data: {}, style: {} }]);
  });

  it('getParentData', () => {
    expect(graph.getParentData('node-1', 'combo')).toBeUndefined();
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
      { id: 'node-1', data: {}, style: {}, states: ['selected'] },
    ]);
  });

  it('setElementZIndex/getElementZIndex', async () => {
    await graph.setElementZIndex('node-1', 2);
    expect(graph.getElementZIndex('node-1')).toBe(2);
    await graph.setElementZIndex({ 'node-1': 0 });
    expect(graph.getElementZIndex('node-1')).toBe(0);

    await graph.frontElement('node-1');
    expect(graph.getElementZIndex('node-1')).toBe(1);
    expect(graph.getElementZIndex('node-2')).toBe(0);
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
    graph.translateBy([100, 100]);
    expect(graph.getPosition()).toBeCloseTo([px + 100, py + 100]);
    await expect(graph).toMatchSnapshot(__filename, 'after-translate');
    graph.translateTo([0, 0]);
    expect(graph.getPosition()).toBeCloseTo([px, py]);
  });

  it('zoomTo/zoomBy', async () => {
    const zoom = graph.getZoom();
    expect(zoom).toBeCloseTo(1);
    graph.zoomTo(2);
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
    expect(graph.getCanvasByViewport([250, 250])).toBeCloseTo([250, 250]);
  });

  it('getViewportByCanvas', () => {
    expect(graph.getViewportByCanvas([250, 250])).toBeCloseTo([250, 250]);
  });

  it('getClientByCanvas', () => {
    expect(graph.getClientByCanvas([250, 250])).toBeCloseTo([250, 250]);
  });

  it('getCanvasByClient', () => {
    expect(graph.getCanvasByClient([250, 250])).toBeCloseTo([250, 250]);
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
