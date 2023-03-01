import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import { NodeModelData, NodeShapeMap } from '../../../types/node';
import { mergeStyles, upsertShape } from '../../../util/shape';
import { BaseNode } from './base';

export class CircleNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      r: 15,
      x: 0,
      y: 0,
      fill: '#f00',
      lineWidth: 0,
      stroke: '#0f0',
    }
  };
  constructor() {
    super();
    // suggest to merge default styles like this to avoid style value missing
    this.defaultStyles = mergeStyles(this.baseDefaultStyles, this.defaultStyles);
  }
  public draw(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[], current: State[] }
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
    if (data.otherShapes && this.drawOtherShapes) {
      shapes = {
        ...shapes,
        ...this.drawOtherShapes(model, shapeMap, diffData)
      }
    }
    return shapes;
  }

  public drawKeyShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[], current: State[] }
  ): DisplayObject {
    const shapeStyle = Object.assign({}, this.defaultStyles.keyShape, model.data?.keyShape);
    return upsertShape('circle', 'keyShape', shapeStyle, shapeMap);
  }
}
