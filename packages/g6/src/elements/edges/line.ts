import type { DisplayObjectConfig, LineStyleProps as GLineStyleProps } from '@antv/g';
import { Line as GLine, Group } from '@antv/g';
import { deepMix } from '@antv/util';
import { BaseShape } from '../shapes/base-shape';
import { BaseEdge, type BaseEdgeStyleProps } from './base-edge';

export type LineStyleProps = BaseEdgeStyleProps & GLineStyleProps;

type ParsedLineStyleProps = Required<LineStyleProps>;

export type LineOptions = DisplayObjectConfig<ParsedLineStyleProps>;

export class Line extends BaseShape<LineStyleProps> {
  static defaultStyleProps: Partial<BaseEdgeStyleProps> = {};

  constructor(options: LineOptions) {
    super(deepMix({}, { style: Line.defaultStyleProps }, options));
  }

  protected renderKeyShape(attributes: Required<LineStyleProps>): GLine {
    return new GLine({
      style: { ...attributes },
    });
  }

  public render(attributes: Required<LineStyleProps>, container: Group): void {
    const keyShape = this.renderKeyShape(attributes);
    this.upsert(
      'line',
      BaseEdge,
      {
        ...attributes,
        keyShape,
      },
      container,
    );
  }
}
