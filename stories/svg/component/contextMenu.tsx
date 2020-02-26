import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
  ],
};

const ContextMenu = () => {
  const container: any = React.useRef();


  useEffect(() => {

    // JSX and HTML templates are available for the menu
    // create ul
    const conextMenuContainer = document.createElement('ul');
    conextMenuContainer.id = 'contextMenu';
  
    // create li
    const firstLi = document.createElement('li');
    firstLi.innerText = 'Option 1';
    conextMenuContainer.appendChild(firstLi);
  
    const lastLi = document.createElement('li');
    lastLi.innerText = 'Option 2';
    conextMenuContainer.appendChild(lastLi);
    container.current.appendChild(conextMenuContainer);
    conextMenuContainer.style.display = 'none';
    conextMenuContainer.style.position = 'absolute';

    if (!graph) {
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        renderer: 'svg',
        modes: {
          default: ['drag-canvas', 'zoom-canvas']
        }
      });
      graph.data(data);
      graph.render();

      graph.on('node:contextmenu', evt => {
        // evt.preventDefault();
        // evt.stopPropagation();
        conextMenuContainer.style.display = 'block';
        conextMenuContainer.style.left = `${evt.x + 20}px`;
        conextMenuContainer.style.top = `${evt.y}px`;
      });

      graph.on('node:mouseleave', () => {
        conextMenuContainer.style.left = '-150px';
      });
      const itemModel = graph.getNodes()[1].getModel();
      graph.emit('node:contextmenu', {
        x: itemModel.x,
        y: itemModel.y
      });

    }
  });
  return <div ref={container}></div>;
};

export default ContextMenu;
