import { AnimateAttr } from "./animate";
import { Encode, LabelBackground, ShapeAttrEncode, ShapesEncode } from "./item";

export type NodeLabelPosition = 'bottom' | 'center' | 'top' | 'left' | 'right';

/** User input data. */
export interface NodeUserData {
  id: string;
  parentId?: string;
}

/** Inner node data, clone and transform from user data. */
export interface NodeModel extends NodeUserData {
  visible?: boolean;
  label?: string;
}

/** Displayed data, only for drawing and not received by users. */
export interface NodeDisplayModel extends NodeModel {
  keyShape?: {
    [shapeAttr: string]: unknown;
    animate: AnimateAttr;
  };
  labelShape?: {
    position?: NodeLabelPosition;
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
  anchorPoints?: AnchorPoint[]
}

/** Anchor points, for linking edges and drawing circles. */
export interface AnchorPoint {
  position?: [number, number]; // range from 0 to 1
  show?: boolean;
  [shapeAttr: string]: unknown;
  animate: AnimateAttr;
}

interface NodeLabelShapeAttrEncode extends ShapeAttrEncode { // TODO: extends Text shape attr, import from G
  position?: NodeLabelPosition | Encode<NodeLabelPosition>;
  offsetX?: number | Encode<number>;
  offsetY?: number | Encode<number>;
  background?: LabelBackground | Encode<LabelBackground>;
}
export interface NodeShapesEncode extends ShapesEncode {
  labelShape?: NodeLabelShapeAttrEncode;
  anchorPoints?: AnchorPoint[] | Encode<AnchorPoint[]>
}
export interface NodeEncode extends NodeShapesEncode {
  type?: string | Encode<string>;
}