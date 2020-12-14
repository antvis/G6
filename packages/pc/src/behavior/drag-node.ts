/*
 * @Author: moyee
 * @Date: 2019-06-27 18:12:06
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-22 18:41:45
 * @Description: 拖动节点的Behavior
 */
import { Point } from '@antv/g-base/lib/types';
import { deepMix, clone } from '@antv/util';
import { G6Event, IG6GraphEvent, Item, NodeConfig, INode, ICombo } from '@antv/g6-core';
import { IGraph } from '../interface/graph';
import Global from '../global';

export default {
  getDefaultCfg(): object {
    return {
      updateEdge: true,
      delegateStyle: {},
      // 是否开启delegate
      enableDelegate: false,
      // 拖动节点过程中是否只改变 Combo 的大小，而不改变其结构
      onlyChangeComboSize: false,
      // 拖动过程中目标 combo 状态样式
      comboActiveState: '',
      selectedState: 'selected',
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'node:dragstart': 'onDragStart',
      'node:drag': 'onDrag',
      'node:dragend': 'onDragEnd',
      'combo:dragenter': 'onDragEnter',
      'combo:dragleave': 'onDragLeave',
      'combo:drop': 'onDropCombo',
      'node:drop': 'onDropNode',
      'canvas:drop': 'onDropCanvas',
    };
  },
  validationCombo(item: ICombo) {
    if (!this.origin || !item || item.destroyed) {
      return false;
    }

    const type = item.getType();
    if (type !== 'combo') {
      return false;
    }
    return true;
  },
  /**
   * 开始拖动节点
   * @param evt
   */
  onDragStart(evt: IG6GraphEvent) {
    if (!this.shouldBegin.call(this, evt)) {
      return;
    }

    const item: INode = evt.item as INode;
    if (!item || item.destroyed || item.hasLocked()) {
      return;
    }

    // 拖动时，设置拖动元素的 capture 为false，则不拾取拖动的元素
    const group = item.getContainer();
    group.set('capture', false);

    // 如果拖动的target 是linkPoints / anchorPoints 则不允许拖动
    const { target } = evt;
    if (target) {
      const isAnchorPoint = target.get('isAnchorPoint');
      if (isAnchorPoint) {
        return;
      }
    }

    const { graph } = this;

    this.targets = [];

    // 将节点拖入到指定的 Combo
    this.targetCombo = null;

    // 获取所有选中的元素
    const nodes = graph.findAllByState('node', this.selectedState);

    const currentNodeId = item.get('id');

    // 当前拖动的节点是否是选中的节点
    const dragNodes = nodes.filter((node) => {
      const nodeId = node.get('id');
      return currentNodeId === nodeId;
    });

    // 只拖动当前节点
    if (dragNodes.length === 0) {
      this.targets.push(item);
    } else if (nodes.length > 1) {
      // 拖动多个节点
      nodes.forEach((node) => {
        const locked = node.hasLocked();
        if (!locked) {
          this.targets.push(node);
        }
      });
    } else {
      this.targets.push(item);
    }
    const beforeDragNodes = [];
    this.targets.forEach((t) => {
      beforeDragNodes.push(clone(t.getModel()));
    });
    this.set('beforeDragNodes', beforeDragNodes);

    this.origin = {
      x: evt.x,
      y: evt.y,
    };

    this.point = {};
    this.originPoint = {};
  },

  /**
   * 持续拖动节点
   * @param evt
   */
  onDrag(evt: IG6GraphEvent) {
    if (!this.origin) {
      return;
    }

    if (!this.shouldUpdate(this, evt)) {
      return;
    }

    if (this.get('enableDelegate')) {
      this.updateDelegate(evt);
    } else {
      this.targets.map((target) => {
        this.update(target, evt);
      });
    }
  },
  /**
   * 拖动结束，设置拖动元素capture为true，更新元素位置，如果是拖动涉及到 combo，则更新 combo 结构
   * @param evt
   */
  onDragEnd(evt: IG6GraphEvent) {
    if (!this.origin || !this.shouldEnd.call(this, evt)) {
      return;
    }

    // 拖动结束后，设置拖动元素 group 的 capture 为 true，允许拾取拖动元素
    const item = evt.item as INode;
    if (item) {
      const group = item.getContainer();
      group.set('capture', true);
    }

    if (this.delegateRect) {
      this.delegateRect.remove();
      this.delegateRect = null;
    }

    this.updatePositions(evt);

    const graph: IGraph = this.graph;

    // 拖动结束后，入栈
    if (graph.get('enabledStack')) {
      const stackData = {
        before: { nodes: this.get('beforeDragNodes'), edges: [], combos: [] },
        after: { nodes: [], edges: [], combos: [] },
      };

      this.targets.forEach((target) => {
        stackData.after.nodes.push(target.getModel());
      });
      graph.pushStack('update', clone(stackData));
    }

    // 拖动结束后emit事件，将当前操作的节点抛出去，目标节点为null
    graph.emit('dragnodeend', {
      items: this.targets,
      targetItem: null,
    });

    this.point = {};
    this.origin = null;
    this.originPoint = {};
    this.targets.length = 0;
    this.targetCombo = null;
  },
  /**
   * 拖动过程中将节点放置到 combo 上
   * @param evt
   */
  onDropCombo(evt: IG6GraphEvent) {
    const item = evt.item as ICombo;
    if (!this.validationCombo(item)) return;

    this.updatePositions(evt);

    const graph: IGraph = this.graph;

    if (this.comboActiveState) {
      graph.setItemState(item, this.comboActiveState, false);
    }

    this.targetCombo = item;

    // 拖动结束后是动态改变 Combo 大小还是将节点从 Combo 中删除
    if (this.onlyChangeComboSize) {
      // 拖动节点结束后，动态改变 Combo 的大小
      graph.updateCombos();
    } else {
      const targetComboModel = item.getModel();
      this.targets.map((node: INode) => {
        const nodeModel = node.getModel();
        if (nodeModel.comboId !== targetComboModel.id) {
          graph.updateComboTree(node, targetComboModel.id);
        }
      });
      graph.updateCombo(item as ICombo);
    }

    // 将节点拖动到 combo 上面，emit事件抛出当前操作的节点及目标 combo
    graph.emit('dragnodeend', {
      items: this.targets,
      targetItem: this.targetCombo,
    });
  },

  onDropCanvas(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    if (!this.targets || this.targets.length === 0) return;
    this.updatePositions(evt);
    if (this.onlyChangeComboSize) {
      // 拖动节点结束后，动态改变 Combo 的大小
      graph.updateCombos();
    } else {
      this.targets.map((node: INode) => {
        // 拖动的节点有 comboId，即是从其他 combo 中拖出时才处理
        const model = node.getModel();
        if (model.comboId) {
          graph.updateComboTree(node);
        }
      });
    }
  },

  /**
   * 拖动放置到某个 combo 中的子 node 上
   * @param evt
   */
  onDropNode(evt: IG6GraphEvent) {
    if (!this.targets || this.targets.length === 0) return;
    const self = this;
    const item = evt.item as INode;
    this.updatePositions(evt);
    const graph: IGraph = self.graph;

    const comboId = item.getModel().comboId as string;

    if (comboId) {
      const combo = graph.findById(comboId);
      if (self.comboActiveState) {
        graph.setItemState(combo, self.comboActiveState, false);
      }
      this.targets.map((node: INode) => {
        const nodeModel = node.getModel();
        if (comboId !== nodeModel.comboId) {
          graph.updateComboTree(node, comboId);
        }
      });
      graph.updateCombo(combo as ICombo);
    } else {
      this.targets.map((node: INode) => {
        const model = node.getModel();
        if (model.comboId) {
          graph.updateComboTree(node);
        }
      });
    }

    // 将节点拖动到另外个节点上面，emit 事件抛出当前操作的节点及目标节点
    graph.emit('dragnodeend', {
      items: this.targets,
      targetItem: item,
    });
  },
  /**
   * 将节点拖入到 Combo 中
   * @param evt
   */
  onDragEnter(evt: IG6GraphEvent) {
    const item = evt.item as ICombo;
    if (!this.validationCombo(item)) return;

    const graph: IGraph = this.graph;
    if (this.comboActiveState) {
      graph.setItemState(item, this.comboActiveState, true);
    }
  },
  /**
   * 将节点从 Combo 中拖出
   * @param evt
   */
  onDragLeave(evt: IG6GraphEvent) {
    const item = evt.item as ICombo;
    if (!this.validationCombo(item)) return;

    const graph: IGraph = this.graph;
    if (this.comboActiveState) {
      graph.setItemState(item, this.comboActiveState, false);
    }
  },

  updatePositions(evt: IG6GraphEvent) {
    if (!this.targets || this.targets.length === 0) return;
    // 当开启 delegate 时，拖动结束后需要更新所有已选中节点的位置
    if (this.get('enableDelegate')) {
      this.targets.map((node) => this.update(node, evt));
    }
  },
  /**
   * 更新节点
   * @param item 拖动的节点实例
   * @param evt
   */
  update(item: Item, evt: IG6GraphEvent) {
    const { origin } = this;
    const model: NodeConfig = item.get('model');
    const nodeId: string = item.get('id');
    if (!this.point[nodeId]) {
      this.point[nodeId] = {
        x: model.x || 0,
        y: model.y || 0,
      };
    }

    const x: number = evt.x - origin.x + this.point[nodeId].x;
    const y: number = evt.y - origin.y + this.point[nodeId].y;

    const pos: Point = { x, y };

    if (this.get('updateEdge')) {
      this.graph.updateItem(item, pos, false);
    } else {
      item.updatePosition(pos);
    }
  },
  /**
   * 更新拖动元素时的delegate
   * @param {Event} e 事件句柄
   * @param {number} x 拖动单个元素时候的x坐标
   * @param {number} y 拖动单个元素时候的y坐标
   */
  updateDelegate(e) {
    const { graph } = this;
    if (!this.delegateRect) {
      // 拖动多个
      const parent = this.graph.get('group');
      const attrs = deepMix({}, Global.delegateStyle, this.delegateStyle);

      const { x: cx, y: cy, width, height, minX, minY } = this.calculationGroupPosition(e);
      this.originPoint = { x: cx, y: cy, width, height, minX, minY };
      // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
      this.delegateRect = parent.addShape('rect', {
        attrs: {
          width,
          height,
          x: cx,
          y: cy,
          ...attrs,
        },
        name: 'rect-delegate-shape',
      });
      this.delegateRect.set('capture', false);
    } else {
      const clientX = e.x - this.origin.x + this.originPoint.minX;
      const clientY = e.y - this.origin.y + this.originPoint.minY;
      this.delegateRect.attr({
        x: clientX,
        y: clientY,
      });
    }
  },
  /**
   * 计算delegate位置，包括左上角左边及宽度和高度
   * @memberof ItemGroup
   * @return {object} 计算出来的delegate坐标信息及宽高
   */
  calculationGroupPosition(evt: IG6GraphEvent) {
    const { graph } = this;

    const nodes = graph.findAllByState('node', this.selectedState);
    if (nodes.length === 0) {
      nodes.push(evt.item);
    }

    let minx = Infinity;
    let maxx = -Infinity;
    let miny = Infinity;
    let maxy = -Infinity;

    // 获取已节点的所有最大最小x y值
    for (let i = 0; i < nodes.length; i++) {
      const element = nodes[i];
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
    };
  },
};
