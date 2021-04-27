import G6 from '@antv/g6';
import { useEffect } from 'react';

/**
 *  This demo shows how to register a custom node with SVG DOM shape
 *  by Shiwu
 *
 */

/**
 * Register a node type with DOM
 */
G6.registerNode('dom-node', {
  draw: (cfg, group) => {
    const stroke = cfg.style ? cfg.style.stroke || '#5B8FF9' : '#5B8FF9';
    const shape = group.addShape('dom', {
      attrs: {
        width: cfg.size[0],
        height: cfg.size[1],
        html: `
        <div id=${
          cfg.id
        } class='dom-node' style="background-color: #fff; border: 2px solid ${stroke}; border-radius: 5px; width: ${
          cfg.size[0] - 5
        }px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="" style="line-height: 100%; margin-left: 7px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `,
      },
      draggable: true,
    });
    return shape;
  },
});

/** 数据 */
const data = {
  nodes: [
    {
      id: 'node1',
      x: 10,
      y: 100,
      label: 'Homepage',
    },
    {
      id: 'node2',
      x: 200,
      y: 100,
      label: 'Subpage',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 100;

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = `由于打包问题，本 demo 的 111-113 行被暂时注释。需要您在代码栏中打开 111-113 行的注释以得到自定义 DOM 节点正确的交互。<br /> Due to the packing problem of the site, we have to note the line 111-113 of this demo temporary. Unnote them to see the result of custom DOM node with interactions please.`;
container.appendChild(descriptionDiv);

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  renderer: 'svg',
  linkCenter: true,
  defaultNode: {
    type: 'dom-node',
    size: [120, 40],
  },
});

graph.data(data);
graph.render();

// click listener for dom nodes to response the click by changing stroke color
const listener = (dom) => {
  const nodeId = dom.id;
  if (!nodeId) return;
  const node = graph.findById(nodeId);
  let stroke = '';
  if (!node.hasState('selected')) {
    stroke = '#f00';
    graph.setItemState(node, 'selected', true);
  } else {
    stroke = '#5B8FF9';
    graph.setItemState(node, 'selected', false);
  }
  graph.updateItem(nodeId, {
    style: {
      stroke,
    },
  });
};

const bindClickListener = () => {
  const domNodes = document.getElementsByClassName('dom-node');
  for (let i = 0; i < domNodes.length; i++) {
    const dom = domNodes[i];
    // open the following lines pls!
    // dom.addEventListener('click', (e) => {
    //   listener(dom);
    // });
  }
};

bindClickListener();

// after update the item, all the DOMs will be re-rendered
// so the listeners should be rebinded to the new DOMs
graph.on('afterupdateitem', (e) => {
  bindClickListener();
});
graph.on('afterrender', (e) => {
  bindClickListener();
});
// if it is TreeGraph and with default animate:true, you should bind the litsener after animation
// graph.on('afteranimate', (e) => {
//   bindClickListener();
// });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 100);
  };
