import { HTML } from '@antv/g';
import type { NodeDisplayModel } from '@antv/g6';
import { Extensions } from '@antv/g6';
import type { State } from '@antv/g6/lib/types/item';
import type { NodeShapeMap, NodeUserModelData } from '@antv/g6/lib/types/node';
import { throttle } from '@antv/util';
import React from 'react';
import { createRoot } from 'react-dom/client';

const ShapeCollection: Record<string, any> = new Map();

export const createReactNode = (
  Component: (props: {
    model?: NodeDisplayModel;
    states?: State[];
  }) => React.ReactElement,
): any => {
  class ReactNode extends Extensions.RectNode {
    drawKeyShape(
      model: NodeDisplayModel,
      shapeMap: NodeShapeMap,
      diffData?:
        | { previous: NodeUserModelData; current: NodeUserModelData }
        | undefined,
      diffState?: { previous: State[]; current: State[] } | undefined,
    ) {
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
          pointerEvents: 'auto',
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

        // drag logic
        dom.addEventListener('pointerdown', (event) => {
          const { clientX, clientY } = event;

          let baseX = clientX;
          let baseY = clientY;

          const onMouseMove = throttle(
            (event: PointerEvent) => {
              dom.style.userSelect = 'none';

              const diffX = event.clientX - baseX;
              const diffY = event.clientY - baseY;
              baseX = event.clientX;
              baseY = event.clientY;

              const node = this.graph.getNodeData(model.id);
              const { x: nodeX = 0, y: nodeY = 0 } = node?.data || {};

              this.graph.updateNodePosition(
                {
                  ...node,
                  data: { ...node?.data, x: nodeX + diffX, y: nodeY + diffY },
                },
                undefined,
                true,
              );
            },
            50,
            { leading: true, trailing: true },
          ) as EventListener;

          document.addEventListener('pointermove', onMouseMove);

          dom.addEventListener(
            'pointerup',
            () => {
              dom.style.userSelect = 'auto';
              document.removeEventListener('pointermove', onMouseMove);
            },
            { once: true },
          );
        });
      });

      html.addEventListener('destroy', () => {
        html.removeAllEventListeners();
        html.getDomElement().remove();
      });

      html.getRenderBounds = html.getBounds;

      ShapeCollection.set(model.id, html);

      return html;
    }
  }

  return ReactNode;
};
