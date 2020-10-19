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
                {
                  type: 'collapse-expand',
                  onChange: function onChange(item, collapsed) {
                    const data = item.get('model').data;
                    data.collapsed = collapsed;
                    return true;
                  },
                },
                'drag-canvas',
                'zoom-canvas',
              ],
            },
            defaultNode: {
              size: 26,
              anchorPoints: [
                [0, 0.5],
                [1, 0.5],
              ],
              style: {
                fill: '#C6E5FF',
                stroke: '#5B8FF9',
              },
            },
            defaultEdge: {
              type: 'cubic-horizontal',
              style: {
                stroke: '#A3B1BF',
              },
            },
            nodeStateStyles: {
              selected: {
                fill: 'red'
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

          graph.node(function (node) {
            return {
              label: node.id,
              labelCfg: {
                offset: 10,
                position: node.children && node.children.length > 0 ? 'left' : 'right',
              },
            };
          });

          graph.data(data);
          graph.render();
          graph.fitView();

          graph.on('node:mouseenter', (e) => {
            graph.setItemState(e.item, 'hover', true);
            console.log(e.item);
          });

          graph.on("node:click", (evt) => {
            const { item } = evt;
            const nodes = graph.findAllByState("node", "selected");
            debugger
            nodes.forEach((node) => graph.setItemState(node, "selected", false));
            graph.setItemState(item, "selected", true);
            const nodeData = graph.findDataById(item.getID());
            const node = {
              id: `${Math.floor(Math.random() * 1000)}`,
              label: "test" + Math.random() * 1000
            };
            if (!nodeData.children) {
              nodeData.children = [node];
            } else {
              nodeData.children.push(node);
            }
            graph.changeData();
          });
        });
    }
  }, []);
  return <div ref={container}></div>;
};

export default TreeData;
