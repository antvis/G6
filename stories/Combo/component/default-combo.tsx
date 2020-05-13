import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

G6.registerCombo('rectCircleCombo', {
  drawShape: (cfg, group) => {
    const rect = group.addShape('rect', {
      attrs: {
        fill: '#f00',
        x: -50,
        y: -50,
        width: 100,
        height: 100
      }
    });
    return rect;
  },
  afterUpdate: function afterUpdate(cfg, node) {
    const self = this;
    const padding = cfg.padding || self.options.padding || [10, 10, 10, 10];
    const style = Object.assign({
      fill: '#ccc',
      stroke: '#333',
      lineWidth: 2,
    }, cfg.style);
    const group = node.get('group');
    const circle = group.find(ele => ele.get('name') === 'combo-circle-shape');
    if (!circle) {
      group.addShape('circle', {
        attrs: {
          ...style,
          fill: '#fff',
          x: cfg.style.width / 2 + padding[1],
          y: 0,
          r: 5
        },
        draggable: true,
        name: 'combo-circle-shape'
      });
    } else {
      circle.attr({
        x: cfg.style.width / 2 + padding[1],
      })
    }
  }
}, 'rect');

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 150,
      label: 'node1',
      comboId: 'A'
    },
    {
      id: 'node2',
      x: 200,
      y: 250,
      label: 'node2',
      comboId: 'B'
    },
    {
      id: 'node3',
      x: 100,
      y: 250,
      label: 'node3',
    },
    {
      id: 'node4',
      x: 50,
      y: 50,
      label: 'node4',
      comboId: 'D'
    },
    {
      id: 'node5',
      x: 100,
      y: 100,
      label: 'node5',
      comboId: 'E'
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
  combos: [
    {
      id: 'A',
      parentId: 'B',
      label: 'gorup A',
      padding: [50, 10, 10, 10]
      // type: 'rect'
    }, {
      id: 'B',
      // parentId: 'C',
      label: 'gorup B',
      // padding: [50, 10, 10, 50]
      // type: 'rect'
    },
    // {
    //   id: 'C',
    //   label: 'gorup C',
    //   // type: 'rect'
    // },
    {
      id: 'D',
      label: 'gorup D',
      parentId: 'E',
      // type: 'rect'
    }, {
      id: 'E',
      // type: 'rect'
    }]
};

const data2 = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 150,
      label: 'node1',
      comboId: 'A'
    },
    {
      id: 'node2',
      x: 200,
      y: 250,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 250,
      label: 'node3',
    },
    {
      id: 'node4',
      x: 200,
      y: 350,
      label: 'node4',
      comboId: 'B'
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node4',
      id: 'edge1',
    },
    {
      source: 'node1',
      target: 'node2',
      id: 'edge2',
    },
    {
      source: 'node2',
      target: 'node3',
      id: 'edge3',
    },
  ],
  combos: [
    {
      id: 'A',
      parentId: 'C',
      label: 'gorup A',
      type: 'circle'
    }, {
      id: 'B',
      parentId: 'C',
      label: 'gorup B',
      type: 'circle'
    }, {
      id: 'C',
      label: 'gorup C',
      // type: 'rect'
    }, {
      id: 'F',
      label: 'gorup F',
      // type: 'rect'
    }, {
      id: 'G',
      label: 'gorup G',
      // parentId: 'F'
      type: 'circle'
    }]
};

const combo = {
  nodes: [
    {
      id: 'node1',
      label: 'Node1',
      comboId: 'rect_combo'
    }, {
      id: 'node2',
      label: 'Node 2'
    }, {
      id: 'node3',
      label: 'Node 3',
      comboId: 'custom_combo'
    }, {
      id: 'node4',
      label: 'Node 4',
      comboId: 'custom_combo'
    }],
  combos: [{
    id: 'circle_combo',
    label: 'Circle',
    type: 'circle',
    style: {
      fill: '#eaff8f',
      stroke: '#bae637',
      lineWidth: 3,
    },
    labelCfg: {
      position: 'left',
      refX: 5,
      style: {
        fill: '#bae637',
        fontSize: 15
        // ... 其他文本样式的配置
      },
    }
  }, {
    id: 'rect_combo',
    type: 'rect',
    label: 'Rect',
    style: {
      fill: '#eaff8f',
      stroke: '#bae637',
      lineWidth: 3,
    },
    labelCfg: {
      position: 'bottom',
      refY: -12,
      style: {
        fill: '#bae637',
        fontSize: 15
        // ... 其他文本样式的配置
      },
    },
  }, {
    id: 'custom_combo',
    type: 'rectCircleCombo',
    label: 'Custom'
  }]
}

const DefaultCombo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        groupByTypes: false,
        modes: {
          default: ['drag-canvas', 'drag-combo', 'drag-node', 'collapse-expand-combo']
        },
        defaultCombo: {
          size: [100, 100],
          type: 'circle',
          style: {
            fill: '#ccc',
            opacity: 0.9
          }
        },
        comboStateStyles: {
          selected: {
            'text-shape': {
              fill: '#f00',
              fontSize: 20
            },
            fill: '#f00'
          },
          state2: {
            stroke: '#0f0'
          }
        },
        defaultEdge: {
          style: {
            stroke: '#f00',
            lineWidth: 3
          }
        }
      });
      // graph.combo(combo => {
      //   return {
      //     type: 'circle',
      //     label: combo.id,
      //     style: { fill: '#666' },
      //     stateStyles: {
      //       selected: { fill: 'blue' },
      //       state2: { fill: 'green' }
      //     }
      //   }
      // });
      graph.data(combo);
      graph.render();
      let selected = false;
      graph.on('node:click', e => {
        graph.hideItem(e.item);
      })
      graph.on('combo:click', e => {
        // selected = !selected;
        // graph.setItemState(e.item, 'selected', selected);
        // graph.setItemState(e.item, 'state2', selected);
        // graph.getNodes().forEach(node => {
        //   node.hide();
        // });
        // graph.hideItem(e.item);
        // graph.updateItem(e.item, {
        //   // type: 'rect',
        //   style: {
        //     fill: '#f00'
        //   },
        //   // label: 'new Label',
        //   // labelCfg: {
        //   //   position: 'bottom'
        //   // }
        // });
        // graph.uncombo(e.item);
      });
      graph.on('canvas:click', e => {
        // graph.setItemState(graph.findById('A'), 'selected', true);
        // console.log( graph.findAllByState('combo', 'selected'))
        const hidedCombos = graph.findAll('combo', combo => {
          if (!combo.isVisible()) return true;
          return false;
        });
        hidedCombos.forEach(combo => {
          graph.showItem(combo);
        })
        // console.log(graph.getCombos()[0]);
        // console.log(graph.getComboChildren(graph.getCombos()[0]));
        //graph.focusItem(graph.getCombos()[0]);
        // graph.remove('B');
        // graph.remove('A');
        // graph.changeData(data2);
        // graph.changeData(graph.save());

        // graph.render();
        // graph.addItem('combo', {
        //   id: 'M',
        //   parentId: 'B'
        // });

        // graph.addItem('node', {
        //   id: 'M',
        //   comboId: 'A'
        // });

        // graph.updateItem('A', {
        //   parentId: 'B'
        // });

        // console.log(graph.save());

        graph.updateComboTree('A', 'M');
      });
    }
  });
  return <div ref={container}></div>;
};

export default DefaultCombo;
