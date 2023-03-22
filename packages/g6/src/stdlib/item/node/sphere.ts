import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { ItemShapeStyles, State } from '../../../types/item';
import { NodeModelData, NodeShapeMap } from '../../../types/node';
import { BaseNode3D } from './base3d';

export class SphereNode extends BaseNode3D {
  override defaultStyles = {
    keyShape: {
      r: 15,
      latitudeBands: 32,
      longitudeBands: 32,
      x: 0,
      y: 0,
      z: 0,
      opacity: 0.6
    }
  };
  mergedStyles: ItemShapeStyles;
  constructor(props) {
    super(props);
  }
  public draw(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[], current: State[] },
  ): NodeShapeMap {
    const { data = {} } = model;
    let shapes: NodeShapeMap = { keyShape: undefined };

    shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData);
    console.log('shapes.keyShape', shapes.keyShape)
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
    return this.upsertShape('sphere', 'keyShape', this.mergedStyles.keyShape, shapeMap);
  }
}
