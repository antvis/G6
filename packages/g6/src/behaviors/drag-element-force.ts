import type { Element, ID, IDragEvent, Point } from '../types';
import { idOf } from '../utils/id';
import { getLayoutProperty, invokeLayoutMethod } from '../utils/layout';
import { add } from '../utils/vector';
import type { DragElementOptions } from './drag-element';
import { DragElement } from './drag-element';

export interface DragElementForceOptions extends Omit<DragElementOptions, 'animation' | 'dropEffect' | 'shadow'> {}

export class DragElementForce extends DragElement {
  private get forceLayoutInstance() {
    return this.context.layout!.getLayoutInstance().find((layout) => ['d3-force', 'd3-force-3d'].includes(layout?.id));
  }

  protected validate(event: IDragEvent<Element>): boolean {
    if (!this.context.layout) return false;

    // 未使用力导布局 / The force layout is not used
    if (!this.forceLayoutInstance) {
      console.warn('DragElementForce only works with d3-force or d3-force-3d layout');
      return false;
    }

    return super.validate(event);
  }

  protected async moveElement(ids: ID[], offset: Point) {
    const layout = this.forceLayoutInstance;
    this.context.graph.getNodeData(ids).forEach((element, index) => {
      const { x = 0, y = 0 } = element.style || {};
      if (layout) invokeLayoutMethod(layout, 'setFixedPosition', ids[index], [...add([+x, +y], offset)]);
    });
  }

  protected onDragStart(event: IDragEvent<Element>) {
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

  protected onDrag(event: IDragEvent<Element>) {
    if (!this.enable) return;

    const delta = this.getDelta(event);
    this.moveElement(this.target, delta);
  }

  protected onDragEnd() {
    const layout = this.forceLayoutInstance;
    if (layout) getLayoutProperty(layout, 'simulation').alphaTarget(0);

    this.context.graph.getNodeData(this.target).forEach((element) => {
      if (layout) invokeLayoutMethod(layout, 'setFixedPosition', idOf(element), [null, null, null]);
    });
  }
}
