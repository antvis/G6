/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

import { GraphData, IPointTuple } from '@g6/types';

import * as d3Force from 'd3-force';

import isArray from '@antv/util/lib/is-array';
import isFunction from '@antv/util/lib/is-function';
import isNumber from '@antv/util/lib/is-number';
import mix from '@antv/util/lib/mix';

import { BaseLayout } from './layout';

/**
 * 经典力导布局 force-directed
 */
export default class ForceLayout extends BaseLayout {
  /** 向心力作用点 */
  public center: IPointTuple;
  /** 节点作用力 */
  public nodeStrength: any;
  /** 边的作用力, 默认为根据节点的入度出度自适应 */
  public edgeStrength: any;
  /** 是否防止节点相互覆盖 */
  public preventOverlap: boolean;
  /** 节点大小 / 直径，用于防止重叠时的碰撞检测 */
  public nodeSize: number | number[] | (() => number);
  /** 节点间距，防止节点重叠时节点之间的最小距离（两节点边缘最短距离） */
  public nodeSpacing: number;
  /** 默认边长度 */
  public linkDistance: number;
  /** 自定义 force 方法 */
  public forceSimulation: any;
  /** 迭代阈值的衰减率 [0, 1]，0.028 对应最大迭代数为 300 */
  public alphaDecay: number;
  /** 停止迭代的阈值 */
  public alphaMin: number;
  /** 当前阈值 */
  public alpha: number;
  /** 防止重叠的力强度 */
  public collideStrength: number;

  public tick: () => void;

  public onLayoutEnd: () => void;
  /** 布局完成回调 */
  public onTick: () => void;

  /** 是否正在布局 */
  private ticking: boolean;

  public getDefaultCfg() {
    return {
      center: [0, 0],
      nodeStrength: null,
      edgeStrength: null,
      preventOverlap: false,
      nodeSize: undefined,
      nodeSpacing: undefined,
      linkDistance: 50,
      forceSimulation: null,
      alphaDecay: 0.028,
      alphaMin: 0.001,
      alpha: 0.3,
      collideStrength: 1,
      tick() {},
      onLayoutEnd() {}, // 布局完成回调
      onTick() {}, // 每一迭代布局回调
    };
  }

  /**
   * 初始化
   * @param {object} data 数据
   */
  public init(data: GraphData) {
    const self = this;
    self.nodes = data.nodes;
    self.edges = data.edges;
    self.ticking = false;
  }

  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    // 如果正在布局，忽略布局请求
    if (self.ticking) {
      return;
    }
    let simulation = self.forceSimulation;
    const alphaMin = self.alphaMin;
    const alphaDecay = self.alphaDecay;
    const alpha = self.alpha;
    if (!simulation) {
      try {
        // 定义节点的力
        const nodeForce = d3Force.forceManyBody();
        if (self.nodeStrength) {
          nodeForce.strength(self.nodeStrength);
        }
        simulation = d3Force
          .forceSimulation()
          .nodes(nodes)
          .force('center', d3Force.forceCenter(self.center[0], self.center[1]))
          .force('charge', nodeForce)
          .alpha(alpha)
          .alphaDecay(alphaDecay)
          .alphaMin(alphaMin)
          .on('tick', () => {
            self.tick();
          })
          .on('end', () => {
            self.ticking = false;
            self.onLayoutEnd();
          });
        if (self.preventOverlap) {
          self.overlapProcess(simulation);
        }
        // 如果有边，定义边的力
        if (edges) {
          // d3 的 forceLayout 会重新生成边的数据模型，为了避免污染源数据
          const d3Edges = edges.map((edge) => {
            return {
              id: edge.id,
              source: edge.source,
              target: edge.target,
            };
          });
          const edgeForce = d3Force
            .forceLink()
            .id((d) => d.id)
            .links(d3Edges);
          if (self.edgeStrength) {
            edgeForce.strength(self.edgeStrength);
          }
          if (self.linkDistance) {
            edgeForce.distance(self.linkDistance);
          }
          simulation.force('link', edgeForce);
        }
        self.forceSimulation = simulation;
        self.ticking = true;
      } catch (e) {
        self.ticking = false;
        console.warn(e);
      }
    } else {
      if (self.preventOverlap) {
        self.overlapProcess(simulation);
      }
      simulation.alpha(alpha).restart();
      this.ticking = true;
    }
  }

  /**
   * 防止重叠
   * @param {object} simulation 力模拟模型
   */
  public overlapProcess(simulation) {
    const self = this;
    const nodeSize = self.nodeSize;
    const nodeSpacing = self.nodeSpacing;
    let nodeSizeFunc: (d: any) => number;
    let nodeSpacingFunc: (d: any) => number;
    const collideStrength = self.collideStrength;

    if (isNumber(nodeSpacing)) {
      nodeSpacingFunc = () => {
        return nodeSpacing;
      };
    } else if (typeof nodeSpacing === 'function') {
      nodeSpacingFunc = nodeSpacing;
    } else {
      nodeSpacingFunc = () => {
        return 0;
      };
    }

    if (!nodeSize) {
      nodeSizeFunc = (d) => {
        if (d.size) {
          if (isArray(d.size)) {
            const res = d.size[0] > d.size[1] ? d.size[0] : d.size[1];
            return res / 2 + nodeSpacingFunc(d);
          }
          return d.size / 2 + nodeSpacingFunc(d);
        }
        return 10 + nodeSpacingFunc(d);
      };
    } else if (isFunction(nodeSize)) {
      nodeSizeFunc = nodeSize;
    } else if (isArray(nodeSize)) {
      const larger = nodeSize[0] > nodeSize[1] ? nodeSize[0] : nodeSize[1];
      const radius = larger / 2;
      nodeSizeFunc = (d) => {
        return radius + nodeSpacingFunc(d);
      };
    } else if (!isNaN(nodeSize)) {
      const radius = nodeSize / 2;
      nodeSizeFunc = (d) => {
        return radius + nodeSpacingFunc(d);
      };
    }

    // forceCollide's parameter is a radius
    simulation.force('collisionForce', d3Force.forceCollide(nodeSizeFunc).strength(collideStrength));
  }

  /**
   * 更新布局配置，但不执行布局
   * @param {object} cfg 需要更新的配置项
   */
  public updateCfg(cfg) {
    const self = this;
    if (self.ticking) {
      self.forceSimulation.stop();
      self.ticking = false;
    }
    self.forceSimulation = null;
    mix(self, cfg);
  }

  public destroy() {
    const self = this;
    if (self.ticking) {
      self.forceSimulation.stop();
      self.ticking = false;
    }
    self.nodes = null;
    self.edges = null;
    self.destroyed = true;
  }
}
