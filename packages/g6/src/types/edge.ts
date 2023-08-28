import { DisplayObject, PathStyleProps } from '@antv/g';
import { Edge as GEdge, PlainObject } from '@antv/graphlib';
import { IAnimates } from './animate';
import {
  Encode,
  IItem,
  ItemShapeStyles,
  LabelBackground,
  ShapeAttrEncode,
  ShapesEncode,
  ShapeStyle,
  LodStrategy,
} from './item';

export interface EdgeUserModelData extends PlainObject {
  /**
   * Anchor index to link to the source / target node.
   */
  sourceAnchor?: number;
  targetAnchor?: number;
  /**
   * Edge type, e.g. 'line-edge'.
   */
  type?: string;
  /**
   * Subject color for the keyShape and arrows.
   * More styles should be configured in edge mapper.
   */
  color?: string;
  /**
   * The text to show on the edge.
   * More styles should be configured in edge mapper.
   */
  label?: string;
  /**
   * Whether show the edge by default.
   */
  visible?: boolean;
  /**
   * The icon to show on the edge.
   * More styles should be configured in edge mapper.
   */
  icon?: {
    type: 'icon' | 'text';
    text?: string;
    img?: string;
  };
  /**
   * The badges to show on the edge.
   * More styles should be configured in edge mapper.
   */
  badge?: {
    type: 'icon' | 'text';
    text: string;
  };
}
export type EdgeModelData = EdgeUserModelData;

export interface EdgeShapeStyles extends ItemShapeStyles {
  keyShape?: ShapeStyle & {
    startArrow?: boolean | ArrowStyle;
    endArrow?: boolean | ArrowStyle;
  };
  labelShape?: ShapeStyle & {
    position?: 'start' | 'middle' | 'end';
    offsetX?: number;
    offsetY?: number;
    offsetZ?: number;
    autoRotate?: boolean;
    // if it is a string, means the percentage of the keyShape, number means pixel
    maxWidth?: string | number;
  };
  labelBackgroundShape?: ShapeStyle & {
    padding?: number | number[];
  };
  badgeShape?: ShapeStyle & {
    color?: string;
    textColor?: string;
  };
}

export type EdgeDisplayModelData = EdgeModelData &
  EdgeShapeStyles & { lodStrategy?: LodStrategy };

/** User input data. */
export type EdgeUserModel = GEdge<EdgeUserModelData>;

/** Inner node data, clone and transform from user data. */
export type EdgeModel = GEdge<EdgeModelData>;

/** Displayed data, only for drawing and not received by users. */
export type EdgeDisplayModel = GEdge<EdgeDisplayModelData>;

export type EdgeLabelPosition = 'start' | 'middle' | 'end';
interface EdgeLabelShapeAttrEncode extends ShapeAttrEncode {
  position?: EdgeLabelPosition | Encode<EdgeLabelPosition>;
  offsetX?: number | Encode<number>;
  offsetY?: number | Encode<number>;
  offsetZ?: number | Encode<number>;
  background?: LabelBackground | Encode<LabelBackground>;
  autoRotate?: boolean | Encode<boolean>;
}

export interface EdgeShapesEncode extends ShapesEncode {
  labelShape?: EdgeLabelShapeAttrEncode;
  labelBackgroundShape?: LabelBackground | Encode<LabelBackground>;
  badgeShape?: ShapeAttrEncode | Encode<ShapeStyle>;
}
export interface EdgeEncode extends EdgeShapesEncode {
  type?: string | Encode<string>;
  animates?: IAnimates;
}

export interface EdgeShapeMap {
  keyShape: DisplayObject;
  labelShape?: DisplayObject;
  iconShape?: DisplayObject;
  [otherShapeId: string]: DisplayObject;
}

// TODO
export type IEdge = IItem;

export type ArrowType =
  | 'triangle'
  | 'circle'
  | 'diamond'
  | 'rect'
  | 'vee'
  | 'triangle-rect'
  | 'simple';

export type ArrowStyle = PathStyleProps & {
  type: ArrowType;
  width: number;
  height: number;
  offset?: number;
};
