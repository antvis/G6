import { isString } from '@antv/util';
import { Item } from '../../types';
import { IAbstractGraph } from '../../interface/graph';

export default class StateController {
  private graph: IAbstractGraph;

  public destroyed: boolean;

  constructor(graph: IAbstractGraph) {
    this.graph = graph;
    this.destroyed = false;
  }

  /**
   * 更新 Item 的状态
   *
   * @param {Item} item Item实例
   * @param {string} state 状态名称
   * @param {boolean} enabled 状态是否可用
   * @memberof State
   */
  public updateState(item: Item, state: string, enabled: string | boolean) {
    const graphStates = this.graph.get('states');
    let key = state;
    if (isString(enabled)) key = `${state}:${enabled}`;
    if (!graphStates[key]) graphStates[key] = [];
    if (enabled) graphStates[key].push(item);
    else graphStates[key] = graphStates[key].filter((itemInState) => itemInState !== item);
    this.graph.set('states', graphStates);
    this.graph.emit('graphstatechange', { states: graphStates });
  }

  /**
   * 批量更新 states，兼容 updateState，支持更新一个 state
   *
   * @param {Item} item
   * @param {(string | string[])} states
   * @param {boolean} enabled
   * @memberof State
   */
  public updateStates(item: Item, states: string | string[], enabled: string | boolean) {
    const graphStates = this.graph.get('states');
    const stateNames = isString(states) ? [states] : states;
    stateNames.forEach(stateName => {
      let key = stateName;
      if (!graphStates[key]) graphStates[key] = [];
      if (isString(enabled)) key = `${stateName}:${enabled}`;
      if (enabled) graphStates[key].push(item);
      else graphStates[key] = graphStates[key].filter((itemInState) => itemInState !== item);
    });
    this.graph.set('states', graphStates);
    this.graph.emit('graphstatechange', { states });
  }

  public destroy() {
    (this.graph as IAbstractGraph | null) = null;
    this.destroyed = true;
  }
}
