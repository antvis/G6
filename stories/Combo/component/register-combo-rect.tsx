import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { ComboConfig, Item } from '../../../src/types';
import { IGroup } from '@antv/g-base/lib/interfaces';
import { isNumber } from 'util';
import { ShapeOptions } from '../../../src/interface/shape';
import { clone } from '@antv/util';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 150,
      label: 'node1',
      comboId: 'A'
    },
    {
      id: 'node2',
      x: 200,
      y: 250,
      label: 'node2',
      comboId: 'B'
    },
    {
      id: 'node3',
      x: 100,
      y: 250,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
  ],
  combos: [
  {
    id: 'A',
    parentId: 'B',
    label: 'gorup A',
    padding: [50, 10, 10, 10]
    // type: 'rect'
  }, {
    id: 'B',
    // parentId: 'C',
    label: 'gorup B',
    // padding: [50, 10, 10, 50]
    // type: 'rect'
  },
  // {
  //   id: 'C',
  //   label: 'gorup C',
  //   // type: 'rect'
  // },
  {
    id: 'D',
    label: 'gorup D',
    // type: 'rect'
  }, {
    id: 'E',
    // type: 'rect'
  }]
};

const data2 = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 150,
      label: 'node1',
      comboId: 'A'
    },
    {
      id: 'node2',
      x: 200,
      y: 250,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 250,
      label: 'node3',
    },
    {
      id: 'node4',
      x: 200,
      y: 350,
      label: 'node4',
      comboId: 'B'
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node4',
    },
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
  ],
  combos: [
  {
    id: 'A',
    parentId: 'C',
    label: 'gorup A',
    type: 'circle'
  }, {
    id: 'B',
    parentId: 'C',
    label: 'gorup B',
    type: 'circle'
  }, {
    id: 'C',
    label: 'gorup C',
    // type: 'rect'
  }, {
    id: 'F',
    label: 'gorup F',
    // type: 'rect'
  }, {
    id: 'G',
    label: 'gorup G',
    // parentId: 'F'
    type: 'circle'
  }]
};

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
  'custom-rect-combo',
  {
    // 自定义 Combo 时的配置
    options: {
      size: [160, 50],
      padding: [25, 20, 15, 20],
      animate: true,
      // 文本样式配置
      labelCfg: {
        style: {
          fill: '#595959',
        },
      },
      // 连接点，默认为左右
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      collapseIcon: {
        show: true,
        collapseSymbol: collapseIcon,
        expandSymbol: expandIcon,
        r: 6,
        lineWidth: 1,
        stroke: '#595959',
        offsetX: 10,
        offsetY: 10
      }
    },
    drawShape(cfg: ComboConfig, group) {
      const style = this.getShapeStyle(cfg);
      const keyShape = group.addShape('rect', {
        attrs: style,
        className: 'rect-combo',
        name: 'rect-combo',
        draggable: true,
        x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
        y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
        width: style.width,
        height: style.height
      });
      this.drawCollapseIcon(cfg, group, style);
      return keyShape;
    },
    /**
     * 绘制节点上的LinkPoints
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    drawCollapseIcon(cfg: ComboConfig, group: IGroup, style: any) {
      const { collapseIcon: defaultCollapseIcon } = this.options as ComboConfig;
      const collapseIcon = Object.assign({}, defaultCollapseIcon, cfg.collapseIcon);
      let padding: number | number[] = cfg.padding || this.options.padding;
      if (isNumber(padding)) padding = [padding, padding, padding, padding];

      const { show, collapseSymbol, expandSymbol, offsetX, offsetY } = collapseIcon;
      delete collapseIcon.collapseSymbol;
      delete collapseIcon.expandSymbol;
      const r = collapseIcon.r;
      delete collapseIcon.r;
  
      const rightDis = cfg.style.width / 2 + padding[1];
      const topDis = cfg.style.height / 2 + padding[0];

      if (show) {
        // left circle
        const attrs = {
          r,
          x: rightDis - r - offsetX,
          y: -topDis + r + offsetY,
          ...collapseIcon,
          symbol: collapseSymbol,
        };

        group.addShape('marker', {
          attrs,
          className: 'collapse-icon',
          name: 'collapse-icon'
        });
      }
    },
    /**
     * 更新 rect combo 的 collapse/expand icon
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    updateCollapseIcon1(cfg, item: Item, style: any) {
      const { collapseIcon: defaultCollapseIcon } = this.options as ComboConfig;
      const collapseIcon = Object.assign({}, defaultCollapseIcon, cfg.collapseIcon);
      let padding: number | number[] = cfg.padding || this.options.padding;
      if (isNumber(padding)) padding = [padding, padding, padding, padding]

      const { show, collapseSymbol, expandSymbol, offsetX, offsetY } = collapseIcon;
      delete collapseIcon.collapseSymbol;
      delete collapseIcon.expandSymbol;
      const r = collapseIcon.r;
      delete collapseIcon.r;
  
      const rightDis = cfg.style.width / 2 + padding[1];
      const topDis = cfg.style.height / 2 + padding[0];

      const group = item.getContainer();
      const icon = group.find(element => element.get('name') === 'collapse-icon');
      const attrs = {
        r,
        x: rightDis - r - offsetX,
        y: -topDis + r + offsetY,
        ...collapseIcon,
        symbol: collapseSymbol,
      }
      if (!icon && show) {
        // left circle
        group.addShape('marker', {
          attrs,
          className: 'collapse-icon',
          name: 'collapse-icon'
        });
      } else if (show) {
        icon.attr({ ...attrs });
      }
    }
  },
  'rect'
);

const RegisterComboRect = () => {
  const container = React.useRef();
  G6.registerCombo('custom-combo', {
    drawShape: (cfg, group) => {
      const style = cfg.style || {};
      const keyShape = group.addShape('rect', {
        attrs: style,
        className: 'rect-combo-icon',
        name: 'rect-combo-icon',
        draggable: true,
      });
      group.addShape('marker', {
        attrs: {
          x: keyShape.attr('width') - 5,
          y: 5,
          r: 5,
          stroke: '#C00',
          symbol: 'triangle-down'
        },
        name: 'marker-shape'
      })
      return keyShape;
    },
    afterUpdate: (cfg, item) => {
      const group = item.get('group');
      if (cfg.markerStyle) {
        const marker = group.find(ele => ele.get('name') === 'marker-shape');
        marker.attr(cfg.markerStyle);
      }
      const keyShape = group.get('children')[0];
      keyShape.attr(cfg.style);
    }
  }, 'rect-combo');

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        modes: {
          default: [ 'drag-canvas', 'drag-combo', 'drag-node' ]
        },
        defaultCombo: {
          size: [300, 200],
          type: 'custom-rect-combo',//custom-combo
          style: {
            fill: '#ccc',
            stroke: '#000',
            opacity: 0.8
          }
        },
      });
      
      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default RegisterComboRect;
