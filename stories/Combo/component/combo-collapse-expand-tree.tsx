import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const colors = {
  a: '#BDD2FD',
  b: '#BDEFDB',
  c: '#C2C8D5',
  d: '#FBE5A2',
  e: '#F6C3B7',
  f: '#B6E3F5',
  g: '#D3C6EA',
  h: '#FFD8B8',
  i: '#AAD8D8',
  j: '#FFD6E7',
};
const data = {
  id: 'Modeling Methods',
  children: [
    {
      id: 'Classification',
      comboId: 'a',
      children: [
        { id: 'Logistic regression', comboId: 'a' },
        { id: 'Linear discriminant analysis', comboId: 'a' },
        { id: 'Rules', comboId: 'a' },
        { id: 'Decision trees', comboId: 'a' },
        { id: 'Naive Bayes', comboId: 'a' },
        { id: 'K nearest neighbor', comboId: 'a' },
        { id: 'Probabilistic neural network', comboId: 'a' },
        { id: 'Support vector machine', comboId: 'a' },
      ],
    },
    {
      id: 'Consensus',
      children: [
        {
          id: 'Models diversity',
          comboId: 'a',
          children: [
            { id: 'Different initializations', comboId: 'a' },
            { id: 'Different parameter choices', comboId: 'a' },
            { id: 'Different architectures', comboId: 'a' },
            { id: 'Different modeling methods', comboId: 'a' },
            { id: 'Different training sets', comboId: 'a' },
            { id: 'Different feature sets', comboId: 'a' },
          ],
        },
        {
          id: 'Methods',
          comboId: 'b',
          children: [
            { id: 'Classifier selection', comboId: 'b' },
            { id: 'Classifier fusion', comboId: 'b' },
          ],
        },
        {
          id: 'Common',
          comboId: 'c',
          children: [
            { id: 'Bagging', comboId: 'c' },
            { id: 'Boosting', comboId: 'c' },
            { id: 'AdaBoost', comboId: 'c' },
          ],
        },
      ],
    },
    {
      id: 'Regression',
      comboId: 'd',
      children: [
        { id: 'Multiple linear regression', comboId: 'd' },
        { id: 'Partial least squares', comboId: 'd' },
        { id: 'Multi-layer feedforward neural network' },
        { id: 'General regression neural network' },
        { id: 'Support vector regression' },
      ],
    },
  ],
  combos: [],
};

const ComboCollapseExpandTree = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.TreeGraph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        fitView: true,
        modes: {
          default: ['drag-canvas', 'drag-node', 'zoom-canvas', 'collapse-expand-combo'],
        },
        layout: {
          type: 'compactBox',
        },
        defaultEdge: {
          size: 1,
          color: '#666',
        },
        defaultCombo: {
          type: 'circle',
          padding: 50,
        },
        groupByTypes: false,
        //animate: true
      });

      graph.combo((combo) => {
        const color = colors[combo.id as string];
        return {
          // size: 80,
          style: {
            lineWidth: 2,
            stroke: color,
            fillOpacity: 0.8,
          },
        };
      });

      graph.data(data);
      graph.render();

      graph.createCombo('a', ['Regression', 'Common']);
    }
  });
  return <div ref={container}></div>;
};

export default ComboCollapseExpandTree;
