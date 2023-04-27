import { Node as GNode, PlainObject } from '@antv/graphlib';
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
} from './item';

export type ComboLabelPosition =
  | 'bottom'
  | 'top'
  | 'left'
  | 'left-top'
  | 'right'
  | 'ouside-top'
  | 'outside-left'
  | 'outside-right'
  | 'outside-bottom';

/** User input data. */
export interface ComboUserModelData extends PlainObject {
  id: string;
  parentId?: string;
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
  };
  labelBackgroundShape?: ShapeStyle & {
    padding?: number | number[];
  };
  // common badge styles
  badgeShapes?: ShapeStyle & {
    color?: string;
    textColor?: string;
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
    // individual styles and their position
    [key: number]: ShapeStyle & {
      position?: BadgePosition;
      color?: string;
      textColor?: string;
      size?: number;
      offsetX?: number;
      offsetY?: number;
    };
  };
}

/** Displayed data, only for drawing and not received by users. */
export type ComboDisplayModelData = ComboModelData & ComboShapeStyles;

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

// TODO
export type ICombo = IItem;
