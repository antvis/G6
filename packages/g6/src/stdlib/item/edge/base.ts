import { DisplayObject, Line, Polyline } from '@antv/g';
import { isNumber } from '_@antv_util@3.3.2@@antv/util';
import { Point } from '../../../types/common';
import {
  EdgeDisplayModel,
  EdgeLabelShapeStyle,
  EdgeModelData,
  EdgeShapeMap,
} from '../../../types/edge';
import { ShapeStyle } from '../../../types/item';
import { upsertShape } from '../../../util/shape';

export abstract class BaseEdge {
  type: string;
  defaultStyles: {
    keyShape: ShapeStyle;
    labelShape: EdgeLabelShapeStyle;
    iconShape: ShapeStyle;
    otherShapes: {
      [shapeId: string]: ShapeStyle;
    };
  };
  abstract draw(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: { [shapeId: string]: DisplayObject },
    diffData?: { oldData: EdgeModelData; newData: EdgeModelData },
  ): {
    keyShape: DisplayObject;
    labelShape?: DisplayObject;
    iconShape?: DisplayObject;
    [otherShapeId: string]: DisplayObject;
  };
  afterDraw: (
    model: EdgeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject },
    shapesChanged?: string[],
  ) => void;
  // shouldUpdate: (model: EdgeDisplayModel, prevModel: EdgeDisplayModel) => boolean = () => true;
  setState: (name: string, value: boolean, shapeMap: { [shapeId: string]: DisplayObject }) => void;

  public drawLabelShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { oldData: EdgeModelData; newData: EdgeModelData },
  ): {
    labelShape: DisplayObject;
    [id: string]: DisplayObject;
  } {
    const { keyShape } = shapeMap;

    const shapeStyle = Object.assign({}, this.defaultStyles.labelShape, model.data?.labelShape);
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
      textBaseline: 'middle',
      textAlign: positionPreset.textAlign,
      ...positionStyle,
      ...otherStyle,
    };

    const labelShape = upsertShape('text', 'labelShape', style, shapeMap);
    const shapes = { labelShape };
    if (background) {
      // TODO: zeros, how to estimate the bbox before being appended to group
      const textBBox = labelShape.getGeometryBounds();
      console.log('textBBoxxxxxx', textBBox);
      const { padding = [4, 4, 4, 4], ...backgroundStyle } = background;
      debugger;
      shapes['labelBgShape'] = upsertShape(
        'rect',
        'labelBgShape',
        {
          fill: '#fff',
          radius: 4,
          ...backgroundStyle,
          x: textBBox.min[0] - padding[3],
          y: textBBox.min[1] - padding[0],
          width: textBBox.max[0] - textBBox.min[0] + padding[1] + padding[3],
          height: textBBox.max[1] - textBBox.min[1] + padding[0] + padding[2],
        },
        shapeMap,
      );
    }

    console.log('label', shapes);
    return shapes;
  }

  public drawIconShape(
    model: EdgeDisplayModel,
    shapeMap: EdgeShapeMap,
    diffData?: { oldData: EdgeModelData; newData: EdgeModelData },
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
