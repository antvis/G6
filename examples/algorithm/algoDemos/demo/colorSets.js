import G6 from '@antv/g6';


const tipDiv = document.createElement('div');
tipDiv.innerHTML = `These are the suggested categorical color palette in G6. Input the subject colors, 'getColorSetsBySubjectColors' generate a set of colors for different state styles. You can modify the 'subjectColors' in the code to try your subject color. And it also provide default and dark theme with different background colors. <br /> 下面是 G6 的推荐色板。输入主题色，'getColorSetsBySubjectColors' 将会输出与该主题色相关的一系列状态颜色。还可以指定叠加背景色的同时，指定主题是 default（亮色）或 dark（暗色）`;
document.getElementById('container').appendChild(tipDiv);


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
  '#F08BB4'
];
const backColor = '#fff';
const theme = 'default';
const disableColor = '#777';
const colorSets = G6.Util.getColorSetsBySubjectColors(subjectColors, backColor, theme, disableColor);

const data = { nodes: [] };

subjectColors.forEach((color, i) => {
  data.nodes.push({
    id: `node-${color}`,
    label: color,
    labelCfg: {
      position: 'bottom'
    },
    style: {
      fill: colorSets[i].mainFill,
      stroke: colorSets[i].mainStroke
    },
    stateStyles: {
      active: {
        fill: colorSets[i].activeFill,
        stroke: colorSets[i].activeStroke,
        shadowColor: colorSets[i].activeStroke,
      },
      inactive: {
        fill: colorSets[i].inactiveFill,
        stroke: colorSets[i].inactiveStroke
      },
      selected: {
        fill: colorSets[i].selectedFill,
        stroke: colorSets[i].selectedStroke,
        shadowColor: colorSets[i].selectedStroke,
      },
      highlight: {
        fill: colorSets[i].highlightFill,
        stroke: colorSets[i].highlightStroke
      },
      disable: {
        fill: colorSets[i].disableFill,
        stroke: colorSets[i].disableStroke
      }
    }
  })
});

// data.nodes.push({
//   id: `node-custom`,
//   label: `customColor`
// })

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 160;

G6.Global.nodeStateStyles = {};

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
  },
  fitView: true,
  layout: {
    type: 'grid'
  },
  defaultNode: {
    type: 'circle',
    labelCfg: {
      position: 'bottom'
    }
  },
  nodeStateStyles: {
    active: {
      fill: colorSets[1].activeFill,
      stroke: colorSets[1].activeStroke
    },
  }
});
graph.data(data);
graph.render();

graph.on('node:mouseenter', e => {
  graph.getNodes().forEach(node => {
    graph.setItemState(node, 'active', false);
  });
  graph.setItemState(e.item, 'active', true);
});

graph.on('node:mouseleave', e => {
  graph.setItemState(e.item, 'active', false);
});

graph.on('node:click', e => {
  graph.getNodes().forEach(node => {
    graph.setItemState(node, 'selected', false);
  });
  graph.setItemState(e.item, 'selected', true);
});

graph.on('canvas:click', e => {
  graph.getNodes().forEach(node => {
    graph.setItemState(node, 'selected', false);
  });
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 160);
  };
