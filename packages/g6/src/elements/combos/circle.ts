import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps } from '@antv/g';
import { Circle as GCircle, Group } from '@antv/g';
import { isEmpty } from '@antv/util';
import type { Position, STDSize } from '../../types';
import { getBBoxHeight, getBBoxWidth } from '../../utils/bbox';
import { getCircleCollapsedOrigin, getXYByCollapsedOrigin } from '../../utils/combo';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import type { BaseComboStyleProps, ParsedBaseComboStyleProps } from './base-combo';
import { BaseCombo } from './base-combo';

export type CircleComboStyleProps = BaseComboStyleProps<KeyStyleProps>;
type ParsedCircleComboStyleProps = ParsedBaseComboStyleProps<KeyStyleProps>;
type CircleComboOptions = DisplayObjectConfig<CircleComboStyleProps>;
type KeyStyleProps = GCircleStyleProps;

export class CircleCombo extends BaseCombo<CircleComboStyleProps> {
  constructor(options: CircleComboOptions) {
    super(options);
  }

  protected drawKeyShape(attributes: ParsedCircleComboStyleProps, container: Group): GCircle | undefined {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedCircleComboStyleProps): GCircleStyleProps {
    const { collapsed } = attributes;
    const keyStyle = super.getKeyStyle(attributes);
    const collapsedStyle = subStyleProps(keyStyle, 'collapsed');

    const [width] = this.getKeySize(attributes);
    return {
      ...keyStyle,
      ...(collapsed && collapsedStyle),
      r: width / 2,
    };
  }

  protected getCollapsedKeySize(attributes: ParsedCircleComboStyleProps): STDSize {
    const [collapsedWidth, collapsedHeight] = parseSize(attributes.collapsedSize);
    const collapsedR = Math.max(collapsedWidth, collapsedHeight) / 2;
    return [collapsedR * 2, collapsedR * 2, 0];
  }

  protected getExpandedKeySize(attributes: ParsedCircleComboStyleProps): STDSize {
    if (!isEmpty(attributes.size)) {
      const [expandedWidth, expandedHeight] = parseSize(attributes.size);
      const expandedR = Math.sqrt(expandedWidth ** 2 + expandedHeight ** 2) / 2;
      return [expandedR * 2, expandedR * 2, 0];
    }
    const contentBBox = this.getContentBBox(attributes);
    const width = getBBoxWidth(contentBBox);
    const height = getBBoxHeight(contentBBox);
    const expandedR = Math.sqrt(width ** 2 + height ** 2) / 2;
    return [expandedR * 2, expandedR * 2, 0];
  }

  protected getCollapsedOriginPosition(attributes: ParsedBaseComboStyleProps<KeyStyleProps>): Position {
    return getXYByCollapsedOrigin(
      attributes.collapsedOrigin,
      this.getContentBBox(attributes).center,
      this.getCollapsedKeySize(attributes),
      this.getExpandedKeySize(attributes),
      getCircleCollapsedOrigin,
    );
  }
}
