import { DisplayObject, AABB } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import {
  IAnchorPositionMap,
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
  NodeUserModelData,
} from '../../../types/node';
import {
  ComboDisplayModel,
  ComboModelData,
  ComboShapeMap,
} from '../../../types/combo';
import { convertToNumber } from '../../../util/type';
import { BaseNode } from './base';

export class ModelRectNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      x: 0,
      y: 0,
      width: 185,
      height: 70,
      stroke: '#69c0ff',
      fill: '#ffffff',
      lineWidth: 1,
      radius: 5,
    },
    preRect: {
      show: true,
      width: 5,
      fill: '#69c0ff',
      radius: 5,
    },
    logoIcon: {
      show: true,
      width: 16,
      height: 16,
      offsetX: 0,
      offsetY: 0,
      img: 'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
    },
    stateIcon: {
      show: true,
      width: 16,
      height: 16,
      offsetX: 0,
      offsetY: 0,
      img: 'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
    },
    description: {
      show: true,
      maxLines: 1,
      textOverflow: 'ellipsis',
      fill: '#C2C2C2',
      textBaseline: 'middle',
      textAlign: 'left',
      offsetX: 0,
      offsetY: 0,
    },
  };
  mergedStyles: NodeShapeStyles;
  logoX: number; //The x-coordinate of logoIcon
  logoY: number; //The y-coordinate of logoIcon
  logoWidth: number; //The width of logoIcon
  logoHeight: number; //The height of logoIcon
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

    //logoIconShape
    if (data.iconShape) {
      shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
    }

    // otherShapes
    if (data.otherShapes && this.drawOtherShapes) {
      shapes = {
        ...shapes,
        ...this.drawOtherShapes(model, shapeMap, diffData),
      };
    }

    // labelShape (after drawOtherShapes)
    if (data.labelShape) {
      shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
    }
    return shapes;
  }

  public drawKeyShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { x, y, height, width } = this.mergedStyles.keyShape;
    return this.upsertShape(
      'rect',
      'keyShape',
      {
        ...this.mergedStyles.keyShape,
        x: convertToNumber(x) - convertToNumber(width) / 2,
        y: convertToNumber(y) - convertToNumber(height) / 2,
      },
      shapeMap,
      model,
    );
  }

  public override calculateAnchorPosition(
    keyShapeStyle: any,
  ): IAnchorPositionMap {
    const x = convertToNumber(keyShapeStyle.x);
    const y = convertToNumber(keyShapeStyle.y);
    const { height, width } = keyShapeStyle;
    const anchorPositionMap = {};
    anchorPositionMap['top'] = [x, y - height / 2];
    anchorPositionMap['left'] = [x - width / 2, y];
    anchorPositionMap['right'] = anchorPositionMap['default'] = [
      x + width / 2,
      y,
    ];
    anchorPositionMap['bottom'] = [x, y + height / 2];
    return anchorPositionMap;
  }

  public override drawLabelShape(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const {
      labelShape: labelShapeStyle,
      description: descriptionStyle,
      keyShape: keyShapeStyle,
    } = this.mergedStyles as any;

    if (!labelShapeStyle) return;
    const { width, height, x, y } = keyShapeStyle;

    const { offsetX: labelOffsetX = 0, offsetY: labelOffsetY = 0 } =
      labelShapeStyle;

    const mixDisplay = descriptionStyle.show;
    const defaultLabelFontSize = mixDisplay
      ? Math.min(height, width) / 4
      : Math.min(height, width) / 6; //match with keyShape

    const logoIconBBox = shapeMap['logoIcon']?.getBBox();
    const defaultLabelX = mixDisplay
      ? -width / 2 + logoIconBBox?.width + width / 10
      : 0;
    const defaultLabelY = mixDisplay ? 0 - height / 7 : 0;
    const defaultWordWrapWidth =
      width / 2 -
      (logoIconBBox.left + logoIconBBox.width + width / 20) -
      defaultLabelFontSize * 2 -
      labelOffsetX;
    labelShapeStyle.maxWidth = defaultWordWrapWidth;

    return this.upsertShape(
      'text',
      'labelShape',
      {
        x: defaultLabelX + labelOffsetX,
        y: defaultLabelY + labelOffsetY,
        wordWrap: true,
        textOverflow: 'ellipsis',
        textBaseline: 'middle',
        textAlign: mixDisplay ? 'left' : 'middle',
        maxLines: 1,
        wordWrapWidth: defaultWordWrapWidth,
        ...labelShapeStyle,
      },
      shapeMap,
      model,
    );
  }

  public override drawOtherShapes(
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
  ): { [id: string]: DisplayObject } {
    const {
      keyShape: keyShapeStyle,
      label: labelStyle,
      preRect: preRectStyle,
      logoIcon: logoIconStyle,
      stateIcon: stateIconStyle,
      description: descriptionStyle,
    } = this.mergedStyles as any;

    const shapes = {
      preRect: this.drawPreRectShape(
        preRectStyle,
        keyShapeStyle,
        model,
        shapeMap,
      ),
      logoIcon: this.drawLogoIconShape(
        logoIconStyle,
        keyShapeStyle,
        model,
        shapeMap,
      ),
      description: this.drawDescriptionShape(
        descriptionStyle,
        keyShapeStyle,
        model,
        shapeMap,
      ),
      stateIcon: this.drawStateIcon(
        stateIconStyle,
        keyShapeStyle,
        model,
        shapeMap,
      ),
    };

    return shapes;
  }

  private drawPreRectShape(
    preRectStyle,
    keyShapeStyle,
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
  ) {
    if (!preRectStyle || !preRectStyle.show) return;
    const { x, y, height, width } = keyShapeStyle;
    const { width: preRectWidth, ...restPreRectStyle } = preRectStyle;
    return this.upsertShape(
      'rect',
      'preRect',
      {
        width: preRectWidth,
        height,
        x: convertToNumber(x) - convertToNumber(width) / 2,
        y: convertToNumber(y) - convertToNumber(height) / 2,
        ...restPreRectStyle,
      },
      shapeMap,
      model,
    );
  }

  private drawLogoIconShape(
    logoIconStyle,
    keyShapeStyle,
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
  ) {
    if (!logoIconStyle || !logoIconStyle.show) return;
    const { x, y, width } = keyShapeStyle;
    const {
      width: logoIconWidth,
      height: logoIconHeight,
      fontSize: logoIconFontSize,
      text: logoIconText,
      offsetX: logoIconOffsetX,
      offsetY: logoIconOffsetY,
    } = logoIconStyle;
    const logoWidth = convertToNumber(logoIconWidth || logoIconFontSize);
    const logoHeight = convertToNumber(logoIconWidth || logoIconFontSize);
    const logoIconShapeType = logoIconText ? 'text' : 'image';

    // calculate logo position
    const logoX =
      convertToNumber(x) -
      convertToNumber(width) / 2 +
      logoIconOffsetX +
      width / 10 -
      logoIconWidth / 2;

    const logoY = logoIconText
      ? logoIconOffsetY
      : convertToNumber(y) -
        convertToNumber(logoIconHeight) / 2 +
        logoIconOffsetY;

    if (logoIconText) {
      logoIconStyle.textAlign = 'center';
      logoIconStyle.textBaseline = 'middle';
    }

    return this.upsertShape(
      logoIconShapeType,
      'logoIcon',
      {
        width: logoWidth,
        height: logoHeight,
        x: logoX,
        y: logoY,
        ...logoIconStyle,
      },
      shapeMap,
      model,
    );
  }

  private drawDescriptionShape(
    descriptionStyle,
    keyShapeStyle,
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
  ) {
    if (!descriptionStyle || !descriptionStyle.show) return;
    const { width, height } = keyShapeStyle;
    const {
      fontSize: descFontSize,
      offsetX: descOffsetX,
      offsetY: descOffsetY,
    } = descriptionStyle;

    const logoIconBBox = shapeMap['logoIcon']?.getBBox();
    const defaultLabelFontSize = Math.min(height, width) / 5;
    const defaultDescriptionX = -width / 2 + logoIconBBox?.width + width / 10;
    const defaultWordWrapWidth =
      width / 2 - defaultDescriptionX - defaultLabelFontSize * 2;
    const defaultDescriptionFontSize = defaultLabelFontSize / 2;

    return this.upsertShape(
      'text',
      'description',
      {
        fontSize: descFontSize || defaultDescriptionFontSize,
        x: defaultDescriptionX + descOffsetX,
        y: 0 + height / 6 + descOffsetY,
        wordWrap: true,
        wordWrapWidth: defaultWordWrapWidth,
        ...descriptionStyle,
      },
      shapeMap,
      model,
    );
  }

  private drawStateIcon(
    stateIconStyle,
    keyShapeStyle,
    model: NodeDisplayModel | ComboDisplayModel,
    shapeMap: NodeShapeMap | ComboShapeMap,
  ) {
    if (!stateIconStyle || !stateIconStyle.show) return;
    const { x, y, width } = keyShapeStyle;
    const {
      width: stateIconWidth,
      height: stateIconHeight,
      fontSize: stateIconFontSize,
      text: stateIconText,
      offsetX: stateIconOffsetX,
      offsetY: stateIconOffsetY,
    } = stateIconStyle;
    const stateWidth = convertToNumber(stateIconWidth || stateIconFontSize);
    const stateHeight = convertToNumber(stateIconWidth || stateIconFontSize);
    const stateIconShapeType = stateIconText ? 'text' : 'image';

    // Calculate state position
    const stateX =
      convertToNumber(x) +
      convertToNumber(width) / 2 -
      stateIconWidth +
      stateIconOffsetX;
    const stateY = stateIconText
      ? stateIconOffsetY
      : convertToNumber(y) -
        convertToNumber(stateIconHeight || stateIconFontSize) / 2 +
        stateIconOffsetY;

    if (stateIconText) {
      stateIconStyle.textAlign = 'center';
      stateIconStyle.textBaseline = 'middle';
    }

    return this.upsertShape(
      stateIconShapeType,
      'stateIcon',
      {
        width: stateWidth,
        height: stateHeight,
        x: stateX,
        y: stateY,
        ...stateIconStyle,
      },
      shapeMap,
      model,
    );
  }
}
