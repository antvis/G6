import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

G6.registerCombo('rectCircleCombo', {
  drawShape: function drawShape(cfg, group) {
    const self = this;
    cfg.padding = cfg.padding || [10, 10, 10, 10];
    cfg.size = self.getSize(cfg);
    cfg.style = Object.assign({
      fill: '#ccc',
      stroke: '#333',
      lineWidth: 2,
    }, cfg.style);
    const keyShapeHeight = cfg.size[0] + cfg.padding[0] + cfg.padding[2];
    const keyShapeWidth = cfg.size[1] + cfg.padding[1] + cfg.padding[3];
    // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
    const rect = group.addShape('rect', {
      attrs: {
        ...cfg.style,
        x: -cfg.size[0] / 2 - cfg.padding[3],
        y: -cfg.size[1] / 2 - cfg.padding[0],
        width: keyShapeWidth,
        height: keyShapeHeight
      }
    });
    // 增加右侧圆
    group.addShape('circle', {
      attrs: {
        ...cfg.style,
        fill: '#fff',
        opacity: 1,
        x: cfg.style.width / 2 + cfg.padding[3],
        y: (cfg.padding[2] - cfg.padding[0]) / 2,
        r: 5
      },
      draggable: true,
      name: 'combo-circle-shape'
    });
    return rect;
  },
  afterUpdate: function afterUpdate(cfg, node) {
    const group = node.get('group');
    const circle = group.find(ele => ele.get('name') === 'combo-circle-shape');
    circle.attr({
      x: cfg.style.width / 2 + cfg.padding[3],
      y: (cfg.padding[2] - cfg.padding[0]) / 2
    });
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
    },
    // {
    //   id: 'node3',
    //   label: 'Node 3',
    //   comboId: 'custom_combo'
    // }, {
    //   id: 'node4',
    //   label: 'Node 4',
    //   comboId: 'custom_combo'
    // }
  ],
  combos: [{
    id: 'circle_combo',
    label: 'Circle',
    type: 'circle',
    // style: {
    //   fill: '#eaff8f',
    //   stroke: '#bae637',
    //   lineWidth: 3,
    // },
    // labelCfg: {
    //   position: 'left',
    //   refX: 5,
    //   style: {
    //     fill: '#bae637',
    //     fontSize: 15
    //     // ... 其他文本样式的配置
    //   },
    // }
  }, {
    id: 'rect_combo',
    type: 'rect',
    label: 'Rect',
    // style: {
    //   fill: '#eaff8f',
    //   stroke: '#bae637',
    //   lineWidth: 3,
    // },
    // labelCfg: {
    //   position: 'bottom',
    //   refY: -12,
    //   style: {
    //     fill: '#bae637',
    //     fontSize: 15
    //     // ... 其他文本样式的配置
    //   },
    // },
    labelCfg: {
      position: 'bottom',
      refX: 5,
      refY: -12,
      style: {
        fill: '#fff'
      }
    },
    style: {
      fill: '#fa8c16',
      stroke: '#000',
      lineWidth: 2
    }
  }, {
    id: 'custom_combo',
    type: 'rectCircleCombo',
    label: 'Custom'
  }, {
    id: 'rect combo',
    type: 'rect',
    label: 'Rect'
  }, {
    id: 'circle combo',
    type: 'circle',
    label: 'Circle'
  }]
}


const data_doc = {
  nodes: [
    {
      id: 'node6',
      comboId: 'comboC',
      label: 'node6',
      x: 482.0068696961372,
      y: 446.38541741056656,
    },
    {
      id: 'node1',
      label: 'node1',
      comboId: 'comboA',
      x: 416.9572439461195,
      y: 349.9241603364356
    },
    {
      id: 'node9',
      label: 'node9',
      comboId: 'comboB',
      x: 644.4622901073748,
      y: 268.15932193994286
    },
    {
      id: 'node2',
      label: 'node2',
      comboId: 'comboA',
      x: 381.2959078558995,
      y: 328.1513601730224
    },
    {
      id: 'node3',
      label: 'node3',
      comboId: 'comboA',
      x: 414.9970473480873,
      y: 305.8553704166942
    },
    {
      id: 'node7',
      comboId: 'comboB',
      label: 'node7',
      x: 685.4462242685507,
      y: 275.68847246280853
    },
    {
      id: 'node10',
      label: 'node10',
      comboId: 'comboC',
      x: 585.0912351575695,
      y: 427.8580074917479
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
  ],
  combos: [
    {
      id: 'comboA',
      label: 'Combo A',
      parentId: 'comboC',
    },
    {
      id: 'comboB',
      label: 'Combo B',
      parentId: 'comboC',
    },
    {
      id: 'comboC',
      label: 'Combo C',
    },
    {
      id: 'comboD',
      label: 'Combo D',
      x: 131.7741514943344,
      y: 307.05617206639687
    },
  ],
};


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
        // layout: {
        //   type: 'comboForce'
        // },
        // defaultNode: {
        //   shape: 'circle'
        // },
        // defaultCombo: {
        //   // size: [100, 100],
        //   type: 'circle',
        //   style: {
        //     fill: '#ccc',
        //     opacity: 0.9
        //   }
        // },
        // comboStateStyles: {
        //   selected: {
        //     'text-shape': {
        //       fill: '#f00',
        //       fontSize: 20
        //     },
        //     fill: '#f00'
        //   },
        //   state2: {
        //     stroke: '#0f0'
        //   }
        // },
        // defaultEdge: {
        //   style: {
        //     stroke: '#f00',
        //     lineWidth: 3
        //   }
        // }
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
      // let selected = false;
      // graph.on('node:click', e => {
      //   graph.hideItem(e.item);
      // })
      // graph.on('combo:click', e => {
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
      // });
      // graph.on('canvas:click', e => {
      //   // graph.setItemState(graph.findById('A'), 'selected', true);
      //   // console.log( graph.findAllByState('combo', 'selected'))
      //   const hidedCombos = graph.findAll('combo', combo => {
      //     if (!combo.isVisible()) return true;
      //     return false;
      //   });
      //   hidedCombos.forEach(combo => {
      //     graph.showItem(combo);
      //   })

      //   graph.updateItem(graph.getNodes()[0], {
      //     x: 100,
      //     y: 100
      //   });
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

      //   graph.updateComboTree('A', 'M');
      // });
      graph.on('canvas:click', e => {
        const node1 = graph.findById('node1');
        graph.updateItem(node1, {
          x: 100,
          y: 100
        });
        graph.updateCombo(node1.getModel().comboId as string)
      });
    }
  });
  return <div ref={container}></div>;
};

export default DefaultCombo;
