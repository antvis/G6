/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../../types';
import { BaseLayout } from '../layout';
import { isNumber } from '@antv/util';
import { World } from '@antv/g-webgpu';

// const lineIndexBufferData = [];
let maxEdgePerVetex;
const buildTextureData = (nodes, edges) => {
  const dataArray = [];
  const nodeDict = [];
  const mapIdPos = {};
  let i = 0;
  for (i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    mapIdPos[n.id] = i;
    dataArray.push(n.x);
    dataArray.push(n.y);
    dataArray.push(0);
    dataArray.push(0);
    nodeDict.push([]);
  }
  for (i = 0; i < edges.length; i++) {
    const e = edges[i];
    nodeDict[mapIdPos[e.source]].push(mapIdPos[e.target]);
    let length = 50;
    if (e.source === '0' || e.source === '10') length = 1;
    nodeDict[mapIdPos[e.source]].push(length); // 理想边长，后续可以改成每条边不同
    nodeDict[mapIdPos[e.target]].push(mapIdPos[e.source]);
    nodeDict[mapIdPos[e.target]].push(length); // 理想边长，后续可以改成每条边不同
    // lineIndexBufferData.push(mapIdPos[e.source], mapIdPos[e.target]); // 似乎没用
  }
  console.log(nodeDict);

  maxEdgePerVetex = 0;
  for (i = 0; i < nodes.length; i++) {
    const offset = dataArray.length;
    const dests = nodeDict[i]; // dest 中节点 id 与边长间隔存储，即一位节点 id，一位边长……
    const len = dests.length;
    dataArray[i * 4 + 2] = offset;
    dataArray[i * 4 + 3] = len / 2; // 第四位存储与该节点相关的所有节点个数
    // dataArray[i * 4 + 3] = len;
    maxEdgePerVetex = Math.max(maxEdgePerVetex, len / 2);
    // maxEdgePerVetex = Math.max(maxEdgePerVetex, len);
    for (let j = 0; j < len; ++j) {
      const dest = dests[j];
      dataArray.push(+dest);
    }
  }

  // 不是 4 的倍数，填充 0
  while (dataArray.length % 4 !== 0) {
    dataArray.push(0);
  }
  console.log(nodes.length, dataArray);
  return new Float32Array(dataArray);
}


const gCode = `
import { globalInvocationID } from 'g-webgpu';

const MAX_EDGE_PER_VERTEX;
const VERTEX_COUNT;

@numthreads(1, 1, 1)
class GraphinForce {
  @in @out
  u_Data: vec4[];

  @in
  u_stiffness: float;

  @in
  u_damping: float;
  
  @in
  u_maxSpeed: float;

  @in
  u_minMovement: float;

  @in
  u_coulombDisScale: float;

  @in
  u_repulsion: float;

  @in
  u_factor: float;

  @in
  u_CenterX: float;

  @in
  u_CenterY: float;

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
        const param = this.u_repulsion * this.u_factor / (n_dist * n_dist); // / mass
        ax += direx * param;
        ay += direy * param;
      }
    }
    return [ax, ay];
  }

  // calcGravity(currentNode: vec4): vec2 {
  //  const vx = currentNode[0] - this.u_CenterX;
  //  const vy = currentNode[1] - this.u_CenterY;
  //  const gf = 0.01 * this.u_K * this.u_Gravity;
  //  return [gf * vx, gf * vy];
  // }

  calcAttractive(currentNode: vec4): vec2 {
    let ax = 0, ay = 0;
    const arr_offset = int(floor(currentNode[2] + 0.5));
    const length = int(floor(currentNode[3] + 0.5));
    const node_buffer: vec4;
    for (let p = 0; p < MAX_EDGE_PER_VERTEX; p++) {
      if (p >= length) break;
      const arr_idx = arr_offset + 2 * p;
      // const arr_idx = arr_offset + p;
      // when arr_idx % 4 == 0 update currentNodedx_buffer
      // %
      // const buf_offset = arr_idx - arr_idx / 2 * 2;
      const buf_offset = arr_idx - arr_idx / 4 * 4;
      if (p == 0 || buf_offset == 0) {
        // node_buffer = this.u_Data[int(arr_idx / 2)];
        node_buffer = this.u_Data[int(arr_idx / 4)];
      }

      const float_j: float = buf_offset == 0 ? node_buffer[0] : node_buffer[2];

      // const float_j = buf_offset == 0 ? node_buffer[0] :
      //                 buf_offset == 1 ? node_buffer[1] :
      //                 buf_offset == 2 ? node_buffer[2] :
      //                                   node_buffer[3];
                                        

      const nextNode = this.u_Data[int(float_j)];
      const vx = nextNode[0] - currentNode[0];
      const vy = nextNode[1] - currentNode[1];
      const dist = sqrt(vx * vx + vy * vy) + 0.01;
      const direx = vx / dist;
      const direy = vy / dist;
      const length = buf_offset == 0 ? node_buffer[1] : node_buffer[3];
      const diff: float = length - dist;
      // const diff = 1 - dist;
      const param = diff * this.u_stiffness; //  / mass
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

    // repulsive
    const repulsive = this.calcRepulsive(i, currentNode);
    ax += repulsive[0];
    ay += repulsive[1];

    // attractive
    const attractive = this.calcAttractive(currentNode);
    ax += attractive[0];
    ay += attractive[1];

    // gravity
    // const gravity = this.calcGravity(currentNode);
    // dx -= gravity[0];
    // dy -= gravity[1];

    // speed
    const interval = 0.02; // max(0.02, 0.22 - 0.002 * this.u_iter);
    const param = interval * this.u_damping;
    let vx = ax * param;
    let vy = ay * param;
    const vlength = sqrt(vx * vx + vy * vy);
    if (vlength > this.u_maxSpeed) {
      const param2 = this.u_maxSpeed / vlength;
      vx = param2 * vx;
      vy = param2 * vy;
    }

    // move
    const distx = vx * interval;
    const disty = vy * interval;
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
  public stiffness: number = 200;
  /** 斥力系数 */
  public repulsion: number = 1000;
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

  public nodes: NodeConfig[] = [];
  public edges: EdgeConfig[] = [];

  public width: number = 300;
  public height: number = 300;

  public nodeMap: NodeMap = {};
  public nodeIdxMap: NodeIdxMap = {};

  public canvasEl: HTMLCanvasElement;
  public onLayoutEnd: () => void;

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

    const numParticles = nodes.length;
    const nodesEdgesArray = buildTextureData(nodes, edges);

    const canvas = self.canvasEl;

    // init degree for mass
    const degrees = [];
    edges.forEach(edge => {
      const sourceIdx = self.nodeIdxMap[edge.source];
      const targetIdx = self.nodeIdxMap[edge.target];
      degrees[sourceIdx] = degrees[sourceIdx] ? 1 : (degrees[sourceIdx] + 1);
      degrees[targetIdx] = degrees[targetIdx] ? 1 : (degrees[targetIdx] + 1);
    });

    // init nodes' properties array
    const nodeProperties = [];
    nodes.forEach((node, i) => {
      // nodeProperties.push(0) // vx
      // nodeProperties.push(0) // vy
      // nodeProperties.push(0) // ax
      // nodeProperties.push(0) // ay

      nodeProperties.push(degrees[i]) // m
      nodeProperties.push(0) // 补位
      nodeProperties.push(0) // 补位
      nodeProperties.push(0) // 补位
    });

    const world = new World(canvas, {
      engineOptions: {
        supportCompute: true,
      },
    });

    const compute = world.createComputePipeline({
      shader: gCode,
      dispatch: [numParticles, 1, 1],
      maxIteration,
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
      },
    });

    // 节点边输入输出
    world.setBinding(compute, 'u_Data', nodesEdgesArray);
    // 布局中心
    world.setBinding(compute, 'u_CenterX', self.center[0]);
    world.setBinding(compute, 'u_CenterY', self.center[1]);

    // 常量
    world.setBinding(compute, 'u_stiffness', self.stiffness);
    world.setBinding(compute, 'u_damping', self.damping);
    world.setBinding(compute, 'u_maxSpeed', self.maxSpeed);
    world.setBinding(compute, 'u_minMovement', self.minMovement);
    world.setBinding(compute, 'u_coulombDisScale', self.coulombDisScale);
    world.setBinding(compute, 'u_repulsion', self.repulsion);
    world.setBinding(compute, 'u_factor', self.factor);
    world.setBinding(compute, 'MAX_EDGE_PER_VERTEX', maxEdgePerVetex);
    world.setBinding(compute, 'VERTEX_COUNT', numParticles);
  }
}
