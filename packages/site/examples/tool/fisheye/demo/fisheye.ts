import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    fisheye: Extensions.Fisheye,
  },
});

let fisheye = {
  type: 'fisheye',
  key: 'fisheye1',
  scaleDBy: 'unset',
  scaleRBy: 'unset',
  r: 200,
  showLabel: true,
  trigger: 'mousemove',
};
const colors = ['#8FE9FF', '#87EAEF', '#FFC9E3', '#A7C2FF', '#FFA1E3', '#FFE269', '#BFCFEE', '#FFA0C5', '#D5FF86'];

// ================= The DOMs for configurations =============== //
const graphDiv = document.getElementById('container');

const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'inline-block';
buttonContainer.style.height = '35px';
buttonContainer.style.width = '100%';
buttonContainer.style.textAlign = 'center';

// clear the fisheye effect button
const clearButton = document.createElement('input');
clearButton.type = 'button';
clearButton.value = 'Clear';
clearButton.style.height = '25px';
clearButton.style.width = '60px';
buttonContainer.appendChild(clearButton);

// enable/disable the fisheye lens button
const swithButton = document.createElement('input');
swithButton.type = 'button';
swithButton.value = 'Disable';
swithButton.style.height = '25px';
swithButton.style.width = '60px';
swithButton.style.marginLeft = '16px';
buttonContainer.appendChild(swithButton);

buttonContainer.appendChild(document.createElement('br'));

// list for changing trigger
const trigger = document.createElement('span');
trigger.innerHTML = 'Trigger:';
trigger.style.marginLeft = '16px';
buttonContainer.appendChild(trigger);
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
configScaleRBy.value = 'unset';
configScaleRBy.style.height = '25px';
configScaleRBy.style.width = '100px';
configScaleRBy.style.marginLeft = '8px';
const scaleRByUnset = document.createElement('option');
scaleRByUnset.value = 'unset';
scaleRByUnset.innerHTML = 'unset';
configScaleRBy.appendChild(scaleRByUnset);
const scaleRByWheel = document.createElement('option');
scaleRByWheel.value = 'wheel';
scaleRByWheel.innerHTML = 'wheel';
configScaleRBy.appendChild(scaleRByWheel);
const scaleRByDrag = document.createElement('option');
scaleRByDrag.value = 'drag';
scaleRByDrag.innerHTML = 'drag';
configScaleRBy.appendChild(scaleRByDrag);
buttonContainer.appendChild(configScaleRBy);

// list for changing scaleDBy
const scaleD = document.createElement('span');
scaleD.innerHTML = 'Scale d by:';
scaleD.style.marginLeft = '16px';
buttonContainer.appendChild(scaleD);
const configScaleDBy = document.createElement('select');
configScaleDBy.value = 'unset';
configScaleDBy.style.height = '25px';
configScaleDBy.style.width = '100px';
configScaleDBy.style.marginLeft = '8px';
const scaleDByUnset = document.createElement('option');
scaleDByUnset.value = 'unset';
scaleDByUnset.innerHTML = 'unset';
configScaleDBy.appendChild(scaleDByUnset);
const scaleDByWheel = document.createElement('option');
scaleDByWheel.value = 'wheel';
scaleDByWheel.innerHTML = 'wheel';
configScaleDBy.appendChild(scaleDByWheel);
const scaleDByDrag = document.createElement('option');
scaleDByDrag.value = 'drag';
scaleDByDrag.innerHTML = 'drag';
configScaleDBy.appendChild(scaleDByDrag);
buttonContainer.appendChild(configScaleDBy);

graphDiv.parentNode.appendChild(buttonContainer);

// ========================================================= //

const container = document.getElementById('container');
let width = 1500;
let height = 500;
if (container) {
  width = container.scrollWidth;
  height = container.scrollHeight || 500;
}
let graph;
const createGraph = (customData) => {
  graph = new Graph({
    container: 'container',
    width,
    height,
    layout: {
      type: 'force',
      rankdir: 'LR',
      align: 'DL',
      nodesepFunc: () => 1,
      ranksepFunc: () => 1,
    },
    plugins: [fisheye],
    data: customData,
    node: (innerModel) => {
      return {
        ...innerModel,
      };
    },
  });

  clearButton.addEventListener('click', (e) => {});
  swithButton.addEventListener('click', (e) => {
    if (swithButton.value === 'Disable') {
      swithButton.value = 'Enable';
      graph.removePlugins(['fisheye1']);
    } else {
      swithButton.value = 'Disable';
      graph.addPlugins([fisheye]);
    }
  });
  configScaleRBy.addEventListener('change', (e) => {
    fisheye = {
      ...fisheye,
      scaleRBy: e.target.value,
    };
    graph.updatePlugin(fisheye);
  });
  configScaleDBy.addEventListener('change', (e) => {
    // fisheye.scaleDBy = e.target.value;
    fisheye = {
      ...fisheye,
      scaleDBy: e.target.value,
    };
    graph.updatePlugin(fisheye);
  });
  configTrigger.addEventListener('change', (e) => {
    fisheye = {
      ...fisheye,
      trigger: e.target.value,
    };
    graph.updatePlugin(fisheye);
  });
};

fetch('https://gw.alipayobjects.com/os/bmw-prod/afe8b2a6-f691-4070-aa73-46fc07fd1171.json')
  .then((res) => res.json())
  .then((data) => {
    data.nodes.forEach((node) => {
      node.data = {
        ...node.data,
        label: node.id,
        color: colors[Math.floor(Math.random() * 9)],
        size: Math.random() * 30 + 10,
        r: Math.random() * 30 + 10,
        keyShape: {
          r: Math.random() * 20 + 10,
          fill: colors[Math.floor(Math.random() * 9)],
        },
        lineWidth: 0,
      };
    });
    data.edges.forEach((edge) => {
      edge.id = edge.source + '-' + edge.target;
      edge.data = {
        color: '#ccc',
      };
    });

    createGraph(data);
  });
