/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../../types';
import { BaseLayout } from '../layout';
import { isNumber } from '@antv/util';
import { World } from '@antv/g-webgpu';
// compile at runtime in dev mode
// import { Compiler } from '@antv/g-webgpu-compiler';
// import { fruchtermanCode, clusterCode } from './fruchtermanShader';
import { buildTextureData, attributesToTextureData } from '../../util/layout'
// use compiled bundle in prod mode
import { fruchtermanBundle, clusterBundle } from './fruchtermanShader';
import { LAYOUT_MESSAGE } from '../worker/layoutConst';

type Node = NodeConfig & {
  cluster: string | number;
};

type Edge = EdgeConfig;

type NodeMap = {
  [key: string]: Node;
};

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
  public speed: number = 1;

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

  public executeWithWorker(canvas?: HTMLCanvasElement, ctx?: any) {
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
    self.run(canvas, ctx);
  }

  public run(canvas?: HTMLCanvasElement, ctx?: any) {
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
    let maxDisplace = Math.sqrt(area) / 10;
    const k2 = area / (nodes.length + 1);
    const k = Math.sqrt(k2);
    const speed = self.speed;
    const clustering = self.clustering;

    const { array: attributeArray, count: clusterCount } = attributesToTextureData([self.clusterField], nodes);

    const numParticles = nodes.length;
    const { maxEdgePerVetex, array: nodesEdgesArray } = buildTextureData(nodes, edges);

    const workerEnabled = self.workerEnabled;

    let world;

    if (workerEnabled) {
      world = World.create({
        canvas,
        engineOptions: {
          supportCompute: true,
        },
      });
    } else {
      world = World.create({
        engineOptions: {
          supportCompute: true,
        }
      });
    }

    // compile at runtime in dev mode
    // const compiler = new Compiler();
    // const fruchtermanBundle = compiler.compileBundle(fruchtermanCode);
    // const clusterBundle = compiler.compileBundle(clusterCode);

    // use compiled bundle in prod mode
    // console.log(fruchtermanBundle.toString());
    // console.log(clusterBundle.toString());

    const onLayoutEnd = self.onLayoutEnd;

    const clusterCenters = [];
    for (let i = 0; i < clusterCount; i++) {
      clusterCenters.push(0, 0, 0, 0);
    }

    const kernelFruchterman = world
      .createKernel(fruchtermanBundle)
      .setDispatch([numParticles, 1, 1])
      .setBinding({
        u_Data: nodesEdgesArray,
        u_K: k,
        u_K2: k2,
        u_Gravity: self.gravity,
        u_ClusterGravity: self.clusterGravity,
        u_Speed: speed,
        u_MaxDisplace: maxDisplace,
        u_Clustering: clustering ? 1 : 0,
        u_Center: center,
        u_AttributeArray: attributeArray,
        u_ClusterCenters: clusterCenters,
        MAX_EDGE_PER_VERTEX: maxEdgePerVetex,
        VERTEX_COUNT: numParticles,
      });

    let kernelCluster;
    if (clustering) {
      kernelCluster = world
        .createKernel(clusterBundle)
        .setDispatch([clusterCount, 1, 1])
        .setBinding({
          u_Data: nodesEdgesArray,
          u_NodeAttributes: attributeArray,
          u_ClusterCenters: clusterCenters,
          VERTEX_COUNT: numParticles,
          CLUSTER_COUNT: clusterCount,
        });
    }

    const execute = async () => {
      for (let i = 0; i < maxIteration; i++) {
        await kernelFruchterman.execute();

        if (clustering) {
          kernelCluster.setBinding({
            u_Data: kernelFruchterman,
          });
          await kernelCluster.execute();
          kernelFruchterman.setBinding({
            u_ClusterCenters: kernelCluster,
          });
        }

        kernelFruchterman.setBinding({
          u_MaxDisplace: maxDisplace *= 0.99,
        });
      }

      const finalParticleData = await kernelFruchterman.getOutput();

      if (canvas) {
        // 传递数据给主线程
        ctx.postMessage({
          type: LAYOUT_MESSAGE.GPUEND,
          vertexEdgeData: finalParticleData,
          // edgeIndexBufferData,
        });
      } else {
        nodes.forEach((node, i) => {
          const x = finalParticleData[4 * i];
          const y = finalParticleData[4 * i + 1];
          node.x = x;
          node.y = y;
        });
      }
      onLayoutEnd && onLayoutEnd();
    }

    execute();
  }
}