import { Group } from "@antv/g";
import { NodeDisplayModel } from "../../../types";
import { addShape } from "../../../util/shape";
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
  public draw(model: NodeDisplayModel, group: Group) {
    const { data = {} } = model;
    const keyShapeStyle = Object.assign({}, this.defaultStyles.keyShape, data.keyShape);
    const labelShapeStyle = Object.assign({}, this.defaultStyles.labelShape, data.labelShape);
    const iconShapeStyle = Object.assign({}, this.defaultStyles.iconShape, data.iconShape);
    const keyShape = addShape(
      'circle',
      keyShapeStyle,
      `${this.type}-keyShape`,
      group
    )
    // TODO: add label, icon, and other shapes

    return keyShape;
  }
}