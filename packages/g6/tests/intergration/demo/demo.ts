// @ts-nocheck

import { initThreads, supportsThreads, ForceLayout } from '@antv/layout-wasm';
import G6 from '../../../src/index';
import { container, height, width } from '../../datasets/const';
import data from './data';
import data3d from './data3d';
import { labelPropagation } from '@antv/algorithm';
// import Stats from 'stats.js';

let degrees = {};
let dataFor2D = { nodes: [], edges: [] };
let dataFor3D = { nodes: [], edges: [] };
const { nodes, edges } = data;
export { nodes, edges, degrees };

const getDefaultNodeAnimates = (delay?: number) => ({
  buildIn: [
    {
      fields: ['opacity'],
      duration: 1000,
      delay: delay === undefined ? 1000 + Math.random() * 1000 : delay,
    },
  ],
  buildOut: [
    {
      fields: ['opacity'],
      duration: 200,
    },
  ],
  update: [
    {
      fields: ['lineWidth', 'fill', 'r'],
      shapeId: 'keyShape',
    },
    {
      fields: ['fontSize'],
      shapeId: 'iconShape',
    },
    {
      fields: ['opacity'],
      shapeId: 'haloShape',
    },
  ],
  hide: [
    {
      fields: ['size'],
      duration: 200,
    },
    {
      fields: ['opacity'],
      duration: 200,
      shapeId: 'keyShape',
    },
    {
      fields: ['opacity'],
      duration: 200,
      shapeId: 'labelShape',
    },
  ],
  show: [
    {
      fields: ['size'],
      duration: 200,
    },
    {
      fields: ['opacity'],
      duration: 200,
      shapeId: 'keyShape',
      order: 0,
    },
  ],
});

const getDefaultEdgeAnimates = (delay?: number) => ({
  buildIn: [
    {
      fields: ['opacity'],
      duration: 300,
      delay: delay === undefined ? 1000 + Math.random() * 1000 : delay,
    },
  ],
  buildOut: [
    {
      fields: ['opacity'],
      duration: 200,
    },
  ],
  update: [
    {
      fields: ['lineWidth'],
      shapeId: 'keyShape',
    },
    {
      fields: ['opacity'],
      shapeId: 'haloShape',
    },
  ],
});

const defaultTheme = {
  type: 'spec',
  base: 'light',
  specification: {
    node: {
      dataTypeField: 'cluster',
    },
  },
};

const create2DGraph = (
  getNodeAnimates = getDefaultNodeAnimates,
  getEdgeAnimates = getDefaultEdgeAnimates,
  theme = defaultTheme,
  zoomConfig = undefined,
  rendererType = 'canvas',
) => {
  const graph = new G6.Graph({
    container: container as HTMLcontainer,
    width,
    height: 1400,
    type: 'graph',
    renderer: rendererType,
    data: dataFor2D,
    modes: {
      default: [
        { type: 'zoom-canvas', zoomOnItems: true },
        'drag-node',
        'drag-canvas',
        'brush-select',
        'click-select',
      ],
    },
    theme: { ...defaultTheme, ...theme },
    edge: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          type: 'line-edge',
          animates: getEdgeAnimates(),
        },
      };
    },
    // 节点配置
    node: (innerModel) => {
      const degree = degrees[innerModel.id] || 0;
      let labelLod = 4;
      if (degree > 40) labelLod = -1;
      else if (degree > 20) labelLod = 0;
      else if (degree > 10) labelLod = 1;
      else if (degree > 5) labelLod = 2;
      else if (degree > 2) labelLod = 3;
      return {
        ...innerModel,
        data: {
          animates: getNodeAnimates(),
          ...innerModel.data,
          lodStrategy: {
            levels: [
              { zoomRange: [0, 0.16] }, // -2
              { zoomRange: [0.16, 0.2] }, // -1
              { zoomRange: [0.2, 0.3], primary: true }, // 0
              { zoomRange: [0.3, 0.5] }, // 1
              { zoomRange: [0.5, 0.8] }, // 2
              { zoomRange: [0.8, 1] }, // 3
              { zoomRange: [1, 1.2] }, // 4
              { zoomRange: [1.2, 1.5] }, // 5
              { zoomRange: [1.5, Infinity] }, // 6
            ],
            animateCfg: {
              duration: 500,
            },
          },
          labelShape: degree !== 0 && {
            text: innerModel.data.label,
            maxWidth: '400%',
            offsetY: 8,
            lod: labelLod,
          },

          labelBackgroundShape: degree !== 0 && {
            lod: labelLod,
          },
          iconShape: degree !== 0 && {
            img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            fontSize: 12 + degree / 4,
            opacity: 0.8,
            lod: labelLod + 2,
          },
          keyShape: {
            r: 12 + degree / 4,
          },
        },
      };
    },
  });
  // graph.on('afterlayout', (e) => {
  //   Object.keys(degrees).forEach((id) => {
  //     // TODO: graph API for this
  //     if (degrees[id] > 20) {
  //       console.log('tofront', graph.itemController.itemMap[id]);
  //       graph.itemController.itemMap[id].toFront();
  //     }
  //   });
  // });

  if (zoomConfig) {
    graph.zoomTo(zoomConfig.zoom, zoomConfig.center);
  } else {
    graph.zoom(0.15);
  }
  graph.canvas.context.config.canvas.style.transition = 'all 0.3s ease';
  return graph;
};

const create3DGraph = async () => {
  G6.stdLib.layouts['force-wasm'] = ForceLayout;
  const supported = await supportsThreads();
  const threads = await initThreads(supported);
  const graph = new G6.Graph({
    container: container as HTMLDivElement,
    width,
    height: 1400,
    type: 'graph',
    renderer: 'webgl-3d',
    data: dataFor3D,
    // layout: {
    //   type: 'force-wasm',
    //   threads,
    //   dimensions: 2,
    //   maxIteration: 100,
    //   minMovement: 0.4,
    //   distanceThresholdMode: 'mean',
    //   height,
    //   width,
    //   center: [width / 2, height / 2],
    //   factor: 1,
    //   gravity: 10,
    //   linkDistance: 200,
    //   edgeStrength: 200,
    //   nodeStrength: 1000,
    //   coulombDisScale: 0.005,
    //   damping: 0.9,
    //   maxSpeed: 1000,
    //   interval: 0.02,
    // },
    layout: {
      type: 'force-wasm',
      threads,
      dimensions: 3,
      iterations: 300,
      minMovement: 10,
      height,
      width,
      linkDistance: 400,
      edgeStrength: 100,
      nodeStrength: 2000,
      center: [width / 2, height / 2, 0],
    },
    modes: {
      default: [
        {
          type: 'orbit-canvas-3d',
          trigger: 'drag',
        },
        'zoom-canvas-3d',
      ],
    },
    // @ts-ignore
    theme: {
      type: 'spec',
      specification: {
        node: {
          dataTypeField: 'cluster',
        },
      },
    },
    edge: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          keyShape: {
            lineWidth: 0.3,
            opacity: 0.4,
          },
          type: 'line-edge',
        },
      };
    },
    node: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          type: 'sphere-node',
          keyShape: {
            r: 12 + degrees[innerModel.id] / 2,
          },
          labelShape:
            degrees[innerModel.id] > 20
              ? {
                  text: innerModel.data.label,
                  fontSize: 100,
                  lod: -1,
                  fill: 'rgba(255,255,255,0.85)',
                  wordWrap: false, // FIXME: mesh.getBounds() returns an empty AABB
                  isBillboard: true,
                }
              : undefined,
        },
      };
    },
  });

  const rotate = (camera, rx: number, ry: number, graph) => {
    const { width, height } = graph.canvas.getConfig();
    const dx = 20.0 / height;
    const dy = 20.0 / width;
    let motionFactorX = 10;
    let motionFactorY = 10;
    if (rx * rx > 2 * ry * ry) {
      motionFactorY *= 0.5;
    } else if (ry * ry > 2 * rx * rx) {
      motionFactorX *= 0.5;
    }

    const rotX = rx * dx * motionFactorX;
    const rotY = ry * dy * motionFactorY;

    camera.rotate(rotX, 0);
  };

  graph.on('afterlayout', (e) => {
    let timer;
    setTimeout(() => {
      const camera = graph.canvas.getCamera();
      const oripos = camera.getPosition();
      let k = 0;
      let i = 0;
      const tick = () => {
        camera.setPosition([oripos[0], oripos[1], oripos[2] + k]);

        const rdx =
          i < 100 ? Math.min(i * 0.5, 20) : Math.min((200 - i) * 0.2, 20);
        rotate(camera, rdx, rdx, graph);

        timer = requestAnimationFrame(tick);
        if (i > 200) cancelAnimationFrame(timer);

        const param = i < 50 ? 3 : 0.5;
        k += 50 * param;
        i++;
      };
      tick();
    }, 1000);

    graph.once('canvas:pointerdown', (e) => {
      if (timer) cancelAnimationFrame(timer);
    });
    graph.once('wheel', (e) => {
      if (timer) cancelAnimationFrame(timer);
    });
  });

  return graph;
};

const addButtons = (graph) => {
  const btn = document.createElement('button');
  btn.innerHTML = '全屏';
  btn.style.position = 'absolute';
  btn.style.top = '14px';
  btn.style.left = '373px';
  btn.style.zIndex = '100';
  document.body.appendChild(btn);
  btn.addEventListener('click', (e) => {
    const canvasEl = graph.canvas.context.config.canvas;
    const requestMethod =
      canvasEl.requestFullScreen ||
      canvasEl.webkitRequestFullScreen ||
      canvasEl.mozRequestFullScreen ||
      canvasEl.msRequestFullScreen;
    if (requestMethod) {
      // Native full screen.
      requestMethod.call(canvasEl);
    } else if (typeof window.ActiveXObject !== 'undefined') {
      // Older IE.
      var wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  });

  const rendererSelect = document.createElement('select');
  rendererSelect.style.position = 'absolute';
  rendererSelect.style.top = '56px';
  rendererSelect.style.left = '16px';
  rendererSelect.style.zIndex = '100';
  const option1 = document.createElement('option');
  option1.innerHTML = 'Canvas';
  const option2 = document.createElement('option');
  option2.innerHTML = 'WebGL';
  const option3 = document.createElement('option');
  option3.innerHTML = 'WebGL-3D';
  const option4 = document.createElement('option');
  option4.innerHTML = 'SVG';
  rendererSelect.appendChild(option1);
  rendererSelect.appendChild(option2);
  rendererSelect.appendChild(option3);
  rendererSelect.appendChild(option4);
  document.body.appendChild(rendererSelect);

  const themeSelect = document.createElement('select');
  themeSelect.style.position = 'absolute';
  themeSelect.style.top = '86px';
  themeSelect.style.left = '16px';
  themeSelect.style.zIndex = '100';
  const themeOption0 = document.createElement('option');
  themeOption0.innerHTML = '亮色主题';
  const themeOption1 = document.createElement('option');
  themeOption1.innerHTML = '暗色主题';
  const themeOption2 = document.createElement('option');
  themeOption2.innerHTML = '蓝色主题';
  const themeOption3 = document.createElement('option');
  themeOption3.innerHTML = '橙色主题';
  themeSelect.appendChild(themeOption0);
  themeSelect.appendChild(themeOption1);
  themeSelect.appendChild(themeOption2);
  themeSelect.appendChild(themeOption3);
  document.body.appendChild(themeSelect);

  const btnZoomIn = document.createElement('button');
  btnZoomIn.innerHTML = '+';
  btnZoomIn.style.position = 'absolute';
  btnZoomIn.style.top = '114px';
  btnZoomIn.style.left = '16px';
  btnZoomIn.style.width = '24px';
  btnZoomIn.style.zIndex = '100';
  document.body.appendChild(btnZoomIn);
  const btnZoomOut = document.createElement('button');
  btnZoomOut.innerHTML = '-';
  btnZoomOut.style.position = 'absolute';
  btnZoomOut.style.top = '114px';
  btnZoomOut.style.left = '39px';
  btnZoomOut.style.width = '24px';
  btnZoomOut.style.zIndex = '100';
  document.body.appendChild(btnZoomOut);

  return {
    rendererSelect,
    themeSelect,
    zoomIn: btnZoomIn,
    zoomOut: btnZoomOut,
  };
};

const handleSwitchRenderer = (rendererName, graph) => {
  let newGraph;
  switch (rendererName) {
    case 'webgl-3d':
      graph.destroy(async () => {
        newGraph = await create3DGraph();
      });
      return;
    case 'canvas':
      graph.destroy(() => {
        newGraph = create2DGraph();
      });
      return;
    case 'webgl':
      graph.destroy(() => {
        const currentZoom = graph.getZoom();
        const position = graph.canvas.getCamera().getPosition();
        const zoomOpt = {
          zoom: currentZoom,
          center: { x: position[0], y: position[1] },
        };
        newGraph = create2DGraph(
          undefined,
          undefined,
          undefined,
          zoomOpt,
          'webgl',
        );
      });
      // graph.changeRenderer('webgl');
      return;
    case 'svg':
    // comming soon
    // graph.destroy(() => {
    //   const currentZoom = graph.getZoom();
    //   const position = graph.canvas.getCamera().getPosition();
    //   const zoomOpt = {
    //     zoom: currentZoom,
    //     center: { x: position[0], y: position[1] },
    //   };
    //   newGraph = create2DGraph(undefined, undefined, undefined, zoomOpt, 'svg');
    // });
    default:
      return;
  }
  return newGraph;
};

const handleSwitchTheme = (themeType) => {
  let nodeAnimates = () => getDefaultNodeAnimates(1000);
  let edgeAnimates = () => getDefaultEdgeAnimates(1000);

  const currentZoom = graph.getZoom();
  const position = graph.canvas.getCamera().getPosition();

  let theme;
  let zoomOpt = {
    zoom: currentZoom,
    center: { x: position[0], y: position[1] },
  };
  switch (themeType) {
    case '亮色主题':
      theme = {
        type: 'spec',
        base: 'light',
      };
      nodeAnimates = undefined;
      edgeAnimates = undefined;
      break;
    case '暗色主题':
      theme = {
        type: 'spec',
        base: 'dark',
      };
      nodeAnimates = undefined;
      edgeAnimates = undefined;
      break;
    case '蓝色主题':
      theme = {
        type: 'spec',
        specification: {
          canvas: {
            backgroundColor: '#f3faff',
          },
          node: {
            dataTypeField: 'cluster',
            palette: [
              '#bae0ff',
              '#91caff',
              '#69b1ff',
              '#4096ff',
              '#1677ff',
              '#0958d9',
              '#003eb3',
              '#002c8c',
              '#001d66',
            ],
          },
        },
      };
      break;
    case '橙色主题':
      theme = {
        type: 'spec',
        specification: {
          canvas: {
            backgroundColor: '#fcf9f1',
          },
          node: {
            dataTypeField: 'cluster',
            palette: [
              '#ffe7ba',
              '#ffd591',
              '#ffc069',
              '#ffa940',
              '#fa8c16',
              '#d46b08',
              '#ad4e00',
              '#873800',
              '#612500',
            ],
          },
        },
      };
      break;
  }
  graph.destroy(() => {
    graph.canvas.context.config.canvas.style.backgroundColor = '#fcf9f1';
    setTimeout(() => {
      graph = create2DGraph(nodeAnimates, edgeAnimates, theme, zoomOpt);
    }, 300);
  });
};

const zoomLevels = [0.15, 0.16, 0.2, 0.3, 0.5, 0.8, 1.5, 2];
const handleZoom = (graph, isIn = true) => {
  let toZoom = 0.15;
  const currentZoom = graph.getZoom();
  if (isIn) {
    for (let i = 0; i < zoomLevels.length - 1; i++) {
      if (currentZoom <= zoomLevels[i]) {
        toZoom = zoomLevels[i + 1];
        break;
      }
    }
  } else {
    for (let i = zoomLevels.length - 1; i >= 1; i--) {
      if (currentZoom >= zoomLevels[i]) {
        toZoom = zoomLevels[i - 1];
        break;
      }
    }
  }
  graph.zoomTo(toZoom, { x: 2194, y: -1347 }, { duration: 500 });
};

const getDataFor2D = (inputData) => {
  const clusteredData = labelPropagation(inputData, false);
  clusteredData.clusters.forEach((cluster, i) => {
    cluster.nodes.forEach((node) => {
      node.data.cluster = `c${i}`;
    });
  });
  // for 性能测试
  // data.nodes.forEach((node) => {
  //   delete node.data.x;
  //   delete node.data.y;
  //   delete node.data.z;
  // });
  const degrees = {};
  inputData.edges.forEach((edge) => {
    const { source, target } = edge;
    degrees[source] = degrees[source] || 0;
    degrees[target] = degrees[target] || 0;
    degrees[source]++;
    degrees[target]++;
  });

  return { degrees, data };
};

const getDataFor3D = () => {
  const clusteredData3D = labelPropagation(data3d, false);
  clusteredData3D.clusters.forEach((cluster, i) => {
    cluster.nodes.forEach((node) => {
      node.data.cluster = `c${i}`;
    });
  });
  data3d.nodes.forEach((node) => {
    delete node.data.x;
    delete node.data.y;
    delete node.data.z;
  });

  return data;
};

export default () => {
  const result2d = getDataFor2D(data);
  degrees = result2d.degrees;
  dataFor2D = result2d.data;
  dataFor3D = getDataFor3D(data3d);
  let graph = create2DGraph();
  const { rendererSelect, themeSelect, zoomIn, zoomOut } = addButtons(graph);

  rendererSelect.addEventListener('change', (e) => {
    const type = e.target.value;
    graph = handleSwitchRenderer(type.toLowerCase(), graph);
    // graph.changeRenderer(type.toLowerCase());
  });
  themeSelect.addEventListener('change', (e) => {
    const type = e.target.value;
    handleSwitchTheme(type);
  });
  zoomIn.addEventListener('click', () => handleZoom(graph, true));
  zoomOut.addEventListener('click', () => handleZoom(graph, false));

  // stats
  // const stats = new Stats();
  // stats.showPanel(0);
  // const $stats = stats.dom;
  // $stats.style.position = 'absolute';
  // $stats.style.left = '0px';
  // $stats.style.top = '0px';
  // document.body.appendChild($stats);
  // graph.canvas.addEventListener('afterrender', () => {
  //   if (stats) {
  //     stats.update();
  //   }
  // });

  return graph;
};
