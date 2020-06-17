/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../../types';
import { BaseLayout } from '../layout';
import { isNumber } from '@antv/util';
import { World } from '@antv/g-webgpu';
import { proccessToFunc, buildTextureDataWithTwoEdgeAttr, buildTextureDataWithOneEdgeAttr, arrayToTextureData } from '../../util/layout'
import { getDegree } from '../../util/math'


const gCode = `
import { globalInvocationID, debug } from 'g-webgpu';

const MAX_EDGE_PER_VERTEX;
const VERTEX_COUNT;

@numthreads(1, 1, 1)
class GraphinForce {
  @in @out
  u_Data: vec4[];

  @in
  u_damping: float;
  
  @in
  u_maxSpeed: float;

  @in
  u_minMovement: float;

  @in
  u_coulombDisScale: float;

  @in
  u_factor: float;

  @in
  u_CenterX: float;

  @in
  u_CenterY: float;

  @in
  u_gravity: float;

  @in
  u_NodeAttributeArray: vec4[];

  @in
  u_EdgeAttributeArray: vec4[];
  
  @in
  u_GatherDiscreteCenterX: float;

  @in
  u_GatherDiscreteCenterY: float

  @in
  u_GatherDiscreteGravity: float

  @in
  u_gatherDiscrete: float

  @in
  u_interval: float

  calcRepulsive(i: int, currentNode: vec4): vec2 {
    let ax = 0, ay = 0;
    for (let j = 0; j < VERTEX_COUNT; j++) {
      if (i != j) {
        const nextNode = this.u_Data[j];
        const vx = currentNode[0] - nextNode[0];
        const vy = currentNode[1] - nextNode[1];
        const dist = sqrt(vx * vx + vy * vy) + 0.01;
        const n_dist = dist * this.u_coulombDisScale;
        const direx = vx / dist;
        const direy = vy / dist;
        const attributesi = this.u_NodeAttributeArray[i];
        const attributesj = this.u_NodeAttributeArray[j];
        const massi = attributesi[0];
        const nodeStrengthi = attributesi[2];
        const nodeStrengthj = attributesj[2];
        const nodeStrength = (nodeStrengthi + nodeStrengthj) / 2;
        // const param = nodeStrength * this.u_factor / (n_dist * n_dist * massi);
        const param = 1000 * this.u_factor / (n_dist * n_dist);
        ax += direx * param;
        ay += direy * param;
      }
    }
    return [ax, ay];
  }

  calcGravity(i: int, currentNode: vec4): vec2 {
    const vx = currentNode[0] - this.u_CenterX;
    const vy = currentNode[1] - this.u_CenterY;
    let ax = vx * this.u_gravity;
    let ay = vy * this.u_gravity;
    const attributes = this.u_NodeAttributeArray[i];
    // 聚集离散点
    if (this.u_gatherDiscrete == 1 && attributes[1] == 0) {
      const vdx = currentNode[0] - this.u_GatherDiscreteCenterX;
      const vdy = currentNode[1] - this.u_GatherDiscreteCenterY
      ax += this.u_GatherDiscreteGravity * vdx;
      ay += this.u_GatherDiscreteGravity * vdy;
    }
    return [ax, ay];
  }

  calcAttractive(i: int, currentNode: vec4, attributes: vec4): vec2 {
    const mass = attributes[0];
    let ax = 0, ay = 0;
    const arr_offset = int(floor(currentNode[2] + 0.5));
    const length = int(floor(currentNode[3] + 0.5));
    const node_buffer: vec4;
    for (let p = 0; p < MAX_EDGE_PER_VERTEX; p++) {
      if (p >= length) break;
      const arr_idx = arr_offset + 4 * p; // i 节点的第 p 条边开始的小格子位置
      const buf_offset = arr_idx - arr_idx / 4 * 4;
      if (p == 0 || buf_offset == 0) {
        node_buffer = this.u_Data[int(arr_idx / 4)]; // 大格子，大格子位置=小个子位置 / 4，
      }

      let float_j: float = node_buffer[0];

      const nextNode = this.u_Data[int(float_j)];
      const vx = nextNode[0] - currentNode[0];
      const vy = nextNode[1] - currentNode[1];
      const dist = sqrt(vx * vx + vy * vy) + 0.01;
      const direx = vx / dist;
      const direy = vy / dist;
      const edgeLength = node_buffer[1];
      const edgeStrength = node_buffer[2];
      const diff: float = edgeLength - dist;//edgeLength
      const param = diff * this.u_stiffness / mass; //
      const param = diff * edgeStrength / mass; // 
      ax -= direx * param;
      ay -= direy * param;
    }
    return [ax, ay];
  }

  @main
  compute() {
    const i = globalInvocationID.x;
    const currentNode = this.u_Data[i];

    let ax = 0, ay = 0;

    if (i >= VERTEX_COUNT) {
      this.u_Data[i] = currentNode;
      return;
    }


    const nodeAttributes = this.u_NodeAttributeArray[i];

    // repulsive
    const repulsive = this.calcRepulsive(i, currentNode);
    ax += repulsive[0];
    ay += repulsive[1];

    // attractive
    const attractive = this.calcAttractive(i, currentNode, nodeAttributes);
    ax += attractive[0];
    ay += attractive[1];

    // gravity
    // const gravity = this.calcGravity(i, currentNode);
    // ax -= gravity[0];
    // ay -= gravity[1];

    // speed
    //const interval = 0.02; // max(0.02, 0.22 - 0.002 * this.u_iter);
    const param = this.u_interval * this.u_damping;
    let vx = ax * param;
    let vy = ay * param;
    const vlength = sqrt(vx * vx + vy * vy) + 0.0001;
    if (vlength > this.u_maxSpeed) {
      const param2 = this.u_maxSpeed / vlength;
      vx = param2 * vx;
      vy = param2 * vy;
    }

    // move
    const distx = vx * this.u_interval;
    const disty = vy * this.u_interval;
    // const distLength = sqrt(distx * distx + disty * disty);

    this.u_Data[i] = [
      currentNode[0] + distx,
      currentNode[1] + disty,
      currentNode[2],
      currentNode[3]
    ];
    
    // the avarage move distance
    // need to share memory
    
  }
}
`;

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

  public nodes: NodeConfig[] = [];
  public edges: EdgeConfig[] = [];

  public width: number = 300;
  public height: number = 300;

  public nodeMap: NodeMap = {};
  public nodeIdxMap: NodeIdxMap = {};

  public canvasEl: HTMLCanvasElement;
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

    const numParticles = nodes.length;


    const canvas = self.canvasEl;

    self.linkDistance = proccessToFunc(self.linkDistance) as ((d?: any) => number);
    self.edgeStrength = proccessToFunc(self.edgeStrength) as ((d?: any) => number);
    // const { maxEdgePerVetex, array: nodesEdgesArray } = buildTextureDataWithOneEdgeAttr(nodes, edges, self.linkDistance);
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


    const world = new World(canvas, {
      engineOptions: {
        supportCompute: true,
      },
    });

    const compute = world.createComputePipeline({
      shader: gCode,
      dispatch: [numParticles, 1, 1],
      maxIteration,
      onIterationCompleted: (iter) => {
        const stepInterval = Math.max(0.02, self.interval - iter * 0.002);
        world.setBinding(
          compute,
          'u_interval',
          stepInterval,
        );
      },
      onCompleted: (finalParticleData) => {
        console.log(finalParticleData)
        self.nodes.forEach((node, i) => {
          const x = finalParticleData[4 * i];
          const y = finalParticleData[4 * i + 1];
          node.x = x;
          node.y = y;
        });
        self.onLayoutEnd && self.onLayoutEnd();

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
