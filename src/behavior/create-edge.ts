import { G6Event, IG6GraphEvent, EdgeConfig } from '../types';
import { IGraph } from '../interface/graph';

const DEFAULT_TRIGGER = 'click';
const ALLOW_EVENTS = ['click', 'drag'];
const DEFAULT_KEY = undefined;
const ALLOW_KEYS = ['shift', 'ctrl', 'control', 'alt', 'meta', undefined];

export default {
  getDefaultCfg(): object {
    return {
      trigger: DEFAULT_TRIGGER,
      key: DEFAULT_KEY,
      edgeConfig: {}
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    const self = this as any;
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(self.trigger.toLowerCase()) > -1)) {
      self.trigger = DEFAULT_TRIGGER;
      // eslint-disable-next-line no-console
      console.warn(
        "Behavior create-edge 的 trigger 参数不合法，请输入 'click'，'drag'",
      );
    }
    if (self.key && ALLOW_KEYS.indexOf(self.key.toLowerCase()) === -1) {
      self.trigger = DEFAULT_KEY;
      // eslint-disable-next-line no-console
      console.warn(
        "Behavior create-edge 的 key 参数不合法，请输入 'shift'，'ctrl'，'alt'，'control'，或 undefined",
      );
    }
    let events;
    if (self.trigger === 'drag') {
      events = {
        'node:dragstart': 'onClick',
        'combo:dragstart': 'onClick',
        drag: 'updateEndPoint',
        'node:drop': 'onClick',
        'combo:drop': 'onClick',
        'dragend': 'onDragEnd'
      };
    } else if (self.trigger === 'click') {
      events = {
        'node:click': 'onClick', // The event is node:click, the responsing function is onClick
        mousemove: 'updateEndPoint', // The event is mousemove, the responsing function is onMousemove
        'edge:click': 'cancelCreating', // The event is edge:click, the responsing function is onEdgeClick
        'canvas:click': 'cancelCreating',
        'combo:click': 'onClick'
      };
    }
    if (self.key) {
      events.keydown = 'onKeyDown';
      events.keyup = 'onKeyUp';
    }
    return events;
  },
  onDragEnd(ev: IG6GraphEvent) {
    const self = this;
    if (self.key && !self.keydown) return;
    const { item } = ev;
    if (!item || item.getID() === self.source || item.getType() !== 'node')
      self.cancelCreating({
        item: self.edge,
        x: ev.x,
        y: ev.y
      });
  },
  // 如果边的起点没有指定，则根据起点创建新边；如果起点已经指定而终点未指定，则指定终点
  onClick(ev: IG6GraphEvent) {
    const self = this;
    console.log('onclick', self.key, self.keydown, ev.item)
    if (self.key && !self.keydown) return;
    const node = ev.item;
    const graph: IGraph = self.graph;
    const model = node.getModel();
    // 如果起点已经指定而终点未指定，则指定终点
    if (self.addingEdge && self.edge) {
      if (!self.shouldEnd.call(self, ev)) return;
      console.log('clicking target', model.id)
      const updateCfg: EdgeConfig = {
        target: model.id
      };
      if (self.source === model.id) {
        updateCfg.type = 'loop';
      }

      graph.emit('beforecreateedge', {});

      graph.updateItem(self.edge, updateCfg);

      graph.emit('aftercreateedge', {
        edge: self.edge
      });

      // 暂时将该边的 capture 恢复为 true
      self.edge.getKeyShape().set('capture', true);

      self.edge = null;
      self.addingEdge = false;
    } else { // 如果边的起点没有指定，则根据起点创建新边
      if (!self.shouldBegin.call(self, ev)) return;
      self.edge = graph.addItem('edge', {
        source: model.id,
        target: model.id,
        ...self.edgeConfig
      }, false);
      self.source = model.id;
      self.addingEdge = true;
      // 暂时将该边的 capture 设置为 false，这样可以拾取到后面的元素
      self.edge.getKeyShape().set('capture', false);
    }
  },
  // 边的起点已经确定，边的末端跟随鼠标移动
  updateEndPoint(ev: IG6GraphEvent) {
    const self = this;
    if (self.key && !self.keydown) return;
    const point = { x: ev.x, y: ev.y };

    // 若此时 source 节点已经被移除，结束添加边
    if (!self.graph.findById(self.source)) {
      self.addingEdge = false;
      return;
    }
    if (self.addingEdge && self.edge) {
      // 更新边的终点为鼠标位置
      self.graph.updateItem(self.edge, {
        target: point,
      }, false);
    }
  },
  // 取消增加边，删除该边；或指定终点
  cancelCreating(ev: IG6GraphEvent) {
    const self = this;
    if (self.key && !self.keydown) return;
    const graph: IGraph = self.graph;
    const currentEdge = ev.item;
    if (self.addingEdge && ev.target && ev.target.isCanvas && ev.target.isCanvas()) {
      graph.removeItem(self.edge, false);
      self.edge = null;
      self.addingEdge = false;
      return;
    }
    if (self.addingEdge && self.edge === currentEdge) {
      let cancelEdge = true;
      // !graph.get('groupByTypes') 将会导致选中终点时实际上边在最上层，节点无法响应 click 事件
      if (!graph.get('groupByTypes')) {
        // 此时需要判断点击的位置是否在节点范围内，若在，则指定终点。否则取消增加边
        const { x, y } = ev;
        const nodes = graph.getNodes();
        const length = nodes.length;
        for (let i = 0; i < length; i++) {
          const node = nodes[i];
          const model = node.getModel();
          const nodeBBox = node.getBBox();
          if (x <= nodeBBox.maxX && x >= nodeBBox.minX
            && y <= nodeBBox.maxY && y >= nodeBBox.minY) {
            if (!self.shouldEnd.call(self,
              {
                x: ev.x, y: ev.y,
                canvasX: ev.canvasX, canvasY: ev.canvasY,
                clientX: ev.clientX, clientY: ev.clientY,
                item: node
              })) {
              return;
            }

            graph.emit('beforecreateedge', {});

            graph.updateItem(self.edge, {
              target: model.id
            });
            graph.emit('aftercreateedge', {
              edge: self.edge
            });
            cancelEdge = false;
            break;
          }
        }
      }
      if (cancelEdge) graph.removeItem(self.edge, false);
      self.edge = null;
      self.addingEdge = false;
    }
  },

  onKeyDown(e: IG6GraphEvent) {
    const self = this;
    const code = e.key;
    if (!code) {
      return;
    }
    if (code.toLowerCase() === self.key.toLowerCase()) {
      self.keydown = true;
    } else {
      self.keydown = false;
    }
  },
  onKeyUp() {
    const self = this;
    if (self.addingEdge && self.edge) {
      // 清除正在增加的边
      self.graph.removeItem(self.edge, false);
      self.addingEdge = false;
      self.edge = null;
    }
    this.keydown = false;
  },
};