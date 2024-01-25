import { DisplayObjectConfig } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Graph } from '../../runtime/graph';
import type { BaseShapeStyleProps } from '../../shape/base';
import { BaseShape } from '../../shape/base';

export interface BaseElementStyleProps extends BaseShapeStyleProps {
  /** <zh/> 图实例 | <en/> Graph instance */
  graph: Graph;
  /** <zh/> 主图形颜色 | <en/> Keyshape color */
  keyShapeColor?: string;
}

export type BaseElementOptions = DisplayObjectConfig<BaseElementStyleProps>;

export abstract class BaseElement<T extends BaseElementStyleProps> extends BaseShape<T> {
  constructor(options: DisplayObjectConfig<T>) {
    super(deepMix({}, options));
  }

  /**
   * <zh/> 获取样式
   *
   * <en/> get style
   * @param attributes - <zh/> 属性 | <en/> attributes
   * @returns <zh/> 样式 | <en/> style
   * @description
   * <zh/> 用于子元素获取样式，会从元素样式中剔除影响子元素的属性以及上下文属性
   *
   * <en/> Used by child elements to get styles, will remove the properties that affect the child elements and the context properties from the element styles
   */
  protected getStyle(attributes = this.attributes) {
    const { x, y, class: className, transform, transformOrigin, graph, ...restAttrs } = attributes;

    return restAttrs;
  }
}
