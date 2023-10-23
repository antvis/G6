import { DisplayObject, HTML } from '@antv/g';
import type { NodeDisplayModel } from '@antv/g6';
import { Extensions } from '@antv/g6';
import type { State } from '@antv/g6/lib/types/item';
import type { NodeShapeMap, NodeUserModelData } from '@antv/g6/lib/types/node';
import React from 'react';
import { createRoot } from 'react-dom/client';

const ShapeCollection: Record<string, any> = new Map();

export const createReactNode = (
  Component: (props: {
    model?: NodeDisplayModel;
    states?: State[];
  }) => React.ReactNode,
) => {
  class ReactNode extends Extensions.RectNode {
    drawKeyShape(
      model: NodeDisplayModel,
      shapeMap: NodeShapeMap,
      diffData?:
        | { previous: NodeUserModelData; current: NodeUserModelData }
        | undefined,
      diffState?: { previous: State[]; current: State[] } | undefined,
    ): DisplayObject<any, any> {
      const { data } = model;
      const { size: [width, height] = [200, 50] } = data as any;

      const html = this.upsertShape(
        'html',
        'keyShape',
        {
          x: -width / 2,
          y: -height / 2,
          width,
          height,
          anchor: '0.5 0.5',
        },
        shapeMap,
        model,
      ) as HTML;

      html.isMutationObserved = true;
      html.addEventListener('DOMNodeInserted', () => {
        const dom = html.getDomElement();
        const content = (
          <Component model={model} states={diffState?.current || []} />
        );
        const root = createRoot(dom);
        root.render(content);
      });

      html.getRenderBounds = html.getBounds;

      ShapeCollection.set(model.id, html);

      return html;
    }
  }

  return ReactNode;
};
