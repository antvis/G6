import { DisplayObject } from '@antv/g';
import { Node as GNode, ID, PlainObject } from '@antv/graphlib';
import { BaseNode } from '../stdlib/item/node/base';
import { BaseNode3D } from '../stdlib/item/node/base3d';
import { IAnimates } from './animate';
import {
  BadgePosition,
  Encode,
  IBadgePosition,
  IItem,
  ItemShapeStyles,
  LodLevel,
  ShapeAttrEncode,
  ShapeStyle,
  ShapesEncode,
} from './item';

export type NodeLabelPosition = 'bottom' | 'center' | 'top' | 'left' | 'right';

/** Data in user input model. */
export interface NodeUserModelData extends PlainObject {
  /**
   * The x-coordinate of node.
   */
  x?: number;
  /**
   * The y-coordinate of node.
   */
  y?: number;
  /**
   * The z-coordinate of node.
   */
  z?: number;
  /**
   * The type of node, e.g. `circle-node`.
   */
  type?: string;
  /**
   * The subject color of the node's keyShape and anchor points.
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
   * The id of parent combo.
   */
  parentId?: ID;
  /**
   * Whether to be a root at when used as a tree.
   */
  isRoot?: boolean;
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
   * The ratio position of the keyShape for related edges linking into. e.g. `[[0,0.5],[1,0.5]]`
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
   * Whether to prevent overlap with unassociated edges.
   * - Used to preempt position.
   * - Defaults to false.
   * - Only valid for polyline
   */
  preventPolylineEdgeOverlap?: boolean;
}

/** Data in inner model. Same format to the user data. */
export type NodeModelData = NodeUserModelData;

export interface NodeShapeStyles extends ItemShapeStyles {
  // keyShape, iconShape, haloShape are defined in ItemShapeStyles
  /**
   * Style of the text to show on the node.
   */
  labelShape?: ShapeStyle & {
    /**
     * Position of the text to show on the node.
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    /**
     * The x-axis offset of the text relative to the current position
     */
    offsetX?: number;
    /**
     * The y-axis offset of the text relative to the current position
     */
    offsetY?: number;
    /**
     * The z-axis offset of the text relative to the current position
     */
    offsetZ?: number;
    /**
     * The max width of the text
     * string means the percentage of the keyShape, number means pixel
     */
    maxWidth?: string | number;
    /**
     * The clockwise rotation Angle, used in radians
     */
    angle?: number;
  };
  /**
   * The background style of the label
   */
  labelBackgroundShape?: ShapeStyle & {
    padding?: number | number[];
  };
  /**
   * Style of the badges to show on the node.
   */
  badgeShapes?: ShapeStyle & {
    /**
     * Background color of the badge.
     */
    color?: string;
    /**
     * Background color of the badge.
     */
    palette?: string[];
    /**
     * Color of the text in badge.
     */
    textColor?: string;
    // individual styles and their position
    [key: number]: ShapeStyle & {
      position?: IBadgePosition;
      color?: string;
      textColor?: string;
    };
  };
  anchorShapes?: ShapeStyle & {
    // individual styles and their position
    [key: number]: ShapeStyle & {
      position?: 'top' | 'left' | 'bottom' | 'right' | [number, number];
    };
  };
}

/** Data in display model. */
export type NodeDisplayModelData = NodeModelData &
  NodeShapeStyles & { lodLevels?: LodLevel[] };

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
  lodLevels?: LodLevel[];
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

export interface IAnchorPositionMap {
  [key: string]: [number, number];
}

export interface NodeRegistry {
  [key: string]: typeof BaseNode | typeof BaseNode3D;
}
