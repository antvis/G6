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
  vPoint = {}; // vertex coordinates
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
    const height = 3 * r;
    const length = (3 * r) / Math.sin((1 / 3) * Math.PI);

    let path: PathArray;
    if (direction === 'down') {
      path = [
        ['M', 0, height / 2],
        ['L', length / 2, -height / 2],
        ['L', -length / 2, -height / 2],
        ['Z'],
      ];
      this.vPoint['bottom'] = [0, height / 2];
      this.vPoint['right'] = this.vPoint['default'] = [length / 2, -height / 2];
      this.vPoint['left'] = [-length / 2, -height / 2];
    } else if (direction === 'left') {
      path = [
        ['M', -height / 2, 0],
        ['L', height / 2, length / 2],
        ['L', height / 2, -length / 2],
        ['Z'],
      ];
      this.vPoint['top'] = [height / 2, -length / 2];
      this.vPoint['bottom'] = [height / 2, length / 2];
      this.vPoint['left'] = this.vPoint['default'] = [-height / 2, 0];
    } else if (direction === 'right') {
      path = [
        ['M', height / 2, 0],
        ['L', -height / 2, length / 2],
        ['L', -height / 2, -length / 2],
        ['Z'],
      ];
      this.vPoint['top'] = [-height / 2, -length / 2];
      this.vPoint['bottom'] = [-height / 2, length / 2];
      this.vPoint['right'] = this.vPoint['default'] = [height / 2, 0];
    } else {
      //top
      path = [
        ['M', 0, -height / 2],
        ['L', length / 2, height / 2],
        ['L', -length / 2, height / 2],
        ['Z'],
      ];
      this.vPoint['left'] = [-length / 2, height / 2];
      this.vPoint['top'] = this.vPoint['default'] = [0, -height / 2];
      this.vPoint['right'] = [length / 2, height / 2];
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

  public override drawAnchorShapes(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ) {
    const { anchorShapes: commonStyle, keyShape: keyShapeStyle } =
      this.mergedStyles;

    const individualConfigs = Object.values(this.mergedStyles).filter(
      (style) => style.tag === 'anchorShape',
    );
    if (!individualConfigs.length) return;
    this.boundsCache.keyShapeLocal =
      this.boundsCache.keyShapeLocal || shapeMap.keyShape.getLocalBounds();
    const keyShapeBBox = this.boundsCache.keyShapeLocal;
    const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
    const keyShapeHeight = keyShapeBBox.max[1] - keyShapeBBox.min[1];

    const shapes = {};
    individualConfigs.forEach((config, i) => {
      const { position, fill = keyShapeStyle.fill, ...style } = config;
      const id = `anchorShape${i}`;
      if (!position) {
        console.error(`please set the anchorShape 'position'`);
        return;
      }
      const [cx, cy] = this.getAnchorPosition(position);
      shapes[id] = this.upsertShape(
        'circle',
        id,
        {
          cx,
          cy,
          fill,
          ...commonStyle,
          ...style,
        } as GShapeStyle,
        shapeMap,
        model,
      );
    });
    return shapes;
  }

  private getAnchorPosition(
    position: string | [number, number],
  ): [number, number] {
    const keyShapeBBox = this.boundsCache.keyShapeLocal;
    const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
    const keyShapeHeight = keyShapeBBox.max[1] - keyShapeBBox.min[1];
    if (position instanceof Array) {
      return [
        keyShapeWidth * (position[0] - 0.5),
        keyShapeHeight * (position[1] - 0.5),
      ];
    } else if (typeof position === 'string') {
      position = position.toLowerCase();
      return this.vPoint[position] || this.vPoint['default'];
    }
    console.error(
      `there is a unknown position: ${position}, please check the anchorShape 'position' field`,
    );
    return [keyShapeWidth, keyShapeHeight];
  }
}
