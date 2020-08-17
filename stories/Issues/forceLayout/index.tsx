import React, { Component } from 'react';
import G6 from '../../../src';
import data from './data.json';
// import "./styles.css";

export default class ForceLayout extends Component {
  graph;

  componentDidMount() {
    this.graph = new G6.Graph({
      container: 'container',
      width: 600,
      height: 400,
      nodeStateStyles: {
        hover: {
          stroke: 'steelblue',
          lineWidth: 5,
        },
      },

      layout: {
        type: 'force',
        linkDistance: 100,
        preventOverlap: true,
        nodeStrength: -30,
        edgeStrength: 0.1,
      },
    });

    this.graph.data(data);
    this.graph.render();

    this.addEventListener();
  }

  addEventListener = () => {
    this.graph.on('node:mouseenter', (e) => this.graph.setItemState(e.item, 'hover', true));
    this.graph.on('node:mouseleave', (e) => this.graph.setItemState(e.item, 'hover', false));
  };

  render() {
    return <div id="container" />;
  }
}
