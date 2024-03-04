import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import { commonGraph } from '@@/demo/case/common-graph';
import { createDemoGraph } from '@@/utils';

describe('Graph', () => {
  let graph: Graph;
  beforeAll(async () => {
    graph = await createDemoGraph(commonGraph);
  });
  const idOf = (d: any) => d.id;

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

  it('getSize', () => {
    expect(graph.getSize()).toEqual([500, 500]);
  });

  it('getTheme', () => {
    expect(graph.getTheme()).toEqual('light');
  });

  it('getLayout', () => {
    expect(graph.getLayout()).toEqual({ type: 'd3force' });
  });

  it('getBehaviors/setBehaviors', () => {
    expect(graph.getBehaviors()).toEqual(['zoom-canvas', 'drag-canvas']);
    graph.setBehaviors(['drag-canvas']);
    expect(graph.getBehaviors()).toEqual(['drag-canvas']);
  });

  it('getWidgets/setWidgets', () => {
    expect(graph.getWidgets()).toEqual([]);
    graph.setWidgets([{ type: 'test' }]);
    expect(graph.getWidgets()).toEqual([{ type: 'test' }]);
    graph.setWidgets([]);
  });

  it('updateData/getData/setData', () => {
    expect(graph.getData()).toEqual({ combos: [], ...data });

    graph.setData({
      nodes: [{ id: 'node-1' }, { id: 'node-2' }],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    });
    expect(graph.getData()).toEqual({
      nodes: [{ id: 'node-1' }, { id: 'node-2' }],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      combos: [],
    });

    graph.updateData({ edges: [{ id: 'edge-1', style: { lineWidth: 5 } }] });
    expect(graph.getData()).toEqual({
      nodes: [{ id: 'node-1' }, { id: 'node-2' }],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', style: { lineWidth: 5 } }],
      combos: [],
    });
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
      { id: 'node-3', style: { parentId: 'combo-1' } },
      { id: 'node-4', style: { parentId: 'combo-1' } },
    ]);
    graph.addEdgeData([{ id: 'edge-2', source: 'node-3', target: 'node-4' }]);
    expect(graph.getNodeData().map(idOf)).toEqual(['node-1', 'node-2', 'node-3', 'node-4']);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1', 'edge-2']);
    expect(graph.getComboData('combo-1').id).toEqual('combo-1');
    expect(graph.getComboData(['combo-1']).map(idOf)).toEqual(['combo-1']);
    expect(graph.getComboData().map(idOf)).toEqual(['combo-1']);
    expect(graph.getComboChildrenData('combo-1').map(idOf)).toEqual(['node-3', 'node-4']);
    graph.updateNodeData([{ id: 'node-3', style: { x: 100, y: 100 } }]);
    graph.updateEdgeData([{ id: 'edge-2', style: { lineWidth: 10 } }]);
    graph.updateComboData([{ id: 'combo-1', style: { stroke: 'red' } }]);
    expect(graph.getNodeData()).toEqual([
      { id: 'node-1' },
      { id: 'node-2' },
      { id: 'node-3', style: { x: 100, y: 100, parentId: 'combo-1' } },
      { id: 'node-4', style: { parentId: 'combo-1' } },
    ]);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1', 'edge-2']);
    expect(graph.getComboData()).toEqual([{ id: 'combo-1', style: { stroke: 'red' } }]);
    graph.removeComboData(['combo-1']);
    graph.removeNodeData(['node-3', 'node-4']);
    expect(graph.getNodeData().map(idOf)).toEqual(['node-1', 'node-2']);
    expect(graph.getEdgeData().map(idOf)).toEqual(['edge-1']);
    expect(graph.getComboData()).toEqual([]);
  });

  it('draw', async () => {
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__before-draw');
    await graph.draw();
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__after-draw');
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
    expect(graph.getNeighborNodesData('node-1')).toEqual([{ id: 'node-2' }]);
  });

  it('getParentData', () => {
    expect(graph.getParentData('node-1')).toBeUndefined();
  });

  it('getElementRenderBounds', () => {
    const renderBounds = graph.getElementRenderBounds('node-1');
    // the default size of the node is 32
    expect(renderBounds.min).toEqual([-16, -16, 0]);
    expect(renderBounds.max).toEqual([16, 16, 0]);
  });

  it('setElementState/getElementState/getElementDataByState', () => {
    graph.setElementState('node-1', ['selected']);
    expect(graph.getElementState('node-1')).toEqual(['selected']);
    expect(graph.getElementState('node-2')).toEqual([]);
    expect(graph.getElementDataByState('node', 'selected')).toEqual([{ id: 'node-1' }]);
  });

  it('setElementZIndex/getElementZIndex', () => {
    graph.setElementZIndex('node-1', 'front');
    expect(graph.getElementZIndex('node-1')).toBe(1);
    expect(graph.getElementZIndex('node-2')).toBe(0);
  });

  it('setElementVisibility/getElementVisibility', () => {
    graph.setElementVisibility('node-1', 'hidden');
    expect(graph.getElementVisibility('node-1')).toBe('hidden');
    expect(graph.getElementVisibility('node-2')).toBe('visible');
    graph.setElementVisibility('node-1', 'visible');
    expect(graph.getElementVisibility('node-1')).toBe('visible');
  });

  it('layout', async () => {
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__before-layout');
    await graph.layout();
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__after-layout');
    expect(graph.getElementPosition('node-1')).toBeDefined();
  });

  it('translateBy/translateTo', async () => {
    const [px, py] = graph.getPosition();
    graph.translateBy([100, 100]);
    expect(graph.getPosition()).toBeCloseTo([px + 100, py + 100]);
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__after-translate');
    graph.translateTo([0, 0]);
    expect(graph.getPosition()).toBeCloseTo([px, py]);
  });

  it('zoomTo/zoomBy', async () => {
    const zoom = graph.getZoom();
    expect(zoom).toBeCloseTo(1);
    graph.zoomTo(2);
    expect(graph.getZoom()).toBeCloseTo(2);
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__after-zoom-2');
    graph.zoomBy(0.5);
    expect(graph.getZoom()).toBeCloseTo(1);
  });

  it('rotateTo/rotateBy', async () => {
    const rotate = graph.getRotation();
    expect(rotate).toBeCloseTo(0);
    graph.rotateTo(90);
    expect(graph.getRotation()).toBeCloseTo(90);
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__after-rotate-90');
    graph.rotateBy(-90);
    expect(graph.getRotation()).toBeCloseTo(0);
  });

  it('translateElementTo/translateElementBy', async () => {
    const [px, py] = graph.getElementPosition('node-1');
    graph.translateElementBy({ 'node-1': [100, 100] }, false);
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__after-translate-node-1');
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
    const url = await graph.toDataURL();
    expect(url).toBeDefined();
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
    expect(graph.context).toBeUndefined();
    expect(graph.destroyed).toBe(true);
  });
});
