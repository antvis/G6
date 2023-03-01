import { Point } from '../../../types/common';
import { EdgeDisplayModel, EdgeModelData, EdgeShapeMap } from '../../../types/edge';
import { State } from '../../../types/item';
import { mergeStyles, upsertShape } from '../../../util/shape';
import { BaseEdge } from './base';

export class LineEdge extends BaseEdge {
  public type = 'line-edge';
  public defaultStyles = {
    keyShape: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      stroke: '#ccc',
      lineWidth: 1,
    }
  }
  constructor() {
    super();
    // suggest to merge default styles like this to avoid style value missing
    this.defaultStyles = mergeStyles(this.baseDefaultStyles, this.defaultStyles);
  }
  public draw(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[], current: State[] }
  ): EdgeShapeMap {
    const { data = {} } = model;

    let shapes: EdgeShapeMap = { keyShape: undefined };
    shapes.keyShape = this.drawKeyShape(model, sourcePoint, targetPoint, shapeMap, diffData);
    if (data.labelShape)
      shapes = {
        ...shapes,
        ...this.drawLabelShape(model, shapeMap, diffData),
      };
    if (data.iconShape) shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);

    // TODO: other shapes

    return shapes;
  }
  public drawKeyShape(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[], current: State[] }
  ) {
    const keyShapeStyle = Object.assign({}, this.defaultStyles.keyShape, model.data?.keyShape);
    const keyShape = upsertShape(
      'line',
      'keyShape',
      {
        ...keyShapeStyle,
        x1: sourcePoint.x,
        y1: sourcePoint.y,
        x2: targetPoint.x,
        y2: targetPoint.y,
      },
      shapeMap,
    );
    return keyShape;
  }
}
