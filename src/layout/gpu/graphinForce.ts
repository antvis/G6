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
import { graphinForceCode, aveMovementCode } from './graphinForceShader';
// import { graphinForceCode, graphinForceBundle } from './graphinForceShader';
import { LAYOUT_MESSAGE } from '../worker/layoutConst';
import { Compiler } from '@antv/g-webgpu-compiler';

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
  public minMovement: number = 0.8;

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

  /** 每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力 */
  public getCenter: ((d?: any, degree?: number) => number[]) | undefined;

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
    const { maxEdgePerVetex, array: nodesEdgesArray }
      = buildTextureDataWithTwoEdgeAttr(nodes, edges, self.linkDistance, self.edgeStrength);

    // init degree for mass
    self.degrees = getDegree(nodes.length, self.nodeIdxMap, edges);
    const masses = [];
    const nodeStrengths = [];
    const centerXs = [];
    const centerYs = [];
    const centerGravities = [];
    if (!self.getMass) {
      self.getMass = (d) => {
        return self.degrees[self.nodeIdxMap[d.id]] || 1;
      }
    }
    const gravity = self.gravity;
    const center = self.center;
    nodes.forEach((node, i) => {
      masses.push(self.getMass(node));
      nodeStrengths.push((self.nodeStrength as Function)(node));
      if (!self.degrees[i]) self.degrees[i] = 0;
      let nodeGravity = [center[0], center[1], gravity];
      if (self.getCenter) {
        const customCenter = self.getCenter(node, self.degrees[i]);
        if (customCenter && isNumber(customCenter[0])
          && isNumber(customCenter[1]) && isNumber(customCenter[2])) {
          nodeGravity = customCenter;
        }
      }
      centerXs.push(nodeGravity[0]);
      centerYs.push(nodeGravity[1]);
      centerGravities.push(nodeGravity[2]);
    })

    // 每个节点的额外属性占两个数组各一格，nodeAttributeArray1 中是：mass, degree, nodeSterngth, 0
    const nodeAttributeArray1 = arrayToTextureData([
      masses, self.degrees, nodeStrengths
    ]);
    // nodeAttributeArray2 中是：centerX, centerY, gravity, 0, 
    const nodeAttributeArray2 = arrayToTextureData([
      centerXs, centerYs, centerGravities
    ]);

    console.log('nodeAttributeArray1', nodeAttributeArray1)
    console.log('nodeAttributeArray2', nodeAttributeArray1)

    let workerEnabled = self.workerEnabled;
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

    // TODO: 最终的预编译代码放入到 graphinForceShader.ts 中直接引入，不再需要下面三行
    const compiler = new Compiler();
    const graphinForceBundle = compiler.compileBundle(graphinForceCode);
    console.log(graphinForceBundle.toString());

    const onLayoutEnd = self.onLayoutEnd;

    const initPreviousData = [];
    nodesEdgesArray.forEach(value => {
      initPreviousData.push(value);
    });
    for (let i = 0; i < 4; i++) {
      initPreviousData.push(0);
    }

    console.log('initPreviousData', nodesEdgesArray, initPreviousData);

    const kernelGraphinForce = world
      .createKernel(graphinForceBundle)
      .setDispatch([numParticles, 1, 1])
      .setBinding({
        u_Data: nodesEdgesArray, // 节点边输入输出
        u_damping: self.damping,
        u_maxSpeed: self.maxSpeed,
        u_minMovement: self.minMovement,
        u_coulombDisScale: self.coulombDisScale,
        u_factor: self.factor,
        u_NodeAttributeArray1: nodeAttributeArray1,
        u_NodeAttributeArray2: nodeAttributeArray2,
        MAX_EDGE_PER_VERTEX: maxEdgePerVetex,
        VERTEX_COUNT: numParticles,
        u_AveMovement: initPreviousData,
        u_interval: self.interval // 每次迭代更新，首次设置为 interval，在 onIterationCompleted 中更新
      });

    const aveMovementBundle = compiler.compileBundle(aveMovementCode);
    // console.log(aveMovementBundle.toString());

    const kernelAveMovement = world
      .createKernel(aveMovementBundle)
      .setDispatch([1, 1, 1])
      .setBinding({
        u_Data: nodesEdgesArray,
        VERTEX_COUNT: numParticles,
        u_AveMovement: [0, 0, 0, 0],
      });

    // 执行迭代
    // let midRes = nodesEdgesArray;
    const execute = async () => {
      for (let i = 0; i < maxIteration; i++) {

        // TODO: 似乎都来自 kernelGraphinForce 是一个引用
        // 当前坐标作为下一次迭代的 PreviousData
        // if (i > 0) {
        //   kernelAveMovement.setBinding({
        //     u_PreviousData: kernelGraphinForce
        //   });
        // }

        await kernelGraphinForce.execute();

        // midRes = await kernelGraphinForce.getOutput();

        // 每次迭代完成后
        // 计算平均位移，用于提前终止迭代
        kernelAveMovement.setBinding({
          u_Data: kernelGraphinForce
        });

        await kernelAveMovement.execute();

        const movement = await kernelAveMovement.getOutput();
        console.log('iterating', i, movement);

        // 更新衰减函数
        const stepInterval = Math.max(0.02, self.interval - i * 0.002);
        kernelGraphinForce.setBinding({
          u_interval: stepInterval,
          u_AveMovement: kernelAveMovement
        });
      }
      const finalParticleData = await kernelGraphinForce.getOutput();

      // 所有迭代完成后
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
        console.log('result ', nodes)
      }

      onLayoutEnd && onLayoutEnd();
    }

    execute();
  }
}
