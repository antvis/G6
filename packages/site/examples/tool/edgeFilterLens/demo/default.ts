import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    'edge-filter-lens': Extensions.EdgeFilterLens,
  },
});

let filterLensConfig = {
  key: 'edge-filter-lens-plg',
  type: 'edge-filter-lens',
  trigger: 'mousemove',
  showLabel: 'edge',
  showType: 'both',
  r: 140,
};

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;

const graph = new Graph({
  container: 'container',
  width,
  height,
  transforms: ['transform-v4-data', 'edge-label-transform'],
  plugins: [filterLensConfig],
  layout: {
    type: 'force',
    linkDistance: 100,
  },
  edge: {
    labelShape: {
      text: {
        fields: ['value'],
        formatter: (model) => `v=${model.data.value}`,
      },
    },
    labelBackgroundShape: {},
  },
});
graph.on('afterrender', (e) => {
  graph.zoomTo(0.6);
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    graph.read(data);
window.graph = graph;
  });

const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'inline-block';
buttonContainer.style.height = '35px';
buttonContainer.style.width = '100%';
buttonContainer.style.textAlign = 'center';
buttonContainer.style.position = 'absolute';
buttonContainer.style.top = '0px';

// tip
const tip = document.createElement('span');
tip.innerHTML = '点击画布任意位置开始探索。过滤镜中显示两端节点均在过滤镜中的边。';
buttonContainer.appendChild(tip);

buttonContainer.appendChild(document.createElement('br'));

// tip english
const tipEn = document.createElement('span');
tipEn.innerHTML = 'Click the canvas to begin. Show the edge whose both end nodes are inside the lens.';
buttonContainer.appendChild(tipEn);

buttonContainer.appendChild(document.createElement('br'));

// enable/disable the fisheye lens button
const switchButton = document.createElement('input');
switchButton.type = 'button';
switchButton.value = 'Disable';
switchButton.style.height = '25px';
switchButton.style.width = '60px';
switchButton.style.marginLeft = '16px';
buttonContainer.appendChild(switchButton);

// list for changing trigger
const triggerTag = document.createElement('span');
triggerTag.innerHTML = 'Trigger:';
triggerTag.style.marginLeft = '16px';
buttonContainer.appendChild(triggerTag);
const configTrigger = document.createElement('select');
configTrigger.value = 'mousemove';
configTrigger.style.height = '25px';
configTrigger.style.width = '100px';
configTrigger.style.marginLeft = '8px';
const mousemoveTrigger = document.createElement('option');
mousemoveTrigger.value = 'mousemove';
mousemoveTrigger.innerHTML = 'mousemove';
configTrigger.appendChild(mousemoveTrigger);
const dragTrigger = document.createElement('option');
dragTrigger.value = 'drag';
dragTrigger.innerHTML = 'drag';
configTrigger.appendChild(dragTrigger);
const clickTrigger = document.createElement('option');
clickTrigger.value = 'click';
clickTrigger.innerHTML = 'click';
configTrigger.appendChild(clickTrigger);
buttonContainer.appendChild(configTrigger);

// list for changing scaleRBy
const scaleR = document.createElement('span');
scaleR.innerHTML = 'Scale r by:';
scaleR.style.marginLeft = '16px';
buttonContainer.appendChild(scaleR);
const configScaleRBy = document.createElement('select');
configScaleRBy.value = 'wheel';
configScaleRBy.style.height = '25px';
configScaleRBy.style.width = '100px';
configScaleRBy.style.marginLeft = '8px';
const scaleRByWheel = document.createElement('option');
scaleRByWheel.value = 'wheel';
scaleRByWheel.innerHTML = 'wheel';
configScaleRBy.appendChild(scaleRByWheel);
const scaleRByUnset = document.createElement('option');
scaleRByUnset.value = 'unset';
scaleRByUnset.innerHTML = 'unset';
configScaleRBy.appendChild(scaleRByUnset);
buttonContainer.appendChild(configScaleRBy);

container.parentNode.appendChild(buttonContainer);

switchButton.addEventListener('click', (e) => {
  if (switchButton.value === 'Disable') {
    switchButton.value = 'Enable';
    graph.removePlugins([filterLensConfig.key]);
  } else {
    switchButton.value = 'Disable';
    graph.addPlugins([filterLensConfig]);
  }
});
configScaleRBy.addEventListener('change', (e) => {
  filterLensConfig = {
    ...filterLensConfig,
    scaleRBy: e.target.value,
  };
  graph.updatePlugin(filterLensConfig);
});
configTrigger.addEventListener('change', (e) => {
  filterLensConfig = {
    ...filterLensConfig,
    trigger: e.target.value,
  };
  graph.updatePlugin(filterLensConfig);
});
