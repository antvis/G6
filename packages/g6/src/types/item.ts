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
  Group,
  DisplayObject,
  IAnimation,
  Shape,
} from '@antv/g';
import {
  CubeGeometryProps,
  PlaneGeometryProps,
  SphereGeometryProps,
  TorusGeometryProps,
} from '@antv/g-plugin-3d';
import { AnimateCfg, IAnimates } from './animate';
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
  EdgeShapeMap,
  EdgeUserModel,
} from './edge';
import {
  NodeDisplayModel,
  NodeEncode,
  NodeModel,
  NodeModelData,
  NodeShapeMap,
  NodeUserModel,
} from './node';
import { ComboStyleSet, EdgeStyleSet, NodeStyleSet } from './theme';

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
  PlaneGeometryProps & {
    interactive?: boolean;
  };

export type ClipCfg = {
  type: SHAPE_TYPE;
  show: boolean;
} & CircleStyleProps &
  RectStyleProps &
  EllipseStyleProps;

export type ShapeStyle = Partial<
  GShapeStyle & {
    animates?: IAnimates;
    lod?: number | 'auto';
    visible?: boolean;
  } & {
    clipCfg?: ClipCfg;
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
  | 'text'
  | 'group';

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
  value: boolean | string | number;
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
      ImageStyleProps &
      ShapeStyle & {
        offsetX?: number;
        offsetY?: number;
        lod?: number;
      }
  >;
  haloShape?: ShapeStyle;
  group?: ShapeStyle;
  otherShapes?: {
    [shapeId: string]: ShapeStyle;
  };
  animates?: IAnimates;
};

export interface LodStrategy {
  levels: {
    zoomRange: [number, number];
    primary?: boolean;
  }[];
  animateCfg: AnimateCfg;
}

export interface LodStrategyObj {
  levels: {
    [levelIdx: number]: [number, number];
  };
  animateCfg: AnimateCfg;
}

/**
 * Base item of node / edge / combo.
 */
export interface IItem {
  destroyed: boolean;
  /** Inner model. */
  model: ItemModel;
  /** Display model, user will not touch it. */
  displayModel: ItemDisplayModel;
  /** The style mapper configured at graph with field name 'node' / 'edge' / 'combo'. */
  mapper: DisplayMapper;
  /** The state sstyle mapper configured at traph with field name 'nodeState' / 'edgeState' / 'comboState'. */
  stateMapper: {
    [stateName: string]: DisplayMapper;
  };
  /** The graphic group for item drawing. */
  group: Group;
  /** The keyShape of the item. */
  keyShape: DisplayObject;
  /** render extension for this item. */
  renderExt;
  /** Visibility. */
  visible: boolean;
  /** The states on the item. */
  states: {
    name: string;
    value: string | boolean;
  }[];
  /** The map caches the shapes of the item. The key is the shape id, the value is the g shape. */
  shapeMap: NodeShapeMap | EdgeShapeMap;
  afterDrawShapeMap: Object;
  /** Item's type. Set to different value in implements. */
  type: ITEM_TYPE;
  /** Render extensions where could the renderExt be selected from according to the type. */
  renderExtensions: any;
  /** Cache the animation instances to stop at next lifecycle. */
  animations: IAnimation[];
  /** Theme styles to response the state changes. */
  themeStyles: {
    default?: ItemShapeStyles;
    [stateName: string]: ItemShapeStyles;
  };
  /** The zoom strategy to show and hide shapes according to their lod. */
  lodStrategy: LodStrategyObj;
  /** Last zoom ratio. */
  zoom: number;
  /** Cache the chaging states which are not consomed by draw  */
  changedStates: string[];
  /** The listener for the animations frames. */
  onframe: Function;

  /** Gets the inner model.  */
  // getModel: () => ItemModel;
  /** Gets the id in model. */
  getID: () => ID;
  /** Gets the item's type. */
  getType: () => ITEM_TYPE;
  /** Initiate the item. */
  init: (props) => void;
  /**
   * Draws the shapes.
   * @internal
   * */
  draw: (
    displayModel: ItemDisplayModel,
    diffData?: { previous: ItemModelData; current: ItemModelData },
    diffState?: { previous: State[]; current: State[] },
    animate?: boolean,
    onfinish?: Function,
  ) => void;
  /**
   * Updates the shapes.
   * @internal
   * */
  update: (
    model: ItemModel,
    diffData: { previous: ItemModelData; current: ItemModelData },
    isReplace?: boolean,
    itemTheme?: {
      styles: NodeStyleSet | EdgeStyleSet | ComboStyleSet;
      lodStrategy: LodStrategyObj;
    },
    onlyMove?: boolean,
    animate?: boolean,
    onfinish?: Function,
  ) => void;

  /**
   * Update the group's position, e.g. node, combo.
   * @param displayModel
   * @param diffData
   * @param onfinish
   * @returns
   */
  updatePosition: (
    displayModel: ItemDisplayModel,
    diffData?: { previous: ItemModelData; current: ItemModelData },
    animate?: boolean,
    onfinish?: Function,
  ) => void;

  /**
   * Maps (mapper will be function, value, or encode format) model to displayModel and find out the shapes to be update for incremental updating.
   * @param model inner model
   * @param diffData changes from graphCore changed event
   * @param isReplace whether replace the whole data or partial update
   * @returns
   */
  getDisplayModelAndChanges: (
    innerModel: ItemModel,
    diffData?: { previous: ItemModelData; current: ItemModelData },
    isReplace?: boolean,
  ) => {
    model: ItemDisplayModel;
    typeChange?: boolean;
  };
  /** Show the item. */
  show: (animate: boolean) => void;
  /** Hides the item. */
  hide: (animate: boolean) => void;
  /** Returns the visibility of the item. */
  isVisible: () => boolean;
  /** Puts the item to the front in its graphic group. */
  toFront: () => void;
  /** Puts the item to the back in its graphic group. */
  toBack: () => void;
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
  getKeyBBox: () => AABB;
  /** Get the local bounding box for the keyShape. */
  getLocalKeyBBox: () => AABB;
  /** Get the rendering bounding box for the whole item. */
  getBBox: () => AABB;
  /** Stop all the animations on the item. */
  stopAnimations: () => void;
  /** Animations' frame listemer. */
  animateFrameListener: Function;
  /** Call render extension's onZoom to response the graph zooming. */
  updateZoom: (zoom: number) => void;
  /** Destroy the item. */
  destroy: () => void;
}
