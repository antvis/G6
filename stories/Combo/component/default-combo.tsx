import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: IGraph = null;

G6.registerCombo(
  'rectCircleCombo',
  {
    drawShape: function drawShape(cfg, group) {
      const self = this;
      cfg.padding = cfg.padding || [10, 10, 10, 10];
      cfg.size = self.getSize(cfg);
      cfg.style = Object.assign(
        {
          fill: '#ccc',
          stroke: '#333',
          lineWidth: 2,
        },
        cfg.style,
      );
      const keyShapeHeight = cfg.size[0] + cfg.padding[0] + cfg.padding[2];
      const keyShapeWidth = cfg.size[1] + cfg.padding[1] + cfg.padding[3];
      // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
      const rect = group.addShape('rect', {
        attrs: {
          ...cfg.style,
          x: -cfg.size[0] / 2 - cfg.padding[3],
          y: -cfg.size[1] / 2 - cfg.padding[0],
          width: keyShapeWidth,
          height: keyShapeHeight,
        },
      });
      // 增加右侧圆
      group.addShape('circle', {
        attrs: {
          ...cfg.style,
          fill: '#fff',
          opacity: 1,
          x: cfg.style.width / 2 + cfg.padding[3],
          y: (cfg.padding[2] - cfg.padding[0]) / 2,
          r: 5,
        },
        draggable: true,
        name: 'combo-circle-shape',
      });
      return rect;
    },
    afterUpdate: function afterUpdate(cfg, node) {
      const group = node.get('group');
      const circle = group.find((ele) => ele.get('name') === 'combo-circle-shape');
      circle.attr({
        x: cfg.style.width / 2 + cfg.padding[3],
        y: (cfg.padding[2] - cfg.padding[0]) / 2,
      });
    },
  },
  'rect',
);

const data: GraphData = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 150,
      label: 'node1',
      comboId: 'A',
    },
    {
      id: 'node2',
      x: 200,
      y: 250,
      label: 'node2',
      comboId: 'B',
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
      comboId: 'D',
    },
    {
      id: 'node5',
      x: 100,
      y: 100,
      label: 'node5',
      comboId: 'E',
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
      padding: [50, 10, 10, 10],
      // type: 'rect'
    },
    {
      id: 'B',
      // parentId: 'C',
      label: 'gorup B',
      // padding: [50, 10, 10, 50]
      // type: 'rect'
    },
    {
      id: 'C',
      label: 'gorup C',
      // type: 'rect'
    },
    {
      id: 'D',
      label: 'gorup D',
      parentId: 'E',
      // type: 'rect'
    },
    {
      id: 'E',
      // type: 'rect'
    },
    {
      id: 'empty',
      label: 'empty',
      x: 300,
      y: 300,
    },
  ],
};

const data2: GraphData = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 150,
      label: 'node1',
      comboId: 'A',
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
      comboId: 'B',
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
      type: 'circle',
    },
    {
      id: 'B',
      parentId: 'C',
      label: 'gorup B',
      type: 'circle',
    },
    {
      id: 'C',
      label: 'gorup C',
      // type: 'rect'
    },
    {
      id: 'F',
      label: 'gorup F',
      // type: 'rect'
    },
    {
      id: 'G',
      label: 'gorup G',
      // parentId: 'F'
      type: 'circle',
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
          default: ['drag-canvas', 'drag-combo',], // { type: 'drag-node', enableDelegate: true }
        },
        // layout: {
        //   type: 'comboForce'
        // },
        // defaultNode: {
        //   type: 'circle'
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
      graph.data(data);
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
      graph.on('canvas:click', (e) => {
        const node1 = graph.findById('node1');
        graph.updateItem(node1, {
          x: 100,
          y: 100,
        });
        graph.updateCombo(node1.getModel().comboId as string);
      });
    }
  });
  return <div ref={container}></div>;
};

export default DefaultCombo;
