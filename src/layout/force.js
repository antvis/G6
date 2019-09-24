/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

const d3Force = require('d3-force');
const Layout = require('./layout');
const Util = require('../util');

/**
 * 经典力导布局 force-directed
 */
Layout.registerLayout('force', {
  layoutType: 'force',
  getDefaultCfg() {
    return {
      center: [ 0, 0 ],           // 向心力作用点
      nodeStrength: null,         // 节点作用力
      preventOverlap: false,      // 是否防止节点相互覆盖
      nodeSize: 10,               // 节点大小 / 直径，用于防止重叠时的碰撞检测
      edgeStrength: null,         // 边的作用力, 默认为根据节点的入度出度自适应
      linkDistance: 50,           // 默认边长度
      forceSimulation: null,      // 自定义 force 方法
      maxIteration: null,         // 停止迭代的最大迭代数
      threshold: null,            // 停止迭代的阈值
      tick() {},
      onLayoutEnd() {},           // 布局完成回调
      onTick() {}                 // 每一迭代布局回调
    };
  },
  /**
   * 初始化
   * @param {object} data 数据
   */
  init(data) {
    const self = this;
    self.nodes = data.nodes;
    self.edges = data.edges;
    self.ticking = false;
  },
  /**
   * 执行布局
   */
  excute() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    // 如果正在布局，忽略布局请求
    if (self.ticking) {
      return;
    }
    let simulation = self.forceSimulation;
    if (!simulation) {
      try {
        // 定义节点的力
        const nodeForce = d3Force.forceManyBody();
        if (self.nodeStrength) {
          nodeForce.strength(self.nodeStrength);
        }
        simulation = d3Force.forceSimulation()
          .nodes(nodes)
          .force('center', d3Force.forceCenter(self.center[0], self.center[1]))
          .force('charge', nodeForce)
          // .alphaTarget(0.3)
          .on('tick', () => {
            self.tick();
          })
          .on('end', () => {
            self.ticking = false;
            self.onLayoutEnd && self.onLayoutEnd();
          });
        if (self.preventOverlap) {
          let nodeSize = self.nodeSize;
          if (!nodeSize) {
            nodeSize = d => {
              if (d.size) {
                if (Array.isArray(d.size)) {
                  return d.size[0] / 2;
                }
                return d.size / 2;
              }
              return 10;
            };
          } else if (!isNaN(nodeSize)) {
            nodeSize /= 2;
          } else if (nodeSize.length === 2) {
            const larger = nodeSize[0] > nodeSize[1] ? nodeSize[0] : nodeSize[1];
            nodeSize = larger / 2;
          }
          // forceCollide's parameter is a radius
          simulation.force('collisionForce', d3Force.forceCollide(nodeSize).strength(1));
        }
        // 如果有边，定义边的力
        if (edges) {
          // d3 的 forceLayout 会重新生成边的数据模型，为了避免污染源数据
          const d3Edges = edges.map(edge => {
            return {
              id: edge.id,
              source: edge.source,
              target: edge.target
            };
          });
          const edgeForce = d3Force.forceLink().id(function(d) { return d.id; }).links(d3Edges);
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
      simulation.alphaTarget(0.3).restart();
      this.ticking = true;
    }
  },
  /**
   * 更新布局配置，但不执行布局
   * @param {object} cfg 需要更新的配置项
   */
  updateCfg(cfg) {
    const self = this;
    if (self.ticking) {
      self.forceSimulation.stop();
      self.ticking = false;
    }
    self.forceSimulation = null;
    Util.mix(self, cfg);
  },
  destroy() {
    const self = this;
    if (self.ticking) {
      self.forceSimulation.stop();
      self.ticking = false;
    }
    self.nodes = null;
    self.edges = null;
    self.destroyed = true;
  }
});
