import { NodeDisplayModelData } from 'types/node';

/**
 * Default mapper to transform simple styles in inner data.
 */
export const DEFAULT_MAPPER = {
  node: (innerNodeModel) => {
    const { id, data } = innerNodeModel;
    const { color, label, icon, badges, anchorPoints } = data;
    const resultData: NodeDisplayModelData = { ...data, keyShape: {} };
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
    if (anchorPoints) {
      resultData.anchorShapes = anchorPoints.map((point) => ({
        position: point,
      }));
    }
    return {
      id,
      data: resultData,
    };
  },
  edge: (innerEdgeModel) => {
    const { id, source, target, data } = innerEdgeModel;
    const { color, label, icon, badge } = data;
    const resultData: NodeDisplayModelData = { ...data, keyShape: {} };
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
