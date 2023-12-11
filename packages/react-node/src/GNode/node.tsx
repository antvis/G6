import type { DisplayObject } from '@antv/g';
import type { ComboModelData, NodeDisplayModel, NodeModelData } from '@antv/g6';
import { Extensions } from '@antv/g6';
import type { State } from '@antv/g6/lib/types/item';
import { NodeShapeMap } from '@antv/g6/lib/types/node';
import { render } from '@antv/react-g';
import React from 'react';

const Ctors = {
  rect: Extensions.RectNode,
  circle: Extensions.CircleNode,
} as const;

export const createReactGNode = (
  Component: (props: {
    model?: NodeDisplayModel;
    states?: State[];
  }) => React.ReactElement,
  shape: keyof typeof Ctors = 'rect',
): any => {
  const Ctor: any = Ctors[shape];
  class GNode extends Ctor {
    drawKeyShape(
      model: NodeDisplayModel,
      shapeMap: NodeShapeMap,
      diffData?:
        | {
            previous: NodeModelData | ComboModelData;
            current: NodeModelData | ComboModelData;
          }
        | undefined,
      diffState?: { previous: State[]; current: State[] } | undefined,
    ): DisplayObject<any, any> {
      const { data } = model;
      const { size: [width, height] = [0, 0] } = data as any;
      return this.upsertShape(
        shape,
        'keyShape',
        {
          x: -width / 2,
          y: -height / 2,
          width,
          height,
          fill: 'opacity',
          stroke: 'opacity',
          lineWidth: 0,
        },
        { shapeMap, model, diffData, diffState },
      );
    }
    drawOtherShapes(
      model: NodeDisplayModel,
      shapeMap: NodeShapeMap,
      diffData?:
        | {
            previous: NodeModelData | ComboModelData;
            current: NodeModelData | ComboModelData;
          }
        | undefined,
      diffState?: { previous: State[]; current: State[] } | undefined,
    ): { [id: string]: DisplayObject<any, any> } {
      const { id, data } = model;
      const {
        size: [width, height],
      } = data as any;

      const groupId = `${id}-group`;
      const group = this.upsertShape(
        'group',
        groupId,
        {
          x: -width / 2,
          y: -height / 2,
          width,
          height,
        },
        { shapeMap, model, diffData, diffState },
      );
      group.isMutationObserved = true;
      group.addEventListener('DOMNodeInsertedIntoDocument', () => {
        const content = (
          <Component model={model} states={diffState?.current || []} />
        );
        render(content, group);
      });
      group.addEventListener('destroy', () => {
        group.removeAllEventListeners();
      });

      return {
        [groupId]: group,
      };
    }
  }

  return GNode;
};
