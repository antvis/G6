import type { CircleStyleProps, DisplayObjectConfig } from '@antv/g';
import { Circle } from '@antv/g';
import { deepMix } from '@antv/util';
import type { BaseElementStyleProps } from '../base';
import { BaseElement } from '../base';

interface SimpleNodeStyleProps extends BaseElementStyleProps, Omit<CircleStyleProps, 'cx' | 'cy' | 'r'> {
  x: number;
  y: number;
  size: number;
}

type SimpleNodeOptions = DisplayObjectConfig<SimpleNodeStyleProps>;

export class SimpleNode extends BaseElement<SimpleNodeStyleProps> {
  static defaultStyleProps: Partial<SimpleNodeStyleProps> = {
    size: 20,
  };

  constructor(options: SimpleNodeOptions) {
    super(deepMix({}, { style: SimpleNode.defaultStyleProps }, options));
  }

  render(attributes: SimpleNodeStyleProps) {
    const { size, keyShapeColor, ...rest } = this.getStyle(attributes);
    this.upsert(
      'keyShape',
      Circle,
      {
        r: size / 2,
        fill: keyShapeColor,
        ...rest,
      },
      this,
    );
  }
}
