import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import G6 from '../../src';
import './basic.css';

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'Circle1',
      x: 150,
      y: 150,
    },
    {
      id: 'node2',
      label: 'Circle2',
      x: 400,
      y: 150,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

export interface BasicProps {}

export const BasicDemo = () => {
  const ref = React.useRef(null);
  let graph = null;

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: 500,
        height: 500,
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

  return <div ref={ref}></div>;
};
