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

export class StarNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      outerR: 20,
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

    const path = this.getStarPath(keyShapeStyle.outerR, keyShapeStyle.innerR);
    return this.upsertShape(
      'path',
      'keyShape',
      {
        ...keyShapeStyle,
        path,
      },
      shapeMap,
      model,
    );
  }

  public getStarPath(outerR: number, innerR?: number) {
    if (!innerR) {
      innerR = (outerR * 3) / 8;
    }
    return [
      ['M', 0, -outerR],
      [
        'L',
        innerR * Math.cos((3 * Math.PI) / 10),
        -innerR * Math.sin((3 * Math.PI) / 10),
      ],
      ['L', outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)],
      ['L', innerR * Math.cos(Math.PI / 10), innerR * Math.sin(Math.PI / 10)],
      [
        'L',
        outerR * Math.cos((3 * Math.PI) / 10),
        outerR * Math.sin((3 * Math.PI) / 10),
      ],
      ['L', 0, innerR],
      [
        'L',
        -outerR * Math.cos((3 * Math.PI) / 10),
        outerR * Math.sin((3 * Math.PI) / 10),
      ],
      ['L', -innerR * Math.cos(Math.PI / 10), innerR * Math.sin(Math.PI / 10)],
      ['L', -outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)],
      [
        'L',
        -innerR * Math.cos((3 * Math.PI) / 10),
        -innerR * Math.sin((3 * Math.PI) / 10),
      ],
      'Z',
    ];
  }

  public override calculateAnchorPosition(
    keyShapeStyle: any,
  ): IAnchorPositionMap {
    const anchorPositionMap = {};
    const outerR = keyShapeStyle.outerR;
    const innerR = keyShapeStyle.innerR;
    anchorPositionMap['top'] = [0, -outerR];
    anchorPositionMap['left'] = [
      -outerR * Math.cos(Math.PI / 10),
      -outerR * Math.sin(Math.PI / 10),
    ];
    anchorPositionMap['leftbottom'] = [
      -outerR * Math.cos((3 * Math.PI) / 10),
      outerR * Math.sin((3 * Math.PI) / 10),
    ];
    anchorPositionMap['bottom'] = [0, innerR];
    anchorPositionMap['rightbottom'] = [
      outerR * Math.cos((3 * Math.PI) / 10),
      outerR * Math.sin((3 * Math.PI) / 10),
    ];
    anchorPositionMap['right'] = anchorPositionMap['default'] = [
      outerR * Math.cos(Math.PI / 10),
      -outerR * Math.sin(Math.PI / 10),
    ];
    return anchorPositionMap;
  }
}
