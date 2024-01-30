import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type CircleStyleProps = BaseNodeStyleProps<GCircleStyleProps>;

type CircleOptions = DisplayObjectConfig<CircleStyleProps>;

/**
 * Draw circle based on BaseNode, override drawKeyShape.
 */
export class Circle extends BaseNode<CircleStyleProps, GCircle> {
  static defaultStyleProps: Partial<CircleStyleProps> = {};

  constructor(options: CircleOptions) {
    super(options);
  }

  protected drawKeyShape(attributes: CircleStyleProps, container: Group): GCircle {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container) as GCircle;
  }

  connectedCallback() {}
}
