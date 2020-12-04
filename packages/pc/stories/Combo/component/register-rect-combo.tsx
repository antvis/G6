import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: IGraph = null;

G6.registerCombo(
  'cRect',
  {
    drawShape: function draw(cfg, group) {
      const self = this;
      // 获取配置中的 Combo 那边距
      cfg.padding = cfg.padding || [50, 20, 20, 20];
      // 获取样式配置，style.width 与 style.height 是加上了 padding 的宽高
      const style = self.getShapeStyle(cfg);
      // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
      const rect = group.addShape('rect', {
        attrs: {
          ...style,
          x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
          y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
          width: style.width,
          height: style.height,
        },
        draggable: true,
        name: 'combo-keyShape',
      });
      // 增加右侧圆
      group.addShape('circle', {
        attrs: {
          ...style,
          fill: '#fff',
          opacity: 1,
          // cfg.style.width 与 cfg.style.heigth 是不带 padding 的宽高
          x: cfg.style.width / 2 + cfg.padding[1],
          y: (cfg.padding[2] - cfg.padding[0]) / 2,
          r: 5,
        },
        draggable: true,
        name: 'combo-circle-shape',
      });
      return rect;
    },
    // 定义新增的右侧圆的位置更新逻辑
    afterUpdate: function afterUpdate(cfg, node) {
      const group = node.get('group');
      // 在该 Combo 的图形分组根据 name 找到右侧圆图形
      const circle = group.find((ele) => ele.get('name') === 'combo-circle-shape');
      // 更新右侧圆位置
      circle.attr({
        x: cfg.style.width / 2 + cfg.padding[1],
        y: (cfg.padding[2] - cfg.padding[0]) / 2,
      });
    },
  },
  'rect',
);

const data: GraphData = {
  nodes: [
    { id: 'node1', x: 250, y: 100, comboId: 'combo1' },
    { id: 'node2', x: 300, y: 100, comboId: 'combo1' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' }, //
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3' },
  ],
};
const RegisterRectCombo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 800,
        height: 800,
        defaultCombo: {
          type: 'cRect',
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

export default RegisterRectCombo;
