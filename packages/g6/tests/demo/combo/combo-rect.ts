import { Graph, Extensions, stdLib, extend } from '../../../src/index';

import { container, height, width } from '../../datasets/const';
import {
  data as comboData,
  smallData as smallComboData,
} from '../../datasets/combo-data';

export default () => {
  const ExtGraph = extend(Graph, {
    behaviors: {
      'hover-activate': Extensions.HoverActivate,
    },
    layouts: {
      concentric: Extensions.ConcentricLayout,
      comboCombined: Extensions.ComboCombinedLayout,
    },
  });
  const graph = new Graph({
    container,
    width,
    height,
    type: 'graph',
    layout: {
      type: 'comboCombined',
      // innerLayout: 'concentric',
      innerLayout: new stdLib.layouts['concentric'](),
    },
    node: {
      labelShape: {
        position: 'center',
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
      animates: {
        update: [
          {
            fields: ['opacity'],
            shapeId: 'haloShape',
          },
        ],
      },
    },
    combo: (model) => {
      return {
        id: model.id,
        data: {
          ...model.data,
          type: 'circle-combo',
          keyShape: {
            padding: [10, 20, 30, 40],
            width: 50,
            height: 20,
          },
          labelShape: {
            text: model.id,
          },

          animates: {
            buildIn: [
              {
                fields: ['opacity'],
                duration: 500,
                delay: 500 + Math.random() * 500,
              },
            ],
            buildOut: [
              {
                fields: ['opacity'],
                duration: 200,
              },
            ],
            update: [
              {
                // when rect combo collapased, rect's  width/height/x/y are all changed,
                // which is different from circle that the x/y of circle does not change.
                fields: ['lineWidth', 'width', 'height', 'x', 'y'],
                shapeId: 'keyShape',
              },
              {
                fields: ['opacity'],
                shapeId: 'haloShape',
              },
            ],
          },
        },
      };
    },
    data: comboData,
    modes: {
      default: [
        'collapse-expand-combo',
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'click-select',
          itemTypes: ['node', 'edge', 'combo'],
        },
        {
          type: 'hover-activate',
          itemTypes: ['node', 'edge', 'combo'],
        },
        {
          type: 'drag-combo',
          enableTransient: true,
          updateComboStructure: true,
        },
        {
          type: 'drag-node',
          enableTransient: true,
          updateComboStructure: true,
        },
      ],
    },
  });
  return graph;
};
