import type { TransformArray } from '@antv/g';
import { rad2deg } from '@antv/g';
import type { RuntimeContext } from '../runtime/types';
import type { NodeData } from '../spec';
import { idOf } from '../utils/id';
import { positionOf } from '../utils/position';
import { parseSize } from '../utils/size';
import { rad, subtract } from '../utils/vector';
import type { BaseTransformOptions } from './base-transform';
import { BaseTransform } from './base-transform';

/**
 * <zh/> 根据径向布局自动调整节点标签样式的配置项
 *
 * <en/> Options for automatically adjusting the style of node labels according to the radial layout
 */
export interface PlaceRadialLabelsOptions extends BaseTransformOptions {
  /**
   * <zh/> 偏移量
   *
   * <en/> Offset
   */
  offset?: number;
}

/**
 * <zh/> 根据径向布局自动调整节点标签样式，包括位置和旋转角度
 *
 * <en/> Automatically adjust the style of node labels according to the radial layout, including position and rotation angle
 */
export class PlaceRadialLabels extends BaseTransform<PlaceRadialLabelsOptions> {
  static defaultOptions: Partial<PlaceRadialLabelsOptions> = {
    offset: 5,
  };

  constructor(context: RuntimeContext, options: PlaceRadialLabelsOptions) {
    super(context, Object.assign({}, PlaceRadialLabels.defaultOptions, options));
  }

  private get ref(): NodeData {
    return this.context.model.getRootsData()[0];
  }

  public afterLayout() {
    const refPoint = positionOf(this.ref);

    const { graph, model } = this.context;
    const data = model.getData();

    data.nodes?.forEach((datum) => {
      if (idOf(datum) === idOf(this.ref)) return;

      const radian = rad(subtract(positionOf(datum), refPoint));
      const isLeft = Math.abs(radian) > Math.PI / 2;

      const isLeaf = !datum.children || datum.children.length === 0;
      const nodeHalfWidth = parseSize(graph.getElementRenderStyle(idOf(datum)).size)[0] / 2;
      const offset = (isLeaf ? 1 : -1) * (nodeHalfWidth + this.options.offset);

      const labelTransform: TransformArray = [
        ['translate', offset * Math.cos(radian), offset * Math.sin(radian)],
        ['rotate', isLeft ? rad2deg(radian) + 180 : rad2deg(radian)],
      ];

      model.updateNodeData([
        {
          id: idOf(datum),
          style: {
            labelTextAlign: isLeft === isLeaf ? 'right' : 'left',
            labelTextBaseline: 'middle',
            labelTransform,
          },
        },
      ]);
    });

    graph.draw();
  }
}
