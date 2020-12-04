import React, { Component } from 'react';
import G6 from '../../../src';
import { IEdge } from '../../../src/interface/item';
// import "./styles.css";

export default class ForceLayout extends Component {
  graph;

  componentDidMount() {
    const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
      return [
        ['M', x - r, y - r],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x + 2 - r, y - r],
        ['L', x + r - 2, y - r],
        ['M', x, y - 2 * r + 2],
        ['L', x, y - 2],
      ];
    };
    // 2.数据准备
    const sourData = {
      nodes: [
        {
          id: '0',
          label: '0',
          cluster: 'Sour',
          name: 'MySQL'
        },
        {
          id: '1',
          label: '1',
          cluster: 'Sour',
          name: 'Oracle'
        },
        {
          id: '2',
          label: '2',
          cluster: 'Sour',
          name: 'Oracle'
        },
        {
          id: '3',
          label: '3',
          cluster: 'Sour',
          name: 'IBM DB2'
        },
        {
          id: '4',
          label: '4',
          cluster: 'Sour',
          name: 'IBM DB2'
        },
        {
          id: '05',
          label: '05',
          cluster: 'Sour',
          name: '达梦'
        },
        {
          id: '06',
          label: '06',
          cluster: 'Sour',
          name: '达梦'
        },
        {
          id: '07',
          label: '07',
          cluster: 'Sour',
          name: 'MySQL'
        }
      ],
      edges: [
        {
          source: '0',
          target: '1',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '1',
          target: '0',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '0',
          target: '2',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '0',
          target: '3',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '0',
          target: '4',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '1',
          target: '2',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '1',
          target: '3',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '1',
          target: '4',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '1',
          target: '05',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '1',
          target: '06',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '2',
          target: '3',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '2',
          target: '4',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '2',
          target: '05',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '2',
          target: '07',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '3',
          target: '4',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '3',
          target: '05',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '3',
          target: '06',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '05',
          target: '3',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '07',
          target: '3',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '05',
          target: '4',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '06',
          target: '4',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '0',
          target: '05',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        },
        {
          source: '0',
          target: '07',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#7CD13B',
            }
          }
        }
      ],
    };
    const tableData = {
      nodes: [
        {
          id: '5',
          label: '5',
          cluster: 'Table',
          name: '表5'
        },
        {
          id: '6',
          label: '6',
          cluster: 'Table',
          name: '表6'
        },
        {
          id: '7',
          label: '7',
          cluster: 'Table',
          name: '表7'
        },
        {
          id: '8',
          label: '8',
          cluster: 'Table',
          name: '表8'
        },
        {
          id: '9',
          label: '9',
          cluster: 'Table',
          name: '表9'
        },
        {
          id: '10',
          label: '10',
          cluster: 'Table',
          name: '表10'
        },
        {
          id: '11',
          label: '11',
          cluster: 'Table',
          name: '表11'
        },
        {
          id: '12',
          label: '12',
          cluster: 'Table',
          name: '表12'
        },
        {
          id: '13',
          label: '13',
          cluster: 'Table',
          name: '表13'
        },
        {
          id: '14',
          label: '14',
          cluster: 'Table',
          name: '表14'
        },
        {
          id: '15',
          label: '15',
          cluster: 'Table',
          name: '表15'
        },
        {
          id: '16',
          label: '16',
          cluster: 'Table',
          name: '表16'
        },
        {
          id: '17',
          label: '17',
          cluster: 'Table',
          name: '表17'
        },
        {
          id: '18',
          label: '18',
          cluster: 'Table',
          name: '表18'
        },
        {
          id: '19',
          label: '19',
          cluster: 'Table',
          name: '表19'
        },
        {
          id: '20',
          label: '20',
          cluster: 'Table',
          name: '表20'
        },
        {
          id: '21',
          label: '21',
          cluster: 'Table',
          name: '表21'
        },
        {
          id: '22',
          label: '22',
          cluster: 'Table',
          name: '表22'
        },
        {
          id: '23',
          label: '23',
          cluster: 'Table',
          name: '表23'
        },
        {
          id: '24',
          label: '24',
          cluster: 'Table',
          name: '表24'
        }
      ],
      edges: [
        {
          source: '5',
          target: '6',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '5',
          target: '7',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '5',
          target: '8',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '5',
          target: '9',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '5',
          target: '10',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '7',
          target: '8',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '7',
          target: '9',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '7',
          target: '10',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '7',
          target: '11',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '10',
          target: '11',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '10',
          target: '12',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '12',
          target: '14',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '15',
          target: '16',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '15',
          target: '18',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '15',
          target: '20',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '15',
          target: '24',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '18',
          target: '19',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '18',
          target: '22',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '18',
          target: '23',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '18',
          target: '24',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '20',
          target: '21',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '21',
          target: '23',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '22',
          target: '23',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '24',
          target: '5',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        }
      ],
    };
    const fieldData = {
      nodes: [
        {
          id: '25',
          label: '25',
          cluster: 'Field',
          name: '字段25'
        },
        {
          id: '26',
          label: '26',
          cluster: 'Field',
          name: '字段26'
        },
        {
          id: '27',
          label: '27',
          cluster: 'Field',
          name: '字段27'
        },
        {
          id: '28',
          label: '28',
          cluster: 'Field',
          name: '字段28'
        },
        {
          id: '29',
          label: '29',
          cluster: 'Field',
          name: '字段29'
        },
        {
          id: '30',
          label: '30',
          cluster: 'Field',
          name: '字段30'
        },
        {
          id: '31',
          label: '31',
          cluster: 'Field',
          name: '字段31'
        },
        {
          id: '32',
          label: '32',
          cluster: 'Field',
          name: '字段32'
        },
        {
          id: '33',
          label: '33',
          cluster: 'Field',
          name: '字段33'
        },
        {
          id: '34',
          label: '34',
          cluster: 'Field',
          name: '字段34'
        },
      ],
      edges: [
        {
          source: '25',
          target: '26',
          style: {          //节点之间连线的样式
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              stroke: '#FF0000',
            }
          }
        },
        {
          source: '26',
          target: '27',
        },
        {
          source: '25',
          target: '28',
        },
        {
          source: '25',
          target: '29',
        },
        {
          source: '25',
          target: '30',
        },
        {
          source: '27',
          target: '28',
        },
        {
          source: '27',
          target: '29',
        },
        {
          source: '27',
          target: '30',
        },
        {
          source: '27',
          target: '31',
        },
        {
          source: '30',
          target: '31',
        },
        {
          source: '30',
          target: '32',
        },
        {
          source: '32',
          target: '34',
        },
        {
          source: '33',
          target: '34',
        }
      ],
    };
    //自定义二分图布局
    G6.registerLayout("bigraph-layout", {
      // 默认参数
      //     center: [0, 0], // 布局的中心
      //     biSep: 100, // 两部分的间距
      //     nodeSep: 20, // 同一部分的节点间距
      //     direction: 'horizontal', // 两部分的分布方向
      //     nodeSize: 20, // 节点大小

      //执行布局
      execute() {
        const self = this;
        console.log(self);
        const center = self.center || [0, 0];
        const biSep = self.biSep || 250;
        const nodeSep = self.nodeSep || 50;
        const nodeSize = self.nodeSize || 20;
        const direction = self.direction || "horizontal";
        let part1Pos = 0;
        let part2Pos = 0;
        // 指定垂直方向布局
        if (direction === "horizontal") {
          part1Pos = center[0] - biSep / 2;
          part2Pos = center[0] + biSep / 2;
        }
        const { nodes, edges } = self;
        const part1Nodes = [];
        const part2Nodes = [];
        const part1NodeMap = new Map();
        const part2NodeMap = new Map();
        // separate the nodes and init the positions
        nodes.forEach(function (node, i) {
          if (node.name === "MySQL") {
            part1Nodes.push(node);
            part1NodeMap.set(node.id, i);
          } else {
            part2Nodes.push(node);
            part2NodeMap.set(node.id, i);
          }
        });

        // 放置节点
        const hLength =
          part1Nodes.length > part2Nodes.length
            ? part1Nodes.length
            : part2Nodes.length;
        const height = hLength * (nodeSep + nodeSize);
        let begin = center[1] - height / 2;
        // if (direction === "vertical") {
        //   begin = center[0] - height / 2;
        // }
        part1Nodes.forEach(function (p1n, i) {
          if (direction === "horizontal") {
            p1n.x = part1Pos;
            p1n.y = begin + i * (nodeSep + nodeSize);
          } else {
            p1n.x = begin + i * (nodeSep + nodeSize);
            p1n.y = part1Pos;
          }
        });
        part2Nodes.forEach(function (p2n, i) {
          if (direction === "horizontal") {
            p2n.x = part2Pos;
            p2n.y = begin + i * (nodeSep + nodeSize);
          } else {
            p2n.x = begin + i * (nodeSep + nodeSize);
            p2n.y = part2Pos;
          }
        });
      }
    });
    //自定义矩形图布局
    G6.registerLayout("rect-layout", {
      // 默认参数
      //     center: [0, 0], // 布局的中心
      //     biSep: 200, // 两部分的间距
      //     nodeSep: 20, // 同一部分的节点间距
      //     direction: 'horizontal', // 两部分的分布方向
      //     nodeSize: 20, // 节点大小

      //执行布局
      execute() {
        const self = this;
        console.log(self);
        const center = self.center || [0, 0];
        const biSep = self.biSep || 300;
        const nodeSep = self.nodeSep || 20;
        const nodeSize = self.nodeSize || 110;
        const direction = self.direction || "rect";
        let part1Pos = 0;
        let part2Pos = 0;
        let part3Pos = 0;
        let part4Pos = 0;
        // 指定矩形形状布局
        if (direction === "rect") {
          part1Pos = center[0] - biSep / 2;
          part2Pos = center[0] + biSep / 2;
          part3Pos = center[1] - biSep / 2;
          part4Pos = center[1] + biSep / 2;
        }
        const { nodes, edges } = self;
        const part1Nodes = [];
        const part2Nodes = [];
        const part3Nodes = [];
        const part4Nodes = [];
        const part1NodeMap = new Map();
        const part2NodeMap = new Map();
        const part3NodeMap = new Map();
        const part4NodeMap = new Map();
        // separate the nodes and init the positions
        nodes.forEach(function (node, i) {
          if (node.name === "MySQL") {
            part1Nodes.push(node);
            part1NodeMap.set(node.id, i);
            // console.log(part1Nodes);
          }
          if (node.name === "IBM DB2") {
            part2Nodes.push(node);
            part2NodeMap.set(node.id, i);
            // console.log(part2Nodes);
          }
          if (node.name === "Oracle") {
            part3Nodes.push(node);
            part3NodeMap.set(node.id, i);
            // console.log(part3Nodes);
          }
          if (node.name === "达梦") {
            part4Nodes.push(node);
            part4NodeMap.set(node.id, i);
            // console.log(part4Nodes);
          }
        });

        // 放置节点
        const hLength =
          part1Nodes.length > part2Nodes.length
            ? part1Nodes.length
            : part2Nodes.length;
        const xLength =
          part3Nodes.length > part4Nodes.length
            ? part3Nodes.length
            : part4Nodes.length;
        const height = hLength * (nodeSep + nodeSize);
        const width = xLength * (nodeSep + nodeSize);
        let hbegin = center[1] - height / 2;
        let xbegin = center[0] - width / 2;
        // if (direction === "vertical") {
        //   begin = center[0] - height / 2;
        // }
        part1Nodes.forEach(function (p1n, i) {
          if (direction === "rect") {
            p1n.x = xbegin - nodeSize;
            p1n.y = hbegin + i * (nodeSep + nodeSize);
            // console.log(p1n);
          }
        });
        part2Nodes.forEach(function (p2n, i) {
          if (direction === "rect") {
            p2n.x = xbegin + width;
            p2n.y = hbegin + i * (nodeSep + nodeSize);
            // console.log(p2n);
          }
        });
        part3Nodes.forEach(function (p3n, i) {
          if (direction === "rect") {
            p3n.x = xbegin + i * (nodeSep + nodeSize);
            p3n.y = part3Pos;
          }
        });
        part4Nodes.forEach(function (p4n, i) {
          if (direction === "rect") {
            p4n.x = xbegin + i * (nodeSep + nodeSize);
            p4n.y = part4Pos;
          }
        });
      }
    });

    (sourData as any).leftIcon = {
      style: {
        fill: '#e6fffb',
        stroke: '#e6fffb',
      },
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ',
    };

    G6.registerNode(
      'icon-node',
      {
        options: {
          size: [60, 20],
          stroke: '#91d5ff',
          fill: '#91d5ff',
        },
        draw(cfg, group) {
          const styles = this.getShapeStyle(cfg);
          const { labelCfg = {} } = cfg;

          const keyShape = group.addShape('rect', {
            attrs: {
              ...styles,
              x: 0,
              y: 0,
            },
          });

          /**
           * leftIcon 格式如下：
           *  {
           *    style: ShapeStyle;
           *    img: ''
           *  }
           */
          // console.log('cfg.leftIcon', cfg.leftIcon);
          // if (cfg.leftIcon) {
          //   const { style, img } = cfg.leftIcon;
          group.addShape('rect', {
            attrs: {
              x: 1,
              y: 1,
              width: 38,
              height: styles.height - 2,
              fill: '#ffffff',
              // ...style,
            },
          });
          // group.addShape('rect', {
          //   attrs: {
          //     x: 180,
          //     y: 1,
          //     width: 22,
          //     height: styles.height - 2,
          //     fill: '#ffffff',
          //     // ...style,
          //   },
          // });

          group.addShape('image', {
            attrs: {
              x: 1,
              y: 1,
              width: 38,
              height: 30,
              // img:
              //   img ||
              //   'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
            },
            name: 'image-shape',
          });
          // }

          // 如果不需要动态增加或删除元素，则不需要 add 这两个 marker
          group.addShape('marker', {
            attrs: {
              x: -6,
              y: 15,
              r: 6,
              stroke: '#73d13d',
              cursor: 'pointer',
              symbol: EXPAND_ICON,
            },
            name: 'add-tableData',
          });
          group.addShape('marker', {
            attrs: {
              x: 46,
              y: 15,
              r: 6,
              stroke: '#73d13d',
              cursor: 'pointer',
              symbol: EXPAND_ICON,
            },
            name: 'add-fieldData',
          });
          group.addShape('marker', {
            attrs: {
              x: 190,
              y: 22,
              r: 6,
              stroke: '#ffffff',
              cursor: 'pointer',
              symbol: EXPAND_ICON,
            },
            name: 'show-tableData',
          });

          if (cfg.label) {
            group.addShape('text', {
              attrs: {
                ...labelCfg.style,
                text: cfg.label,
                x: 100,
                y: 20,
              },
            });
          }

          return keyShape;
        },
      },
      'rect',
    );

    G6.registerEdge(
      'circle-running',
      {
        afterDraw(cfg, group) {
          // get the first shape in the group, it is the edge's path here=
          const shape = group.get('children')[0];
          // the start position of the edge's path
          const startPoint = shape.getPoint(0);

          // add red circle shape
          const circle = group.addShape('circle', {
            attrs: {
              x: startPoint.x,
              y: startPoint.y,
              fill: '#1890ff',
              r: 3,
            },
            name: 'circle-shape',
          });

          // animation for the red circle
          circle.animate(
            (ratio) => {
              // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
              // get the position on the edge according to the ratio
              const tmpPoint = shape.getPoint(ratio);
              // returns the modified configurations here, x and y here
              return {
                x: tmpPoint.x,
                y: tmpPoint.y,
              };
            },
            {
              repeat: true, // Whether executes the animation repeatly
              duration: 3000, // the duration for executing once
            },
          );
        },
      },
      'cubic', // extend the built-in edge 'cubic'
    );

    // 3.图实例化
    const width = document.getElementById('container').scrollWidth;
    const height = document.getElementById('container').scrollHeight || 500;

    const minimap = new G6.Minimap({
      size: [300, 300],
    });
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      plugins: [minimap],
      modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas', {
          type: 'tooltip',
          // formatText: function formatText(model) {
          //   return model.name
          // },
          offset: 30
        }, {
            type: 'edge-tooltip',
            // formatText: function formatText(model, e) {
            //   const edge = e.item;
            //   return ('来源：' + edge.getSource().getModel().name + 
            //     '<br/>去向：' + edge.getTarget().getModel().name)
            // },
            offset: 30
          }, 'activate-relations'],
      },
      layout: {
        type: 'circular',
        preventOverlap: true
      },
      animate: true,
      defaultNode: {
        type: 'icon-node',
        size: [203, 32],
        style: {
          radius: 1,
          lineWidth: 2,
          fill: '#91d5ff',
          stroke: '#40a9ff',
          // fillOpacity: 1
        },
        labelCfg: {
          style: {
            fill: '#595959',
            fontSize: 14
          },
          offset: 30
        }
      },
      defaultEdge: {
        type: 'circle-running',
        size: 3,
        color: '#e2e2e2',
        style: {
          endArrow: {
            path: 'M 0,0 L 8,4 L 8,-4 Z',
            fill: '#e2e2e2',
          },
        },
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 2,
          stroke: '#1890ff',
          fill: '#FFA500',
        },
        click: {
          // lineWidth: 2,
          // stroke: 'red',
          // fill: 'red',
        },
      },
      edgeStateStyles: {
        // 突显节点连接线
        active: {
          stroke: '#999'
        }
        // hover: {
        //   lineWidth: 2,
        //   stroke: '#1890ff',
        //   fill: '#e6f7ff',
        // }
      },
    });
    // 4.图的渲染
    graph.data(sourData); // 加载数据
    graph.render(); // 渲染
    graph.get('canvas').set('localRefrsh', false)

    // 5.数据切换
    // setTimeout(() => {
    //   graph.changeData(tableData);
    // }, 3000)

    // 6.节点的交互事件
    graph.on('node:mouseenter', (evt) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
    });
    graph.on('node:mouseleave', (evt) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', false);
    });
    graph.on('node:click', (evt) => {
      const { item, target } = evt;
      const targetType = target.get('type');
      const name = target.get('name');
      if (targetType === 'marker') {
        if (name === 'add-tableData') {
          graph.setItemState(item, 'click', true);
          setTimeout(() => {
            graph.changeData(tableData);
          }, 1000)
        }
        if (name === 'add-fieldData') {
          graph.setItemState(item, 'click', true);
          setTimeout(() => {
            graph.changeData(fieldData);
          }, 2000)
        }
        if (name === 'show-tableData') {
          console.log('展现数据源下的数据');
          const node = evt.item;
          const model = node.getModel();
          console.log(model);
          graph.addItem('node', {
            x: (101 + model.x),
            y: (82 + model.y),
            id: `1 + ${model.id}`,
            label: 'a_all_gs(a_all_gs)',
            type: 'rect',
            size: [203, 100],
            style: {
              fill: '#ffffff',
            }
          })
        }
      }
      else {
        console.log('节点被点击');
        // const node = evt.item;
        // const model = node.getModel();
        // model.oriLabel = model.label;
        // model.style = {fill: 'yellow'};
        // graph.updateItem(node, {
        //   label: `clicked ${model.id}`,
        //   labelCfg: {
        //     style: {
        //       fill: '#003a8c',
        //     },
        //   },
        // });
      }
    })
    // 7.连线的交互事件
    graph.on('edge:mouseenter', (evt) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
      // 获取连线起点和终点坐标的对象后调用函数
      const edge: IEdge = evt.item as IEdge;
      getCubicController(edge.getSource().getModel(), edge.getTarget().getModel());
    });
    graph.on('edge:mouseleave', (evt) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', false);
    });
    graph.on('edge:click', (evt) => {
      console.log('连线被点击');
      const { item } = evt;
      // console.log(item.get('model').style);
      // item.get('model').style = {fill: "black"};
      // 获取连线起点和终点坐标的对象后调用函数
      const edge: IEdge = evt.item as IEdge;
      console.log(edge.getSource().getModel().name);
      console.log(edge.getSource().getModel());
      console.log(edge.getTarget().getModel().name);
      console.log(edge.getTarget().getModel());
      var temp = getCubicController(edge.getSource().getModel(), edge.getTarget().getModel());
      console.log(temp);
    })

    function circleFun() {
      graph.updateLayout({ type: 'circular', preventOverlap: true, radius: 200 });
      document.getElementById('radial').style.backgroundColor = '#e2e2e2';
      document.getElementById('bigraph').style.backgroundColor = '#e2e2e2';
      document.getElementById('grid').style.backgroundColor = '#e2e2e2';
      document.getElementById('circular').style.backgroundColor = '#99FFFF ';
      document.getElementById('fruchterman').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('concentric').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('mds').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('dagre').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('rect').style.backgroundColor = '#e2e2e2';
    }
    function radialFun() {
      graph.updateLayout({ type: 'radial', preventOverlap: true, nodeSize: 203, strictRadial: true, linkDistance: 50, nodeSpacing: 30 });
      document.getElementById('circular').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('bigraph').style.backgroundColor = '#e2e2e2';
      document.getElementById('grid').style.backgroundColor = '#e2e2e2';
      document.getElementById('radial').style.backgroundColor = '#99FFFF';
      document.getElementById('fruchterman').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('concentric').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('mds').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('dagre').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('rect').style.backgroundColor = '#e2e2e2';
    }
    function bigraphFun() {
      graph.updateLayout({ type: 'bigraph-layout' });
      document.getElementById('radial').style.backgroundColor = '#e2e2e2';
      document.getElementById('grid').style.backgroundColor = '#e2e2e2';
      document.getElementById('circular').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('bigraph').style.backgroundColor = '#99FFFF';
      document.getElementById('fruchterman').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('concentric').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('mds').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('dagre').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('rect').style.backgroundColor = '#e2e2e2';
    }
    function gridFun() {
      graph.updateLayout({
        type: 'grid',
        begin: [20, 20],
        preventOverlap: true,
        nodeSize: 203,
        width: width - 20,
        height: height - 20,
        // condense: true,
        sortBy: 'cluster',
      });
      document.getElementById('radial').style.backgroundColor = '#e2e2e2';
      document.getElementById('circular').style.backgroundColor = '#e2e2e2';
      document.getElementById('bigraph').style.backgroundColor = '#e2e2e2';
      document.getElementById('grid').style.backgroundColor = '#99FFFF ';
      document.getElementById('fruchterman').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('concentric').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('mds').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('dagre').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('rect').style.backgroundColor = '#e2e2e2';
    }
    function fruchtermanFun() {
      graph.updateLayout({
        type: 'fruchterman',
        gravity: 5,
        speed: 5,
      });
      document.getElementById('radial').style.backgroundColor = '#e2e2e2';
      document.getElementById('circular').style.backgroundColor = '#e2e2e2';
      document.getElementById('bigraph').style.backgroundColor = '#e2e2e2';
      document.getElementById('grid').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('fruchterman').style.backgroundColor = '#99FFFF ';
      document.getElementById('concentric').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('mds').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('dagre').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('rect').style.backgroundColor = '#e2e2e2';
    }
    function concentricFun() {
      graph.updateLayout({
        type: 'concentric',
        preventOverlap: true,
        nodeSize: 203,
        // sortBy: 'degree',
      });
      document.getElementById('radial').style.backgroundColor = '#e2e2e2';
      document.getElementById('circular').style.backgroundColor = '#e2e2e2';
      document.getElementById('bigraph').style.backgroundColor = '#e2e2e2';
      document.getElementById('grid').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('fruchterman').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('concentric').style.backgroundColor = '#99FFFF ';
      document.getElementById('mds').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('dagre').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('rect').style.backgroundColor = '#e2e2e2';
    }
    function MDSFun() {
      graph.updateLayout({
        type: 'mds',
        linkDistance: 200
      });
      document.getElementById('radial').style.backgroundColor = '#e2e2e2';
      document.getElementById('circular').style.backgroundColor = '#e2e2e2';
      document.getElementById('bigraph').style.backgroundColor = '#e2e2e2';
      document.getElementById('grid').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('fruchterman').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('concentric').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('mds').style.backgroundColor = '#99FFFF ';
      document.getElementById('dagre').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('rect').style.backgroundColor = '#e2e2e2';
    }
    function DagreFun() {
      graph.updateLayout({
        type: 'dagre',
        rankdir: 'LR',
        align: 'UL',
        controlPoints: true,
        nodesepFunc: () => 1,
        ranksepFunc: () => 1
      });
      document.getElementById('radial').style.backgroundColor = '#e2e2e2';
      document.getElementById('circular').style.backgroundColor = '#e2e2e2';
      document.getElementById('bigraph').style.backgroundColor = '#e2e2e2';
      document.getElementById('grid').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('fruchterman').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('concentric').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('mds').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('dagre').style.backgroundColor = '#99FFFF ';
      document.getElementById('rect').style.backgroundColor = '#e2e2e2';
    }
    function rectFun() {
      graph.updateLayout({ type: 'rect-layout' });
      document.getElementById('radial').style.backgroundColor = '#e2e2e2';
      document.getElementById('grid').style.backgroundColor = '#e2e2e2';
      document.getElementById('circular').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('bigraph').style.backgroundColor = '#e2e2e2';
      document.getElementById('fruchterman').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('concentric').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('mds').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('dagre').style.backgroundColor = '#e2e2e2 ';
      document.getElementById('rect').style.backgroundColor = '#99FFFF';
    }
    function getCubicController(source, target) {
      let c1, c2;

      let distance = (target.y - source.y) / 5;
      if (distance > 0) distance = Math.max(distance, 80);
      if (distance < 0) distance = Math.min(distance, -80);

      let p1 = [
        source.x,
        source.y
      ];

      let p4 = [
        target.x,
        target.y
      ]

      if (target.y > source.y) {
        c1 = [source.x, source.y + distance];
        c2 = [target.x, target.y - distance];
      }
      else {
        c1 = [source.x, source.y - distance];
        c2 = [target.x, target.y + distance];
      }
      return {
        c1,
        c2
      }

    }
  }

  render() {
    return (
      <>
        <div id="container" />
      </>
    )
  }
}
