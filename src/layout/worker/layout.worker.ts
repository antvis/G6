/**
 * @fileoverview web worker for layout
 * @author changzhe.zb@antfin.com
 */
import Layout from '../index';
import { LAYOUT_MESSAGE } from './layoutConst';
import { World } from '@antv/g-webgpu';

const gpuVariableMapping = {
  k: 'u_K',
  k2: 'u_K2',
  gravity: 'u_Gravity',
  clusterGravity: 'u_ClusterGravity',
  speed: 'u_Speed',
  maxDisplace: 'u_MaxDisplace',
  clustering: 'u_Clustering',
  attributeArray: 'u_AttributeArray',
  centerX: 'u_CenterX',
  centerY: 'u_CenterY',
  maxEdgePerVetex: 'MAX_EDGE_PER_VERTEX',
  nodeNum: 'VERTEX_COUNT'
}

interface Event {
  type: string;
  data: any;
}

const ctx: Worker = self as any;

function isLayoutMessage(event: Event) {
  const { type } = event.data;
  return type === LAYOUT_MESSAGE.RUN || type === LAYOUT_MESSAGE.GPURUN;
}

function handleLayoutMessage(event: Event) {
  const { type } = event.data;

  switch (type) {
    case LAYOUT_MESSAGE.RUN: {
      const { nodes, edges, layoutCfg = {} } = event.data;
      const { type: layoutType } = layoutCfg;
      const LayoutClass = Layout[layoutType];
      if (!LayoutClass) {
        ctx.postMessage({ type: LAYOUT_MESSAGE.ERROR, message: `layout ${layoutType} not found` });
        break;
      }

      const layoutMethod = new LayoutClass(layoutCfg);
      layoutMethod.init({ nodes, edges });
      layoutMethod.execute();
      ctx.postMessage({ type: LAYOUT_MESSAGE.END, nodes });
      layoutMethod.destroy();
      break;
    }

    case LAYOUT_MESSAGE.GPURUN: {
      const { builtData, attributeArray, canvas, layoutCfg = {} } = event.data;

      const {
        maxIteration,
        nodeNum,
        gCode
      } = layoutCfg;


      const world = new World({
        engineOptions: {
          supportCompute: true,
        }
      });

      const compute = world.createComputePipeline({
        shader: gCode,
        dispatch: [nodeNum, 1, 1],
        maxIteration,
        onCompleted: (finalParticleData) => {
          // 传递数据给主线程
          ctx.postMessage({ type: LAYOUT_MESSAGE.END, finalParticleData });
          world.destroy();
        },
      });

      world.setBinding(compute, 'u_Data', builtData);
      world.setBinding(compute, 'u_AttributeArray', attributeArray);
      Object.keys(layoutCfg).forEach(key => {
        world.setBinding(compute, gpuVariableMapping[key], layoutCfg[key]);
      });
      break;
    }
    default:
      break;
  }
}

// listen to message posted to web worker
ctx.onmessage = (event: Event) => {
  if (isLayoutMessage(event)) {
    handleLayoutMessage(event);
  }
};

// https://stackoverflow.com/questions/50210416/webpack-worker-loader-fails-to-compile-typescript-worker
export default null as any;
