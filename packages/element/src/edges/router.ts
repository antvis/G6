/**
 * 通过配置不同的 costFunc, distFunc, constraints 可以得到不同效果的 router
 * generalRouter: 不限制搜索时的移动方向，避开障碍即可
 * orthogonal: 线必须沿着竖直或水平方向（4个方向）
 * octolinearRouter: 线沿着竖直、水平、对角线方向（8个方向）
 */
 import { INode, Item, Util } from '@antv/g6-core';
 import { deepMix } from '@antv/util';
 import {
   getExpandedBBox,
   getExpandedBBoxPoint,
   PolyPoint,
   getPolylinePoints,
   simplifyPolyline,
   isSegmentCrossingBBox,
   SortedArray,
 } from './polyline-util';
 
 export interface RouterCfg {
   offset?: number; // 连线和点的间距
   gridSize?: number;
   obstacles?: Item[];
   maxAllowedDirectionChange?: number; // 允许的最大转角，弧度制
   directions?: any[]; // 允许的边的方向
   startDirections?: string[]; // 边从点出发的方向（e.g. 从上拐 / 从下拐）
   penalties?: {}; // 附加的分数
   simple?: boolean;
   distFunc?: (p1: PolyPoint, p2: PolyPoint) => number;
   fallbackRoute?: (
     p1: PolyPoint,
     p2: PolyPoint,
     startNode?: INode,
     endNode?: INode,
     cfg?: RouterCfg,
   ) => PolyPoint[]; // 若找不到符合要求的路径时的退化路径方案
   maximumLoops?: number;
 }
 
 const manhattanDist = (p1: PolyPoint, p2: PolyPoint): number =>
   Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
 
 const eucliDist = (p1: PolyPoint, p2: PolyPoint): number =>
   Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
 
 const straightPath = (start: PolyPoint, end: PolyPoint): PolyPoint[] => {
   // console.warn('fallbackRoute: straight path');
   return [start, end];
 };
 
 const simplePolyline = (
   start: PolyPoint,
   end: PolyPoint,
   startNode: INode,
   endNode: INode,
   cfg: RouterCfg,
 ) => {
   return simplifyPolyline(getPolylinePoints(start, end, startNode, endNode, cfg.offset));
 };
 // getPolylinePoints
 
 const defaultCfg: RouterCfg = {
   offset: 20,
   maxAllowedDirectionChange: Math.PI / 2,
   maximumLoops: 2000,
   gridSize: 10,
   directions: [
     { stepX: 1, stepY: 0 }, // right
     { stepX: -1, stepY: 0 }, // left
     { stepX: 0, stepY: 1 }, // bottom
     { stepX: 0, stepY: -1 }, // top
   ],
   get penalties() {
     return {
       0: 0,
       45: this.gridSize / 2,
       90: this.gridSize / 2,
     };
   },
   distFunc: manhattanDist,
   fallbackRoute: simplePolyline,
 };
 
 export const octolinearCfg: RouterCfg = {
   maxAllowedDirectionChange: Math.PI / 4,
   // 8 个方向: 上下左右 + 45度斜线方向
   directions: [
     { stepX: 1, stepY: 0 },
     { stepX: 1, stepY: 1 },
     { stepX: 0, stepY: 1 },
     { stepX: -1, stepY: 1 },
     { stepX: -1, stepY: 0 },
     { stepX: -1, stepY: -1 },
     { stepX: 0, stepY: -1 },
     { stepX: 1, stepY: -1 },
   ],
   distFunc: eucliDist,
   fallbackRoute: straightPath,
 };
 
 const pos2GridIx = (pos: number, gridSize: number) => {
   const gridIx = Math.round(Math.abs(pos / gridSize));
   const sign = pos < 0 ? -1 : 1;
   return gridIx < 0 ? 0 : sign * gridIx;
 };
 
 const getObstacleMap = (items: Item[], gridSize: number, offset: number) => {
   const map = {};
   items.forEach((item: Item) => {
     // create-edge 时，当边类型为 polyline 时 endNode 为 null
     if (!item) return;
     const bbox = getExpandedBBox(item.getBBox(), offset);
     for (let x = pos2GridIx(bbox.minX, gridSize); x <= pos2GridIx(bbox.maxX, gridSize); x += 1) {
       for (let y = pos2GridIx(bbox.minY, gridSize); y <= pos2GridIx(bbox.maxY, gridSize); y += 1) {
         map[`${x}|||${y}`] = true;
       }
     }
   });
   return map;
 };
 
 /**
  * 方向角：计算从 p1 到 p2 的射线与水平线形成的夹角度数（顺时针从右侧0°转到该射线的角度）
  * @param p1 PolyPoint
  * @param p2 PolyPoint
  */
 const getDirectionAngle = (p1: PolyPoint, p2: PolyPoint) => {
   const deltaX = p2.x - p1.x;
   const deltaY = p2.y - p1.y;
   if (deltaX || deltaY) {
     return Math.atan2(deltaY, deltaX);
   }
   return 0;
 };
 
 /**
  * 方向角的改变，取小于180度角
  * @param angle1
  * @param angle2
  */
 const getAngleDiff = (angle1: number, angle2: number) => {
   const directionChange = Math.abs(angle1 - angle2);
   return directionChange > Math.PI ? 2 * Math.PI - directionChange : directionChange;
   // return directionChange > 180 ? 360 - directionChange : directionChange;
 };
 
 // Path finder //
 const estimateCost = (from: PolyPoint, endPoints: PolyPoint[], distFunc) => {
   let min = Infinity;
   for (let i = 0, len = endPoints.length; i < len; i++) {
     const cost = distFunc(from, endPoints[i]);
     if (cost < min) {
       min = cost;
     }
   }
   return min;
 };
 
 // 计算考虑 offset 后的 BBox 上的连接点
 const getBoxPoints = (
   point: PolyPoint, // 被 gridSize 格式化后的位置（anchorPoint）
   oriPoint: PolyPoint, // 未被 gridSize 格式化的位置（anchorPoint）
   node: INode, // 原始节点，用于获取 bbox
   anotherPoint: PolyPoint, // 另一端被 gridSize 格式化后的位置
   cfg: RouterCfg,
 ): PolyPoint[] => {
   const points = [];
   // create-edge 生成边的过程中，endNode 为 null
   if (!node) {
     return [point];
   }
 
   const { directions, offset } = cfg;
   const bbox = node.getBBox();
   const isInside =
     oriPoint.x > bbox.minX &&
     oriPoint.x < bbox.maxX &&
     oriPoint.y > bbox.minY &&
     oriPoint.y < bbox.maxY;
 
   const expandBBox = getExpandedBBox(bbox, offset);
   for (const i in expandBBox) {
     expandBBox[i] = pos2GridIx(expandBBox[i], cfg.gridSize);
   }
 
   if (isInside) {
     // 如果 anchorPoint 在节点内部，允许第一段线穿过节点
     for (const dir of directions) {
       const bounds = [
         [
           {
             x: expandBBox.minX,
             y: expandBBox.minY,
           },
           {
             x: expandBBox.maxX,
             y: expandBBox.minY,
           },
         ],
         [
           {
             x: expandBBox.minX,
             y: expandBBox.minY,
           },
           {
             x: expandBBox.minX,
             y: expandBBox.maxY,
           },
         ],
         [
           {
             x: expandBBox.maxX,
             y: expandBBox.minY,
           },
           {
             x: expandBBox.maxX,
             y: expandBBox.maxY,
           },
         ],
         [
           {
             x: expandBBox.minX,
             y: expandBBox.maxY,
           },
           {
             x: expandBBox.maxX,
             y: expandBBox.maxY,
           },
         ],
       ];
       for (let i = 0; i < 4; i++) {
         const boundLine = bounds[i];
         const insterctP = Util.getLineIntersect(
           point,
           { x: point.x + dir.stepX * expandBBox.width, y: point.y + dir.stepY * expandBBox.height },
           boundLine[0],
           boundLine[1],
         ) as PolyPoint;
         if (insterctP && !isSegmentCrossingBBox(point, insterctP, bbox)) {
           insterctP.id = `${insterctP.x}|||${insterctP.y}`;
           points.push(insterctP);
         }
       }
     }
     return points;
   }
   // 如果 anchorPoint 在节点上，只有一个可选方向
   const insterctP = getExpandedBBoxPoint(expandBBox, point, anotherPoint);
   insterctP.id = `${insterctP.x}|||${insterctP.y}`;
   return [insterctP];
 };
 
 const getDirectionChange = (
   current: PolyPoint,
   neighbor: PolyPoint,
   cameFrom: {
     [key: string]: {
       id: string;
       x: number;
       y: number;
     };
   },
   scaleStartPoint: PolyPoint,
 ): number => {
   const directionAngle = getDirectionAngle(current, neighbor);
   const currentCameFrom = cameFrom[current.id]
   if (!currentCameFrom) {
     const startAngle = getDirectionAngle(scaleStartPoint, current);
     return getAngleDiff(startAngle, directionAngle);
   }
   const prevDirectionAngle = getDirectionAngle(
     {
       x: currentCameFrom.x,
       y: currentCameFrom.y,
     },
     current,
   );
   return getAngleDiff(prevDirectionAngle, directionAngle);
 };
 
 const getControlPoints = (
   current,
   cameFrom,
   scaleStartPoint,
   endPoint,
   startPoint,
   scaleEndPoint,
   gridSize,
 ) => {
   const controlPoints = [endPoint];
   let pointZero = endPoint;
   let currentId = current.id;
   let currentX = current.x;
   let currentY = current.y;
   const lastPoint = {
     x: currentX,
     y: currentY,
     id: currentId,
   };
   if (getDirectionChange(lastPoint, scaleEndPoint, cameFrom, scaleStartPoint)) {
     pointZero = {
       x: scaleEndPoint.x === endPoint.x ? endPoint.x : lastPoint.x * gridSize,
       y: scaleEndPoint.y === endPoint.y ? endPoint.y : lastPoint.y * gridSize,
     };
     controlPoints.unshift(pointZero);
   }
   let currentCameFrom = cameFrom[currentId];
   while (currentCameFrom && currentCameFrom.id !== currentId) {
     const point = {
       x: currentX,
       y: currentY,
       id: currentId,
     };
     const prePoint = {
       x: currentCameFrom.x,
       y: currentCameFrom.y,
       id: currentCameFrom.id,
     };
     const directionChange = getDirectionChange(prePoint, point, cameFrom, scaleStartPoint);
     if (directionChange) {
       pointZero = {
         x: prePoint.x === point.x ? pointZero.x : prePoint.x * gridSize,
         y: prePoint.y === point.y ? pointZero.y : prePoint.y * gridSize,
       }
       controlPoints.unshift(pointZero);
     }
 
     currentId = prePoint.id;
     currentX = prePoint.x;
     currentY = prePoint.y;
     currentCameFrom = cameFrom[currentId];
   }
 
   // 和startNode对齐
   controlPoints[0].x = currentX === scaleStartPoint.x ? startPoint.x : pointZero.x;
   controlPoints[0].y = currentY === scaleStartPoint.y ? startPoint.y : pointZero.y;
   controlPoints.unshift(startPoint);
   return controlPoints;
 };
 
 
 export const pathFinder = (
   startPoint: PolyPoint,
   endPoint: PolyPoint,
   startNode: INode,
   endNode: INode,
   routerCfg?: RouterCfg,
 ): PolyPoint[] => {
   if (isNaN(startPoint.x) || isNaN(endPoint.x)) return [];
   const cfg: RouterCfg = deepMix(defaultCfg, routerCfg);
   cfg.obstacles = cfg.obstacles || [];
   const { penalties, gridSize } = cfg;
   const map = getObstacleMap(cfg.obstacles.concat([startNode, endNode]), gridSize, cfg.offset);
 
   const scaleStartPoint = {
     x: pos2GridIx(startPoint.x, gridSize),
     y: pos2GridIx(startPoint.y, gridSize),
   };
   const scaleEndPoint = {
     x: pos2GridIx(endPoint.x, gridSize),
     y: pos2GridIx(endPoint.y, gridSize),
   };
 
   startPoint.id = `${scaleStartPoint.x}|||${scaleStartPoint.y}`;
   endPoint.id = `${scaleEndPoint.x}|||${scaleEndPoint.y}`;
   const startPoints = getBoxPoints(scaleStartPoint, startPoint, startNode, scaleEndPoint, cfg);
   const endPoints = getBoxPoints(scaleEndPoint, endPoint, endNode, scaleStartPoint, cfg);
   startPoints.forEach((point) => {
     delete map[point.id];
   });
   endPoints.forEach((point) => {
     delete map[point.id];
   });
 
   const openSet = {};
   const closedSet = {};
   const cameFrom: {
     [key: string]: {
       id: string;
       x: number;
       y: number;
     };
   } = {};
 
   // 从起点到当前点已产生的 cost, default: Infinity
   const gScore: {
     [key: string]: number;
   } = {};
 
   // 起点经过当前点到达终点预估的 cost, default: Infinity
   const fScore: {
     [key: string]: number;
   } = {};
 
   const sortedOpenSet = new SortedArray();
 
   // initialize
   for (let i = 0; i < startPoints.length; i++) {
     const firstStep = startPoints[i];
     openSet[firstStep.id] = firstStep;
     gScore[firstStep.id] = 0;
     fScore[firstStep.id] = estimateCost(firstStep, endPoints, cfg.distFunc);
     sortedOpenSet.add({
       id: firstStep.id,
       value: fScore[firstStep.id]
     });
   }
   let remainLoops = cfg.maximumLoops;
   let current, direction, neighbor, neighborCost, costFromStart, directionChange;
   let curCost = Infinity;
   const endPointMap = {};
   endPoints.forEach(point => {
     endPointMap[`${point.x}|||${point.y}`] = true;
   })
   Object.keys(openSet).forEach((key) => {
     const id = openSet[key].id;
     if (fScore[id] <= curCost) {
       curCost = fScore[id];
       current = openSet[id];
     }
   });
   while (Object.keys(openSet).length > 0 && remainLoops > 0) {
     const minId = sortedOpenSet.minId((remainLoops + 1) % 30 === 0);
     if (minId) {
       current = openSet[minId];
     } else {
       break;
     }
 
     // 如果 fScore 最小的点就是终点
     if (endPointMap[`${current.x}|||${current.y}`]) {
       return getControlPoints(
         current,
         cameFrom,
         scaleStartPoint,
         endPoint,
         startPoint,
         scaleEndPoint,
         gridSize,
       );
     }
 
     delete openSet[current.id];
     sortedOpenSet.remove(current.id);
     closedSet[current.id] = true;
 
     // 获取符合条件的下一步的候选连接点
     // 沿候选方向走一步
     for (let i = 0; i < cfg.directions.length; i++) {
       direction = cfg.directions[i];
       const neighborId = `${Math.round(current.x) + direction.stepX}|||${Math.round(current.y) + direction.stepY
         }`
       neighbor = {
         x: current.x + direction.stepX,
         y: current.y + direction.stepY,
         id: neighborId,
       };
 
       if (closedSet[neighborId]) continue;
       directionChange = getDirectionChange(current, neighbor, cameFrom, scaleStartPoint);
       if (directionChange > cfg.maxAllowedDirectionChange) continue;
       if (map[neighborId]) continue; // 如果交叉则跳过
 
       // 将候选点加入 openSet, 并计算每个候选点的 cost
       if (!openSet[neighborId]) {
         openSet[neighborId] = neighbor;
       }
 
       const directionPenalties = penalties[directionChange]
       neighborCost =
         cfg.distFunc(current, neighbor) +
         (isNaN(directionPenalties) ? gridSize : directionPenalties);
       costFromStart = gScore[current.id] + neighborCost;
       const neighborGScore = gScore[neighborId];
       if (neighborGScore && costFromStart >= neighborGScore) {
         continue;
       }
 
       cameFrom[neighborId] = current;
       gScore[neighborId] = costFromStart;
       fScore[neighborId] = costFromStart + estimateCost(neighbor, endPoints, cfg.distFunc);
 
       sortedOpenSet.add({
         id: neighborId,
         value: fScore[neighborId]
       });
     }
     remainLoops -= 1;
   }
   return cfg.fallbackRoute(startPoint, endPoint, startNode, endNode, cfg);
 };
 