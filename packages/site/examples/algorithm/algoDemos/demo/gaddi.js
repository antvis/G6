import G6 from '@antv/g6';

const { GADDI } = G6.Algorithm;

const colors = [
  '#5F95FF', // blue
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
];
const colorSets = G6.Util.getColorSetsBySubjectColors(colors, '#fff', 'default', '#777');


const data = {"nodes":[{"id":"0","label":"0","x":217.86420885505296,"y":114.28884847734246,"cluster":"nodeType-0"},{"id":"1","label":"1","x":113.58792632732174,"y":25.785315472468127,"cluster":"nodeType-1"},{"id":"2","label":"2","x":179.59682070334452,"y":38.87850516662148,"cluster":"nodeType-2"},{"id":"3","label":"3","x":204.20226244579672,"y":-5.33508012158744,"cluster":"nodeType-0"},{"id":"4","label":"4","x":308.74171746938134,"y":10.554714934145961,"cluster":"nodeType-1"},{"id":"5","label":"5","x":341.99836557519745,"y":48.30310308747067,"cluster":"nodeType-2"},{"id":"6","label":"6","x":376.62085426957793,"y":-10.286527884559707,"cluster":"nodeType-0"},{"id":"7","label":"7","x":254.42832676365109,"y":62.51510456243093,"cluster":"nodeType-1"},{"id":"8","label":"8","x":139.32504277036227,"y":135.40373347960067,"cluster":"nodeType-2"},{"id":"9","label":"9","x":245.24964464688256,"y":166.03052347036282,"cluster":"nodeType-0"},{"id":"10","label":"10","x":250.33418485239127,"y":227.6830390965898,"cluster":"nodeType-1"},{"id":"11","label":"11","x":176.79897890681895,"y":235.80422881594598,"cluster":"nodeType-2"},{"id":"12","label":"12","x":331.32653587613936,"y":158.8731219947074,"cluster":"nodeType-0"},{"id":"13","label":"13","x":292.8309736938475,"y":106.794007203338,"cluster":"nodeType-1"},{"id":"14","label":"14","x":175.6768625027686,"y":179.3951732038534,"cluster":"nodeType-2"},{"id":"15","label":"15","x":83.26466725029928,"y":96.50488885477502,"cluster":"nodeType-0"},{"id":"16","label":"16","x":318.09206038019914,"y":241.38853020289633,"cluster":"nodeType-1"},{"id":"17","label":"17","x":397.2096443837184,"y":251.11323425020436,"cluster":"nodeType-2"},{"id":"18","label":"18","x":396.9307017482416,"y":305.79619379078093,"cluster":"nodeType-0"},{"id":"19","label":"19","x":323.19884694585255,"y":354.7889914141042,"cluster":"nodeType-1"},{"id":"20","label":"20","x":334.7320270398703,"y":289.0437229111331,"cluster":"nodeType-2"},{"id":"21","label":"21","x":276.9512819725375,"y":284.9808595526045,"cluster":"nodeType-0"},{"id":"22","label":"22","x":235.086300958203,"y":348.23515388308186,"cluster":"nodeType-1"},{"id":"23","label":"23","x":263.36101059763547,"y":442.4976175844671,"cluster":"nodeType-2"},{"id":"24","label":"24","x":195.01142425098806,"y":287.081197770762,"cluster":"nodeType-0"},{"id":"25","label":"25","x":120.39188452563401,"y":337.8524937873151,"cluster":"nodeType-1"},{"id":"26","label":"26","x":109.74700930888443,"y":407.5171194512714,"cluster":"nodeType-2"},{"id":"27","label":"27","x":328.18870325041166,"y":527.9726877901181,"cluster":"nodeType-0"},{"id":"28","label":"28","x":221.745767731853,"y":400.38906283199213,"cluster":"nodeType-1"},{"id":"29","label":"29","x":243.98258526664858,"y":553.9974335527247,"cluster":"nodeType-2"},{"id":"30","label":"30","x":179.30103487685315,"y":433.1126685019916,"cluster":"nodeType-0"},{"id":"31","label":"31","x":221.65781762707928,"y":474.10779931544715,"cluster":"nodeType-1"},{"id":"32","label":"32","x":349.13614579528684,"y":422.65934738145364,"cluster":"nodeType-2"},{"id":"33","label":"33","x":300.5432325124777,"y":401.2786277319002,"cluster":"nodeType-0"}],"edges":[{"source":"0","target":"1","cluster":"edgeType-0"},{"source":"0","target":"2","cluster":"edgeType-1"},{"source":"0","target":"3","cluster":"edgeType-2"},{"source":"0","target":"4","cluster":"edgeType-0"},{"source":"0","target":"5","cluster":"edgeType-1"},{"source":"0","target":"7","cluster":"edgeType-2"},{"source":"0","target":"8","cluster":"edgeType-0"},{"source":"0","target":"9","cluster":"edgeType-1"},{"source":"0","target":"10","cluster":"edgeType-2"},{"source":"0","target":"11","cluster":"edgeType-0"},{"source":"0","target":"13","cluster":"edgeType-1"},{"source":"0","target":"14","cluster":"edgeType-2"},{"source":"0","target":"15","cluster":"edgeType-0"},{"source":"0","target":"16","cluster":"edgeType-1"},{"source":"2","target":"3","cluster":"edgeType-2"},{"source":"4","target":"5","cluster":"edgeType-0"},{"source":"4","target":"6","cluster":"edgeType-1"},{"source":"5","target":"6","cluster":"edgeType-2"},{"source":"7","target":"13","cluster":"edgeType-0"},{"source":"8","target":"14","cluster":"edgeType-1"},{"source":"9","target":"10","cluster":"edgeType-2"},{"source":"10","target":"22","cluster":"edgeType-0"},{"source":"10","target":"14","cluster":"edgeType-1"},{"source":"10","target":"12","cluster":"edgeType-2"},{"source":"10","target":"24","cluster":"edgeType-0"},{"source":"10","target":"21","cluster":"edgeType-1"},{"source":"10","target":"20","cluster":"edgeType-2"},{"source":"11","target":"24","cluster":"edgeType-0"},{"source":"11","target":"22","cluster":"edgeType-1"},{"source":"11","target":"14","cluster":"edgeType-2"},{"source":"12","target":"13","cluster":"edgeType-0"},{"source":"16","target":"17","cluster":"edgeType-1"},{"source":"16","target":"18","cluster":"edgeType-2"},{"source":"16","target":"21","cluster":"edgeType-0"},{"source":"16","target":"22","cluster":"edgeType-1"},{"source":"17","target":"18","cluster":"edgeType-2"},{"source":"17","target":"20","cluster":"edgeType-0"},{"source":"18","target":"19","cluster":"edgeType-1"},{"source":"19","target":"20","cluster":"edgeType-2"},{"source":"19","target":"33","cluster":"edgeType-0"},{"source":"19","target":"22","cluster":"edgeType-1"},{"source":"19","target":"23","cluster":"edgeType-2"},{"source":"20","target":"21","cluster":"edgeType-0"},{"source":"21","target":"22","cluster":"edgeType-1"},{"source":"22","target":"24","cluster":"edgeType-2"},{"source":"22","target":"25","cluster":"edgeType-0"},{"source":"22","target":"26","cluster":"edgeType-1"},{"source":"22","target":"23","cluster":"edgeType-2"},{"source":"22","target":"28","cluster":"edgeType-0"},{"source":"22","target":"30","cluster":"edgeType-1"},{"source":"22","target":"31","cluster":"edgeType-2"},{"source":"22","target":"32","cluster":"edgeType-0"},{"source":"22","target":"33","cluster":"edgeType-1"},{"source":"23","target":"28","cluster":"edgeType-2"},{"source":"23","target":"27","cluster":"edgeType-0"},{"source":"23","target":"29","cluster":"edgeType-1"},{"source":"23","target":"30","cluster":"edgeType-2"},{"source":"23","target":"31","cluster":"edgeType-0"},{"source":"23","target":"33","cluster":"edgeType-1"},{"source":"32","target":"33","cluster":"edgeType-2"}]};
const button = document.createElement('button');
button.innerHTML = `Click Here to Match 点此开始匹配`;
document.getElementById('container').appendChild(button);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitView: true,
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
  },
});

const legendDataMap = {}
data.nodes.forEach((node, i) => {
  const colorSet = colorSets[(+node.cluster.split('-')[1])];
  node.style = {
    fill: colorSet.mainFill,
    stroke: colorSet.mainStroke,
  }
  if (!legendDataMap[node.cluster]) {
    legendDataMap[node.cluster] = {
      shape: 'circle',
      r: 6,
      text: node.cluster,
      fill: colorSet.mainFill,
      stroke: colorSet.mainStroke,
    }
  }
})
data.edges.forEach((edge, i) => {
  const colorSet = colorSets[(+edge.cluster.split('-')[1])];
  edge.style = {
    stroke: colorSet.mainStroke,
    lineWidth: 2,
    opacity: 0.3,
    endArrow: true
  }

  if (!legendDataMap[edge.cluster]) {
    legendDataMap[edge.cluster] = {
      shape: 'line',
      text: edge.cluster,
      stroke: colorSet.mainStroke,
      lineWidth: 2,
      opacity: 0.3,
      endArrow: true
    }
  }
})
graph.data(data);
graph.render();

// pattern graph data
const pattern = {
  nodes: [{
    id: 'pn0',
    cluster: 'nodeType-0'
  },{
    id: 'pn1',
    cluster: 'nodeType-1'
  },{
    id: 'pn2',
    cluster: 'nodeType-2'
  }],
  edges: [
    { source: 'pn1', target: 'pn0', cluster: 'edgeType-1' },
    { source: 'pn1', target: 'pn2', cluster: 'edgeType-0' },
    { source: 'pn2', target: 'pn0', cluster: 'edgeType-2' },
  ]
}


// draw pattern graph
pattern.nodes.forEach(pNode => {
  const colorSet = colorSets[(+pNode.cluster.split('-')[1])];
  pNode.style = {
    fill: colorSet.mainFill,
    stroke: colorSet.mainStroke,
  }
});
pattern.edges.forEach(pEdge => {
  const colorSet = colorSets[(+pEdge.cluster.split('-')[1])];
  pEdge.style = {
    stroke: colorSet.mainStroke,
  }
});
const patternGraphWidth = Math.max(width / 5, 100);
const patternGraphHeight = Math.max(height / 5, 100);
const patternGraph = new G6.Graph({
  container: 'container',
  width: patternGraphWidth,
  height: patternGraphHeight,
  fitView: true,
  defaultEdge: {
    style: {
      endArrow: true
    }
  },
  layout: {
    type: 'circular'
  }
})
patternGraph.data(pattern);
patternGraph.render();
const patternCanvas = patternGraph.get('canvas');
const patternCanvasEl = patternCanvas.get('el');
patternCanvasEl.style.position = 'absolute';
patternCanvasEl.style.top = '50px';
patternCanvasEl.style.left = '15px';
patternCanvasEl.style.backgroundColor = '#eee';
patternCanvasEl.style.opacity = 0.7;
patternCanvas.addShape('text', {
  attrs: {
    text: 'Pattern',
    x: patternGraphWidth - 55,
    y: patternGraphHeight - 10,
    fill: '#000',
    fontWeight: 500
  }
})


// draw legend
const legendGroup = graph.get('canvas').addGroup({
  attrs: {
    opacity: 0.7
  }
});
const legendBack = legendGroup.addShape('rect', {
  attrs: {
    height: 10,
    width: 10,
    x: 5,
    y: -10,
    fill: '#eee'
  }
})
legendGroup.addShape('text', {
  attrs: {
    text: 'Legend',
    x: 40,
    y: 5,
    fill: '#000',
    fontWeight: 500
  }
})
Object.keys(legendDataMap).forEach((cluster, i) => {
  const lData = legendDataMap[cluster];
  legendGroup.addShape(lData.shape, {
    attrs: {
      x: 20,
      y: 20 + i * 25,
      x1: 13,
      x2: 28,
      y1: 20 + i * 25,
      y2: 20 + i * 25,
      ...lData
    }
  })
  legendGroup.addShape('text', {
    attrs: {
      x: 35,
      y: 20 + i * 25,
      text: lData.text,
      fill: '#000',
      textBaseline: 'middle'
    }
  })
}) 
const legendBBox = legendGroup.getBBox();
legendBack.attr({
  width: legendBBox.width + 10,
  height: legendBBox.height + 10
})
legendGroup.setMatrix([1, 0, 0, 0, 1, 0, -10, patternGraphHeight + 40, 1])


// click the button to run GADDI graph pattern matching
// and the result will be marked with hull
button.addEventListener('click', (e) => {
  const matches = GADDI(
    data,
    pattern,
    true,
    undefined,
    undefined,
    'cluster',
    'cluster'
  );
  matches.forEach((match, i) => {
    graph.createHull({
      id: `match-${i}`,
      members: match.nodes.map(node => node.id)
    })
  });
  button.innerHTML = `The results are marked with hulls 结果已用轮廓标记`;
  button.disabled = true;
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 20);
  };
