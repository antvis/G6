import type { AABB, DisplayObject, TextStyleProps } from '@antv/g';
import { get, isString, set } from '@antv/util';
import { BaseCombo, BaseEdge, BaseNode } from '../elements';
import type { Combo, Edge, Element, Node, NodePortStyleProps, Placement, Point, TriangleDirection } from '../types';
import type { NodeLabelStyleProps, Port } from '../types/node';
import { getBBoxHeight, getBBoxWidth } from './bbox';
import { isPoint } from './is';
import { findNearestPoints, getEllipseIntersectPoint } from './point';
import { getXYByPlacement } from './position';

/**
 * <zh/> 判断是否是 Node 的实例
 *
 * <en/> Judge whether the instance is Node
 * @param shape - <zh/> 实例 | <en/> instance
 * @returns <zh/> 是否是 Node 的实例 | <en/> whether the instance is Node
 */
export function isNode(shape: DisplayObject | Port): shape is Node {
  return shape instanceof BaseNode && shape.type === 'node';
}

/**
 * <zh/> 判断是否是 Edge 的实例
 *
 * <en/> Judge whether the instance is Edge
 * @param shape - <zh/> 实例 | <en/> instance
 * @returns <zh/> 是否是 Edge 的实例 | <en/> whether the instance is Edge
 */
export function isEdge(shape: DisplayObject): shape is Edge {
  return shape instanceof BaseEdge;
}

/**
 * <zh/> 判断是否是 Combo 的实例
 *
 * <en/> Judge whether the instance is Combo
 * @param shape - <zh/> 实例 | <en/> instance
 * @returns <zh/> 是否是 Combo 的实例 | <en/> whether the instance is Combo
 */
export function isCombo(shape: any): shape is Combo {
  return shape instanceof BaseCombo;
}

/**
 * <zh/> 判断是否是 Element 的实例
 *
 * <en/> Judge whether the instance is Element
 * @param shape - <zh/> 实例 | <en/> instance
 * @returns <zh/> 是否是 Element 的实例 | <en/> whether the instance is Element
 */
export function isElement(shape: any): shape is Element {
  return isNode(shape) || isEdge(shape) || isCombo(shape);
}

/**
 * <zh/> 判断两个节点是否相同
 *
 * <en/> Whether the two nodes are the same
 * @param node1 - <zh/> 节点1 | <en/> Node1
 * @param node2 - <zh/> 节点2 | <en/> Node2
 * @returns <zh/> 是否相同 | <en/> Whether the same
 */
export function isSameNode(node1: Node, node2: Node): boolean {
  if (!node1 || !node2) return false;
  return node1 === node2;
}

const PORT_MAP: Record<string, Point> = {
  top: [0.5, 0],
  right: [1, 0.5],
  bottom: [0.5, 1],
  left: [0, 0.5],
  default: [0.5, 0.5],
};

/**
 * Get the Port x, y by `position`.
 * @param bbox - BBox of element.
 * @param placement - The position relative with element.
 * @param ports - The map of position.
 * @param isRelative - Whether the position in MAP is relative.
 * @returns [x, y]
 */
export function getPortXYByPlacement(
  bbox: AABB,
  placement?: Placement,
  ports: Record<string, Point> = PORT_MAP,
  isRelative = true,
): Point {
  const DEFAULT = [0.5, 0.5];
  const p: [number, number] = isString(placement) ? get(ports, placement.toLocaleLowerCase(), DEFAULT) : placement;

  if (!isRelative && isString(placement)) return p;

  const [x, y] = p || DEFAULT;
  return [bbox.min[0] + getBBoxWidth(bbox) * x, bbox.min[1] + getBBoxHeight(bbox) * y];
}

/**
 * <zh/> 获取节点上的所有连接桩
 *
 * <en/> Get all ports
 * @param node - <zh/> 节点 | <en/> Node
 * @returns <zh/> 所有连接桩 | <en/> All Ports
 */
export function getAllPorts(node: Node): Record<string, Port> {
  if (!node) return {};
  // 1. 需要绘制的连接桩 | Get the ports that need to be drawn
  const ports = node.getPorts();

  // 2. 不需要额外绘制的连接桩 | Get the ports that do not need to be drawn
  const portsStyle = node.attributes.ports || [];
  portsStyle.forEach((portStyle: NodePortStyleProps, i: number) => {
    const { key, placement } = portStyle;
    if (isSimplePort(portStyle)) {
      ports[key || i] ||= getXYByPlacement(node.getShape('key').getBounds(), placement);
    }
  });
  return ports;
}

/**
 * <zh/> 是否为简单连接桩，如果是则不会额外绘制图形
 *
 * <en/> Whether it is a simple port, which will not draw additional graphics
 * @param portStyle - <zh/> 连接桩样式 | <en/> Port Style
 * @returns <zh/> 是否是简单连接桩 | <en/> Whether it is a simple port
 */
export function isSimplePort(portStyle: NodePortStyleProps): boolean {
  const { r } = portStyle;
  return !r || Number(r) === 0;
}

/**
 * <zh/> 获取连接桩的位置
 *
 * <en/> Get the position of the port
 * @param port - <zh/> 连接桩 | <en/> Port
 * @returns <zh/> 连接桩的位置 | <en/> Port Position
 */
export function getPortPosition(port: Port): Point {
  return isPoint(port) ? port : port.getPosition();
}

/**
 * <zh/> 查找起始连接桩和目标连接桩
 *
 * <en/> Find the source port and target port
 * @param sourceNode - <zh/> 起始节点 | <en/> Source Node
 * @param targetNode - <zh/> 目标节点 | <en/> Target Node
 * @param sourcePortKey - <zh/> 起始连接桩的 key | <en/> Source Port Key
 * @param targetPortKey - <zh/> 目标连接桩的 key | <en/> Target Port Key
 * @returns <zh/> 起始连接桩和目标连接桩 | <en/> Source Port and Target Port
 */
export function findPorts(
  sourceNode: Node,
  targetNode: Node,
  sourcePortKey?: string,
  targetPortKey?: string,
): [Port | undefined, Port | undefined] {
  const sourcePort = findPort(sourceNode, targetNode, sourcePortKey, targetPortKey);
  const targetPort = findPort(targetNode, sourceNode, targetPortKey, sourcePortKey);
  return [sourcePort, targetPort];
}

/**
 * <zh/> 查找节点上的最有可能连接的连接桩
 *
 * <en/> Find the most likely connected port on the node
 * @remarks
 * 1. If `portKey` is specified, return the port.
 * 2. If `portKey` is not specified, return the port closest to the opposite connection points.
 * 3. If the node has no ports, return undefined.
 * @param node - <zh/> 节点 | <en/> Node
 * @param oppositeNode - <zh/> 对端节点 | <en/> Opposite Node
 * @param portKey - <zh/> 连接桩的 key | <en/> Port Key
 * @param oppositePortKey - <zh/> 对端连接桩的 key | <en/> Opposite Port Key
 * @returns <zh/> 连接桩 | <en/> Port
 */
export function findPort(node: Node, oppositeNode: Node, portKey?: string, oppositePortKey?: string): Port | undefined {
  const portsMap = getAllPorts(node);
  if (portKey) return portsMap[portKey];

  const ports = Object.values(portsMap);
  if (ports.length === 0) return undefined;

  const positions = ports.map((port) => getPortPosition(port));
  const oppositePositions = findConnectionPoints(oppositeNode, oppositePortKey);
  const [nearestPosition] = findNearestPoints(positions, oppositePositions);
  return ports.find((port) => getPortPosition(port) === nearestPosition);
}

/**
 * <zh/> 寻找节点上所有可能的连接点
 *
 * <en/> Find all possible connection points on the node
 * @remarks
 * 1. If `portKey` is specified, return the position of the port.
 * 2. If `portKey` is not specified, return positions of all ports.
 * 3. If the node has no ports, return the center of the node.
 * @param node - <zh/> 节点 | <en/> Node
 * @param portKey
 * @returns <zh/> 连接点 | <en/> Connection Point
 */
function findConnectionPoints(node: Node, portKey?: string): Point[] {
  const allPortsMap = getAllPorts(node);
  if (portKey) return [getPortPosition(allPortsMap[portKey])];
  const oppositePorts = Object.values(allPortsMap);
  return oppositePorts.length > 0 ? oppositePorts.map((port) => getPortPosition(port)) : [node.getCenter()];
}

/**
 * <zh/> 获取连接点, 即从节点或连接桩中心到另一端的连线在节点或连接桩边界上的交点
 *
 * <en/> Get the connection point
 * @param node - <zh/> 节点或连接桩 | <en/> Node or Port
 * @param opposite - <zh/> 对端的具体点或节点 | <en/> Opposite Point or Node
 * @returns <zh/> 连接点 | <en/> Connection Point
 */
export function getConnectionPoint(node: Port | Node | Combo, opposite: Node | Port): Point {
  return isCombo(node) || isNode(node)
    ? getNodeConnectionPoint(node, opposite)
    : getPortConnectionPoint(node, opposite);
}

/**
 * <zh/> 获取连接桩的连接点，即从连接桩中心到另一端的连线在连接桩边界上的交点
 *
 * <en/> Get the connection point of the port
 * @param port - <zh/> 连接桩 | <en/> Port
 * @param opposite - <zh/> 对端的具体点或节点 | <en/> Opposite Point or Node
 * @param oppositePort - <zh/> 对端连接桩 | <en/> Opposite Port
 * @returns <zh/> 连接桩的连接点 | <en/> Port Point
 */
export function getPortConnectionPoint(port: Port, opposite: Node | Port): Point {
  if (!port || !opposite) return [0, 0, 0];
  if (isPoint(port)) return port;

  // 1. linkToCenter 为 true，则返回连接桩的中心 | If linkToCenter is true, return the center of the port
  if (port.attributes.linkToCenter) return port.getPosition();

  // 2. 推导对端的具体点：如果是连接桩，则返回连接桩的中心；如果是节点，则返回节点的中心；如果是具体点则直接返回
  // 2. Derive the specific point of the opposite: if it is a port, return the center of the port; if it is a node, return the center of the node; if it is a specific point, return directly
  const oppositePosition = isPoint(opposite)
    ? opposite
    : isNode(opposite)
      ? opposite.getCenter()
      : opposite.getPosition();

  // 3. 返回连接桩边界上的交点 | Return the intersection point on the port boundary
  return getEllipseIntersectPoint(oppositePosition, port.getBounds());
}

/**
 * <zh/> 获取节点的连接点
 *
 * <en/> Get the Node Connection Point
 * @param node - <zh/> 节点 | <en/> Node
 * @param opposite - <zh/> 对端的具体点或节点 | <en/> Opposite Point or Node
 * @param oppositePort - <zh/> 对端连接桩 | <en/> Opposite Port
 * @returns <zh/> 节点的连接点 | <en/> Node Point
 */
export function getNodeConnectionPoint(node: Node, opposite: Node | Port): Point {
  if (!node || !opposite) return [0, 0, 0];
  const oppositePosition = isPoint(opposite)
    ? opposite
    : isNode(opposite)
      ? opposite.getCenter()
      : opposite.getPosition();
  return node.getIntersectPoint(oppositePosition) || node.getCenter();
}

/**
 * Get the Text style by `position`.
 * @param bbox - BBox of element.
 * @param placement - The position relative with element.
 * @param offsetX - The offset x.
 * @param offsetY - The offset y.
 * @param isReverseBaseline - Whether reverse the baseline.
 * @returns Partial<TextStyleProps>
 */
export function getTextStyleByPlacement(
  bbox: AABB,
  placement: NodeLabelStyleProps['placement'] = 'bottom',
  offsetX: number = 0,
  offsetY: number = 0,
  isReverseBaseline = false,
): Partial<TextStyleProps> {
  const direction = placement.split('-');
  const [x, y] = getXYByPlacement(bbox, placement);

  const textAlign = direction.includes('left') ? 'right' : direction.includes('right') ? 'left' : 'center';

  let textBaseline: TextStyleProps['textBaseline'] = direction.includes('top')
    ? 'bottom'
    : direction.includes('bottom')
      ? 'top'
      : 'middle';
  if (isReverseBaseline) {
    textBaseline = textBaseline === 'top' ? 'bottom' : textBaseline === 'bottom' ? 'top' : textBaseline;
  }

  return {
    transform: [['translate', x + offsetX, y + offsetY]],
    textBaseline,
    textAlign,
  };
}

/**
 * <zh/> 获取五角星的顶点
 *
 * <en/> Get Star Points
 * @param outerR - <zh/> 外半径 | <en/> outer radius
 * @param innerR - <zh/> 内半径 | <en/> inner radius
 * @returns <zh/> 五角星的顶点 | <en/> Star Points
 */
export function getStarPoints(outerR: number, innerR: number): Point[] {
  return [
    [0, -outerR],
    [innerR * Math.cos((3 * Math.PI) / 10), -innerR * Math.sin((3 * Math.PI) / 10)],
    [outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)],
    [innerR * Math.cos(Math.PI / 10), innerR * Math.sin(Math.PI / 10)],
    [outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)],
    [0, innerR],
    [-outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)],
    [-innerR * Math.cos(Math.PI / 10), innerR * Math.sin(Math.PI / 10)],
    [-outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)],
    [-innerR * Math.cos((3 * Math.PI) / 10), -innerR * Math.sin((3 * Math.PI) / 10)],
  ];
}

/**
 * Get Star Port Point.
 * @param outerR - outer radius
 * @param innerR - inner radius
 * @returns Port points for Star.
 */
export function getStarPorts(outerR: number, innerR: number): Record<string, Point> {
  const r: Record<string, Point> = {};

  r['top'] = [0, -outerR];

  r['left'] = [-outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)];

  r['left-bottom'] = [-outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)];

  r['bottom'] = [0, innerR];

  r['right-bottom'] = [outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)];

  r['right'] = r['default'] = [outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)];

  return r;
}

/**
 * <zh/> 获取三角形的顶点
 *
 * <en/> Get the points of a triangle
 * @param width - <zh/> 宽度 | <en/> width
 * @param height - <zh/> 高度 | <en/> height
 * @param direction - <zh/> 三角形的方向 | <en/> The direction of the triangle
 * @returns <zh/> 矩形的顶点 | <en/> The points of a rectangle
 */
export function getTrianglePoints(width: number, height: number, direction: TriangleDirection): Point[] {
  const halfHeight = height / 2;
  const halfWidth = width / 2;
  const MAP: Record<TriangleDirection, Point[]> = {
    up: [
      [-halfWidth, halfHeight],
      [halfWidth, halfHeight],
      [0, -halfHeight],
    ],
    left: [
      [-halfWidth, 0],
      [halfWidth, halfHeight],
      [halfWidth, -halfHeight],
    ],
    right: [
      [-halfWidth, halfHeight],
      [-halfWidth, -halfHeight],
      [halfWidth, 0],
    ],
    down: [
      [-halfWidth, -halfHeight],
      [halfWidth, -halfHeight],
      [0, halfHeight],
    ],
  };
  return MAP[direction] || MAP['up'];
}

/**
 * <zh/> 获取三角形的连接桩
 *
 * <en/> Get the Ports of Triangle.
 * @param width - <zh/> 宽度 | <en/> width
 * @param height - <zh/> 高度 | <en/> height
 * @param direction - <zh/> 三角形的方向 | <en/> The direction of the triangle
 * @returns <zh/> 三角形的连接桩 | <en/> The Ports of Triangle
 */
export function getTrianglePorts(width: number, height: number, direction: TriangleDirection): Record<string, Point> {
  const halfHeight = height / 2;
  const halfWidth = width / 2;
  const ports: Record<string, Point> = {};
  if (direction === 'down') {
    ports['bottom'] = ports['default'] = [0, halfHeight];
    ports['right'] = [halfWidth, -halfHeight];
    ports['left'] = [-halfWidth, -halfHeight];
  } else if (direction === 'left') {
    ports['top'] = [halfWidth, -halfHeight];
    ports['bottom'] = [halfWidth, halfHeight];
    ports['left'] = ports['default'] = [-halfWidth, 0];
  } else if (direction === 'right') {
    ports['top'] = [-halfWidth, -halfHeight];
    ports['bottom'] = [-halfWidth, halfHeight];
    ports['right'] = ports['default'] = [halfWidth, 0];
  } else {
    //up
    ports['left'] = [-halfWidth, halfHeight];
    ports['top'] = ports['default'] = [0, -halfHeight];
    ports['right'] = [halfWidth, halfHeight];
  }
  return ports;
}

/**
 * <zh/> 获取矩形的顶点
 *
 * <en/> Get the points of a rectangle
 * @param width - <zh/> 宽度 | <en/> width
 * @param height - <zh/> 高度 | <en/> height
 * @returns <zh/> 矩形的顶点 | <en/> The points of a rectangle
 */
export function getBoundingPoints(width: number, height: number): Point[] {
  return [
    [width / 2, -height / 2],
    [width / 2, height / 2],
    [-width / 2, height / 2],
    [-width / 2, -height / 2],
  ];
}

/**
 * Get Diamond PathArray.
 * @param width - diamond width
 * @param height - diamond height
 * @returns The PathArray for G
 */
export function getDiamondPoints(width: number, height: number): Point[] {
  return [
    [0, -height / 2],
    [width / 2, 0],
    [0, height / 2],
    [-width / 2, 0],
  ];
}
/**
 * <zh/> 元素是否可见
 *
 * <en/> Whether the element is visible
 * @param element - <zh/> 元素 | <en/> element
 * @returns <zh/> 是否可见 | <en/> whether the element is visible
 */
export function isVisible(element: DisplayObject) {
  return get(element, ['style', 'visibility']) !== 'hidden';
}

/**
 * <zh/> 更新图形样式
 *
 * <en/> Update shape style
 * @param shape - <zh/> 图形 | <en/> shape
 * @param style - <zh/> 样式 | <en/> style
 */
export function updateStyle<T extends DisplayObject>(shape: T, style: Record<string, unknown>) {
  if ('update' in shape) (shape.update as (style: Record<string, unknown>) => void)(style);
  else shape.attr(style);
}

/**
 * Get Hexagon PathArray
 * @param outerR - <zh/> 外接圆半径 | <en/> the  radius of circumscribed circle
 *  @returns The PathArray for G
 */
export function getHexagonPoints(outerR: number): Point[] {
  return [
    [0, outerR],
    [(outerR * Math.sqrt(3)) / 2, outerR / 2],
    [(outerR * Math.sqrt(3)) / 2, -outerR / 2],
    [0, -outerR],
    [(-outerR * Math.sqrt(3)) / 2, -outerR / 2],
    [(-outerR * Math.sqrt(3)) / 2, outerR / 2],
  ];
}

/**
 * <zh/> 将图形标记为即将销毁，用于在 element controller 中识别要销毁的元素
 *
 * <en/> Mark the element as to be destroyed, used to identify the element to be destroyed in the element controller
 * @param element - <zh/> 图形 | <en/> element
 */
export function markToBeDestroyed(element: DisplayObject) {
  set(element, '__to_be_destroyed__', true);
}

/**
 * <zh/> 判断图形是否即将销毁
 *
 * <en/> Determine whether the element is to be destroyed
 * @param element - <zh/> 图形 | <en/> element
 * @returns <zh/> 是否即将销毁 | <en/> whether the element is to be destroyed
 */
export function isToBeDestroyed(element: DisplayObject) {
  return get(element, '__to_be_destroyed__', false);
}
