import { IGroup, BBox } from '@antv/g-base';
import { vec2 } from '@antv/matrix-util';
import Global from '../global';
import {
  EdgeData,
  IBBox,
  IPoint,
  IShapeBase,
  LabelStyle,
  NodeConfig,
  ComboTree,
  ComboConfig,
  ICombo
} from '../types';
import { applyMatrix } from './math';
import letterAspectRatio from './letterAspectRatio';
import { isString, clone, isNumber, isObject, isArray } from '@antv/util';
import { IAbstractGraph } from '../interface/graph';

const { PI, sin, cos } = Math;

// 一共支持8个方向的自环，每个环占的角度是45度，在计算时再二分，为22.5度
const SELF_LINK_SIN: number = sin(PI / 8);
const SELF_LINK_COS: number = cos(PI / 8);

export const getBBox = (element: IShapeBase, group: IGroup): IBBox => {
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
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
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
  const container: IGroup = item.get('group');
  let containerMatrix = container.getMatrix();
  if (!containerMatrix) containerMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

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

  const startVec: vec2 = [startPoint[0] - center[0], startPoint[1] - center[1]];
  let scaleRateStart = (rstart + dist) / rstart;
  let scaleRateEnd = (rend + dist) / rend;
  if (loopCfg.clockwise === false) {
    scaleRateStart = (rend + dist) / rend;
    scaleRateEnd = (rstart + dist) / rstart;
  }

  const startExtendVec = vec2.scale([0, 0], startVec, scaleRateStart);
  const controlPoint1 = [center[0] + startExtendVec[0], center[1] + startExtendVec[1]];
  const endVec: vec2 = [endPoint[0] - center[0], endPoint[1] - center[1]];

  const endExtendVec = vec2.scale([0, 0], endVec, scaleRateEnd);
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
  pathShape,
  percent: number,
  refX: number,
  refY: number,
  rotate: boolean,
): LabelStyle => {
  const TAN_OFFSET = 0.0001;
  let vector: number[][] = [];
  const point: IPoint = pathShape?.getPoint(percent);
  if (!point) {
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
    const offsetPoint: IPoint = pathShape?.getPoint(percent + TAN_OFFSET);
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
    if (rad > 0.5 * PI && rad < 1.5 * PI) {
      rad -= PI;
    }
    return {
      rotate: rad,
      ...result,
    };
  }
  return result;
};

/**
 * depth first traverse, from root to leaves, children in inverse order
 *  if the fn returns false, terminate the traverse
 */
const traverse = <T extends { children?: T[] }>(data: T, fn: (param: T) => boolean) => {
  if (fn(data) === false) {
    return false;
  }

  if (data && data.children) {
    for (let i = data.children.length - 1; i >= 0; i--) {
      if (!traverse(data.children[i], fn)) return false;
    }
  }
  return true;
};

/**
 * depth first traverse, from leaves to root, children in inverse order
 *  if the fn returns false, terminate the traverse
 */
const traverseUp = <T extends { children?: T[] }>(data: T, fn: (param: T) => boolean) => {
  if (data && data.children) {
    for (let i = data.children.length - 1; i >= 0; i--) {
      if (!traverseUp(data.children[i], fn)) return;
    }
  }

  if (fn(data) === false) {
    return false;
  }
  return true;
};

/**
 * depth first traverse, from root to leaves, children in inverse order
 *  if the fn returns false, terminate the traverse
 */
export const traverseTree = <T extends { children?: T[] }>(data: T, fn: (param: T) => boolean) => {
  if (typeof fn !== 'function') {
    return;
  }
  traverse(data, fn);
};

/**
 * depth first traverse, from leaves to root, children in inverse order
 * if the fn returns false, terminate the traverse
 */
export const traverseTreeUp = <T extends { children?: T[] }>(
  data: T,
  fn: (param: T) => boolean,
) => {
  if (typeof fn !== 'function') {
    return;
  }
  traverseUp(data, fn);
};

/**
 *
 * @param letter the letter
 * @param fontSize
 * @return the letter's width
 */
export const getLetterWidth = (letter, fontSize) => {
  return fontSize * (letterAspectRatio[letter] || 1);
};

/**
 *
 * @param text the text
 * @param fontSize
 * @return the text's size
 */
export const getTextSize = (text: string, fontSize: number) => {
  let width = 0;
  const pattern = new RegExp('[\u{4E00}-\u{9FA5}]+');
  text.split('').forEach((letter) => {
    if (pattern.test(letter)) {
      // 中文字符
      width += fontSize;
    } else {
      width += getLetterWidth(letter, fontSize);
    }
  });
  return [width, fontSize];
};

/**
 * construct the trees from combos data
 * @param array the combos array
 * @param nodes the nodes array
 * @return the tree
 */
export const plainCombosToTrees = (array: ComboConfig[], nodes?: NodeConfig[]) => {
  const result: ComboTree[] = [];
  const addedMap = {};
  const modelMap = {};
  array.forEach((d) => {
    modelMap[d.id] = d;
  });

  array.forEach((d, i) => {
    const cd = clone(d);
    cd.itemType = 'combo';
    cd.children = undefined;
    if (cd.parentId === cd.id) {
      console.warn(`The parentId for combo ${cd.id} can not be the same as the combo's id`);
      delete cd.parentId;
    } else if (cd.parentId && !modelMap[cd.parentId]) {
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
        else mappedParent.children = [cd];
      } else {
        const parent = {
          id: mappedObj.parentId,
          children: [mappedObj],
        };
        addedMap[mappedObj.parentId] = parent;
        addedMap[cd.id] = cd;
      }
      return;
    }
    if (isString(d.parentId)) {
      const parent = addedMap[d.parentId];
      if (parent) {
        if (parent.children) parent.children.push(cd);
        else parent.children = [cd];
        addedMap[cd.id] = cd;
      } else {
        const pa = {
          id: d.parentId,
          children: [cd],
        };
        addedMap[pa.id] = pa;
        addedMap[cd.id] = cd;
      }
    } else {
      result.push(cd);
      addedMap[cd.id] = cd;
    }
  });

  // proccess the nodes
  const nodeMap = {};
  (nodes || []).forEach((node) => {
    nodeMap[node.id] = node;
    const combo = addedMap[node.comboId as string];
    if (combo) {
      const cnode: NodeConfig = {
        id: node.id,
        comboId: node.comboId as string,
      };
      if (combo.children) combo.children.push(cnode);
      else combo.children = [cnode];
      cnode.itemType = 'node';
      addedMap[node.id] = cnode;
    }
  });

  // assign the depth for each element
  let maxDepth = 0;
  result.forEach((tree: ComboTree) => {
    tree.depth = maxDepth + 10;
    traverse<ComboTree>(tree, (child) => {
      let parent;
      const itemType = addedMap[child.id].itemType;
      if (itemType === 'node') {
        parent = addedMap[child.comboId as string];
      } else {
        parent = addedMap[child.parentId];
      }
      if (parent) {
        if (itemType === 'node') child.depth = maxDepth + 1;
        else child.depth = maxDepth + 10;
      } else {
        child.depth = maxDepth + 10;
      }
      if (maxDepth < child.depth) maxDepth = child.depth;
      const oriNodeModel = nodeMap[child.id];
      if (oriNodeModel) {
        oriNodeModel.depth = child.depth;
      }
      return true;
    });
  });
  return result;
};

export const reconstructTree = (
  trees: ComboTree[],
  subtreeId?: string,
  newParentId?: string | undefined,
): ComboTree[] => {
  let brothers = trees;
  let subtree;
  const comboChildsMap = {
    root: {
      children: trees,
    },
  };
  let foundSubTree = false;
  let oldParentId = 'root';
  (trees || []).forEach((tree) => {
    if (foundSubTree) return;
    if (tree.id === subtreeId) {
      subtree = tree;
      if (tree.itemType === 'combo') {
        subtree.parentId = newParentId;
      } else {
        subtree.comboId = newParentId;
      }
      foundSubTree = true;
      return;
    }
    traverseTree<ComboTree>(tree, (child: any) => {
      comboChildsMap[child.id] = {
        children: child.children,
      };
      // store the old parent id to delete the subtree from the old parent's children in next recursion
      brothers = comboChildsMap[child.parentId || child.comboId || 'root'].children;
      if (child && (child.removed || subtreeId === child.id) && brothers) {
        oldParentId = child.parentId || child.comboId || 'root';
        subtree = child;
        // re-assign the parentId or comboId for the moved subtree
        if (child.itemType === 'combo') {
          subtree.parentId = newParentId;
        } else {
          subtree.comboId = newParentId;
        }
        foundSubTree = true;
        return false;
      }
      return true;
    });
  });

  brothers = comboChildsMap[oldParentId].children;
  const index = brothers ? brothers.indexOf(subtree) : -1;
  if (index > -1) brothers.splice(index, 1);

  // 如果遍历完整棵树还没有找到，说明之前就不在树中
  if (!foundSubTree) {
    subtree = {
      id: subtreeId,
      itemType: 'node',
      comboId: newParentId,
    };

    comboChildsMap[subtreeId] = {
      children: undefined,
    };
  }

  // append to new parent
  if (subtreeId) {
    let found = false;
    // newParentId is undefined means the subtree will have no parent
    if (newParentId) {
      let newParentDepth = 0;
      (trees || []).forEach((tree) => {
        if (found) return; // terminate
        traverseTree<ComboTree>(tree, (child: any) => {
          // append subtree to the new parent ans assign the depth to the subtree
          if (newParentId === child.id) {
            found = true;
            if (child.children) child.children.push(subtree);
            else child.children = [subtree];
            newParentDepth = child.depth;
            if (subtree.itemType === 'node') subtree.depth = newParentDepth + 2;
            else subtree.depth = newParentDepth + 1;
            return false; // terminate
          }
          return true;
        });
      });
    } else if ((!newParentId || !found) && subtree.itemType !== 'node') {
      // if the newParentId is undefined or it is not found in the tree, add the subTree to the root
      trees.push(subtree);
    }
    // update the depth of the subtree and its children from the subtree
    let currentDepth = subtree.depth;
    traverseTree<ComboTree>(subtree, (child: any) => {
      if (child.itemType === 'node') currentDepth += 2;
      else currentDepth += 1;
      child.depth = currentDepth;
      return true;
    });
  }
  return trees;
};

export const getComboBBox = (children: ComboTree[], graph: IAbstractGraph, combo?: ICombo): BBox => {
  const comboBBox = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    centerX: undefined,
    centerY: undefined,
  };

  if (!children || children.length === 0) {
    const comboModel = combo?.getModel();
    const { x, y } = comboModel || {};
    return {
      minX: x,
      minY: y,
      maxX: x,
      maxY: y,
      x: x,
      y: y,
      width: undefined,
      height: undefined
    };
  }

  children.forEach((child) => {
    const childItem = graph.findById(child.id);
    if (!childItem || !childItem.isVisible()) return; // ignore hidden children
    childItem.set('bboxCanvasCache', undefined);
    const childBBox = childItem.getCanvasBBox();
    if (childBBox.x && comboBBox.minX > childBBox.minX) comboBBox.minX = childBBox.minX;
    if (childBBox.y && comboBBox.minY > childBBox.minY) comboBBox.minY = childBBox.minY;
    if (childBBox.x && comboBBox.maxX < childBBox.maxX) comboBBox.maxX = childBBox.maxX;
    if (childBBox.y && comboBBox.maxY < childBBox.maxY) comboBBox.maxY = childBBox.maxY;
  });
  comboBBox.x = (comboBBox.minX + comboBBox.maxX) / 2;
  comboBBox.y = (comboBBox.minY + comboBBox.maxY) / 2;
  comboBBox.width = comboBBox.maxX - comboBBox.minX;
  comboBBox.height = comboBBox.maxY - comboBBox.minY;

  comboBBox.centerX = (comboBBox.minX + comboBBox.maxX) / 2;
  comboBBox.centerY = (comboBBox.minY + comboBBox.maxY) / 2;

  Object.keys(comboBBox).forEach((key) => {
    if (comboBBox[key] === Infinity || comboBBox[key] === -Infinity) {
      comboBBox[key] = undefined;
    }
  });

  return comboBBox;
};

export const shouldRefreshEdge = (cfg) => {
  let refreshEdge = isNumber(cfg.x) || isNumber(cfg.y) || cfg.type || cfg.anchorPoints || cfg.size;
  if (cfg.style)
    refreshEdge =
      refreshEdge ||
      isNumber(cfg.style.r) ||
      isNumber(cfg.style.width) ||
      isNumber(cfg.style.height) ||
      isNumber(cfg.style.rx) ||
      isNumber(cfg.style.ry);
  return refreshEdge;
};

export const cloneBesidesImg = (obj) => {
  const clonedObj = {};
  Object.keys(obj).forEach(key1 => {
    const obj2 = obj[key1];
    if (isObject(obj2) && !isArray(obj2)) {
      const clonedObj2 = {};
      Object.keys(obj2).forEach(key2 => {
        const v = obj2[key2];
        if (key2 === 'img' && !isString(v)) return;
        clonedObj2[key2] = clone(v);
      })
      clonedObj[key1] = clonedObj2;
    } else {
      clonedObj[key1] = clone(obj2);
    }
  });
  return clonedObj;
}
