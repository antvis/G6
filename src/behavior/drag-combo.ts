/*
 * @Author: moyee
 * @LastEditors: moyee
 * @Description: 拖动 Combo
 */
import { G6Event, IG6GraphEvent, Item, ComboConfig } from '../types';
import { calculationItemsBBox } from '../util/base';
import Global from '../global';
import { IGraph } from '../interface/graph';
import { each } from '@antv/util/lib';
import { IGroup } from '@antv/g-base/lib/interfaces';
import { ICombo, INode } from '../interface/item';

/**
 * 遍历拖动的 Combo 下的所有 Combo
 * @param data 拖动的 Combo
 * @param fn
 */
const traverseCombo = (data, fn: (param: any) => boolean) => {
  if (fn(data) === false) {
    return;
  }

  if (data) {
    const combos = data.get('combos');
    if (combos.length === 0) {
      return false;
    }
    each(combos, (child) => {
      traverseCombo(child, fn);
    });
  }
};

export default {
  getDefaultCfg() {
    return {
      enableDelegate: false,
      delegateStyle: {},
      // 拖动节点过程中是否只改变 Combo 的大小，而不改变其结构
      onlyChangeComboSize: false,
      // 拖动过程中目标 combo 状态样式
      activeState: '',
      selectedState: 'selected',
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'combo:dragstart': 'onDragStart',
      'combo:drag': 'onDrag',
      'combo:dragend': 'onDragEnd',
      'combo:drop': 'onDrop',
      'node:drop': 'onNodeDrop',
      'combo:dragenter': 'onDragEnter',
      'combo:dragleave': 'onDragLeave',
    };
  },
  validationCombo(evt: IG6GraphEvent) {
    const { item } = evt;
    if (!item || item.destroyed) {
      return false;
    }

    if (!this.shouldUpdate(this, evt)) {
      return false;
    }

    const type = item.getType();

    if (type !== 'combo') {
      return false;
    }
    return true;
  },
  onDragStart(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    const { item } = evt;

    if (!this.validationCombo(evt)) return;

    this.targets = [];

    // 获取所有选中的 Combo
    const combos = graph.findAllByState('combo', this.selectedState);

    const currentCombo = item.get('id');

    const dragCombos = combos.filter((combo) => {
      const comboId = combo.get('id');
      return currentCombo === comboId;
    });

    if (dragCombos.length === 0) {
      this.targets.push(item);

    } else {
      this.targets = combos;
    }

    if (this.activeState) {
      this.targets.map((combo: ICombo) => {
        const model = combo.getModel() as ComboConfig;
        if (model.parentId) {
          const parentCombo = graph.findById(model.parentId);
          if (parentCombo) {
            graph.setItemState(parentCombo, this.activeState, true);
          }
        }
      });
    }

    this.point = {};
    this.originPoint = {};

    this.origin = {
      x: evt.x,
      y: evt.y,
    };

    this.currentItemChildCombos = [];

    traverseCombo(item, (param) => {
      if (param.destroyed) {
        return false;
      }
      const model = param.getModel();
      this.currentItemChildCombos.push(model.id);
      return true;
    });
  },
  onDrag(evt: IG6GraphEvent) {
    if (!this.origin) {
      return;
    }

    if (!this.validationCombo(evt)) return;

    if (this.enableDelegate) {
      this.updateDelegate(evt);
    } else {
      if (this.activeState) {
        const graph: IGraph = this.graph;
        const item: Item = evt.item;
        const model = item.getModel();
        // 拖动过程中实时计算距离
        const combos = graph.getCombos();
        const sourceBBox = item.getBBox();

        const { centerX, centerY, width } = sourceBBox;

        // 参与计算的 Combo，需要排除掉：
        // 1、拖动 combo 自己
        // 2、拖动 combo 的 parent
        // 3、拖动 Combo 的 children

        const calcCombos = combos.filter((combo) => {
          const cmodel = combo.getModel() as ComboConfig;
          // 被拖动的是最外层的 Combo，无 parent，排除自身和子元素
          if (!model.parentId) {
            return cmodel.id !== model.id && !this.currentItemChildCombos.includes(cmodel.id);
          }
          return cmodel.id !== model.id && !this.currentItemChildCombos.includes(cmodel.id);
        });

        calcCombos.map((combo) => {
          const { centerX: cx, centerY: cy, width: w } = combo.getBBox();

          // 拖动的 combo 和要进入的 combo 之间的距离
          const disX = centerX - cx;
          const disY = centerY - cy;
          // 圆心距离
          const distance = 2 * Math.sqrt(disX * disX + disY * disY);

          if (width + w - distance > 0.8 * width) {
            graph.setItemState(combo, this.activeState, true);
          } else {
            graph.setItemState(combo, this.activeState, false);
          }
        });
      }

      each(this.targets, (item) => {
        this.updateCombo(item, evt);
      });
    }
  },

  updatePositions(evt: IG6GraphEvent) {
    // 当启用 delegate 时，拖动结束时需要更新 combo
    if (this.enableDelegate) {
      each(this.targets, (item) => {
        this.updateCombo(item, evt);
      });
    }
  },

  onDrop(evt: IG6GraphEvent) {
    // 被放下的目标 combo
    const { item } = evt;
    if (!item || !this.targets || item.destroyed) {
      return;
    }
    this.updatePositions(evt);

    const graph: IGraph = this.graph;

    const targetModel = item.getModel();

    this.targets.map((combo: ICombo) => {
      const model = combo.getModel();
      if (model.parentId !== targetModel.id) {
        if (this.activeState) {
          graph.setItemState(item, this.activeState, false);
        }
        // 将 Combo 放置到某个 Combo 上面时，只有当 onlyChangeComboSize 为 false 时候才更新 Combo 结构
        if (!this.onlyChangeComboSize) {
          graph.updateComboTree(combo, targetModel.id);
        } else {
          graph.updateCombo(combo);
        }
      } else {
        graph.updateCombo(item as ICombo);
      }
    });

    this.end(item, evt);

    // 如果已经拖放下了，则不需要再通过距离判断了
    this.endComparison = true;
  },
  onNodeDrop(evt: IG6GraphEvent) {
    if (!this.targets || this.targets.length === 0) return;
    this.updatePositions(evt);
    const graph: IGraph = this.graph;

    const item = evt.item as INode;
    const comboId = item.getModel().comboId as string;
    let droppedCombo;
    // 如果被放置的的节点有 comboId，且这个 comboId 与正在被拖拽的 combo 的父 id 不相同，则更新父亲为 comboId
    if (comboId) {
      if (this.activeState) {
        const combo = graph.findById(comboId);
        graph.setItemState(combo, this.activeState, false);
      }
      this.targets.map((combo: ICombo) => {
        if (!this.onlyChangeComboSize) {
          if (comboId !== combo.getID()) {
            droppedCombo = graph.findById(comboId);
            if (comboId !== combo.getModel().parentId) graph.updateComboTree(combo, comboId);
          }
        } else {
          graph.updateCombo(combo);
        }
      });
    } else {
      // 如果被放置的节点没有 comboId，且正在被拖拽的 combo 有父 id，则更新父亲为 undefined
      this.targets.map((combo: ICombo) => {
        if (!this.onlyChangeComboSize) {
          const model = combo.getModel();
          if (model.comboId) {
            graph.updateComboTree(combo);
          }
        } else {
          graph.updateCombo(combo);
        }
      });
    }


    // 如果已经拖放下了，则不需要再通过距离判断了
    this.endComparison = true;
    this.end(droppedCombo, evt);
  },
  onDragEnter(evt: IG6GraphEvent) {
    if (!this.origin) {
      return;
    }

    if (!this.validationCombo(evt)) return;

    const { item } = evt;
    const graph: IGraph = this.graph;
    if (this.activeState) {
      graph.setItemState(item, this.activeState, true);
    }
  },
  onDragLeave(evt) {
    if (!this.origin) {
      return;
    }

    if (!this.validationCombo(evt)) return;

    const item = evt.item as ICombo;
    const graph: IGraph = this.graph;
    if (this.activeState) {
      graph.setItemState(item, this.activeState, false);
    }
  },
  onDragEnd(evt: IG6GraphEvent) {
    if (!this.targets || this.targets.length === 0) return;
    const item = evt.item;
    this.updatePositions(evt);
    const parentCombo = this.getParentCombo(item.getModel().parentId);
    const graph: IGraph = this.graph;
    if (parentCombo && this.activeState) {
      graph.setItemState(parentCombo, this.activeState, false);
    }
    this.end(undefined, evt);
  },

  end(comboDropedOn: ICombo | undefined, evt: IG6GraphEvent) {
    if (!this.origin) return;
    const graph: IGraph = this.graph;

    // 删除delegate shape
    if (this.delegateShape) {
      const delegateGroup = graph.get('delegateGroup');
      delegateGroup.clear();
      this.delegateShape = null;
    }

    if (comboDropedOn && this.activeState) {
      graph.setItemState(comboDropedOn, this.activeState, false);
    }
    // 若没有被放置的 combo，则是被放置在画布上
    if (!comboDropedOn) {
      this.targets.map((combo: ICombo) => {
        // 将 Combo 放置到某个 Combo 上面时，只有当 onlyChangeComboSize 为 false 时候才更新 Combo 结构
        if (!this.onlyChangeComboSize) {
          graph.updateComboTree(combo);
        } else {
          graph.updateCombo(combo);
        }
      });
    }

    this.point = [];
    this.origin = null;
    this.originPoint = null;
    this.targets.length = 0;
  },

  /**
   * 遍历 comboTree，分别更新 node 和 combo
   * @param data
   * @param fn
   */
  traverse<T extends Item>(data: T, fn: (param: T) => boolean) {
    if (fn(data) === false) {
      return;
    }

    if (data) {
      const combos = data.get('combos');
      each(combos, (child) => {
        this.traverse(child, fn);
      });

      const nodes = data.get('nodes');
      each(nodes, (child) => {
        this.traverse(child, fn);
      });
    }
  },

  updateCombo(item: ICombo, evt: IG6GraphEvent) {
    this.traverse(item, (param) => {
      if (param.destroyed) {
        return false;
      }
      this.updateSignleItem(param, evt);
      return true;
    });
  },

  /**
   *
   * @param item 当前正在拖动的元素
   * @param evt
   */
  updateSignleItem(item: Item, evt: IG6GraphEvent) {
    const { origin } = this;
    const graph: IGraph = this.graph;
    const model = item.getModel() as ComboConfig;
    const itemId = item.get('id');

    if (!this.point[itemId]) {
      this.point[itemId] = {
        x: model.x,
        y: model.y,
      };
    }

    const x: number = evt.x - origin.x + this.point[itemId].x;
    const y: number = evt.y - origin.y + this.point[itemId].y;

    graph.updateItem(item, { x, y });
  },

  /**
   * 根据 ID 获取父 Combo
   * @param parentId 父 Combo ID
   */
  getParentCombo(parentId: string): ICombo | undefined {
    const graph: IGraph = this.graph;
    if (!parentId) {
      return undefined;
    }

    const parentCombo = graph.findById(parentId) as ICombo;
    if (!parentCombo) {
      return undefined;
    }

    return parentCombo;
  },

  updateDelegate(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    // 当没有 delegate shape 时创建
    if (!this.delegateShape) {
      const delegateGroup: IGroup = graph.get('delegateGroup');

      let bbox = null;
      if (this.targets.length > 1) {
        bbox = calculationItemsBBox(this.targets);
      } else {
        bbox = this.targets[0].getBBox();
      }

      const { x, y, width, height, minX, minY } = bbox;

      this.originPoint = { x, y, width, height, minX, minY };

      const attrs = { ...Global.delegateStyle, ...this.delegateStyle };

      this.delegateShape = delegateGroup.addShape('rect', {
        attrs: {
          width: bbox.width,
          height: bbox.height,
          x: bbox.x,
          y: bbox.y,
          ...attrs,
        },
        name: 'combo-delegate-shape',
      });
    } else {
      const clientX = evt.x - this.origin.x + this.originPoint.minX;
      const clientY = evt.y - this.origin.y + this.originPoint.minY;

      this.delegateShape.attr({
        x: clientX,
        y: clientY,
      });
    }
  },
};
