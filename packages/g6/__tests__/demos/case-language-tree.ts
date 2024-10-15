import { labelPropagation } from '@antv/algorithm';
import type { Element, IPointerEvent, NodeData } from '@antv/g6';
import { Graph } from '@antv/g6';
import data from '../dataset/language-tree.json';

export const caseLanguageTree: TestCase = async (context) => {
  const size = (node: NodeData) => Math.max(...(node.style?.size as [number, number, number]));

  const graph = new Graph({
    ...context,
    data: {
      ...data,
      nodes: labelPropagation(data).clusters.flatMap((cluster) => cluster.nodes),
    },
    node: {
      style: {
        label: true,
        labelBackground: true,
        labelPadding: [0, 4],
        labelText: (d) => d.id,
        icon: true,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      },
      state: {
        inactive: {
          fill: '#E0E0E0',
          fillOpacity: 1,
          icon: false,
          label: false,
          labelBackground: false,
        },
      },
      palette: {
        field: (d) => d.clusterId,
      },
    },
    edge: {
      style: {
        stroke: '#E0E0E0',
        endArrow: true,
      },
    },
    layout: {
      type: 'd3-force',
      link: {
        distance: (edge) => size(edge.source) + size(edge.target),
      },
      collide: {
        radius: (node: NodeData) => size(node) + 1,
      },
      manyBody: {
        strength: (node: NodeData) => -4 * size(node),
      },
      animation: false,
    },
    transforms: [
      {
        key: 'map-node-size',
        type: 'map-node-size',
        scale: 'log',
      },
    ],
    behaviors: [
      'drag-canvas',
      'zoom-canvas',
      function () {
        return {
          key: 'hover-activate',
          type: 'hover-activate',
          enable: true,
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
      {
        key: 'fix-element-size',
        type: 'fix-element-size',
        enable: true,
        node: [{ shape: 'label' }],
      },
      {
        key: 'auto-adapt-label',
        type: 'auto-adapt-label',
      },
    ],
    plugins: [{ type: 'background', background: '#fff' }],
    animation: false,
  });

  await graph.render();

  return graph;
};
