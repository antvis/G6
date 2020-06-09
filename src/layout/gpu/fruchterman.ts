/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../types';
import { BaseLayout } from './layout';
import { isNumber } from '@antv/util';
import { Point } from '@antv/g-base';
import { World } from '@antv/g-webgpu';

const lineIndexBufferData = [];
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
    nodeDict[mapIdPos[e.target]].push(mapIdPos[e.source]);
    lineIndexBufferData.push(mapIdPos[e.source], mapIdPos[e.target]);
  }

  maxEdgePerVetex = 0;
  for (i = 0; i < nodes.length; i++) {
    const offset = dataArray.length;
    const dests = nodeDict[i];
    const len = dests.length;
    dataArray[i * 4 + 2] = offset;
    dataArray[i * 4 + 3] = dests.length;
    maxEdgePerVetex = Math.max(maxEdgePerVetex, dests.length);
    for (let j = 0; j < len; ++j) {
      const dest = dests[j];
      dataArray.push(+dest);
    }
  }

  while (dataArray.length % 4 !== 0) {
    dataArray.push(0);
  }
  return new Float32Array(dataArray);
}

const convertWebGLCoord2Canvas = (c: number, size: number) => {
  return ((c + 1) / 2) * size;
}

const gCode = `
import { globalInvocationID } from 'g-webgpu';

const SPEED_DIVISOR = 800;
const MAX_EDGE_PER_VERTEX;
const VERTEX_COUNT;

@numthreads(1, 1, 1)
class Fruchterman {
  @in @out
  u_Data: vec4[];

  @in
  u_K: float;

  @in
  u_K2: float;

  @in
  u_Gravity: float;

  @in
  u_Speed: float;

  @in
  u_MaxDisplace: float;

  calcRepulsive(i: int, currentNode: vec4): vec2 {
    let dx = 0, dy = 0;
    for (let j = 0; j < VERTEX_COUNT; j++) {
      if (i != j + 1) {
        const nextNode = this.u_Data[j];
        const xDist = currentNode[0] - nextNode[0];
        const yDist = currentNode[1] - nextNode[1];
        const dist = sqrt(xDist * xDist + yDist * yDist) + 0.01;
        if (dist > 0.0) {
          const repulsiveF = this.u_K2 / dist;
          dx += xDist / dist * repulsiveF;
          dy += yDist / dist * repulsiveF;
        }
      }
    }
    return [dx, dy];
  }

  calcGravity(currentNode: vec4): vec2 {
    const d = sqrt(currentNode[0] * currentNode[0] + currentNode[1] * currentNode[1]);
    const gf = 0.01 * this.u_K * this.u_Gravity * d;
    return [gf * currentNode[0] / d, gf * currentNode[1] / d];
  }

  calcAttractive(currentNode: vec4): vec2 {
    let dx = 0, dy = 0;
    const arr_offset = int(floor(currentNode[2] + 0.5));
    const length = int(floor(currentNode[3] + 0.5));
    const node_buffer: vec4;
    for (let p = 0; p < MAX_EDGE_PER_VERTEX; p++) {
      if (p >= length) break;
      const arr_idx = arr_offset + p;
      // when arr_idx % 4 == 0 update currentNodedx_buffer
      const buf_offset = arr_idx - arr_idx / 4 * 4;
      if (p == 0 || buf_offset == 0) {
        node_buffer = this.u_Data[int(arr_idx / 4)];
      }
      const float_j = buf_offset == 0 ? node_buffer[0] :
                      buf_offset == 1 ? node_buffer[1] :
                      buf_offset == 2 ? node_buffer[2] :
                                        node_buffer[3];
      const nextNode = this.u_Data[int(float_j)];
      const xDist = currentNode[0] - nextNode[0];
      const yDist = currentNode[1] - nextNode[1];
      const dist = sqrt(xDist * xDist + yDist * yDist) + 0.01;
      const attractiveF = dist * dist / this.u_K;
      if (dist > 0.0) {
        dx -= xDist / dist * attractiveF;
        dy -= yDist / dist * attractiveF;
      }
    }
    return [dx, dy];
  }

  @main
  compute() {
    const i = globalInvocationID.x;
    const currentNode = this.u_Data[i];

    let dx = 0, dy = 0;

    if (i >= VERTEX_COUNT) {
      this.u_Data[i] = currentNode;
      return;
    }

    // repulsive
    const repulsive = this.calcRepulsive(i, currentNode);
    dx += repulsive[0];
    dy += repulsive[1];

    // attractive
    const attractive = this.calcAttractive(currentNode);
    dx += attractive[0];
    dy += attractive[1];

    // gravity
    const gravity = this.calcGravity(currentNode);
    dx -= gravity[0];
    dy -= gravity[1];

    // speed
    dx *= this.u_Speed;
    dy *= this.u_Speed;

    // move
    const distLength = sqrt(dx * dx + dy * dy);
    if (distLength > 0.0) {
      const limitedDist = min(this.u_MaxDisplace * this.u_Speed, distLength);

      this.u_Data[i] = [
        currentNode[0] + dx / distLength * limitedDist,
        currentNode[1] + dy / distLength * limitedDist,
        currentNode[2],
        currentNode[3]
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
  public speed: number = 1;
  /** 是否产生聚类力 */
  public clustering: boolean = false;
  /** 聚类力大小 */
  public clusterGravity: number = 10;

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
      speed: 1,
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
    const maxDisplace = self.width / 10;
    const k = Math.sqrt((self.width * self.height) / (nodes.length + 1));
    const gravity = self.gravity;
    const speed = self.speed;
    const clustering = self.clustering;
    const clusterMap: {
      [key: string]: {
        name: string | number;
        cx: number;
        cy: number;
        count: number;
      };
    } = {};
    if (clustering) {
      nodes.forEach(n => {
        if (clusterMap[n.cluster] === undefined) {
          const cluster = {
            name: n.cluster,
            cx: 0,
            cy: 0,
            count: 0,
          };
          clusterMap[n.cluster] = cluster;
        }
        const c = clusterMap[n.cluster];
        if (isNumber(n.x)) {
          c.cx += n.x;
        }
        if (isNumber(n.y)) {
          c.cy += n.y;
        }
        c.count++;
      });
      for (const key in clusterMap) {
        clusterMap[key].cx /= clusterMap[key].count;
        clusterMap[key].cy /= clusterMap[key].count;
      }
    }



    const numParticles = nodes.length;
    const nodesEdgesArray = buildTextureData(nodes, edges);

    const canvas = self.canvasEl;

    const world = new World(canvas, {
      engineOptions: {
        supportCompute: true,
      },
    });

    const compute = world.createComputePipeline({
      shader: gCode,
      dispatch: [numParticles, 1, 1],
      maxIteration: self.maxIteration,
      onCompleted: (finalParticleData) => {
        self.nodes.forEach((node, i) => {
          const x = finalParticleData[4 * i];
          const y = finalParticleData[4 * i + 1];
          node.x = convertWebGLCoord2Canvas(x, self.width);
          node.y = convertWebGLCoord2Canvas(y, self.height);
        });
        self.onLayoutEnd && self.onLayoutEnd();
        // setTimeElapsed(window.performance.now() - timeStart);
        // // draw with G
        // renderCircles(finalParticleData, numParticles);

        // precompiled
        // console.log(world.getPrecompiledBundle(compute));

        // 计算完成后销毁相关 GPU 资源
        world.destroy();
      },
    });

    world.setBinding(compute, 'u_Data', nodesEdgesArray);
    world.setBinding(
      compute,
      'u_K',
      Math.sqrt((numParticles * numParticles) / (numParticles + 1) / 300),
    );
    world.setBinding(
      compute,
      'u_K2',
      (numParticles * numParticles) / (numParticles + 1) / 300 / 300,
    );
    world.setBinding(compute, 'u_Gravity', 50);
    world.setBinding(compute, 'u_Speed', 0.1);
    world.setBinding(
      compute,
      'u_MaxDisplace',
      Math.sqrt(numParticles * numParticles) / 10,
    );
    world.setBinding(compute, 'MAX_EDGE_PER_VERTEX', maxEdgePerVetex);
    world.setBinding(compute, 'VERTEX_COUNT', numParticles);
  }
}
