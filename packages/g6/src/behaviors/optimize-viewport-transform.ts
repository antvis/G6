import type { BaseStyleProps, DisplayObject } from '@antv/g';
import { debounce, isFunction } from '@antv/util';
import { GraphEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { ElementType } from '../types';
import type { IViewportEvent } from '../types/event';
import { setVisibility } from '../utils/visibility';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 画布优化交互配置项
 *
 * <en/> Canvas optimization behavior options
 */
export interface OptimizeViewportTransformOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用画布优化功能
   *
   * <en/> Whether to enable canvas optimization function
   * @defaultValue true
   */
  enable?: boolean | ((event: IViewportEvent) => boolean);
  /**
   * <zh/> 指定固定显示的图形元素。应用此交互后，在画布操作过程中，除了通过该属性指定的图形外，其余图形将被隐藏，从而提升渲染性能。默认情况下，节点始终可见，而其他图形元素在操作画布过程中会自动隐藏
   * - 可以通过指定要显示的图形元素的 classname 数组来配置
   * - 也可以通过回调函数动态判断是否显示
   *
   * <en/> Specify the graphic elements that are always displayed. After applying this behavior, during the canvas operation, except for the graphics specified by this property, the rest of the graphics will be hidden to improve rendering performance. By default, nodes are always visible, while other graphic elements are automatically hidden during canvas operations
   * - Specify the classname array of the graphic elements to be displayed
   * - You can also use a callback function to dynamically determine whether to display
   */
  shapes?:
    | { node?: string[]; edge?: string[]; combo?: string[] }
    | ((type: ElementType, shape: DisplayObject) => boolean);
  /**
   * <zh/> 设置防抖时间
   *
   * <en/> Set debounce time
   * @defaultValue 200
   */
  debounce?: number;
}

/**
 * <zh/> 操作画布过程中隐藏元素
 *
 * <en/> Hide elements during canvas operations (dragging, zooming, scrolling)
 */
export class OptimizeViewportTransform extends BaseBehavior<OptimizeViewportTransformOptions> {
  static defaultOptions: Partial<OptimizeViewportTransformOptions> = {
    enable: true,
    debounce: 200,
    shapes: (type: ElementType) => type === 'node',
  };

  private hiddenShapes: DisplayObject[] = [];

  private isVisible: boolean = true;

  constructor(context: RuntimeContext, options: OptimizeViewportTransformOptions) {
    super(context, Object.assign({}, OptimizeViewportTransform.defaultOptions, options));
    this.bindEvents();
  }

  private setElementsVisibility = (
    elements: DisplayObject[],
    visibility: BaseStyleProps['visibility'],
    filter?: (shape: DisplayObject) => boolean,
  ) => {
    elements.filter(Boolean).forEach((element) => {
      if (visibility === 'hidden' && !element.isVisible()) {
        this.hiddenShapes.push(element);
      } else if (visibility === 'visible' && this.hiddenShapes.includes(element)) {
        this.hiddenShapes.splice(this.hiddenShapes.indexOf(element), 1);
      } else {
        setVisibility(element, visibility, false, filter);
      }
    });
  };

  private filterShapes = (type: ElementType, filter: OptimizeViewportTransformOptions['shapes']) => {
    if (isFunction(filter)) return (shape: DisplayObject) => !filter(type, shape);
    const excludedClassnames = filter?.[type];
    return (shape: DisplayObject) => {
      if (!shape.className) return true;
      return !!excludedClassnames?.includes(shape.className);
    };
  };

  private hideShapes = (event: IViewportEvent) => {
    if (!this.validate(event) || !this.isVisible) return;

    const { element } = this.context;
    const { shapes = {} } = this.options;
    this.setElementsVisibility(element!.getNodes(), 'hidden', this.filterShapes('node', shapes));
    this.setElementsVisibility(element!.getEdges(), 'hidden', this.filterShapes('edge', shapes));
    this.setElementsVisibility(element!.getCombos(), 'hidden', this.filterShapes('combo', shapes));
    this.isVisible = false;
  };

  private showShapes = debounce((event: IViewportEvent) => {
    if (!this.validate(event) || this.isVisible) return;

    const { element } = this.context;
    this.setElementsVisibility(element!.getNodes(), 'visible');
    this.setElementsVisibility(element!.getEdges(), 'visible');
    this.setElementsVisibility(element!.getCombos(), 'visible');
    this.isVisible = true;
  }, this.options.debounce);

  private bindEvents() {
    const { graph } = this.context;

    graph.on(GraphEvent.BEFORE_TRANSFORM, this.hideShapes);
    graph.on(GraphEvent.AFTER_TRANSFORM, this.showShapes);
  }

  private unbindEvents() {
    const { graph } = this.context;

    graph.off(GraphEvent.BEFORE_TRANSFORM, this.hideShapes);
    graph.off(GraphEvent.AFTER_TRANSFORM, this.showShapes);
  }

  private validate(event: IViewportEvent) {
    if (this.destroyed) return false;

    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
