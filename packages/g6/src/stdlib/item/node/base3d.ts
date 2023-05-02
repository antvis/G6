import { DisplayObject } from '@antv/g';
import { DEFAULT_LABEL_BG_PADDING } from '../../../constant';
import { NodeDisplayModel } from '../../../types';
import {
  GShapeStyle,
  ItemShapeStyles,
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
  defaultStyles: ItemShapeStyles;
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
    return super.drawLabelShape(model, shapeMap, diffData, diffState);
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
}
