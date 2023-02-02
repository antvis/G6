import { Group } from "@antv/g";
import { AnimateAttr } from "./animate";
import { ComboDisplayModel, ComboModel } from "./combo";
import { EdgeDisplayModel, EdgeModel } from "./edge";
import { NodeDisplayModel, NodeModel } from "./node";

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

export type ItemModel = NodeModel | EdgeModel | ComboModel;

export type ItemDisplayModel = NodeDisplayModel | EdgeDisplayModel | ComboDisplayModel;

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
  getModel: () => ItemModel;
  /** Gets the id in model. */
  getID: () => string | number;
  /** Gets the item's type. */
  getType: () => 'node' | 'edge' | 'combo';
  /**
   * Draws the shapes.
   * @internal
   * */
  draw: () => void;
  /**
   * Updates the shapes.
   * @internal
   * */
  update: (model: ItemModel) => void;
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
  hasState: (state: string) => { name: string, value: boolean | string } | false;
  /** Get all the true or string states of the item. */
  getStates: () => {
    name: string,
    value: boolean | string
  }[];
  /** Set all the state to false. */
  clearStates: (states?: string[]) => void;
  /** Destroy the item. */
  destroy: () => void;
}