import { DisplayObject } from "@antv/g";
import { NodeDisplayModel } from "../../../types";
import { Point } from "../../../types/common";
import { EdgeLabelShapeStyle } from "../../../types/edge";
import { ShapeStyle } from "../../../types/item";

export abstract class BaseEdge {
  type: string;
  defaultStyles: {
    keyShape: ShapeStyle;
    labelShape: EdgeLabelShapeStyle;
    iconShape: ShapeStyle;
    otherShapes: {
      [shapeId: string]: ShapeStyle;
    }
  }
  abstract draw(
    model: NodeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: { [shapeId: string]: DisplayObject },
    shapesToChange?: { [shapeId: string]: boolean }
  ): {
    keyShape: DisplayObject,
    labelShape?: DisplayObject,
    iconShape?: DisplayObject,
    [otherShapeId: string]: DisplayObject
  };
  afterDraw: (model: NodeDisplayModel, shapeMap: { [shapeId: string]: DisplayObject }, shapesChanged?: string[]) => void;
  // shouldUpdate: (model: NodeDisplayModel, prevModel: NodeDisplayModel) => boolean = () => true;
  setState: (name: string, value: boolean, shapeMap: { [shapeId: string]: DisplayObject }) => void;
}