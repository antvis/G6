import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';


let graph: IGraph = null;

const CompactBox = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.TreeGraph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        defaultNode: {
          size: 26,
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
        },
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'click-select',
          ],
        },
        fitView: true,
        layout: {
          type: 'compactBox',
          fixedRoot: false,
          direction: 'H',
          getId: function getId(d) {
            return d.id;
          },
          getHeight: () => {
            return 20;
          },
          getVGap: function getVGap() {
            return 16;
          },
          getWidth: d => {
            if (d.id === 'Multiple linear regression') return 100;
            if (d.id === 'Boosting') return 100;
            if (d.id === 'Classification') return 100;
            return 20;
          },
          getHGap: function getHGap() {
            return 50;
          }
        }
      });

      graph.node(function (node) {
        return {
          label: node.id,
          labelCfg: {
            offset: 10,
            position: node.children && node.children.length > 0 ? 'left' : 'bottom',
            style: {
              //rotate: Math.PI / 2
            }
          },
        };
      });
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
        .then(res => res.json())
        .then(data => {
          graph.data(data);
          graph.render();
        });
    }
  });
  return <div ref={container}></div>;
};

export default CompactBox;
