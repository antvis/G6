import G6 from '@antv/g6';

const colors = [
  'rgb(91, 143, 249)',
  'rgb(90, 216, 166)',
  'rgb(93, 112, 146)',
  'rgb(246, 189, 22)',
  'rgb(232, 104, 74)',
  'rgb(109, 200, 236)',
  'rgb(146, 112, 202)',
  'rgb(255, 157, 77)',
  'rgb(38, 154, 153)',
  'rgb(227, 137, 163)',
];
const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  modes: {
    default: [
      {
        type: 'edge-tooltip',
        formatText: function formatText(model) {
          const text = 'source: ' + model.sourceName + '<br/> target: ' + model.targetName;
          return text;
        },
      },
    ],
  },
  defaultNode: {
    style: {
      opacity: 0.8,
      lineWidth: 1,
      stroke: '#999',
    },
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
    style: {
      opacity: 0.6,
      lineAppendWidth: 3,
    },
  },
});
graph.on('edge:mouseenter', function (e) {
  const edge = e.item;
  graph.setItemState(edge, 'hover', true);
});
graph.on('edge:mouseleave', function (e) {
  const edge = e.item;
  graph.setItemState(edge, 'hover', false);
});

fetch('https://gw.alipayobjects.com/os/basement_prod/70cde3be-22e8-4291-98f1-4d5a5b75b62f.json')
  .then((res) => res.json())
  .then((data) => {
    const edges = data.edges;
    const nodes = data.nodes;
    const nodeMap = new Map();
    const clusterMap = new Map();
    let clusterId = 0;
    const n = nodes.length;
    const horiPadding = 10;
    const begin = [horiPadding, height * 0.7];
    const end = [width - horiPadding, height * 0.7];
    const xLength = end[0] - begin[0];
    const yLength = end[1] - begin[1];
    const xSep = xLength / n;
    const ySep = yLength / n;
    nodes.forEach(function (node, i) {
      node.x = begin[0] + i * xSep;
      node.y = begin[1] + i * ySep;
      nodeMap.set(node.id, node);
      // cluster
      if (node.cluster && clusterMap.get(node.cluster) === undefined) {
        clusterMap.set(node.cluster, clusterId);
        clusterId++;
      }
      const id = clusterMap.get(node.cluster);
      if (node.style) {
        node.style.fill = colors[id % colors.length];
      } else {
        node.style = {
          fill: colors[id % colors.length],
        };
      }
      // label
      node.label = node.name;
      node.labelCfg = {
        position: 'bottom',
        offset: 5,
        style: {
          rotate: Math.PI / 2,
          textAlign: 'start',
        },
      };
    });
    edges.forEach((edge) => {
      edge.type = 'arc';
      const source = nodeMap.get(edge.source);
      const target = nodeMap.get(edge.target);
      const endsSepStep = (target.x - source.x) / xSep;
      const sign = endsSepStep < 0 ? -1 : 1;
      const curveOffset = sign * 10 * Math.ceil(Math.abs(endsSepStep));
      edge.curveOffset = curveOffset;
      edge.color = source.style.fill;
      edge.sourceName = source.name;
      edge.targetName = target.name;
    });

    // map the value to node size
    let maxValue = -9999,
      minValue = 9999;
    nodes.forEach(function (n) {
      if (maxValue < n.value) maxValue = n.value;
      if (minValue > n.value) minValue = n.value;
    });
    const sizeRange = [3, 25];
    const sizeDataRange = [minValue, maxValue];
    scaleNodeProp(nodes, 'size', 'value', sizeDataRange, sizeRange);

    graph.data(data);
    graph.render();
    //   const tooltip = document.getElementsByClassName('g6-tooltip')[0];
    //   if (tooltip) {
    //     tooltip.style.border = '1px solid #e2e2e2';
    //     tooltip.style.borderRadius = '4px';
    //     tooltip.style.fontSize = '12px';
    //     tooltip.style.color = '#545454';
    //     tooltip.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    //     tooltip.style.padding = '10px 8px';
    //     tooltip.style.boxShadow = 'rgb(174, 174, 174) 0px 0px 10px';
    //   }
  });

function scaleNodeProp(nodes, propName, refPropName, dataRange, outRange) {
  const outLength = outRange[1] - outRange[0];
  const dataLength = dataRange[1] - dataRange[0];
  nodes.forEach(function (n) {
    n[propName] = ((n[refPropName] - dataRange[0]) * outLength) / dataLength + outRange[0];
  });
}
