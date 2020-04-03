/*
 * @Author: moyee
 * @LastEditors: moyee
 * @Description: 拖动 Combo
 */
import deepMix from '@antv/util/lib/deep-mix';
import { G6Event, IG6GraphEvent, Item, ComboConfig, ModelConfig } from '../types';
import { calculationItemsBBox } from '../util/base'
import Global from '../global';
import { IGraph } from '../interface/graph';
import Combo from '../item/combo';
import { each, mod } from '_@antv_util@2.0.7@@antv/util/lib';
import { IGroup } from '_@antv_g-svg@0.4.0@@antv/g-svg/lib/interfaces';
import { ICombo } from '../interface/item';

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
      'combo:dragover': 'onDragOver',
      'canvas:mouseleave': 'onOutOfRange',
    };
  },
  onDragStart(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    const { item } = evt;

    if (!item) {
      return
    }

    const type = item.getType()

    if (type !== 'combo') {
      return
    }

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

    console.log('combos', this.targets)

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
  },
  onDrag(evt: IG6GraphEvent) {
    if (!this.origin) {
      return;
    }

    if (!this.shouldUpdate(this, evt)) {
      return
    }

    if (this.enableDelegate) {
      this.updateDelegate(evt);
    } else {
      each(this.targets, item => {
        this.updateCombo(item, evt)
      })
    }

  },

  onDragOver(evt: IG6GraphEvent) {
    console.log('drag over',evt)
  },
  onDrop(evt: IG6GraphEvent) {
    console.log('drop',evt)
  },
  onDragEnd(evt: IG6GraphEvent) {
    console.log('drag end', evt)
    const { graph } = this;
    
    // 当启用 delegate 时，拖动结束时需要更新 combo
    if (this.enableDelegate) {
      each(this.targets, item => {
        this.updateCombo(item, evt)
      })
    }

    if(this.needRender) {
      this.graph.render()
    }

    // 删除delegate shape
    if (this.delegateShape) {
      const delegateGroup = graph.get('delegateGroup')
      delegateGroup.clear();
      this.delegateShape = null
    }

    const { item } = evt
    const model = item.getModel()
    const parentCombo = this.getParentCombo(model.parentId)
    if (parentCombo) {
      graph.setItemState(parentCombo, 'active', false)
    }

    this.targets.length = 0
    this.point = []
    this.origin = null
    this.originPoint = null
    this.needRender = false
  },

  updateCombo(item: Combo, evt: IG6GraphEvent) {
    const traverse = <T extends Item>(data: T, fn: (param: T) => boolean) => {
      if (fn(data) === false) {
        return;
      }
    
      if (data) {
        const combos = data.get('combos')
        each(combos, child => {
          traverse(child, fn);
        });
        
        const nodes = data.get('nodes')
        each(nodes, child => {
          traverse(child, fn)
        })
      }
    };

    traverse(item, param => {
      // console.log(param)
      this.updateSignleItem(param, evt)
      return true
    })
  },

  updateSignleItem(item: Item, evt: IG6GraphEvent) {
    const { origin } = this;
    const graph: IGraph = this.graph
    const model = item.getModel()
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

    // 还需要更新 combo
    // 1. 是否将当前 combo 拖出了 父 combo；
    // 2. 是否将当前 combo 拖入了新的 combo

    const type = item.getType()
    if (type === 'combo') {
      const parentId = (model as ComboConfig).parentId

      const parentCombo = this.getParentCombo(parentId)
      if (!parentCombo) {
        return
      }

      this.targets.map((combo: ICombo) => {
        const comboModel = combo.getModel()
        // 确定是正在拖动的中 combo
        if (comboModel.id === model.id) {

          let currentBBox = null
          if (this.enableDelegate) {
            currentBBox = this.delegateShape.getBBox()
          } else {
            currentBBox = combo.getBBox()
          }
          const { x: cx, y: cy } = currentBBox;

          //判断是否拖出了 combo，需要满足： 
          // 1、有 parent；
          // 2、拿拖动的对象和它父parent比较
    
          const parentBBox = parentCombo.getBBox()
          const { minX, minY, maxX, maxY } = parentBBox;
    
          // 拖出了父 combo
          if (cx <= minX || cx >= maxX || cy <= minY || cy >= maxY) {
            delete model.parentId
            this.needRender = true
            graph.setItemState(parentCombo, 'active', false)
            // graph.updateCombo(parentCombo)
          }
        }
      })
    }

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
      // console.log('坐标', clientX, clientY)
      this.delegateShape.attr({
        x: clientX,
        y: clientY,
      });
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
