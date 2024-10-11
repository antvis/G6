import data from '@@/dataset/language-tree.json';
import { type FixShapeConfig, Graph } from '@antv/g6';

export const behaviorToggleLabelVisibility: TestCase = async (context) => {
  // const fixKeyShapeConfig: FixShapeConfig = {
  //   shape: (shapes) => shapes.find((shape) => shape.className === 'key')!,
  //   fields: ['r', 'width', 'height'],
  // };

  const fixLabelConfig: FixShapeConfig = {
    shape: (shapes) =>
      shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text')!,
    fields: ['fontSize', 'lineHeight'],
  };

  const fixLabelBgConfig: FixShapeConfig = {
    shape: (shapes) =>
      shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'background')!,
    fields: ['x', 'y', 'width', 'height'],
  };

  const graph = new Graph({
    ...context,
    padding: 20,
    theme: 'light',
    data,
    node: {
      style: {
        labelText: (d) => d.id,
        labelBackground: true,
        labelFontFamily: 'Gill Sans',
        labelFill: '#333',
        // labelWordWrap: true,
        // labelMaxLines: 4,
        // labelMaxWidth: 200,
      },
      state: {
        active: {
          label: true,
        },
      },
      palette: {
        type: 'group',
        color: 'tableau',
        field: 'group',
      },
    },
    edge: {
      style: {
        stroke: '#E2E3E1',
        endArrow: true,
      },
    },
    behaviors: [
      'drag-canvas',
      'zoom-canvas',
      function () {
        return {
          type: 'hover-activate',
          degree: 0,
          onHover: (e) => {
            this.frontElement(e.target.id);
          },
        };
      },
      {
        type: 'fix-element-size',
        enable: false,
        state: undefined,
        node: [fixLabelConfig, fixLabelBgConfig],
      },
      {
        type: 'toggle-label-visibility',
      },
    ],
    layout: {
      type: 'd3-force',
      manyBody: { strength: -200 },
      x: {},
      y: {},
    },
    transforms: [
      {
        key: 'map-node-size',
        type: 'map-node-size',
        maxSize: 60,
        minSize: 12,
        scale: 'linear',
      },
    ],
    plugins: [{ type: 'background', background: '#fff' }],
    animation: false,
  });

  await graph.render();

  return graph;
};
