import each from '@antv/util/lib/each'
import isNil from '@antv/util/lib/is-nil';
import mix from '@antv/util/lib/mix'
import { IEdge, INode } from '@g6/interface/item';
import { IPoint, IShapeBase, NodeConfig } from '@g6/types';
import { distance, getCircleIntersectByPoint, getEllispeIntersectByPoint, getRectIntersectByPoint } from '@g6/util/math';
import Edge from './edge';
import Item from './item'

const CACHE_ANCHOR_POINTS = 'anchorPointsCache'
const CACHE_BBOX = 'bboxCache'

export default class Node extends Item implements INode {
  private getNearestPoint(points: IPoint[], curPoint: IPoint): IPoint {
    let index = 0;
    let nearestPoint = points[0];
    let minDistance = distance(points[0], curPoint);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const dis = distance(point, curPoint);
      if (dis < minDistance) {
        nearestPoint = point;
        minDistance = dis;
        index = i;
      }
    }
    nearestPoint.anchorIndex = index;
    return nearestPoint;
  }
  public getDefaultCfg() {
    return {
      type: 'node',
      edges: []
    }
  }

  /**
   * 获取从节点关联的所有边
   */
  public getEdges(): IEdge[] {
    return this.get('edges')
  }

  /**
   * 获取所有的入边
   */
  public getInEdges(): Edge[] {
    const self = this;
    return this.get('edges').filter((edge: Edge) => {
      return edge.get('target') === self;
    });
  }

  /**
   * 获取所有的出边
   */
  public getOutEdges(): Edge[] {
    const self = this;
    return this.get('edges').filter((edge: Edge) => {
      return edge.get('source') === self;
    });
  }

  /**
   * 根据锚点的索引获取连接点
   * @param  {Number} index 索引
   */
  public getLinkPointByAnchor(index): IPoint {
    const anchorPoints = this.getAnchorPoints();
    return anchorPoints[index];
  }

  /**
   * 获取连接点
   * @param point 
   */
  public getLinkPoint(point: IPoint): IPoint {
    const keyShape: IShapeBase = this.get('keyShape');
    const type: string = keyShape.get('type');
    const bbox = this.getBBox();
    const { centerX, centerY } = bbox;
    const anchorPoints = this.getAnchorPoints();
    let intersectPoint: IPoint;
    switch (type) {
      case 'circle':
        intersectPoint = getCircleIntersectByPoint({
          x: centerX,
          y: centerY,
          r: bbox.width / 2
        }, point);
        break;
      case 'ellipse':
        intersectPoint = getEllispeIntersectByPoint({
          x: centerX,
          y: centerY,
          rx: bbox.width / 2,
          ry: bbox.height / 2
        }, point);
        break;
      default:
        intersectPoint = getRectIntersectByPoint(bbox, point);
    }
    let linkPoint = intersectPoint;
    // 如果存在锚点，则使用交点计算最近的锚点
    if (anchorPoints.length) {
      if (!linkPoint) { // 如果计算不出交点
        linkPoint = point;
      }
      linkPoint = this.getNearestPoint(anchorPoints, linkPoint);
    }
    if (!linkPoint) { // 如果最终依然没法找到锚点和连接点，直接返回中心点
      linkPoint = { x: centerX, y: centerY };
    }
    return linkPoint;
  }

  /**
   * 获取锚点的定义
   * @return {array} anchorPoints
   */
  public getAnchorPoints(): IPoint[] {
    let anchorPoints: IPoint[] = this.get(CACHE_ANCHOR_POINTS);
    if (!anchorPoints) {
      anchorPoints = [];
      const shapeFactory = this.get('shapeFactory');
      const bbox = this.getBBox();
      const model: NodeConfig = this.get('model');
      const shapeCfg = this.getShapeCfg(model);
      const points = shapeFactory.getAnchorPoints(model.shape, shapeCfg) || [];
      each(points, (pointArr, index) => {
        const point = mix({
          x: bbox.minX + pointArr.x * bbox.width,
          y: bbox.minY + pointArr.y * bbox.height
        }, pointArr.anchorIndex, {
          index
        });
        anchorPoints.push(point);
      });
      this.set(CACHE_ANCHOR_POINTS, anchorPoints);
    }
    return anchorPoints;
  }

  /**
   * add edge
   * @param edge Edge instance
   */
  public addEdge(edge: IEdge) {
    this.get('edges').push(edge)
  }

  /**
   * 锁定节点
   */
  public lock() {
    this.set('locked', true);
  }

  /**
   * 解锁锁定的节点
   */
  public unlock() {
    this.set('locked', false);
  }

  public hasLocked(): boolean {
    return this.get('locked');
  }

  /**
   * 移除边
   * @param {Edge} edge 边
   */
  public removeEdge(edge: IEdge) {
    const edges = this.getEdges();
    const index = edges.indexOf(edge);
    if (index > -1) {
      edges.splice(index, 1);
    }
  }

  public clearCache() {
    this.set(CACHE_BBOX, null); // 清理缓存的 bbox
    this.set(CACHE_ANCHOR_POINTS, null);
  }

  /**
   * 是否仅仅移动节点，其他属性没变化
   * @param cfg 节点数据模型
   */
  public isOnlyMove(cfg: NodeConfig): boolean {
    if(!cfg) {
      return false
    }

    const existX = !isNil(cfg.x)
    const existY = !isNil(cfg.y)

    const keys = Object.keys(cfg)

    // 仅有一个字段，包含 x 或者 包含 y
    // 两个字段，同时有 x，同时有 y
    return (keys.length === 1 && (existX || existY))
      || (keys.length === 2 && existX && existY)
  }
}