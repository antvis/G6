import { Edge as GEdge, PlainObject } from '@antv/graphlib';
import { AnimateAttr } from "./animate";
import { Encode, IItem, LabelBackground, ShapeAttrEncode, ShapesEncode, ShapeStyle } from "./item";


export interface EdgeUserModelData extends PlainObject { };
export interface EdgeModelData extends EdgeUserModelData {
  visible?: boolean;
  label?: string;
};

export interface EdgeLabelShapeStyle extends ShapeStyle {
  position?: EdgeLabelPosition;
  offsetX?: number;
  offsetY?: number;
  background?: LabelBackground;
  autoRotate?: boolean;
}
export interface EdgeDisplayModelData extends EdgeModelData {
  keyShape?: ShapeStyle;
  labelShape?: EdgeLabelShapeStyle;
  iconShape?: ShapeStyle;
  otherShapes?: {
    [shapeName: string]: ShapeStyle
  };
  sourceAnchor?: number;
  targetAnchor?: number;
};

/** User input data. */
export type EdgeUserModel = GEdge<EdgeUserModelData>;

/** Inner node data, clone and transform from user data. */
export type EdgeModel = GEdge<EdgeModelData>;

/** Displayed data, only for drawing and not received by users. */
export type EdgeDisplayModel = GEdge<EdgeDisplayModelData>;


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

// TODO
export interface IEdge extends IItem {

}