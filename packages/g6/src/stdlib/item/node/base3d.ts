import { DisplayObject } from '@antv/g';
import { DEFAULT_LABEL_BG_PADDING } from '../../../constant';
import { NodeDisplayModel } from '../../../types';
import { ItemShapeStyles, State } from '../../../types/item';
import { NodeModelData, NodeShapeMap } from '../../../types/node';
import {
  formatPadding,
  mergeStyles,
  upsertShape,
} from '../../../util/shape';
import { upsertShape3D } from '../../../util/shape3d';
import { BaseNode } from './base';

export abstract class BaseNode3D extends BaseNode {
  type: string;
  defaultStyles: ItemShapeStyles;
  themeStyles: ItemShapeStyles;
  mergedStyles: ItemShapeStyles;
  device: any; // for 3d renderer
  constructor(props) {
    super(props);
    this.device = props.device;
  }

  // TODO: 3d text - billboard 2d shape
  public drawLabelShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { oldState: State[], newState: State[] }
  ): {
    labelShape: DisplayObject;
    [id: string]: DisplayObject;
  } {
    const { keyShape } = shapeMap;
    const keyShapeBox = keyShape.getGeometryBounds();
    const { labelShape: shapeStyle } = this.mergedStyles;

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

    const style: any = {
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
      const bgStyle: any = {
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

  // TODO: 3d icon? - billboard image or text for alpha
  public drawIconShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { oldState: State[], newState: State[] }
  ): DisplayObject {
    const { iconShape } = model.data || {};
    const { iconShape: shapeStyle } = this.mergedStyles;
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

  // TODO: 3d shapes?
  public drawOtherShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[], current: State[] }
  ): { [id: string]: DisplayObject; } {
    return {}
  }

  // TODO: 如何禁止重写？
  public upsertShape(
    type: string,
    id: string,
    style: { [shapeAttr: string]: unknown },
    shapeMap: { [shapeId: string]: DisplayObject },
  ): DisplayObject {
    return upsertShape3D(type, id, style, shapeMap, this.device);
  };
}
