import { Node as GNode, PlainObject } from '@antv/graphlib';
import { AnimateAttr } from "./animate";
import { Encode, IItem, LabelBackground, ShapeAttrEncode, ShapesEncode } from "./item";

export type NodeLabelPosition = 'bottom' | 'center' | 'top' | 'left' | 'right';

/** Data in user input model. */
export interface NodeUserModelData extends PlainObject {
  parentId?: string;
}

/** Data in inner model. */
export interface NodeModelData extends NodeUserModelData {
  visible?: boolean;
  label?: string;
}


/** Data in display model. */
export interface NodeDisplayModelData extends NodeModelData {
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

/** User input model. */
export type NodeUserModel = GNode<NodeUserModelData>;

/** Inner node model, clone and transform from user data. */
export type NodeModel = GNode<NodeModelData>;

/** Displayed model, only for drawing and not received by users. */
export type NodeDisplayModel = GNode<NodeDisplayModelData>;

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

// TODO
export interface INode extends IItem {

}