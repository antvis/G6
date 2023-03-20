import { DisplayObject, Line, Polyline } from '@antv/g';
import { isNumber } from '@antv/util';
import { DEFAULT_LABEL_BG_PADDING, OTHER_SHAPES_FIELD_NAME, RESERVED_SHAPE_IDS } from '../../../constant';
import { Point } from '../../../types/common';
import {
  EdgeDisplayModel,
  EdgeModelData,
  EdgeShapeMap,
} from '../../../types/edge';
import { ItemShapeStyles, ShapeStyle, State } from '../../../types/item';
import {
  formatPadding,
  mergeStyles,
  upsertShape,
} from '../../../util/shape';

export abstract class BaseEdge {
  type: string;
  defaultStyles: ItemShapeStyles = {};
  themeStyles: ItemShapeStyles;
  mergedStyles: ItemShapeStyles;
  constructor(props) {
    const { themeStyles } = props;
    if (themeStyles) this.themeStyles = themeStyles;
  }
  private mergeStyles(model: EdgeDisplayModel) {
    this.mergedStyles = this.getMergedStyles(model);
  }
  public getMergedStyles(model: EdgeDisplayModel) {
    const { data } = model;
    const dataStyles = {} as ItemShapeStyles;
    Object.keys(data).forEach(fieldName => {
      if (RESERVED_SHAPE_IDS.includes(fieldName)) dataStyles[fieldName] = data[fieldName] as ShapeStyle;
      else if (fieldName === OTHER_SHAPES_FIELD_NAME) {
        Object.keys(data[fieldName]).forEach(otherShapeId => dataStyles[otherShapeId] = data[fieldName][otherShapeId]);
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
    diffState?: { previous: State[], current: State[] }
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
    diffState?: { previous: State[], current: State[] }
  ): {
    labelShape: DisplayObject;
    [id: string]: DisplayObject;
  } {
    const { keyShape } = shapeMap;

    const { labelShape: shapeStyle } = this.mergedStyles;
    const {
      position,
      background,
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

    const point = (keyShape as Line | Polyline).getPoint(positionPreset.pointRatio[0]);
    let positionStyle: any = { x: point.x, y: point.y };
    if (autoRotate) {
      const pointOffset = (keyShape as Line | Polyline).getPoint(positionPreset.pointRatio[1]);
      const angle = Math.atan((point.y - pointOffset.y) / (point.x - pointOffset.x)); // TODO: NaN
      const offsetX = propsOffsetX === undefined ? positionPreset.offsetX : propsOffsetX;
      const offsetY = propsOffsetY === undefined ? positionPreset.offsetY : propsOffsetY;
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
    const style = {
      ...this.defaultStyles.labelShape,
      textAlign: positionPreset.textAlign,
      ...positionStyle,
      ...otherStyle,
    };

    const labelShape = upsertShape('text', 'labelShape', style, shapeMap);
    const shapes = { labelShape };
    if (background) {
      const textBBox = labelShape.getGeometryBounds();
      const { padding: propsPadding, ...backgroundStyle } = background;
      const padding = formatPadding(propsPadding, DEFAULT_LABEL_BG_PADDING);
      const bgStyle = {
        fill: '#fff',
        radius: 4,
        ...backgroundStyle,
        x: textBBox.min[0] - padding[3] + style.x,
        y: textBBox.min[1] - padding[0] + style.y,
        width: textBBox.max[0] - textBBox.min[0] + padding[1] + padding[3],
        height: textBBox.max[1] - textBBox.min[1] + padding[0] + padding[2],
        transform: positionStyle.transform,
        transformOrigin: 'center',
      };
      if (position === 'start') {
        bgStyle.transformOrigin = `${padding[3]} ${padding[0] + bgStyle.height / 2}`;
      }
      if (position === 'end') {
        bgStyle.transformOrigin = `${padding[3] + bgStyle.width} ${
          padding[0] + bgStyle.height / 2
        }`;
      }

      shapes['labelBgShape'] = upsertShape('rect', 'labelBgShape', bgStyle, shapeMap);
    }
    return shapes;
  }

  public drawIconShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[], current: State[] }
  ): DisplayObject {
    const { labelShape, labelBgShape, keyShape } = shapeMap;
    const { iconShape: shapeStyle, labelShape: labelShapeProps } = this.mergedStyles;

    const iconShapeType = shapeStyle.text ? 'text' : 'image';
    if (iconShapeType === 'text') {
      shapeStyle.textAlign = 'left';
      shapeStyle.textBaseline = 'top';
    }
    const { width, height, fontSize } = shapeStyle;
    const w = (width || fontSize) as number;
    const h = (height || fontSize) as number;

    if (labelShapeProps) {
      const referShape = labelBgShape || labelShape;
      const { min: referMin, halfExtents: referHalExtents } = referShape.getGeometryBounds();
      const {
        x: referX,
        y: referY,
        transform: referTransform,
        textAlign: labelAlign,
      } = referShape.attributes;
      shapeStyle.x = referMin[0] - w - 4 + referX;
      shapeStyle.y = referMin[1] + 2 + referY;
      if (referTransform) {
        shapeStyle.transform = referTransform;
        if (labelAlign === 'right') {
          shapeStyle.transformOrigin = `${w + 4 + referHalExtents[0] * 2}px ${h / 2}px`;
        } else if (labelAlign === 'left') {
          shapeStyle.transformOrigin = `${w + 4}px ${h / 2}px`;
        } else {
          // labelShape align 'center'
          shapeStyle.transformOrigin = `${w + 4 + referHalExtents[0]}px ${h / 2}px`;
        }
      }
    } else {
      const midPoint = (keyShape as Line | Polyline).getPoint(0.5);
      shapeStyle.x = midPoint.x;
      shapeStyle.y = midPoint.y;
      // TODO: rotate
    }

    return upsertShape(iconShapeType, 'iconShape', shapeStyle, shapeMap);
  }
}
