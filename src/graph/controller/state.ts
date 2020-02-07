import each from '@antv/util/lib/each'
import isString from '@antv/util/lib/is-string'
import { IGraph, IStates } from '../../interface/graph';
import { Item } from '../../types';
import Graph from '../graph';
import { INode } from '../../interface/item';

interface ICachedStates {
  enabled: IStates;
  disabled: IStates;
}


let timer: number | null = null
const TIME_OUT = 16;


export default class StateController {
  private graph: Graph
  private cachedStates: ICachedStates
  public destroyed: boolean

  constructor(graph: Graph) {
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
   * @param {Item} item
   * @param {string} state
   * @param {object} cache
   * @returns
   * @memberof State
   */
  private checkCache(item: Item, state: string, cache: { [key: string]: any }) {
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
   * @param {Item} item Item 实例
   * @param {string} state 状态名称
   * @param {object} states
   * @memberof State
   */
  private cacheState(item: Item, state: string, states: IStates) {
    if (!states[state]) {
      states[state] = [];
    }
    states[state].push(item as INode);
  }

  /**
   * 更新 Item 的状态
   *
   * @param {Item} item Item实例
   * @param {string} state 状态名称
   * @param {boolean} enabled 状态是否可用
   * @memberof State
   */
  public updateState(item: Item, state: string, enabled: boolean) {
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
   * @param {Item} item
   * @param {(string | string[])} states
   * @param {boolean} enabled
   * @memberof State
   */
  public updateStates(item: Item, states: string | string[], enabled: boolean) {
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
    const states = this.graph.get('states') as IStates
    const cachedStates = this.cachedStates;
    
    each(cachedStates.disabled, (val, key) => {
      if (states[key]) {
        states[key] = states[key].filter(item => {
          return val.indexOf(item) < 0 && !val.destroyed;
        });
      }
    });

    each(cachedStates.enabled, (val: INode[], key) => {
      if (!states[key]) {
        states[key] = val;
      } else {
        const map: { [key: string]: boolean } = {};
        states[key].forEach(item => {
          if (!item.destroyed) {
            map[item.get('id')] = true;
          }
        });
        val.forEach((item:Item) => {
          if (!item.destroyed) {
            const id = item.get('id');
            if (!map[id]) {
              map[id] = true;
              states[key].push(item as INode);
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
    (this.graph as Graph | null) = null;
    (this.cachedStates as ICachedStates | null) = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    this.destroyed = true;
  }

}