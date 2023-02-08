import { DisplayObject, Group, IElement } from "@antv/g";
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
      [shapeName: string]: ShapeStyle;
    }
  }
  abstract draw(model: NodeDisplayModel, sourcePoint: Point, targetPoint: Point, group: Group): IElement;
  afterDraw: (model: NodeDisplayModel, group: Group) => void;
  shouldUpdate: (model: NodeDisplayModel, prevModel: NodeDisplayModel) => boolean = () => true;
  setState: (name: string, value: boolean, group: Group) => void;
}