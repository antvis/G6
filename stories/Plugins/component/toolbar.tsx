import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [],
  edges: [],
};
const ToolBar = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const toolbar = new G6.ToolBar();
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        plugins: [toolbar],
        // 设置为true，启用 redo & undo 栈功能
        enabledStack: true,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        defaultNode: {
          size: 50
        }
      });
      graph.data(data);
      graph.render();
      graph.on('stackchange', e => {
        console.log(e)
      })
      graph.addItem('node', {
        id: '4',
        label: 'node-4',
        x: 100,
        y: 100,
        description: 'This is node-4.',
        subdescription: 'This is subdescription of node-3.',
      })
      graph.addItem('node', {
        id: '5',
        label: 'node-5',
        x: 200,
        y: 300,
        description: 'This is node-5.',
        subdescription: 'This is subdescription of node-5.',
      })
      graph.addItem('edge', {
        id: 'e4',
        source: '4',
        target: '5',
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
