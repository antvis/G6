import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import {
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
} from '../../../types/node';
import { convertToNumber } from '../../../util/type';
import { BaseNode } from './base';
export class EllipseNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      rx: 16,
      ry: 12,
      x: 0,
      y: 0,
    },
  };
  mergedStyles: NodeShapeStyles;
  constructor(props) {
    super(props);
    // suggest to merge default styles like this to avoid style value missing
    // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
  }
  public draw(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): NodeShapeMap {
    const { data = {} } = model;
    let shapes: NodeShapeMap = { keyShape: undefined };

    // keyShape
    shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData, diffState);

    // haloShape
    if (data.haloShape && this.drawHaloShape) {
      shapes.haloShape = this.drawHaloShape(
        model,
        shapeMap,
        diffData,
        diffState,
      );
    }

    // labelShape
    if (data.labelShape) {
      shapes.labelShape = this.drawLabelShape(
        model,
        shapeMap,
        diffData,
        diffState,
      );
    }

    // labelBackgroundShape
    if (data.labelBackgroundShape) {
      shapes.labelBackgroundShape = this.drawLabelBackgroundShape(
        model,
        shapeMap,
        diffData,
      );
    }

    // anchor shapes
    if (data.anchorShapes) {
      const anchorShapes = this.drawAnchorShapes(
        model,
        shapeMap,
        diffData,
        diffState,
      );
      shapes = {
        ...shapes,
        ...anchorShapes,
      };
    }

    // iconShape
    if (data.iconShape) {
      shapes.iconShape = this.drawIconShape(
        model,
        shapeMap,
        diffData,
        diffState,
      );
    }

    // badgeShape
    if (data.badgeShapes) {
      const badgeShapes = this.drawBadgeShapes(
        model,
        shapeMap,
        diffData,
        diffState,
      );
      shapes = {
        ...shapes,
        ...badgeShapes,
      };
    }

    // otherShapes
    if (data.otherShapes && this.drawOtherShapes) {
      shapes = {
        ...shapes,
        ...this.drawOtherShapes(model, shapeMap, diffData, diffState),
      };
    }
    return shapes;
  }

  public drawKeyShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    return this.upsertShape('ellipse', 'keyShape', this.mergedStyles.keyShape, {
      model,
      shapeMap,
      diffData,
      diffState,
    });
  }

  public override calculateAnchorPosition(keyShapeStyle) {
    const x = convertToNumber(keyShapeStyle.x);
    const y = convertToNumber(keyShapeStyle.y);
    const anchorPositionMap = {};
    anchorPositionMap['top'] = [x, y - keyShapeStyle.ry];
    anchorPositionMap['left'] = [x - keyShapeStyle.rx, y];
    anchorPositionMap['right'] = anchorPositionMap['default'] = [
      x + keyShapeStyle.rx,
      y,
    ];
    anchorPositionMap['bottom'] = [x, y + keyShapeStyle.ry];
    return anchorPositionMap;
  }
}
