/**
 * @fileOverview node item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Item = require('./item');
const CACHE_ANCHOR_POINTS = 'anchorPointsCache';
const CACHE_BBOX = 'bboxCache';

function getNearestPoint(points, curPoint) {
  let index = 0;
  let nearestPoint = points[0];
  let minDistance = pointDistance(points[0], curPoint);
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const distance = pointDistance(point, curPoint);
    if (distance < minDistance) {
      nearestPoint = point;
      minDistance = distance;
      index = i;
    }
  }
  nearestPoint.anchorIndex = index;
  return nearestPoint;
}

function pointDistance(p1, p2) {
  return (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
}

class Node extends Item {
  getDefaultCfg() {
    return {
      type: 'node',
      anchors: [],
      edges: [],
      status: []
    };
  }

  // getNeighbors() {
  //   const nodes = [];
  //   let node = null;
  //   Util.each(this.get('edges'), edge => {
  //     if (edge.get('source') === this) {
  //       node = edge.get('target');
  //     } else {
  //       node = edge.get('source');
  //     }
  //     if (nodes.indexOf(node) < 0) {
  //       nodes.push(node);
  //     }
  //   });
  //   return nodes;
  // }

  /**
   * 获取从节点关联的所有边
   * @return {Array} 边的集合
   */
  getEdges() {
    return this.get('edges');
  }
  /**
   * 获取引入节点的边 target == this
   * @return {Array} 边的集合
   */
  getInEdges() {
    const self = this;
    return this.get('edges').filter(edge => {
      return edge.get('target') === self;
    });
  }
  /**
   * 获取从节点引出的边 source == this
   * @return {Array} 边的集合
   */
  getOutEdges() {
    const self = this;
    return this.get('edges').filter(edge => {
      return edge.get('source') === self;
    });
  }

  // showAnchors() {
  //   // todo
  // }
  // hideAnchors() {

  // }
  /**
   * 根据锚点的索引获取连接点
   * @param  {Number} index 索引
   * @return {Object} 连接点 {x,y}
   */
  getLinkPointByAnchor(index) {
    const anchorPoints = this.getAnchorPoints();
    return anchorPoints[index];
  }

  /**
    * 获取连接点
    * @param {Object} point 节点外面的一个点，用于计算交点、最近的锚点
    * @return {Object} 连接点 {x,y}
    */
  getLinkPoint(point) {
    // const model = this.get('model');
    const keyShape = this.get('keyShape');
    const type = keyShape.get('type');
    const bbox = this.getBBox();
    const { centerX, centerY } = bbox;
    const anchorPoints = this.getAnchorPoints();
    let intersectPoint;
    switch (type) {
      case 'circle':
        intersectPoint = Util.getCircleIntersectByPoint({
          x: centerX,
          y: centerY,
          r: bbox.width / 2
        }, point);
        break;
      case 'ellipse':
        intersectPoint = Util.getEllispeIntersectByPoint({
          x: centerX,
          y: centerY,
          rx: bbox.width / 2,
          ry: bbox.height / 2
        }, point);
        break;
      default:
        intersectPoint = Util.getRectIntersectByPoint(bbox, point);
    }
    let linkPoint = intersectPoint;
    // 如果存在锚点，则使用交点计算最近的锚点
    if (anchorPoints.length) {
      if (!linkPoint) { // 如果计算不出交点
        linkPoint = point;
      }
      linkPoint = getNearestPoint(anchorPoints, linkPoint);
    }
    if (!linkPoint) { // 如果最终依然没法找到锚点和连接点，直接返回中心点
      linkPoint = { x: centerX, y: centerY };
    }
    return linkPoint;
  }

  /**
   * 添加边
   * @param {Edge} edge 边
   */
  addEdge(edge) {
    this.get('edges').push(edge);
  }

  /**
   * 移除边
   * @param {Edge} edge 边
   */
  removeEdge(edge) {
    const edges = this.getEdges();
    const index = edges.indexOf(edge);
    if (index > -1) {
      edges.splice(index, 1);
    }
  }

  clearCache() {
    this.set(CACHE_BBOX, null); // 清理缓存的 bbox
    this.set(CACHE_ANCHOR_POINTS, null);
  }

  // 是否仅仅移动节点，其他属性没变化
  _isOnlyMove(cfg) {
    if (!cfg) {
      return false; // 刷新时不仅仅移动
    }
    // 不能直接使用 cfg.x && cfg.y 这类的判定，因为 0 的情况会出现
    const existX = !Util.isNil(cfg.x);
    const existY = !Util.isNil(cfg.y);
    const keys = Object.keys(cfg);
    return (keys.length === 1 && (existX || existY)) // 仅有一个字段，包含 x 或者 包含 y
      || (keys.length === 2 && existX && existY); // 两个字段，同时有 x，同时有 y
  }

  /**
   * 获取锚点的定义
   * @return {array} anchorPoints， {x,y,...cfg}
   */
  getAnchorPoints() {
    let anchorPoints = this.get(CACHE_ANCHOR_POINTS);
    if (!anchorPoints) {
      anchorPoints = [];
      const shapeFactory = this.get('shapeFactory');
      const bbox = this.getBBox();
      const model = this.get('model');
      const shapeCfg = this.getShapeCfg(model);
      const points = shapeFactory.getAnchorPoints(model.shape, shapeCfg) || [];
      Util.each(points, (pointArr, index) => {
        const point = Util.mix({
          x: bbox.minX + pointArr[0] * bbox.width,
          y: bbox.minY + pointArr[1] * bbox.height
        }, pointArr[2], {
          index
        });
        anchorPoints.push(point);
      });
      this.set(CACHE_ANCHOR_POINTS, anchorPoints);
    }
    return anchorPoints;
  }
}
module.exports = Node;
