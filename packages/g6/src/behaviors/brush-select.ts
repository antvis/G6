import { Rect } from '@antv/g';
import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import { getRectPoints, isBBoxCenterInRect } from '../utils/behaviors/brush';
import { getAllElementState, transformEdgeState } from '../utils/behaviors/utils';
import { Shortcut } from '../utils/shortcut';
import { BaseBehavior } from './base-behavior';

import type { Graph } from '../runtime/graph';
import type { RuntimeContext } from '../runtime/types';
import type { NodeStyle } from '../spec/element/node';
import type { ElementType, ID, IPointerEvent, Point, Points, State } from '../types';
import type { ShortcutKey } from '../utils/shortcut';
import type { BaseBehaviorOptions } from './base-behavior';

const SHOW_RECT_ID = 'g6-brush-select-rect-id';

export type States = Record<ID, State | State[]>;

/**
 * <zh/> 框选配置项
 *
 * <en/> Brush select options
 */
export interface BrushSelectOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用框选功能
   *
   * <en/> Whether to enable Brush select element function.
   * @defaultValue true
   */
  enable?: boolean | ((event: IPointerEvent) => boolean);
  /**
   * <zh/> 可框选的元素类型
   *
   * <en/> Enable Elements type
   * @defaultValue ['node', 'combo', 'edge']
   */
  enableElements?: ElementType[];
  /**
   * <zh/> 是否启用动画
   *
   * <en/> Whether to enable animation.
   * @defaultValue false
   */
  animation?: boolean;
  /**
   * <zh/> 交互配置 按键拖拽 或 直接拖拽
   *
   * <en/> Trigger click or drag
   * @defaultValue ['drag']
   */
  trigger?: ShortcutKey;
  /**
   * <zh/> 框选选中模式
   * - union : 选中元素添加 state 状态
   * - intersect : 进一步筛选已经 state 开启的元素
   * - diff : 反转选中元素的 state 状态
   * - default : 选中元素添加 state 状态, 其他元素 state 关闭
   *
   * <en/> Box Select Select the mode
   * - union : Select element add state
   * - intersect : Further filter the elements that are already state enabled
   * - diff : Inverts the state of the selected element
   * - default : Check element state to turn on and other elements state to turn off
   * @defaultValue 'default'
   */
  mode?: 'union' | 'intersect' | 'diff' | 'default';
  /**
   * <zh/> 选中 state 状态
   *
   * <en/> Check state status
   * @defaultValue 'selected'
   */
  state?: State;
  /**
   * <zh/> 及时框选, 在框选模式为 default 时，才能使用
   *
  //  * TODO fixme
   * <en/> Timely screening
   * @defaultValue false
   */
  immediately?: boolean;
  /**
   * <zh/> 框选 框样式
   *
   * <en/> Timely screening
   */
  style?: NodeStyle;
  /**
   * <zh/> 框选元素状态回调
   *
   * <en/> Callback when brush select elements
   * @param states - <zh/> 选中的元素状态 | <en/> Selected element state
   * @returns <zh/> 元素状态 | <en/> Element state
   */
  onSelect?: (states: States) => States;
}

export const DEFAULT_STYLE = {
  lineWidth: 1,
  fill: '#EEF6FF',
  stroke: '#DDEEFE',
  fillOpacity: 0.4,
  zIndex: 2,
};

/**
 * <zh/> 框选一组元素
 *
 * <en/> Brush select elements
 */
export class BrushSelect<T extends BaseBehaviorOptions = BrushSelectOptions> extends BaseBehavior<T> {
  static defaultOptions: Partial<BrushSelectOptions> = {
    enable: true,
    trigger: ['drag'],
    immediately: false,
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
  public shortcut?: Shortcut;

  public selectElementFn: (graph: Graph, id: ID, points: Points) => boolean = isBBoxCenterInRect;

  constructor(context: RuntimeContext, options: T) {
    super(context, Object.assign({}, BrushSelect.defaultOptions, options));
    this.shortcut = new Shortcut(context.graph);
    if (options.type === 'lasso-select') return;
    this.bindEvents();
  }

  /**
   * <zh/> 指针按下
   *
   * <en/> pointer down
   * @param event - <zh/> 指针事件 | <en/> pointer event
   */
  public pointerDown = async (event: IPointerEvent) => {
    if (!this.validate(event) || !this.isKeydown() || this.startPoint) return;
    const { style, trigger } = this.options;
    const triggers = (Array.isArray(trigger) ? trigger : [trigger]) as string[];
    if (event.targetType !== 'canvas' && triggers.includes('drag')) return;
    const { canvas } = this.context;

    this.rectShape = new Rect({
      id: SHOW_RECT_ID,
      style: {
        ...BrushSelect.defaultOptions.style,
        fill: style.fill || DEFAULT_STYLE.fill,
        ...style,
        pointerEvents: 'none',
      },
    });

    canvas.appendChild(this.rectShape);

    this.startPoint = [event.canvas.x, event.canvas.y];
  };
  /**
   * <zh/> 指针移动
   *
   * <en/> pointer move
   * @param event - <zh/> 指针事件 | <en/> pointer event
   */
  public pointerMove = async (event: IPointerEvent) => {
    if (!this.startPoint) return;
    const { immediately, mode } = this.options;

    this.endPoint = [event.canvas.x, event.canvas.y];

    this.rectShape?.attr({
      x: Math.min(this.endPoint[0], this.startPoint[0]),
      y: Math.min(this.endPoint[1], this.startPoint[1]),
      width: Math.abs(this.endPoint[0] - this.startPoint[0]),
      height: Math.abs(this.endPoint[1] - this.startPoint[1]),
    });

    if (immediately && mode === 'default') {
      this.updateElementState(getRectPoints(this.startPoint, this.endPoint));
    }
  };
  /**
   * <zh/> 指针抬起
   *
   * <en/> pointer up
   * @param event - <zh/> 指针事件 | <en/> pointer event
   */
  public pointerUp = async (event: IPointerEvent) => {
    if (!this.startPoint) return;
    if (!this.endPoint) {
      await this.clearBrush();
      return;
    }

    const points = getRectPoints(this.startPoint, [event.canvas.x, event.canvas.y]);
    this.updateElementState(points);

    await this.clearBrush();
  };

  /**
   * <zh/> 清空框选
   *
   * <en/> clear brush
   * @remarks
   * <zh/> 点击画布时触发
   *
   * <en/> Triggered when clicking the canvas
   */
  public clearSelected = () => {
    if (this.endPoint) return;

    const { graph } = this.context;
    const selects = getAllElementState(graph, () => []);

    graph.setElementState(selects, this.options.animation);
  };

  /**
   * <zh/> 更新框选区域元素状态
   *
   * <en/> Update the state of the elements in the box selection area
   * @param points - <zh/> 形成框选区域的点的坐标 | <en/> The coordinates of the points forming the box selection area
   */
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

  /**
   * <zh/> 获取框选选中的元素 ids
   *
   * <en/> Get the ids of the elements selected by the box selection
   * @param graph - <zh/> 图实例 | <en/> Graph instance
   * @param points - <zh/> 形成框选区域的点的坐标 | <en/> The coordinates of the points forming the box selection area
   * @param itemTypes - <zh/> 框选元素类型 | <en/> The type of the elements selected by the box selection
   * @returns <zh/> 框选选中的元素 ids | <en/> The ids of the elements selected by the box selection
   */
  public getPointsSelectIds = (graph: Graph, points: Points, itemTypes: ElementType[]) => {
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
  public isKeydown() {
    const { trigger } = this.options;
    const keys = (Array.isArray(trigger) ? trigger : [trigger]) as string[];
    if (keys.length === 0 || keys.includes('drag')) return true;
    return this.shortcut?.match(keys);
  }

  /**
   * <zh/> 校验是否触发框选
   *
   * <en/> Validate whether to trigger the box selection
   * @param event - <zh/> 指针事件 | <en/> pointer event
   * @returns <zh/> 是否触发框选 | <en/> Whether to trigger the box selection
   */
  public validate(event: IPointerEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  /**
   * <zh/> 绑定事件
   *
   * <en/> Bind event
   */
  public bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    graph.on(CommonEvent.POINTER_DOWN, this.pointerDown);
    graph.on(CommonEvent.POINTER_MOVE, this.pointerMove);
    graph.on(CommonEvent.POINTER_UP, this.pointerUp);
    graph.on(`canvas:${CommonEvent.CLICK}`, this.clearSelected);
  }

  /**
   * <zh/> 取消绑定事件
   *
   * <en/> Unbind event
   */
  public unbindEvents() {
    const { graph } = this.context;

    graph.off(CommonEvent.POINTER_DOWN, this.pointerDown);
    graph.off(CommonEvent.POINTER_MOVE, this.pointerMove);
    graph.off(CommonEvent.POINTER_UP, this.pointerUp);
    graph.off(`canvas:${CommonEvent.CLICK}`, this.clearSelected);
  }

  /**
   * <zh/> 销毁
   *
   * <en/> Destroy
   */
  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
