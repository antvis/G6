import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { ShapeStyle } from '../../../types/item';
import { NodeLabelShapeStyle, NodeModelData, NodeShapeMap } from '../../../types/node';
import { upsertShape } from '../../../util/shape';

export abstract class BaseNode {
  type: string;
  defaultStyles: {
    keyShape: ShapeStyle;
    labelShape: NodeLabelShapeStyle;
    iconShape: ShapeStyle;
    otherShapes: {
      [shapeId: string]: ShapeStyle;
    };
  };
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

  afterDraw: (
    model: NodeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    shapesChanged?: string[],
  ) => { [otherShapeId: string]: DisplayObject };
  // shouldUpdate: (model: NodeDisplayModel, prevModel: NodeDisplayModel) => boolean = () => true;
  setState: (name: string, value: boolean, shapeMap: { [shapeId: string]: DisplayObject }) => void;

  public drawLabelShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    const keyShapeBox = keyShape.getGeometryBounds();
    const shapeStyle = Object.assign({}, this.defaultStyles.labelShape, model.data?.labelShape);
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
      ...positionPreset,
      ...otherStyle,
    };
    return upsertShape('text', 'labelShape', style, shapeMap);
  }

  public drawIconShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ): DisplayObject {
    const { iconShape } = model.data || {};
    const shapeStyle = Object.assign({}, this.defaultStyles.iconShape, model.data?.iconShape);
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
