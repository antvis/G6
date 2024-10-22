import { isString, isNumber, isNil, isArray } from '@antv/util';
import { G6GraphEvent } from '../interface/behavior';
import { IG6GraphEvent, Padding, Matrix, Item } from '../types';

export const uniqueId = (type: string): string => {
  return `${type}-${Math.random()}${Date.now()}`;
};

/**
 * turn padding into [top, right, bottom, right]
 * @param  {Number|Array} padding input padding
 * @return {array} output
 */
export const formatPadding = (padding: Padding): number[] => {
  if (isArray(padding)) {
    switch (padding.length) {
      case 4:
        return padding;
      case 3:
        padding.push(padding[1]);
        return padding;
      case 2:
        return padding.concat(padding);
      case 1:
        return [padding[0], padding[0], padding[0], padding[0]];
      default:
        return [0, 0, 0, 0];
    }
  }

  if (isNumber(padding)) {
    return [padding, padding, padding, padding];
  } else if (isString(padding)) {
    const intPadding = parseInt(padding, 10);
    return [intPadding, intPadding, intPadding, intPadding];
  }
  return [0, 0, 0, 0];
};

/**
 * clone event
 * @param e
 */
export const cloneEvent = (e: IG6GraphEvent): IG6GraphEvent => {
  const event = new G6GraphEvent(e.type, e);
  event.clientX = e.clientX;
  event.clientY = e.clientY;
  event.x = e.x;
  event.y = e.y;
  event.target = e.target;
  event.currentTarget = e.currentTarget;
  event.bubbles = true;
  (event.item as Item | null) = e.item;
  return event;
};

/**
 * 判断 viewport 是否改变，通过和单位矩阵对比
 * @param matrix Viewport 的 Matrix
 */
export const isViewportChanged = (matrix: Matrix) => {
  // matrix 为 null， 则说明没有变化
  if (!matrix) {
    return false;
  }

  const MATRIX_LEN = 9;
  const ORIGIN_MATRIX = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  for (let i = 0; i < MATRIX_LEN; i++) {
    if (matrix[i] !== ORIGIN_MATRIX[i]) {
      return true;
    }
  }
  return false;
};

export const isNaN = (input: any) => Number.isNaN(Number(input));

/**
 * 计算一组 Item 的 BBox
 * @param items 选中的一组Item，可以是 node 或 combo
 */
export const calculationItemsBBox = (items: Item[]) => {
  let minx = Infinity;
  let maxx = -Infinity;
  let miny = Infinity;
  let maxy = -Infinity;

  // 获取已节点的所有最大最小x y值
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const bbox = element.getBBox();
    const { minX, minY, maxX, maxY } = bbox;
    if (minX < minx) {
      minx = minX;
    }

    if (minY < miny) {
      miny = minY;
    }

    if (maxX > maxx) {
      maxx = maxX;
    }

    if (maxY > maxy) {
      maxy = maxY;
    }
  }

  const x = Math.floor(minx);
  const y = Math.floor(miny);
  const width = Math.ceil(maxx) - Math.floor(minx);
  const height = Math.ceil(maxy) - Math.floor(miny);

  return {
    x,
    y,
    width,
    height,
    minX: minx,
    minY: miny,
    maxX: maxx,
    maxY: maxy,
  };
};

/**
 * 若 edges 中存在两端点相同的边，使用 quadratic 边并自动计算 curveOffset 使它们不相互重叠
 * 文档: https://g6-v4.antv.vision/en/api/Util
 * @param edges 边数据集合
 * @param offsetDiff 相邻两边的 offset 之差
 * @param multiEdgeType
 * @param singleEdgeType
 * @param loopEdgeType
 */
export const processParallelEdges = (
  edges,
  offsetDiff = 15,
  multiEdgeType: string = 'quadratic',
  singleEdgeType: string = undefined,
  loopEdgeType: string = undefined,
) => {
  const len = edges.length;
  const cod = offsetDiff * 2;
  const loopPosition = [
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
    'top-left',
  ];
  const edgeMap = {};
  const tags = [];
  const reverses = {};
  for (let i = 0; i < len; i++) {
    const edge = edges[i];
    const { source, target } = edge;
    const sourceTarget = `${source}-${target}`;

    if (tags[i]) continue;
    if (!edgeMap[sourceTarget]) {
      edgeMap[sourceTarget] = [];
    }
    tags[i] = true;
    edgeMap[sourceTarget].push(edge);
    for (let j = 0; j < len; j++) {
      if (i === j) continue;
      const sedge = edges[j];
      const src = sedge.source;
      const dst = sedge.target;

      // 两个节点之间共同的边
      // 第一条的source = 第二条的target
      // 第一条的target = 第二条的source
      if (!tags[j]) {
        if (source === dst && target === src) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
          reverses[`${src}|${dst}|${edgeMap[sourceTarget].length - 1}`] = true;
        } else if (source === src && target === dst) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
        }
      }
    }
  }

  for (const key in edgeMap) {
    const arcEdges = edgeMap[key];
    const { length } = arcEdges;
    for (let k = 0; k < length; k++) {
      const current = arcEdges[k];
      if (current.source === current.target) {
        if (loopEdgeType) current.type = loopEdgeType;
        // 超过8条自环边，则需要重新处理
        current.loopCfg = {
          position: loopPosition[k % 8],
          dist: Math.floor(k / 8) * 20 + 50,
        };
        continue;
      }
      if (length === 1 && singleEdgeType && current.source !== current.target) {
        current.type = singleEdgeType;
        continue;
      }
      current.type = multiEdgeType;
      const sign =
        (k % 2 === 0 ? 1 : -1) * (reverses[`${current.source}|${current.target}|${k}`] ? -1 : 1);
      if (length % 2 === 1) {
        current.curveOffset = sign * Math.ceil(k / 2) * cod;
      } else {
        current.curveOffset = sign * (Math.floor(k / 2) * cod + offsetDiff);
      }
    }
  }
  return edges;
};
