import { DisplayObject } from '@antv/g';
import type { PathArray } from '@antv/g-lite/node_modules/@antv/util';
import {
  ComboDisplayModel,
  ComboModelData,
  ComboShapeMap,
} from '../../../types/combo';
import { NodeDisplayModel } from '../../../types';
import { State, GShapeStyle } from '../../../types/item';
import {
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
} from '../../../types/node';
import { BaseNode } from './base';

export class TriangleNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      r: 12,
      x: 0,
      y: 0,
      direction: 'up', //'up'|'left'|'right'|'down'
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
        path: this.getTrianglePath(keyShapeStyle.r, keyShapeStyle.direction),
      },
      shapeMap,
      model,
    );
  }
  private getTrianglePath(
    r: number,
    direction: 'up' | 'down' | 'left' | 'right',
  ): PathArray {
    const halfHeight = (3 * r) / 2;
    const halfLength = (3 * r) / Math.sin((1 / 3) * Math.PI) / 2;

    let path: PathArray;
    if (direction === 'down') {
      path = [
        ['M', 0, halfHeight],
        ['L', halfLength, -halfHeight],
        ['L', -halfLength, -halfHeight],
        ['Z'],
      ];
    } else if (direction === 'left') {
      path = [
        ['M', -halfHeight, 0],
        ['L', halfHeight, halfLength],
        ['L', halfHeight, -halfLength],
        ['Z'],
      ];
    } else if (direction === 'right') {
      path = [
        ['M', halfHeight, 0],
        ['L', -halfHeight, halfLength],
        ['L', -halfHeight, -halfLength],
        ['Z'],
      ];
    } else {
      //up
      path = [
        ['M', 0, -halfHeight],
        ['L', halfLength, halfHeight],
        ['L', -halfLength, halfHeight],
        ['Z'],
      ];
    }
    return path;
  }

  /**
   * @description: add 'defaultOffsetX' and 'defaultOffsetY' making the icon align to the triangle center
   */
  public override drawIconShape(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape: keyShapeStyle } = this.mergedStyles as any;
    const { iconShape: shapeStyle } = this.mergedStyles;
    let defaultOffsetX = 0;
    let defaultOffsetY = keyShapeStyle.r / 4;

    if (keyShapeStyle.direction === 'right') {
      defaultOffsetX = -keyShapeStyle.r / 4;
      defaultOffsetY = 0;
    } else if (keyShapeStyle.direction === 'left') {
      defaultOffsetX = keyShapeStyle.r / 4;
      defaultOffsetY = 0;
    } else if (keyShapeStyle.direction === 'down') {
      defaultOffsetX = 0;
      defaultOffsetY = -keyShapeStyle.r / 4;
    }
    const {
      width,
      height,
      fontSize,
      text,
      offsetX = 0,
      offsetY = 0,
    } = shapeStyle;
    const w = (width || fontSize) as number;
    const h = (height || fontSize) as number;
    const iconShapeType = text ? 'text' : 'image';
    if (iconShapeType === 'image') {
      shapeStyle.x = -w / 2 + offsetX + defaultOffsetX;
      shapeStyle.y = -h / 2 + offsetY + defaultOffsetY;
      shapeStyle.width = w;
      shapeStyle.height = h;
    } else {
      shapeStyle.textAlign = 'center';
      shapeStyle.textBaseline = 'middle';
      shapeStyle.x = offsetX + defaultOffsetX;
      shapeStyle.y = offsetY + defaultOffsetY;
      shapeStyle.fontSize = w;
    }

    return this.upsertShape(
      iconShapeType,
      'iconShape',
      shapeStyle as GShapeStyle,
      shapeMap,
      model,
    );
  }

  public override calculateAnchorPosition(keyShapeStyle) {
    const direction = keyShapeStyle.direction;
    const r = keyShapeStyle.r;

    const halfHeight = (3 * r) / 2;
    const halfLength = (3 * r) / Math.sin((1 / 3) * Math.PI) / 2;
    const anchorPositionMap = {};
    if (direction === 'down') {
      anchorPositionMap['bottom'] = [0, halfHeight];
      anchorPositionMap['right'] = anchorPositionMap['default'] = [
        halfLength,
        -halfHeight,
      ];
      anchorPositionMap['left'] = [-halfLength, -halfHeight];
    } else if (direction === 'left') {
      anchorPositionMap['top'] = [halfHeight, -halfLength];
      anchorPositionMap['bottom'] = [halfHeight, halfLength];
      anchorPositionMap['left'] = anchorPositionMap['default'] = [
        -halfHeight,
        0,
      ];
    } else if (direction === 'right') {
      anchorPositionMap['top'] = [-halfHeight, -halfLength];
      anchorPositionMap['bottom'] = [-halfHeight, halfLength];
      anchorPositionMap['right'] = anchorPositionMap['default'] = [
        halfHeight,
        0,
      ];
    } else {
      //up
      anchorPositionMap['left'] = [-halfLength, halfHeight];
      anchorPositionMap['top'] = anchorPositionMap['default'] = [
        0,
        -halfHeight,
      ];
      anchorPositionMap['right'] = [halfLength, halfHeight];
    }
    return anchorPositionMap;
  }
}
