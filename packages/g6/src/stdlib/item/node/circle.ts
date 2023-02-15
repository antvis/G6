import { Group, DisplayObject } from "@antv/g";
import { NodeDisplayModel } from "../../../types";
import { NodeModelData, NodeShapeMap } from "../../../types/node";
import { createShape } from "../../../util/shape";
import { BaseNode } from "./base";

export class CircleNode extends BaseNode {
  public type = 'circle-node';
  public defaultStyles = {
    keyShape: {
      r: 15,
      x: 0,
      y: 0,
      fill: '#f00',
      lineWidth: 0,
      stroke: '#0f0'
    },
    labelShape: {
      x: 0,
      y: 0,
      textAlign: 'center',
      fontSize: 12,
      fill: '#000'
    },
    iconShape: {
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ',
      width: 15,
      height: 15
    },
    otherShapes: {}
  };
  public draw(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData, newData: NodeModelData },
    shapesToChange?: { [shapeId: string]: boolean }
  ): NodeShapeMap {
    if (!shapesToChange) return shapeMap;
    const { data = {} } = model;
    const handleKeyShape = () => {
      const keyShapeStyle = Object.assign({}, this.defaultStyles.keyShape, data.keyShape);
      const keyShape = createShape(
        'circle',
        keyShapeStyle,
        'keyShape',
        shapeMap
      );
      return keyShape;
    }
    const handleLabelShape = () => {
      const labelShapeStyle = Object.assign({}, this.defaultStyles.labelShape, data.labelShape);
      // addShape('text', labelShapeStyle, `${this.type}-labelShape`, group);
    }
    const handleIconShape = () => {
      const iconShapeStyle = Object.assign({}, this.defaultStyles.iconShape, data.iconShape);
      // addShape('text', labelShapeStyle, `${this.type}-labelShape`, group);
    }
    let keyShape;
    if (shapesToChange.keyShape) {
      keyShape = handleKeyShape();
    }
    if (shapesToChange.labelShape) {
      handleLabelShape();
    }
    if (shapesToChange.iconShape) {
      handleIconShape();
    }
    // TODO: add label, icon, and other shapes

    return { keyShape, labelShape: undefined, iconShape: undefined, otherShapes: undefined };
  }
}