import G6 from '@antv/g6';

let fisheye = new G6.Fisheye({
  r: 200,
  showLabel: true,
});
const colors = [
  '#8FE9FF',
  '#87EAEF',
  '#FFC9E3',
  '#A7C2FF',
  '#FFA1E3',
  '#FFE269',
  '#BFCFEE',
  '#FFA0C5',
  '#D5FF86',
];

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
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  plugins: [fisheye],
});

clearButton.addEventListener('click', (e) => {
  fisheye.clear();
});
swithButton.addEventListener('click', (e) => {
  if (swithButton.value === 'Disable') {
    swithButton.value = 'Enable';
    graph.removePlugin(fisheye);
  } else {
    swithButton.value = 'Disable';
    fisheye = new G6.Fisheye({
      r: 200,
      showLabel: true,
    });
    graph.addPlugin(fisheye);
  }
});
configScaleRBy.addEventListener('change', e => {
  fisheye.updateParams({ scaleRBy: e.target.value });
});
configScaleDBy.addEventListener('change', e => {
  fisheye.updateParams({ scaleDBy: e.target.value });
});
configTrigger.addEventListener('change', e => {
  const fisheyConfigs = fisheye._cfgs;
  graph.removePlugin(fisheye);
  fisheye = new G6.Fisheye({
    ...fisheyConfigs,
    trigger: e.target.value
  })
  graph.addPlugin(fisheye);
});

fetch('https://gw.alipayobjects.com/os/bmw-prod/afe8b2a6-f691-4070-aa73-46fc07fd1171.json')
  .then((res) => res.json())
  .then((data) => {
    data.nodes.forEach((node) => {
      node.label = node.id;
      node.size = Math.random() * 30 + 10;
      node.style = {
        fill: colors[Math.floor(Math.random() * 9)],
        lineWidth: 0,
      };
    });
    graph.data(data);
    graph.render();
    graph.getNodes().forEach((node) => {
      node
        .getContainer()
        .getChildren()
        .forEach((shape) => {
          if (shape.get('type') === 'text') shape.hide();
        });
    });
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };