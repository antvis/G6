import { initThreads, supportsThreads } from '@antv/layout-wasm';
import Stats from 'stats.js';
import { Extensions, Graph, GraphData, extend } from '../../../src/index';

import { RendererName } from '../../../src/types/render';
import { container, width } from '../../datasets/const';
import data from './data.json';
import data3d from './data3d';

let graph: typeof Graph;
let dataFor2D: GraphData = { nodes: [], edges: [] };
let dataFor3D: GraphData = { nodes: [], edges: [] };
let colorSelects = [];
const { nodes, edges } = data;
export { edges, nodes };

const dataFormat = (dataAUR, options = {}, graphCore) => {
  const { dataAdded, dataUpdated, dataRemoved } = dataAUR;
  return {
    dataAdded: dataFormatHandler(dataAdded, options, graphCore),
    dataUpdated: dataFormatHandler(dataUpdated, options, graphCore),
    dataRemoved,
  };
};

const dataFormatHandler = (data, options = {}, graphCore) => {
  if (!data.nodes || !data.edges) return {};
  const map = new Map();
  const nodes = [];
  data.nodes?.forEach((node) => {
    if (map.has(node.id)) return;
    nodes.push(node);
    map.set(node.id, 0);
  });
  data.edges?.forEach((edge) => {
    const sourceDegree = map.get(edge.source) || 0;
    map.set(edge.source, sourceDegree + 1);
    const targetDegree = map.get(edge.target) || 0;
    map.set(edge.target, targetDegree + 1);
  });
  return {
    nodes: nodes.map((node) => {
      const { id, x, y, z, olabel, data } = node;
      return {
        id,
        data: {
          x,
          y,
          z,
          label: olabel,
          ...data,
          degree: map.get(id),
        },
      };
    }),
    edges:
      data.edges?.map((edge) => ({
        id: `edge-${Math.random()}`,
        source: edge.source,
        target: edge.target,
      })) || [],
  };
};

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
      fields: ['fill', 'r', 'lineWidth'],
      shapeId: 'keyShape',
      duration: 500,
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
  // hide: [
  //   {
  //     fields: ['size'],
  //     duration: 200,
  //   },
  //   {
  //     fields: ['opacity'],
  //     duration: 200,
  //     shapeId: 'keyShape',
  //   },
  //   {
  //     fields: ['opacity'],
  //     duration: 200,
  //     shapeId: 'labelShape',
  //   },
  // ],
  // show: [
  //   {
  //     fields: ['size'],
  //     duration: 200,
  //   },
  //   {
  //     fields: ['opacity'],
  //     duration: 200,
  //     shapeId: 'keyShape',
  //     order: 0,
  //   },
  // ],
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
  // : ThemeOptionsOf<any>
  type: 'spec',
  base: 'dark',
  specification: {
    node: {
      dataTypeField: 'cluster',
    },
  },
};
let currentTheme = defaultTheme;

const create2DGraph = (
  getNodeAnimates = getDefaultNodeAnimates,
  getEdgeAnimates = getDefaultEdgeAnimates,
  theme = defaultTheme,
  rendererType: RendererName = 'canvas',
) => {
  const ExtGraph = extend(Graph, {
    behaviors: {
      'brush-select': Extensions.BrushSelect,
      'hover-activate': Extensions.HoverActivate,
    },
    layouts: {
      'force-wasm': Extensions.ForceLayout,
    },
    transforms: {
      'data-format': dataFormat,
    },
  });
  console.log('theme', { ...defaultTheme, ...theme });
  const graph = new ExtGraph({
    container: container as HTMLElement,
    // width,
    // height: 1400,
    width: 1150,
    height: 400,
    renderer: 'webgl',
    // rendererType,
    data: dataFor2D,
    transforms: [
      'data-format',
      {
        type: 'map-node-size',
        field: 'degree',
        range: [3, 24],
      },
    ],
    modes: {
      default: [
        {
          type: 'zoom-canvas',
          enableOptimize: false,
          key: '123',
          triggerOnItems: true,
        },
        'drag-node',
        { type: 'drag-canvas', enableOptimize: false },
        'hover-activate',
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
          keyShape: {
            lineWidth: 0.3,
          },
        },
      };
    },
    // 节点配置
    node: (innerModel) => {
      const { degree } = innerModel.data;
      let iconLod = 3;
      if (degree > 40) iconLod = -2;
      else if (degree > 20) iconLod = -1;
      else if (degree > 10) iconLod = 0;
      else if (degree > 5) iconLod = 1;
      else if (degree > 2) iconLod = 2;
      return {
        ...innerModel,
        data: {
          animates: getNodeAnimates(),
          ...innerModel.data,
          lodLevels: [
            { zoomRange: [0, 0.16] }, // -2
            { zoomRange: [0.16, 0.2] }, // -1
            { zoomRange: [0.2, 0.3], primary: true }, // 0
            { zoomRange: [0.3, 0.5] }, // 1
            { zoomRange: [0.5, 0.8] }, // 2
            { zoomRange: [0.8, 1.5] }, // 3
            { zoomRange: [1.5, 1.8] }, // 4
            { zoomRange: [1.8, 2] }, // 5
            { zoomRange: [2, Infinity] }, // 6
          ],
          labelShape:
            degree !== 0
              ? {
                  text: innerModel.data.label,
                  maxWidth: '400%',
                  offsetY: 8,
                  lod: 'auto',
                }
              : undefined,

          labelBackgroundShape:
            degree !== 0
              ? {
                  lod: 'auto',
                }
              : undefined,
          iconShape:
            degree !== 0
              ? {
                  img: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7g4nSbYrg6cAAAAAAAAAAAAADmJ7AQ/original',
                  fontSize: innerModel.data.keyShape?.r || 12,
                  opacity: 0.8,
                  lod: iconLod,
                }
              : undefined,
        },
      };
    },
    nodeState: {
      active: {
        haloShape: {
          lineWidth: 3,
        },
      },
      selected: {
        keyShape: {
          lineWidth: 0.5,
        },
        haloShape: {
          lineWidth: 3,
        },
      },
    },
  });

  // graph.zoom(0.15);
  return graph;
};

const create3DGraph = async () => {
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  const ExtGraph = extend(Graph, {
    behaviors: {
      'brush-select': Extensions.BrushSelect,
      'hover-active': Extensions.HoverActivate,
    },
    layouts: {
      'force-wasm': Extensions.ForceLayout,
    },
  });

  console.log('create3DGraph', dataFor3D);

  const newGraph = new ExtGraph({
    container: container as HTMLDivElement,
    width,
    height: 1400,
    renderer: 'webgl-3d',
    data: dataFor3D,
    transforms: [
      'data-format',
      {
        type: 'map-node-size',
        field: 'degree',
        range: [40, 150],
      },
    ],
    // layout: {
    //   type: 'force-wasm',
    //   threads,
    //   dimensions: 2,
    //   maxIteration: 5000,
    //   minMovement: 0.1,
    //   distanceThresholdMode: 'mean',
    //   height,
    //   width,
    //   center: [width / 2, height / 2],
    //   factor: 1,
    //   gravity: 5,
    //   linkDistance: 200,
    //   edgeStrength: 200,
    //   nodeStrength: 1000,
    //   coulombDisScale: 0.005,
    //   damping: 0.9,
    //   maxSpeed: 2000,
    //   interval: 0.02,
    // },
    // layout: {
    //   type: 'force-wasm',
    //   threads,
    //   dimensions: 3,
    //   iterations: 300,
    //   minMovement: 10,
    //   height,
    //   width,
    //   linkDistance: 200,
    //   edgeStrength: 100,
    //   nodeStrength: 2000,
    //   center: [width / 2, height / 2, 0],
    // },
    modes: {
      default: [
        {
          type: 'orbit-canvas-3d',
          trigger: 'drag',
        },
        'zoom-canvas-3d',
      ],
    },
    theme: {
      type: 'spec',
      base: 'dark',
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
            lineWidth: 0.6,
            opacity: 0.6,
            stroke: '#fff',
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
          labelShape:
            degree > 20
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

  let timer;
  setTimeout(() => {
    const camera = newGraph.canvas.getCamera();
    const oripos = camera.getPosition();
    let k = 0;
    let i = 0;
    const tick = () => {
      camera.setPosition([oripos[0], oripos[1], oripos[2] + k]);
      const rdx = i < 100 ? Math.min(i * 0.5, 20) : Math.min((200 - i) * 0.2, 20);
      rotate(camera, rdx, rdx, newGraph);
      timer = requestAnimationFrame(tick);
      if (i > 200) cancelAnimationFrame(timer);
      const param = i < 50 ? 3 : 0.5;
      k += 50 * param;
      i++;
    };
    tick();
  }, 1000);
  newGraph.once('canvas:pointerdown', (e) => {
    if (timer) cancelAnimationFrame(timer);
  });
  newGraph.once('wheel', (e) => {
    if (timer) cancelAnimationFrame(timer);
  });
  // });

  return newGraph;
};

const generateColorSelect = (id, container) => {
  const colorSelect = document.createElement('input');
  colorSelect.style.width = '25px';
  colorSelect.style.height = '25px';
  colorSelect.style.border = '0';
  colorSelect.style.background = 'rgba(0, 0, 0, 0)';
  colorSelect.type = 'color';
  colorSelect.id = `color-${id}`;
  colorSelect.value = id === 'bg' ? '#ffffff' : '#cccccc';
  container.appendChild(colorSelect);
  return colorSelect;
};

const addButtons = () => {
  const btn = document.createElement('button');
  btn.innerHTML = '全屏';
  btn.style.position = 'absolute';
  btn.style.top = '56px';
  btn.style.left = '16px';
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
      const wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  });
  const btnZoomIn = document.createElement('button');
  btnZoomIn.innerHTML = '放大';
  btnZoomIn.style.position = 'absolute';
  btnZoomIn.style.top = '56px';
  btnZoomIn.style.left = '62px';
  btnZoomIn.style.width = '48px';
  btnZoomIn.style.zIndex = '100';
  document.body.appendChild(btnZoomIn);
  const btnZoomOut = document.createElement('button');
  btnZoomOut.innerHTML = '缩小';
  btnZoomOut.style.position = 'absolute';
  btnZoomOut.style.top = '56px';
  btnZoomOut.style.left = '112px';
  btnZoomOut.style.width = '48px';
  btnZoomOut.style.zIndex = '100';
  document.body.appendChild(btnZoomOut);

  const rendererSelect = document.createElement('select');
  rendererSelect.style.position = 'absolute';
  rendererSelect.style.top = '86px';
  rendererSelect.style.left = '16px';
  rendererSelect.style.width = '143px';
  rendererSelect.style.height = '25px';
  rendererSelect.style.zIndex = '100';
  const option1 = document.createElement('option');
  option1.innerHTML = 'Canvas';
  const option2 = document.createElement('option');
  option2.innerHTML = 'WebGL';
  const option3 = document.createElement('option');
  option3.innerHTML = 'WebGL-3D';
  const option4 = document.createElement('option');
  option4.innerHTML = 'SVG(coming soon)';
  option4.disabled = true;
  rendererSelect.appendChild(option1);
  rendererSelect.appendChild(option2);
  rendererSelect.appendChild(option3);
  rendererSelect.appendChild(option4);
  document.body.appendChild(rendererSelect);

  const themeSelect = document.createElement('select');
  themeSelect.style.position = 'absolute';
  themeSelect.style.top = '116px';
  themeSelect.style.left = '16px';
  themeSelect.style.width = '143px';
  themeSelect.style.height = '25px';
  themeSelect.style.zIndex = '100';
  const themeOption0 = document.createElement('option');
  themeOption0.innerHTML = '亮色主题';
  const themeOption1 = document.createElement('option');
  themeOption1.innerHTML = '暗色主题';
  const themeOption2 = document.createElement('option');
  themeOption2.innerHTML = '蓝色主题';
  const themeOption3 = document.createElement('option');
  themeOption3.innerHTML = '橙色主题';
  const themeOption4 = document.createElement('option');
  themeOption4.innerHTML = '自定义';
  themeSelect.appendChild(themeOption0);
  themeSelect.appendChild(themeOption1);
  themeSelect.appendChild(themeOption2);
  themeSelect.appendChild(themeOption3);
  themeSelect.appendChild(themeOption4);
  document.body.appendChild(themeSelect);

  // 自定义色板
  const customThemeSelect = document.createElement('div');
  const paletteContainer = document.createElement('div');
  paletteContainer.style.display = 'inline-flex';
  customThemeSelect.appendChild(paletteContainer);

  const addColorBtn = document.createElement('a');
  addColorBtn.innerHTML = '+';
  addColorBtn.style.margin = '4px';
  addColorBtn.style.cursor = 'pointer';
  addColorBtn.style.border = '1px dashed rgba(34, 126, 255, 0.5)';
  addColorBtn.style.padding = '2px 8px';
  addColorBtn.style.color = 'rgb(34, 126, 255)';
  paletteContainer.appendChild(addColorBtn);
  addColorBtn.addEventListener('click', (e) => {
    colorSelects.push(generateColorSelect(`${colorSelects.length}`, colorsContainer));
  });

  const colorsContainer = document.createElement('div');
  colorsContainer.style.display = 'inline-flex';
  colorsContainer.style.margin = '4px 0';
  paletteContainer.appendChild(colorsContainer);
  colorSelects = [generateColorSelect('0', colorsContainer)];

  const removeColorBtn = document.createElement('a');
  removeColorBtn.innerHTML = '-';
  removeColorBtn.style.margin = '4px';
  removeColorBtn.style.cursor = 'pointer';
  removeColorBtn.style.border = '1px dashed rgba(34, 126, 255, 0.5)';
  removeColorBtn.style.padding = '2px 10px';
  removeColorBtn.style.color = 'rgb(34, 126, 255)';
  paletteContainer.appendChild(removeColorBtn);
  removeColorBtn.addEventListener('click', (e) => {
    if (colorSelects.length <= 1) return;
    const removingSelect = colorSelects.splice(colorSelects.length - 1, 1)[0];
    removingSelect.remove();
  });
  const backgroundColorContainer = document.createElement('div');
  backgroundColorContainer.style.margin = '8px 0';
  const backgroundLabel = document.createElement('div');
  backgroundLabel.innerHTML = '背景色：';
  backgroundLabel.style.display = 'inline-flex';
  backgroundLabel.style.fontSize = '14px';
  backgroundColorContainer.appendChild(backgroundLabel);
  const bgColorSelect = generateColorSelect('bg', colorsContainer);
  backgroundColorContainer.appendChild(bgColorSelect);
  bgColorSelect.style.display = 'inline-flex';
  customThemeSelect.appendChild(backgroundColorContainer);

  const customConfirmBtn = document.createElement('button');
  customConfirmBtn.innerHTML = '应用';
  customConfirmBtn.style.cursor = 'pointer';
  customConfirmBtn.style.width = '109px';
  customConfirmBtn.style.border = '0';
  customConfirmBtn.style.backgroundColor = 'rgba(34, 126, 255, 0.5)';
  customThemeSelect.appendChild(customConfirmBtn);
  customConfirmBtn.addEventListener('click', (e) => {
    graph.updateTheme({
      type: 'spec',
      specification: {
        canvas: {
          backgroundColor: bgColorSelect.value || '#fff',
        },
        node: {
          dataTypeField: 'cluster',
          palette: colorSelects.map((dom) => dom.value),
        },
      },
    });
  });

  customThemeSelect.style.position = 'absolute';
  customThemeSelect.style.display = 'none';
  customThemeSelect.style.top = '146px';
  customThemeSelect.style.left = '16px';
  customThemeSelect.style.zIndex = '100';
  customThemeSelect.style.padding = '8px';
  customThemeSelect.style.backgroundColor = 'rgb(212, 230, 255)';
  document.body.appendChild(customThemeSelect);

  return {
    rendererSelect,
    themeSelect,
    customThemeSelect,
    zoomIn: btnZoomIn,
    zoomOut: btnZoomOut,
  };
};

const handleSwitchRenderer = (rendererName, oldgraph) => {
  switch (rendererName) {
    case 'webgl-3d':
      oldgraph.destroy(async () => {
        graph = await create3DGraph();
      });
      break;
    case 'canvas':
      oldgraph.destroy(() => {
        graph = create2DGraph(undefined, undefined, currentTheme);
      });
      break;
    case 'webgl':
      oldgraph.destroy(() => {
        const currentZoom = oldgraph.getZoom();
        const position = oldgraph.canvas.getCamera().getPosition();
        const zoomOpt = {
          zoom: currentZoom,
          center: { x: position[0], y: position[1] },
        };
        graph = create2DGraph(undefined, undefined, currentTheme, 'webgl');
      });
      // oldgraph.changeRenderer('webgl');
      break;
    case 'svg':
    default:
      break;
  }
  return graph;
};

const handleSwitchTheme = (themeType, customThemeSelect) => {
  customThemeSelect.style.display = 'none';
  switch (themeType) {
    case '亮色主题':
      currentTheme = defaultTheme;
      graph.updateTheme(defaultTheme);
      return;
    case '暗色主题':
      currentTheme = {
        ...defaultTheme,
        base: 'dark',
      };
      graph.updateTheme(currentTheme);
      return;
    case '蓝色主题':
      currentTheme = {
        type: 'spec',
        base: 'light',
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
      graph.updateTheme(currentTheme);
      return;
    case '橙色主题':
      currentTheme = {
        type: 'spec',
        base: 'light',
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
      graph.updateTheme(currentTheme);
      return;
    case '自定义':
      customThemeSelect.style.display = 'block';
      return;
  }
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
  // 过于消耗性能，labelPropagation 的结果已写入原始数据存储
  // const clusteredData = labelPropagation(inputData, false);
  // clusteredData.clusters.forEach((cluster, i) => {
  //   cluster.nodes.forEach((node) => {
  //     node.data.cluster = `c${i}`;
  //   });
  // });

  // for 性能测试
  // data.nodes.forEach((node) => {
  //   delete node.data.x;
  //   delete node.data.y;
  //   delete node.data.z;
  // });
  return inputData;
};

const getDataFor3D = (inputData) => {
  // 过于消耗性能，labelPropagation 的结果已写入原始数据存储
  // const clusteredData3D = labelPropagation(inputData, false);
  // clusteredData3D.clusters.forEach((cluster, i) => {
  //   cluster.nodes.forEach((node) => {
  //     node.data.cluster = `c${i}`;
  //   });
  // });

  // data3d.nodes.forEach((node) => {
  //   delete node.data.x;
  //   delete node.data.y;
  //   delete node.data.z;
  // });

  return inputData;
};

export default async () => {
  dataFor2D = getDataFor2D(data);
  dataFor3D = getDataFor3D(data3d);

  graph = create2DGraph();
  const { rendererSelect, themeSelect, customThemeSelect, zoomIn, zoomOut } = addButtons();

  rendererSelect.addEventListener('change', (e: any) => {
    const type = e.target.value;
    handleSwitchRenderer(type.toLowerCase(), graph);
    // graph.changeRenderer(type.toLowerCase());
  });
  themeSelect.addEventListener('change', (e: any) => {
    const type = e.target.value;
    handleSwitchTheme(type, customThemeSelect);
  });
  zoomIn.addEventListener('click', () => handleZoom(graph, true));
  zoomOut.addEventListener('click', () => handleZoom(graph, false));

  // stats
  const stats = new Stats();
  stats.showPanel(0);
  const $stats = stats.dom;
  $stats.style.position = 'absolute';
  $stats.style.left = '0px';
  $stats.style.top = '0px';
  document.body.appendChild($stats);
  graph.canvas.addEventListener('afterrender', () => {
    if (stats) {
      stats.update();
    }
  });

  return graph;
};
