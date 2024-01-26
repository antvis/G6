import { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps } from '@antv/g';
import { deepMix } from '@antv/util';
import { BadgeStyleProps } from 'elements/shapes/badge';
import type { PrefixObject } from '../../types';
import { BaseShape, BaseShapeStyleProps } from '../shapes';
import { LabelStyleProps } from '../shapes/label';

export type CircleStyleProps = BaseShapeStyleProps &
  GCircleStyleProps &
  PrefixObject<LabelStyleProps, 'label'> &
  PrefixObject<GCircleStyleProps, 'halo'> &
  PrefixObject<BadgeStyleProps, 'badge'> &
  PrefixObject<GCircleStyleProps, 'anchor'>;

type ParsedCircleStyleProps = Required<CircleStyleProps>;

export type CircleOptions = DisplayObjectConfig<ParsedCircleStyleProps>;

/**
 * Design document: https://www.yuque.com/antv/g6/gl1iof1xpzg6ed98
 * - key
 * - label, background included
 * - halo
 * - icon
 * - badges
 * - anchors / ports
 */
export class Circle extends BaseShape<CircleStyleProps> {
  static defaultStyleProps: Partial<CircleStyleProps> = {};

  constructor(options) {
    super(deepMix({}, { style: Circle.defaultStyleProps }, options));
  }

  render() {}
}
