import { Padding } from "./common";
import { Encode, LabelBackground, ShapeAttrEncode, ShapesEncode } from "./item";

export type ComboLabelPosition = 'bottom' | 'top' | 'left' | 'left-top' | 'right' | 'ouside-top' | 'outside-left' | 'outside-right' | 'outside-bottom';

/** user input data */
export interface ComboUserData {
  id: string;
  parentId?: string;
}

/** inner combo data, clone and transform from user data */
export interface ComboModel extends ComboUserData {
  visible?: boolean;
  label?: string;
}

/** displayed data, only for drawing and not received by users */
export interface ComboDisplayModel extends ComboModel {
  keyShape?: {
    [shapeAttr: string]: unknown;
  };
  labelShape?: {
    position?: ComboLabelPosition;
    offsetX?: number;
    offsetY?: number;
    background?: LabelBackground;
    [shapeAttr: string]: unknown;
  };
  iconShape?: {
    [shapeAttr: string]: unknown;
  };
  otherShapes?: {
    [shapeName: string]: {
      [shapeAttr: string]: unknown;
    }
  };
  anchorPoints?: AnchorPoint[];
  fixSize?: number | number[];
  padding?: Padding;
}

/** anchor points, for linking edges and drawing circles */
export interface AnchorPoint {
  position?: [number, number]; // range from 0 to 1
  show?: boolean;
  [shapeAttr: string]: unknown;
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