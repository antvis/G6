import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import { BaseBehavior } from './base-behavior';
import { getAllElementState, getPosition, isBBoxCenterInRect, transformEdgeState } from './utils';

import type { ID } from '@antv/graphlib';
import type { Graph } from '../runtime/graph';
import type { RuntimeContext } from '../runtime/types';
import type { NodeStyle } from '../spec/element/node';
import type { IPointerEvent, Point, State, Vector2 } from '../types';
import type { BaseBehaviorOptions } from './base-behavior';

const SHOW_RECT_ID = 'g6-brush-select-rect-id';

const ALLOWED_TRIGGERS = ['shift', 'alt', 'ctrl', 'drag', 'meta'];

type ElementTypes = Array<'node' | 'edge' | 'combo'>;

type Trigger = (typeof ALLOWED_TRIGGERS)[number];

type SELECT_MODE = 'union' | 'intersect' | 'diff' | 'latest';

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
   * union : 选中元素 state 开启
   * intersect : 进一步筛选已经 state 开启的元素
   * diff : 反转选中元素的 state 状态
   * latest : 选中元素 state 开启, 其他元素 state 关闭
   *
   * <en/> Box Select Select the mode.
   * union : Select element state to open.
   * intersect : Further filter the elements that are already state enabled.
   * diff : Inverts the state of the selected element.
   * latest : Check element state to turn on and other elements state to turn off.
   */
  selectSetMode?: SELECT_MODE;
  /**
   * <zh/> 选中 state 状态
   *
   * <en/> Check state status.
   */
  selectedState?: 'selected' | 'active'; // TODO: Enum
  /**
   * <zh/> 及时框选, 在框选模式为 latest 时，才能使用
   *
   * <en/> Timely screening.
   */
  isTimely?: boolean;
  /**
   * <zh/> 框选 框样式
   *
   * <en/> Timely screening.
   */
  brushStyle?: NodeStyle;
  /**
   * <zh/> 框选元素状态回调。
   *
   * <en/> Callback when brush select elements.
   */
  onSelect?: (states: States) => States;
}

export class BrushSelect extends BaseBehavior<BrushSelectOptions> {
  static defaultOptions: Partial<BrushSelectOptions> = {
    enable: true,
    trigger: 'drag',
    isTimely: false,
    selectedState: 'selected',
    selectSetMode: 'latest',
    animation: false,
    enableElements: ['node', 'combo', 'edge'],
    brushStyle: {
      size: 0,
      type: 'rect',
      color: 'red',
      fillOpacity: 0.1,
      lineWidth: 1,
      pointerEvents: 'none',
    },
  };

  public startPoint: Point | null = null;
  public endPoint: Point | null = null;

  constructor(context: RuntimeContext, options: BrushSelectOptions) {
    super(context, Object.assign({}, BrushSelect.defaultOptions, options));
    this.bindEvents();
  }

  public update(options: Partial<BrushSelectOptions>): void {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    graph.on(CommonEvent.POINTER_DOWN, this.pointerDown);
    graph.on(CommonEvent.POINTER_MOVE, this.pointerMove);
    graph.on(CommonEvent.POINTER_UP, this.pointerUp);
    graph.on(`canvas:${CommonEvent.CLICK}`, this.clearSelected);
  }

  private pointerDown = async (event: IPointerEvent) => {
    if (!this.validate(event) || !this.isKeydown(event) || this.startPoint) return;
    const { brushStyle, trigger } = this.options;
    if (event.targetType !== 'canvas' && trigger === 'drag') return;

    const { graph } = this.context;

    graph.addNodeData([
      {
        id: SHOW_RECT_ID,
        style: {
          ...BrushSelect.defaultOptions.brushStyle,
          ...brushStyle,
        },
      },
    ]);

    this.startPoint = [event.canvas.x, event.canvas.y];
  };

  private pointerMove = async (event: IPointerEvent) => {
    if (!this.startPoint) return;
    const { isTimely, selectSetMode } = this.options;
    const { graph, element } = this.context;

    this.endPoint = [event.canvas.x, event.canvas.y];

    const size = [
      Math.abs(this.endPoint[0] - this.startPoint[0]),
      Math.abs(this.endPoint[1] - this.startPoint[1]),
    ] as Vector2;

    graph.updateNodeData([
      {
        id: SHOW_RECT_ID,
        style: {
          label: false,
          size,
          x: Math.min(this.endPoint[0], this.startPoint[0]) + size[0] / 2,
          y: Math.min(this.endPoint[1], this.startPoint[1]) + size[1] / 2,
        },
      },
    ]);

    if (isTimely && selectSetMode === 'latest') {
      this.brushSelect(event);
    }
    await element?.draw({ animation: false, silence: true });
  };

  private pointerUp = async (event: IPointerEvent) => {
    if (!this.startPoint) return;
    if (!this.endPoint) {
      await this.clearBrush();
      return;
    }

    this.brushSelect(event);

    await this.clearBrush();
  };

  private brushSelect = (event: IPointerEvent) => {
    const { graph } = this.context;
    const { enableElements, selectedState, selectSetMode, onSelect } = this.options;

    const points = [this.startPoint, [event.canvas.x, event.canvas.y]] as Point[];
    // 框选选中的 ids
    const rectSelectIds = this.getRectSelectIds(graph, points, enableElements);

    // state mode 框选逻辑
    let stateChangeFn = (id: ID, state: string[]): string[] => (rectSelectIds.includes(id) ? [selectedState] : []);

    switch (selectSetMode) {
      case 'union':
        stateChangeFn = (id: ID, oldState: string[]) => (rectSelectIds.includes(id) ? [selectedState] : oldState);
        break;
      case 'diff':
        stateChangeFn = (id: ID, oldState: string[]) => {
          if (rectSelectIds.includes(id)) {
            return oldState.includes(selectedState) ? [] : [selectedState];
          }
          return oldState;
        };
        break;
      case 'intersect':
        stateChangeFn = (id: ID, oldState: string[]) => {
          if (rectSelectIds.includes(id)) {
            return oldState.includes(selectedState) ? [selectedState] : [];
          }
          return oldState;
        };
        break;
    }

    let states = getAllElementState(graph, stateChangeFn);
    if (enableElements.includes('edge')) {
      transformEdgeState(graph, states, selectedState);
    }
    if (isFunction(onSelect)) {
      states = onSelect(states);
    }
    graph.setElementState(states, this.options.animation);
  };

  // 当前按键是否和 trigger 配置一致
  private isKeydown(event: IPointerEvent) {
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

  private clearBrush = async () => {
    const { graph, element } = this.context;

    graph.removeNodeData([SHOW_RECT_ID]);

    await element?.draw({ animation: false, silence: true });

    this.startPoint = null;
    this.endPoint = null;
  };

  private clearSelected = () => {
    if (this.endPoint) return;

    const { graph } = this.context;
    const selects = getAllElementState(graph, () => []);

    graph.setElementState(selects, this.options.animation);
  };

  private getRectSelectIds = (graph: Graph, points: Point[], itemTypes: ElementTypes) => {
    const position = getPosition(points);
    const selectedNodeIds: ID[] = [];
    const selectedComboIds: ID[] = [];
    const selectedEdgeIds: ID[] = [];

    if (itemTypes.includes('node')) {
      graph.getNodeData().forEach((node) => {
        const { id } = node;
        if (
          id !== SHOW_RECT_ID &&
          graph.getElementVisibility(id) !== 'hidden' && // hidden node is not selectable
          isBBoxCenterInRect(graph, id, position)
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
          isBBoxCenterInRect(graph, id, position)
        ) {
          selectedComboIds.push(id);
        }
      });
    }

    return [...selectedNodeIds, ...selectedEdgeIds, ...selectedComboIds];
  };

  private validate(event: IPointerEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
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
