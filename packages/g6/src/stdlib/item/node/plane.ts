import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import {
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
} from '../../../types/node';
import { BaseNode3D } from './base3d';

export class PlaneNode extends BaseNode3D {
  override defaultStyles = {
    keyShape: {
      width: 100,
      depth: 100,
      materialType: 'basic',
      materialProps: {
        wireframe: false,
        wireframeColor: 'black',
        cullMode: 0,
      },
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
    return this.upsertShape(
      'plane',
      'keyShape',
      this.mergedStyles.keyShape,
      shapeMap,
    );
  }
}
