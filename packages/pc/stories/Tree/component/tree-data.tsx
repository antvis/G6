import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { TreeGraphData } from '../../../src/types';

let graph: IGraph = null;

const TreeData = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
        .then((res) => res.json())
        .then((data: TreeGraphData) => {
          data.style = {
            fill: '#f00',
          };
          data.stateStyles = {
            hover: {
              fill: '#f00',
              'text-shape': {
                fill: '#0f0',
              },
            },
          };
          const graph = new G6.TreeGraph({
            container: container.current as string | HTMLElement,
            width: 800,
            height: 800,
            modes: {
              default: [
                'drag-canvas',
                'zoom-canvas',
                'drag-node'
              ],
            },
            // defaultNode: {
            //   type: 'circle'
            // },
            defaultEdge: {
              type: 'line',
              style: {
                lineAppendWidth: 5
              }
            },
            nodeStateStyles: {
              active: {
                fillOpacity: 0.1,
                shadowBlur: 0
              }
            },
            layout: {
              type: 'compactBox',
              direction: 'LR',
              getId: function getId(d) {
                return d.id;
              },
              getHeight: function getHeight() {
                return 16;
              },
              getWidth: function getWidth() {
                return 16;
              },
              getVGap: function getVGap() {
                return 10;
              },
              getHGap: function getHGap() {
                return 100;
              },
            },
          });

          // graph.node(function (node) {
          //   return {
          //     label: node.id,
          //     labelCfg: {
          //       offset: 10,
          //       position: node.children && node.children.length > 0 ? 'left' : 'right',
          //     },
          //   };
          // });

          graph.data(data);
          graph.render();
          graph.fitView();

          graph.on('node:mouseenter', (e) => {
            graph.setItemState(e.item, 'active', true);
          });

          graph.on('node:mouseout', (e) => {
            graph.setItemState(e.item, 'active', false);
          });

          graph.setItemState(graph.getNodes()[10], 'selected', true);
          graph.on("node:click", (evt) => {
            console.log('clicking')
            const { item } = evt;
            // graph.clearItemStates(graph.getNodes()[10]);
            graph.getNodes().forEach(node => {
              graph.clearItemStates(node);
            });
            graph.setItemState(item, 'selected', true);
          });


          graph.on('edge:mouseenter', (e) => {
            console.log('enter')
            graph.setItemState(e.item, 'active', true);
          });

          graph.on('edge:mouseout', (e) => {
            graph.setItemState(e.item, 'active', false);
            console.log(e.item)
          });
          graph.on("edge:click", (evt) => {
            console.log('clicking')
            const { item } = evt;
            // graph.clearItemStates(graph.getNodes()[10]);
            graph.getEdges().forEach(edge => {
              graph.clearItemStates(edge);
            });
            graph.setItemState(item, 'selected', true);
          });

          graph.on('canvas:click', e => {
            graph.getEdges().forEach(edge => {
              // graph.clearItemStates(edge);
              graph.setItemState(edge, 'selected', false);
            });
          });
        });
    }
  }, []);
  return <div ref={container}></div>;
};

export default TreeData;
