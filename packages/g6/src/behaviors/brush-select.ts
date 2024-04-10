import { Rect } from '@antv/g';
import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import { isBBoxCenterInRect } from '../utils/behaviors/brush';
import { getAllElementState, transformEdgeState } from '../utils/behaviors/utils';
import { BaseBehavior } from './base-behavior';

import type { ID } from '@antv/graphlib';
import type { Graph } from '../runtime/graph';
import type { RuntimeContext } from '../runtime/types';
import type { NodeStyle } from '../spec/element/node';
import type { IPointerEvent, Point, Points, State } from '../types';
import type { BaseBehaviorOptions } from './base-behavior';

const SHOW_RECT_ID = 'g6-brush-select-rect-id';

const ALLOWED_TRIGGERS = ['shift', 'alt', 'ctrl', 'drag', 'meta'];

type ElementTypes = Array<'node' | 'edge' | 'combo'>;

type Trigger = (typeof ALLOWED_TRIGGERS)[number];

type SELECT_MODE = 'union' | 'intersect' | 'diff' | 'default';

export type States = Record<ID, State | State[]>;

export interface BrushSelectOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用框选功能
   *
   * <en/> Whether to enable Brush select element function.
   */
  enable?: boolean | ((event: IPointerEvent) => boolean);
  /**
   * <zh/> 可框选的元素类型
   *
   * <en/> Enable Elements type.
   */
  enableElements?: ElementTypes;
  /**
   * <zh/> 是否启用动画
   *
   * <en/> Whether to enable animation.
   */
  animation?: boolean;
  /**
   * <zh/> 交互配置 按键拖拽 或 直接拖拽
   *
   * <en/> Trigger click or drag.
   */
  trigger?: Trigger;
  /**
   * <zh/> 框选选中模式
   * union : 选中元素添加 state 状态
   * intersect : 进一步筛选已经 state 开启的元素
   * diff : 反转选中元素的 state 状态
   * default : 选中元素添加 state 状态, 其他元素 state 关闭
   *
   * <en/> Box Select Select the mode.
   * union : Select element add state.
   * intersect : Further filter the elements that are already state enabled.
   * diff : Inverts the state of the selected element.
   * default : Check element state to turn on and other elements state to turn off.
   */
  mode?: SELECT_MODE;
  /**
   * <zh/> 选中 state 状态
   *
   * <en/> Check state status.
   */
  state?: 'selected' | 'active'; // TODO: Enum
  /**
   * <zh/> 及时框选, 在框选模式为 default 时，才能使用
   *
   * <en/> Timely screening.
   */
  isTimely?: boolean;
  /**
   * <zh/> 框选 框样式
   *
   * <en/> Timely screening.
   */
  style?: NodeStyle;
  /**
   * <zh/> 框选元素状态回调。
   *
   * <en/> Callback when brush select elements.
   */
  onSelect?: (states: States) => States;
}

export const DEFAULT_STYLE = {
  lineWidth: 1,
  color: '#EEF6FF',
  stroke: '#DDEEFE',
  fillOpacity: 0.4,
  zIndex: 2,
};

export class BrushSelect<T extends BaseBehaviorOptions = BrushSelectOptions> extends BaseBehavior<T> {
  static defaultOptions: Partial<BrushSelectOptions> = {
    enable: true,
    trigger: 'drag',
    isTimely: false,
    state: 'selected',
    mode: 'default',
    animation: false,
    enableElements: ['node', 'combo', 'edge'],
    style: {
      size: 0,
      type: 'rect',
      ...DEFAULT_STYLE,
      pointerEvents: 'none',
    },
  };

  private startPoint?: Point;
  private endPoint?: Point;
  private rectShape?: Rect;

  public selectElementFn: (graph: Graph, id: ID, points: Points) => boolean = isBBoxCenterInRect;

  constructor(context: RuntimeContext, options: T) {
    super(context, Object.assign({}, BrushSelect.defaultOptions, options));
    if (options.type === 'lasso-select') return;
    this.bindEvents();
  }

  public pointerDown = async (event: IPointerEvent) => {
    if (!this.validate(event) || !this.isKeydown(event) || this.startPoint) return;
    const { style, trigger } = this.options;
    if (event.targetType !== 'canvas' && trigger === 'drag') return;
    const { canvas } = this.context;

    this.rectShape = new Rect({
      id: SHOW_RECT_ID,
      style: {
        ...BrushSelect.defaultOptions.style,
        fill: style.color || DEFAULT_STYLE.color,
        ...style,
        pointerEvents: 'none',
      },
    });

    canvas.appendChild(this.rectShape);

    this.startPoint = [event.canvas.x, event.canvas.y];
  };

  public pointerMove = async (event: IPointerEvent) => {
    if (!this.startPoint) return;
    const { isTimely, mode } = this.options;

    this.endPoint = [event.canvas.x, event.canvas.y];

    this.rectShape?.attr({
      x: Math.min(this.endPoint[0], this.startPoint[0]),
      y: Math.min(this.endPoint[1], this.startPoint[1]),
      width: Math.abs(this.endPoint[0] - this.startPoint[0]),
      height: Math.abs(this.endPoint[1] - this.startPoint[1]),
    });

    if (isTimely && mode === 'default') {
      this.updateElementState([this.startPoint, this.endPoint]);
    }
  };

  public pointerUp = async (event: IPointerEvent) => {
    if (!this.startPoint) return;
    if (!this.endPoint) {
      await this.clearBrush();
      return;
    }

    const points = [this.startPoint, [event.canvas.x, event.canvas.y]] as Points;
    this.updateElementState(points);

    await this.clearBrush();
  };

  public clearSelected = () => {
    if (this.endPoint) return;

    const { graph } = this.context;
    const selects = getAllElementState(graph, () => []);

    graph.setElementState(selects, this.options.animation);
  };

  public updateElementState = (points: Points) => {
    const { graph } = this.context;
    const { enableElements, state, mode, onSelect } = this.options;

    // 框选选中的 ids
    const rectSelectIds = this.getPointsSelectIds(graph, points, enableElements);

    // state mode 框选逻辑
    let stateChangeFn = (id: ID, oldState: string[]): string[] => (rectSelectIds.includes(id) ? [state] : []);

    switch (mode) {
      case 'union':
        stateChangeFn = (id: ID, oldState: string[]) => (rectSelectIds.includes(id) ? [state] : oldState);
        break;
      case 'diff':
        stateChangeFn = (id: ID, oldState: string[]) => {
          if (rectSelectIds.includes(id)) {
            return oldState.includes(state) ? [] : [state];
          }
          return oldState;
        };
        break;
      case 'intersect':
        stateChangeFn = (id: ID, oldState: string[]) => {
          if (rectSelectIds.includes(id)) {
            return oldState.includes(state) ? [state] : [];
          }
          return oldState;
        };
        break;
    }

    let states = getAllElementState(graph, stateChangeFn);
    if (enableElements.includes('edge')) {
      transformEdgeState(graph, states, state);
    }
    if (isFunction(onSelect)) {
      states = onSelect(states);
    }
    graph.setElementState(states, this.options.animation);
  };

  private clearBrush = async () => {
    this.rectShape?.remove();
    this.rectShape = undefined;
    this.startPoint = undefined;
    this.endPoint = undefined;
  };

  public getPointsSelectIds = (graph: Graph, points: Points, itemTypes: ElementTypes) => {
    const selectedNodeIds: ID[] = [];
    const selectedComboIds: ID[] = [];

    if (itemTypes.includes('node')) {
      graph.getNodeData().forEach((node) => {
        const { id } = node;
        if (
          graph.getElementVisibility(id) !== 'hidden' && // hidden node is not selectable
          this.selectElementFn(graph, id, points)
        ) {
          selectedNodeIds.push(id);
        }
      });
    }

    if (itemTypes.includes('combo')) {
      graph.getComboData().forEach((combo) => {
        const { id } = combo;
        if (
          graph.getElementVisibility(id) !== 'hidden' && // hidden combo is not selectable
          this.selectElementFn(graph, id, points)
        ) {
          selectedComboIds.push(id);
        }
      });
    }

    return [...selectedNodeIds, ...selectedComboIds];
  };

  // 当前按键是否和 trigger 配置一致
  public isKeydown(event: IPointerEvent) {
    const trigger = this.options.trigger;
    const keyMap: Record<Trigger, boolean> = {
      drag: true,
      shift: event.shiftKey,
      ctrl: event.ctrlKey,
      alt: event.altKey,
      meta: event.metaKey,
    };
    return keyMap[trigger];
  }

  public validate(event: IPointerEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  public bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    graph.on(CommonEvent.POINTER_DOWN, this.pointerDown);
    graph.on(CommonEvent.POINTER_MOVE, this.pointerMove);
    graph.on(CommonEvent.POINTER_UP, this.pointerUp);
    graph.on(`canvas:${CommonEvent.CLICK}`, this.clearSelected);
  }

  public unbindEvents() {
    const { graph } = this.context;

    graph.off(CommonEvent.POINTER_DOWN, this.pointerDown);
    graph.off(CommonEvent.POINTER_MOVE, this.pointerMove);
    graph.off(CommonEvent.POINTER_UP, this.pointerUp);
    graph.off(`canvas:${CommonEvent.CLICK}`, this.clearSelected);
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
