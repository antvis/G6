import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: IGraph = null;

const collapseIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
  ];
};

const expandIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};

G6.registerCombo(
  'cCircle',
  {
    drawShape: function draw(cfg, group) {
      const self = this;
      // 获取样式配置，style.r 是加上了 padding 的半径
      const style = self.getShapeStyle(cfg);
      // 绘制一个 circle 作为 keyShape，与 'circle' Combo 的 keyShape 一致
      const circle = group.addShape('circle', {
        attrs: {
          ...style,
          x: 0,
          y: 0,
          r: style.r,
        },
        draggable: true,
        name: 'combo-keyShape',
      });
      // 增加下方 marker
      const marker = group.addShape('marker', {
        attrs: {
          ...style,
          fill: '#fff',
          opacity: 1,
          x: 0,
          y: style.r,
          r: 10,
          symbol: collapseIcon,
        },
        draggable: true,
        name: 'combo-marker-shape',
      });

      return circle;
    },
    // 定义新增的下方 marker 的位置更新逻辑
    afterUpdate: function afterUpdate(cfg, node) {
      const self = this;
      // 获取样式配置，style.r 是加上了 padding 的半径
      const style = self.getShapeStyle(cfg);
      const group = node.get('group');
      // 在该 Combo 的图形分组根据 name 找到下方 marker
      const marker = group.find((ele) => ele.get('name') === 'combo-marker-shape');
      // 更新 marker 位置
      marker.attr({
        x: 0,
        y: style.r,
        symbol: cfg.collapsed ? expandIcon : collapseIcon,
      });
    },
  },
  'circle',
);

const data: GraphData = {
  nodes: [
    { id: 'node1', x: 250, y: 100, comboId: 'combo1' },
    { id: 'node2', x: 300, y: 100, comboId: 'combo1' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Label' },
  ],
};
const RegisterCircleCombo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 800,
        height: 800,
        defaultCombo: {
          type: 'cCircle',
        },
        modes: {
          default: ['drag-node', 'drag-combo', 'drag-canvas', 'collapse-expand-combo'],
        },
      });
      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default RegisterCircleCombo;
