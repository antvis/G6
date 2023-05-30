const isBrowser = typeof window !== 'undefined';
const G6 = isBrowser ? window.g6v5 : null;
const Algorithm = isBrowser ? window.Algorithm : {};
const Layout = isBrowser ? window.Layout : {};
const { initThreads, supportsThreads, ForceLayout }  = Layout;

export const getDefaultNodeAnimates = (delay?: number) => ({
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

export const getDefaultEdgeAnimates = (delay?: number) => ({
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

export const defaultTheme = {
  // : ThemeOptionsOf<any>
  type: 'spec',
  base: 'light',
  specification: {
    node: {
      dataTypeField: 'cluster',
    },
  },
};

export const formatData = (data, is3D = false, noPosition = false) => {
  const nodeIdSet = new Set();
  const nodes: any = [];
  data.nodes.forEach(node => {
    if (!nodeIdSet.has(node.id)) {
      nodeIdSet.add(node.id);
      const formatNode = {
        id: node.id,
        data: {
          label: node.olabel || node.data?.label,
          x: is3D ? node.data?.x : node.x * 10,
          y: is3D ? node.data?.y : node.y * 10,
        }
      }
      if (is3D) (formatNode.data as any).z = (node.z || node.data?.z);
      if (noPosition) {
        delete formatNode.data.x;
        delete formatNode.data.y;
        delete (formatNode.data as any).z;
      }
      nodes.push(formatNode)
    }
  })
  const edges = data.edges.map(edge => ({
    id: edge.id || `edge-${Math.random()}`,
    source: edge.source,
    target: edge.target,
    data: {
      ...edge
    }
  }))
  return { nodes, edges };
}


export const getDegrees = (data) => {
  const degrees = {};
  data.edges.forEach((edge) => {
    const { source, target } = edge;
    degrees[source] = degrees[source] || 0;
    degrees[target] = degrees[target] || 0;
    degrees[source]++;
    degrees[target]++;
  });
  return degrees;
};

export const clusteringNodes = (data) => {
  if (!Algorithm?.labelPropagation) return;
  const clusteredData = Algorithm.labelPropagation(data, false);
  clusteredData.clusters.forEach((cluster, i) => {
    cluster.nodes.forEach((node) => {
      node.data.cluster = `c${i}`;
    });
  });
  return data;
}

export const create2DGraph = (
  configs,
  getNodeAnimates = getDefaultNodeAnimates,
  getEdgeAnimates = getDefaultEdgeAnimates,
) => {
  const { data, width, height, container, degrees, lodStrategyLevels, renderer, theme = defaultTheme } = configs;
  const graph = new G6.Graph({
    container: container as HTMLElement,
    width,
    height,
    type: 'graph',
    renderer,
    data,
    modes: {
      default: [
        { type: 'zoom-canvas', key: '123', triggerOnItems: true },
        'drag-node',
        'drag-canvas',
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
        },
      };
    },
    // 节点配置
    node: (innerModel) => {
      const degree = degrees[innerModel.id] || 0;
      let labelLod = 3;
      if (degree > 40) labelLod = -2;
      else if (degree > 20) labelLod = -1;
      else if (degree > 10) labelLod = 0;
      else if (degree > 5) labelLod = 1;
      else if (degree > 2) labelLod = 2;
      return {
        ...innerModel,
        data: {
          animates: getNodeAnimates(),
          ...innerModel.data,
          lodStrategy: {
            levels: lodStrategyLevels,
            animateCfg: {
              duration: 500,
            },
          },
          labelShape:
            degree !== 0
              ? {
                  text: innerModel.data.label,
                  maxWidth: '400%',
                  offsetY: 8,
                  lod: labelLod,
                }
              : undefined,

          labelBackgroundShape:
            degree !== 0
              ? {
                  lod: labelLod,
                }
              : undefined,
          iconShape:
            degree !== 0
              ? {
                  img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
                  fontSize: 12 + degree / 4,
                  opacity: 0.8,
                  lod: labelLod + 2,
                }
              : undefined,
          keyShape: {
            r: 12 + degree / 4,
          },
        },
      };
    },
  });

  graph.zoom(0.15, { x: 0, y: 0});
  return graph;
};

export const create3DGraph = async (configs) => {
  G6.stdLib.layouts['force-wasm'] = ForceLayout;
  const { data, width, height, container, degrees } = configs;
  const supported = await supportsThreads();
  const threads = await initThreads(supported);
  const newGraph = new G6.Graph({
    container: container as HTMLDivElement,
    width,
    height,
    type: 'graph',
    renderer: 'webgl-3d',
    data,
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

  let timer;
  setTimeout(() => {
    const camera = newGraph.canvas.getCamera();
    const oripos = camera.getPosition();
    let k = 0;
    let i = 0;
    const tick = () => {
      camera.setPosition([oripos[0], oripos[1], oripos[2] + k]);
      const rdx =
        i < 100 ? Math.min(i * 0.5, 20) : Math.min((200 - i) * 0.2, 20);
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


// const generateColorSelect = (id, container) => {
//   const colorSelect = document.createElement('input');
//   colorSelect.style.width = '25px';
//   colorSelect.style.height = '25px';
//   colorSelect.style.border = '0';
//   colorSelect.style.background = 'rgba(0, 0, 0, 0)';
//   colorSelect.type = 'color';
//   colorSelect.id = `color-${id}`;
//   colorSelect.value = id === 'bg' ? '#ffffff' : '#cccccc';
//   container.appendChild(colorSelect);
//   return colorSelect;
// };
