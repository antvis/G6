import { DisplayObject } from '@antv/g';
import { ComboDisplayModel, NodeDisplayModel } from '../../../types';
import { ComboModelData, ComboShapeMap } from '../../../types/combo';
import { State } from '../../../types/item';
import { NodeModelData, NodeShapeMap, NodeShapeStyles } from '../../../types/node';
import { ShapeTagMap } from '../../../util/shape';
import { convertToNumber } from '../../../util/type';
import { BaseNode } from './base';

export class ImageNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      x: 0,
      y: 0,
      width: 32,
      height: 32,
    },
  };
  declare mergedStyles: NodeShapeStyles;
  constructor(props) {
    super(props);
    // suggest to merge default styles like this to avoid style value missing
    // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
  }

  public override drawKeyShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const clipCfg = this.mergedStyles.keyShape?.clipCfg;
    let clipPath: DisplayObject | undefined;
    if (clipCfg) {
      const { type, ...rest } = clipCfg;
      clipPath = new ShapeTagMap[type]();
      clipPath.attr(rest);
    }

    const shape = this.upsertShape(
      'image',
      'keyShape',
      {
        ...this.mergedStyles.keyShape,
        x: this.mergedStyles.keyShape!.x,
        y: this.mergedStyles.keyShape!.y,
        anchor: '0.5 0.5',
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );

    if (clipPath) {
      shape.appendChild(clipPath);
      shape.attr('clipPath', clipPath);
    }

    return shape;
  }

  public override calculateAnchorPosition(keyShapeStyle) {
    const x = convertToNumber(keyShapeStyle.x);
    const y = convertToNumber(keyShapeStyle.y);
    const height = keyShapeStyle.height;
    const width = keyShapeStyle.width;
    const anchorPositionMap = {};
    anchorPositionMap['top'] = [x, y - height / 2];
    anchorPositionMap['left'] = [x - width / 2, y];
    anchorPositionMap['right'] = anchorPositionMap['default'] = [x + width / 2, y];
    anchorPositionMap['bottom'] = [x, y + height / 2];
    return anchorPositionMap;
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

    // labelShape
    if (data.labelShape) {
      shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
    }

    // haloShape
    if (data.haloShape && this.drawHaloShape) {
      shapes.haloShape = this.drawHaloShape(model, shapeMap, diffData);
    }

    // labelBackgroundShape
    if (data.labelBackgroundShape) {
      shapes.labelBackgroundShape = this.drawLabelBackgroundShape(model, shapeMap, diffData);
    }

    // anchor shapes
    if (data.anchorShapes) {
      const anchorShapes = this.drawAnchorShapes(model, shapeMap, diffData, diffState);
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
      const badgeShapes = this.drawBadgeShapes(model, shapeMap, diffData, diffState);
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

  public drawHaloShape(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    const { haloShape: haloShapeStyle, keyShape: keyShapeStyle } = this.mergedStyles;
    if (haloShapeStyle?.visible === false) return;

    const clipShape = haloShapeStyle?.clipCfg?.type || 'rect';
    const { attributes } = keyShape;
    const { x, y, fill } = attributes;

    return this.upsertShape(
      clipShape,
      'haloShape',
      {
        ...attributes,
        ...keyShapeStyle,
        x,
        y,
        stroke: fill,
        ...haloShapeStyle,
        fill: 'transparent',
        batchKey: 'halo',
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );
  }
}
