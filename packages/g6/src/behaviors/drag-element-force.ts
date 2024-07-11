import type { ID, IElementDragEvent, Point } from '../types';
import { idOf } from '../utils/id';
import { getLayoutProperty, invokeLayoutMethod } from '../utils/layout';
import { print } from '../utils/print';
import { add } from '../utils/vector';
import type { DragElementOptions } from './drag-element';
import { DragElement } from './drag-element';

/**
 * <zh/> 调用力导布局拖拽元素交互配置项
 *
 * <en/> Call d3-force layout to drag element behavior options
 */
export interface DragElementForceOptions extends Omit<DragElementOptions, 'animation' | 'dropEffect' | 'shadow'> {}

/**
 * <zh/> 调用力导布局拖拽元素的交互
 *
 * <en/> Call d3-force layout to drag element behavior
 * @remarks
 * <zh/> 只能在使用 d3-force 布局时使用该交互，在拖拽过程中会实时重新计算布局。
 *
 * <en/> This behavior can only be used with d3-force layout. The layout will be recalculated in real time during dragging.
 */
export class DragElementForce extends DragElement {
  private get forceLayoutInstance() {
    return this.context.layout!.getLayoutInstance().find((layout) => ['d3-force', 'd3-force-3d'].includes(layout?.id));
  }

  /**
   * Whether the behavior is enabled
   * @param event - The event object
   * @returns Is the behavior enabled
   * @internal
   */
  protected validate(event: IElementDragEvent): boolean {
    if (!this.context.layout) return false;

    // 未使用力导布局 / The force layout is not used
    if (!this.forceLayoutInstance) {
      print.warn('DragElementForce only works with d3-force or d3-force-3d layout');
      return false;
    }

    return super.validate(event);
  }

  /**
   * Move selected elements by offset
   * @param ids - The selected element IDs
   * @param offset - The offset to move
   * @internal
   */
  protected async moveElement(ids: ID[], offset: Point) {
    const layout = this.forceLayoutInstance;
    this.context.graph.getNodeData(ids).forEach((element, index) => {
      const { x = 0, y = 0 } = element.style || {};
      if (layout) invokeLayoutMethod(layout, 'setFixedPosition', ids[index], [...add([+x, +y], offset)]);
    });
  }

  /**
   * Triggered when the drag starts
   * @param event - The event object
   * @internal
   */
  protected onDragStart(event: IElementDragEvent) {
    this.enable = this.validate(event);
    if (!this.enable) return;

    this.target = this.getSelectedNodeIDs([event.target.id]);
    this.hideEdge();
    this.context.graph.frontElement(this.target);

    const layout = this.forceLayoutInstance;
    if (layout) getLayoutProperty(layout, 'simulation').alphaTarget(0.3).restart();

    this.context.graph.getNodeData(this.target).forEach((element) => {
      const { x = 0, y = 0 } = element.style || {};
      if (layout) invokeLayoutMethod(layout, 'setFixedPosition', idOf(element), [+x, +y]);
    });
  }

  /**
   * Triggered when dragging
   * @param event - The event object
   * @internal
   */
  protected onDrag(event: IElementDragEvent) {
    if (!this.enable) return;

    const delta = this.getDelta(event);
    this.moveElement(this.target, delta);
  }

  /**
   * Triggered when the drag ends
   * @internal
   */
  protected onDragEnd() {
    const layout = this.forceLayoutInstance;
    if (layout) getLayoutProperty(layout, 'simulation').alphaTarget(0);

    this.context.graph.getNodeData(this.target).forEach((element) => {
      if (layout) invokeLayoutMethod(layout, 'setFixedPosition', idOf(element), [null, null, null]);
    });
  }
}
