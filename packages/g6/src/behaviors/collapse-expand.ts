import type { ID } from '@antv/graphlib';
import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { IPointerEvent } from '../types';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

export interface CollapseExpandOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用动画
   *
   * <en/> Whether to enable animation
   */
  animation: boolean;
  /**
   * <zh/> 是否启用展开/收起功能
   *
   * <en/> Whether to enable the expand/collapse function
   */
  enable?: boolean | ((event: IPointerEvent) => boolean);
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

export class CollapseExpand extends BaseBehavior<CollapseExpandOptions> {
  static defaultOptions: Partial<CollapseExpandOptions> = {
    enable: true,
    animation: true,
  };

  constructor(context: RuntimeContext, options: CollapseExpandOptions) {
    super(context, Object.assign({}, CollapseExpand.defaultOptions, options));

    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    graph.on(`combo:${CommonEvent.DBLCLICK}`, this.onCollapseExpand);
  }

  private unbindEvents() {
    const { graph } = this.context;
    graph.off(`combo:${CommonEvent.DBLCLICK}`, this.onCollapseExpand);
  }

  private onCollapseExpand = async (event: IPointerEvent) => {
    if (!this.validate(event)) return;

    const id = event?.target?.id;
    const { model, graph } = this.context;
    const data = model.getComboData([id])[0];
    if (!data) return false;

    const { onCollapse, onExpand, animation } = this.options;
    const isCollapse = data.style?.collapsed;
    if (isCollapse) {
      await graph.expand(id, animation);
      onExpand?.(id);
    } else {
      await graph.collapse(id, animation);
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
