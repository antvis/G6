/*
 * @Author: moyee
 * @LastEditors: moyee
 * @Description: 拖动 Combo
 */
import { G6Event, IG6GraphEvent, Item, ComboConfig } from '../types';
import { calculationItemsBBox } from '../util/base'
import Global from '../global';
import { IGraph } from '../interface/graph';
import { each } from '@antv/util/lib';
import { IGroup } from '@antv/g-base/lib/interfaces';
import { ICombo } from '../interface/item';

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
    const combos = data.get('combos')
    if (combos.length === 0) {
      return false
    }
    each(combos, child => {
      traverseCombo(child, fn);
    });
  }
}

export default {
  getDefaultCfg() {
    return {
      enableDelegate: false,
      // 如果设置为true，则拖动 combo 过程中，combo 中的子元素不会跟随
      optimization: false,
      delegateStyle: {},
      delegateShapes: {},
      delegateShapeBBoxs: {},
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'combo:dragstart': 'onDragStart',
      'combo:drag': 'onDrag',
      'combo:dragend': 'onDragEnd',
      'combo:drop': 'onDrop',
      'combo:dragenter': 'onDragEnter',
      'combo:dragleave': 'onDragLeave'
    };
  },
  validationCombo(evt: IG6GraphEvent) {
    const { item } = evt
    if (!item) {
      return
    }

    if (!this.shouldUpdate(this, evt)) {
      return
    }

    const type = item.getType()

    if (type !== 'combo') {
      return
    }
  },
  onDragStart(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    const { item } = evt;

    this.validationCombo(item)

    this.targets = []

    // 获取所有选中的 Combo
    const combos = graph.findAllByState('combo', 'selected')

    const currentCombo = item.get('id')

    const dragCombos = combos.filter(combo => {
      const comboId = combo.get('id')
      return currentCombo === comboId
    })

    if (dragCombos.length === 0) {
      this.targets.push(item)
    } else {
      this.targets = combos
    }

    this.targets.map((combo: ICombo) => {
      const model = combo.getModel() as ComboConfig
      if (model.parentId) {
        const parentCombo = graph.findById(model.parentId)
        if (parentCombo) {
          graph.setItemState(parentCombo, 'active', true)
        }
      }
    })

    this.point = {};
    this.originPoint = {};

    this.origin = {
      x: evt.x,
      y: evt.y
    }

    this.currentItemChildCombos = []

    traverseCombo(item, (param) => {
      const model = param.getModel()
      this.currentItemChildCombos.push(model.id)
      return true
    })
  },
  onDrag(evt: IG6GraphEvent) {
    if (!this.origin) {
      return;
    }

    this.validationCombo(evt)

    if (this.enableDelegate) {
      this.updateDelegate(evt);
    } else {
      const graph: IGraph = this.graph
      const item: Item = evt.item
      const model = item.getModel()
      // 拖动过程中实时计算距离
      const combos = graph.getCombos()
      const sourceBBox = item.getBBox()

      const { centerX, centerY, width } = sourceBBox

      // 参与计算的 Combo，需要排除掉：
      // 1、拖动 combo 自己
      // 2、拖动 combo 的 parent
      // 3、拖动 Combo 的 children

      const calcCombos = combos.filter(combo => {
        const cmodel = combo.getModel() as ComboConfig
        // 被拖动的是最外层的 Combo，无 parent，排除自身和子元素
        if (!model.parentId) {
          return cmodel.id !== model.id && !this.currentItemChildCombos.includes(cmodel.id)
        }
        return cmodel.id !== model.id && !this.currentItemChildCombos.includes(cmodel.id)
      })

      calcCombos.map(combo => {
        const { centerX: cx, centerY: cy, width: w } = combo.getBBox()

        // 拖动的 combo 和要进入的 combo 之间的距离
        const disX = centerX - cx
        const disY = centerY - cy
        // 圆心距离
        const distance = 2 * Math.sqrt(disX * disX + disY * disY)

        if ((width + w) - distance >  0.8 * width) {
          graph.setItemState(combo, 'active', true)
        } else {
          graph.setItemState(combo, 'active', false)
        }
      })

      each(this.targets, item => {
        this.updateCombo(item, evt)
      })
    }

  },

  onDrop(evt: IG6GraphEvent) {
    // 拖动的目标 combo
    const { item } = evt
    console.log('drop', item)
    if (!item  || !this.targets) {
      return
    }

    const graph: IGraph = this.graph

    const targetModel = item.getModel()

    this.targets.map((combo: ICombo) => {
      const model = combo.getModel()
      if (model.parentId !== targetModel.id) {
        graph.setItemState(item, 'active', false)
        graph.updateComboTree(combo, targetModel.id)
      }
    })

    console.log(graph.findById('5'))

    console.log(graph.get('comboTrees'));

    // 如果已经拖放下了，则不需要再通过距离判断了
    this.endComparison = true
  },
  onDragEnter(evt: IG6GraphEvent) {
    if (!this.origin) {
      return
    }

    this.validationCombo(evt)

    const { item } = evt
    console.log('drag enter', item)
    const graph: IGraph = this.graph
    graph.setItemState(item, 'active', true)
  },
  onDragLeave(evt) {
    if (!this.origin) {
      return
    }

    this.validationCombo(evt)
    
    const item = evt.item as ICombo
    const graph: IGraph = this.graph
    graph.setItemState(item, 'active', false)
  },
  onDragEnd(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    
    this.validationCombo(evt)
    
    // 当启用 delegate 时，拖动结束时需要更新 combo
    if (this.enableDelegate) {
      each(this.targets, item => {
        this.updateCombo(item, evt)
      })
    }

    const { item } = evt
    
    // 表示是否是拖出操作
    let isDragOut = false
    
    const model = item.getModel()

    // 拖动结束时计算拖入还是拖出, 需要更新 combo
    // 1. 是否将当前 combo 拖出了 父 combo；
    // 2. 是否将当前 combo 拖入了新的 combo
    const type = item.getType()
    if (type === 'combo') {
      const parentId = model.parentId

      let currentBBox = null
      const parentCombo = this.getParentCombo(parentId)

      // 当只有存在 parentCombo 时才处理拖出的情况
      if (parentCombo) {
        if (this.enableDelegate) {
          currentBBox = this.delegateShape.getBBox()
        } else {
          currentBBox = item.getBBox()
        }
        const { x: cx, y: cy, centerX, centerY, width } = currentBBox;

        //判断是否拖出了 combo，需要满足： 
        // 1、有 parent；
        // 2、拿拖动的对象和它父parent比较

        const parentBBox = parentCombo.getBBox()
        const { minX, minY, maxX, maxY, centerX: pcx, centerY: pcy, width: w } = parentBBox;

        // 拖出了父 combo
        // 如果直接拖出到了 父 combo 周边，则不用计算距离圆心距离
        if (cx <= minX || cx >= maxX || cy <= minY || cy >= maxY) {
          graph.setItemState(parentCombo, 'active', false)
          isDragOut = true
          // 表示正在拖出操作
          graph.updateComboTree(item as ICombo)
        } else {
          // 拖动的 combo 和要进入的 combo 之间的距离
          const disX = centerX - pcx
          const disY = centerY - pcy
          // 圆心距离
          const distance = 2 * Math.sqrt(disX * disX + disY * disY)

          // 拖出的还在父 combo 包围盒范围内，但实际上已经拖出去了
          if ((width + w) - distance < 0.8 * width) {
            isDragOut = true
            graph.setItemState(parentCombo, 'active', false)
            graph.updateComboTree(item as ICombo)
          }
        }
      }

      // 拖入
      if (!this.endComparison && !isDragOut) {
        // 判断是否拖入了 父 Combo，需要满足：
        // 1、拖放最终位置是 combo，且不是父 Combo；
        // 2、拖动 Combo 进入到非父 Combo 超过 50%；
        const combos = graph.getCombos()
        const sourceBBox = item.getBBox()

        const { centerX, centerY, width } = sourceBBox

        // 参与计算的 Combo，需要排除掉：
        // 1、拖动 combo 自己
        // 2、拖动 combo 的 parent
        // 3、拖动 Combo 的 children
        const calcCombos = combos.filter(combo => {
          const cmodel = combo.getModel() as ComboConfig
          // 被拖动的是最外层的 Combo，无 parent，排除自身和子元素
          if (!model.parentId) {
            return cmodel.id !== model.id && !this.currentItemChildCombos.includes(cmodel.id)
          }
          return cmodel.id !== model.id && !this.currentItemChildCombos.includes(cmodel.id)
        })

        calcCombos.map(combo => {
          const current = combo.getModel()
          const { centerX: cx, centerY: cy, width: w } = combo.getBBox()

          // 拖动的 combo 和要进入的 combo 之间的距离
          const disX = centerX - cx
          const disY = centerY - cy
          // 圆心距离
          const distance = 2 * Math.sqrt(disX * disX + disY * disY)

          graph.setItemState(combo, 'active', false)
          if ((width + w) - distance >  0.8 * width) {
            graph.updateComboTree(item as ICombo, current.id)
          }
        })
      }

    }

    // 删除delegate shape
    if (this.delegateShape) {
      const delegateGroup = graph.get('delegateGroup')
      delegateGroup.clear();
      this.delegateShape = null
    }

    const parentCombo = this.getParentCombo(model.parentId)
    console.log('parentCombo', parentCombo)
    if (parentCombo) {
      graph.setItemState(parentCombo, 'active', false)
    }

    this.targets.length = 0
    this.point = []
    this.origin = null
    this.originPoint = null
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
      const combos = data.get('combos')
      each(combos, child => {
        this.traverse(child, fn);
      });

      const nodes = data.get('nodes')
      each(nodes, child => {
        this.traverse(child, fn)
      })
    }
  },

  updateCombo(item: ICombo, evt: IG6GraphEvent) {
    this.traverse(item, param => {
      this.updateSignleItem(param, evt)
      return true
    })
  },

  /**
   * 
   * @param item 当前正在拖动的元素
   * @param evt 
   */
  updateSignleItem(item: Item, evt: IG6GraphEvent) {
    const { origin } = this;
    const graph: IGraph = this.graph
    const model = item.getModel() as ComboConfig
    const itemId = item.get('id')

    if(!this.point[itemId]) {
      this.point[itemId] = {
        x: model.x,
        y: model.y
      }
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
    const graph: IGraph = this.graph
    if (!parentId) {
      return undefined
    }

    const parentCombo = graph.findById(parentId) as ICombo
    if (!parentCombo) {
      return undefined
    }

    return parentCombo
  },

  updateDelegate(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph
    // 当没有 delegate shape 时创建
    if(!this.delegateShape) {
      const delegateGroup: IGroup = graph.get('delegateGroup')

      let bbox = null
      if (this.targets.length > 1) {
        bbox = calculationItemsBBox(this.targets)
      } else {
        bbox = this.targets[0].getBBox()
      }

      const { x, y, width, height, minX, minY } = bbox

      this.originPoint = { x, y, width, height, minX, minY };

      const attrs = Object.assign({}, Global.delegateStyle, this.delegateStyle);

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
  }
};
