/*
 * @Author: moyee
 * @Date: 2019-06-27 18:12:06
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-22 18:41:45
 * @Description: 拖动节点的Behavior
 */
import { Point } from '@antv/g-base/lib/types';
import deepMix from '@antv/util/lib/deep-mix';
import isString from '@antv/util/lib/is-string'
import { INode } from '@g6/interface/item';
import { G6Event, IG6GraphEvent, Item, NodeConfig } from "@g6/types";
import Global from '../global'


const body = document.body;

export default {
  getDefaultCfg(): object {
    return {
      updateEdge: true,
      delegateStyle: {},
      // 是否开启delegate
      enableDelegate: false
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'node:dragstart': 'onDragStart',
      'node:drag': 'onDrag',
      'node:dragend': 'onDragEnd',
      'canvas:mouseleave': 'onOutOfRange'
    };
  },
  onDragStart(e: IG6GraphEvent) {
    if (!this.shouldBegin.call(this, e)) {
      return;
    }

    const item: INode = e.item as INode;
    const target = e.target;
    const hasLocked = item.hasLocked();
    if (hasLocked) {
      return;
    }

    // 如果拖动的target 是linkPoints / anchorPoints 则不允许拖动
    if (target) {
      const isAnchorPoint = target.get('isAnchorPoint');
      if (isAnchorPoint) {
        return;
      }
    }

    const graph = this.graph;

    this.targets = [];

    // 获取所有选中的元素
    const nodes = graph.findAllByState('node', 'selected');

    const currentNodeId = item.get('id');

    // 当前拖动的节点是否是选中的节点
    const dragNodes = nodes.filter(node => {
      const nodeId = node.get('id');
      return currentNodeId === nodeId;
    });

    // 只拖动当前节点
    if (dragNodes.length === 0) {
      this.target = item;
    } else {
      // 拖动多个节点
      if (nodes.length > 1) {
        nodes.forEach(node => {
          const locked = node.hasLocked();
          if (!locked) {
            this.targets.push(node);
          }
        });
      } else {
        this.targets.push(item);
      }
    }

    this.origin = {
      x: e.x,
      y: e.y
    };

    this.point = {};
    this.originPoint = {};
  },
  onDrag(e: IG6GraphEvent) {
    if (!this.origin) {
      return;
    }
    if (!this.shouldUpdate(this, e)) {
      return;
    }
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    // 当targets中元素时，则说明拖动的是多个选中的元素
    if (this.targets.length > 0) {
      if (this.get('enableDelegate')) {
        this._updateDelegate(e);
      } else {
        this.targets.forEach(target => {
          this._update(target, e, this.get('enableDelegate'));
        });
      }
    } else {
      // 只拖动单个元素
      this._update(this.target, e, this.get('enableDelegate'));
    }

    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  onDragEnd(e: IG6GraphEvent) {
    if (!this.origin || !this.shouldEnd.call(this, e)) {
      return;
    }

    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    if (this.shape) {
      this.shape.remove();
      this.shape = null;
    }

    if (this.target) {
      const delegateShape = this.target.get('delegateShape');
      if (delegateShape) {
        delegateShape.remove();
        this.target.set('delegateShape', null);
      }
    }

    if (this.targets.length > 0) {
      // 获取所有已经选中的节点
      this.targets.forEach(node => this._update(node, e));
    } else if (this.target) {
      this._update(this.target, e);
    }

    this.point = {};
    this.origin = null;
    this.originPoint = {};
    this.targets.length = 0;
    this.target = null;
    // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑
    const fn = this.fn;
    if (fn) {
      body.removeEventListener('mouseup', fn, false);
      this.fn = null;
    }

    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
  onOutOfRange(e: IG6GraphEvent) {
    const self = this;
    if (this.origin) {
      const canvasElement = self.graph.get('canvas').get('el');
      const fn = ev => {
        if (ev.target !== canvasElement) {
          self.onDragEnd(e);
        }
      };
      this.fn = fn;
      body.addEventListener('keyup', fn, false);
    }
  },
  _update(item: Item, e: IG6GraphEvent, force: boolean) {
    const origin = this.origin;
    const model: NodeConfig = item.get('model');
    const nodeId: string = item.get('id');
    if (!this.point[nodeId]) {
      this.point[nodeId] = {
        x: model.x,
        y: model.y
      };
    }

    const x: number = e.x - origin.x + this.point[nodeId].x;
    const y: number = e.y - origin.y + this.point[nodeId].y;

    // 拖动单个未选中元素
    if (force) {
      this._updateDelegate(e, x, y);
      return;
    }

    const pos: Point = { x, y };

    if (this.get('updateEdge')) {
      this.graph.updateItem(item, pos);
    } else {
      item.updatePosition(pos);
      // this.graph.paint();
    }
  },
  /**
   * 更新拖动元素时的delegate
   * @param {Event} e 事件句柄
   * @param {number} x 拖动单个元素时候的x坐标
   * @param {number} y 拖动单个元素时候的y坐标
   */
  _updateDelegate(e, x, y) {
    const bbox = e.item.get('keyShape').getBBox();
    if (!this.shape) {
      // 拖动多个
      const parent = this.graph.get('group');
      const attrs = deepMix({}, Global.delegateStyle, this.delegateStyle);
      if (this.targets.length > 0) {
        const { x: cx, y: cy, width, height, minX, minY } = this.calculationGroupPosition();
        this.originPoint = { x: cx, y: cy, width, height, minX, minY };
        // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
        this.shape = parent.addShape('rect', {
          attrs: {
            width,
            height,
            x: cx,
            y: cy,
            ...attrs
          }
        });
      } else if (this.target) {
        this.shape = parent.addShape('rect', {
          attrs: {
            width: bbox.width,
            height: bbox.height,
            x: x + bbox.x,
            y: y + bbox.y,
            ...attrs
          }
        });
      }
      this.shape.set('capture', false);
    } else {
      if (this.targets.length > 0) {
        const clientX = e.x - this.origin.x + this.originPoint.minX;
        const clientY = e.y - this.origin.y + this.originPoint.minY;
        this.shape.attr({
          x: clientX,
          y: clientY
        });
      } else if (this.target) {
        this.shape.attr({
          x: x + bbox.x,
          y: y + bbox.y
        });
      }
    }
    this.target.set('delegateShape', this.shape);

    // this.graph.paint();
  },
  /**
   * 计算delegate位置，包括左上角左边及宽度和高度
   * @memberof ItemGroup
   * @return {object} 计算出来的delegate坐标信息及宽高
   */
  calculationGroupPosition() {
    const graph = this.graph;

    const nodes = graph.findAllByState('node', 'selected');

    let minx = Infinity;
    let maxx = -Infinity;
    let miny = Infinity;
    let maxy = -Infinity;

    // 获取已节点的所有最大最小x y值
    for (const id of nodes) {
      const element = isString(id) ? graph.findById(id) : id;
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
    const x = Math.floor(minx) - 20;
    const y = Math.floor(miny) + 10;
    const width = Math.ceil(maxx) - x;
    const height = Math.ceil(maxy) - y;

    return {
      x,
      y,
      width,
      height,
      minX: minx,
      minY: miny
    };
  }
};
