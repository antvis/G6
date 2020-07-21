/**
 * @fileoverview web worker for layout
 * @author changzhe.zb@antfin.com
 */
import Layout from '../index';
import { LAYOUT_MESSAGE } from './layoutConst';
import { World } from '@antv/g-webgpu';


// test


const gCode2 = `
import { globalInvocationID, debug } from 'g-webgpu';

const VERTEX_COUNT;
const CLUSTER_COUNT;

@numthreads(1, 1, 1)
class CalcCenter {
  @in
  u_Data: vec4[];

  @in
  u_NodeAttributes: vec4[]; // [[clusterIdx, 0, 0, 0], ...]

  @out
  u_ClusterCenters: vec4[]; // [[cx, cy, nodeCount, clusterIdx], ...]

  @main
  compute() {
    // init the cluster centers
    for (let i = 0; i < CLUSTER_COUNT; i++) {
      this.u_ClusterCenters[i] = [ 0, 0, 0, 0 ]
    }

    for (let j = 0; j < VERTEX_COUNT; j++) {
      const attributes = this.u_NodeAttributes[j];
      const clusterIdx: float = attributes[0];
      const center = this.u_ClusterCenters[int(clusterIdx)];
      const sumx: float = center.x + this.u_Data[j].x;
      const sumy: float = center.y + this.u_Data[j].y;
      const count = center.z + 1;
      this.u_ClusterCenters[int(clusterIdx)] =
      [
        sumx, // cx
        sumy, // cy
        count, // nodeCount
        clusterIdx,
      ]
      // !!! sumx sumy count 有值，但 this.u_ClusterCenters[int(clusterIdx)] 未被赋值成功
      // debug(this.u_ClusterCenters[int(clusterIdx)].x);
    }

    for (let k = 0; k < CLUSTER_COUNT; k++) {
      const center = this.u_ClusterCenters[k];
      this.u_ClusterCenters[k] = [
        center.x / center.z,
        center.y / center.z,
        center.z,
        center.w
      ];
    }
  }
}
`;


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
      const { nodes, edges, layoutCfg = {}, canvas } = event.data;

      const { type: layoutType } = layoutCfg;

      const LayoutClass = Layout[layoutType];
      if (!LayoutClass) {
        ctx.postMessage({ type: LAYOUT_MESSAGE.ERROR, message: `layout ${layoutType} not found` });
        break;
      }
      if (layoutType.split('-')[1] !== 'gpu') {
        ctx.postMessage({ type: LAYOUT_MESSAGE.ERROR, message: `layout ${layoutType} does not support GPU` });
        break;
      }


      const layoutMethod = new LayoutClass(layoutCfg);
      layoutMethod.init({ nodes, edges });
      layoutMethod.executeWithWorker(canvas, ctx);
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
