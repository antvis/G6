import { NodeDisplayModelData } from '../types/node';

/**
 * Default mapper to transform simple styles in inner data.
 */
export const DEFAULT_MAPPER = {
  node: (innerNodeModel) => {
    const { id, data } = innerNodeModel;
    const { color, label, icon, badges, keyShape } = data;
    const resultData: NodeDisplayModelData = {
      ...data,
      keyShape: { ...keyShape },
    };
    if (color) {
      resultData.keyShape.fill = color;
    }
    if (label) {
      resultData.labelShape = {
        text: label,
      };
    }
    if (icon) {
      resultData.iconShape = icon;
    }
    if (badges) {
      resultData.badgeShapes = badges;
    }
    return {
      id,
      data: resultData,
    };
  },
  edge: (innerEdgeModel) => {
    const { id, source, target, data } = innerEdgeModel;
    const { color, label, icon, badge, keyShape } = data;
    const resultData: NodeDisplayModelData = {
      ...data,
      keyShape: { ...keyShape },
    };
    if (color) {
      resultData.keyShape.stroke = color;
    }
    if (label) {
      resultData.labelShape = {
        text: label,
      };
    }
    if (icon) {
      resultData.iconShape = icon;
    }
    if (badge) {
      resultData.badgeShape = badge;
    }
    return {
      id,
      source,
      target,
      data: resultData,
    };
  },
  combo: (innerComboModel) => innerComboModel,
};
