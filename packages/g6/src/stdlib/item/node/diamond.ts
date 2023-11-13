import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import {
  IAnchorPositionMap,
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
} from '../../../types/node';
import { BaseNode } from './base';
type PathArray = any; //TODO: cannot import type PathArray
export class DiamondNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      size: [32, 32],
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
    shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData);

    // haloShape
    if (data.haloShape && this.drawHaloShape) {
      shapes.haloShape = this.drawHaloShape(model, shapeMap, diffData);
    }

    // labelShape
    if (data.labelShape) {
      shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
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
      shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
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
        ...this.drawOtherShapes(model, shapeMap, diffData),
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
    const { keyShape: keyShapeStyle } = this.mergedStyles as any;
    return this.upsertShape(
      'path',
      'keyShape',
      {
        ...this.mergedStyles.keyShape,
        path: this.getDiamondPath(keyShapeStyle),
      },
      shapeMap,
      model,
    );
  }

  private getDiamondPath(keyShapeStyle): PathArray {
    const { size } = keyShapeStyle;
    const sizeArr = Array.isArray(size) ? size : [size, size];
    const width = sizeArr[0];
    const height = sizeArr[1];
    const path = [
      ['M', 0, -height / 2], // top
      ['L', width / 2, 0], // right
      ['L', 0, height / 2], // bottom
      ['L', -width / 2, 0], // left
      ['Z'], // close
    ];
    return path;
  }

  public override calculateAnchorPosition(
    keyShapeStyle: any,
  ): IAnchorPositionMap {
    const anchorPositionMap = {};
    const { size } = keyShapeStyle;
    const sizeArr = Array.isArray(size) ? size : [size, size];
    const width = sizeArr[0];
    const height = sizeArr[1];
    anchorPositionMap['bottom'] = [0, height / 2];
    anchorPositionMap['left'] = [-width / 2, 0];
    anchorPositionMap['right'] = anchorPositionMap['default'] = [width / 2, 0];
    anchorPositionMap['top'] = [0, -height / 2];
    return anchorPositionMap;
  }
}
