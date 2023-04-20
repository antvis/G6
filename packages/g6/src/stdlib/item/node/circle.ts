import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { GShapeStyle, ItemShapeStyles, State } from '../../../types/item';
import { NodeModelData, NodeShapeMap } from '../../../types/node';
import { upsertShape } from '../../../util/shape';
import { BaseNode } from './base';

export class CircleNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      r: 15,
      x: 0,
      y: 0,
    }
  };
  mergedStyles: ItemShapeStyles;
  constructor(props) {
    super(props);
    // suggest to merge default styles like this to avoid style value missing
    // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
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
    // TODO: update type define.
    return upsertShape('circle', 'keyShape', this.mergedStyles.keyShape as unknown as GShapeStyle, shapeMap);
  }
}
