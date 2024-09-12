import { each } from '@antv/util';
import { IAbstractGraph } from '../interface/graph';
import { G6Event } from '../types';

// 自定义 Behavior 时候共有的方法
export default {
  getDefaultCfg() {
    return {};
  },

  /**
   * register event handler, behavior will auto bind events
   * for example:
   * return {
   *  click: 'onClick'
   * }
   */
  getEvents() {
    return {};
  },

  updateCfg(cfg: object) {
    Object.assign(this, cfg)
    return true;
  },

  shouldBegin() {
    return true;
  },

  shouldUpdate() {
    return true;
  },

  shouldEnd() {
    return true;
  },

  /**
   * auto bind events when register behavior
   * @param graph Graph instance
   */
  bind(graph: IAbstractGraph) {
    const { events } = this;
    this.graph = graph;
    if (
      this.type === 'drag-canvas' ||
      this.type === 'brush-select' ||
      this.type === 'lasso-select'
    ) {
      graph.get('canvas').set('draggable', true);
    }
    each(events, (handler: () => void, event: G6Event) => {
      graph.on(event, handler);
    });
    // To avoid the tabs switching makes the keydown related behaviors disable
    this.handleVisibilityChange = () => {
      this.keydown = false;
    };
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },

  unbind(graph: IAbstractGraph) {
    const { events } = this;
    const draggable = graph.get('canvas').get('draggable');
    if (
      this.type === 'drag-canvas' ||
      this.type === 'brush-select' ||
      this.type === 'lasso-select'
    ) {
      graph.get('canvas').set('draggable', false);
    }
    each(events, (handler: () => void, event: G6Event) => {
      graph.off(event, handler);
    });
    graph.get('canvas').set('draggable', draggable);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },

  get(val: string) {
    return (this as any)[val];
  },

  set(key: string, val: any) {
    (this as any)[key] = val;
    return this;
  },
};
