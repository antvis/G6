import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { global } from './large-graph-register';

const isBrowser = typeof window !== 'undefined';
const G6 = isBrowser ? require('@antv/g6') : null;
const insertCss = isBrowser ? require('insert-css') : null;

if (isBrowser) {
  insertCss(`
    #legend-panel {
      width: 30%;
      position: absolute;
      right: 0px;
      top: 64px;
      height: 100%;
      background-color: #34373A;
      border-left: 2px #444 solid;
      color: rgba(255, 255, 255, 0.85);
      text-align: center;
      box-shadow: 18px 5px 0 0 rgba(0, 0, 0, 0.6);
    }
    #legend-panel .legned-title {
      width: 100%;
      color: rgba(255, 255, 255, 0.85);
      text-align: center;
      margin-bottom: 0px;
    }
    #legend-panel #legend-graph-container {
      width: 100%;
      height: 250px;
      background-color: #2b2f33;
      margin-top: 8px;
    }
    #legend-panel #discription-container {
      margin-top: 16px;
      padding: 0px 16px;
      height: calc(100% - 430px);
      overflow-y: scroll;
    }
  `);
}

let legendGraph = null;
let CANVAS_WIDTH = 100;
let CANVAS_HEIGHT = 800;

const LegendPanel = () => {
  const { t, i18n } = useTranslation();
  const container = React.useRef<HTMLDivElement>(null);
  const data = {
    nodes: [
      {
        id: 'aggregated-node-legend',
        x: 50,
        y: 30,
        type: 'aggregated-node',
        count: 10,
      },
      {
        id: 'real-node-legend',
        x: 50,
        y: 90,
        size: 20,
        type: 'real-node',
      },
      {
        id: 'aggregated-node-legend-new',
        x: 50,
        y: 220,
        type: 'aggregated-node',
        count: 10,
        new: true,
      },
      {
        id: 'real-node-legend-new',
        x: 100,
        y: 220,
        size: 20,
        type: 'real-node',
        new: true,
      },
    ],
    edges: [
      {
        source: 'aggregated-node-legend',
        target: 'real-node-legend',
        type: 'custom-line',
        isReal: false,
        size: 4,
      },
      {
        source: 'aggregated-node-legend',
        target: 'real-node-legend',
        type: 'custom-line',
        isReal: true,
        size: 4,
      },
    ],
  };
  data.edges.forEach((edge: any) => {
    const dash = edge.size;
    const lineDash = edge.isReal ? undefined : [dash, dash];
    const stroke = edge.isReal ? global.edge.style.realEdgeStroke : global.edge.style.stroke;
    const opacity = edge.isReal
      ? global.edge.style.realEdgeOpacity
      : global.edge.style.strokeOpacity;

    const arrowWidth = Math.max(edge.size / 2 + 2, 3);
    const arrowLength = 10;
    const arrowBeging = arrowLength;
    let arrowPath = `M ${arrowBeging},0 L ${arrowBeging + arrowLength},-${arrowWidth} L ${
      arrowBeging + arrowLength
    },${arrowWidth} Z`;
    let d = arrowLength;

    edge.style = {
      stroke,
      strokeOpacity: opacity,
      cursor: 'pointer',
      lineAppendWidth: Math.max(edge.size || 5, 5),
      fillOpacity: 1,
      lineDash,
      endArrow: arrowPath
        ? {
            path: arrowPath,
            d,
            fill: stroke,
            strokeOpacity: 0,
          }
        : false,
    };
  });
  useEffect(() => {
    if (container && container.current) {
      CANVAS_WIDTH = container.current.offsetWidth;
      CANVAS_HEIGHT = container.current.offsetHeight;
    }
    if (!legendGraph || legendGraph.get('destroyed')) {
      legendGraph = new G6.Graph({
        container: container.current as HTMLElement,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        defaultEdge: {
          labelCfg: {
            style: {
              fill: 'rgba(255, 255, 255, 0.85)',
            },
          },
        },
      });
      legendGraph.data(data);
      legendGraph.render();

      legendGraph.getEdges().forEach((edge) => {
        if (!edge.getModel().isReal) {
          legendGraph.updateItem(edge, {
            source: { x: 20, y: 130 },
            target: { x: 80, y: 130 },
            count: 10,
          });
        } else {
          legendGraph.updateItem(edge, {
            source: { x: 20, y: 170 },
            target: { x: 80, y: 170 },
            count: 10,
          });
        }
      });

      const group = legendGraph.getGroup();
      const textStyle = {
        fill: 'rgba(255, 255, 255, 0.85)',
        textBaseline: 'middle',
        x: 100,
        fontWeight: 800,
        fontSize: 14,
      };
      const aggregatedNodeText = group.addShape('text', {
        attrs: {
          text: t('聚合节点'),
          y: 20,
          ...textStyle,
        },
      });
      group.addShape('text', {
        attrs: {
          text: t('节点中间的数字代表该聚类所含的节点数量'),
          y: aggregatedNodeText.getBBox().maxY + 16,
          ...textStyle,
          opacity: 0.6,
          fontSize: 10,
        },
      });

      const realNodeText = group.addShape('text', {
        attrs: {
          text: t('真实节点'),
          y: 80,
          ...textStyle,
        },
      });
      group.addShape('text', {
        attrs: {
          text: t('这是一个原数据中的真实节点'),
          y: realNodeText.getBBox().maxY + 8,
          ...textStyle,
          opacity: 0.6,
          fontSize: 10,
        },
      });

      const aggregatedEdgeText = group.addShape('text', {
        attrs: {
          text: t('聚合边'),
          y: 130,
          ...textStyle,
        },
      });
      group.addShape('text', {
        attrs: {
          text: t('至少一个端点是聚合节点'),
          y: aggregatedEdgeText.getBBox().maxY + 8,
          ...textStyle,
          opacity: 0.6,
          fontSize: 10,
        },
      });

      const realEdgeText = group.addShape('text', {
        attrs: {
          text: t('真实边'),
          y: 170,
          ...textStyle,
        },
      });
      group.addShape('text', {
        attrs: {
          text: t('两个端点都是真实节点'),
          y: realEdgeText.getBBox().maxY + 8,
          ...textStyle,
          opacity: 0.6,
          fontSize: 10,
        },
      });

      const newNodeText = group.addShape('text', {
        attrs: {
          text: t('绿点标记：新增节点'),
          y: 210,
          ...textStyle,
          x: 130,
        },
      });
      group.addShape('text', {
        attrs: {
          text: t('相较于上一次结果，右上方小绿点标记了\n本次更新结果中新增的聚合节点或真实节点'),
          y: newNodeText.getBBox().maxY + 16,
          ...textStyle,
          opacity: 0.6,
          fontSize: 10,
          x: 130,
        },
      });
    }
  });

  if (i18n.language === 'zh') {
    return (
      <div id="legend-panel">
        <h1 className="legned-title">图例与使用方式</h1>
        <a
          className="description"
          href="https://github.com/antvis/G6/blob/master/packages/site/site/pages/largegraph.zh.tsx"
          target="_blanck"
        >
          源代码
        </a>
        <div id="legend-graph-container" ref={container} />
        <div id="discription-container">
          <span className="description">
            一些科学研究表明，不超过 500
            个节点的图可视化是适合终端用户阅读和交互式探索的。根据这个原则，在大规模图上，我们将元数据中的节点通过
            LOUVAIN
            聚类算法进行聚合。首先展示被聚合后的图，然后用户可以通过展开聚合节点进行下钻式探索。
          </span>
          <span className="description">
            如果一次聚合后的节点数仍然庞大，可以进行多层次的聚合。为了控制渲染节点的数量，展开多个聚类后，最早被展开的聚类将会被自动收起。这一方案除了满足上述原则，还能减少前端计算和渲染的负担。
          </span>
          <br />
          <br />
          <h3 className="legned-title">{`<图交互>`}</h3>
          <img
            src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IgoxQ7wfjCcAAAAAAAAAAAAAARQnAQ"
            width="120"
          />{' '}
          &nbsp; &nbsp; &nbsp; &nbsp;
          <img
            src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cCk4SrHVfDsAAAAAAAAAAAAAARQnAQ"
            width="150"
          />
          <br />
          <br />
          <span className="description">
            {' '}
            每个“聚合点”{' '}
            <img
              src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ"
              width="50"
            />
            代表了一个 LOUVAIN 计算出的聚类，包含多个“真实节点”{' '}
            <img
              src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ"
              width="20"
            />
            .<strong>「右击」</strong> 任意节点或边，一个相对应的上下文菜单将会出现。 右击{' '}
            <img
              src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ"
              width="50"
            />{' '}
            并选择“展开聚合节点”，聚合节点将会被该聚类中的真实节点替代，这就是下钻式探索。
            你也可以通过右击{' '}
            <img
              src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ"
              width="20"
            />{' '}
            并选择“聚合该聚类”将已经展开的节点聚合；或选择 “寻找 k 度邻居”，被选中点的 k
            度邻居节点将会被融合到当前图中。
          </span>
          <br /> <br />
          <h3 className="legned-title">{`<画布菜单>`}</h3>
          <img
            src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FKbFRIzj34EAAAAAAAAAAAAAARQnAQ"
            width="300"
          />
          <br />
          <span>
            在画布左上角，有一个画布菜单，包含一系列辅助探索的工具。从左到右，它们分别是：
          </span>
          <br />
          <span>
            <strong>
              - 显示/隐藏边标签；
              <br />- 鱼眼放大镜；
              <br />- 拉索选择模式；
              <br />- 寻找最短路径（按 SHIFT 点选两个端点）；
              <br />- 缩小；
              <br />- 使图内容适应视窗；
              <br />- 放大；
              <br />- 搜索一个节点（输入 ID）。
            </strong>
          </span>
          <br /> <br />
          <h3 className="legned-title">{`<注意>`}</h3>
          <span>
            该 demo
            仅为展示大规模图可视化方案，因此使用的数据是一个较小的、模拟的数据集。除了上述内容外，还有很多其他的功能。愉快地探索吧。希望它对你有所帮助。
          </span>
        </div>
      </div>
    );
  }

  return (
    <div id="legend-panel">
      <h1 className="legned-title">Legend and Usage</h1>
      <a
        className="description"
        href="https://github.com/antvis/G6/blob/master/packages/site/site/pages/largegraph.zh.tsx"
        target="_blanck"
      >
        Source Code
      </a>
      <div id="legend-graph-container" ref={container} />
      <div id="discription-container">
        <span className="description">
          {' '}
          Some research has found that the graph visulization is readable and interactable for end
          users under 500 nodes. To reach this principle for large graph, we clustering the source
          data by LOUVAIN algorithm, and visualize the aggregated graph first. Then, end users are
          able to do drilling down exploration.
        </span>
        <span className="description">
          {' '}
          If the number of nodes still large on aggregated graph, we can do multi-level aggregation.
          To control the number of rendering nodes, the earliest expanded cluster will be collapsed
          automatically. These rules also help us to avoid overloaded computation and rendering on
          front-end.
        </span>
        <br />
        <br />
        <h3 className="legned-title">{`<Graph Interaction>`}</h3>
        <img
          src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IgoxQ7wfjCcAAAAAAAAAAAAAARQnAQ"
          width="120"
        />{' '}
        &nbsp; &nbsp; &nbsp; &nbsp;
        <img
          src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cCk4SrHVfDsAAAAAAAAAAAAAARQnAQ"
          width="150"
        />
        <br />
        <br />
        <span className="description">
          {' '}
          Each 'Aggregated Node'{' '}
          <img
            src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ"
            width="50"
          />
          represents a cluster generated by LOUVAIN, it contains several 'Real Node'{' '}
          <img
            src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ"
            width="20"
          />
          .<strong>「Right Click」</strong> any node or edge on the graph, a corresponding
          contextmenu will show up. Right click{' '}
          <img
            src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ"
            width="50"
          />{' '}
          and select 'Expand Node', the aggregated node will be replaced by the real nodes of the
          cluster. You can also right click{' '}
          <img
            src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ"
            width="20"
          />{' '}
          and select 'Collapse the Cluster' to collapse it, or select 'Find k-Degree Neighbor', A
          neighbor graph of the selected node will be merged into the current graph.
        </span>
        <br /> <br />
        <h3 className="legned-title">{`<The Canvas Menu>`}</h3>
        <img
          src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FKbFRIzj34EAAAAAAAAAAAAAARQnAQ"
          width="300"
        />
        <br />
        <span>
          There is a set of assistant tools on the canvas menu, which is on the left top of the
          canvas. From left to right, they are:
        </span>
        <br />
        <span>
          <strong>
            - Show/Hide Edge Labels;
            <br />
            - Fisheye Lens;
            <br />
            - Lasso Select Mode;
            <br />
            - Find the Shortest Path (by clicking select two end nodes);
            <br />
            - Zoom-out;
            <br />
            - Fit the Graph to the View Port;
            <br />
            - Zoom-in;
            <br />- Search a Node(by typing the id).
          </strong>
        </span>
        <br /> <br />
        <h3 className="legned-title">{`<Notice>`}</h3>
        <span>
          The demo shows a small mocked dataset just for demonstration. Besides the functions
          introduced above, there are lots of other functions. We hope it is helpful for you.
          Explore it and have fun!
        </span>
      </div>
    </div>
  );
};

export default LegendPanel;
