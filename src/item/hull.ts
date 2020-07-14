import { IGroup } from '@antv/g-base';
import { deepMix, isString } from '@antv/util';
import { Item, BubblesetCfg, HullCfg } from '../types';
import { getSpline, pathToPoints } from '../util/path';
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
  bubbleCfg: BubblesetCfg;

  constructor(graph: IGraph, cfg: HullCfg) {
    this.cfg = deepMix(this.getDefaultCfg(), cfg)
    this.graph = graph
    this.id = this.cfg.id
    this.group = this.cfg.group
    this.members = cfg.members || []
    this.nonMembers = cfg.nonMembers || []
    !isNaN(this.cfg.padding) && (this.cfg.bubbleCfg = {
      nodeR0: this.cfg.padding,
      nodeR1: this.cfg.padding * 2,
      morphBuffer: this.cfg.padding
    })
    this.path = this.calcPath(this.members, this.nonMembers)
    this.render()

    if (this.cfg.autoUpdate) {
      graph.on('afterremoveitem', e => {
        this.removeMember(e.item)
        this.removeNonMember(e.item)
      })
      graph.on('afterupdateitem', e => {
        if (e.item.getContainer().get('capture') && this.members.indexOf(e.item) > -1 || this.nonMembers.indexOf(e.item) > -1) {
          this.updateData(this.members, this.nonMembers)
        }
      })
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

  public getDefaultCfg(): HullCfg {
    return {
      id: 'g6-hull',
      mode: 'bubble', // 'convex' or 'bubble'
      name: 'g6-hull',
      members: [],
      nonMembers: [],
      style: {
        fill: 'lightblue',
        stroke: 'blue',
        opacity: 0.2,
      },
      autoUpdate: false,
      bubbleCfg: {
        nodeR0: 5,
        nodeR1: 10,
        morphBuffer: 5
      }
    }
  }

  calcPath(members: Item[], nonMembers: Item[],) {
    let contour = []
    if (this.cfg.mode === 'convex') {
      contour = genConvexHull(members)
    } else if (this.cfg.mode === 'bubble') {
      contour = genBubbleSet(members, nonMembers, this.cfg.bubbleCfg)
    } else {
      console.warn('Set mode to convex or bubble.')
    }
    const path = contour.length >= 2 && getSpline(contour)
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
  * 移除hull中的成员，且添加到nonMembers中
  * @param node 节点实例
  * @return boolean 移除成功返回 true，否则返回 false
  */
  public removeMember(item: Item): boolean {
    if (!item) return;
    const index = this.members.indexOf(item);
    if (index > -1) {
      this.members.splice(index, 1);
      this.nonMembers.push(item)
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