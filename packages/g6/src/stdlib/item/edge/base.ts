import { AABB, DisplayObject, Line, Polyline } from '@antv/g';
import { isNumber } from '@antv/util';
import {
  DEFAULT_LABEL_BG_PADDING,
  OTHER_SHAPES_FIELD_NAME,
  RESERVED_SHAPE_IDS,
} from '../../../constant';
import { Point } from '../../../types/common';
import {
  EdgeDisplayModel,
  EdgeModelData,
  EdgeShapeMap,
  EdgeShapeStyles,
} from '../../../types/edge';
import {
  GShapeStyle,
  SHAPE_TYPE,
  ShapeStyle,
  State,
} from '../../../types/item';
import {
  formatPadding,
  isStyleAffectBBox,
  mergeStyles,
  upsertShape,
} from '../../../util/shape';

export abstract class BaseEdge {
  type: string;
  defaultStyles: EdgeShapeStyles = {};
  themeStyles: EdgeShapeStyles;
  mergedStyles: EdgeShapeStyles;
  labelPosition: {
    x: number;
    y: number;
    transform: string;
    isRevert: boolean;
  };
  boundsCache: {
    labelShapeGeometry?: AABB;
    labelBackgroundShapeGeometry?: AABB;
  };
  constructor(props) {
    const { themeStyles } = props;
    if (themeStyles) this.themeStyles = themeStyles;
    this.boundsCache = {};
  }
  public mergeStyles(model: EdgeDisplayModel) {
    this.mergedStyles = this.getMergedStyles(model);
  }
  public getMergedStyles(model: EdgeDisplayModel) {
    const { data } = model;
    const dataStyles = {} as EdgeShapeStyles;
    Object.keys(data).forEach((fieldName) => {
      if (RESERVED_SHAPE_IDS.includes(fieldName))
        dataStyles[fieldName] = data[fieldName] as ShapeStyle;
      else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
        Object.keys(data[fieldName]).forEach(
          (otherShapeId) =>
            (dataStyles[otherShapeId] = data[fieldName][otherShapeId]),
        );
      }
    });
    return mergeStyles([this.themeStyles, this.defaultStyles, dataStyles]);
  }
  abstract draw(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: { [shapeId: string]: DisplayObject },
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    keyShape: DisplayObject;
    labelShape?: DisplayObject;
    iconShape?: DisplayObject;
    [otherShapeId: string]: DisplayObject;
  };
  public afterDraw(
    model: EdgeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    shapesChanged?: string[],
  ): { [otherShapeId: string]: DisplayObject } {
    return {};
  }
  // shouldUpdate: (model: EdgeDisplayModel, prevModel: EdgeDisplayModel) => boolean = () => true;
  public setState: (
    name: string,
    value: boolean,
    shapeMap: { [shapeId: string]: DisplayObject },
  ) => void;

  public drawLabelShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;

    const { labelShape: shapeStyle } = this.mergedStyles;
    const {
      position,
      offsetX: propsOffsetX,
      offsetY: propsOffsetY,
      autoRotate = true,
      ...otherStyle
    } = shapeStyle;

    const positionPreset = {
      textAlign: 'center',
      offsetX: 0,
      offsetY: 0,
      pointRatio: [0.5, 0.501],
    };
    if (isNumber(position)) {
      positionPreset.pointRatio = [position, position + 0.01];
    }
    switch (position) {
      case 'start':
        positionPreset.pointRatio = [0, 0.01];
        positionPreset.textAlign = 'left';
        positionPreset.offsetX = 4;
        break;
      case 'end':
        positionPreset.pointRatio = [0.99, 1];
        positionPreset.textAlign = 'right';
        positionPreset.offsetX = -4;
        break;
      default: // at middle by default
        break;
    }

    const point = (keyShape as Line | Polyline).getPoint(
      positionPreset.pointRatio[0],
    );
    let positionStyle: any = { x: point.x, y: point.y };
    let isRevert = false;
    if (autoRotate) {
      const pointOffset = (keyShape as Line | Polyline).getPoint(
        positionPreset.pointRatio[1],
      );
      const angle = Math.atan(
        (point.y - pointOffset.y) / (point.x - pointOffset.x),
      ); // TODO: NaN

      // revert
      isRevert = pointOffset.x < point.x;
      if (isRevert) {
        if (position === 'start') {
          positionPreset.textAlign = 'right';
          positionPreset.offsetX = -4;
        } else if (position === 'end') {
          positionPreset.textAlign = 'left';
          positionPreset.offsetX = 4;
        }
      }
      const offsetX = (
        propsOffsetX === undefined ? positionPreset.offsetX : propsOffsetX
      ) as number;
      const offsetY = (
        propsOffsetY === undefined ? positionPreset.offsetY : propsOffsetY
      ) as number;
      // the projection is |offsetX| away from point, along the tangent line of the keyShape's path at point
      const projection = {
        x: point.x + offsetX * Math.cos(angle),
        y: point.y + offsetX * Math.sin(angle),
      };
      // the position of the text is |offsetY| away from projection, along the vertical line of the tangent line at point
      positionStyle = {
        x: projection.x + offsetY * Math.cos(Math.PI - angle),
        y: projection.y + offsetY * Math.sin(Math.PI - angle),
        transform: `rotate(${(angle / Math.PI) * 180})`,
      };
    }
    this.labelPosition = {
      ...positionStyle,
      isRevert,
    };
    const style = {
      ...this.defaultStyles.labelShape,
      textAlign: positionPreset.textAlign,
      ...positionStyle,
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
      this.boundsCache.labelShapeGeometry = shape.getGeometryBounds();
    }
    return shape;
  }

  public drawLabelBackgroundShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { labelShape } = shapeMap;
    if (!labelShape || !model.data.labelShape) return;

    const { labelBackgroundShape, labelShape: labelShapeStyle } =
      this.mergedStyles;

    const textBBox =
      this.boundsCache.labelShapeGeometry || labelShape.getGeometryBounds();
    const { x, y, transform, isRevert } = this.labelPosition;
    const { padding: propsPadding, ...backgroundStyle } = labelBackgroundShape;
    const padding = formatPadding(propsPadding, DEFAULT_LABEL_BG_PADDING);
    const textWidth = textBBox.max[0] - textBBox.min[0];
    const textHeight = textBBox.max[1] - textBBox.min[1];
    const bgStyle = {
      fill: '#fff',
      ...backgroundStyle,
      x: textBBox.min[0] - padding[3] + x,
      y: textBBox.min[1] - padding[0] + y,
      width: textWidth + padding[1] + padding[3],
      height: textHeight + padding[0] + padding[2],
      transform: transform,
    };
    if (labelShapeStyle.position === 'start') {
      if (isRevert) {
        bgStyle.transformOrigin = `${bgStyle.width - padding[1]} ${
          bgStyle.height / 2
        }`;
      } else {
        bgStyle.transformOrigin = `${padding[3]} ${bgStyle.height / 2}`;
      }
    } else if (labelShapeStyle.position === 'end') {
      if (isRevert) {
        bgStyle.transformOrigin = `${padding[3]} ${bgStyle.height / 2}`;
      } else {
        bgStyle.transformOrigin = `${bgStyle.width - padding[1]} ${
          bgStyle.height / 2
        }`;
      }
    } else {
      bgStyle.transformOrigin = `${textWidth / 2 + padding[3]} ${
        textHeight / 2 + padding[0]
      }`;
    }

    const { shape, updateStyles } = this.upsertShape(
      'rect',
      'labelBackgroundShape',
      bgStyle,
      shapeMap,
      model,
    );
    if (isStyleAffectBBox('rect', updateStyles)) {
      this.boundsCache.labelBackgroundShapeGeometry = shape.getGeometryBounds();
    }
    return shape;
  }

  public drawIconShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { labelShape, labelBackgroundShape, keyShape } = shapeMap;
    const { iconShape: shapeStyle, labelShape: labelShapeProps } =
      this.mergedStyles;

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
    if (iconShapeType === 'text') {
      shapeStyle.textAlign = 'left';
      shapeStyle.textBaseline = 'top';
      shapeStyle.fontSize = w;
    } else {
      shapeStyle.width = w;
      shapeStyle.height = h;
    }

    if (labelShapeProps) {
      const referShape = labelBackgroundShape || labelShape;
      const referBounds =
        this.boundsCache.labelBackgroundShapeGeometry ||
        this.boundsCache.labelShapeGeometry ||
        referShape.getGeometryBounds();
      const {
        min: referMin,
        max: referMax,
        halfExtents: referHalExtents,
      } = referBounds;
      const referHeight = referMax[1] - referMin[1];
      const referWidth = referMax[0] - referMin[0];
      const {
        x: referX,
        y: referY,
        transform: referTransform,
      } = referShape.attributes;
      const { textAlign: labelAlign } = labelShape.attributes;
      shapeStyle.x = referMin[0] - w + 4 + referX + offsetX;
      shapeStyle.y = referMin[1] + (referHeight - h) / 2 + referY + offsetY;
      if (referTransform) {
        shapeStyle.transform = referTransform;
        if (labelAlign === 'right') {
          shapeStyle.transformOrigin = `${
            referWidth / 2 - w / 2 + 4 + referHalExtents[0] - offsetX
          } ${h / 2 - offsetY}`;
        } else if (labelAlign === 'left') {
          shapeStyle.transformOrigin = `${w + 4 - offsetX} ${h / 2 - offsetY}`;
        } else {
          // labelShape align 'center'
          shapeStyle.transformOrigin = `${(w + referWidth) / 2 - offsetX} ${
            h / 2 - offsetY
          }`;
        }
      }
    } else {
      const midPoint = (keyShape as Line | Polyline).getPoint(0.5);
      shapeStyle.x = midPoint.x + offsetX;
      shapeStyle.y = midPoint.y + offsetY;
      // TODO: rotate
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
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
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

  public upsertShape(
    type: SHAPE_TYPE,
    id: string,
    style: ShapeStyle,
    shapeMap: { [shapeId: string]: DisplayObject },
    model: EdgeDisplayModel,
  ): {
    updateStyles: ShapeStyle;
    shape: DisplayObject;
  } {
    return upsertShape(type, id, style as GShapeStyle, shapeMap, model);
  }
}
