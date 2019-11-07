/*
 * @Author: moyee
 * @Date: 2019-07-31 14:36:15
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 11:13:43
 * @Description: 拖动群组
 */
const deepMix = require('@antv/util/lib/deep-mix');
const body = document.body;

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
      dragend: 'onDragEnd',
      'canvas:mouseleave': 'onOutOfRange'
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
    this.mouseOrigin = {
      x: evt.canvasX,
      y: evt.canvasY
    };

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

    if (!this.delegateShapeBBox) {
      return false;
    }

    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    // 修改群组位置
    const customGroupControll = graph.get('customGroupControll');
    const delegateShapeBBoxs = this.delegateShapeBBoxs[groupId];
    customGroupControll.updateGroup(groupId, delegateShapeBBoxs);

    graph.setAutoPaint(autoPaint);
    graph.paint();

    this.mouseOrigin = null;
    this.shapeOrigin = null;
    customGroupControll.resetNodePoint();
    this.delegateShapeBBox = null;
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
        ...deepMix({}, delegateStyle, this.delegateStyle)
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
            ...deepMix({}, delegateStyle, this.delegateStyle)
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
  },
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
  }
};
