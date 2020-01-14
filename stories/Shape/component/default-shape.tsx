import React, { useEffect } from 'react'
import G6 from '../../../src'
import { IGraph } from '../../../src/interface/graph'

let graph: IGraph = null

G6.registerNode('circleNode', {
  drawShape(cfg, group) {
    const keyShape = group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: 30,
        fill: '#87e8de'
      }
    });

    return keyShape;
  }
}, 'circle');

G6.registerEdge('loop-growth', {
  afterDraw(cfg, group) {
    const shape = group.get('children')[0];
    const length = shape.getTotalLength();
    shape.animate(
      (ratio) => {
        const startLen = ratio * length;
        // 计算线的lineDash
        const cfg = {
          lineDash: [startLen, length - startLen]
        };
        return cfg;
      },
      {
        repeat: true,
        duration: 2000
      });
  }
}, 'loop');

const DefaultShape = () => {
  const container = React.useRef()

  useEffect(() => {
    if(!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        defaultEdge: {
          color: '#bae7ff'
        },
        modes: {
          default: ['drag-node', 'drag-canvas']
        }
      })
    }

    const data = {
      nodes: [{
        x: 300,
        y: 300,
        label: 'rect',
        id:'node1',
        labelCfg: {
            position: 'bottom'
        },
        anchorPoints: [
          [0.5, 0], 
          [1, 0.5]
        ]
      }
      ],
      edges: [
        {
          source: 'node1',
          target: 'node1',
          label: 'loop',
          shape:'loop-growth',
          labelCfg: {
            refY: 10
          }
        }
      ]
    };

    graph.data(data)
    graph.render()
  })

  return (
    <div ref={container}></div>
  )
}

export default DefaultShape