import { DisplayObject } from '@antv/g';
import { State } from '../../../types/item';
import {
  ComboDisplayModel,
  ComboModelData,
  ComboShapeMap,
  ComboShapeStyles,
} from '../../../types/combo';
import { BaseNode } from '../node/base';

export class RectCombo extends BaseNode {
  override defaultStyles = {
    keyShape: {
      x: 0,
      y: 0,
      width: 32,
      height: 32,
    },
  };
  mergedStyles: ComboShapeStyles;
  constructor(props) {
    super(props);
    // suggest to merge default styles like this to avoid style value missing
    // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
  }
  public draw(
    model: ComboDisplayModel,
    shapeMap: ComboShapeMap,
    diffData?: { previous: ComboModelData; current: ComboModelData },
    diffState?: { previous: State[]; current: State[] },
  ): ComboShapeMap {
    const { data = {} } = model;
    let shapes: ComboShapeMap = { keyShape: undefined };

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
    model: ComboDisplayModel,
    shapeMap: ComboShapeMap,
    diffData?: { previous: ComboModelData; current: ComboModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    return this.upsertShape(
      'rect',
      'keyShape',
      this.mergedStyles.keyShape,
      shapeMap,
      model,
    );
  }

  public getMergedStyles(model: ComboDisplayModel) {
    const merged = super.getMergedStyles(model);
    merged.keyShape.x =
      (merged.keyShape.x as number) - merged.keyShape.width / 2;
    merged.keyShape.y =
      (merged.keyShape.y as number) - merged.keyShape.height / 2;
    return merged;
  }
}
