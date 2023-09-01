import { Node as GNode, PlainObject } from '@antv/graphlib';
import { ImageStyleProps, TextStyleProps } from '@antv/gui/lib/shapes';
import { IAnimates } from './animate';
import { Padding } from './common';
import {
  BadgePosition,
  Encode,
  IItem,
  ItemShapeStyles,
  LabelBackground,
  ShapeAttrEncode,
  ShapesEncode,
  ShapeStyle,
  LodStrategy,
} from './item';
import { NodeShapeMap, NodeUserModelData } from './node';

export type ComboLabelPosition =
  | 'bottom'
  | 'center'
  | 'top'
  | 'left'
  | 'left-top'
  | 'right'
  | 'outside-top'
  | 'outside-left'
  | 'outside-right'
  | 'outside-bottom';

/** User input data. Combo data has no position info, which is always depends on children's combined bounds. */
export interface ComboUserModelData extends PlainObject {
  /**
   * Combo type, e.g. 'circle-combo'.
   */
  type?: string;
  /**
   * Subject color for the keyShape and anchor points.
   * More styles should be configured in node mapper.
   */
  color?: string;
  /**
   * The text to show on the combo.
   * More styles should be configured in combo mapper.
   */
  label?: string;
  /**
   * Whether show the combo by default.
   */
  visible?: boolean;
  /**
   * Reserved for combo.
   */
  parentId?: string;
  /**
   * The icon to show on the combo.
   * More styles should be configured in combo mapper.
   */
  icon?: {
    type: 'icon' | 'text';
    text?: string;
    img?: string;
  };
  /**
   * The ratio position of the keyShape for related edges linking into.
   * More styles should be configured in combo mapper.
   */
  anchorPoints?: number[][];
}

/** Inner combo data, clone and transform from user data. */
export interface ComboModelData extends ComboUserModelData {
  visible?: boolean;
  label?: string;
  anchorPoints?: number[][];
  fixSize?: number | number[];
  padding?: Padding;
}

export interface ComboShapeStyles extends ItemShapeStyles {
  keyShape?: ShapeStyle & {
    padding?: number | number[];
  };
  labelShape?: ShapeStyle & {
    position?: ComboLabelPosition;
    offsetX?: number;
    offsetY?: number;
    offsetZ?: number;
    // string means the percentage of the keyShape, number means pixel
    maxWidth?: string | number;
  };
  labelBackgroundShape?: ShapeStyle & {
    padding?: number | number[];
  };
  // common badge styles
  badgeShapes?: ShapeStyle & {
    color?: string;
    textColor?: string;
    palette?: string[];
    // individual styles and their position
    [key: number]: ShapeStyle & {
      position?: BadgePosition;
      color?: string;
      textColor?: string;
    };
  };
  // common badge styles
  anchorShapes?: ShapeStyle & {
    color?: string;
    textColor?: string;
    size?: number;
    offsetX?: number;
    offsetY?: number;
    offsetZ?: number;
    // individual styles and their position
    [key: number]: ShapeStyle & {
      position?: BadgePosition;
      color?: string;
      textColor?: string;
      size?: number;
      offsetX?: number;
      offsetY?: number;
      offsetZ?: number;
    };
  };
  iconShape?: Partial<
    TextStyleProps &
      ImageStyleProps &
      ShapeStyle & {
        offsetX?: number;
        offsetY?: number;
        lod?: number;
        contentType?: 'auto' | 'childCount';
      }
  >;
}

/** Displayed data, only for drawing and not received by users. */
export type ComboDisplayModelData = ComboModelData &
  ComboShapeStyles & {
    lodStrategy?: LodStrategy;
    x?: number;
    y?: number;
    z?: number;
  };

/** User input model. */
export type ComboUserModel = GNode<ComboUserModelData>;

/** Inner node model, clone and transform from user data. */
export type ComboModel = GNode<ComboModelData>;

/** Displayed model, only for drawing and not received by users. */
export type ComboDisplayModel = GNode<ComboDisplayModelData>;

interface ComboLabelShapeAttrEncode extends ShapeAttrEncode {
  // TODO: extends Text shape attr, import from G
  position?: ComboLabelPosition | Encode<ComboLabelPosition>;
  offsetX?: number | Encode<number>;
  offsetY?: number | Encode<number>;
  offsetZ?: number | Encode<number>;
  background?: LabelBackground | Encode<LabelBackground>;
}
export interface ComboShapesEncode extends ShapesEncode {
  labelShape?: ComboLabelShapeAttrEncode;
  anchorPoints?: number[][] | Encode<number[][]>;
  fixSize?: number | number[] | Encode<number | number[]>;
  padding?: Padding | Encode<Padding>;
}
export interface ComboEncode extends ComboShapesEncode {
  type?: string | Encode<string>;
  animates?: IAnimates;
}

export type ComboShapeMap = NodeShapeMap;

// TODO
export type ICombo = IItem;
