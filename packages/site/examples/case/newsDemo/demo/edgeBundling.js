import G6 from '@antv/g6';
import insertCss from 'insert-css';

/**
 * 该示例演示边绑定
 * by 十吾
 */

insertCss(`
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);

const lightBlue = 'rgb(119, 243, 252)';
const llightBlue16 = '#C8FDFC';
const lightOrange = 'rgb(230, 100, 64)';
const llightOrange16 = '#FFAA86';

fetch('https://gw.alipayobjects.com/os/basement_prod/7ba82250-8367-4351-82b2-d48604cd2261.json')
  .then((res) => res.json())
  .then((data) => {
    const nodes = data.nodes;
    const edges = data.edges;
    nodes.forEach((n) => {
      n.y = -n.y;
      n.degree = 0;
      n.inDegree = 0;
      n.outDegree = 0;
    });
    // compute the degree of each node
    const nodeIdMap = new Map();
    nodes.forEach((node) => {
      nodeIdMap.set(node.id, node);
    });
    edges.forEach((e) => {
      const source = nodeIdMap.get(e.source);
      const target = nodeIdMap.get(e.target);
      source.outDegree++;
      target.inDegree++;
      source.degree++;
      target.degree++;
      if (e.sytle === undefined) e.style = {};
      e.style.lineWidth = 0.7;
      e.style.strokeOpacity = 0.1;
      e.style.stroke = `l(0) 0:${llightOrange16} 1:${llightBlue16}`;
      if (nodeIdMap.get(e.source).x < nodeIdMap.get(e.target).x) {
        e.style.stroke = `l(0) 0:${llightBlue16} 1:${llightOrange16}`;
      }
    });
    let maxDegree = -9999;
    let minDegree = 9999;
    nodes.forEach((n) => {
      if (maxDegree < n.degree) maxDegree = n.degree;
      if (minDegree > n.degree) minDegree = n.degree;
    });
    const sizeRange = [1, 20];
    const sizeDataRange = [minDegree, maxDegree];
    scaleNodeProp(nodes, 'size', 'degree', sizeDataRange, sizeRange);

    // customize the node
    G6.registerNode(
      'pie-node',
      {
        draw: (cfg, group) => {
          const radius = cfg.size / 2;
          const inPercentage = cfg.inDegree / cfg.degree;
          const inAngle = inPercentage * Math.PI * 2;
          const inArcEnd = [radius * Math.cos(inAngle), radius * Math.sin(inAngle)];
          let isInBigArc = 1;
          let isOutBigArc = 0;
          if (inAngle > Math.PI) {
            isInBigArc = 0;
            isOutBigArc = 1;
          }
          const fanIn = group.addShape('path', {
            attrs: {
              path: [
                ['M', radius, 0],
                ['A', radius, radius, 0, isInBigArc, 0, inArcEnd[0], inArcEnd[1]],
                ['L', 0, 0],
                ['Z'],
              ],
              stroke: lightOrange,
              lineWidth: 0,
              fill: lightOrange,
            },
            name: 'fan-in-path',
          });

          group.addShape('path', {
            attrs: {
              path: [
                ['M', inArcEnd[0], inArcEnd[1]],
                ['A', radius, radius, 0, isOutBigArc, 0, radius, 0],
                ['L', 0, 0],
                ['Z'],
              ],
              stroke: lightBlue,
              lineWidth: 0,
              fill: lightBlue,
            },
            name: 'fan-out-path',
          });
          return fanIn;
        },
      },
      'single-node',
    );

    const edgeBundling = new G6.Bundling({
      bundleThreshold: 0.6,
      K: 100,
    });

    const container = document.getElementById('container');
    container.style.background = '#000';
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      plugins: [edgeBundling],
      fitView: true,
      defaultNode: {
        type: 'pie-node',
        size: 3,
        color: 'steelblue',
        style: {
          lineWidth: 0,
          fill: 'steelblue',
        },
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          {
            type: 'tooltip',
            formatText(model) {
              const text = `Longitude: ${model.lon} \n Latitude: ${model.lat}`;
              return text;
            },
            shouldUpdate: (e) => true,
          },
        ],
      },
    });

    edgeBundling.bundling(data);
    graph.data(data);
    graph.render();
    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  });

function scaleNodeProp(nodes, propName, refPropName, dataRange, outRange) {
  const outLength = outRange[1] - outRange[0];
  const dataLength = dataRange[1] - dataRange[0];
  nodes.forEach((n) => {
    n[propName] = ((n[refPropName] - dataRange[0]) * outLength) / dataLength + outRange[0];
  });
}
