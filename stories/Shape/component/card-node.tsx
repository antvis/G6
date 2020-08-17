import React, { useEffect } from 'react';
import G6 from '../../../src';

let graph = null;

function uuid() {
  return `${'xxxx-xxxx-xxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))}`;
}

function fetchData() {
  const childData = [
    {
      id: uuid(),
      title: `node-${uuid()}`,
      nodeLevel: 1,
      error: false,
      nodeType: 'a',
      collapse: true,
      panels: [
        { title: '成功率', value: '11%' },
        { title: '耗时', value: '111' },
        { title: '错误数', value: '111' },
      ],
    },
    {
      id: uuid(),
      title: `node-${uuid()}`,
      nodeLevel: 1,
      error: true,
      nodeType: 'b',
      collapse: true,
      panels: [
        { title: '成功率', value: '11%' },
        { title: '耗时', value: '111' },
        { title: '错误数', value: '111' },
      ],
    },
  ];
  return childData;
}

const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
    ['M', x, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2, y],
    ['L', x + 2 * r - 2, y],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ['M', x, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2, y],
    ['L', x + 2 * r - 2, y],
    ['M', x + r, y - r + 2],
    ['L', x + r, y + r - 2],
  ];
};

const ICON_MAP = {
  a: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*0HC-SawWYUoAAAAAAAAAAABkARQnAQ',
  b: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*sxK0RJ1UhNkAAAAAAAAAAABkARQnAQ',
};

G6.registerNode(
  'onestep-box',
  {
    drawShape: function drawShape(cfg: any, group) {
      const color = cfg.error ? '#F4664A' : '#30BF78';
      const r = 2;
      const shape = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 200,
          height: 60,
          stroke: color,
          radius: r,
        },
        name: 'main-box',
        draggable: true,
      });

      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 200,
          height: 20,
          fill: color,
          radius: [r, r, 0, 0],
        },
        name: 'title-box',
        draggable: true,
      });

      // 左侧图标
      group.addShape('image', {
        attrs: {
          x: 4,
          y: 2,
          height: 16,
          width: 16,
          cursor: 'pointer',
          img: ICON_MAP[cfg.nodeType || 'app'],
        },
        name: 'node-icon',
      });

      // 标题
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          y: 2,
          x: 24,
          lineHeight: 20,
          text: cfg.title,
          fill: '#fff',
        },
        name: 'title',
      });

      if (cfg.nodeLevel > 0) {
        group.addShape('marker', {
          attrs: {
            x: 184,
            y: 30,
            r: 6,
            cursor: 'pointer',
            symbol: cfg.collapse ? EXPAND_ICON : COLLAPSE_ICON,
            stroke: '#666',
            lineWidth: 1,
          },
          name: 'collapse-icon',
        });
      }

      // 卡片节点中的内容列表
      cfg.panels.forEach((item, index) => {
        // 名称
        group.addShape('text', {
          attrs: {
            textBaseline: 'top',
            y: 25,
            x: 24 + index * 60,
            lineHeight: 20,
            text: item.title,
            fill: 'rgba(0,0,0, 0.4)',
          },
          name: `index-title-${index}`,
        });

        // 值
        group.addShape('text', {
          attrs: {
            textBaseline: 'top',
            y: 42,
            x: 24 + index * 60,
            lineHeight: 20,
            text: item.value,
            fill: '#595959',
          },
          name: `index-title-${index}`,
        });
      });
      return shape;
    },
    update: undefined,
  },
  'single-node',
);

const data = {
  title: 'root',
  error: true,
  nodeType: 'a',
  id: 'root',
  nodeLevel: 2,
  panels: [
    { title: '成功率', value: '11%' },
    { title: '耗时', value: '111' },
    { title: '错误数', value: '111' },
  ],
  children: [
    {
      title: 'node1',
      error: true,
      nodeType: 'a',
      id: 'node1',
      nodeLevel: 2,
      panels: [
        { title: '成功率', value: '11%' },
        { title: '耗时', value: '111' },
        { title: '错误数', value: '111' },
      ],
      collapse: true,
    },
    {
      title: 'node2',
      error: false,
      nodeType: 'b',
      id: 'node2',
      nodeLevel: 0,
      panels: [
        { title: '成功率', value: '11%' },
        { title: '耗时', value: '111' },
        { title: '错误数', value: '111' },
      ],
    },
    {
      title: 'node3',
      error: false,
      nodeType: 'a',
      id: 'node3',
      nodeLevel: 3,
      panels: [
        { title: '成功率', value: '11%' },
        { title: '耗时', value: '111' },
        { title: '错误数', value: '111' },
      ],
      collapse: true,
    },
  ],
};

const CustomCardNode = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      graph = new G6.TreeGraph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
        defaultNode: {
          type: 'onestep-box',
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
        },
        // fitView: true,
        layout: {
          type: 'mindmap',
          direction: 'H',
          defalutPosition: [],
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
            return 50;
          },
          getHGap: function getHGap() {
            return 150;
          },
        },
      });
    }

    graph.data(data);
    graph.render();

    graph.on('node:click', (event) => {
      const { item } = event;
      const name = event.target.get('name');
      const model = item.getModel();

      if (name === 'collapse-icon') {
        const children = model.children;
        if (!children || children.length === 0) {
          const childData = fetchData();
          // 手动改变图标
          model.children = childData;
          graph.changeData();
        }
      }
    });
  });

  return <div ref={container}></div>;
};

export default CustomCardNode;
