import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [{
    id: '1',
    comboId: 'c1'
  }, {
    id: '2'
  },],
  edges: [{
    source: '1',
    target: '2'
  }],
  combos: [{
    id: 'c1'
  }, {
    id: 'c2'
  }]
};
const data2 = {
  nodes: [{
    id: 'new1'
  }, {
    id: 'new2'
  }, {
    id: '1'
  },],
  edges: [{
    source: '1',
    target: 'new2'
  }, {
    source: 'new1',
    target: 'new2'
  }],
};
const ToolBar = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const toolbarDiv = document.createElement('div');
      toolbarDiv.id = 'toolbarContainer';
      const graphContainer = container.current as HTMLElement;
      graphContainer.parentElement.appendChild(toolbarDiv);

      const toolbar = new G6.ToolBar({
        container: 'toolbarContainer'
      });
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        plugins: [toolbar],
        // 设置为true，启用 redo & undo 栈功能
        enabledStack: true,
        modes: {
          default: ['zoom-canvas', 'drag-node', { type: 'brush-select', }, 'drag-combo'],
        },
        defaultNode: {
          size: 50
        }
      });
      graph.data(data);
      graph.render();
      graph.on('stackchange', e => {
        // console.log(e)
      })
      const node4 = graph.addItem('node', {
        id: '4',
        label: 'node-4',
        x: 100,
        y: 100,
        description: 'This is node-4.',
        subdescription: 'This is subdescription of node-3.',
      })
      const node5 = graph.addItem('node', {
        id: '5',
        label: 'node-5',
        type: 'rect',
        x: 200,
        y: 100,
        description: 'This is node-5.',
        subdescription: 'This is subdescription of node-5.',
      })
      graph.addItem('edge', {
        id: 'e4',
        source: '4',
        target: '5',
      })

      graph.updateItem(node4, {
        x: 100,
        y: 200
      })
      graph.on('canvas:click', e => {
        graph.removeItem(graph.getNodes()[0])
      })

      graph.on('node:click', e => {
        graph.removeItem(e.item, true);
      })

      graph.on('canvas:dragstart', e => {
        graph.changeData(data2);
      })

      graph.on('stackchange', (e) => {
        console.log('stackchange', e)
      })


    }
  });

  return (
    <div>
      <div style={{ left: '100px' }} ref={container}></div>
    </div>
  );
};

export default ToolBar;
