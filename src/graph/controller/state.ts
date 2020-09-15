import each from '@antv/util/lib/each';
import isString from '@antv/util/lib/is-string';
import { Item, States } from '../../types';
import Graph from '../graph';
import { INode } from '../../interface/item';

interface CachedStates {
  enabled: States;
  disabled: States;
}

let timer: any = null;

export default class StateController {
  private graph: Graph;

  private cachedStates: CachedStates;

  public destroyed: boolean;

  constructor(graph: Graph) {
    this.graph = graph;
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
      disabled: {},
    };
    this.destroyed = false;
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
  private static checkCache(item: Item, state: string, cache: { [key: string]: any }) {
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
  private static cacheState(item: Item, state: string, states: States) {
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
    const { checkCache, cacheState } = StateController;
    if (item.destroyed) {
      return;
    }

    const { cachedStates } = this;

    const enabledStates = cachedStates.enabled;
    const disabledStates = cachedStates.disabled;

    if (enabled) {
      checkCache(item, state, disabledStates);
      cacheState(item, state, enabledStates);
    } else {
      checkCache(item, state, enabledStates);
      cacheState(item, state, disabledStates);
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      this.updateGraphStates();
    }, 16);
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
    if (isString(states)) {
      this.updateState(item, states, enabled);
    } else {
      states.forEach((state) => {
        this.updateState(item, state, enabled);
      });
    }
  }

  /**
   * 更新 states
   *
   * @memberof State
   */
  public updateGraphStates() {
    const states = this.graph.get('states') as States;
    const { cachedStates } = this;

    each(cachedStates.disabled, (val, key) => {
      if (states[key]) {
        states[key] = states[key].filter((item) => val.indexOf(item) < 0 && !val.destroyed);
      }
    });

    each(cachedStates.enabled, (val: INode[], key) => {
      if (!states[key]) {
        states[key] = val;
      } else {
        const map: { [key: string]: boolean } = {};
        states[key].forEach((item) => {
          if (!item.destroyed) {
            map[item.get('id')] = true;
          }
        });
        val.forEach((item: Item) => {
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
      disabled: {},
    };
  }

  public destroy() {
    (this.graph as Graph | null) = null;
    (this.cachedStates as CachedStates | null) = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    this.destroyed = true;
  }
}
