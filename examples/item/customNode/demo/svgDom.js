import G6 from '@antv/g6';

/**
 *  This demo shows how to register a custom node with SVG DOM shape
 *  by 十吾
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
        <div id=${cfg.id} class='dom-node' style="background-color: #fff; border: 2px solid ${stroke}; border-radius: 5px; width: ${cfg.size[0] - 5}px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="" style="line-height: 100%; margin-left: 7px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `
      },
      draggable: true
    });
    return shape;
  }
});

/** 数据 */
const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
      label: 'Homepage',
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
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

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  renderer: 'svg',
  linkCenter: true,
  defaultNode: {
    type: 'dom-node',
    size: [120, 40]
  }
});

graph.data(data);
graph.render();

// click listener for dom nodes to response the click by changing stroke color
const listener = (dom) => {
  const nodeId = dom.id;
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
      stroke
    }
  });
}

const bindClickListener = () => {
  const domNodes = document.getElementsByClassName('dom-node')
  for (let i = 0; i < domNodes.length; i++) {
    const dom = domNodes[i];
    dom.addEventListener('click', (e) => {
      listener(dom);
    });
  }
}


bindClickListener();

// after update the item, all the DOMs will be re-rendered
// so the listeners should be rebinded to the new DOMs
graph.on('afterupdateitem', e => {
  bindClickListener();
});
