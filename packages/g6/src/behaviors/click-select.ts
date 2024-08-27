import { isFunction } from '@antv/util';
import { CanvasEvent, CommonEvent } from '../constants';
import { ELEMENT_TYPES } from '../constants/element';
import type { RuntimeContext } from '../runtime/types';
import type { Element, ElementType, ID, IPointerEvent, State } from '../types';
import { idOf } from '../utils/id';
import { getElementNthDegreeIds } from '../utils/relation';
import type { ShortcutKey } from '../utils/shortcut';
import { Shortcut } from '../utils/shortcut';
import { statesOf } from '../utils/state';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 点击元素交互配置项
 *
 * <en/> Click element behavior options
 */
export interface ClickSelectOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用动画
   *
   * <en/> Whether to enable animation
   * @defaultValue true
   */
  animation?: boolean;
  /**
   * <zh/> 是否启用点击元素的功能
   *
   * <en/> Whether to enable the function of clicking the element
   * @defaultValue true
   * @remarks
   * <zh/> 可以通过函数的方式动态控制是否启用，例如只有节点被选中时才启用。
   *
   * <en/> Whether to enable can be dynamically controlled by functions, such as only when nodes are selected.
   *
   * ```json
   * { enable: event => event.targetType === 'node'}
   * ```
   */
  enable?: boolean | ((event: IPointerEvent) => boolean);
  /**
   * <zh/> 是否允许多选
   *
   * <en/> Whether to allow multiple selection
   * @defaultValue false
   */
  multiple?: boolean;
  /**
   * <zh/> 按下该快捷键配合鼠标点击进行多选
   *
   * <en/> Press this shortcut key to apply multiple selection with mouse click
   * @defaultValue ['shift']
   */
  trigger?: ShortcutKey;
  /**
   * <zh/> 当元素被选中时应用的状态
   *
   * <en/> The state to be applied when an element is selected
   * @defaultValue 'selected'
   */
  state?: State;
  /**
   * <zh/> 当有元素选中时，其相邻 n 度关系的元素应用的状态。n 的值由属性 degree 控制，例如 degree 为 1 时表示直接相邻的元素
   *
   * <en/> The state to be applied to the neighboring elements within n degrees when an element is selected. The value of n is controlled by the degree property, for instance, a degree of 1 indicates direct neighbors
   * @defaultValue 'selected'
   */
  neighborState?: State;
  /**
   * <zh/> 当有元素被选中时，除了选中元素及其受影响的邻居元素外，其他所有元素应用的状态。
   *
   * <en/> The state to be applied to all unselected elements when some elements are selected, excluding the selected element and its affected neighbors
   */
  unselectedState?: State;
  /**
   * <zh/> 选中元素的度，即决定了影响范围
   *
   * <en/> The degree to determine the scope of influence
   * @defaultValue 0
   * @remarks
   * <zh/> 对于节点来说，`0` 表示只选中当前节点，`1` 表示选中当前节点及其直接相邻的节点和边，以此类推。
   *
   * <zh/> 对于边来说，`0` 表示只选中当前边，`1` 表示选中当前边及其直接相邻的节点，以此类推。
   *
   * <en/> For nodes, `0` means only the current node is selected, `1` means the current node and its directly adjacent nodes and edges are selected, etc.
   *
   * <en/> For edges, `0 `means only the current edge is selected,`1` means the current edge and its directly adjacent nodes are selected, etc.
   */
  degree?: number | ((event: IPointerEvent) => number);
  /**
   * <zh/> 点击元素时的回调
   *
   * <en/> Callback when the element is clicked
   * @param event - <zh/> 点击事件 | <en/> click event
   */
  onClick?: (event: IPointerEvent) => void;
}

/**
 * <zh/> 点击元素
 *
 * <en/> Click Element
 * @remarks
 * <zh/> 当鼠标点击元素时，可以激活元素的状态，例如选中节点或边。当 degree 设置为 `1` 时，点击节点会高亮当前节点及其直接相邻的节点和边。
 *
 * <en/> When the mouse clicks on an element, you can activate the state of the element, such as selecting nodes or edges. When the degree is 1, clicking on a node will highlight the current node and its directly adjacent nodes and edges.
 */
export class ClickSelect extends BaseBehavior<ClickSelectOptions> {
  private shortcut: Shortcut;

  static defaultOptions: Partial<ClickSelectOptions> = {
    animation: true,
    enable: true,
    multiple: false,
    trigger: ['shift'],
    state: 'selected',
    neighborState: 'selected',
    unselectedState: undefined,
    degree: 0,
  };

  constructor(context: RuntimeContext, options: ClickSelectOptions) {
    super(context, Object.assign({}, ClickSelect.defaultOptions, options));
    this.shortcut = new Shortcut(context.graph);
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();
    ELEMENT_TYPES.forEach((type) => {
      graph.on(`${type}:${CommonEvent.CLICK}`, this.onClickSelect);
    });
    graph.on(CanvasEvent.CLICK, this.onClickCanvas);
  }

  private onClickSelect = async (event: IPointerEvent<Element>) => {
    if (!this.validate(event)) return;
    await this.updateState(event);
    this.options.onClick?.(event);
  };

  private onClickCanvas = async (event: IPointerEvent) => {
    if (!this.validate(event)) return;
    await this.clearState();
    this.options.onClick?.(event);
  };

  private get isMultipleSelect() {
    const { multiple, trigger } = this.options;
    return multiple && this.shortcut.match(trigger);
  }

  private getNeighborIds(event: IPointerEvent<Element>) {
    const { target, targetType } = event;
    const { graph } = this.context;
    const { degree } = this.options;
    return getElementNthDegreeIds(
      graph,
      targetType as ElementType,
      target.id,
      typeof degree === 'function' ? degree(event) : degree,
    ).filter((id) => id !== target.id);
  }

  private async updateState(event: IPointerEvent<Element>) {
    const { state: selectState, unselectedState, neighborState, animation } = this.options;
    if (!selectState && !neighborState && !unselectedState) return;

    const { target } = event;
    const { graph } = this.context;

    const datum = graph.getElementData(target.id);

    const type = statesOf(datum).includes(selectState) ? 'unselect' : 'select';

    const states: Record<ID, State[]> = {};

    const isMultipleSelect = this.isMultipleSelect;

    const click = [target.id];
    const neighbor = this.getNeighborIds(event);

    if (!isMultipleSelect) {
      if (type === 'select') {
        Object.assign(states, this.getClearStates(!!unselectedState));
        const addState = (list: ID[], state: State) => {
          list.forEach((id) => {
            if (!states[id]) states[id] = graph.getElementState(id);
            states[id].push(state);
          });
        };
        addState(click, selectState);
        addState(neighbor, neighborState);
        if (unselectedState) {
          Object.keys(states).forEach((id) => {
            if (!click.includes(id) && !neighbor.includes(id)) states[id].push(unselectedState);
          });
        }
      } else Object.assign(states, this.getClearStates());
    } else {
      Object.assign(states, this.getDataStates());

      if (type === 'select') {
        const addState = (list: ID[], state: State) => {
          list.forEach((id) => {
            const dataStatesSet = new Set(graph.getElementState(id));
            dataStatesSet.add(state);
            dataStatesSet.delete(unselectedState);
            states[id] = Array.from(dataStatesSet);
          });
        };

        addState(click, selectState);
        addState(neighbor, neighborState);
        if (unselectedState) {
          Object.keys(states).forEach((id) => {
            const _states = states[id];
            if (
              !_states.includes(selectState) &&
              !_states.includes(neighborState) &&
              !_states.includes(unselectedState)
            ) {
              states[id].push(unselectedState);
            }
          });
        }
      } else {
        const targetState = states[target.id];
        states[target.id] = targetState.filter((s) => s !== selectState && s !== neighborState);
        if (!targetState.includes(unselectedState)) states[target.id].push(unselectedState);
        neighbor.forEach((id) => {
          states[id] = states[id].filter((s) => s !== neighborState);
          if (!states[id].includes(selectState)) states[id].push(unselectedState);
        });
      }
    }

    await graph.setElementState(states, animation);
  }

  private getDataStates() {
    const { graph } = this.context;
    const { nodes, edges, combos } = graph.getData();

    const states: Record<ID, State[]> = {};
    [...nodes, ...edges, ...combos].forEach((data) => {
      states[idOf(data)] = statesOf(data);
    });

    return states;
  }

  /**
   * <zh/> 获取需要清除的状态
   *
   * <en/> Get the states that need to be cleared
   * @param complete - <zh/> 是否返回所有状态 | <en/> Whether to return all states
   * @returns - <zh/> 需要清除的状态 | <en/> States that need to be cleared
   */
  private getClearStates(complete = false) {
    const { graph } = this.context;
    const { state, unselectedState, neighborState } = this.options;
    const statesToClear = new Set([state, unselectedState, neighborState]);
    const { nodes, edges, combos } = graph.getData();

    const states: Record<ID, State[]> = {};
    [...nodes, ...edges, ...combos].forEach((data) => {
      const datumStates = statesOf(data);
      const newStates = datumStates.filter((s) => !statesToClear.has(s));
      if (complete) states[idOf(data)] = newStates;
      else if (newStates.length !== datumStates.length) states[idOf(data)] = newStates;
    });

    return states;
  }

  private async clearState() {
    const { graph } = this.context;
    await graph.setElementState(this.getClearStates(), this.options.animation);
  }

  private validate(event: IPointerEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    const { graph } = this.context;

    ELEMENT_TYPES.forEach((type) => {
      graph.off(`${type}:${CommonEvent.CLICK}`, this.onClickSelect);
    });
    graph.off(CanvasEvent.CLICK, this.onClickCanvas);
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
