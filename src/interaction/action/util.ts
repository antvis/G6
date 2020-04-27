import {Point, Item, IShapeBase} from '../../types/index';
import { IInteractionContext } from '@antv/interaction/lib/interfaces';
import { each } from '_@antv_util@2.0.8@@antv/util/lib';
import { IGraph } from '../../interface/graph';
import { INode, IEdge } from '../../interface/item';
import isPolygonsIntersect  from '@antv/path-util/lib/is-polygons-intersect';
import { BBox } from '@antv/g-base/lib/types';

/**
 * 允许移动的最小位移，防止错误触发
 */
export const TOLERENCE_MOVE = 5;

export function distance(p1: Point, p2: Point) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function canavsDistance(p1: Point, p2: Point) {
  const dx = p2.canvasX - p1.canvasX;
  const dy = p2.canvasY - p1.canvasY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function allowMove(p1: Point, p2: Point): boolean {
  return canavsDistance(p1, p2) >= TOLERENCE_MOVE;
}

export function getMaskBBox(context: IInteractionContext, tolerance: number) {
  const event = context.event;
  const maskShape = event.target;
  const maskBBox = maskShape.getCanvasBBox();
  // 如果 bbox 过小则不返回
  if (!(maskBBox.width >= tolerance || maskBBox.height >= tolerance)) {
    return null;
  }
  return maskBBox;
}

/**
 * 获取当前事件相关的图表元素
 * @param context 交互的上下文
 * @ignore
 */
export function getCurrentElement(context: IInteractionContext): Element {
  const event = context.event;
  let element;
  const target = event.target;
  if (target) {
    element = target.get('element');
  }
  return element;
}

/**
 * 将 path 转成数组
 * @param path 
 */
function pathToPoints(path: any[]) {
  const points = [];
  each(path, seg => {
    const command = seg[0];
    if (command !== 'A') {
      for(let i = 1; i < seg.length; i = i+2) {
        points.push([seg[i], seg[i + 1]]);
      }
    } else {
      const length = seg.length;
      points.push([seg[length - 2], seg[length - 1]]);
    }
  });
  return points;
}

/**
 * 是否由 mask 触发
 * @param context 上下文
 * @ignore
 */
export function isMask(context: IInteractionContext): boolean {
  const event = context.event;
  const target = event.target;
  return target && target.get('name') === 'mask';
}

function getMaskPath(context: IInteractionContext, tolerance: number) {
  const event = context.event;
  const maskShape = event.target;
  const maskBBox = maskShape.getCanvasBBox();
  // 如果 bbox 过小则不返回
  if (!(maskBBox.width >= tolerance || maskBBox.height >= tolerance)) {
    return null;
  }
  return maskShape.attr('path');
}

/**
 * 将 bbox 转换成 points
 * @param bbox
 */
export function toPoints(bbox: Partial<BBox>): any[] {
  return [
    [bbox.minX, bbox.minY],
    [bbox.maxX, bbox.minY],
    [bbox.maxX, bbox.maxY],
    [bbox.minX, bbox.maxY]
  ];
}


/**
 * 获取包围盒内的图元素
 * @param graph IGraph
 * @param path 路径
 * @ignore
 */
export function getElementsByPath(graph: IGraph, path: any[]) {
  const elements = getElements(graph);
  const points = pathToPoints(path);
  const rst = elements.filter((item: Item) => {
    let shapePoints;
    const shape: IShapeBase = item.getKeyShape()
    if (item.get('type') === 'path') {
      shapePoints = pathToPoints(shape.attr('path'))
    } else {
      const shapeBBox = shape.getCanvasBBox();
      shapePoints = toPoints(shapeBBox);
    }
    return isPolygonsIntersect(points, shapePoints);
  });
  return rst;
}

/**
 * 获取所有的图表元素
 * @param graph IGraph
 * @ignore
 */
export function getElements(graph: IGraph): Item[] {
  let rst: Item[] = [];
  const nodes = graph.getNodes();
  each(nodes, (node: INode) => {
    rst = rst.concat(node);
  });

  const edges = graph.getEdges();
  each(edges, (edge: IEdge) => {
    rst = rst.concat(edge);
  });

  // const combos = graph.getCombos();
  // each(combos, (combo: ICombo) => {
  //   rst = rst.concat(combo);
  // });
  
  return rst;
}

/**
 * 两个包围盒是否相交
 * @param box1 包围盒1
 * @param box2 包围盒2
 * @ignore
 */
export function intersectRect(box1, box2) {
  return !(box2.minX > box1.maxX || box2.maxX < box1.minX || box2.minY > box1.maxY || box2.maxY < box1.minY);
}


/**
 * 获取包围盒内的图元素
 * @param view View/Chart
 * @param box 包围盒
 * @ignore
 */
export function getIntersectElements(graph: IGraph, box) {
  const elements = getElements(graph);
  const rst = [];
  each(elements, (element: Item) => {
    const shape: IShapeBase = element.getKeyShape()
    const shapeBBox = shape.getCanvasBBox();
    if (intersectRect(box, shapeBBox)) {
      rst.push(element);
    }
  });
  return rst;
}


/**
 * 获取被遮挡的 elements
 * @param context 上下文
 * @ignore
 */
export function getMaskedElements(context: IInteractionContext, tolerance: number): Item[]{
  const target = context.event.target;
  if (target.get('type') === 'path') {
    const maskPath =  getMaskPath(context, tolerance);
    if (!maskPath) {
      return;
    }
    return getElementsByPath(context.source as IGraph, maskPath);
  }
  const maskBBox = getMaskBBox(context, tolerance);
  // 如果 bbox 过小则不返回
  if (!maskBBox) {
    return null;
  }
  return getIntersectElements(context.source as IGraph, maskBBox);
}
