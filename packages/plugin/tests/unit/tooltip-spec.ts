import G6 from '@antv/g6';
import Tooltip from '../../src/tooltip';

const div = document.createElement('div');
div.id = 'tooltip-plugin';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      x: 100,
      y: 100,
    },
    {
      id: 'node2',
      label: 'node2',
      x: 150,
      y: 300,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

describe('tooltip', () => {
  it('tooltip with default', () => {
    const tooltip = new Tooltip();

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [tooltip],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultNode: {
        type: 'rect',
      },
      defaultEdge: {
        style: {
          lineAppendWidth: 20,
        },
      },
    });

    graph.data(data);
    graph.render();

    const tooltipPlugin = graph.get('plugins')[0];
    expect(tooltipPlugin.get('offsetX')).toBe(6);
    expect(tooltipPlugin.get('tooltip').outerHTML).toBe(
      `<div class="g6-component-tooltip" style="position: absolute; visibility: hidden; display: none;"></div>`,
    );

    graph.emit('node:mouseenter', { item: graph.getNodes()[0] });
    expect(tooltipPlugin.get('tooltip').style.visibility).toEqual('visible');
    graph.emit('node:mouseleave', { item: graph.getNodes()[0] });
    expect(tooltipPlugin.get('tooltip').style.visibility).toEqual('hidden');

    graph.destroy();
  });
  it('tooltip with dom', () => {
    const tooltip = new Tooltip({
      offsetX: 10,
      getContent(e) {
        const outDiv = document.createElement('div');
        outDiv.style.width = '180px';
        outDiv.innerHTML = `
        <h4>自定义tooltip</h4>
        <ul>
          <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
        </ul>`;
        return outDiv;
      },
    });
    expect(tooltip.get('offsetX')).toBe(10);

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [tooltip],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultEdge: {
        style: {
          lineAppendWidth: 20,
        },
      },
    });

    graph.data(data);
    graph.render();
    const tooltipPlugin = graph.get('plugins')[0];
    expect(tooltipPlugin.get('offsetX')).toBe(10);
    graph.destroy();
  });
  it('tooltip with string', () => {
    const tooltip = new Tooltip({
      getContent(e) {
        return `<div style='width: 180px;'>
          <ul id='menu'>
            <li title='1'>测试02</li>
            <li title='2'>测试02</li>
            <li>测试02</li>
            <li>测试02</li>
            <li>测试02</li>
          </ul>
        </div>`;
      },
    });

    expect(tooltip.get('offsetX')).toBe(6);
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [tooltip],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
    });

    graph.data(data);
    graph.render();
    graph.destroy();
  });
  it('tooltip fix to item', () => {
    data.nodes[0].x = 120;
    data.nodes[0].y = 20;
    data.nodes[1].x = 450;
    data.nodes[1].y = 450;
    const offsetX = 0 // 5 + 20; // 当前 canvas 的左侧元素宽度总和
    const offsetY = 0 // 162 + 20; // 当前 canvas 的上方元素高度总和
    const fixToNode = [1, 0.5];
    const tooltip = new Tooltip({
      getContent(e) {
        return `<div style='width: 180px;'>
          <ul id='menu'>
            <li title='1'>测试02</li>
            <li title='2'>测试02</li>
            <li>测试02</li>
            <li>测试02</li>
            <li>测试02</li>
          </ul>
        </div>`;
      },
      fixToNode,
      offsetX,
      offsetY,
      trigger: 'click'
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [tooltip],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
    });

    graph.getContainer().style.backgroundColor = '#ccc'


    graph.data(data);
    graph.render();

    const tooltipPlugin = graph.get('plugins')[0];
    graph.emit('node:click', { item: graph.getNodes()[0] });
    const dom = tooltipPlugin.get('tooltip')
    expect(dom.style.visibility).toEqual('visible');

    const nodeBBox = graph.getNodes()[0].getBBox();
    const expectPoint = {
      x: nodeBBox.minX + nodeBBox.width * fixToNode[0],
      y: nodeBBox.minY + nodeBBox.height * fixToNode[1]
    }
    const expectCanvasXY = graph.getCanvasByPoint(expectPoint.x, expectPoint.y);
    const graphContainer = graph.getContainer();
    expectCanvasXY.x += graphContainer.offsetLeft + offsetX;
    expectCanvasXY.y += graphContainer.offsetTop + offsetY;

    expect(dom.style.left).toEqual(`${expectCanvasXY.x}px`)
    expect(dom.style.top).toEqual(`${expectCanvasXY.y}px`)

    graph.emit('canvas:click', { item: graph.getNodes()[0] });
    expect(dom.style.visibility).toEqual('hidden');

    graph.emit('node:click', { item: graph.getNodes()[1] });
    const nodeBBox2 = graph.getNodes()[0].getBBox();
    const expectPoint2 = {
      x: nodeBBox2.minX + nodeBBox2.width * fixToNode[0],
      y: nodeBBox2.minY + nodeBBox2.height * fixToNode[1]
    }
    const expectCanvasXY2 = graph.getCanvasByPoint(expectPoint2.x, expectPoint2.y);
    expectCanvasXY2.x += graphContainer.offsetLeft + offsetX;
    expectCanvasXY2.y += graphContainer.offsetTop + offsetY;
    
    // 此时超出了下边界和右边界
    const bbox = dom.getBoundingClientRect();
    expectCanvasXY2.x -= bbox.width + offsetX;
    expectCanvasXY2.y -= bbox.height + offsetY;

    // 由于测试界面图上方的 DOM 未渲染出来导致的误差，下面内容无法判断
    // expect(dom.style.left === `${expectCanvasXY2.x}px`).toEqual(true)
    // expect(dom.style.top === `${expectCanvasXY2.y}px`).toEqual(true)

    graph.destroy();
  });
});

describe.only('tooltip mouse out of view', () => {
  it.only('tooltip mouse out of view', () => {
    // 扩展studio节点
G6.registerNode(
  'pai-studio-node',
  {
    afterDraw(cfg: any, group: any) {
      if (cfg.ports) {
        const [width, height] = cfg.size;
        const ports = [...(cfg.ports?.inputPorts ?? []), ...(cfg.ports?.outputPorts ?? [])];
        const anchorPoints = getAnchorPoints(cfg.ports?.inputPorts ?? [], cfg.ports?.outputPorts ?? []);
        anchorPoints.forEach((point, index) => {
          let text = 'undefined';
          if (cfg.ports) {
            if (!ports[index].desc) {
              return;
            }
            text = ports[index].desc;
          }
          const textWidth = parseInt(G6.Util.getTextSize(text, 12)[0]) + 28;
          const x = point[0] * width - width / 2;
          const y = point[1] * height - height / 2;
          const rectTranslateY = point[1] === 0 ? -40 - 14 : 14;
          const textTranslateY = point[1] === 0 ? -40 - 14 + 20 : 14 + 20;
          group.addShape('circle', {
            attrs: {
              x,
              y,
              r: 5,
              fill: '#fff',
              stroke: '#8086a2',
              cursor: 'pointer',
              opacity: 0,
            },
            name: 'link-point',
            index,
            model: ports[index],
            tooltip: {
              rect: {
                attrs: {
                  x: x - textWidth / 2,
                  y: y + rectTranslateY,
                  width: textWidth,
                  height: 40,
                  fill: 'rgba(0, 0, 0, 0.75)',
                  radius: [4, 4],
                },
                name: 'link-point-tooltip-rect-shape',
                index,
              },
              text: {
                attrs: {
                  text,
                  x: x - textWidth / 2 + 8,
                  y: y + textTranslateY,
                  fontSize: 12,
                  textAlign: 'left',
                  textBaseline: 'middle',
                  fill: '#fff',
                },
                name: 'link-point-tooltip-text-shape',
                index,
              },
              arrow: {
                attrs: {
                  x,
                  y: point[1] === 0 ? -30.6 : 30.6,
                  r: 4,
                  fill: 'rgba(0, 0, 0, 0.75)',
                  symbol: point[1] === 0 ? 'triangle-down' : 'triangle',
                },
                name: 'link-point-tooltip-arrow-shape',
                index,
              },
            },
          });
        });
      }
      group.addShape('rect', {
        attrs: {
          x: -86,
          y: -16,
          width: 32,
          height: 32,
          stroke: null,
          fill: '#f00',
          radius: [12, 12],
        },
        zIndex: 1,
        name: 'rect-shape',
      });
      group.addShape('image', {
        attrs: {
          x: -78,
          y: -8,
          width: 16,
          height: 16,
          img: 'https://img.alicdn.com/tfs/TB1fyIo3KL2gK0jSZFmXXc7iXXa-200-200.png',
        },
        name: 'logo-icon',
        zIndex: 10,
      });
    },
    afterUpdate(cfg: any, node: any) {
      const g = node._cfg.group;
      const children = g.get('children');
      const anchors = children.filter((child) => {
        return child.cfg.name === 'link-point';
      });
      if (anchors.length) {
        anchors.forEach((item) => {
          g.removeChild(item);
        });
      }
      if (cfg.ports) {
        const [width, height] = cfg.size;
        const ports = [...(cfg.ports?.inputPorts ?? []), ...(cfg.ports?.outputPorts ?? [])];
        const anchorPoints = getAnchorPoints(cfg.ports?.inputPorts ?? [], cfg.ports?.outputPorts ?? []);
        anchorPoints.forEach((point, index) => {
          let text = 'undefined';
          if (cfg.ports) {
            if (!ports[index].desc) {
              return;
            }
            text = ports[index].desc;
          }
          const textWidth = parseInt(G6.Util.getTextSize(text, 12)[0]) + 28;
          const x = point[0] * width - width / 2;
          const y = point[1] * height - height / 2;
          const rectTranslateY = point[1] === 0 ? -40 - 14 : 14;
          const textTranslateY = point[1] === 0 ? -40 - 14 + 20 : 14 + 20;
          g.addShape('circle', {
            attrs: {
              x,
              y,
              r: 5,
              fill: '#fff',
              stroke: '#8086a2',
              cursor: 'pointer',
              opacity: 0,
            },
            name: 'link-point',
            index,
            model: ports[index],
            tooltip: {
              rect: {
                attrs: {
                  x: x - textWidth / 2,
                  y: y + rectTranslateY,
                  width: textWidth,
                  height: 40,
                  fill: 'rgba(0, 0, 0, 0.75)',
                  radius: [4, 4],
                },
                name: 'link-point-tooltip-rect-shape',
                index,
              },
              text: {
                attrs: {
                  text,
                  x: x - textWidth / 2 + 8,
                  y: y + textTranslateY,
                  fontSize: 12,
                  textAlign: 'left',
                  textBaseline: 'middle',
                  fill: '#fff',
                },
                name: 'link-point-tooltip-text-shape',
                index,
              },
              arrow: {
                attrs: {
                  x,
                  y: point[1] === 0 ? -30.6 : 30.6,
                  r: 4,
                  fill: 'rgba(0, 0, 0, 0.75)',
                  symbol: point[1] === 0 ? 'triangle-down' : 'triangle',
                },
                name: 'link-point-tooltip-arrow-shape',
                index,
              },
            },
          });
        });
      }

      const nodeStatus = cfg.Status;
      const nodeStatusType = cfg.StatusType;
      const { group } = node._cfg;
      const icon = group.find((item) => {
        return item.cfg.name === 'status-icon';
      });
      if (icon) {
        if (icon.cfg?.Status === nodeStatus && icon.cfg?.StatusType === nodeStatusType) {
          return;
        } else {
          group.removeChild(icon);
        }
      }
      let statusIcon;
      if (cfg.StatusType === 1) {
        statusIcon = statusMap['Edited'];
      } else {
        statusIcon = status.includes(nodeStatus) ? statusMap[nodeStatus] : null;
      }
      if (statusIcon) {
        const image = group.addShape('image', {
          // 节点状态图标
          attrs: {
            x: 68,
            y: -8,
            width: 16,
            height: 16,
            img: statusIcon,
          },
          name: 'status-icon',
          status: nodeStatus,
        });
        if (nodeStatus === 'Running') {
          image.animate(
            (ratio) => {
              const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
              const toMatrix = G6.Util.transform(matrix, [
                ['t', -76, 0],
                ['r', ratio * Math.PI * 2],
                ['t', 76, 0],
              ]);
              return {
                matrix: toMatrix,
              };
            },
            {
              repeat: true,
              duration: 2000,
              easing: 'easeLinear',
            },
          );
        }
      }
    },
    // 响应状态变化
    setState(name, value, item: any) {
      const group = item.getContainer();
      const children = group.get('children');
      const keyShape = children.find((child) => child.cfg.name === 'pai-studio-node-keyShape');
      if (name === 'hover') {
        if (value) {
          keyShape.attr('stroke', '#CFD4E5');
          keyShape.attr('lineWidth', 2.5);
        } else {
          keyShape.attr('stroke', '#c9cbc9');
          keyShape.attr('lineWidth', 1);
        }
      }
      if (name === 'click') {
        if (value) {
          keyShape.attr('fill', '#F6F7FB');
          keyShape.attr('stroke', '#D7DBE9');
          keyShape.attr('lineWidth', 1);
        } else {
          keyShape.attr('fill', '#FFFFFF');
          keyShape.attr('stroke', '#D7DBE9');
          keyShape.attr('lineWidth', 1);
        }
      }
      if (name === 'selected') {
        if (value) {
          keyShape.attr('fill', '#E2F2FF');
          keyShape.attr('stroke', '#D7DBE9');
          keyShape.attr('lineWidth', 1);
        } else {
          keyShape.attr('fill', '#FFFFFF');
          keyShape.attr('stroke', '#D7DBE9');
          keyShape.attr('lineWidth', 1);
        }
      }
    },
  },
  'modelRect',
);

// 扩展边
const lineDash = [4, 2, 1, 2]; // 描述边虚线
G6.registerEdge(
  'pai-studio-edge',
  {
    afterUpdate(cfg: any, edge: any) {
      const { group } = edge._cfg;
      const s = cfg.Status;
      const shape = group.get('children')[0]; // 获得该边的第一个图形，这里是边的 path
      if (s === 'Running') {
        let index = 0;
        // 边 path 图形的动画
        shape.animate(
          () => {
            index++;
            if (index > 9) {
              index = 0;
            }
            return {
              lineDash,
              lineDashOffset: -index,
            };
          },
          {
            repeat: true, // 动画重复
            duration: 3000, // 一次动画的时长为 3000
          },
        );
        shape.attr('stroke', '#00C800');
      } else {
        shape.stopAnimate();
        shape.attr('lineDash', null);
        shape.attr('stroke', '#969BB4');
      }
    },
    // 响应状态变化
    setState(name, value, item: any) {
      const shape = item.get('keyShape');
      if (name === 'hover') {
        if (value) {
          shape.attr('lineWidth', 3);
        } else if (item.get('states').includes('click')) {
          shape.attr('lineWidth', 3);
        } else {
          shape.attr('lineWidth', 1);
        }
      }
      if (name === 'click') {
        if (value) {
          shape.attr('lineWidth', 3);
        } else {
          shape.attr('lineWidth', 1);
        }
      }
    },
  },
  'cubic-vertical',
);

    const tooltip = new Tooltip();

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,fitCenter: true, // 图居中
      enabledStack: true, // 设置为true，启用 redo & undo 栈功能
      defaultNode: {
        type: 'pai-studio-node',
        size: [180, 40],
        logoIcon: {
          show: true,
          width: 22,
          height: 22,
          img: null,
        },
        stateIcon: {
          show: false, // 默认节点中表示状态的icon配置
        },
        style: {
          cursor: 'pointer',
          radius: 12,
          stroke: '#c9cbc9',
          fill: '#ffffff',
        },
        labelCfg: {
          position: 'center',
          style: {
            fill: '#595959',
            fontSize: 12,
            cursor: 'pointer',
            color: '#262831',
          },
          offset: 20,
        },
        preRect: {
          show: false, // 默认节点左侧的小矩形
        },
      },
      defaultEdge: {
        type: 'pai-studio-edge',
        style: {
          stroke: '#969BB4',
          endArrow: {
            path: G6.Arrow.triangle(8, 8, 0),
            fill: '#969BB4',
          },
          lineWidth: 1.5,
        },
        minCurveOffset: [70, -70],
      },
      modes: {
        default: [
          {
            type: 'drag-canvas',
            scalableRange: -100,
          },
          {
            type: 'drag-node',
            onlyChangeComboSize: true,
          },
          'double-finger-drag-canvas',
        ],
        brush: [
          {
            type: 'brush-select',
            trigger: 'drag',
            includeEdges: true,
            brushStyle: {
              stroke: '#0070cc',
              lineWidth: 1,
              fill: '#eee',
              fillOpacity: 0.3,
            },
          },
        ],
      },
    });

    const d = {
      RequestId: '2C28B8C7-A2FD-436E-A254-9269719DB501',
      Content: {
        nodes: [
          {
            id: '9a69c538b1eb4a3583e04bc4e88d2c66',
            label: '特征分桶特征分桶特征分桶',
            hasPipelines: false,
            metadata: {
              provider: 'pai',
              identifier: '特征分桶',
              version: 'v1',
              signature: '159593978189133',
              io: {
                inputs: {
                  inputArtifact1: 1,
                },
              },
            },
            position: {
              x: -300,
              y: -180,
            },
            properties: [
              {
                label: 'detailColName',
                value: '1024',
              },
              {
                label: 'testColName',
                value: '1',
              },
              {
                label: '_advanced',
                value: true,
              },
              {
                label: 'selectColumns',
                value: 'a,b,hour,pm10,so2,co,no2,pm2',
              },
              {
                label: 'selectTest',
                value: 'info',
              },
              {
                label: 'oss',
                value: 'https://mocks.alibaba-inc.com/project/STo77KX31/EditExp',
              },
              {
                label: 'datePicker',
                value: '2020/7/30',
              },
              {
                label: 'editor',
                value: 'Test Editor',
              },
              {
                label: 'model_opt_lr',
                value: {
                  seq_lenght: 1,
                  batch_size: 2,
                  learning_rate: 3,
                  save_steps: 4,
                  probe_steps: 5,
                  train_steps: '',
                  train_stepssssssss: '',
                },
              },
              {
                label: 'train_params',
                value: {
                  seq_lenght: '',
                  batch_size: '',
                  learning_rate: '',
                  save_steps: '',
                  probe_steps: '',
                  train_steps: '',
                  train_stepssssssss: '',
                },
              },
              {
                label: 'joinInput',
                value: 'value1:value2',
              },
              {
                label: 'scoreColName',
                value: 'scoreColName',
              },
              {
                label: 'positiveLabel',
                value: 22,
              },
              {
                label: 'infos',
                value: [
                  {
                    columnName: 'categorycategorycategory',
                    columnType: 'STRING',
                    dataRange: '体育,女性,娱乐',
                  },
                  {
                    columnName: 'title',
                    columnType: 'STRING',
                    dataRange:
                      '全国１０个城市的男人最有魅力基因,图文：美国高尔夫公开赛次轮　加西亚充满自信,王丽雅走秀自爆喝水太少导致尿血胃痉挛（图）,组图：王励勤传闻女友大比拼　小爱可爱赵薇性感,组图：穆雷摔倒拇指受伤　稚气古尔比斯草场做秀',
                  },
                  {
                    columnName: 'content',
                    columnType: 'STRING',
                    dataRange:
                      '体育讯　北京时间６月１４日，２００８美国高尔夫公开赛第二轮继续展开激烈的争夺。首轮结束后，美国球手凯文－斯特里尔曼和贾斯汀－希克斯并列占据了成绩榜的榜首位置，两人都在星期四打出了６８杆低于标准杆３杆的...,我来说两句作者：ＣＦＰ２００８年６月１２日，台湾，名模外型亮丽，却不一定比一般人更懂保养身体，王丽雅日前血尿吓得赶紧看医生，病因竟是她太少喝水！昨天（６月１１日）走彩妆秀失手掉产品的钱帅君，和同门陈志...,我来说两句广州男人：爱拼才会赢无可否认，广州男人发了，广州男人财大气粗，似乎分分秒秒都在挣钱。广州男人形象并不高大，皮肤也黝黑，但他们用豪华私家车、别墅、名牌西服、名牌衬衣、名牌皮鞋所包装出的气派，却...,跳转至：页１２／１８我来说两句北京时间６月１２日晚，总奖金额为７１．３万欧元的英国女王草地杯开始第四比赛日角逐。在男单第三轮争夺中，大赛６号种子、英国天才少年安迪－穆雷在先丢一盘的情况下上演大逆转，最...,跳转至：页１５／４０我来说两句名人的爱情本就一直受到众人的关注，尤其是当被套上乒乓球奥运冠军和娱乐圈美女的光环之后，恐怕想低调都很难。中国乒坛的“文体恋”更是受人关注，那些奥运冠军和娱乐圈美女的爱情故...',
                  },
                ],
              },
            ],
          },
          {
            id: '9a69c538b1eb4a3583e04bc4e88d2110',
            label: '通用模型导出',
            hasPipelines: false,
            metadata: {
              provider: 'pai',
              identifier: '通用模型导出',
              version: 'v1',
              signature: '159593978189110',
            },
            position: {
              x: 0,
              y: 50,
            },
            properties: [],
          },
    
          {
            id: '9a69c538b1eb4a3583e0dsfsdff4bc4e88d2110',
            label: '逻辑回归二分类预发',
            hasPipelines: false,
            metadata: {
              provider: 'pai',
              identifier: 'logisticregression_binary',
              version: 'v1',
              signature: '9aebba164fc81ad71ae45446c18ccbb5048acd5b',
            },
            position: {
              x: 0,
              y: 50,
            },
            properties: [],
          },
          {
            id: '9a69c538b1eb4a3583e04bc4e88d2111',
            label: 'Etrec',
            hasPipelines: false,
            metadata: {
              provider: 'pai',
              identifier: 'Etrec',
              version: 'v1',
              signature: '159593978189110',
            },
            position: {
              x: 0,
              y: 100,
            },
            properties: [],
          },
          {
            id: '9a69c538b1eb4a3583e04bc4e88d2112',
            label: 'ALS',
            hasPipelines: false,
            metadata: {
              provider: 'pai',
              identifier: 'ALS',
              version: 'v1',
              signature: '159593978189110',
            },
            position: {
              x: 0,
              y: 150,
            },
            properties: [],
          },
          {
            id: '9a69c538b1eb4a3583e04bc4e88d2113',
            label: 'GraphSage',
            hasPipelines: false,
            metadata: {
              provider: 'pai',
              identifier: 'GraphSage',
              version: 'v1',
              signature: '159593978189110',
            },
            position: {
              x: 0,
              y: 200,
            },
            properties: [],
          },
          {
            id: '9a69c538b1eb4a3583e04bc4e88d2114',
            label: 'DeepFM',
            hasPipelines: false,
            metadata: {
              provider: 'pai',
              identifier: 'DeepFM',
              version: 'v1',
              signature: '159593978189110',
            },
            position: {
              x: 0,
              y: 250,
            },
            properties: [],
          },
          {
            id: '9a69c538b1eb4a3583e04bc4e88d1122',
            label: '读数据表',
            hasPipelines: false,
            metadata: {
              provider: 'pai',
              identifier: '读数据表',
              version: 'v1',
              signature: '1595939781122',
            },
            position: {
              x: 0,
              y: 300,
            },
            properties: [
              {
                label: 'inputTable',
                value: 'testValue',
              },
            ],
          },
          {
            id: '36a9883cd71c4a8d95774b29dd0a9cdd',
            label: 'Split',
            hasPipelines: false,
            pipelines: {
              nodes: [
                {
                  id: 'child_1',
                  label: 'child_1',
                },
              ],
              edges: [
                {
                  source: '9a69c538b1eb4a3583e04bc4e88d2c66',
                  target: 'child_1',
                },
                {
                  source: '9a69c538b1eb4a3583e04bc4e88d2c66',
                  target: 'child_2',
                },
                {
                  source: 'child_1',
                  target: 'ebbb9038f9914d839e4a22d78e4e4991',
                },
                {
                  source: 'child_2',
                  target: 'ebbb9038f9914d839e4a22d78e4e4991',
                },
              ],
            },
            metadata: {
              provider: 'pai',
              identifier: 'Logistic regression',
              version: 'v1',
              signature: '1595939781891',
            },
            position: {
              x: -300,
              y: 0,
            },
            properties: [
              {
                label: 'detailColName',
                value: '0.8',
              },
              {
                label: 'inputColName',
                value: '10',
              },
              {
                label: 'outputColName',
                value: '10',
              },
              {
                label: 'infoTable',
                value: [
                  {
                    columnName: 'categorycategorycategory',
                    columnType: 'STRING',
                    dataRange: '体育,女性,娱乐',
                  },
                  {
                    columnName: 'title',
                    columnType: 'STRING',
                    dataRange:
                      '全国１０个城市的男人最有魅力基因,图文：美国高尔夫公开赛次轮　加西亚充满自信,王丽雅走秀自爆喝水太少导致尿血胃痉挛（图）,组图：王励勤传闻女友大比拼　小爱可爱赵薇性感,组图：穆雷摔倒拇指受伤　稚气古尔比斯草场做秀',
                  },
                  {
                    columnName: 'content',
                    columnType: 'STRING',
                    dataRange:
                      '体育讯　北京时间６月１４日，２００８美国高尔夫公开赛第二轮继续展开激烈的争夺。首轮结束后，美国球手凯文－斯特里尔曼和贾斯汀－希克斯并列占据了成绩榜的榜首位置，两人都在星期四打出了６８杆低于标准杆３杆的...,我来说两句作者：ＣＦＰ２００８年６月１２日，台湾，名模外型亮丽，却不一定比一般人更懂保养身体，王丽雅日前血尿吓得赶紧看医生，病因竟是她太少喝水！昨天（６月１１日）走彩妆秀失手掉产品的钱帅君，和同门陈志...,我来说两句广州男人：爱拼才会赢无可否认，广州男人发了，广州男人财大气粗，似乎分分秒秒都在挣钱。广州男人形象并不高大，皮肤也黝黑，但他们用豪华私家车、别墅、名牌西服、名牌衬衣、名牌皮鞋所包装出的气派，却...,跳转至：页１２／１８我来说两句北京时间６月１２日晚，总奖金额为７１．３万欧元的英国女王草地杯开始第四比赛日角逐。在男单第三轮争夺中，大赛６号种子、英国天才少年安迪－穆雷在先丢一盘的情况下上演大逆转，最...,跳转至：页１５／４０我来说两句名人的爱情本就一直受到众人的关注，尤其是当被套上乒乓球奥运冠军和娱乐圈美女的光环之后，恐怕想低调都很难。中国乒坛的“文体恋”更是受人关注，那些奥运冠军和娱乐圈美女的爱情故...',
                  },
                ],
              },
            ],
          },
          {
            id: 'ebbb9038f9914d839e4a22d78e4e4991',
            label: '逻辑回归二分类-1',
            hasPipelines: false,
            metadata: {
              provider: 'pai',
              identifier: 'Logistic regression',
              version: 'v1',
              signature: '1595939781891',
            },
            position: {
              x: -300,
              y: 180,
            },
            properties: [
              {
                inputTable: {
                  label: 'inputTable',
                  ref: {
                    nodeId: '36a9883cd71c4a8d95774b29dd0a9cdd',
                    propertityName: 'outputTable1Artifact',
                  },
                },
              },
              {
                label: 'featureColNames',
                value: 'column1,column2,column3',
              },
              {
                label: 'labelColName',
                value: 'column4',
              },
              {
                label: 'goodValue',
                value: '1',
              },
              {
                label: 'enableSparse',
                value: 'false',
              },
              {
                label: 'regularizedType',
                value: 'L1',
              },
              {
                label: 'maxIter',
                value: '100',
              },
              {
                label: 'regularizedLevel',
                value: '1',
              },
              {
                label: 'epsilon',
                value: '0.000001',
              },
              {
                label: 'regularizedLevel',
                value: '1',
              },
              {
                label: 'regularizedLevel',
                value: '1',
              },
              {
                label: 'regularizedLevel',
                value: '1',
              },
              {
                label: 'coreNum',
                value: '10',
              },
              {
                label: 'memSizePerCore',
                value: '1024',
              },
              {
                label: 'itemDelimiter',
                value: ',',
              },
              {
                label: 'kvDelimiter',
                value: ':',
              },
              {
                label: 'outputModelName',
                value: 'xxxx',
              },
            ],
          },
        ],
        edges: [
          {
            source: '9a69c538b1eb4a3583e04bc4e88d2c66',
            sourceAnchor: 'outputsArtifact1',
            target: '36a9883cd71c4a8d95774b29dd0a9cdd',
            targetAnchor: 'inputArtifact1',
            targetAnchorIndex: 0,
          },
          {
            source: '36a9883cd71c4a8d95774b29dd0a9cdd',
            sourceAnchor: 'outputsArtifact1',
            target: 'ebbb9038f9914d839e4a22d78e4e4991',
            targetAnchor: 'inputArtifact1',
            targetAnchorIndex: 1,
          },
        ],
        globalParams: [
          {
            label: 'bucket',
            value: 'oss-bucket',
          },
          {
            label: 'execution',
            value: 'test',
          },
        ],
        globalSettings: [],
      },
      Creator: '1557702098194904',
      Description: '机器学习算法计算出二氧化氮对于雾霾影响最大testsststtsssssssssssssssssssss',
      ExperimentId: 'experiment-kftihe4c1w5gx2slsf',
      GmtCreateTime: '2021-01-30T12:51:33.028Z',
      GmtModifiedTime: '2021-01-30T12:51:33.028Z',
      Name: '雾霾天气预测11111',
      Source: 'string',
      Version: 0,
      WorkspaceId: 'ws-5fys1on3yn5lymx637',
    };

    graph.data(d.Content);
    graph.render();
  })
})
