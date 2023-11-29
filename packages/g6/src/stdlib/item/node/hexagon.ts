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

const offsetAngleMap = {
  horizontal: 0,
  vertical: Math.PI / 2,
};

export class HexagonNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      r: 16,
      x: 0,
      y: 0,
      direction: 'vertical',
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
        diffState,
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
    const { keyShape: keyShapeStyle } = this.mergedStyles as any;
    return this.upsertShape(
      'polygon',
      'keyShape',
      {
        ...this.mergedStyles.keyShape,
        points: this.getHexagonPoints(keyShapeStyle.r, keyShapeStyle.direction),
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );
  }
  private getHexagonPoints(r: number, direction: string): [number, number][] {
    const angleIncrement = Math.PI / 3; //The angle increment between vertex.
    const v = [];

    for (let i = 0; i < 6; i++) {
      const angle = i * angleIncrement + offsetAngleMap[direction];
      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);
      v.push([vx, vy]);
    }
    return v;
  }

  public override calculateAnchorPosition(
    keyShapeStyle: any,
  ): IAnchorPositionMap {
    const anchorPositionHorizontal = [
      'right',
      'rightbottom',
      'leftbottom',
      'left',
      'lefttop',
      'righttop',
    ];
    const anchorPositionVertical = [
      'bottom',
      'leftbottom',
      'lefttop',
      'top',
      'righttop',
      'rightbottom',
    ];
    const anchorPositionDirection =
      keyShapeStyle.direction === 'horizontal'
        ? anchorPositionHorizontal
        : anchorPositionVertical;
    const angleIncrement = Math.PI / 3; //The angle increment between vertex.
    const offsetAngle = offsetAngleMap[keyShapeStyle.direction];
    const r = keyShapeStyle.r;
    const anchorPositionMap = {};
    for (let i = 0; i < 6; i++) {
      const angle = i * angleIncrement + offsetAngle;
      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);
      anchorPositionMap[anchorPositionDirection[i]] = [vx, vy];
    }
    if (!anchorPositionMap.hasOwnProperty('default')) {
      anchorPositionMap['default'] =
        anchorPositionMap[anchorPositionDirection[0]];
    }
    return anchorPositionMap;
  }
}
