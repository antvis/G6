import { IGroup } from '@antv/g-base';
import { deepMix, isString } from '@antv/util';
import { parsePathString } from '@antv/path-util';
import { Item, BubblesetCfg, HullCfg } from '../types';
import { pathToPoints, getClosedSpline, roundedHull, paddedHull } from '../util/path';

import { isPolygonsIntersect } from '../util/math';
import { IGraph } from '../interface/graph';

import { genConvexHull } from '../shape/hull/convexHull';
import { genBubbleSet } from '../shape/hull/bubbleset';

export default class Hull {
  id: string;
  graph: IGraph;
  cfg: any;
  path: any[][];
  group: IGroup;
  members: Item[];
  nonMembers: Item[];
  padding: number;
  bubbleCfg: BubblesetCfg;

  constructor(graph: IGraph, cfg: HullCfg) {
    this.cfg = deepMix(this.getDefaultCfg(), cfg)
    this.graph = graph
    this.id = this.cfg.id
    this.group = this.cfg.group
    this.members = this.cfg.members.map(item => isString(item) ? graph.findById(item) : item)
    this.nonMembers = this.cfg.nonMembers.map(item => isString(item) ? graph.findById(item) : item)

    const nodeSize = this.members.length && this.members[0].getKeyShape().getCanvasBBox().width / 2
    this.padding = this.cfg.padding > 0 ? this.cfg.padding + nodeSize : 10 + nodeSize;
    this.cfg.bubbleCfg = {
      nodeR0: this.padding - nodeSize,
      nodeR1: this.padding - nodeSize,
      morphBuffer: this.padding - nodeSize
    }
    this.path = this.calcPath(this.members, this.nonMembers)
    this.render()

    if (this.cfg.update && this.cfg.update !== 'none') {
      graph.on('afterremoveitem', e => {
        this.removeMember(e.item)
        this.removeNonMember(e.item)
      })
      if (this.cfg.update === 'auto') {
        graph.on('afterupdateitem', e => {
          if (this.members.indexOf(e.item) > -1 || this.nonMembers.indexOf(e.item) > -1) {
            this.updateData(this.members, this.nonMembers)
          }
        })
      } else if (this.cfg.update === 'drag') { // 允许拖拽调整hull的成员
        graph.on('node:dragend', e => {
          const item = e.item;
          const memberIdx = this.members.indexOf(item)
          if (memberIdx > -1) {
            // 如果移出原hull范围，则去掉
            if (!this.contain(item)) {
              this.removeMember(item)
            }
            else {
              this.updateData(this.members, this.nonMembers)
            }
          } else {
            if (this.contain(item)) this.addMember(item)
          }
        })
      }
    }
  }

  public getDefaultCfg(): HullCfg {
    return {
      id: 'g6-hull',
      type: 'round-convex', // 'round-convex' /'smooth-convex' / 'bubble'
      name: 'g6-hull',
      members: [],
      nonMembers: [],
      style: {
        fill: 'lightblue',
        stroke: 'blue',
        opacity: 0.2,
      },
      update: 'auto',
      padding: 10,
    }
  }

  calcPath(members: Item[], nonMembers: Item[]) {
    let contour, path, hull;
    let type = this.cfg.type

    if (members.length < 3) {
      type = 'round-convex'
    }

    switch (type) {
      case 'round-convex':
        contour = genConvexHull(members)
        hull = roundedHull(contour.map(p => [p.x, p.y]), this.padding)
        path = parsePathString(hull)
        break;
      case 'smooth-convex':
        contour = genConvexHull(members)
        hull = paddedHull(contour.map(p => [p.x, p.y]), this.padding)
        path = contour.length >= 2 && getClosedSpline(hull)
        break;
      case 'bubble':
        contour = genBubbleSet(members, nonMembers, this.cfg.bubbleCfg)
        path = contour.length >= 2 && getClosedSpline(contour)
        break;
      default:
        console.warn('Set type to round-convex, smooth-convex or bubble.')
        path = []
    }
    return path
  }

  render() {
    this.group.addShape('path', {
      attrs: {
        path: this.path,
        ...this.cfg.style
      },
      id: this.id,
      name: this.cfg.name,
    })
    this.group.toBack()
  }

  /**
   * 增加hull的成员，同时如果该成员原先在nonMembers中，则从nonMembers中去掉
   * @param item 节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  public addMember(item: Item): boolean {
    if (!item) return;
    this.members.push(item)
    const index = this.nonMembers.indexOf(item);
    if (index > -1) {
      this.nonMembers.splice(index, 1);
    }
    this.updateData(this.members, this.nonMembers)
    return true;
  }

  /**
   * 增加hull需要排除的节点，同时如果该成员原先在members中，则从members中去掉
   * @param item 节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  public addNonMember(item: Item): boolean {
    if (!item) return;
    this.nonMembers.push(item)
    const index = this.members.indexOf(item);
    if (index > -1) {
      this.members.splice(index, 1);
    }
    this.updateData(this.members, this.nonMembers)
    return true;
  }

  /**
  * 移除hull中的成员
  * @param node 节点实例
  * @return boolean 移除成功返回 true，否则返回 false
  */
  public removeMember(item: Item): boolean {
    if (!item) return;
    const index = this.members.indexOf(item);
    if (index > -1) {
      this.members.splice(index, 1);
      this.updateData(this.members, this.nonMembers)
      return true;
    }
    return false;
  }

  /**
  * @param node 节点实例
  * @return boolean 移除成功返回 true，否则返回 false
  */
  public removeNonMember(item: Item): boolean {
    if (!item) return;
    const index = this.nonMembers.indexOf(item);
    if (index > -1) {
      this.nonMembers.splice(index, 1);
      this.updateData(this.members, this.nonMembers)
      return true;
    }
    return false;
  }

  public updateData(members: Item[], nonMembers: Item[]) {
    this.group.findById(this.id).remove()
    this.members = members
    this.nonMembers = nonMembers
    this.path = this.calcPath(members, nonMembers)
    this.render()
  }

  public updateStyle(cfg: HullCfg["style"]) {
    const path = this.group.findById(this.id)
    path.attr({
      ...cfg
    });
  }

  /**
   * 判断是否在hull内部
   * @param item 
   */
  public contain(item: Item | string): boolean {
    let nodeItem: Item;
    if (isString(item)) {
      nodeItem = this.graph.findById(item)
    } else {
      nodeItem = item;
    }
    let shapePoints;
    const shape = nodeItem.getKeyShape()
    if (nodeItem.get('type') === 'path') {
      shapePoints = pathToPoints(shape.attr('path'))
    } else {
      const shapeBBox = shape.getCanvasBBox();
      shapePoints = [[shapeBBox.minX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.maxY], [shapeBBox.minX, shapeBBox.maxY]];
    }
    shapePoints = shapePoints.map(canvasPoint => {
      const point = this.graph.getPointByCanvas(canvasPoint[0], canvasPoint[1])
      return [point.x, point.y]
    })
    return isPolygonsIntersect(shapePoints, pathToPoints(this.path))
  }

  public destroy() {
    this.group.remove()
    this.cfg = null;
  }
}