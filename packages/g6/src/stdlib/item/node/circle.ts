import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { ShapeStyle } from '../../../types/item';
import { NodeLabelShapeStyle, NodeModelData, NodeShapeMap } from '../../../types/node';
import { upsertShape } from '../../../util/shape';
import { BaseNode } from './base';

export class CircleNode extends BaseNode {
  public type = 'circle-node';
  public defaultStyles = Object.assign({}, super.getDefaultStyles(), {
    keyShape: {
      r: 15,
      x: 0,
      y: 0,
      fill: '#f00',
      lineWidth: 0,
      stroke: '#0f0',
    },
  });
  public draw(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ): NodeShapeMap {
    const { data = {} } = model;
    let shapes: NodeShapeMap = { keyShape: undefined };

    shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData);
    if (data.labelShape) {
      shapes = {
        ...shapes,
        ...this.drawLabelShape(model, shapeMap, diffData),
      };
    }
    if (data.iconShape) {
      shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
    }

    // TODO: other shapes

    return shapes;
  }

  public drawKeyShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ): DisplayObject {
    const shapeStyle = Object.assign({}, this.defaultStyles.keyShape, model.data?.keyShape);
    return upsertShape('circle', 'keyShape', shapeStyle, shapeMap);
  }
}
