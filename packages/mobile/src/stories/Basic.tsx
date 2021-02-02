import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import G6 from '../../src';
import './basic.css';

const data = {
  nodes: [],
  edges: [],
};

for (let i = 0; i < 10; i++) {
  data.nodes.push({
    id: `node${i}`,
    label: `Circle${i}`,
  });

  data.edges.push({
    source: `node${i}`,
    target: `node${i + 1}`,
  });
}

export interface BasicProps {}

export const BasicDemo = () => {
  const ref = React.useRef(null);
  const height = window.innerHeight - 32; // demos padding
  const width = window.innerWidth - 32;

  let graph = null;

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ref.current,
        width,
        height,
        fitView: true,
        layout: {
          type: 'grid',
          begin: [0, 0], // ???
          preventOverlap: true, // ??????? nodeSize
          preventOverlapPdding: 20, // ??
          nodeSize: 30, // ??
          condense: false, // ??
          rows: 5, // ??
          cols: 5, // ??
          sortBy: 'degree', // ??
        },

        modes: {
          default: [
            'zoom-canvas',
            'drag-node',
            'click-select',
            'activate-relations',
            {
              type: 'brush-select',
              trigger: 'ctrl',
              includeEdges: false,
              // 是否允许对该 behavior 发生。若返回 false，被操作的 item 不会被选中，不触发 'nodeselectchange' 时机事件
              shouldUpdate: (e) => {
                // 当点击的节点/边/ combo 的 id 为 'id2' 时，该 item 不会被选中
                if (e.item.getModel().id === 'id2') return false;
                return true;
              },
            },
            {
              type: 'create-edge',
              trigger: 'drag',
              key: 'shift',
              edgeConfig: {
                type: 'cubic',
                style: {
                  stroke: '#f00',
                  lineWidth: 2,
                  // ... // 其它边样式配置
                },
                // ... // 其它边配置
              },
            },
          ],
        },
        defaultNode: {
          shape: 'simple-circle',
          size: [100],
          color: '#5B8FF9',
          style: {
            fill: '#9EC9FF',
            lineWidth: 3,
          },
          labelCfg: {
            style: {
              fill: '#fff',
              fontSize: 20,
            },
          },
        },
        defaultEdge: {
          style: {
            stroke: '#e2e2e2',
          },
        },
      });
    }
    graph.data(data);
    graph.render();
  }, []);

  return <div style={{ width, height }} ref={ref}></div>;
};
