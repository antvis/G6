/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../../types';
import { BaseLayout } from '../layout';
import { isNumber } from '@antv/util';
import { World } from '@antv/g-webgpu';
import { buildTextureData, attributesToTextureData } from '../../util/layout'
import { cCode, gCode } from './fruchtermanShader';
import LayoutWorker from '../worker/layout.worker';
import { LAYOUT_MESSAGE } from '../worker/layoutConst';


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

type Node = NodeConfig & {
  cluster: string | number;
};

type Edge = EdgeConfig;

type NodeMap = {
  [key: string]: Node;
};

const SPEED_DIVISOR = 800;

/**
 * fruchterman 布局
 */
export default class FruchtermanGPULayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];
  /** 停止迭代的最大迭代数 */
  public maxIteration: number = 1000;
  /** 重力大小，影响图的紧凑程度 */
  public gravity: number = 10;
  /** 速度 */
  public speed: number = 0.1;
  /** 是否产生聚类力 */
  public clustering: boolean = false;
  /** 根据哪个字段聚类 */
  public clusterField: string = 'cluster';
  /** 聚类力大小 */
  public clusterGravity: number = 10;
  /** 是否启用web worker。前提是在web worker里执行布局，否则无效	*/
  public workerEnabled: boolean = false;

  public nodes: Node[] = [];
  public edges: Edge[] = [];

  public width: number = 300;
  public height: number = 300;

  public nodeMap: NodeMap = {};
  public nodeIdxMap: NodeIdxMap = {};

  public canvasEl: HTMLCanvasElement;
  public onLayoutEnd: () => void;

  private worker = null;

  public getDefaultCfg() {
    return {
      maxIteration: 1000,
      center: [0, 0],
      gravity: 10,
      speed: 0.1,
      clustering: false,
      clusterGravity: 10,
    };
  }
  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
    const center = self.center;

    if (!nodes || nodes.length === 0) {
      return;
    }
    if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const nodeMap: NodeMap = {};
    const nodeIdxMap: NodeIdxMap = {};
    nodes.forEach((node, i) => {
      if (!isNumber(node.x)) node.x = Math.random() * this.width;
      if (!isNumber(node.y)) node.y = Math.random() * this.height;
      nodeMap[node.id] = node;
      nodeIdxMap[node.id] = i;
    });
    self.nodeMap = nodeMap;
    self.nodeIdxMap = nodeIdxMap;
    // layout
    self.run();
  }

  public run() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const maxIteration = self.maxIteration;
    if (!self.width && typeof window !== 'undefined') {
      self.width = window.innerWidth;
    }
    if (!self.height && typeof window !== 'undefined') {
      self.height = window.innerHeight;
    }
    const center = self.center;
    const area = self.height * self.width;
    const maxDisplace = Math.sqrt(area) / 10;
    const k2 = area / (nodes.length + 1);
    const k = Math.sqrt(k2);
    const speed = self.speed;
    const clustering = self.clustering;
    let curMaxDisplace = maxDisplace;

    const { array: attributeArray, count: clusterCount } = attributesToTextureData([self.clusterField], nodes);

    const numParticles = nodes.length;
    const { maxEdgePerVetex, array: nodesEdgesArray } = buildTextureData(nodes, edges);


    // web worker test
    let workerEnabled = self.workerEnabled;
    const offScreenCanvas = document.createElement('canvas');

    console.log('goint to layout', workerEnabled);

    if (
      workerEnabled &&
      !navigator['gpu'] && // WebGPU 还不支持 OffscreenCanvas
      'OffscreenCanvas' in window &&
      'transferControlToOffscreen' in offScreenCanvas
    ) {
      if (self.worker) {
        self.worker.terminate();
        self.worker = null;
      }
      const worker = new LayoutWorker();
      const offscreen = offScreenCanvas.transferControlToOffscreen();
      worker.postMessage({
        canvas: offscreen,
        type: LAYOUT_MESSAGE.GPURUN,
        layoutCfg: {
          maxIteration,
          maxEdgePerVetex,
          nodeNum: numParticles,
          k,
          k2,
          centerX: center[0],
          centerY: center[1],
          gravity: self.gravity,
          clusterGravity: self.clusterGravity,
          speed: speed,
          maxDisplace,
          clustering: clustering ? 1 : 0,
          gCode
        },
        builtData: nodesEdgesArray,
        attributeArray
      }, [offscreen]);
      worker.onmessage = evt => {
        const { finalParticleData } = evt.data;
        self.nodes.forEach((node, i) => {
          const x = finalParticleData[4 * i];
          const y = finalParticleData[4 * i + 1];
          node.x = x;
          node.y = y;
        });
        self.onLayoutEnd && self.onLayoutEnd();
      };
      // worker.addEventListener('message', (e: MessageEvent) => {
      //   const { finalParticleData } = e.data;
      //   self.nodes.forEach((node, i) => {
      //     const x = finalParticleData[4 * i];
      //     const y = finalParticleData[4 * i + 1];
      //     node.x = x;
      //     node.y = y;
      //   });
      //   self.onLayoutEnd && self.onLayoutEnd();
      // });
      self.worker = worker;
    } else {
      const time = window.performance.now();
      const world = new World({
        engineOptions: {
          supportCompute: true,
        }
      });

      // const compute = world.createComputePipeline({
      //   shader: gCode,
      //   onCompleted: (result) => {
      //     // 获取 Shader 的编译结果，用户可以输出到 console 中并保存
      //     console.log(world.getPrecompiledBundle(compute));
      //   },
      // });

      console.log('without worker', numParticles, maxIteration, world)
      const compute = world.createComputePipeline({
        shader: gCode,
        // precompiled: true,
        // shader: cCode,
        dispatch: [numParticles, 1, 1],
        maxIteration,
        onIterationCompleted: async () => {
          if (clustering) {
            world.setBinding(compute2, 'u_Data', {
              entity: compute,
            });
          }

          curMaxDisplace *= 0.99;
          world.setBinding(
            compute,
            'u_MaxDisplace',
            curMaxDisplace,
          );
          return;
        },
        onCompleted: (finalParticleData) => {
          self.nodes.forEach((node, i) => {
            const x = finalParticleData[4 * i];
            const y = finalParticleData[4 * i + 1];
            node.x = x;
            node.y = y;
          });
          self.onLayoutEnd && self.onLayoutEnd();

          // 计算完成后销毁相关 GPU 资源
          world.destroy();
          console.log('in gpu', window.performance.now() - time);
        }
      });

      world.setBinding(compute, 'u_Data', nodesEdgesArray);
      world.setBinding(compute, 'u_K', k);
      world.setBinding(compute, 'u_K2', k2);
      world.setBinding(compute, 'u_Gravity', self.gravity);
      world.setBinding(compute, 'u_ClusterGravity', self.clusterGravity);
      world.setBinding(compute, 'u_Speed', speed);
      world.setBinding(compute, 'u_MaxDisplace', maxDisplace);
      world.setBinding(compute, 'u_Clustering', clustering ? 1 : 0);
      world.setBinding(compute, 'u_AttributeArray', attributeArray);
      world.setBinding(compute, 'u_CenterX', center[0]);
      world.setBinding(compute, 'u_CenterY', center[1]);
      world.setBinding(compute, 'MAX_EDGE_PER_VERTEX', maxEdgePerVetex);
      world.setBinding(compute, 'VERTEX_COUNT', numParticles);


      console.log('compute2', compute, clustering);


      let compute2;
      // 第二个管线用于计算聚类
      if (clustering) {
        compute2 = world.createComputePipeline({
          shader: gCode2,
          dispatch: [1, 1, 1],
          maxIteration,
          onIterationCompleted: async () => {
            world.setBinding(compute, 'u_ClusterCenters', {
              entity: compute2,
            });
          },
          onCompleted: (finalParticleData) => {
            world.destroy();
          },
        });
        world.setBinding(compute2, 'u_Data', nodesEdgesArray);
        world.setBinding(compute2, 'u_NodeAttributes', attributeArray);
        world.setBinding(compute2, 'VERTEX_COUNT', numParticles);
        world.setBinding(compute2, 'CLUSTER_COUNT', clusterCount);
        console.log('finish');
      }
    }
  }
}
