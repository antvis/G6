import G6 from '@antv/g6';

/**
 *  该案例演示如何使用 G6 自定义 DOM 节点
 *  by 十吾
 *
 */

/**
 * 注册一个带有 DOM 的节点
 */

G6.registerNode('dom-node', {
  draw: (cfg, group) => {
    const shape = group.addShape('dom', {
      attrs: {
        width: cfg.size[0],
        height: cfg.size[1],
        html: `
        <div onclick="alert('Hi')" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${cfg.size[0] - 5}px; height: ${cfg.size[1] - 5}px; display: flex;">
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
}, 'single-node');

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
