import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { ShapeStyle } from '../../../types/item';
import { NodeLabelShapeStyle, NodeModelData, NodeShapeMap } from '../../../types/node';
import {
  DEFAULT_LABEL_BG_PADDING,
  DEFAULT_TEXT_STYLE,
  formatPadding,
  upsertShape,
} from '../../../util/shape';

export abstract class BaseNode {
  type: string;
  defaultStyles: {
    keyShape: ShapeStyle;
    labelShape: NodeLabelShapeStyle;
    iconShape: ShapeStyle;
    otherShapes: {
      [shapeId: string]: ShapeStyle;
    };
  } = {
    keyShape: {},
    labelShape: {
      ...DEFAULT_TEXT_STYLE,
      fill: '#000',
      position: 'bottom',
    },
    iconShape: {
      ...DEFAULT_TEXT_STYLE,
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ',
      width: 15,
      height: 15,
    },
    otherShapes: {},
  };
  protected getDefaultStyles() {
    return this.defaultStyles;
  }
  abstract draw(
    model: NodeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ): {
    keyShape: DisplayObject;
    labelShape?: DisplayObject;
    iconShape?: DisplayObject;
    [otherShapeId: string]: DisplayObject;
  };
  abstract drawKeyShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ): DisplayObject;

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

  public drawLabelShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ): {
    labelShape: DisplayObject;
    [id: string]: DisplayObject;
  } {
    const { keyShape } = shapeMap;
    const keyShapeBox = keyShape.getGeometryBounds();
    const shapeStyle = Object.assign({}, model.data?.labelShape);
    const {
      position,
      background,
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
    const offsetX = propsOffsetX === undefined ? positionPreset.offsetX : propsOffsetX;
    const offsetY = propsOffsetY === undefined ? positionPreset.offsetY : propsOffsetY;
    positionPreset.x += offsetX;
    positionPreset.y += offsetY;

    const style = {
      ...this.defaultStyles.labelShape,
      ...positionPreset,
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
      };
      if (style.stransform) {
        bgStyle.transform = style.transform;
        bgStyle.transformOrigin = 'center';
        if (style.textAlign === 'left') {
          bgStyle.transformOrigin = `${padding[3]} ${padding[0] + bgStyle.height / 2}`;
        }
        if (style.textAlign === 'right') {
          bgStyle.transformOrigin = `${padding[3] + bgStyle.width} ${
            padding[0] + bgStyle.height / 2
          }`;
        }
      }

      shapes['labelBgShape'] = upsertShape('rect', 'labelBgShape', bgStyle, shapeMap);
    }
    return shapes;
  }

  public drawIconShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ): DisplayObject {
    const { iconShape } = model.data || {};
    const shapeStyle = Object.assign({}, this.defaultStyles.iconShape, iconShape);
    const iconShapeType = shapeStyle.text ? 'text' : 'image';
    if (iconShapeType === 'image') {
      const { width, height } = shapeStyle;
      if (!iconShape.hasOwnProperty('x')) shapeStyle.x = -width / 2;
      if (!iconShape.hasOwnProperty('y')) shapeStyle.y = -height / 2;
    } else {
      shapeStyle.textAlign = 'center';
      shapeStyle.textBaseline = 'middle';
    }
    return upsertShape(iconShapeType, 'iconShape', shapeStyle, shapeMap);
  }
}
