import { DisplayObject } from '@antv/g';
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
import { upsertShape3D } from '../../../util/shape3d';
import { BaseNode } from './base';

export abstract class BaseNode3D extends BaseNode {
  type: string;
  defaultStyles: NodeShapeStyles;
  themeStyles: NodeShapeStyles;
  mergedStyles: NodeShapeStyles;
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
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    const { r, width, height, depth, x, y, z } = keyShape.attributes;
    const keyShapeBox = {
      center: [x, y, z],
      min: [x - r || width / 2, y - r || height / 2, z - r || depth / 2],
      max: [x + r || width / 2, y + r || height / 2, z + r || depth / 2],
    };
    const { labelShape: shapeStyle } = this.mergedStyles;
    const {
      position,
      offsetX: propsOffsetX,
      offsetY: propsOffsetY,
      maxWidth,
      ...otherStyle
    } = shapeStyle;

    // TODO
    // const wordWrapWidth = getWordWrapWidthByBox(
    //   keyShapeBox,
    //   maxWidth,
    //   this.zoomCache.zoom,
    // );

    const positionPreset = {
      x: keyShapeBox.center[0],
      y: keyShapeBox.max[1],
      z: keyShapeBox.center[2],
      textBaseline: 'top',
      textAlign: 'center',
      offsetX: 0,
      offsetY: 0,
      // wordWrapWidth,
    };
    switch (position) {
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
        positionPreset.offsetX = -8;
        break;
      case 'right':
        positionPreset.x = keyShapeBox.max[0];
        positionPreset.y = keyShapeBox.center[1];
        positionPreset.textAlign = 'left';
        positionPreset.textBaseline = 'middle';
        positionPreset.offsetX = 8;
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
      isBillboard: true,
      ...otherStyle,
    };

    return this.upsertShape('text', 'labelShape', style, shapeMap);
  }

  // TODO: 3d icon? - billboard image or text for alpha
  public drawIconShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    return super.drawIconShape(model, shapeMap, diffData, diffState);
  }

  // TODO: 3d billboard
  public drawHaloShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    const { keyShape } = shapeMap;
    const { haloShape: haloShapeStyle } = this.mergedStyles;
    if (haloShapeStyle.visible === false) return;
    const { nodeName, attributes } = keyShape;
    return this.upsertShape(
      nodeName as SHAPE_TYPE,
      'haloShape',
      {
        ...attributes,
        stroke: attributes.fill,
        ...haloShapeStyle,
      },
      shapeMap,
    );
  }

  /**
   * 3D node does not support anchor shapes.
   * @param model
   * @param shapeMap
   * @param diffData
   * @param diffState
   * @returns
   */
  public drawAnchorShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    [shapeId: string]: DisplayObject;
  } {
    return {};
  }

  public drawBadgeShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    [shapeId: string]: DisplayObject;
  } {
    return super.drawBadgeShapes(model, shapeMap, diffData, diffState);
  }

  // TODO: 3d shapes?
  public drawOtherShapes(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): { [id: string]: DisplayObject } {
    return {};
  }

  // TODO: 如何禁止重写？
  public upsertShape(
    type: SHAPE_TYPE_3D | SHAPE_TYPE,
    id: string,
    style: ShapeStyle,
    shapeMap: { [shapeId: string]: DisplayObject },
  ): DisplayObject {
    return upsertShape3D(type, id, style as GShapeStyle, shapeMap, this.device);
  }

  public onZoom = (shapeMap: NodeShapeMap, zoom: number) => {};
}
