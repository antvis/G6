import { Graph, Extensions, extend } from '../../../src/index';

export default async () => {
  let trigger = 'mousemove';
  let filterLens = {
    type: 'filterLens',
    key: 'filterLens1',
    trigger,
    showLabel: 'edge',
    r: 140,
  };

  // ================= The DOMs for configurations =============== //
  const graphDiv = document.getElementById('container');

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'inline-block';
  buttonContainer.style.height = '35px';
  buttonContainer.style.width = '100%';
  buttonContainer.style.textAlign = 'center';

  // tip
  const tip = document.createElement('span');
  tip.innerHTML = '点击画布任意位置开始探索。过滤镜中显示两端节点均在过滤镜中的边。';
  buttonContainer.appendChild(tip);

  buttonContainer.appendChild(document.createElement('br'));

  // tip english
  const tipEn = document.createElement('span');
  tipEn.innerHTML =
    'Click the canvas to begin. Show the edge whose both end nodes are inside the lens.';
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
  scaleRByUnset.value = undefined;
  scaleRByUnset.innerHTML = 'undefined';
  configScaleRBy.appendChild(scaleRByUnset);
  buttonContainer.appendChild(configScaleRBy);

  graphDiv.parentNode.appendChild(buttonContainer);

  // ========================================================= //
  const container = document.getElementById('container');
  const width = container.scrollWidth;
  const height = container.scrollHeight || 500;

  const ExtGraph = extend(Graph, {
    plugins: {
      filterLens: Extensions.EdgeFilterLens,
    },
  });
  const graph = new ExtGraph({
    container: 'container',
    width,
    height: height,
    layout: {
      type: 'force',
      rankdir: 'LR',
      align: 'DL',
      nodesepFunc: () => 1,
      ranksepFunc: () => 1,
    },
    plugins: [filterLens],
    node: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          lodStrategy: {
            levels: [
              { zoomRange: [0, 0.9] }, // -1
              { zoomRange: [0.9, 1], primary: true }, // 0
              { zoomRange: [1, 1.2] }, // 1
              { zoomRange: [1.2, 1.5] }, // 2
              { zoomRange: [1.5, Infinity] }, // 3
            ],
            animateCfg: {
              duration: 500,
            },
          },
          labelShape: {
            text: innerModel.data.label,
            lod: 1, // 图的缩放大于 levels 第一层定义的 zoomRange[0] 时展示，小于时隐藏
          },
        }
      }
    },
    edge: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          lodStrategy: {
            levels: [
              { zoomRange: [0, 0.9] }, // -1
              { zoomRange: [0.9, 1], primary: true }, // 0
              { zoomRange: [1, 1.2] }, // 1
              { zoomRange: [1.2, 1.5] }, // 2
              { zoomRange: [1.5, Infinity] }, // 3
            ],
            animateCfg: {
              duration: 500,
            },
          },
          labelShape: {
            text: innerModel.data.label,
            lod: 1, // 图的缩放大于 levels 第一层定义的 zoomRange[0] 时展示，小于时隐藏
          },
        }
      }
    },
    modes: {
      // default: ['drag-canvas',],
    },
  });

  // swithButton.addEventListener('click', (e) => {
  //   if (swithButton.value === 'Disable') {
  //     swithButton.value = 'Enable';
  //     graph.removePlugins(filterLensPlugin);
  //   } else {
  //     swithButton.value = 'Disable';
  //     filterLensPlugin = new Extensions.EdgeFilterLens(filterLens);
  //     graph.addPlugins(filterLensPlugin);
  //   }
  // });
  // configScaleRBy.addEventListener('change', (e) => {
  //   filterLensPlugin.updateParams({ scaleRBy: e.target.value });
  //   graph.updatePlugin(filterLensPlugin);
  // });
  configTrigger.addEventListener('change', (e) => {
    filterLens = {
      ...filterLens,
      trigger: e.target.value 
    }
    graph.updatePlugin(filterLens);
  });

  fetch('https://gw.alipayobjects.com/os/bmw-prod/afe8b2a6-f691-4070-aa73-46fc07fd1171.json')
    .then((res) => res.json())
    .then((data) => {
      data.edges.forEach((edge) => {
        edge.id = edge.source + '-' + edge.target;
        edge.data = {
          label: 'a'
        };
      });
      graph.read(data);
      graph.zoom(0.6);
    });
} 
