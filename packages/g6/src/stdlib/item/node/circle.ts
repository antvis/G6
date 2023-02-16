import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { ShapeStyle } from '../../../types/item';
import { NodeLabelShapeStyle, NodeModelData, NodeShapeMap } from '../../../types/node';
import { upsertShape } from '../../../util/shape';
import { BaseNode } from './base';

export class CircleNode extends BaseNode {
  public type = 'circle-node';
  public defaultStyles = {
    keyShape: {
      r: 15,
      x: 0,
      y: 0,
      fill: '#f00',
      lineWidth: 0,
      stroke: '#0f0',
    } as ShapeStyle,
    labelShape: {
      fontSize: 12,
      fill: '#000',
      position: 'bottom',
    } as NodeLabelShapeStyle,
    iconShape: {
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ',
      width: 12,
      height: 12,
    } as ShapeStyle,
    otherShapes: {},
  };
  public draw(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ): NodeShapeMap {
    const { data = {} } = model;
    const shapes: NodeShapeMap = { keyShape: undefined };

    shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData);
    if (data.labelShape) shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
    if (data.iconShape) shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);

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
