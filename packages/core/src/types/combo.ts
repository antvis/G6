import { AnimateAttr } from "./animate";
import { Padding } from "./common";
import { Encode, LabelBackground, ShapeAttrEncode, ShapesEncode } from "./item";
import { AnchorPoint } from "./node";

export type ComboLabelPosition = 'bottom' | 'top' | 'left' | 'left-top' | 'right' | 'ouside-top' | 'outside-left' | 'outside-right' | 'outside-bottom';

/** User input data. */
export interface ComboUserData {
  id: string;
  parentId?: string;
}

/** Inner combo data, clone and transform from user data. */
export interface ComboModel extends ComboUserData {
  visible?: boolean;
  label?: string;
}

/** Displayed data, only for drawing and not received by users. */
export interface ComboDisplayModel extends ComboModel {
  keyShape?: {
    [shapeAttr: string]: unknown;
    animate: AnimateAttr;
  };
  labelShape?: {
    position?: ComboLabelPosition;
    offsetX?: number;
    offsetY?: number;
    background?: LabelBackground;
    [shapeAttr: string]: unknown;
    animate: AnimateAttr;
  };
  iconShape?: {
    [shapeAttr: string]: unknown;
    animate: AnimateAttr;
  };
  otherShapes?: {
    [shapeName: string]: {
      [shapeAttr: string]: unknown;
      animate: AnimateAttr;
    }
  };
  anchorPoints?: AnchorPoint[];
  fixSize?: number | number[];
  padding?: Padding;
}


interface ComboLabelShapeAttrEncode extends ShapeAttrEncode { // TODO: extends Text shape attr, import from G
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