import type { Element, ElementDatum, IElementEvent, IPointerEvent, NodeData } from '@/src';
import { Graph } from '@/src';

/**
 * Inspired by https://graphcommons.com/graphs/be8bc972-5b26-4f5c-837d-a34704f33a9e
 * Network Map of 🦄 Unicorns and Their 💰Investors
 * 1086 nodes, 1247 edges
 *
 * 10 VC firms in Silicon Valley funded 82% of all unicorns, 98% of all exited unicorns. Data from CB Insights, updated March 2020.
 * @param context - context
 * @returns - graph
 */
export const caseUnicornsInvestors: TestCase = async (context) => {
  const data = await fetch('https://assets.antv.antgroup.com/g6/unicorns-investors.json').then((res) => res.json());

  const size = (node: NodeData) => Math.max(...(node.style?.size as [number, number, number]));

  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        label: true,
        labelText: (d) => d.data?.name,
        labelBackground: true,
        icon: true,
        iconText: (d) => (d.data?.type === 'Investor' ? '💰' : '🦄️'),
        fill: (d) => (d.data?.type === 'Investor' ? '#6495ED' : '#FFA07A'),
      },
      state: {
        inactive: {
          fillOpacity: 0.3,
          icon: false,
          label: false,
        },
      },
    },
    edge: {
      style: {
        label: false,
        labelText: (d) => d.data?.type,
        labelBackground: true,
      },
      state: {
        active: {
          label: true,
        },
        inactive: {
          strokeOpacity: 0,
        },
      },
    },
    layout: {
      type: 'd3-force',
      link: { distance: (edge) => size(edge.source) + size(edge.target) },
      collide: { radius: (node: NodeData) => size(node) },
      manyBody: { strength: (node: NodeData) => -4 * size(node) },
      animation: false,
      iterations: 20,
    },
    transforms: [
      {
        type: 'map-node-size',
        scale: 'linear',
        maxSize: 60,
        minSize: 20,
        mapLabelSize: [12, 16],
      },
    ],
    behaviors: [
      'drag-canvas',
      'zoom-canvas',
      function () {
        return {
          key: 'hover-activate',
          type: 'hover-activate',
          enable: (e: IPointerEvent<Element>) => e.targetType === 'node',
          degree: 1,
          inactiveState: 'inactive',
          onHover: (e: IPointerEvent<Element>) => {
            this.frontElement(e.target.id);
            e.view.setCursor('pointer');
          },
          onHoverEnd: (e: IPointerEvent<Element>) => {
            e.view.setCursor('default');
          },
        };
      },
      { type: 'fix-element-size', enable: true },
      'auto-adapt-label',
    ],
    plugins: [
      {
        type: 'tooltip',
        position: 'right',
        enable: (e: IElementEvent) => e.targetType === 'node',
        getContent: (e: IElementEvent, items: ElementDatum[]) => {
          const { type, name } = items[0].data as { type: string; name: string };
          const color = type === 'Investor' ? '#6495ED' : '#FFA07A';
          return `<div>
            <div style="font-weight: bold; font-size: 9px; color: ${color};">${type}</div>
            <div class="tooltip-name">${name}</div>
          </div>`;
        },
        style: {
          '.tooltip': {
            padding: '2px 8px',
            'border-radius': '8px',
          },
        },
      },
    ],
    animation: false,
  });

  await graph.render();

  return graph;
};
