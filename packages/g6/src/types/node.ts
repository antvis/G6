import { DisplayObject, Point } from '@antv/g';
import { Node as GNode, PlainObject } from '@antv/graphlib';
import { IAnimates } from './animate';
import {
  BadgePosition,
  Encode,
  IBadgePosition,
  IItem,
  ItemShapeStyles,
  ShapeAttrEncode,
  ShapesEncode,
  ShapeStyle,
  LodStrategy,
} from './item';

export type NodeLabelPosition = 'bottom' | 'center' | 'top' | 'left' | 'right';

/** Data in user input model. */
export interface NodeUserModelData extends PlainObject {
  /**
   * Node position.
   */
  x?: number;
  y?: number;
  z?: number;
  /**
   * Node type, e.g. 'circle'.
   */
  type?: string;
  /**
   * Subject color for the keyShape and anchor points.
   * More styles should be configured in node mapper.
   */
  color?: string;
  /**
   * The text to show on the node.
   * More styles should be configured in node mapper.
   */
  label?: string;
  /**
   * Whether show the node by default.
   */
  visible?: boolean;
  /**
   * Reserved for combo.
   */
  parentId?: string;
  /**
   * The icon to show on the node.
   * More styles should be configured in node mapper.
   */
  icon?: {
    type: 'icon' | 'text';
    text?: string;
    img?: string;
  };
  /**
   * The ratio position of the keyShape for related edges linking into.
   * More styles should be configured in node mapper.
   */
  anchorPoints?: number[][];
  /**
   * The badges to show on the node.
   * More styles should be configured in node mapper.
   */
  badges?: {
    type: 'icon' | 'text';
    text: string;
    position: BadgePosition;
  }[];
  /**
   * Whether to prevent overlap with unassociated edges. Used to preempt position.
   * Defaults to false.
   * Only valid for polyline
   */
  preventEdgeOverlap?: boolean;
}

/** Data in inner model. Same format to the user data. */
export type NodeModelData = NodeUserModelData;

export interface NodeShapeStyles extends ItemShapeStyles {
  // keyShape, iconShape, haloShape are defined in ItemShapeStyles
  labelShape?: ShapeStyle & {
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    offsetX?: number;
    offsetY?: number;
    offsetZ?: number;
    // string means the percentage of the keyShape, number means pixel
    maxWidth?: string | number;
  };
  labelBackgroundShape?: ShapeStyle & {
    padding?: number | number[];
  };
  badgeShapes?: ShapeStyle & {
    // common badge styles
    color?: string;
    palette?: string[];
    textColor?: string;
    // individual styles and their position
    [key: number]: ShapeStyle & {
      position?: IBadgePosition;
      color?: string;
      textColor?: string;
    };
  };
  anchorShapes?: ShapeStyle & {
    // common badge styles
    color?: string;
    textColor?: string;
    size?: number;
    offsetX?: number;
    offsetY?: number;
    offsetZ?: number;
    // individual styles and their position
    [key: number]: ShapeStyle & {
      position?: BadgePosition;
      color?: string;
      textColor?: string;
      size?: number;
      offsetX?: number;
      offsetY?: number;
      offsetZ?: number;
    };
  };
}

/** Data in display model. */
export type NodeDisplayModelData = NodeModelData &
  NodeShapeStyles & { lodStrategy?: LodStrategy };

/** User input model. */
export type NodeUserModel = GNode<NodeUserModelData>;

/** Inner node model, clone and transform from user data. */
export type NodeModel = GNode<NodeModelData>;

/** Displayed model, only for drawing and not received by users. */
export type NodeDisplayModel = GNode<NodeDisplayModelData>;

interface NodeLabelShapeAttrEncode extends ShapeAttrEncode {
  // TODO: extends Text shape attr, import from G
  position?: NodeLabelPosition | Encode<NodeLabelPosition>;
  offsetX?: number | Encode<number>;
  offsetY?: number | Encode<number>;
  offsetZ?: number | Encode<number>;
}
export interface NodeShapesEncode extends ShapesEncode {
  labelShape?: NodeLabelShapeAttrEncode | Encode<ShapeStyle>;
  labelBackgroundShape?: ShapeAttrEncode[] | Encode<ShapeStyle[]>;
  anchorShapes?: ShapeAttrEncode[] | Encode<ShapeStyle[]>;
  badgeShapes?: ShapeAttrEncode[] | Encode<ShapeStyle[]>;
}
export interface NodeEncode extends NodeShapesEncode {
  type?: string | Encode<string>;
  animates?: IAnimates;
}

export interface NodeShapeMap {
  keyShape: DisplayObject;
  labelShape?: DisplayObject;
  iconShape?: DisplayObject;

  // TODO other badge shapes
  [otherShapeId: string]: DisplayObject;
}

// TODO
export type INode = IItem;
