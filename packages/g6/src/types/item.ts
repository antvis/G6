import { ID } from '@antv/graphlib';
import {
  AABB,
  CircleStyleProps,
  RectStyleProps,
  EllipseStyleProps,
  PolygonStyleProps,
  LineStyleProps,
  PathStyleProps,
  PolylineStyleProps,
  TextStyleProps,
  ImageStyleProps,
} from '@antv/g';
import { IAnimates } from './animate';
import {
  ComboDisplayModel,
  ComboEncode,
  ComboModel,
  ComboModelData,
  ComboUserModel,
} from './combo';
import {
  EdgeDisplayModel,
  EdgeEncode,
  EdgeModel,
  EdgeModelData,
  EdgeUserModel,
} from './edge';
import {
  NodeDisplayModel,
  NodeEncode,
  NodeModel,
  NodeModelData,
  NodeUserModel,
} from './node';
import {
  CubeGeometryProps,
  PlaneGeometryProps,
  SphereGeometryProps,
  TorusGeometryProps,
} from '@antv/g-plugin-3d';

export type GShapeStyle = CircleStyleProps &
  RectStyleProps &
  EllipseStyleProps &
  PolygonStyleProps &
  LineStyleProps &
  PolylineStyleProps &
  TextStyleProps &
  ImageStyleProps &
  PathStyleProps &
  SphereGeometryProps &
  CubeGeometryProps &
  PlaneGeometryProps;

export type ShapeStyle = Partial<
  GShapeStyle & {
    animate?: AnimateAttr;
  }
>;
export interface Encode<T> {
  fields: string[];
  formatter: (values: NodeUserModel | EdgeUserModel | ComboUserModel) => T;
}

export interface ShapeAttrEncode {
  [shapeAttr: string]: unknown | Encode<unknown>;
  animates?: IAnimates | Encode<IAnimates>;
}

export interface LabelBackground {
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  radius?: number[] | number;
  padding?: number[] | number;
}

export interface ShapesEncode {
  keyShape?: ShapeAttrEncode | Encode<ShapeStyle>;
  iconShape?: ShapeAttrEncode | Encode<ShapeStyle>;
  otherShapes?: {
    [shapeId: string]: {
      [shapeAtrr: string]: unknown | Encode<unknown>;
      animates: IAnimates | Encode<IAnimates>;
    };
  };
}
export type SHAPE_TYPE =
  | 'rect'
  | 'circle'
  | 'ellipse'
  | 'polygon'
  | 'image'
  | 'polyline'
  | 'line'
  | 'path'
  | 'text';

export type SHAPE_TYPE_3D = 'sphere' | 'cube' | 'plane';

export type ITEM_TYPE = 'node' | 'edge' | 'combo';

export type ItemModelData = NodeModelData | EdgeModelData | ComboModelData;

export type ItemModel = NodeModel | EdgeModel | ComboModel;

export type ItemDisplayModel =
  | NodeDisplayModel
  | EdgeDisplayModel
  | ComboDisplayModel;

export type DisplayMapper =
  | ((model: ItemModel) => ItemDisplayModel)
  | NodeEncode
  | EdgeEncode
  | ComboEncode;

export type State = {
  name: string;
  value: boolean | string;
};

export enum BadgePosition {
  rightTop = 'rightTop',
  right = 'right',
  rightBottom = 'rightBottom',
  bottomRight = 'bottomRight',
  bottom = 'bottom',
  bottomLeft = 'bottomLeft',
  leftBottom = 'leftBottom',
  left = 'left',
  leftTop = 'leftTop',
  topLeft = 'topLeft',
  top = 'top',
  topRight = 'topRight',
}
export type IBadgePosition = `${BadgePosition}`;

/** Shape styles for an item. */
export type ItemShapeStyles = {
  // labelShape, labelBackgroundShape, badgeShapes,  overwrote by node / edge / combo
  // anchorShapes, overwrote by node / combo
  keyShape?: ShapeStyle;
  iconShape?: Partial<
    TextStyleProps &
      ImageStyleProps & {
        offsetX?: number;
        offsetY?: number;
      }
  >;
  haloShape?: ShapeStyle;
  animates?: IAnimates;
};

/**
 * Base item of node / edge / combo.
 */
export interface IItem {
  destroyed: boolean;
  /** Inner model. */
  model: ItemModel;
  // /** Display model, user will not touch it. */
  // displayModel: ItemDisplayModel;
  // /** The graphic group for item drawing. */
  // group: Group;
  // /** Visibility. */
  // visible: boolean;
  // /** The states on the item. */
  // states: {
  //   name: string,
  //   value: string | boolean
  // }[];
  // type: 'node' | 'edge' | 'combo';

  /** Gets the inner model.  */
  // getModel: () => ItemModel;
  /** Gets the id in model. */
  getID: () => ID;
  /** Gets the item's type. */
  getType: () => 'node' | 'edge' | 'combo';
  /**
   * Draws the shapes.
   * @internal
   * */
  draw: (
    displayModel: ItemDisplayModel,
    diffData?: { previous: ItemModelData; current: ItemModelData },
    diffState?: { previous: State[]; current: State[] },
  ) => void;
  /**
   * Updates the shapes.
   * @internal
   * */
  update: (
    model: ItemModel,
    diffData: { previous: ItemModelData; current: ItemModelData },
    isUpdate?: boolean,
  ) => void;
  /** Puts the item to the front in its graphic group. */
  toFront: () => void;
  /** Puts the item to the back in its graphic group. */
  toBack: () => void;
  /** Showsthe item. */
  show: () => void;
  /** Hides the item. */
  hide: () => void;
  /** Returns the visibility of the item. */
  isVisible: () => boolean;
  /** Sets a state value to the item. */
  setState: (state: string, value: string | boolean) => void;
  /** Returns the state if it is true/string. Returns false otherwise. */
  hasState: (state: string) => string | boolean;
  /** Get all the true or string states of the item. */
  getStates: () => {
    name: string;
    value: boolean | string;
  }[];
  /** Set all the state to false. */
  clearStates: (states?: string[]) => void;
  /** Get the rendering bounding box for the keyShape. */
  getKeyBBox(): AABB;
  /** Get the rendering bounding box for the whole item. */
  getBBox(): AABB;
  /** Destroy the item. */
  destroy: () => void;
}
