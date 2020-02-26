import { IG6GraphEvent, Item, G6Event } from '../types';

/*
 * @Author: moyee
 * @Date: 2019-06-27 18:12:06
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 13:54:53
 * @Description: 有group的情况下，拖动节点的Behavior
 */
import deepMix from '@antv/util/lib/deep-mix';
import Global from '../global';

const { body } = document;

export default {
  getDefaultCfg(): object {
    return {
      updateEdge: true,
      delegate: true,
      delegateStyle: {},
      maxMultiple: 1.1,
      minMultiple: 1,
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'node:dragstart': 'onDragStart',
      'node:drag': 'onDrag',
      'node:dragend': 'onDragEnd',
      'canvas:mouseleave': 'onOutOfRange',
      dragover: 'onDragOver',
      // FIXME: does not response
      dragleave: 'onDragLeave',
    };
  },
  onDragOver(evt: IG6GraphEvent) {
    const { graph } = this;
    const { target } = evt;
    const groupId = target.get('groupId');
    if (groupId && this.origin) {
      const customGroupControll = graph.get('customGroupControll');
      const customGroup = customGroupControll.getDeletageGroupById(groupId);
      if (customGroup) {
        const { nodeGroup: currentGroup } = customGroup;
        const keyShape = currentGroup.get('keyShape');

        this.inGroupId = groupId;
        customGroupControll.setGroupStyle(keyShape, 'hover');
      }
    }
  },
  /**
   * 拖动节点移除Group时的事件
   * @param {Event} evt 事件句柄
   */
  onDragLeave(evt: IG6GraphEvent) {
    const { graph } = this;
    const { target } = evt;
    const groupId = target.get('groupId');
    if (groupId && this.origin) {
      const customGroupControll = graph.get('customGroupControll');

      const customGroup = customGroupControll.getDeletageGroupById(groupId);
      if (customGroup) {
        const { nodeGroup: currentGroup } = customGroup;
        const keyShape = currentGroup.get('keyShape');

        customGroupControll.setGroupStyle(keyShape, 'default');
      }
    }
    if (!groupId) {
      this.inGroupId = null;
    }
  },
  onDragStart(e: IG6GraphEvent) {
    const { graph } = this;
    if (!this.shouldBegin.call(this, e)) {
      return;
    }

    const { item } = e;

    this.target = item;
    // 拖动节点时，如果在Group中，则Group高亮
    const model = item.getModel();
    const { groupId } = model;
    if (groupId) {
      const customGroupControll = graph.get('customGroupControll');
      const customGroup = customGroupControll.getDeletageGroupById(groupId);
      if (customGroup) {
        const { nodeGroup: currentGroup } = customGroup;
        const keyShape = currentGroup.get('keyShape');
        customGroupControll.setGroupStyle(keyShape, 'hover');

        // 初始拖动时候，如果是在当前群组中拖动，则赋值为当前groupId
        this.inGroupId = groupId;
      }
    }

    this.origin = {
      x: e.x,
      y: e.y,
    };

    this.point = {};
    this.originPoint = {};
  },
  onDrag(e: IG6GraphEvent) {
    if (!this.origin) {
      return;
    }
    if (!this.get('shouldUpdate').call(this, e)) {
      return;
    }

    this.update(this.target, e, true);
    const { item } = e;
    const { graph } = this;
    const model = item.getModel();
    const { groupId } = model;
    if (groupId) {
      const customGroupControll = graph.get('customGroupControll');
      const customGroup = customGroupControll.getDeletageGroupById(groupId);
      if (customGroup) {
        const { nodeGroup: currentGroup } = customGroup;
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
  onDragEnd(e: IG6GraphEvent) {
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

    if (this.target) {
      this.update(this.target, e);
    }

    this.point = {};
    this.origin = null;
    this.originPoint = {};
    this.target = null;

    this.setCurrentGroupStyle(e);
  },
  setCurrentGroupStyle(evt: IG6GraphEvent) {
    const { graph } = this;
    const { item } = evt;

    const model = item.getModel();
    // 节点所在的GroupId
    const { groupId, id } = model;

    const customGroupControll = graph.get('customGroupControll');
    const { customGroup } = customGroupControll;
    const groupNodes = graph.get('groupNodes');
    if (this.inGroupId && groupId) {
      const currentGroup = customGroup[groupId].nodeGroup;
      if (!currentGroup) {
        return;
      }

      const keyShape = currentGroup.get('keyShape');

      const itemBBox = item.getBBox();
      const currentGroupBBox = keyShape.getBBox();

      const { centerX, centerY } = itemBBox;
      const { minX, minY, maxX, maxY } = currentGroupBBox;

      // 在自己的group中拖动，判断是否拖出了自己的group
      // this.inGroupId !== groupId，则说明拖出了原来的group，拖到了其他group上面，
      // 则删除item中的groupId字段，同时删除group中的nodeID
      if (
        !(
          centerX < maxX * this.maxMultiple &&
          centerX > minX * this.minMultiple &&
          centerY < maxY * this.maxMultiple &&
          centerY > minY * this.minMultiple
        ) ||
        this.inGroupId !== groupId
      ) {
        // 拖出了group，则删除item中的groupId字段，同时删除group中的nodeID
        const currentGroupNodes = groupNodes[groupId];
        groupNodes[groupId] = currentGroupNodes.filter(node => node !== id);

        customGroupControll.dynamicChangeGroupSize(evt, currentGroup, keyShape);

        // 同时删除groupID中的节点
        delete model.groupId;
      }
      // 拖动到其他的group上面
      if (this.inGroupId !== groupId) {
        // 拖动新的group后，更新groupNodes及model中的groupId
        const nodeInGroup = customGroup[this.inGroupId].nodeGroup;
        if (!nodeInGroup) {
          return;
        }

        const targetKeyShape = nodeInGroup.get('keyShape');
        // 将该节点添加到inGroupId中
        if (groupNodes[this.inGroupId].indexOf(id) === -1) {
          groupNodes[this.inGroupId].push(id);
        }
        // 更新节点的groupId为拖动上去的group Id
        model.groupId = this.inGroupId;

        // 拖入节点后，根据最新的节点数量，重新计算群组大小
        customGroupControll.dynamicChangeGroupSize(evt, nodeInGroup, targetKeyShape);
      }
      customGroupControll.setGroupStyle(keyShape, 'default');
    } else if (this.inGroupId && !groupId) {
      // 将节点拖动到群组中
      const nodeInGroup = customGroup[this.inGroupId].nodeGroup;
      if (!nodeInGroup) {
        return;
      }

      const keyShape = nodeInGroup.get('keyShape');
      // 将该节点添加到inGroupId中
      if (groupNodes[this.inGroupId].indexOf(id) === -1) {
        groupNodes[this.inGroupId].push(id);
      }
      // 更新节点的groupId为拖动上去的group Id
      model.groupId = this.inGroupId;
      // 拖入节点后，根据最新的节点数量，重新计算群组大小
      customGroupControll.dynamicChangeGroupSize(evt, nodeInGroup, keyShape);
    } else if (!this.inGroupId && groupId) {
      // 拖出到群组之外了，则删除数据中的groupId
      Object.keys(groupNodes).forEach(gnode => {
        const currentGroupNodes = groupNodes[gnode];
        groupNodes[gnode] = currentGroupNodes.filter(node => node !== id);
      });

      const currentGroup = customGroup[groupId].nodeGroup;
      if (!currentGroup) {
        return;
      }

      const keyShape = currentGroup.get('keyShape');
      customGroupControll.dynamicChangeGroupSize(evt, currentGroup, keyShape);
      delete model.groupId;
    }

    this.inGroupId = null;
  },
  // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
  onOutOfRange(e: IG6GraphEvent) {
    const self = this;
    const canvasElement = self.graph.get('canvas').get('el');
    function listener(ev) {
      if (ev.target !== canvasElement) {
        e.item = self.target;
        self.onDragEnd(e);
        // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑
        document.body.removeEventListener('mouseup', listener, true);
      }
    }
    if (self.origin) {
      body.addEventListener('mouseup', listener, true);
    }
  },
  update(item: Item, e: IG6GraphEvent, force: boolean) {
    const { origin } = this;
    const model = item.get('model');
    const nodeId = item.get('id');
    if (!this.point[nodeId]) {
      this.point[nodeId] = {
        x: model.x,
        y: model.y,
      };
    }

    const x = e.x - origin.x + this.point[nodeId].x;
    const y = e.y - origin.y + this.point[nodeId].y;

    // 拖动单个未选中元素
    if (force) {
      this.updateDelegate(e, x, y);
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
  updateDelegate(e: IG6GraphEvent, x: number, y: number) {
    const { graph } = this;
    const { item } = e;
    const groupType = graph.get('groupType');
    const bbox = item.get('keyShape').getBBox();
    if (!this.shape) {
      const parent = graph.get('delegateGroup');
      const attrs = deepMix({}, Global.delegateStyle, this.delegateStyle);
      if (this.target) {
        this.shape = parent.addShape('rect', {
          attrs: {
            width: bbox.width,
            height: bbox.height,
            x: x - bbox.width / 2,
            y: y - bbox.height / 2,
            ...attrs,
          },
          name: 'delegate-shape',
        });
        this.target.set('delegateShape', this.shape);
      }
      this.shape.set('capture', false);
    }

    if (this.target) {
      if (groupType === 'circle') {
        this.shape.attr({
          x: x - bbox.width / 2,
          y: y - bbox.height / 2,
        });
      } else if (groupType === 'rect') {
        this.shape.attr({
          x,
          y,
        });
      }
    }
  },
};
