import G6 from '@antv/g6';

const { louvain } = G6.Algorithm;

const button = document.createElement('button');
button.innerHTML = `Click Here to Clustering 点此自动聚类`;
document.getElementById('container').appendChild(button);

// Generate color sets according to subject colors
const subjectColors = [
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
const colorSets = G6.Util.getColorSetsBySubjectColors(subjectColors, '#fff', 'default', '#777');

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
  },
  layout: {
    type: 'gForce',
    minMovement: 0.1,
  },
});
fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    graph.data(data);
    graph.render();

    button.addEventListener('click', (e) => {
      const clusteredData = louvain(data, false);
      
      clusteredData.clusters.forEach((cluster, i) => {
        const colorSet = colorSets[i % colorSets.length];
        cluster.nodes.forEach((node) => {
          const model = graph.findById(node.id).getModel();
          model.style.fill = colorSet.mainFill
          model.style.stroke = colorSet.mainStroke
        });
      });
      graph.refresh();
    });
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 20);
  };
