import { AnimateAttr } from "./animate";
import { Encode, LabelBackground, ShapeAttrEncode, ShapesEncode } from "./item";


/** User input data. */
export interface EdgeUserData {
  id: string,
  source: string,
  target: string,
}

/** Inner node data, clone and transform from user data. */
export interface EdgeModel extends EdgeUserData {
  visible?: boolean;
  label?: string;
}

/** Displayed data, only for drawing and not received by users. */
export interface EdgeDisplayModel extends EdgeModel {
  keyShape?: {
    [shapeAttr: string]: unknown;
    animate: AnimateAttr;
  };
  labelShape?: {
    position?: EdgeLabelPosition;
    offsetX?: number;
    offsetY?: number;
    background?: LabelBackground;
    autoRotate?: boolean;
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
  sourceAnchor?: number;
  targetAnchor?: number;
}


export type EdgeLabelPosition = 'start' | 'middle' | 'end';
interface EdgeLabelShapeAttrEncode extends ShapeAttrEncode {
  position?: EdgeLabelPosition | Encode<EdgeLabelPosition>;
  offsetX: number | Encode<number>;
  offsetY?: number | Encode<number>;
  background?: LabelBackground | Encode<LabelBackground>;
  autoRotate?: boolean | Encode<boolean>;
}

export interface EdgeShapesEncode extends ShapesEncode {
  labelShape?: EdgeLabelShapeAttrEncode;
  sourceAnchor?: number;
  targetAnchor?: number;
}
export interface EdgeEncode extends EdgeShapesEncode {
  type?: string | Encode<string>;
}
