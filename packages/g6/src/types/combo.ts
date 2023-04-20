import { Node as GNode, PlainObject } from '@antv/graphlib';
import { AnimateAttr } from './animate';
import { Padding } from './common';
import {
  Encode,
  IItem,
  LabelBackground,
  ShapeAttrEncode,
  ShapesEncode,
  ShapeStyle,
} from './item';
import { AnchorPoint } from './node';

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
}

export interface ComboLabelShapeStyle extends ShapeStyle {
  position?: ComboLabelPosition;
  offsetX?: number;
  offsetY?: number;
  background?: LabelBackground;
}

/** Displayed data, only for drawing and not received by users. */
export interface ComboDisplayModelData extends ComboModelData {
  keyShape?: ShapeStyle;
  labelShape?: ComboLabelShapeStyle;
  iconShape?: ShapeStyle;
  otherShapes?: {
    [shapeId: string]: ShapeStyle;
  };
  anchorPoints?: AnchorPoint[];
  fixSize?: number | number[];
  padding?: Padding;
}

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
  anchorPoints?: AnchorPoint[] | Encode<AnchorPoint[]>;
  fixSize?: number | number[] | Encode<number | number[]>;
  padding?: Padding | Encode<Padding>;
}
export interface ComboEncode extends ComboShapesEncode {
  type?: string | Encode<string>;
}

// TODO
export type ICombo = IItem;
