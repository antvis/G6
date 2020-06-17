/**
 * @fileOverview graphinForce layout
 * @author shiwu.wyy@antfin.com
 */

import { World } from '@antv/g-webgpu';


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
  u_NodeAttributeArray: vec4[];

  @in
  u_EdgeAttributeArray: vec4[];

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
        const param = nodeStrength * this.u_factor / (n_dist * n_dist * massi);
        ax += direx * param;
        ay += direy * param;
      }
    }
    return [ax, ay];
  }

  // calcGravity(i: int, currentNode: vec4): vec2 {
  //   const vx = currentNode[0] - this.u_CenterX;
  //   const vy = currentNode[1] - this.u_CenterY;
  //   let ax = vx * this.u_Gravity;
  //   let ay = vy * this.u_Gravity;
  //   const attributes = this.u_NodeAttributeArray[i];
  //   if (attributes[1] == 0) {
  //     const vdx = currentNode[0] - this.u_DiscreteCenterX;
  //     const vdy = currentNode[1] - this.u_DiscreteCenterY
  //     ax += this.u_DescreteGravity * vdx;
  //     ay += this.u_DescreteGravity * vdy;
  //   }
  //   return [ax, ay];
  // }

  calcAttractive(i: int, currentNode: vec4): vec2 {
    let ax = 0, ay = 0;
    const arr_offset = int(floor(currentNode[2] + 0.5));
    const length = int(floor(currentNode[3] + 0.5));
    const node_buffer: vec4;
    const attributes = this.u_NodeAttributeArray[i];
    const mass = attributes[0];
    for (let p = 0; p < MAX_EDGE_PER_VERTEX; p++) {
      if (p >= length) break;
      const arr_idx = arr_offset + 4 * p; // i 节点的第 p 条边开始的小格子位置
      const buf_offset = arr_idx - arr_idx / 4 * 4;
      if (p == 0 || buf_offset == 0) {
        node_buffer = this.u_Data[int(arr_idx / 4)]; // 大格子，大格子位置=小个子位置 / 4，
      }

      // const float_j: float = buf_offset == 0 ? node_buffer[0] : node_buffer[2];
      let float_j: float = node_buffer[0];

      //if (i == 0 && p == 5) {
       // debug(node_buffer);//node_buffer
      //}

      const nextNode = this.u_Data[int(float_j)];
      const vx = nextNode[0] - currentNode[0];
      const vy = nextNode[1] - currentNode[1];
      const dist = sqrt(vx * vx + vy * vy) + 0.01;
      const direx = vx / dist;
      const direy = vy / dist;
      // const edgeLength = buf_offset == 0 ? node_buffer[1] : node_buffer[3];
      const edgeLength = node_buffer[1];
      const edgeStrength = node_buffer[2];
      const diff: float = edgeLength - dist;//edgeLength
      // const param = diff * this.u_stiffness / mass; //
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
    // debug(currentNode)

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
    const attractive = this.calcAttractive(i, currentNode);
    ax += attractive[0];
    ay += attractive[1];

    // gravity
    // const gravity = this.calcGravity(currentNode);
    // ax -= gravity[0];
    // ay -= gravity[1];

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

/**
 * 执行布局
 */
function run() {

  const numParticles = 34;

  const canvas = canvasEl;

  const maxEdgePerVetex = 14;
  const nodesEdgesArray = [72.45939636230469, 62.500579833984375, 136, 14, 175.1600799560547, 86.05370330810547, 192, 1, 344.9768981933594, 346.0034484863281, 196, 2, 81.65665435791016, 449.54522705078125, 204, 2, 216.88282775878906, 154.63668823242188, 212, 3, 607.419189453125, 29.6898193359375, 224, 3, 608.1952514648438, 346.05047607421875, 236, 2, 452.20733642578125, 44.415096282958984, 244, 2, 385.80291748046875, 345.77606201171875, 252, 2, 221.95774841308594, 314.4992370605469, 260, 2, 476.39935302734375, 324.900146484375, 268, 8, 285.85626220703125, 478.71759033203125, 300, 4, 454.0091857910156, 244.40185546875, 316, 2, 85.85356903076172, 202.48916625976562, 324, 3, 178.43553161621094, 248.01947021484375, 336, 4, 83.56437683105469, 354.8762512207031, 352, 1, 282.627197265625, 455.57208251953125, 356, 5, 242.35475158691406, 98.66130065917969, 376, 3, 602.11669921875, 269.1688537597656, 388, 3, 483.792724609375, 450.63763427734375, 400, 5, 297.1876220703125, 457.5881652832031, 420, 4, 460.9705505371094, 40.42868423461914, 436, 4, 160.63328552246094, 120.21023559570312, 452, 14, 512.0086059570312, 418.65008544921875, 508, 8, 520.0165405273438, 27.93522071838379, 540, 3, 86.39307403564453, 151.71498107910156, 552, 1, 69.58355712890625, 51.796791076660156, 556, 1, 290.3934631347656, 33.38566207885742, 560, 1, 162.64553833007812, 210.26902770996094, 564, 2, 360.831787109375, 91.48175048828125, 572, 1, 47.24009704589844, 145.50344848632812, 576, 2, 327.2099914550781, 92.12781524658203, 584, 2, 241.12704467773438, 337.8699951171875, 592, 2, 205.7950897216797, 102.31474304199219, 600, 4, 1, 100, 200, 0, 2, 100, 200, 0, 3, 100, 200, 0, 4, 100, 200, 0, 5, 100, 200, 0, 7, 100, 200, 0, 8, 100, 200, 0, 9, 100, 200, 0, 10, 100, 200, 0, 11, 100, 200, 0, 13, 100, 200, 0, 14, 100, 200, 0, 15, 100, 200, 0, 16, 100, 200, 0, 0, 100, 200, 0, 0, 100, 200, 0, 3, 1, 200, 0, 0, 100, 200, 0, 2, 1, 200, 0, 0, 100, 200, 0, 5, 1, 200, 0, 6, 1, 200, 0, 0, 100, 200, 0, 4, 1, 200, 0, 6, 1, 200, 0, 4, 1, 200, 0, 5, 1, 200, 0, 0, 100, 200, 0, 13, 1, 200, 0, 0, 100, 200, 0, 14, 1, 200, 0, 0, 100, 200, 0, 10, 1, 200, 0, 0, 100, 200, 0, 9, 1, 200, 0, 22, 1, 200, 0, 14, 1, 200, 0, 12, 1, 200, 0, 24, 1, 200, 0, 21, 1, 200, 0, 20, 1, 200, 0, 0, 100, 200, 0, 24, 1, 200, 0, 22, 1, 200, 0, 14, 1, 200, 0, 10, 1, 200, 0, 13, 1, 200, 0, 0, 100, 200, 0, 7, 1, 200, 0, 12, 1, 200, 0, 0, 100, 200, 0, 8, 1, 200, 0, 10, 1, 200, 0, 11, 1, 200, 0, 0, 100, 200, 0, 0, 100, 200, 0, 17, 1, 200, 0, 18, 1, 200, 0, 21, 1, 200, 0, 22, 1, 200, 0, 16, 1, 200, 0, 18, 1, 200, 0, 20, 1, 200, 0, 16, 1, 200, 0, 17, 1, 200, 0, 19, 1, 200, 0, 18, 1, 200, 0, 20, 1, 200, 0, 33, 1, 200, 0, 22, 1, 200, 0, 23, 1, 200, 0, 10, 1, 200, 0, 17, 1, 200, 0, 19, 1, 200, 0, 21, 1, 200, 0, 10, 1, 200, 0, 16, 1, 200, 0, 20, 1, 200, 0, 22, 1, 200, 0, 10, 1, 200, 0, 11, 1, 200, 0, 16, 1, 200, 0, 19, 1, 200, 0, 21, 1, 200, 0, 24, 1, 200, 0, 25, 1, 200, 0, 26, 1, 200, 0, 23, 1, 200, 0, 28, 1, 200, 0, 30, 1, 200, 0, 31, 1, 200, 0, 32, 1, 200, 0, 33, 1, 200, 0, 19, 1, 200, 0, 22, 1, 200, 0, 28, 1, 200, 0, 27, 1, 200, 0, 29, 1, 200, 0, 30, 1, 200, 0, 31, 1, 200, 0, 33, 1, 200, 0, 10, 1, 200, 0, 11, 1, 200, 0, 22, 1, 200, 0, 22, 1, 200, 0, 22, 1, 200, 0, 23, 1, 200, 0, 22, 1, 200, 0, 23, 1, 200, 0, 23, 1, 200, 0, 22, 1, 200, 0, 23, 1, 200, 0, 22, 1, 200, 0, 23, 1, 200, 0, 22, 1, 200, 0, 33, 1, 200, 0, 19, 1, 200, 0, 22, 1, 200, 0, 23, 1, 200, 0, 32, 1, 200, 0
  ]


  const nodeAttributeArray = [14, 14, 1000, 0, 1, 1, 1000, 0, 2, 2, 1000, 0, 2, 2, 1000, 0, 3, 3, 1000, 0, 3,
    3, 1000, 0, 2, 2, 1000, 0, 2, 2, 1000, 0, 2, 2, 1000, 0, 2, 2, 1000, 0, 8, 8, 1000, 0, 4, 4, 1000,
    0, 2, 2, 1000, 0, 3, 3, 1000, 0, 4, 4, 1000, 0, 1, 1, 1000, 0, 5, 5, 1000, 0, 3, 3, 1000, 0, 3, 3, 1000,
    0, 5, 5, 1000, 0, 4, 4, 1000, 0, 4, 4, 1000, 0, 14, 14, 1000, 0, 8, 8, 1000, 0, 3, 3, 1000, 0, 1, 1, 1000, 0, 1, 1, 1000,
    0, 1, 1, 1000, 0, 2, 2, 1000, 0, 1, 1, 1000, 0, 2, 2, 1000, 0, 2, 2, 1000, 0, 2, 2, 1000, 0, 4, 4, 1000, 0]


  const world = new World(canvas, {
    engineOptions: {
      supportCompute: true,
    },
  });

  const compute = world.createComputePipeline({
    shader: gCode,
    dispatch: [numParticles, 1, 1],
    maxIteration: 1,
    onCompleted: (finalParticleData) => {
      console.log(finalParticleData)

      // 计算完成后销毁相关 GPU 资源
      world.destroy();
    },
  });

  // 节点边输入输出
  world.setBinding(compute, 'u_Data', nodesEdgesArray);
  // 布局中心
  world.setBinding(compute, 'u_CenterX', 250);
  world.setBinding(compute, 'u_CenterY', 250);

  // 常量
  world.setBinding(compute, 'u_damping', 0.9);
  world.setBinding(compute, 'u_maxSpeed', 1000);
  world.setBinding(compute, 'u_minMovement', 0.5);
  world.setBinding(compute, 'u_coulombDisScale', 0.005);
  world.setBinding(compute, 'u_factor', 1);
  world.setBinding(compute, 'u_NodeAttributeArray', nodeAttributeArray);
  world.setBinding(compute, 'MAX_EDGE_PER_VERTEX', maxEdgePerVetex);
  world.setBinding(compute, 'VERTEX_COUNT', numParticles);
}