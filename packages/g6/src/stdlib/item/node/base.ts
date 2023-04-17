import { AABB, DisplayObject, ImageStyleProps, TextStyleProps } from '@antv/g';
import {
  DEFAULT_LABEL_BG_PADDING,
  OTHER_SHAPES_FIELD_NAME,
  RESERVED_SHAPE_IDS,
} from '../../../constant';
import { NodeDisplayModel } from '../../../types';
import {
  GShapeStyle,
  SHAPE_TYPE,
  SHAPE_TYPE_3D,
  ShapeStyle,
  State,
} from '../../../types/item';
import {
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
} from '../../../types/node';
import {
  formatPadding,
  isStyleAffectBBox,
  mergeStyles,
  upsertShape,
} from '../../../util/shape';

export abstract class BaseNode {
  type: string;
  defaultStyles: NodeShapeStyles;
  themeStyles: NodeShapeStyles;
  mergedStyles: NodeShapeStyles;
  boundsCache: {
    keyShapeLocal?: AABB;
    labelShapeLocal?: AABB;
  };
  constructor(props) {
    const { themeStyles } = props;
    if (themeStyles) this.themeStyles = themeStyles;
    this.boundsCache = {};
  }
  public mergeStyles(model: NodeDisplayModel) {
    this.mergedStyles = this.getMergedStyles(model);
  }
  public getMergedStyles(model: NodeDisplayModel) {
    const { data } = model;
    const dataStyles = {} as NodeShapeStyles;
    Object.keys(data).forEach((fieldName) => {
      if (RESERVED_SHAPE_IDS.includes(fieldName)) {
        if (fieldName === 'BadgeShapes') {
          Object.keys(data[fieldName]).forEach(
            (badgeShapeId) =>
              (dataStyles[badgeShapeId] = data[fieldName][badgeShapeId]),
          );
        } else {
          dataStyles[fieldName] = data[fieldName] as ShapeStyle;
        }
      } else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
        Object.keys(data[fieldName]).forEach(
          (otherShapeId) =>
            (dataStyles[otherShapeId] = data[fieldName][otherShapeId]),
        );
      }
    });
    return mergeStyles([this.themeStyles, this.defaultStyles, dataStyles]);
  }
  abstract draw(
    model: NodeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    keyShape: DisplayObject;
    labelShape?: DisplayObject;
    iconShape?: DisplayObject;
    [otherShapeId: string]: DisplayObject;
  };

  public afterDraw(
    model: NodeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    shapesChanged?: string[],
  ): { [otherShapeId: string]: DisplayObject } {
    return {};
  }
  // shouldUpdate: (model: NodeDisplayModel, prevModel: NodeDisplayModel) => boolean = () => true;
  public setState: (
    name: string,
    value: boolean,
    shapeMap: { [shapeId: string]: DisplayObject },
  ) => void;

  abstract drawKeyShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject;

  public drawLabelShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { oldState: State[]; newState: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    this.boundsCache.keyShapeLocal =
      this.boundsCache.keyShapeLocal || keyShape.getLocalBounds();
    const keyShapeBox = this.boundsCache.keyShapeLocal;
    const { labelShape: shapeStyle } = this.mergedStyles;

    const {
      position,
      offsetX: propsOffsetX,
      offsetY: propsOffsetY,
      ...otherStyle
    } = shapeStyle;
    const positionPreset = {
      x: keyShapeBox.center[0],
      y: keyShapeBox.max[1],
      textBaseline: 'top',
      textAlign: 'center',
      offsetX: 0,
      offsetY: 0,
    };
    switch (position) {
      case 'center':
        positionPreset.y = keyShapeBox.center[1];
        break;
      case 'top':
        positionPreset.y = keyShapeBox.min[1];
        positionPreset.textBaseline = 'bottom';
        positionPreset.offsetY = -4;
        break;
      case 'left':
        positionPreset.x = keyShapeBox.min[0];
        positionPreset.y = keyShapeBox.center[1];
        positionPreset.textAlign = 'right';
        positionPreset.textBaseline = 'middle';
        positionPreset.offsetX = -4;
        break;
      case 'right':
        positionPreset.x = keyShapeBox.max[0];
        positionPreset.y = keyShapeBox.center[1];
        positionPreset.textAlign = 'left';
        positionPreset.textBaseline = 'middle';
        positionPreset.offsetX = 4;
        break;
      default: // at bottom by default
        positionPreset.offsetY = 4;
        break;
    }
    const offsetX = (
      propsOffsetX === undefined ? positionPreset.offsetX : propsOffsetX
    ) as number;
    const offsetY = (
      propsOffsetY === undefined ? positionPreset.offsetY : propsOffsetY
    ) as number;
    positionPreset.x += offsetX;
    positionPreset.y += offsetY;

    const style: any = {
      ...this.defaultStyles.labelShape,
      ...positionPreset,
      ...otherStyle,
    };
    const { shape, updateStyles } = this.upsertShape(
      'text',
      'labelShape',
      style,
      shapeMap,
      model,
    );

    if (isStyleAffectBBox('text', updateStyles)) {
      this.boundsCache.labelShapeLocal = undefined;
    }
    return shape;
  }

  public drawLabelBackgroundShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { oldState: State[]; newState: State[] },
  ): DisplayObject {
    const { labelShape } = shapeMap;
    if (!labelShape || !model.data.labelShape) return;
    this.boundsCache.labelShapeLocal =
      this.boundsCache.labelShapeLocal || labelShape.getLocalBounds();
    const { labelShapeLocal: textBBox } = this.boundsCache;

    const { padding: propsPadding, ...backgroundStyle } =
      this.mergedStyles.labelBackgroundShape;
    const padding = formatPadding(propsPadding, DEFAULT_LABEL_BG_PADDING);
    const bgStyle: any = {
      fill: '#fff',
      ...backgroundStyle,
      x: textBBox.min[0] - padding[3],
      y: textBBox.min[1] - padding[0],
      width: textBBox.max[0] - textBBox.min[0] + padding[1] + padding[3],
      height: textBBox.max[1] - textBBox.min[1] + padding[0] + padding[2],
    };
    const labelShapeAttr = labelShape.attributes;
    if (labelShapeAttr.transform) {
      bgStyle.transform = labelShapeAttr.transform;
      bgStyle.transformOrigin = 'center';
      if (labelShapeAttr.textAlign === 'left') {
        bgStyle.transformOrigin = `${padding[3]} ${
          padding[0] + bgStyle.height / 2
        }`;
      }
      if (labelShapeAttr.textAlign === 'right') {
        bgStyle.transformOrigin = `${padding[3] + bgStyle.width} ${
          padding[0] + bgStyle.height / 2
        }`;
      }
    }

    return this.upsertShape(
      'rect',
      'labelBackgroundShape',
      bgStyle,
      shapeMap,
      model,
    ).shape;
  }

  public drawIconShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { oldState: State[]; newState: State[] },
  ): DisplayObject {
    const { iconShape: shapeStyle } = this.mergedStyles;
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
      shapeStyle.x = -w / 2 + offsetX;
      shapeStyle.y = -h / 2 + offsetY;
      shapeStyle.width = w;
      shapeStyle.height = h;
    } else {
      shapeStyle.textAlign = 'center';
      shapeStyle.textBaseline = 'middle';
      shapeStyle.x = offsetX;
      shapeStyle.y = offsetY;
      shapeStyle.fontSize = w;
    }

    return this.upsertShape(
      iconShapeType,
      'iconShape',
      shapeStyle as GShapeStyle,
      shapeMap,
      model,
    ).shape;
  }

  public drawHaloShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    const { haloShape: haloShapeStyle } = this.mergedStyles;
    const { nodeName, attributes } = keyShape;
    return this.upsertShape(
      nodeName as SHAPE_TYPE,
      'haloShape',
      {
        ...attributes,
        ...haloShapeStyle,
        isBillboard: true,
      },
      shapeMap,
      model,
    ).shape;
  }

  public drawAnchorShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    [shapeId: string]: DisplayObject;
  } {
    const { anchorShapes: configs, keyShape: keyShapeStyle } =
      this.mergedStyles;
    const commonStyle = {};
    const individualConfigs = [];
    Object.keys(configs).forEach((key) => {
      const value = configs[key];
      if (typeof value === 'object' && value.position) {
        individualConfigs.push(value);
      } else {
        commonStyle[key] = value;
      }
    });

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
      shapes[id] = this.upsertShape(
        'circle',
        id,
        {
          cx: keyShapeWidth * (position[0] - 0.5),
          cy: keyShapeHeight * (position[1] - 0.5),
          fill,
          ...commonStyle,
          ...style,
        } as GShapeStyle,
        shapeMap,
        model,
      ).shape;
    });
    return shapes;
  }

  public drawBadgeShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    [shapeId: string]: DisplayObject;
  } {
    const configs = this.mergedStyles.badgeShapes;
    const commonStyle = {};
    const individualConfigs = [];
    Object.keys(configs).forEach((key) => {
      const value = configs[key];
      if (typeof value === 'object' && value.position) {
        individualConfigs.push(value);
      } else {
        commonStyle[key] = value;
      }
    });

    if (!individualConfigs.length) return {};
    this.boundsCache.keyShapeLocal =
      this.boundsCache.keyShapeLocal || shapeMap.keyShape.getLocalBounds();
    const { keyShapeLocal: keyShapeBBox } = this.boundsCache;
    const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
    const shapes = {};
    individualConfigs.forEach((config) => {
      const { position, ...individualStyle } = config;
      const id = `${position}BadgeShape`;
      const style = {
        ...commonStyle,
        ...individualStyle,
      };
      const {
        text = '',
        type,
        color,
        size = keyShapeWidth / 3,
        textColor,
        zIndex = 2,
        offsetX = 0,
        offsetY = 0,
        ...otherStyles
      } = style;

      const bgHeight = size as number;

      let pos = { x: 0, y: 0 };
      switch (position) {
        case 'rightTop':
          pos.x = keyShapeBBox.max[0] - bgHeight / 2 + offsetX;
          pos.y = keyShapeBBox.min[1] + size / 4 + offsetY;
          break;
        case 'right':
          pos.x = keyShapeBBox.max[0] - bgHeight / 2 + offsetX;
          pos.y = offsetY;
          break;
        case 'rightBottom':
        case 'bottomRight':
          pos.x = keyShapeBBox.max[0] - bgHeight / 2 + offsetX;
          pos.y = keyShapeBBox.max[1] - size / 4 + offsetY;
          break;
        case 'leftTop':
        case 'topLeft':
          pos.x = keyShapeBBox.min[0] + bgHeight / 2 + offsetX;
          pos.y = keyShapeBBox.min[1] + size / 4 + offsetY;
          break;
        case 'left':
          pos.x = keyShapeBBox.min[0] + bgHeight / 2 + offsetX;
          pos.y = offsetY;
          break;
        case 'leftBottom':
        case 'bottomLeft':
          pos.x = keyShapeBBox.min[0] + bgHeight / 2 + offsetX;
          pos.y = keyShapeBBox.max[1] - size / 4 + offsetY;
          break;
        case 'top':
          pos.x = offsetX;
          pos.y = keyShapeBBox.min[1] + size / 4;
          break;
        default:
          // bottom
          pos.x = offsetX;
          pos.y = keyShapeBBox.max[1] - size / 4;
          break;
      }

      // a radius rect (as container) + a text / icon
      shapes[id] = this.upsertShape(
        'text',
        id,
        {
          text,
          fill: textColor,
          fontSize: bgHeight - 2,
          x: pos.x,
          y: pos.y,
          ...otherStyles,
          textAlign: position.includes('right') ? 'left' : 'right',
          textBaseline: 'middle',
          zIndex: (zIndex as number) + 1,
        } as GShapeStyle,
        shapeMap,
        model,
      ).shape;
      const bbox = shapes[id].getLocalBounds();
      const bgShapeId = `${position}BadgeBackgroundShape`;
      const bgWidth =
        (text as string).length <= 1
          ? bgHeight
          : Math.max(bgHeight, bbox.max[0] - bbox.min[0]) + 8;
      shapes[bgShapeId] = this.upsertShape(
        'rect',
        bgShapeId,
        {
          text,
          fill: color,
          height: bgHeight,
          width: bgWidth,
          x: bbox.min[0] - 3, // begin at the border, minus half height
          y: bbox.min[1],
          radius: bgHeight / 2,
          zIndex,
          ...otherStyles,
        } as GShapeStyle,
        shapeMap,
        model,
      ).shape;
    });

    return shapes;
  }

  public drawOtherShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): { [id: string]: DisplayObject } {
    return {};
  }

  public upsertShape(
    type: SHAPE_TYPE | SHAPE_TYPE_3D,
    id: string,
    style: ShapeStyle,
    shapeMap: { [shapeId: string]: DisplayObject },
    model: NodeDisplayModel,
  ): {
    updateStyles: ShapeStyle;
    shape: DisplayObject;
  } {
    return upsertShape(
      type as SHAPE_TYPE,
      id,
      style as GShapeStyle,
      shapeMap,
      model,
    );
  }
}
