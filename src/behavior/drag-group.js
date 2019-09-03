/*
 * @Author: moyee
 * @Date: 2019-07-31 14:36:15
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 11:13:43
 * @Description: 拖动群组
 */
const { merge } = require('lodash');

const delegateStyle = {
  fill: '#F3F9FF',
  fillOpacity: 0.5,
  stroke: '#1890FF',
  strokeOpacity: 0.9,
  lineDash: [ 5, 5 ]
};

module.exports = {
  getDefaultCfg() {
    return {
      delegate: true,
      delegateStyle: {},
      delegateShapes: {},
      delegateShapeBBoxs: {}
    };
  },
  getEvents() {
    return {
      dragstart: 'onDragStart',
      drag: 'onDrag',
      dragend: 'onDragEnd'
    };
  },
  onDragStart(evt) {
    const { target } = evt;
    // 获取拖动的group的ID，如果拖动的不是group，则直接return
    const groupId = target.get('groupId');
    if (!groupId) {
      return false;
    }

    const graph = this.graph;

    const customGroupControll = graph.get('customGroupControll');
    const customGroup = customGroupControll.customGroup;

    const currentGroup = customGroup[groupId].nodeGroup;

    this.targetGroup = currentGroup;
    const groupOriginBBox = customGroupControll.getGroupOriginBBox(groupId);
    const keyShape = this.targetGroup.get('keyShape');
    if (!groupOriginBBox) {
      customGroupControll.setGroupOriginBBox(groupId, keyShape.getBBox());
    }

    this.mouseOrigin = {
      x: evt.canvasX,
      y: evt.canvasY
    };
    this.nodePoint = [];

    // 获取groupId的父Group的ID
    const { groups } = graph.save();
    let parentGroupId = null;
    for (const group of groups) {
      if (groupId !== group.id) {
        continue;
      }
      parentGroupId = group.parentId;
      break;
    }

    if (parentGroupId) {
      const parentGroup = customGroup[parentGroupId].nodeGroup;
      customGroupControll.setGroupStyle(parentGroup.get('keyShape'), 'hover');
    }
  },
  onDrag(evt) {
    if (!this.mouseOrigin) {
      return false;
    }
    this._updateDelegate(evt);
  },

  onDragEnd(evt) {
    // 删除delegate shape
    const groupId = evt.target.get('groupId');
    if (this.delegateShapes[groupId]) {
      this.delegateShapeBBox = this.delegateShapes[groupId].getBBox();
      this.delegateShapes[groupId].remove();
      delete this.delegateShapes[groupId];
    }

    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    // 修改群组位置
    this.updatePosition(evt);

    graph.setAutoPaint(autoPaint);
    graph.paint();

    this.mouseOrigin = null;
    this.shapeOrigin = null;
    // 在两个节点之间连线时也会执行到这里，此时this.nodePoint值为undefined
    if (this.nodePoint) {
      this.nodePoint.length = 0;
    }
    this.delegateShapeBBox = null;
  },


  /**
   * 更新群组及群组中节点和边的位置
   *
   * @param {Event} evt 事件句柄
   * @return {boolean} false/true
   */
  updatePosition(evt) {
    if (!this.delegateShapeBBox) {
      return false;
    }

    const graph = this.graph;

    // 更新群组里面节点和线的位置
    this.updateItemPosition(evt);

    const customGroupControll = graph.get('customGroupControll');
    const customGroup = customGroupControll.customGroup;
    const groupId = evt.target.get('groupId');
    // 判断是否拖动出了parent group外面，如果拖出了parent Group外面，则更新数据，去掉group关联
    // 获取groupId的父Group的ID
    const { groups } = graph.save();
    let parentGroupId = null;
    let parentGroupData = null;
    for (const group of groups) {
      if (groupId !== group.id) {
        continue;
      }
      parentGroupId = group.parentId;
      parentGroupData = group;
      break;
    }

    if (parentGroupId) {
      const parentGroup = customGroup[parentGroupId].nodeGroup;
      const parentKeyShape = parentGroup.get('keyShape');
      customGroupControll.setGroupStyle(parentKeyShape, 'default');

      const parentGroupBBox = parentKeyShape.getBBox();
      const { minX, minY, maxX, maxY } = parentGroupBBox;

      // 检查是否拖出了父Group
      const currentGroup = customGroup[groupId].nodeGroup;
      const currentKeyShape = currentGroup.get('keyShape');
      const currentKeyShapeBBox = currentKeyShape.getBBox();
      const { x, y } = currentKeyShapeBBox;

      if (!(x < maxX && x > minX && y < maxY && y > minY)) {
        // 拖出了parent group，则取消parent group ID
        delete parentGroupData.parentId;
        // 同时删除groupID中的节点
        const groupNodes = graph.get('groupNodes');
        const currentGroupNodes = groupNodes[groupId];
        const parentGroupNodes = groupNodes[parentGroupId];

        groupNodes[parentGroupId] = parentGroupNodes.filter(node => currentGroupNodes.indexOf(node) === -1);

        const { x: x1, y: y1, width, height } = customGroupControll.calculationGroupPosition(groupNodes[parentGroupId]);
        const groups = graph.get('groups');
        const hasSubGroup = !!groups.filter(g => g.parentId === parentGroupId).length > 0;
        const r = width > height ? width / 2 : height / 2 + (hasSubGroup ? 20 : 0);

        const cx = (width + 2 * x1) / 2;
        const cy = (height + 2 * y1) / 2;
        // groupKeyShape.attr('x', cx);
        // groupKeyShape.attr('y', cy);
        parentKeyShape.attr({
          r: r + groupNodes[groupId].length * 10,
          x: cx,
          y: cy
        });
      }
    }
  },

  /**
   * 更新群组中节点、边的位置
   *
   * @param {Event} evt 事件句柄
   */
  updateItemPosition(evt) {
    const groupId = evt.target.get('groupId');

    const graph = this.graph;

    // 获取群组对象
    const customGroupControll = graph.get('customGroupControll');

    const groupNodes = graph.get('groupNodes');

    // step 1：先修改groupId中的节点位置
    const nodeInGroup = groupNodes[groupId];
    const groupOriginBBox = customGroupControll.getGroupOriginBBox(groupId);
    const delegateShapeBBoxs = this.delegateShapeBBoxs[groupId];
    const otherGroupId = [];
    nodeInGroup.forEach((nodeId, index) => {

      const node = graph.findById(nodeId);
      const model = node.getModel();
      if (model.groupId && !otherGroupId.includes(model.groupId)) {
        otherGroupId.push(model.groupId);
      }
      if (!this.nodePoint[index]) {
        this.nodePoint[index] = {
          x: model.x,
          y: model.y
        };
      }

      // 群组拖动后节点的位置：deletateShape的最终位置-群组起始位置+节点位置
      const x = delegateShapeBBoxs.x - groupOriginBBox.x + this.nodePoint[index].x;
      const y = delegateShapeBBoxs.y - groupOriginBBox.y + this.nodePoint[index].y;

      this.nodePoint[index] = {
        x, y
      };

      graph.updateItem(node, { x, y });
    });
    // step 2：修改父group中其他节点的位置

    // 更新完群组位置后，重新设置群组起始位置
    const customGroups = customGroupControll.customGroup;

    // otherGroupId中是否包括当前groupId，如果不包括，则添加进去
    if (!otherGroupId.includes(groupId)) {
      otherGroupId.push(groupId);
    }

    otherGroupId.forEach(id => {
      // 更新群组位置
      const { nodeGroup } = customGroups[id];
      const groupKeyShape = nodeGroup.get('keyShape');

      const { x, y, width, height } = customGroupControll.calculationGroupPosition(groupNodes[id]);
      const cx = (width + 2 * x) / 2;
      const cy = (height + 2 * y) / 2;
      groupKeyShape.attr('x', cx);
      groupKeyShape.attr('y', cy);
      customGroupControll.setGroupOriginBBox(id, groupKeyShape.getBBox());
    });

  },
  _updateDelegate(evt) {
    const self = this;
    const groupId = evt.target.get('groupId');
    const item = this.targetGroup.get('keyShape');
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    let delegateShape = self.delegateShapes[groupId];
    const groupBbox = item.getBBox();
    const delegateType = item.get('type');
    if (!delegateShape) {
      const delegateGroup = graph.get('delegateGroup');
      const { width, height } = groupBbox;
      const x = evt.canvasX - width / 2;
      const y = evt.canvasY - height / 2;
      const attrs = {
        width,
        height,
        x,
        y,
        ...merge({}, delegateStyle, this.delegateStyle)
      };

      // 如果delegate是circle
      if (delegateType === 'circle') {
        const cx = evt.canvasX; // (width + 2 * x) / 2;
        const cy = evt.canvasY; // (height + 2 * y) / 2;
        const r = width > height ? width / 2 : height / 2;

        delegateShape = delegateGroup.addShape('circle', {
          attrs: {
            x: cx,
            y: cy,
            r,
            ...merge({}, delegateStyle, this.delegateStyle)
          }
        });
        self.shapeOrigin = { x: cx, y: cy };
      } else {
        delegateShape = delegateGroup.addShape('rect', {
          attrs
        });
        self.shapeOrigin = { x: attrs.x, y: attrs.y };
      }
      // delegateShape.set('capture', false);
      self.delegateShapes[groupId] = delegateShape;
      self.delegateShapeBBoxs[groupId] = delegateShape.getBBox();
    } else {
      const { mouseOrigin, shapeOrigin } = self;
      const deltaX = evt.canvasX - mouseOrigin.x;
      const deltaY = evt.canvasY - mouseOrigin.y;
      const x = deltaX + shapeOrigin.x;
      const y = deltaY + shapeOrigin.y;

      // 将Canvas坐标转成视口坐标
      const point = graph.getPointByCanvas(x, y);
      delegateShape.attr({ x: point.x, y: point.y });
      self.delegateShapeBBoxs[groupId] = delegateShape.getBBox();
    }

    graph.paint();
    graph.setAutoPaint(autoPaint);
  }
};
