/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../../types';
import { BaseLayout } from '../layout';
import { isNumber } from '@antv/util';
import { World } from '@antv/g-webgpu';
import { proccessToFunc, buildTextureDataWithTwoEdgeAttr, arrayToTextureData } from '../../util/layout'
import { getDegree } from '../../util/math'
import { gCode, cCode } from './graphinForceShader';
import { LAYOUT_MESSAGE } from '../worker/layoutConst';


type NodeMap = {
  [key: string]: NodeConfig;
};

/**
 * graphin 中的 force 布局
 */
export default class GraphinForceGPULayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];
  /** 停止迭代的最大迭代数 */
  public maxIteration: number = 1000;
  /** 弹簧引力系数 */
  public edgeStrength: number | ((d?: any) => number) | undefined = 200;
  /** 斥力系数 */
  public nodeStrength: number | ((d?: any) => number) | undefined = 1000;
  /** 库伦系数 */
  public coulombDisScale: number = 0.005;
  /** 阻尼系数 */
  public damping: number = 0.9;
  /** 最大速度 */
  public maxSpeed: number = 1000;
  /** 一次迭代的平均移动距离小于该值时停止迭代 */
  public minMovement: number = 0.5;
  /** 迭代中衰减 */
  public interval: number = 0.02;
  /** 斥力的一个系数 */
  public factor: number = 1;
  /** 每个节点质量的回调函数，若不指定，则默认使用度数作为节点质量 */
  public getMass: ((d?: any) => number) | undefined;
  /** 理想边长 */
  public linkDistance: number | ((d?: any) => number) | undefined = 1;
  /** 重力大小 */
  public gravity: number = 10;
  /** 是否聚集离散点，即是否给所有离散点加一个重力 */
  public gatherDiscrete: boolean = false;
  /** 聚集离散点的位置，gatherDiscrete 为 true 时生效，默认为 [ w / 4, h / 4] */
  public gatherDiscreteCenter: IPointTuple | undefined;
  /** 聚集离散点的重力大小，gatherDiscrete 为 true 时生效 */
  public gatherDiscreteGravity: number = 200;
  /** 是否启用web worker。前提是在web worker里执行布局，否则无效	*/
  public workerEnabled: boolean = false;

  public nodes: NodeConfig[] = [];
  public edges: EdgeConfig[] = [];

  public width: number = 300;
  public height: number = 300;

  public nodeMap: NodeMap = {};
  public nodeIdxMap: NodeIdxMap = {};

  public onLayoutEnd: () => void;
  /** 存储节点度数 */
  private degrees: number[];

  public getDefaultCfg() {
    return {
      maxIteration: 2000,
      center: [0, 0],
      gravity: 10,
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
      if (!isNumber(node.x)) node.x = Math.random() * self.width;
      if (!isNumber(node.y)) node.y = Math.random() * self.height;
      nodeMap[node.id] = node;
      nodeIdxMap[node.id] = i;
    });
    self.nodeMap = nodeMap;
    self.nodeIdxMap = nodeIdxMap;

    self.nodeStrength = proccessToFunc(self.nodeStrength, 1);
    self.edgeStrength = proccessToFunc(self.edgeStrength, 1);

    if (!self.gatherDiscreteCenter) {
      self.gatherDiscreteCenter = [self.width / 4, self.height / 4];
    }
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
      if (!isNumber(node.x)) node.x = Math.random() * self.width;
      if (!isNumber(node.y)) node.y = Math.random() * self.height;
      nodeMap[node.id] = node;
      nodeIdxMap[node.id] = i;
    });
    self.nodeMap = nodeMap;
    self.nodeIdxMap = nodeIdxMap;

    self.nodeStrength = proccessToFunc(self.nodeStrength, 1);
    self.edgeStrength = proccessToFunc(self.edgeStrength, 1);

    if (!self.gatherDiscreteCenter) {
      self.gatherDiscreteCenter = [self.width / 4, self.height / 4];
    }
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

    const numParticles = nodes.length;


    self.linkDistance = proccessToFunc(self.linkDistance) as ((d?: any) => number);
    self.edgeStrength = proccessToFunc(self.edgeStrength) as ((d?: any) => number);
    const { maxEdgePerVetex, array: nodesEdgesArray } = buildTextureDataWithTwoEdgeAttr(nodes, edges, self.linkDistance, self.edgeStrength);

    // init degree for mass
    self.degrees = getDegree(nodes.length, self.nodeIdxMap, edges);
    const masses = [];
    const nodeStrengths = [];
    if (!self.getMass) {
      self.getMass = (d) => {
        return self.degrees[self.nodeIdxMap[d.id]] || 1;
      }
    }
    nodes.forEach((node, i) => {
      masses.push(self.getMass(node));
      nodeStrengths.push((self.nodeStrength as Function)(node));
      if (!self.degrees[i]) self.degrees[i] = 0;
    })

    const nodeAttributeArray = arrayToTextureData([masses, self.degrees, nodeStrengths]);

    let workerEnabled = self.workerEnabled;
    let world;

    if (workerEnabled) {
      world = new World({
        canvas,
        engineOptions: {
          supportCompute: true,
        },
      });
    } else {
      world = new World({
        engineOptions: {
          supportCompute: true,
        }
      });
    }

    // const compute = world.createComputePipeline({
    //   shader: gCode,
    //   onCompleted: (result) => {
    //     // 获取 Shader 的编译结果，用户可以输出到 console 中并保存
    //     console.log(world.getPrecompiledBundle(compute));
    //   },
    // });

    const onLayoutEnd = self.onLayoutEnd;

    const compute = world.createComputePipeline({
      shader: gCode,
      // precompiled: true,
      // shader: cCode,
      dispatch: [numParticles, 1, 1],
      maxIteration,//maxIteration,
      onIterationCompleted: async (iter) => {
        const stepInterval = Math.max(0.02, self.interval - iter * 0.002);
        world.setBinding(
          compute,
          'u_interval',
          stepInterval,
        );
      },
      onCompleted: (finalParticleData) => {
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

        // 计算完成后销毁相关 GPU 资源
        world.destroy();
      },
    });

    // 节点边输入输出
    world.setBinding(compute, 'u_Data', nodesEdgesArray);
    // 布局中心
    world.setBinding(compute, 'u_CenterX', self.center[0]);
    world.setBinding(compute, 'u_CenterY', self.center[1]);

    // 中心力
    world.setBinding(compute, 'u_gravity', self.gravity);
    // 聚集离散点
    world.setBinding(compute, 'u_gatherDiscrete', self.gatherDiscreteCenter ? 1 : 0);
    world.setBinding(compute, 'u_GatherDiscreteCenterX', self.gatherDiscreteCenter[0]);
    world.setBinding(compute, 'u_GatherDiscreteCenterY', self.gatherDiscreteCenter[1]);
    world.setBinding(compute, 'u_GatherDiscreteGravity', self.gatherDiscreteGravity);

    // 常量
    // world.setBinding(compute, 'u_stiffness', self.stiffness);
    world.setBinding(compute, 'u_damping', self.damping);
    world.setBinding(compute, 'u_maxSpeed', self.maxSpeed);
    world.setBinding(compute, 'u_minMovement', self.minMovement);
    world.setBinding(compute, 'u_coulombDisScale', self.coulombDisScale);
    // world.setBinding(compute, 'u_repulsion', self.repulsion);
    world.setBinding(compute, 'u_factor', self.factor);
    world.setBinding(compute, 'u_NodeAttributeArray', nodeAttributeArray);
    world.setBinding(compute, 'MAX_EDGE_PER_VERTEX', maxEdgePerVetex);
    world.setBinding(compute, 'VERTEX_COUNT', numParticles);

    // 每次迭代更新，首次设置为 interval，在 onIterationCompleted 中更新
    world.setBinding(compute, 'u_interval', self.interval);
  }
}
