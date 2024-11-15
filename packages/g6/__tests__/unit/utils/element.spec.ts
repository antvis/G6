import { Polyline } from '@/src/elements/edges';
import { Circle } from '@/src/elements/nodes';
import { ID, PortStyleProps } from '@/src/types';
import {
  findPorts,
  getAllPorts,
  getBoundingPoints,
  getHexagonPoints,
  getPortConnectionPoint,
  getPortXYByPlacement,
  getStarPoints,
  getStarPorts,
  getTextStyleByPlacement,
  getTrianglePoints,
  getTrianglePorts,
  isEdge,
  isElement,
  isNode,
  isSameNode,
  isSimplePort,
  isVisible,
  updateStyle,
} from '@/src/utils/element';
import { getXYByPlacement } from '@/src/utils/position';
import { AABB, DisplayObject, Line, Rect } from '@antv/g';

describe('element', () => {
  const bbox = new AABB();
  bbox.setMinMax([100, 100, 0], [200, 200, 0]);

  const node1 = new Circle({
    id: 'node-1',
  });

  const node2 = new Circle({
    id: 'node-2',
  });

  const context: any = {
    element: {
      getElement(id: ID) {
        if (id === 'node-1') return node1;
        else return node2;
      },
    },
  };

  const edge = new Polyline({ style: { sourceNode: 'node-1', targetNode: 'node-2' }, context });

  it('isNode', () => {
    const rect = new Rect({ style: { width: 10, height: 10 } });
    expect(isNode(rect)).toBe(false);
    expect(isElement(rect)).toBe(false);
    const node = new Circle({});
    expect(isNode(node)).toBe(true);
    expect(isElement(node)).toBe(true);
  });

  it('isEdge', () => {
    const line = new Line({ style: { x1: 0, y1: 0, x2: 10, y2: 10 } });
    expect(isEdge(line)).toBe(false);
    expect(isElement(line)).toBe(false);
    expect(isEdge(edge)).toBe(true);
    expect(isElement(edge)).toBe(true);
  });

  it('isSameNode', () => {
    expect(isSameNode(node1, undefined!)).toBeFalsy();
    expect(isSameNode(node1, node2)).toBeFalsy();
    expect(isSameNode(node1, node1)).toBeTruthy();
  });

  it('getXYByPlacement', () => {
    expect(getXYByPlacement(bbox, 'left')).toEqual([100, 150]);
    expect(getXYByPlacement(bbox, 'right')).toEqual([200, 150]);
    expect(getXYByPlacement(bbox, 'top')).toEqual([150, 100]);
    expect(getXYByPlacement(bbox, 'bottom')).toEqual([150, 200]);

    expect(getXYByPlacement(bbox, 'left-top')).toEqual([100, 100]);
    expect(getXYByPlacement(bbox, 'right-bottom')).toEqual([200, 200]);

    expect(getXYByPlacement(bbox, 'center')).toEqual([150, 150]);

    expect(getXYByPlacement(bbox)).toEqual([150, 150]);
  });

  it('getPortXYByPlacement', () => {
    expect(getPortXYByPlacement(bbox, 'left')).toEqual([100, 150]);
    expect(getPortXYByPlacement(bbox, 'right')).toEqual([200, 150]);
    expect(getPortXYByPlacement(bbox, 'top')).toEqual([150, 100]);
    expect(getPortXYByPlacement(bbox, 'bottom')).toEqual([150, 200]);

    expect(getPortXYByPlacement(bbox)).toEqual([150, 150]);

    expect(getPortXYByPlacement(bbox, [0.5, 1])).toEqual([150, 200]);
    expect(getPortXYByPlacement(bbox, [0, 0.5])).toEqual([100, 150]);
  });

  it('getAllPorts', () => {
    const node = new Circle({
      style: {
        x: 0,
        y: 0,
        size: 100,
        port: true,
        ports: [
          { key: 'left', placement: [0, 0.5], r: 4 },
          { key: 'right', placement: [1, 0.5] },
        ],
      },
    });
    expect(Object.values(getAllPorts(node)).length).toBe(2);
    expect(getAllPorts(node)['right']).toEqual([50, 0]);
  });

  it('isSimplePort', () => {
    expect(
      isSimplePort({
        placement: 'left',
      }),
    ).toBeTruthy();
    expect(
      isSimplePort({
        placement: 'left',
        r: 0,
      }),
    ).toBeTruthy();
    expect(
      isSimplePort({
        placement: 'left',
        r: 4,
      }),
    ).toBeFalsy();
  });

  it('findPorts', () => {
    const sourceNode = new Circle({
      id: 'source',
      style: {
        port: true,
        ports: [{ key: 'left', placement: [0, 0.5], r: 4 }],
      },
    });
    const targetNode = new Circle({
      id: 'target',
      style: {
        port: true,
        ports: [{ key: 'top', placement: [0.5, 0], r: 4 }],
      },
    });
    const sourcePortKey = 'left';
    const targetPortKey = 'top';
    const [sourcePort, targetPort] = findPorts(sourceNode, targetNode, sourcePortKey, targetPortKey);
    expect((sourcePort as DisplayObject<PortStyleProps>).className).toEqual('port-left');
    expect((targetPort as DisplayObject<PortStyleProps>).className).toEqual('port-top');
  });

  it('getPortConnectionPoint', () => {
    const node = new Circle({
      id: 'source',
      style: {
        x: 100,
        y: 100,
        port: true,
        ports: [{ key: 'left', placement: [0, 0.5], r: 4 }],
        portLinkToCenter: true,
      },
    });
    expect(getPortConnectionPoint(node.getPorts()['left'], [0, 0])).toEqual([84, 100, 0]);
  });

  it('getTextStyleByPlacement', () => {
    expect(getTextStyleByPlacement(bbox, 'left')).toEqual({
      transform: [['translate', 100, 150]],
      textAlign: 'right',
      textBaseline: 'middle',
    });
    expect(getTextStyleByPlacement(bbox, 'right')).toEqual({
      transform: [['translate', 200, 150]],
      textAlign: 'left',
      textBaseline: 'middle',
    });
    expect(getTextStyleByPlacement(bbox, 'top')).toEqual({
      transform: [['translate', 150, 100]],
      textAlign: 'center',
      textBaseline: 'bottom',
    });
    expect(getTextStyleByPlacement(bbox, 'bottom')).toEqual({
      transform: [['translate', 150, 200]],
      textAlign: 'center',
      textBaseline: 'top',
    });

    expect(getTextStyleByPlacement(bbox, 'left-top')).toEqual({
      transform: [['translate', 100, 100]],
      textAlign: 'right',
      textBaseline: 'bottom',
    });
    expect(getTextStyleByPlacement(bbox, 'right-bottom')).toEqual({
      transform: [['translate', 200, 200]],
      textAlign: 'left',
      textBaseline: 'top',
    });

    expect(getTextStyleByPlacement(bbox, 'center')).toEqual({
      transform: [['translate', 150, 150]],
      textAlign: 'center',
      textBaseline: 'middle',
    });

    expect(getTextStyleByPlacement(bbox)).toEqual({
      transform: [['translate', 150, 200]],
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

  it('getBoundingPoints', () => {
    expect(getBoundingPoints(100, 100).length).toBe(4);
    expect(getBoundingPoints(100, 100)).toEqual([
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

  it('getHexagonPoints', () => {
    expect(getHexagonPoints(32).length).toBe(6);
  });
});
