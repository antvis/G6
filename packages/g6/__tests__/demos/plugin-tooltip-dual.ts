import type { IElementEvent, Tooltip } from '@antv/g6';
import { Graph } from '@antv/g6';

export const pluginTooltipDual: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node1', style: { x: 100, y: 100 } },
        { id: 'node2', style: { x: 200, y: 200 } },
      ],
      edges: [{ id: 'edge', source: 'node1', target: 'node2' }],
    },
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    plugins: [
      function () {
        return {
          key: 'tooltip-click',
          type: 'tooltip',
          trigger: 'click',
          getContent: (evt: any, items: any[]) => {
            return `<div>click ${items[0].id}</div>`;
          },
          onOpenChange: (open: boolean) => {
            const tooltip = this.getPluginInstance('tooltip-hover') as Tooltip;
            if (tooltip && open) tooltip.hide();
          },
        };
      },
      function () {
        return {
          key: 'tooltip-hover',
          type: 'tooltip',
          trigger: 'hover',
          enable: (e: IElementEvent) => {
            const tooltip = this.getPluginInstance('tooltip-click') as Tooltip;
            // @ts-expect-error access private property
            return e.target.id !== tooltip.currentTarget;
          },
          getContent: (evt: any, items: any[]) => {
            return `<div>hover ${items[0].id}</div>`;
          },
          onOpenChange: (open: boolean) => {
            const tooltip = this.getPluginInstance('tooltip-click') as Tooltip;
            if (tooltip && open) {
              tooltip.hide();
            }
          },
        };
      },
    ],
  });

  await graph.render();

  return graph;
};
