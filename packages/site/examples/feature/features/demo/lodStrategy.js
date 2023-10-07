import { Graph, Extensions, extend } from '@antv/g6';
const ExtGraph = extend(Graph, {
  transforms: { 'transform-v4-data': Extensions.TransformV4Data },
  nodes: {
    'sphere-node': Extensions.SphereNode,
  },
  behaviors: {
    'orbit-canvas-3d': Extensions.OrbitCanvas3D,
    'zoom-canvas-3d': Extensions.ZoomCanvas3D,
  },
});
const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const degrees = {};
    data.edges.forEach((edge) => {
      const { source, target } = edge;
      degrees[source] = degrees[source] || 0;
      degrees[target] = degrees[target] || 0;
      degrees[source]++;
      degrees[target]++;
    });

    const graph = new ExtGraph({
      container: 'container',
      width,
      height,
      transforms: ['transform-v4-data'],
      layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: 100,
      },
      autoFit: 'view',
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'brush-select', 'click-select', 'hover-activate'],
      },
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
              lineWidth: 0.5,
            },
            haloShape: {},
            animates: {
              buildIn: [
                {
                  fields: ['opacity'],
                  shapeId: 'keyShape',
                  duration: 500,
                  delay: 1000,
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
            },
          },
        };
      },
      node: (innerModel) => {
        const degree = degrees[innerModel.id] || 0;
        let labelLod = 4;
        if (degree > 20) labelLod = -1;
        else if (degree > 15) labelLod = 0;
        else if (degree > 10) labelLod = 1;
        else if (degree > 6) labelLod = 2;
        else if (degree > 3) labelLod = 3;

        const badgeShapes = {};

        if (degree > 20) {
          badgeShapes[0] = {
            text: '核心人员',
            position: 'rightBottom',
            lod: labelLod - 2,
          };
        }
        if (degree > 15) {
          badgeShapes[1] = {
            text: 'A',
            position: 'right',
            lod: labelLod - 1,
          };
        }
        if (degree > 10) {
          badgeShapes[2] = {
            text: 'B',
            position: 'rightTop',
            lod: labelLod - 1,
          };
        }

        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            lodStrategy: {
              levels: [
                { zoomRange: [0, 0.8] }, // -2
                { zoomRange: [0.8, 0.9] }, // -1
                { zoomRange: [0.9, 1], primary: true }, // 0
                { zoomRange: [1, 1.1] }, // 1
                { zoomRange: [1.1, 0.2] }, // 2
                { zoomRange: [1.2, 1.3] }, // 3
                { zoomRange: [1.3, 1.4] }, // 4
                { zoomRange: [1.4, 1.5] }, // 5
                { zoomRange: [1.5, Infinity] }, // 6
              ],
              animateCfg: {
                duration: 500,
              },
            },

            animates: {
              buildIn: [
                {
                  fields: ['opacity'],
                  duration: 1000,
                  delay: 500 + Math.random() * 500,
                },
              ],
              buildOut: [
                {
                  fields: ['opacity'],
                  duration: 200,
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
              update: [
                {
                  fields: ['fill', 'r'],
                  shapeId: 'keyShape',
                },
                {
                  fields: ['lineWidth'],
                  shapeId: 'keyShape',
                  duration: 100,
                },
                {
                  fields: ['fontSize'],
                  shapeId: 'iconShape',
                },
                {
                  fields: ['opacity'], // 'r' error, 'lineWidth' has no effect
                  shapeId: 'haloShape',
                },
              ],
            },
            haloShape: {},
            // animate in shapes, unrelated to each other, excuted parallely
            keyShape: {
              r: innerModel.data.size ? innerModel.data.size / 2 : 15,
            },
            iconShape: {
              img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
              fill: '#fff',
              lod: labelLod - 1,
              fontSize: innerModel.data.size ? innerModel.data.size / 3 + 5 : 13,
            },
            labelShape: {
              text: innerModel.id,
              opacity: 0.8,
              maxWidth: '150%',
              lod: labelLod,
            },
            labelBackgroundShape: {
              lod: labelLod,
            },
            badgeShapes,
          },
        };
      },
      data,
    });
  });

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
btnContainer.style.zIndex = 10;
const tip = document.createElement('span');
tip.innerHTML = '👉 Zoom Canvas to See Level of Details:';
btnContainer.appendChild(tip);

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 160]);
  };
