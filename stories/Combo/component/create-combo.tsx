import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { ComboConfig, GraphData } from '../../../src/types';
import { IGroup } from '@antv/g-base/lib/interfaces';

let graph: IGraph = null;

const data: GraphData = {
  nodes: [{
    id: '0',
    label: '0'
  }, {
    id: '1',
    label: '1'
  }, {
    id: '2',
    label: '2'
  }],
  edges: [{
    id: '0-1',
    source: '0',
    target: '1'
  }, {
    id: '1-2',
    source: '1',
    target: '2'
  }]
};

const CreateCombo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 500,
        groupByTypes: false,
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            {
              type: 'drag-combo',
              onlyChangeComboSize: true
            }
          ],
        },
        defaultCombo: {
          type: 'rect',
        },
        layout: {
          type: 'dagre',
          ranksep: 20,
        },
      });

      graph.data(data);
      graph.render();

      graph.on('node:click', e => {
        const item = e.item;
        const model = item.getModel();
        const id = item.getID();
        if (id === '2') {
          graph.addItem('node', { id: 'o1', label: 'o1' })
          graph.addItem('node', { id: 'o2', label: 'o2' })
          graph.addItem('node', { id: 'o3', label: 'o3' })
          graph.addItem('edge', { id: '1-o1', source: '1', target: 'o1' })
          graph.addItem('edge', { id: '1-o2', source: '1', target: 'o2' })
          graph.addItem('edge', { id: '1-o3', source: '1', target: 'o3' })
          graph.addItem('edge', { id: 'o1-o3', source: 'o1', target: 'o3' })
          graph.addItem('edge', { id: 'o1-o2', source: 'o1', target: 'o2' })

          graph.hideItem('2');

          // graph.removeItem('2');
          // graph.removeItem('1-2');

          graph.layout();
          graph.createCombo({
            id: 'outercombo',
            label: 'outercombo'
          }, ['o1', 'o2', 'o3']);
        } else if (id === 'o2' || id === 'o3') {

          console.log(id, id + '1', id + '2', id + '3');
          graph.addItem('node', { id: id + '1', label: id + '1' })
          graph.addItem('node', { id: id + '2', label: id + '2' })
          graph.addItem('node', { id: id + '3', label: id + '3' })
          graph.addItem('edge', { id: `o1-${id}1`, source: 'o1', target: id + '1' })
          graph.addItem('edge', { id: `${id}1-${id}2`, source: id + '1', target: id + '2' })
          graph.addItem('edge', { id: `${id}1-${id}3`, source: id + '1', target: id + '3' })

          graph.hideItem(item);

          // const removeEdgeIds = [];
          // graph.getEdges().forEach(edge => {
          //   const edgeModel = edge.getModel();
          //   if (edgeModel.source === id || edgeModel.target === id) {
          //     removeEdgeIds.push(edgeModel.id);
          //   }
          // });
          // removeEdgeIds.forEach(eid => {
          //   graph.removeItem(eid);
          // })
          // graph.removeItem(id);


          graph.layout();
          // setTimeout(() => {
          graph.createCombo(
            { id: 'innercombo' + id, label: 'innercombo' + id, parentId: 'outercombo' },
            [id + '1', id + '2', id + '3']
          );
          // }, 1000)
        }
      });
      graph.on('canvas:click', e => {

        console.log(graph.getCombos())
        // graph.refreshPositions();
      })
    }
  });
  return <div ref={container}>
  </div>;
};

export default CreateCombo;
