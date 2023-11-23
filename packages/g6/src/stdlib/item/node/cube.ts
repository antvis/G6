import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import {
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
} from '../../../types/node';
import { BaseNode3D } from './base3d';

export class CubeNode extends BaseNode3D {
  override defaultStyles = {
    keyShape: {
      width: 10,
      height: 10,
      depth: 10,
      x: 0,
      y: 0,
      z: 0,
    },
  };
  mergedStyles: NodeShapeStyles;
  constructor(props) {
    super(props);
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
    return this.upsertShape('cube', 'keyShape', this.mergedStyles.keyShape, {
      model,
      shapeMap,
      diffData,
      diffState,
    });
  }
}
