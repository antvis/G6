import { DisplayObject, Group, IElement } from "@antv/g";
import { NodeDisplayModel } from "../../../types";
import { ShapeStyle } from "../../../types/item";
import { NodeLabelShapeStyle } from "../../../types/node";

export abstract class BaseNode {
  type: string;
  defaultStyles: {
    keyShape: ShapeStyle;
    labelShape: NodeLabelShapeStyle;
    iconShape: ShapeStyle;
    otherShapes: {
      [shapeName: string]: ShapeStyle;
    }
  }
  abstract draw(model: NodeDisplayModel, group: Group): IElement;
  afterDraw: (model: NodeDisplayModel, group: Group) => void;
  shouldUpdate: (model: NodeDisplayModel, prevModel: NodeDisplayModel) => boolean = () => true;
  setState: (name: string, value: boolean, group: Group) => void;
}