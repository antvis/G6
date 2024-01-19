import {
  CircleStyleProps,
  EllipseStyleProps,
  HTMLStyleProps,
  ImageStyleProps,
  LineStyleProps,
  PathStyleProps,
  PolygonStyleProps,
  PolylineStyleProps,
  RectStyleProps,
  TextStyleProps,
} from '@antv/g';
import { CubeGeometryProps, PlaneGeometryProps, SphereGeometryProps } from '@antv/g-plugin-3d';
import { ComboOptions, EdgeOptions, NodeOptions } from '../spec/element';
import { IAnimates } from './animate';
import { ComboDisplayModel, ComboUserModel } from './combo';
import { EdgeDisplayModel, EdgeUserModel } from './edge';
import { NodeDisplayModel, NodeUserModel } from './node';

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
  HTMLStyleProps &
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
      [shapeAttr: string]: unknown | Encode<unknown>;
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
  | 'group'
  | 'html';

export type SHAPE_TYPE_3D = 'sphere' | 'cube' | 'plane';

export type ItemType = 'node' | 'edge' | 'combo';

export type ItemDisplayModel = NodeDisplayModel | EdgeDisplayModel | ComboDisplayModel | NodeOptions;

export type DisplayMapper = NodeOptions | EdgeOptions | ComboOptions;

export type State = string;

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

export interface LodLevel {
  zoomRange: [number, number];
  primary?: boolean;
}

export interface LodLevelRanges {
  [levelIdx: number]: [number, number];
}
