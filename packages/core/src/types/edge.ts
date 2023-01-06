import { Edge as IEdge, PlainObject } from '@antv/graphlib';
import { AnimateAttr } from "./animate";
import { Encode, LabelBackground, ShapeAttrEncode, ShapesEncode } from "./item";


export interface EdgeUserModelData extends PlainObject { };
export interface EdgeModelData extends EdgeUserModelData {
  visible?: boolean;
  label?: string;
};
export interface EdgeDisplayModelData extends EdgeModelData {
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
};

/** User input data. */
export type EdgeUserModel = IEdge<EdgeUserModelData>;

/** Inner node data, clone and transform from user data. */
export type EdgeModel = IEdge<EdgeModelData>;

/** Displayed data, only for drawing and not received by users. */
export type EdgeDisplayModel = IEdge<EdgeDisplayModelData>;


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
