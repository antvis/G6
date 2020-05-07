import React, { useEffect } from 'react'
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { EdgeConfig } from '../../../src/types';

let graph: IGraph = null
const OriganizationTree = () => {
  const container = React.useRef();

  useEffect(() => {
    G6.registerEdge('hvh', {
      draw(cfg: EdgeConfig, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
    
        let path = null
        if (startPoint.y < 0) {
          path = [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x , (startPoint.y - endPoint.y) / 2],
            ['L', endPoint.x , (startPoint.y - endPoint.y) / 2],
            ['L', endPoint.x, endPoint.y - 23]
          ]
        } else {
          path = [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x , startPoint.y + (endPoint.y - startPoint.y) / 2],
            ['L', endPoint.x , startPoint.y + (endPoint.y - startPoint.y) / 2],
            ['L', endPoint.x, endPoint.y - 23]
          ]
        }
        const shape = group.addShape('path', {
          attrs: {
            stroke: '#13C2C2',
            endArrow: {
              path: 'M 0 0 L 0, -5 L -10, 0, L 0, 5 Z',
              fill: '#13C2C2'
            },
            path
          }
        });
    
        console.log(cfg.sourceNode.get('id'), cfg.targetNode.get('id'), shape.attr('path'))
        return shape;
      }
    });

    if(!graph) {
      graph = new G6.TreeGraph({
        container: container.current,
        width: 1000,
        height: 800,
        linkCenter: true,
        modes: {
          default: ['drag-node',
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
          shape: 'rect',
          size: [50, 26],
          
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
        },
        defaultEdge: {
          type: 'hvh',
          style: {
            stroke: '#A3B1BF',
          },
        },
        layout: {
          type: 'compactBox',
          direction: 'TB',
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
            return 40;
          },
          getHGap: function getHGap() {
            return 40;
          },
        },
      });
    }

    const data = {
      id: 'root',
      label: 'root',
      children: [
        {
          id: 'node1',
          label: 'node1',
          children: [
            {
              id: 'node1.1',
              label: 'node1.1'
            },
            {
              id: 'node1.2',
              label: 'node1.2'
            },
            {
              id: 'node1.3',
              label: 'node1.3',
              children: [
                {
                  id: 'node1.3.1',
                  label: 'node1.3.1'
                },
                {
                  id: 'node1.3.2',
                  label: 'node1.3.2'
                },
              ]
            },
            {
              id: 'node1.4',
              label: 'node1.4'
            },
          ]
        },
        {
          id: 'node2',
          label: 'node2',
          children: [
            {
              id: 'node2.1',
              label: 'node2.1'
            },
            {
              id: 'node2.2',
              label: 'node2.2'
            },
            {
              id: 'node2.3',
              label: 'node2.3'
            },
            {
              id: 'node2.4',
              label: 'node2.4'
            },
          ]
        },
        {
          id: 'node3',
          label: 'node3'
        },
      ]
    }

    graph.data(data)
    graph.render()
    graph.fitView()
  }, [])

  const handleChangeData = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
      .then(res => res.json())
      .then(data => {

        graph.node(function(node) {
          let position = 'right';
          let rotate = 0;
          if (!node.children) {
            position = 'bottom';
            rotate = Math.PI / 4;
          }
          return {
            label: node.id,
            labelCfg: {
              position,
              offset: 5,
              style: {
                rotate,
                textAlign: 'start',
              },
            },
          };
        });
        graph.changeData(data);
        graph.fitView();
       
      });
  }

  return (
    <>
      <button onClick={handleChangeData}>切换数据</button>
      <div ref={container}></div>
    </>
  )
}

export default OriganizationTree
