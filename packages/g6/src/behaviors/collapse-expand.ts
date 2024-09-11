import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { ID, IPointerEvent, NodeLikeData } from '../types';
import { isCollapsed } from '../utils/collapsibility';
import { isElement } from '../utils/element';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 展开/收起元素交互配置项
 *
 * <en/> Collapse/Expand combo behavior options
 */
export interface CollapseExpandOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用动画
   *
   * <en/> Whether to enable animation
   * @defaultValue true
   */
  animation?: boolean;
  /**
   * <zh/> 是否启用展开/收起功能
   *
   * <en/> Whether to enable the expand/collapse function
   * @defaultValue true
   */
  enable?: boolean | ((event: IPointerEvent) => boolean);
  /**
   * <zh/> 触发方式
   *
   * <en/> Trigger method
   * @defaultValue 'dblclick'
   */
  trigger?: CommonEvent.CLICK | CommonEvent.DBLCLICK;
  /**
   * <zh/> 完成收起时的回调
   *
   * <en/> Callback when collapse is completed
   */
  onCollapse?: (id: ID) => void;
  /**
   * <zh/> 完成展开时的回调
   *
   * <en/> Callback when expand is completed
   */
  onExpand?: (id: ID) => void;
}

/**
 * <zh/> 展开/收起元素交互
 *
 * <en/> Collapse/Expand Element behavior
 * @remarks
 * <zh/> 通过操作展开/收起元素。
 *
 * <en/> Expand/collapse elements by operation.
 */
export class CollapseExpand extends BaseBehavior<CollapseExpandOptions> {
  static defaultOptions: Partial<CollapseExpandOptions> = {
    enable: true,
    animation: true,
    trigger: CommonEvent.DBLCLICK,
  };

  constructor(context: RuntimeContext, options: CollapseExpandOptions) {
    super(context, Object.assign({}, CollapseExpand.defaultOptions, options));

    this.bindEvents();
  }

  public update(options: Partial<CollapseExpandOptions>) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    const { trigger } = this.options;
    graph.on(`node:${trigger}`, this.onCollapseExpand);
    graph.on(`combo:${trigger}`, this.onCollapseExpand);
  }

  private unbindEvents() {
    const { graph } = this.context;
    const { trigger } = this.options;
    graph.off(`node:${trigger}`, this.onCollapseExpand);
    graph.off(`combo:${trigger}`, this.onCollapseExpand);
  }

  private onCollapseExpand = async (event: IPointerEvent) => {
    if (!this.validate(event)) return;
    const { target } = event;
    if (!isElement(target)) return;

    const id = target.id;
    const { model, graph } = this.context;
    const data = model.getElementDataById(id) as NodeLikeData;
    if (!data) return false;

    const { onCollapse, onExpand, animation } = this.options;
    if (isCollapsed(data)) {
      await graph.expandElement(id, animation);
      onExpand?.(id);
    } else {
      await graph.collapseElement(id, animation);
      onCollapse?.(id);
    }
  };

  private validate(event: IPointerEvent): boolean {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  public destroy(): void {
    this.unbindEvents();
    super.destroy();
  }
}
