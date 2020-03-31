import Group from '@antv/g-canvas/lib/group';
import Path from '@antv/g-canvas/lib/shape/path';
import { vec2, mat3 } from '@antv/matrix-util';
import each from '@antv/util/lib/each';
import Global from '../global';
import { EdgeData, IBBox, IPoint, IShapeBase, LabelStyle, TreeGraphData, NodeConfig, ComboTree, ComboConfig } from '../types';
import { applyMatrix } from './math';
import { isString, clone } from '@antv/util';
import { BBox } from '@antv/g-math/lib/types';
import { IGraph } from '../interface/graph';

const { PI, sin, cos } = Math;

// 一共支持8个方向的自环，每个环占的角度是45度，在计算时再二分，为22.5度
const SELF_LINK_SIN: number = sin(PI / 8);
const SELF_LINK_COS: number = cos(PI / 8);

export const getBBox = (element: IShapeBase, group: Group): IBBox => {
  const bbox = element.getBBox();
  let leftTop: IPoint = {
    x: bbox.minX,
    y: bbox.minY,
  };
  let rightBottom: IPoint = {
    x: bbox.maxX,
    y: bbox.maxY,
  };
  // 根据父元素变换矩阵
  if (group) {
    let matrix = group.getMatrix();
    if (!matrix) {
      matrix = mat3.create();
    }
    leftTop = applyMatrix(leftTop, matrix);
    rightBottom = applyMatrix(rightBottom, matrix);
  }

  const { x: lx, y: ly } = leftTop;
  const { x: rx, y: ry } = rightBottom;

  return {
    x: lx,
    y: ly,
    minX: lx,
    minY: ly,
    maxX: rx,
    maxY: ry,
    width: rx - lx,
    height: ry - ly,
  };
};

/**
 * get loop edge config
 * @param cfg edge config
 */
export const getLoopCfgs = (cfg: EdgeData): EdgeData => {
  const item = cfg.sourceNode || cfg.targetNode;
  const container: Group = item.get('group');
  let containerMatrix = container.getMatrix();
  if (!containerMatrix) containerMatrix = mat3.create();

  const keyShape: IShapeBase = item.getKeyShape();
  const bbox: IBBox = keyShape.getBBox();

  const loopCfg = cfg.loopCfg || {};
  // 距离keyShape边的最高距离
  const dist: number = loopCfg.dist || Math.max(bbox.width, bbox.height) * 2;
  // 自环边与keyShape的相对位置关系
  const position: string = loopCfg.position || Global.defaultLoopPosition;

  // 中心取group上真实位置
  const center = [containerMatrix[6], containerMatrix[7]];
  let startPoint = [cfg.startPoint.x, cfg.startPoint.y];
  let endPoint = [cfg.endPoint.x, cfg.endPoint.y];

  let rstart = bbox.height / 2;
  let rend = bbox.height / 2;
  let sinDeltaStart = rstart * SELF_LINK_SIN;
  let cosDeltaStart = rstart * SELF_LINK_COS;
  let sinDeltaEnd = rend * SELF_LINK_SIN;
  let cosDeltaEnd = rend * SELF_LINK_COS;

  // 如果定义了锚点的，直接用锚点坐标，否则，根据自环的 cfg 计算
  if (startPoint[0] === endPoint[0] && startPoint[1] === endPoint[1]) {
    switch (position) {
      case 'top':
        startPoint = [center[0] - sinDeltaStart, center[1] - cosDeltaStart];
        endPoint = [center[0] + sinDeltaEnd, center[1] - cosDeltaEnd];
        break;
      case 'top-right':
        rstart = bbox.height / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + sinDeltaStart, center[1] - cosDeltaStart];
        endPoint = [center[0] + cosDeltaEnd, center[1] - sinDeltaEnd];
        break;
      case 'right':
        rstart = bbox.width / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + cosDeltaStart, center[1] - sinDeltaStart];
        endPoint = [center[0] + cosDeltaEnd, center[1] + sinDeltaEnd];
        break;
      case 'bottom-right':
        rstart = bbox.width / 2;
        rend = bbox.height / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + cosDeltaStart, center[1] + sinDeltaStart];
        endPoint = [center[0] + sinDeltaEnd, center[1] + cosDeltaEnd];
        break;
      case 'bottom':
        rstart = bbox.height / 2;
        rend = bbox.height / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + sinDeltaStart, center[1] + cosDeltaStart];
        endPoint = [center[0] - sinDeltaEnd, center[1] + cosDeltaEnd];
        break;
      case 'bottom-left':
        rstart = bbox.height / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - sinDeltaStart, center[1] + cosDeltaStart];
        endPoint = [center[0] - cosDeltaEnd, center[1] + sinDeltaEnd];
        break;
      case 'left':
        rstart = bbox.width / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - cosDeltaStart, center[1] + sinDeltaStart];
        endPoint = [center[0] - cosDeltaEnd, center[1] - sinDeltaEnd];
        break;
      case 'top-left':
        rstart = bbox.width / 2;
        rend = bbox.height / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - cosDeltaStart, center[1] - sinDeltaStart];
        endPoint = [center[0] - sinDeltaEnd, center[1] - cosDeltaEnd];
        break;
      default:
        rstart = bbox.width / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - sinDeltaStart, center[1] - cosDeltaStart];
        endPoint = [center[0] + sinDeltaEnd, center[1] - cosDeltaEnd];
    }
    // 如果逆时针画，交换起点和终点
    if (loopCfg.clockwise === false) {
      const swap = [startPoint[0], startPoint[1]];
      startPoint = [endPoint[0], endPoint[1]];
      endPoint = [swap[0], swap[1]];
    }
  }

  const startVec = [startPoint[0] - center[0], startPoint[1] - center[1]];
  let scaleRateStart = (rstart + dist) / rstart;
  let scaleRateEnd = (rend + dist) / rend;
  if (loopCfg.clockwise === false) {
    scaleRateStart = (rend + dist) / rend;
    scaleRateEnd = (rstart + dist) / rstart;
  }

  const startExtendVec = vec2.scale([], startVec, scaleRateStart);
  const controlPoint1 = [center[0] + startExtendVec[0], center[1] + startExtendVec[1]];
  const endVec = [endPoint[0] - center[0], endPoint[1] - center[1]];

  const endExtendVec = vec2.scale([], endVec, scaleRateEnd);
  const controlPoint2 = [center[0] + endExtendVec[0], center[1] + endExtendVec[1]];

  cfg.startPoint = { x: startPoint[0], y: startPoint[1] };
  cfg.endPoint = { x: endPoint[0], y: endPoint[1] };
  cfg.controlPoints = [
    { x: controlPoint1[0], y: controlPoint1[1] },
    { x: controlPoint2[0], y: controlPoint2[1] },
  ];
  return cfg;
};

/**
 * 根据 label 所在线条的位置百分比，计算 label 坐标
 * @param {object}  pathShape  G 的 path 实例，一般是 Edge 实例的 keyShape
 * @param {number}  percent    范围 0 - 1 的线条百分比
 * @param {number}  refX     x 轴正方向为基准的 label 偏移
 * @param {number}  refY     y 轴正方向为基准的 label 偏移
 * @param {boolean} rotate     是否根据线条斜率旋转文本
 * @return {object} 文本的 x, y, 文本的旋转角度
 */
export const getLabelPosition = (
  pathShape: Path,
  percent: number,
  refX: number,
  refY: number,
  rotate: boolean,
): LabelStyle => {
  const TAN_OFFSET = 0.0001;
  let vector: number[][] = [];
  const point: IPoint = pathShape.getPoint(percent);
  if (point === null) {
    return {
      x: 0,
      y: 0,
      angle: 0,
    };
  }

  // 头尾最可能，放在最前面，使用 g path 上封装的方法
  if (percent < TAN_OFFSET) {
    vector = pathShape.getStartTangent().reverse();
  } else if (percent > 1 - TAN_OFFSET) {
    vector = pathShape.getEndTangent();
  } else {
    // 否则取指定位置的点,与少量偏移的点，做微分向量
    const offsetPoint: IPoint = pathShape.getPoint(percent + TAN_OFFSET);
    vector.push([point.x, point.y]);
    vector.push([offsetPoint.x, offsetPoint.y]);
  }

  let rad: number = Math.atan2(vector[1][1] - vector[0][1], vector[1][0] - vector[0][0]);

  if (rad < 0) {
    rad += PI * 2;
  }

  if (refX) {
    point.x += cos(rad) * refX;
    point.y += sin(rad) * refX;
  }
  if (refY) {
    // 默认方向是 x 轴正方向，法线是 求出角度 - 90°
    let normal = rad - PI / 2;
    // 若法线角度在 y 轴负方向，切到正方向，保证 refY 相对于 y 轴正方向
    if (rad > (1 / 2) * PI && rad < ((3 * 1) / 2) * PI) {
      normal -= PI;
    }
    point.x += cos(normal) * refY;
    point.y += sin(normal) * refY;
  }

  const result = {
    x: point.x,
    y: point.y,
    angle: rad,
  };

  if (rotate) {
    if (rad > (1 / 2) * PI && rad < ((3 * 1) / 2) * PI) {
      rad -= PI;
    }
    return {
      rotate: rad,
      ...result,
    };
  }
  return result;
};

const traverse = <T extends { children?: T[] }>(data: T, fn: (param: T) => boolean) => {
  if (fn(data) === false) {
    return;
  }

  if (data && data.children) {
    each(data.children, child => {
      traverse(child, fn);
    });
  }
};

const traverseUp = <T extends { children?: T[] }>(data: T, fn: (param: T) => boolean) => {
  if (data.children) {
    each(data.children, child => {
      traverseUp(child, fn);
    });
  }
  if (fn(data) === false) {
    return;
  }
};

export const traverseTree = <T extends { children?: T[] }>(data: T, fn: (param: T) => boolean) => {
  if (typeof fn !== 'function') {
    return;
  }
  traverse(data, fn);
};

export const traverseTreeUp = <T extends { children?: T[] }>(data: T, fn: (param: T) => boolean) => {
  if (typeof fn !== 'function') {
    return;
  }
  traverseUp(data, fn);
};

export type TreeGraphDataWithPosition = TreeGraphData & {
  x: number;
  y: number;
  children?: TreeGraphDataWithPosition[];
};

/**
 *
 * @param data Tree graph data
 * @param layout
 */
export const radialLayout = (
  data: TreeGraphDataWithPosition,
  layout?: string,
): TreeGraphDataWithPosition => {
  // 布局方式有 H / V / LR / RL / TB / BT
  const VERTICAL_LAYOUTS: string[] = ['V', 'TB', 'BT'];
  const min: IPoint = {
    x: Infinity,
    y: Infinity,
  };

  const max: IPoint = {
    x: -Infinity,
    y: -Infinity,
  };
  // 默认布局是垂直布局TB，此时x对应rad，y对应r
  let rScale: 'x' | 'y' = 'x';
  let radScale: 'x' | 'y' = 'y';
  if (layout && VERTICAL_LAYOUTS.indexOf(layout) >= 0) {
    // 若是水平布局，y对应rad，x对应r
    radScale = 'x';
    rScale = 'y';
  }
  let count = 0;
  traverseTree(data, (node: TreeGraphDataWithPosition) => {
    count++;
    if (node.x > max.x) {
      max.x = node.x;
    }
    if (node.x < min.x) {
      min.x = node.x;
    }
    if (node.y > max.y) {
      max.y = node.y;
    }
    if (node.y < min.y) {
      min.y = node.y;
    }
    return true;
  });
  const avgRad = (PI * 2) / count;
  const radDiff = max[radScale] - min[radScale];
  if (radDiff === 0) {
    return data;
  }

  traverseTree(data, node => {
    const radial = ((node[radScale] - min[radScale]) / radDiff) * (PI * 2 - avgRad) + avgRad;
    const r = Math.abs(rScale === 'x' ? node.x - data.x : node.y - data.y);
    node.x = r * Math.cos(radial);
    node.y = r * Math.sin(radial);
    return true;
  });
  return data;
};

export const plainCombosToTrees = (array: ComboConfig[], nodes?: NodeConfig[]) => {
  const result: ComboTree[] = [];
  const addedMap = {};
  const modelMap = {};
  array.forEach((d) => {
    modelMap[d.id] = d;
  });
  
  array.forEach((d, i) => {
    const cd = clone(d);
    if (cd.parentId === cd.id) {
      console.warn(`The parentId for combo ${cd.id} can not be the same as the combo's id`);
      delete cd.parentId;
    } else if (!modelMap[cd.parentId]) {
      console.warn(`The parent combo for combo ${cd.id} does not exist!`);
      delete cd.parentId;
    }
    let mappedObj = addedMap[cd.id];
    if (mappedObj) {
      cd.children = mappedObj.children;
      addedMap[cd.id] = cd;
      mappedObj = cd;
      if (!mappedObj.parentId) {
        result.push(mappedObj);
        return;
      }
      const mappedParent = addedMap[mappedObj.parentId];
      if (mappedParent) {
        if (mappedParent.children) mappedParent.children.push(cd);
        else mappedParent.children = [ cd ];
        return;
      }
      else {
        const parent = {
          id: mappedObj.parentId,
          children: [ mappedObj ]
        }
        addedMap[mappedObj.parentId] = parent;
        addedMap[cd.id] = cd;
      }
      return;
    }
    if (isString(d.parentId)) {
      const parent = addedMap[d.parentId];
      if (parent) {
        if (parent.children) parent.children.push(cd);
        else parent.children = [ cd ];
        addedMap[cd.id] = cd;
      } else {
        const pa = {
          id: d.parentId,
          children: [ cd ]
        }
        addedMap[pa.id] = pa;
        addedMap[cd.id] = cd;
      }
    } else {
      result.push(cd);
      addedMap[cd.id] = cd;
    }
  });
  nodes && nodes.forEach(node => {
    const combo = addedMap[node.comboId];
    if (combo) {
      if (combo.children) combo.children.push(node);
      else combo.children = [ node ];
      addedMap[node.id] = clone(node);
      addedMap[node.id].itemType = 'node';
    }
  });
  result.forEach((tree: ComboTree) => {
    tree.depth = 0;
    traverse<ComboTree>(tree, child => {
      let parent = addedMap[child.parentId];
      if (addedMap[child.id]['itemType'] === 'node') {
        parent = addedMap[child['comboId']];
      }
      if (parent) {
        child.depth = parent.depth + 1;
      } else {
        child.depth = 0;
      }
      addedMap[child.id].depth = child.depth;
      return true;
    });
  });
  return result;
}

export const reconstructTree = (trees: ComboTree[]): ComboTree[] => {
  let brothers = trees;
  trees.forEach(tree => {
    traverseTree<ComboTree>(tree, child => {
      if (child && child.removed && brothers) {
        const index = brothers.indexOf(child);
        brothers.splice(index, 1);
      }
      brothers = child ? child.children : [];
      return true;
    });
  });
  return trees;
}

export const getComboBBox = (children: ComboTree[], graph: IGraph): BBox => {
  const comboBBox = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,
  };
  children && children.forEach(child => {
    const childItem = graph.findById(child.id);
    const childModel = childItem.getModel();
    const childBBox = childItem.getCanvasBBox();
    if (childModel.x && comboBBox.minX > childBBox.minX) comboBBox.minX = childBBox.minX;
    if (childModel.y && comboBBox.minY > childBBox.minY) comboBBox.minY = childBBox.minY;
    if (childModel.x && comboBBox.maxX < childBBox.maxX) comboBBox.maxX = childBBox.maxX;
    if (childModel.y && comboBBox.maxY < childBBox.maxY) comboBBox.maxY = childBBox.maxY;
  });
  comboBBox.x = (comboBBox.minX + comboBBox.maxX) / 2;
  comboBBox.y = (comboBBox.minY + comboBBox.maxY) / 2;
  comboBBox.width = comboBBox.maxX - comboBBox.minX;
  comboBBox.height = comboBBox.maxY - comboBBox.minY;
  
  Object.keys(comboBBox).forEach(key => {
    if (comboBBox[key] === Infinity || comboBBox[key] === -Infinity) {
      comboBBox[key] = undefined;
    }
  });

  return comboBBox;
}