import G6 from '@antv/g6';


let trigger = 'drag';
const filterConfigs = {
  trigger,
  showLabel: 'edge',
  r: 100,
  shouldShow: e => {
    return e.size > 3;
  },
  delegateStyle: {
    fill: '#F8E8D9',
    lineDash: [5, 5],
    stroke: '#666',
  },
};

let filterLens = new G6.EdgeFilterLens(filterConfigs);

// ================= The DOMs for configurations =============== //
const graphDiv = document.getElementById('container');

const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'inline-block';
buttonContainer.style.height = '35px';
buttonContainer.style.width = '100%';
buttonContainer.style.textAlign = 'center';

// tip
const tip = document.createElement('span');
tip.innerHTML = '点击画布任意位置开始探索。过滤镜中显示两端节点均在过滤镜中，且满足 shouldShow 所定义的条件的边。';
buttonContainer.appendChild(tip);

buttonContainer.appendChild(document.createElement('br'));

// tip english
const tipEn = document.createElement('span');
tipEn.innerHTML = 'Click the canvas to begin. Show the edge whose both end nodes are inside the lens, meanwhile the edge should meet the requirements defined by shouldShow in.';
buttonContainer.appendChild(tipEn);

buttonContainer.appendChild(document.createElement('br'));

// enable/disable the fisheye lens button
const swithButton = document.createElement('input');
swithButton.type = 'button';
swithButton.value = 'Disable';
swithButton.style.height = '25px';
swithButton.style.width = '60px';
swithButton.style.marginLeft = '16px';
buttonContainer.appendChild(swithButton);

// list for changing trigger
const triggerTag = document.createElement('span');
triggerTag.innerHTML = 'Trigger:';
triggerTag.style.marginLeft = '16px';
buttonContainer.appendChild(triggerTag);
const configTrigger = document.createElement('select');
configTrigger.value = 'drag';
configTrigger.style.height = '25px';
configTrigger.style.width = '100px';
configTrigger.style.marginLeft = '8px';
const dragTrigger = document.createElement('option');
dragTrigger.value = 'drag';
dragTrigger.innerHTML = 'drag';
configTrigger.appendChild(dragTrigger);
const mousemoveTrigger = document.createElement('option');
mousemoveTrigger.value = 'mousemove';
mousemoveTrigger.innerHTML = 'mousemove';
configTrigger.appendChild(mousemoveTrigger);
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
scaleRByUnset.value = undefined;
scaleRByUnset.innerHTML = 'undefined';
configScaleRBy.appendChild(scaleRByUnset);
buttonContainer.appendChild(configScaleRBy);

graphDiv.appendChild(buttonContainer);

// ========================================================= //

const width = graphDiv.scrollWidth;
const height = graphDiv.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height: height - 120,
  plugins: [filterLens],
  fitView: true,
  defaultEdge: {
    labelCfg: {
      autoRotate: true,
      style: {
        stroke: '#fff',
        lineWidth: 2
      }
    },
  },
  defaultNode: {
    size: 15,
    color: '#5B8FF9',
    style: {
      lineWidth: 2,
      fill: '#C6E5FF',
    },
  },
  modes: {
    default: ['drag-canvas']
  }
});

swithButton.addEventListener('click', (e) => {
  if (swithButton.value === 'Disable') {
    swithButton.value = 'Enable';
    graph.removePlugin(filterLens);
  } else {
    swithButton.value = 'Disable';
    filterLens = new G6.EdgeFilterLens({
      ...filterConfigs,
      trigger
    });
    graph.addPlugin(filterLens);
  }
});
configScaleRBy.addEventListener('change', e => {
  filterLens.updateParams({ scaleRBy: e.target.value });
});
configTrigger.addEventListener('change', e => {
  const filterLensConfigs = filterLens._cfgs;
  graph.removePlugin(filterLens);
  trigger = e.target.value;
  filterLens = new G6.EdgeFilterLens({
    ...filterLensConfigs,
    trigger
  })
  graph.addPlugin(filterLens);
});

fetch('https://gw.alipayobjects.com/os/bmw-prod/afe8b2a6-f691-4070-aa73-46fc07fd1171.json')
  .then((res) => res.json())
  .then((data) => {
    data.edges.forEach(edge => {
      edge.size = 1 + Math.random() * 3;
      edge.color = edge.size > 3 ? '#FB4B4B' : '#aaa'
      edge.style = {
        opacity: 0.7
      }
      edge.label = 'a';
    })
    graph.data(data);
    graph.render();
    graph.getEdges().forEach((edge) => {
      edge
        .getContainer()
        .getChildren()
        .forEach((shape) => {
          if (shape.get('type') === 'text') shape.set('visible', false);
        });
    });
  });
