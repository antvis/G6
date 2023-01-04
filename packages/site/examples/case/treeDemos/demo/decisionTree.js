import G6 from '@antv/g6';
import insertCss from 'insert-css';

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .g6-component-tooltip {
    background-color: rgba(0,0,0, 0.65);
    padding: 10px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    width: fit-content;
    color: #fff;
    border-radius = 4px;
  }
`);

// mocked data
const mockData = {
  id: 'g1',
  name: 'Name1',
  count: 123456,
  label: '538.90',
  currency: 'Yuan',
  rate: 1.0,
  status: 'B',
  variableName: 'V1',
  variableValue: 0.341,
  variableUp: false,
  children: [
    {
      id: 'g12',
      name: 'Deal with LONG label LONG label LONG label LONG label',
      count: 123456,
      label: '338.00',
      rate: 0.627,
      status: 'R',
      currency: 'Yuan',
      variableName: 'V2',
      variableValue: 0.179,
      variableUp: true,
      children: [
        {
          id: 'g121',
          name: 'Name3',
          collapsed: true,
          count: 123456,
          label: '138.00',
          rate: 0.123,
          status: 'B',
          currency: 'Yuan',
          variableName: 'V2',
          variableValue: 0.27,
          variableUp: true,
          children: [
            {
              id: 'g1211',
              name: 'Name4',
              count: 123456,
              label: '138.00',
              rate: 1.0,
              status: 'B',
              currency: 'Yuan',
              variableName: 'V1',
              variableValue: 0.164,
              variableUp: false,
              children: [],
            },
          ],
        },
        {
          id: 'g122',
          name: 'Name5',
          collapsed: true,
          count: 123456,
          label: '100.00',
          rate: 0.296,
          status: 'G',
          currency: 'Yuan',
          variableName: 'V1',
          variableValue: 0.259,
          variableUp: true,
          children: [
            {
              id: 'g1221',
              name: 'Name6',
              count: 123456,
              label: '40.00',
              rate: 0.4,
              status: 'G',
              currency: 'Yuan',
              variableName: 'V1',
              variableValue: 0.135,
              variableUp: true,
              children: [
                {
                  id: 'g12211',
                  name: 'Name6-1',
                  count: 123456,
                  label: '40.00',
                  rate: 1.0,
                  status: 'R',
                  currency: 'Yuan',
                  variableName: 'V1',
                  variableValue: 0.181,
                  variableUp: true,
                  children: [],
                },
              ],
            },
            {
              id: 'g1222',
              name: 'Name7',
              count: 123456,
              label: '60.00',
              rate: 0.6,
              status: 'G',
              currency: 'Yuan',
              variableName: 'V1',
              variableValue: 0.239,
              variableUp: false,
              children: [],
            },
          ],
        },
        {
          id: 'g123',
          name: 'Name8',
          collapsed: true,
          count: 123456,
          label: '100.00',
          rate: 0.296,
          status: 'DI',
          currency: 'Yuan',
          variableName: 'V2',
          variableValue: 0.131,
          variableUp: false,
          children: [
            {
              id: 'g1231',
              name: 'Name8-1',
              count: 123456,
              label: '100.00',
              rate: 1.0,
              status: 'DI',
              currency: 'Yuan',
              variableName: 'V2',
              variableValue: 0.131,
              variableUp: false,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 'g13',
      name: 'Name9',
      count: 123456,
      label: '100.90',
      rate: 0.187,
      status: 'B',
      currency: 'Yuan',
      variableName: 'V2',
      variableValue: 0.221,
      variableUp: true,
      children: [
        {
          id: 'g131',
          name: 'Name10',
          count: 123456,
          label: '33.90',
          rate: 0.336,
          status: 'R',
          currency: 'Yuan',
          variableName: 'V1',
          variableValue: 0.12,
          variableUp: true,
          children: [],
        },
        {
          id: 'g132',
          name: 'Name11',
          count: 123456,
          label: '67.00',
          rate: 0.664,
          status: 'G',
          currency: 'Yuan',
          variableName: 'V1',
          variableValue: 0.241,
          variableUp: false,
          children: [],
        },
      ],
    },
    {
      id: 'g14',
      name: 'Name12',
      count: 123456,
      label: '100.00',
      rate: 0.186,
      status: 'G',
      currency: 'Yuan',
      variableName: 'V2',
      variableValue: 0.531,
      variableUp: true,
      children: [],
    },
  ],
};

const colors = {
  B: '#5B8FF9',
  R: '#F46649',
  Y: '#EEBC20',
  G: '#5BD8A6',
  DI: '#A7A7A7',
};

//  组件props
const props = {
  data: mockData,
  config: {
    padding: [20, 50],
    defaultLevel: 3,
    defaultZoom: 0.8,
    modes: { default: ['zoom-canvas', 'drag-canvas'] },
  },
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

// 默认配置
const defaultConfig = {
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas'],
  },
  fitView: true,
  animate: true,
  defaultNode: {
    type: 'flow-rect',
  },
  defaultEdge: {
    type: 'cubic-horizontal',
    style: {
      stroke: '#CED4D9',
    },
  },
  layout: {
    type: 'indented',
    direction: 'LR',
    dropCap: false,
    indent: 300,
    getHeight: () => {
      return 60;
    },
  },
};

// 自定义节点、边
const registerFn = () => {
  /**
   * 自定义节点
   */
  G6.registerNode(
    'flow-rect',
    {
      shapeType: 'flow-rect',
      draw(cfg, group) {
        const {
          name = '',
          variableName,
          variableValue,
          variableUp,
          label,
          collapsed,
          currency,
          status,
          rate
        } = cfg;

        const grey = '#CED4D9';
        const rectConfig = {
          width: 202,
          height: 60,
          lineWidth: 1,
          fontSize: 12,
          fill: '#fff',
          radius: 4,
          stroke: grey,
          opacity: 1,
        };

        const nodeOrigin = {
          x: -rectConfig.width / 2,
          y: -rectConfig.height / 2,
        };

        const textConfig = {
          textAlign: 'left',
          textBaseline: 'bottom',
        };

        const rect = group.addShape('rect', {
          attrs: {
            x: nodeOrigin.x,
            y: nodeOrigin.y,
            ...rectConfig,
          },
        });

        const rectBBox = rect.getBBox();

        // label title
        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: 12 + nodeOrigin.x,
            y: 20 + nodeOrigin.y,
            text: name.length > 28 ? name.substr(0, 28) + '...' : name,
            fontSize: 12,
            opacity: 0.85,
            fill: '#000',
            cursor: 'pointer',
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: 'name-shape',
        });

        // price
        const price = group.addShape('text', {
          attrs: {
            ...textConfig,
            x: 12 + nodeOrigin.x,
            y: rectBBox.maxY - 12,
            text: label,
            fontSize: 16,
            fill: '#000',
            opacity: 0.85,
          },
        });

        // label currency
        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: price.getBBox().maxX + 5,
            y: rectBBox.maxY - 12,
            text: currency,
            fontSize: 12,
            fill: '#000',
            opacity: 0.75,
          },
        });

        // percentage
        const percentText = group.addShape('text', {
          attrs: {
            ...textConfig,
            x: rectBBox.maxX - 8,
            y: rectBBox.maxY - 12,
            text: `${((variableValue || 0) * 100).toFixed(2)}%`,
            fontSize: 12,
            textAlign: 'right',
            fill: colors[status],
          },
        });

        // percentage triangle
        const symbol = variableUp ? 'triangle' : 'triangle-down';
        const triangle = group.addShape('marker', {
          attrs: {
            ...textConfig,
            x: percentText.getBBox().minX - 10,
            y: rectBBox.maxY - 12 - 6,
            symbol,
            r: 6,
            fill: colors[status],
          },
        });

        // variable name
        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: triangle.getBBox().minX - 4,
            y: rectBBox.maxY - 12,
            text: variableName,
            fontSize: 12,
            textAlign: 'right',
            fill: '#000',
            opacity: 0.45,
          },
        });

        // bottom line background
        const bottomBackRect = group.addShape('rect', {
          attrs: {
            x: nodeOrigin.x,
            y: rectBBox.maxY - 4,
            width: rectConfig.width,
            height: 4,
            radius: [0, 0, rectConfig.radius, rectConfig.radius],
            fill: '#E0DFE3',
          },
        });

        // bottom percent
        const bottomRect = group.addShape('rect', {
          attrs: {
            x: nodeOrigin.x,
            y: rectBBox.maxY - 4,
            width: rate * rectBBox.width,
            height: 4,
            radius: [0, 0, 0, rectConfig.radius],
            fill: colors[status],
          },
        });

        // collapse rect
        if (cfg.children && cfg.children.length) {
          group.addShape('rect', {
            attrs: {
              x: rectConfig.width / 2 - 8,
              y: -8,
              width: 16,
              height: 16,
              stroke: 'rgba(0, 0, 0, 0.25)',
              cursor: 'pointer',
              fill: '#fff',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'collapse-back',
            modelId: cfg.id,
          });

          // collpase text
          group.addShape('text', {
            attrs: {
              x: rectConfig.width / 2,
              y: -1,
              textAlign: 'center',
              textBaseline: 'middle',
              text: collapsed ? '+' : '-',
              fontSize: 16,
              cursor: 'pointer',
              fill: 'rgba(0, 0, 0, 0.25)',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'collapse-text',
            modelId: cfg.id,
          });
        }

        this.drawLinkPoints(cfg, group);
        return rect;
      },
      update(cfg, item) {
        const { level, status, name } = cfg;
        const group = item.getContainer();
        let mask = group.find(ele => ele.get('name') === 'mask-shape');
        let maskLabel = group.find(ele => ele.get('name') === 'mask-label-shape');
        if (level === 0) {
          group.get('children').forEach(child => {
            if (child.get('name')?.includes('collapse')) return;
            child.hide();
          })
          if (!mask) {
            mask = group.addShape('rect', {
              attrs: {
                x: -101,
                y: -30,
                width: 202,
                height: 60,
                opacity: 0,
                fill: colors[status]
              },
              // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
              name: 'mask-shape',
            });
            maskLabel = group.addShape('text', {
              attrs: {
                fill: '#fff',
                fontSize: 20,
                x: 0,
                y: 10,
                text: name.length > 28 ? name.substr(0, 16) + '...' : name,
                textAlign: 'center',
                opacity: 0,
              },
              // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
              name: 'mask-label-shape',
            });
            const collapseRect = group.find(ele => ele.get('name') === 'collapse-back');
            const collapseText = group.find(ele => ele.get('name') === 'collapse-text');
            collapseRect?.toFront();
            collapseText?.toFront();
          } else {
            mask.show();
            maskLabel.show();
          }
          mask.animate({ opacity: 1 }, 200);
          maskLabel.animate({ opacity: 1 }, 200);
          return mask;
        } else {
          group.get('children').forEach(child => {
            if (child.get('name')?.includes('collapse')) return;
            child.show();
          })
          mask?.animate({ opacity: 0 }, {
            duration: 200,
            callback: () => mask.hide()
          });
          maskLabel?.animate({ opacity: 0 }, {
            duration: 200,
            callback: () => maskLabel.hide()
          });
        }
        this.updateLinkPoints(cfg, group);
      },
      setState(name, value, item) {
        if (name === 'collapse') {
          const group = item.getContainer();
          const collapseText = group.find((e) => e.get('name') === 'collapse-text');
          if (collapseText) {
            if (!value) {
              collapseText.attr({
                text: '-',
              });
            } else {
              collapseText.attr({
                text: '+',
              });
            }
          }
        }
      },
      getAnchorPoints() {
        return [
          [0, 0.5],
          [1, 0.5],
        ];
      },
    },
    'rect',
  );

  G6.registerEdge(
    'flow-cubic',
    {
      getControlPoints(cfg) {
        let controlPoints = cfg.controlPoints; // 指定controlPoints
        if (!controlPoints || !controlPoints.length) {
          const { startPoint, endPoint, sourceNode, targetNode } = cfg;
          const { x: startX, y: startY, coefficientX, coefficientY } = sourceNode
            ? sourceNode.getModel()
            : startPoint;
          const { x: endX, y: endY } = targetNode ? targetNode.getModel() : endPoint;
          let curveStart = (endX - startX) * coefficientX;
          let curveEnd = (endY - startY) * coefficientY;
          curveStart = curveStart > 40 ? 40 : curveStart;
          curveEnd = curveEnd < -30 ? curveEnd : -30;
          controlPoints = [
            { x: startPoint.x + curveStart, y: startPoint.y },
            { x: endPoint.x + curveEnd, y: endPoint.y },
          ];
        }
        return controlPoints;
      },
      getPath(points) {
        const path = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push([
          'C',
          points[1].x,
          points[1].y,
          points[2].x,
          points[2].y,
          points[3].x,
          points[3].y,
        ]);
        return path;
      },
    },
    'single-line',
  );
};

registerFn();

const { data } = props;
let graph = null;

const initGraph = (data) => {
  if (!data) {
    return;
  }
  const { onInit, config } = props;
  const tooltip = new G6.Tooltip({
    // offsetX and offsetY include the padding of the parent container
    offsetX: 20,
    offsetY: 30,
    // the types of items that allow the tooltip show up
    // 允许出现 tooltip 的 item 类型
    itemTypes: ['node'],
    // custom the tooltip's content
    // 自定义 tooltip 内容
    getContent: (e) => {
      const outDiv = document.createElement('div');
      //outDiv.style.padding = '0px 0px 20px 0px';
      const nodeName = e.item.getModel().name;
      let formatedNodeName = '';
      for (let i = 0; i < nodeName.length; i++) {
        formatedNodeName = `${formatedNodeName}${nodeName[i]}`;
        if (i !== 0 && i % 20 === 0) formatedNodeName = `${formatedNodeName}<br/>`;
      }
      outDiv.innerHTML = `${formatedNodeName}`;
      return outDiv;
    },
    shouldBegin: (e) => {
      if (e.target.get('name') === 'name-shape' || e.target.get('name') === 'mask-label-shape') return true;
      return false;
    },
  });
  graph = new G6.TreeGraph({
    container: 'container',
    ...defaultConfig,
    ...config,
    plugins: [tooltip],
  });
  if (typeof onInit === 'function') {
    onInit(graph);
  }
  graph.data(data);
  graph.render();

  const handleCollapse = (e) => {
    const target = e.target;
    const id = target.get('modelId');
    const item = graph.findById(id);
    const nodeModel = item.getModel();
    nodeModel.collapsed = !nodeModel.collapsed;
    graph.layout();
    graph.setItemState(item, 'collapse', nodeModel.collapsed);
  };
  graph.on('collapse-text:click', (e) => {
    handleCollapse(e);
  });
  graph.on('collapse-back:click', (e) => {
    handleCollapse(e);
  });

  // 监听画布缩放，缩小到一定程度，节点显示缩略样式
  let currentLevel = 1;
  const briefZoomThreshold = Math.max(graph.getZoom(), 0.5);
  graph.on('viewportchange', e => {
    if (e.action !== 'zoom') return;
    const currentZoom = graph.getZoom();
    let toLevel = currentLevel;
    if (currentZoom < briefZoomThreshold) {
      toLevel = 0;
    } else {
      toLevel = 1;
    }
    if (toLevel !== currentLevel) {
      currentLevel = toLevel;
      graph.getNodes().forEach(node => {
        graph.updateItem(node, {
          level: toLevel
        })
      })
    }
  });
};

initGraph(data);

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
