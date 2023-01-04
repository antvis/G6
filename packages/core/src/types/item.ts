import { AnimateAttr } from "./animate";

export interface Encode<T> {
  fields: string[],
  formatter: (values: unknown[]) => T;
}

export interface ShapeAttrEncode {
  [shapeAttr: string]: unknown | Encode<unknown>;
  animate: AnimateAttr | Encode<AnimateAttr>;
};

export interface LabelBackground {
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  radius?: number[] | number;
  padding?: number[] | number;
};

export interface ShapesEncode {
  keyShape?: ShapeAttrEncode;
  iconShape?: ShapeAttrEncode;
  otherShapes?: {
    [shapeName: string]: {
      [shapeAtrr: string]: unknown | Encode<unknown>;
      animate: AnimateAttr | Encode<AnimateAttr>;
    }
  };
}

export type ITEM_TYPE = 'node' | 'edge' | 'combo';