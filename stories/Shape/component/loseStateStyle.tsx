import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

let diagramData = {
  nodes: [
    {
      id: 'old node',
      label: 'old node',
    },
  ],
  // 边集
  edges: [],
};

const Arc = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current,
        width: 1000,
        height: 600,
        modes: {
          default: [
            'drag-canvas',
            'drag-node',
            {
              type: 'zoom-canvas',
              // sensitivity: 1
            },
          ],
        },
        layout: {
          type: 'mds',
          linkDistance: 250,
        },
        defaultNode: {
          type: 'rect',
          style: {
            height: 40,
            fill: '#fff',
            stroke: '#7D8292',
          },
          labelCfg: {
            style: {
              fill: '#424656',
              fontSize: 12,
            },
          },
        },
        nodeStateStyles: {
          selected: {
            stroke: '#FC652F',
            fill: '#FEECE6',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#7D8292',
          type: 'line',
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#7D8292',
            },
          },
        },
      });
      graph.get('canvas').set('localRefresh', false);
      graph.data(diagramData);
      graph.render();
    }
  });

  const setOldNodeState = () => {
    let item = graph.find('node', (node) => node.getModel().id == 'old node');
    graph.setItemState(item, 'selected', !item.hasState('selected'));
  };

  const updateOldNode = () => {
    let item = graph.find('node', (node) => node.getModel().label == 'old node');
    let model = item.getModel();
    model.label = 'old node updated';
    debugger;
    graph.updateItem(item, model);
  };

  const handleNewNode = () => {
    graph.add('node', {
      id: 123,
      label: 'new node',
      x: 200,
      y: 200,
    });
  };

  const updateNewNode = () => {
    console.log('aa');
    let item = graph.find('node', (node) => node.getModel().label == 'new node');
    debugger;
    graph.setItemState(item, 'selected', !item.hasState('selected'));
  };

  return (
    <div ref={container}>
      <button onClick={setOldNodeState}>set old node state</button>
      <button onClick={updateOldNode}>update old node</button>
      <button onClick={handleNewNode}>add new node</button>
      <button onClick={updateNewNode}>update new node</button>
    </div>
  );
};

export default Arc;
