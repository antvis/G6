import { DisplayObject, Group, IElement } from "@antv/g";
import { NodeDisplayModel } from "../../../types";
import { ShapeStyle } from "../../../types/item";
import { NodeLabelShapeStyle, NodeModelData } from "../../../types/node";

export abstract class BaseNode {
  type: string;
  defaultStyles: {
    keyShape: ShapeStyle;
    labelShape: NodeLabelShapeStyle;
    iconShape: ShapeStyle;
    otherShapes: {
      [shapeId: string]: ShapeStyle;
    }
  }
  abstract draw(
    model: NodeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    diffData?: { oldData: NodeModelData, newData: NodeModelData },
    shapesToChange?: { [shapeId: string]: boolean }
  ): {
    keyShape: DisplayObject,
    labelShape?: DisplayObject,
    iconShape?: DisplayObject,
    [otherShapeId: string]: DisplayObject
  };
  afterDraw: (model: NodeDisplayModel, shapeMap: { [shapeId: string]: DisplayObject }, shapesChanged?: string[]) => ({ [otherShapeId: string]: DisplayObject });
  // shouldUpdate: (model: NodeDisplayModel, prevModel: NodeDisplayModel) => boolean = () => true;
  setState: (name: string, value: boolean, shapeMap: { [shapeId: string]: DisplayObject }) => void;
}