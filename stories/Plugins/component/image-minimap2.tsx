import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      // x: -200,
      // y: -200,
      x: 0,
      y: 0,
      label: 'node1',
    },
    {
      id: 'node2',
      // x: 200,
      // y: -200,
      x: 600,
      y: 400,
      label: 'node2',
    },
    {
      id: 'node3',
      // x: -200,
      // y: 200,
      x: 600,
      y: 0,
      label: 'node3',
    },
    {
      id: 'node4',
      x: 0,
      y: 400,
      label: 'node4',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node3'
    },
    {
      source: 'node3',
      target: 'node4'
    },
    {
      source: 'node4',
      target: 'node1'
    }
  ],
};

const ImgMinimap2 = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const minimap = new G6.ImageMinimap({
        width: 600,
        padding: 10,
        graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iBdpSKzx-_sAAAAAAAAAAABkARQnAQ'
        //https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7QSRRJwAWxQAAAAAAAAAAABkARQnAQ
        //https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DcGMQ7AN3Z0AAAAAAAAAAABkARQnAQ
      });

      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 600,
        height: 400,
        plugins: [minimap],
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
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
        },
      });
      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default ImgMinimap2;
