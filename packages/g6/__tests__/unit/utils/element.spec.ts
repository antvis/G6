import { Polyline } from '@/src/elements/edges';
import { Circle } from '@/src/elements/nodes';
import {
  findPorts,
  getPortConnectionPoint,
  getPortPosition,
  getRectPoints,
  getStarPoints,
  getStarPorts,
  getTextStyleByPosition,
  getTrianglePoints,
  getTrianglePorts,
  getXYByPosition,
  isEdge,
  isNode,
  isSameNode,
  isVisible,
  updateStyle,
} from '@/src/utils/element';
import { AABB, Line, Rect } from '@antv/g';

describe('element', () => {
  const bbox = new AABB();
  bbox.setMinMax([100, 100, 0], [200, 200, 0]);

  const node1 = new Circle({
    id: 'node-1',
  });

  const node2 = new Circle({
    id: 'node-2',
  });

  const edge = new Polyline({ style: { sourceNode: node1, targetNode: node2 } });

  it('isNode', () => {
    expect(isNode(new Rect({ style: { width: 10, height: 10 } }))).toBe(false);
    const node = new Circle({});
    expect(isNode(node)).toBe(true);
  });

  it('isEdge', () => {
    expect(isEdge(new Line({ style: { x1: 0, y1: 0, x2: 10, y2: 10 } }))).toBe(false);
    expect(isEdge(edge)).toBe(true);
  });

  it('isSameNode', () => {
    expect(isSameNode(node1, node2)).toBeFalsy();
    expect(isSameNode(node1, node1)).toBeTruthy();
  });

  it('getXYByPosition', () => {
    expect(getXYByPosition(bbox, 'left')).toEqual([100, 150]);
    expect(getXYByPosition(bbox, 'right')).toEqual([200, 150]);
    expect(getXYByPosition(bbox, 'top')).toEqual([150, 100]);
    expect(getXYByPosition(bbox, 'bottom')).toEqual([150, 200]);

    expect(getXYByPosition(bbox, 'left-top')).toEqual([100, 100]);
    expect(getXYByPosition(bbox, 'right-bottom')).toEqual([200, 200]);

    expect(getXYByPosition(bbox, 'center')).toEqual([150, 150]);

    expect(getXYByPosition(bbox)).toEqual([150, 150]);
  });

  it('getPortPosition', () => {
    expect(getPortPosition(bbox, 'left')).toEqual([100, 150]);
    expect(getPortPosition(bbox, 'right')).toEqual([200, 150]);
    expect(getPortPosition(bbox, 'top')).toEqual([150, 100]);
    expect(getPortPosition(bbox, 'bottom')).toEqual([150, 200]);

    expect(getPortPosition(bbox)).toEqual([150, 150]);

    expect(getPortPosition(bbox, [0.5, 1])).toEqual([150, 200]);
    expect(getPortPosition(bbox, [0, 0.5])).toEqual([100, 150]);
  });

  it('findPorts', () => {
    const sourceNode = new Circle({
      id: 'source',
      style: {
        port: true,
        ports: [{ key: 'left', position: [0, 0.5], r: 4 }],
      },
    });
    const targetNode = new Circle({
      id: 'target',
      style: {
        port: true,
        ports: [{ key: 'top', position: [0.5, 0], r: 4 }],
      },
    });
    const sourcePortKey = 'left';
    const targetPortKey = 'top';
    expect(findPorts(sourceNode, targetNode, sourcePortKey, targetPortKey)[0]?.id).toEqual('port-left');
    expect(findPorts(sourceNode, targetNode, sourcePortKey, targetPortKey)[1]?.id).toEqual('port-top');
  });

  it('getPortConnectionPoint', () => {
    const node = new Circle({
      id: 'source',
      style: {
        x: 100,
        y: 100,
        port: true,
        ports: [{ key: 'left', position: [0, 0.5], r: 4 }],
        portLinkToCenter: true,
      },
    });
    expect(getPortConnectionPoint(node.getPorts()['left'], [0, 0])).toEqual([75, 100, 0]);
  });

  it('getTextStyleByPosition', () => {
    expect(getTextStyleByPosition(bbox, 'left')).toEqual({
      x: 100,
      y: 150,
      textAlign: 'right',
      textBaseline: 'middle',
    });
    expect(getTextStyleByPosition(bbox, 'right')).toEqual({
      x: 200,
      y: 150,
      textAlign: 'left',
      textBaseline: 'middle',
    });
    expect(getTextStyleByPosition(bbox, 'top')).toEqual({
      x: 150,
      y: 100,
      textAlign: 'center',
      textBaseline: 'bottom',
    });
    expect(getTextStyleByPosition(bbox, 'bottom')).toEqual({
      x: 150,
      y: 200,
      textAlign: 'center',
      textBaseline: 'top',
    });

    expect(getTextStyleByPosition(bbox, 'left-top')).toEqual({
      x: 100,
      y: 100,
      textAlign: 'right',
      textBaseline: 'bottom',
    });
    expect(getTextStyleByPosition(bbox, 'right-bottom')).toEqual({
      x: 200,
      y: 200,
      textAlign: 'left',
      textBaseline: 'top',
    });

    expect(getTextStyleByPosition(bbox, 'center')).toEqual({
      x: 150,
      y: 150,
      textAlign: 'center',
      textBaseline: 'middle',
    });

    expect(getTextStyleByPosition(bbox)).toEqual({
      x: 150,
      y: 200,
      textAlign: 'center',
      textBaseline: 'top',
    });
  });

  it('getStarPoints', () => {
    expect(getStarPoints(32, 16).length).toBe(10);
  });

  it('getStarPorts', () => {
    expect(getStarPorts(32, 16).top).toEqual([0, -32]);
  });

  it('getTrianglePoints', () => {
    expect(getTrianglePoints(40, 40, 'up').length).toBe(3);
    expect(getTrianglePoints(40, 40, 'up')).toEqual([
      [-20, 20],
      [20, 20],
      [0, -20],
    ]);
  });

  it('getTrianglePorts', () => {
    const ports = getTrianglePorts(32, 16, 'up');
    expect(ports.default).toEqual([0, -8]);
    expect(ports.left).toEqual([-16, 8]);
    expect(ports.right).toEqual([16, 8]);
    expect(ports.top).toEqual([0, -8]);
    expect(ports.bottom).toBeFalsy();
    expect(getTrianglePorts(32, 16, 'down')).toEqual({
      default: [0, 8],
      left: [-16, -8],
      right: [16, -8],
      bottom: [0, 8],
    });
    expect(getTrianglePorts(32, 16, 'left')).toEqual({
      default: [-16, 0],
      top: [16, -8],
      bottom: [16, 8],
      left: [-16, 0],
    });
    expect(getTrianglePorts(32, 16, 'right')).toEqual({
      default: [16, 0],
      top: [-16, -8],
      bottom: [-16, 8],
      right: [16, 0],
    });
  });

  it('getRectPoints', () => {
    expect(getRectPoints(100, 100).length).toBe(4);
    expect(getRectPoints(100, 100)).toEqual([
      [50, -50],
      [50, 50],
      [-50, 50],
      [-50, -50],
    ]);
  });

  it('isVisible', () => {
    expect(isVisible(new Rect({ style: { width: 50, height: 50 } }))).toBe(true);
    expect(isVisible(new Rect({ style: { width: 50, height: 50, visibility: 'hidden' } }))).toBe(false);
    expect(isVisible(new Rect({ style: { width: 50, height: 50, visibility: 'unset' } }))).toBe(true);
    expect(isVisible(new Rect({ style: { width: 50, height: 50, visibility: 'visible' } }))).toBe(true);
    expect(isVisible(new Rect({ style: { width: 50, height: 50, visibility: 'inherit' } }))).toBe(true);
    expect(isVisible(new Rect({ style: { width: 50, height: 50, visibility: 'initial' } }))).toBe(true);
  });

  it('update', () => {
    const rect = new Rect({ style: { width: 50, height: 50 } });
    updateStyle(rect, { width: 100, height: 100 });
    expect(rect.style.width).toBe(100);
    expect(rect.style.height).toBe(100);

    const circle = new Circle({ style: { size: 50 } });
    updateStyle(circle, { size: 100 });
    expect(circle.style.size).toBe(100);
  });
});
