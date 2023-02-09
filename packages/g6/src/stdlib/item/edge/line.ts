import { DisplayObject, Group } from "@antv/g";
import { NodeDisplayModel } from "../../../types";
import { Point } from "../../../types/common";
import { createShape } from "../../../util/shape";
import { BaseEdge } from "./base";

export class LineEdge extends BaseEdge {
  public type = 'line-edge';
  public defaultStyles = {
    keyShape: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      stroke: '#ccc',
      lineWidth: 1
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
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: { [shapeId: string]: DisplayObject },
    shapesToChange?: { [shapeId: string]: boolean }
  ) {
    const { data = {} } = model;

    const handleKeyShape = () => {
      const keyShapeStyle = Object.assign({}, this.defaultStyles.keyShape, data.keyShape);
      const keyShape = createShape(
        'line',
        {
          ...keyShapeStyle,
          x1: sourcePoint.x,
          y1: sourcePoint.y,
          x2: targetPoint.x,
          y2: targetPoint.y
        },
        'keyShape',
        shapeMap
      )
      return keyShape
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
    if (shapesToChange) {
      if (shapesToChange.keyShape) {
        keyShape = handleKeyShape()
      }
      if (shapesToChange.labelShape) {
        handleLabelShape();
      }
      if (shapesToChange.iconShape) {
        handleIconShape();
      }
    } else {
      keyShape = handleKeyShape();
      handleLabelShape();
      handleIconShape();
    }

    // TODO: add label, icon, and other shapes

    return { keyShape };
  }
}