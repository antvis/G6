import each from '@antv/util/lib/each'
import isString from '@antv/util/lib/is-string'
import { IGraph, IStates } from '@g6/interface/graph';
import { IItem } from '@g6/interface/item';

interface IState {
  updateState: (item: IItem, state: string, enabled: boolean) => void;
  updateStates: (item: IItem, states: string  | string[], enabled: boolean) => void;
  updateGraphStates: () => void;
  destroy: () => void;
}

interface ICachedStates {
  enabled: IStates;
  disabled: IStates;
}

let timer = null
const TIME_OUT = 16;

export default class State implements IState {
  private graph: IGraph
  private cachedStates: ICachedStates
  public destroyed: boolean

  constructor(graph: IGraph) {
    this.graph = graph
    /**
     * this.cachedStates = {
     *    enabled: {
     *        hover: [Node]
     *    },
     *     disabled: {}
     *  }
     */
    this.cachedStates = {
      enabled: {},
      disabled: {}
    }
    this.destroyed = false
  }

  /**
   * 检查 cache 的可用性
   *
   * @private
   * @param {IItem} item
   * @param {string} state
   * @param {object} cache
   * @returns
   * @memberof State
   */
  private checkCache(item: IItem, state: string, cache: object) {
    if (!cache[state]) {
      return;
    }
    const index = cache[state].indexOf(item);
    if (index >= 0) {
      cache[state].splice(index, 1);
    }
  }

  /**
   * 缓存 state
   *
   * @private
   * @param {IItem} item Item 实例
   * @param {string} state 状态名称
   * @param {object} states
   * @memberof State
   */
  private cacheState(item: IItem, state: string, states: object) {
    if (!states[state]) {
      states[state] = [];
    }
    states[state].push(item);
  }

  /**
   * 更新 Item 的状态
   *
   * @param {IItem} item Item实例
   * @param {string} state 状态名称
   * @param {boolean} enabled 状态是否可用
   * @memberof State
   */
  public updateState(item: IItem, state: string, enabled: boolean) {
    if (item.destroyed) {
      return;
    }

    const self = this;

    const cachedStates = self.cachedStates;

    const enabledStates = cachedStates.enabled;
    const disabledStates = cachedStates.disabled;

    if (enabled) {
      self.checkCache(item, state, disabledStates);
      self.cacheState(item, state, enabledStates);
    } else {
      self.checkCache(item, state, enabledStates);
      self.cacheState(item, state, disabledStates);
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      self.updateGraphStates();
    }, TIME_OUT);
  }

  /**
   * 批量更新 states，兼容 updateState，支持更新一个 state
   *
   * @param {IItem} item
   * @param {(string | string[])} states
   * @param {boolean} enabled
   * @memberof State
   */
  public updateStates(item: IItem, states: string | string[], enabled: boolean) {
    const self = this;
    if (isString(states)) {
      self.updateState(item, states, enabled);
    } else {
      states.forEach(state => {
        self.updateState(item, state, enabled);
      });
    }
  }

  /**
   * 更新 states
   *
   * @memberof State
   */
  public updateGraphStates() {
    const states = this.graph.get('states')

    const cachedStates = this.cachedStates;
    
    each(cachedStates.disabled, (val, key) => {
      if (states[key]) {
        states[key] = states[key].filter(item => {
          return val.indexOf(item) < 0 && !val.destroyed;
        });
      }
    });

    each(cachedStates.enabled, (val, key) => {
      if (!states[key]) {
        states[key] = val;
      } else {
        const map = {};
        states[key].forEach(item => {
          if (!item.destroyed) {
            map[item.get('id')] = true;
          }
        });
        val.forEach(item => {
          if (!item.destroyed) {
            const id = item.get('id');
            if (!map[id]) {
              map[id] = true;
              states[key].push(item);
            }
          }
        });
      }
    });

    this.graph.emit('graphstatechange', { states });
    this.cachedStates = {
      enabled: {},
      disabled: {}
    }
  }

  public destroy() {
    this.graph = null;
    this.cachedStates = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    this.destroyed = true;
  }

}