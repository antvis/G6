import { NodeDisplayModelData } from '../types/node';

/**
 * Default mapper to transform simple styles in inner data.
 */
export const DEFAULT_MAPPER = {
  node: (innerNodeModel) => {
    const { id, style = {}, data = {} } = innerNodeModel;
    const { color, label, icon, badges, keyShape } = style;
    const finalStyle: NodeDisplayModelData = {
      ...style,
      keyShape: { ...keyShape },
    };
    if (color) {
      finalStyle.keyShape.fill = color;
    }
    if (label) {
      finalStyle.labelShape = {
        text: label,
      };
    }
    if (icon) {
      finalStyle.iconShape = icon;
    }
    if (badges) {
      finalStyle.badgeShapes = badges;
    }
    return {
      id,
      style: finalStyle,
      data,
    };
  },
  edge: (innerEdgeModel) => {
    const { id, source, target, style = {}, data = {} } = innerEdgeModel;
    const { color, label, icon, badge, keyShape } = style;
    const finalStyle: NodeDisplayModelData = {
      ...data,
      keyShape: { ...keyShape },
    };
    if (color) {
      finalStyle.keyShape.stroke = color;
    }
    if (label) {
      finalStyle.labelShape = {
        text: label,
      };
    }
    if (icon) {
      finalStyle.iconShape = icon;
    }
    if (badge) {
      finalStyle.badgeShape = badge;
    }
    return {
      id,
      source,
      target,
      style: finalStyle,
      data,
    };
  },
  combo: (innerComboModel) => innerComboModel,
};
