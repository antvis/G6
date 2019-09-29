/*
 * @Author: moyee
 * @Date: 2019-06-27 18:12:06
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 13:54:53
 * @Description: 有group的情况下，拖动节点的Behavior
 */
const deepMix = require('@antv/util/lib/deep-mix');
const { delegateStyle } = require('../global');
const body = document.body;

module.exports = {
  getDefaultCfg() {
    return {
      updateEdge: true,
      delegate: true,
      delegateStyle: {},
      maxMultiple: 0.9,
      minMultiple: 1
    };
  },
  getEvents() {
    return {
      'node:dragstart': 'onDragStart',
      'node:drag': 'onDrag',
      'node:dragend': 'onDragEnd',
      'canvas:mouseleave': 'onOutOfRange',
      mouseenter: 'onMouseEnter',
      mouseleave: 'onMouseLeave'
    };
  },
  onMouseEnter(evt) {
    const { target } = evt;
    const groupId = target.get('groupId');
    if (groupId && this.origin) {
      const graph = this.graph;
      const customGroupControll = graph.get('customGroupControll');
      const customGroup = customGroupControll.customGroup;
      const currentGroup = customGroup[groupId].nodeGroup;
      const keyShape = currentGroup.get('keyShape');

      this.inGroupId = groupId;
      customGroupControll.setGroupStyle(keyShape, 'hover');
    }
  },
  /**
   * 拖动节点移除Group时的事件
   * @param {Event} evt 事件句柄
   */
  onMouseLeave(evt) {
    const { target } = evt;
    const groupId = target.get('groupId');
    if (groupId && this.origin) {
      const graph = this.graph;
      const customGroupControll = graph.get('customGroupControll');
      const customGroup = customGroupControll.customGroup;
      const currentGroup = customGroup[groupId].nodeGroup;
      const keyShape = currentGroup.get('keyShape');

      customGroupControll.setGroupStyle(keyShape, 'default');
    }

    if (!groupId) {
      this.inGroupId = null;
    }
  },
  onDragStart(e) {
    if (!this.shouldBegin.call(this, e)) {
      return;
    }

    const { item } = e;
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
      // 拖动节点时，如果在Group中，则Group高亮
      const model = item.getModel();
      const { groupId } = model;
      if (groupId) {
        const customGroupControll = graph.get('customGroupControll');
        const customGroup = customGroupControll.customGroup;
        const currentGroup = customGroup[groupId].nodeGroup;
        customGroupControll.setGroupStyle(currentGroup.get('keyShape'), 'hover');

        // 初始拖动时候，如果是在当前群组中拖动，则赋值为当前groupId
        this.inGroupId = groupId;
      }
    } else {
      // 拖动多个节点
      if (nodes.length > 1) {
        nodes.forEach(node => {
          this.targets.push(node);
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
  onDrag(e) {
    if (!this.origin) {
      return;
    }
    if (!this.get('shouldUpdate').call(this, e)) {
      return;
    }

    // 当targets中元素时，则说明拖动的是多个选中的元素
    if (this.targets.length > 0) {
      this._updateDelegate(e);
    } else {
      // 只拖动单个元素
      this._update(this.target, e, true);
      const { item } = e;
      const graph = this.graph;
      const model = item.getModel();
      const { groupId } = model;
      if (groupId) {
        const customGroupControll = graph.get('customGroupControll');
        const customGroup = customGroupControll.customGroup;
        const currentGroup = customGroup[groupId].nodeGroup;
        const keyShape = currentGroup.get('keyShape');

        // 当前
        if (this.inGroupId !== groupId) {
          customGroupControll.setGroupStyle(keyShape, 'default');
        } else {
          customGroupControll.setGroupStyle(keyShape, 'hover');
        }
      }
    }
  },
  onDragEnd(e) {
    if (!this.origin || !this.shouldEnd.call(this, e)) {
      return;
    }

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

    this.setCurrentGroupStyle(e);
  },
  /**
   * @param {Event} evt 事件句柄
   * @param {Group} currentGroup 当前操作的群组
   * @param {Item} keyShape 当前操作的keyShape
   * @description 节点拖入拖出后动态改变群组大小
   */
  dynamicChangeGroupSize(evt, currentGroup, keyShape) {
    const { item } = evt;

    const model = item.getModel();
    // 节点所在的GroupId
    const { groupId } = model;

    const graph = this.graph;
    const groupType = graph.get('groupType');
    const customGroupControll = graph.get('customGroupControll');
    const groupNodes = graph.get('groupNodes');
    const nodes = groupNodes[groupId];

    // 拖出节点后，根据最新的节点数量，重新计算群组大小
    // 如果只有一个节点，拖出后，则删除该组
    if (nodes.length === 0) {
      // step 1: 从groupNodes中删除
      delete groupNodes[groupId];

      // step 2: 从groups数据中删除
      const groupsData = graph.get('groups');
      graph.set('groups', groupsData.filter(gdata => gdata.id !== groupId));

      // step 3: 删除原来的群组
      currentGroup.remove();
    } else {
      const { x, y, width, height } = customGroupControll.calculationGroupPosition(nodes);
      // 检测操作的群组中是否包括子群组
      const paddingValue = customGroupControll.getGroupPadding(groupId);

      if (groupType === 'circle') {
        const r = width > height ? width / 2 : height / 2;
        const cx = (width + 2 * x) / 2;
        const cy = (height + 2 * y) / 2;
        keyShape.attr({
          r: r + nodes.length * 10 + paddingValue,
          x: cx,
          y: cy
        });
      } else if (groupType === 'rect') {
        keyShape.attr({
          x: x - paddingValue,
          y: y - paddingValue,
          width: width + nodes.length * 10 + paddingValue,
          height: height + nodes.length * 10 + paddingValue
        });
      }

      customGroupControll.setGroupOriginBBox(groupId, keyShape.getBBox());
    }
    customGroupControll.setGroupStyle(keyShape, 'default');
  },
  setCurrentGroupStyle(evt) {
    const { item } = evt;
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const model = item.getModel();
    // 节点所在的GroupId
    const { groupId, id } = model;

    const customGroupControll = graph.get('customGroupControll');
    const customGroup = customGroupControll.customGroup;
    const groupNodes = graph.get('groupNodes');
    if (this.inGroupId && groupId) {
      const currentGroup = customGroup[groupId].nodeGroup;
      const keyShape = currentGroup.get('keyShape');

      const itemBBox = item.getBBox();
      const currentGroupBBox = keyShape.getBBox();

      const { x, y } = itemBBox;
      const { minX, minY, maxX, maxY } = currentGroupBBox;

      // 在自己的group中拖动，判断是否拖出了自己的group
      // this.inGroupId !== groupId，则说明拖出了原来的group，拖到了其他group上面，
      // 则删除item中的groupId字段，同时删除group中的nodeID
      if (
          !(x < maxX * this.maxMultiple && x > minX * this.minMultiple && y < maxY * this.maxMultiple && y > minY * this.minMultiple)
          || this.inGroupId !== groupId) {
        // 拖出了group，则删除item中的groupId字段，同时删除group中的nodeID
        const currentGroupNodes = groupNodes[groupId];
        groupNodes[groupId] = currentGroupNodes.filter(node => node !== id);

        this.dynamicChangeGroupSize(evt, currentGroup, keyShape);

        // 同时删除groupID中的节点
        delete model.groupId;
      }
       // 拖动到其他的group上面
      if (this.inGroupId !== groupId) {

        // 拖动新的group后，更新groupNodes及model中的groupId
        const nodeInGroup = customGroup[this.inGroupId].nodeGroup;
        const targetKeyShape = nodeInGroup.get('keyShape');
        // 将该节点添加到inGroupId中
        if (groupNodes[this.inGroupId].indexOf(id) === -1) {
          groupNodes[this.inGroupId].push(id);
        }
        // 更新节点的groupId为拖动上去的group Id
        model.groupId = this.inGroupId;

        // 拖入节点后，根据最新的节点数量，重新计算群组大小
        this.dynamicChangeGroupSize(evt, nodeInGroup, targetKeyShape);
      }
      customGroupControll.setGroupStyle(keyShape, 'default');
    } else if (this.inGroupId && !groupId) {
      // 将节点拖动到群组中
      const nodeInGroup = customGroup[this.inGroupId].nodeGroup;
      const keyShape = nodeInGroup.get('keyShape');
      // 将该节点添加到inGroupId中
      if (groupNodes[this.inGroupId].indexOf(id) === -1) {
        groupNodes[this.inGroupId].push(id);
      }
      // 更新节点的groupId为拖动上去的group Id
      model.groupId = this.inGroupId;
      // 拖入节点后，根据最新的节点数量，重新计算群组大小
      this.dynamicChangeGroupSize(evt, nodeInGroup, keyShape);
    } else if (!this.inGroupId && groupId) {
      // 拖出到群组之外了，则删除数据中的groupId
      for (const gnode in groupNodes) {
        const currentGroupNodes = groupNodes[gnode];
        groupNodes[gnode] = currentGroupNodes.filter(node => node !== id);
      }
      const currentGroup = customGroup[groupId].nodeGroup;
      const keyShape = currentGroup.get('keyShape');
      this.dynamicChangeGroupSize(evt, currentGroup, keyShape);
      delete model.groupId;
    }

    this.inGroupId = null;

    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
  onOutOfRange(e) {
    const self = this;
    if (this.origin) {
      const canvasElement = self.graph.get('canvas').get('el');
      const fn = ev => {
        if (ev.target !== canvasElement) {
          self.onDragEnd(e);
        }
      };
      this.fn = fn;
      body.addEventListener('mouseup', fn, false);
    }
  },
  _update(item, e, force) {
    const origin = this.origin;
    const model = item.get('model');
    const nodeId = item.get('id');
    if (!this.point[nodeId]) {
      this.point[nodeId] = {
        x: model.x,
        y: model.y
      };
    }

    const x = e.x - origin.x + this.point[nodeId].x;
    const y = e.y - origin.y + this.point[nodeId].y;

    // 拖动单个未选中元素
    if (force) {
      this._updateDelegate(e, x, y);
      return;
    }

    const pos = { x, y };

    if (this.get('updateEdge')) {
      this.graph.updateItem(item, pos);
    } else {
      item.updatePosition(pos);
      this.graph.paint();
    }
  },
  /**
   * 更新拖动元素时的delegate
   * @param {Event} e 事件句柄
   * @param {number} x 拖动单个元素时候的x坐标
   * @param {number} y 拖动单个元素时候的y坐标
   */
  _updateDelegate(e, x, y) {
    const { item } = e;
    const graph = this.graph;
    const groupType = graph.get('groupType');
    const bbox = item.get('keyShape').getBBox();
    if (!this.shape) {
      const parent = graph.get('group');
      const attrs = deepMix({}, delegateStyle, this.delegateStyle);
      // 拖动多个
      if (this.targets.length > 0) {
        const nodes = graph.findAllByState('node', 'selected');
        if (nodes.length === 0) {
          nodes.push(item);
        }
        const customGroupControll = graph.get('customGroupControll');
        const { x, y, width, height } = customGroupControll.calculationGroupPosition(nodes);
        this.originPoint = { x, y, width, height };
        // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
        this.shape = parent.addShape('rect', {
          attrs: {
            width,
            height,
            x,
            y,
            ...attrs
          }
        });
      } else if (this.target) {
        this.shape = parent.addShape('rect', {
          attrs: {
            width: bbox.width,
            height: bbox.height,
            x: x - bbox.width / 2,
            y: y - bbox.height / 2,
            ...attrs
          }
        });
        this.target.set('delegateShape', this.shape);
      }
      this.shape.set('capture', false);
    }

    if (this.targets.length > 0) {
      const clientX = e.x - this.origin.x + this.originPoint.minX;
      const clientY = e.y - this.origin.y + this.originPoint.minY;
      this.shape.attr({
        x: clientX,
        y: clientY
      });
    } else if (this.target) {
      if (groupType === 'circle') {
        this.shape.attr({
          x: x - bbox.width / 2,
          y: y - bbox.height / 2
        });
      } else if (groupType === 'rect') {
        this.shape.attr({
          x,
          y
        });
      }
    }
    this.graph.paint();
  }
};
