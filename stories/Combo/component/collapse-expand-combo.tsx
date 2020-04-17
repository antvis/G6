import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

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
    // type: 'rect'
  }, {
    id: 'E',
    // type: 'rect'
  }]
};


const CollapseExpand = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        modes: {
          default: [ 'drag-canvas' ]
        },
        defaultCombo: {
          // size: [100, 100],
          style: {
            fill: '#ccc',
            stroke: '#000',
            opacity: 0.8
          }
        },
        // defaultNode: {
        //   type: 'custom-node'
        // }
      //   comboStateStyles: {
      //     selected: {
      //       'text-shape': {
      //         fill: '#f00',
      //         fontSize: 20
      //       },
      //       fill: '#f00'
      //     },
      //     state2: {
      //       stroke: '#0f0'
      //     }
      //   }
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
        graph.updateItem(e.item, {
          // type: 'rect',
          style: {
            fill: '#f00'
          },
          markerStyle: {
            fill: '#0f0'
          }
          // label: 'new Label',
          // labelCfg: {
          //   position: 'bottom'
          // }
        });
        // graph.uncombo(e.item);
      });
      graph.on('canvas:click', e => {
        // graph.setItemState(graph.findById('A'), 'selected', true);
        // console.log( graph.findAllByState('combo', 'selected'))
        // const hidedCombos = graph.findAll('combo', combo => {
        //   if (!combo.isVisible()) return true;
        //   return false;
        // });
        // hidedCombos.forEach(combo => {
        //   graph.showItem(combo);
        // })
        // console.log(graph.getCombos()[0]);
        // console.log(graph.getComboChildren(graph.getCombos()[0]));
        //graph.focusItem(graph.getCombos()[0]);
        // graph.remove('B');
        // graph.remove('A');

        // graph.changeData(data2);

        graph.addItem('combo', {
          id: 'M',
          parentId: 'B'
        });
        // graph.updateItem('A', {
        //   parentId: 'B'
        // });

        // console.log(graph.save());
      });
    }
  });
  return <div ref={container}></div>;
};

export default CollapseExpand;
