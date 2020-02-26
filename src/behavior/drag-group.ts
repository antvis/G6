/*
 * @Author: moyee
 * @Date: 2019-07-31 14:36:15
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 11:13:43
 * @Description: 拖动群组
 */
import deepMix from '@antv/util/lib/deep-mix';
import { G6Event, IG6GraphEvent } from '../types';
import Global from '../global';

export default {
  getDefaultCfg(): object {
    return {
      delegate: true,
      delegateStyle: {},
      delegateShapes: {},
      delegateShapeBBoxs: {},
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      dragstart: 'onDragStart',
      drag: 'onDrag',
      dragend: 'onDragEnd',
      'canvas:mouseleave': 'onOutOfRange',
    };
  },
  onDragStart(evt: IG6GraphEvent) {
    const { graph } = this;
    const { target } = evt;
    // 获取拖动的group的ID，如果拖动的不是group，则直接return
    const groupId: string = target.get('groupId');
    if (!groupId) {
      return;
    }

    const customGroupControll = graph.get('customGroupControll');
    const { customGroup } = customGroupControll;

    const currentGroup = customGroup[groupId].nodeGroup;

    this.targetGroup = currentGroup;
    this.mouseOrigin = {
      x: evt.canvasX,
      y: evt.canvasY,
    };

    // 获取groupId的父Group的ID
    const { groups } = graph.save();
    let parentGroupId = null;

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      if (groupId === group.id) {
        parentGroupId = group.parentId;
        break;
      }
    }

    if (parentGroupId) {
      const parentGroup = customGroup[parentGroupId].nodeGroup;
      customGroupControll.setGroupStyle(parentGroup.get('keyShape'), 'hover');
    }
  },
  onDrag(evt: IG6GraphEvent) {
    if (!this.mouseOrigin) {
      return;
    }
    this.updateDelegate(evt);
  },

  onDragEnd(evt: IG6GraphEvent) {
    const { graph } = this;
    // 删除delegate shape
    const groupId: string = evt.target.get('groupId');
    if (this.delegateShapes[groupId]) {
      this.delegateShapeBBox = this.delegateShapes[groupId].getBBox();
      this.delegateShapes[groupId].remove();
      delete this.delegateShapes[groupId];
    }

    if (!this.delegateShapeBBox) {
      return;
    }

    // 修改群组位置
    const customGroupControll = graph.get('customGroupControll');
    const delegateShapeBBoxs = this.delegateShapeBBoxs[groupId];
    customGroupControll.updateGroup(groupId, delegateShapeBBoxs, this.mouseOrigin);

    this.mouseOrigin = null;
    this.shapeOrigin = null;
    customGroupControll.resetNodePoint();
    this.delegateShapeBBox = null;
  },
  updateDelegate(evt: IG6GraphEvent) {
    const { graph } = this;
    const groupId: string = evt.target.get('groupId');
    const item = this.targetGroup.get('keyShape');

    let delegateShape = this.delegateShapes[groupId];
    const groupBbox = item.getBBox();
    const delegateType = item.get('type');
    if (!delegateShape) {
      const delegateGroup = graph.get('delegateGroup');
      const { x: bboxX, y: bboxY, width, height } = groupBbox;

      const attrs = {
        width,
        height,
        ...deepMix({}, Global.delegateStyle, this.delegateStyle),
      };

      // 如果delegate是circle
      if (delegateType === 'circle') {
        const r = width > height ? width / 2 : height / 2;
        const cx = bboxX + r;
        const cy = bboxY + r;

        delegateShape = delegateGroup.addShape('circle', {
          attrs: {
            x: cx,
            y: cy,
            r,
            ...attrs,
          },
          name: 'circle-delegate-shape',
        });
        this.shapeOrigin = { x: cx, y: cy };
      } else {
        delegateShape = delegateGroup.addShape('rect', {
          attrs: {
            x: bboxX,
            y: bboxY,
            ...attrs,
          },
          name: 'rect-delegate-shape',
        });
        this.shapeOrigin = { x: bboxX, y: bboxY };
      }
      // delegateShape.set('capture', false);
      this.delegateShapes[groupId] = delegateShape;
      this.delegateShapeBBoxs[groupId] = delegateShape.getBBox();
    } else {
      const { mouseOrigin, shapeOrigin } = this;
      const deltaX = evt.canvasX - mouseOrigin.x;
      const deltaY = evt.canvasY - mouseOrigin.y;
      const x = deltaX + shapeOrigin.x;
      const y = deltaY + shapeOrigin.y;

      // 将Canvas坐标转成视口坐标
      const point = graph.getPointByCanvas(x, y);
      delegateShape.attr({ x: point.x, y: point.y });
      this.delegateShapeBBoxs[groupId] = delegateShape.getBBox();
    }
  },
  onOutOfRange(e: IG6GraphEvent) {
    const canvasElement = this.graph.get('canvas').get('el');
    const listener = ev => {
      if (ev.target !== canvasElement) {
        this.onDragEnd(e);
        // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑
        document.body.removeEventListener('mouseup', listener, true);
      }
    };

    if (this.mouseOrigin) {
      document.body.addEventListener('mouseup', listener, true);
    }
  },
};
