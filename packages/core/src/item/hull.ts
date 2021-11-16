import { IGroup } from '@antv/g-base';
import { deepMix, isString } from '@antv/util';
import { parsePathString } from '@antv/path-util';
import { Item, BubblesetCfg, HullCfg } from '../types';
import { pathToPoints, getClosedSpline, roundedHull, paddedHull } from '../util/path';

import { isPolygonsIntersect } from '../util/math';
import { IAbstractGraph } from '../interface/graph';

import { genConvexHull } from '../element/hull/convexHull';
import { genBubbleSet } from '../element/hull/bubbleset';

/**
 * 用于包裹内部的成员的轮廓。
 * convex hull(凸包)：http://geomalgorithms.com/a10-_hull-1.html#Monotone%20Chain
 * bubble: 使用 bubbleset算法，refer: http://vialab.science.uoit.ca/wp-content/papercite-data/pdf/col2009c.pdf
 * 通过配置 padding 可以调节包裹轮廓对节点的松紧程度
 */
export default class Hull {
  id: string;

  graph: IAbstractGraph;

  cfg: any;

  path: any[][];

  group: IGroup;

  members: Item[];

  nonMembers: Item[];

  padding: number;

  bubbleCfg: Partial<BubblesetCfg>;

  type: string;

  constructor(graph: IAbstractGraph, cfg: HullCfg) {
    this.cfg = deepMix(this.getDefaultCfg(), cfg);
    this.graph = graph;
    this.id = this.cfg.id;
    this.group = this.cfg.group;
    this.members = this.cfg.members.map((item) => (isString(item) ? graph.findById(item) : item));
    this.nonMembers = this.cfg.nonMembers.map((item) =>
      isString(item) ? graph.findById(item) : item,
    );
    this.setPadding();
    this.setType();

    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  }

  public getDefaultCfg(): HullCfg {
    return {
      id: 'g6-hull',
      type: 'round-convex', // 'round-convex' /'smooth-convex' / 'bubble'
      members: [],
      nonMembers: [],
      style: {
        fill: 'lightblue',
        stroke: 'blue',
        opacity: 0.2,
      },
      padding: 10,
    };
  }

  setPadding() {
    const nodeSize = this.members.length && this.members[0].getKeyShape().getCanvasBBox().width / 2;
    this.padding = this.cfg.padding > 0 ? this.cfg.padding + nodeSize : 10 + nodeSize;
    this.cfg.bubbleCfg = {
      nodeR0: this.padding - nodeSize,
      nodeR1: this.padding - nodeSize,
      morphBuffer: this.padding - nodeSize,
    };
  }

  setType() {
    this.type = this.cfg.type;
    if (this.members.length < 3) {
      this.type = 'round-convex';
    }
    if (this.type !== 'round-convex' && this.type !== 'smooth-convex' && this.type !== 'bubble') {
      console.warn(
        'The hull type should be either round-convex, smooth-convex or bubble, round-convex is used by default.',
      );
      this.type = 'round-convex';
    }
  }

  calcPath(members: Item[], nonMembers: Item[]) {
    let contour, path, hull;
    switch (this.type) {
      case 'round-convex':
        contour = genConvexHull(members);
        hull = roundedHull(
          contour.map((p) => [p.x, p.y]),
          this.padding,
        );
        path = parsePathString(hull);
        break;
      case 'smooth-convex':
        contour = genConvexHull(members);
        if (contour.length === 2) {
          hull = roundedHull(
            contour.map((p) => [p.x, p.y]),
            this.padding,
          );
          path = parsePathString(hull);
        } else if (contour.length > 2) {
          hull = paddedHull(
            contour.map((p) => [p.x, p.y]),
            this.padding,
          );
          path = getClosedSpline(hull);
        }
        break;
      case 'bubble':
        contour = genBubbleSet(members, nonMembers, this.cfg.bubbleCfg);
        path = contour.length >= 2 && getClosedSpline(contour);
        break;
      default:
    }
    return path;
  }

  render() {
    this.group.addShape('path', {
      attrs: {
        path: this.path,
        ...this.cfg.style,
      },
      id: this.id,
      name: this.cfg.id,
      capture: false
    });
    this.group.toBack();
  }

  /**
   * 增加hull的成员，同时如果该成员原先在nonMembers中，则从nonMembers中去掉
   * @param item 节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  public addMember(item: Item | string): boolean {
    if (!item) return;
    if (isString(item)) item = this.graph.findById(item);
    this.members.push(item);
    const index = this.nonMembers.indexOf(item);
    if (index > -1) {
      this.nonMembers.splice(index, 1);
    }
    this.updateData(this.members, this.nonMembers);
    return true;
  }

  /**
   * 增加hull需要排除的节点，同时如果该成员原先在members中，则从members中去掉
   * @param item 节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  public addNonMember(item: Item | string): boolean {
    if (!item) return;
    if (isString(item)) item = this.graph.findById(item);
    this.nonMembers.push(item);
    const index = this.members.indexOf(item);
    if (index > -1) {
      this.members.splice(index, 1);
    }
    this.updateData(this.members, this.nonMembers);
    return true;
  }

  /**
   * 移除hull中的成员
   * @param node 节点实例
   * @return boolean 移除成功返回 true，否则返回 false
   */
  public removeMember(item: Item | string): boolean {
    if (!item) return;
    if (isString(item)) item = this.graph.findById(item);
    const index = this.members.indexOf(item);
    if (index > -1) {
      this.members.splice(index, 1);
      this.updateData(this.members, this.nonMembers);
      return true;
    }
    return false;
  }

  /**
   * @param node 节点实例
   * @return boolean 移除成功返回 true，否则返回 false
   */
  public removeNonMember(item: Item | string): boolean {
    if (!item) return;
    if (isString(item)) item = this.graph.findById(item);
    const index = this.nonMembers.indexOf(item);
    if (index > -1) {
      this.nonMembers.splice(index, 1);
      this.updateData(this.members, this.nonMembers);
      return true;
    }
    return false;
  }

  public updateData(members: Item[] | string[], nonMembers: string[] | Item[]) {
    this.group.findById(this.id).remove();
    if (members)
      this.members = (members as any[]).map((item) =>
        isString(item) ? this.graph.findById(item) : item,
      );
    if (nonMembers)
      this.nonMembers = (nonMembers as any[]).map((item) =>
        isString(item) ? this.graph.findById(item) : item,
      );
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  }

  public updateStyle(cfg: HullCfg['style']) {
    const path = this.group.findById(this.id);
    path.attr({
      ...cfg,
    });
  }

  /**
   * 更新 hull
   * @param cfg hull 配置项
   */
  public updateCfg(cfg: Partial<HullCfg>) {
    this.cfg = deepMix(this.cfg, cfg);
    this.id = this.cfg.id;
    this.group = this.cfg.group;
    if (cfg.members) {
      this.members = this.cfg.members.map((item) =>
        isString(item) ? this.graph.findById(item) : item,
      );
    }
    if (cfg.nonMembers) {
      this.nonMembers = this.cfg.nonMembers.map((item) =>
        isString(item) ? this.graph.findById(item) : item,
      );
    }
    // TODO padding 设置太大，会影响到 contain 结果
    this.setPadding();
    this.setType();
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  }

  /**
   * 判断是否在hull内部
   * @param item
   */
  public contain(item: Item | string): boolean {
    let nodeItem: Item;
    if (isString(item)) {
      nodeItem = this.graph.findById(item);
    } else {
      nodeItem = item;
    }
    let shapePoints;
    const shape = nodeItem.getKeyShape();
    if (nodeItem.get('type') === 'path') {
      shapePoints = pathToPoints(shape.attr('path'));
    } else {
      const shapeBBox = shape.getCanvasBBox();
      shapePoints = [
        [shapeBBox.minX, shapeBBox.minY],
        [shapeBBox.maxX, shapeBBox.minY],
        [shapeBBox.maxX, shapeBBox.maxY],
        [shapeBBox.minX, shapeBBox.maxY],
      ];
    }
    shapePoints = shapePoints.map((canvasPoint) => {
      const point = this.graph.getPointByCanvas(canvasPoint[0], canvasPoint[1]);
      return [point.x, point.y];
    });
    return isPolygonsIntersect(shapePoints, pathToPoints(this.path));
  }

  public destroy() {
    this.group.remove();
    this.cfg = null;
  }
}
