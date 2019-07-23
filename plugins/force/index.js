const d3Force = require('d3-force');
const Base = require('../base');

class Force extends Base {
  getDefaultCfgs() {
    return {
      center: [ 0, 0 ],           // 向心力作用点
      nodeStrength: null,         // 节点作用力
      preventOverlap: false,      // 是否防止节点相互覆盖
      nodeRadius: null,           // 节点半径
      edgeStrength: null,         // 边的作用力, 默认为根据节点的入度出度自适应
      linkDistance: 50,           // 默认边长度
      forceSimulation: null,      // 自定义 force 方法
      onLayoutEnd() {},           // 布局完成回调
      onTick() {}                 // 每一迭代布局回调
    };
  }
  init(graph) {
    const onTick = this.get('onTick');
    const tick = () => {
      onTick && onTick();
      graph.refreshPositions();

    };
    this.set('tick', tick);
  }
  layout(data) {
    const self = this;
    // 如果正在布局，忽略布局请求
    if (self.isTicking()) {
      return;
    }
    const cfgs = self._cfgs;
    let simulation = cfgs.forceSimulation;
    if (!simulation) {
      try {
        // 定义节点的力
        const nodeForce = d3Force.forceManyBody();
        if (cfgs.nodeStrength) {
          nodeForce.strength(cfgs.nodeStrength);
        }
        simulation = d3Force.forceSimulation()
          .nodes(data.nodes)
          .force('center', d3Force.forceCenter(cfgs.center[0], cfgs.center[1]))
          .force('charge', nodeForce)
          .on('tick', cfgs.tick)
          .on('end', () => {
            self.set('ticking', false);
            cfgs.onLayoutEnd && cfgs.onLayoutEnd();
          });
        if (cfgs.preventOverlap) {
          let nodeRadius = cfgs.nodeRadius;
          if (!nodeRadius) {
            nodeRadius = d => {
              if (d.size) {
                if (Array.isArray(d.size)) {
                  return d.size[0] / 2;
                }
                return d.size / 2;
              }
              return 20;
            };
          }
          simulation.force('collide', d3Force.forceCollide().radius(nodeRadius));
        }
        // 如果有边，定义边的力
        if (data.edges) {
          // d3 的 forceLayout 会重新生成边的数据模型，为了避免污染源数据
          const edges = data.edges.map(edge => {
            return {
              id: edge.id,
              source: edge.source,
              target: edge.target
            };
          });
          const edgeForce = d3Force.forceLink().id(function(d) { return d.id; }).links(edges);
          if (cfgs.edgeStrength) {
            edgeForce.strength(cfgs.edgeStrength);
          }
          if (cfgs.distance) {
            edgeForce.distance(cfgs.distance);
          }
          simulation.force('link', edgeForce);
        }
        this.set('forceSimulation', simulation);
        this.set('ticking', true);
      } catch (e) {
        this.set('ticking', false);
        console.warn(e);
      }
    } else {
      simulation.alphaTarget(0.3).restart();
      this.set('ticking', true);
    }
  }
  updateLayout(cfg) {
    const self = this;
    const simulation = self.getSimulation();
    if (self.get('ticking')) {
      simulation.stop();
      self.set('ticking', false);
    }
    this.set('forceSimulation', null);
    Object.keys(cfg).forEach(key => {
      self.set(key, cfg[key]);
    });
    if (cfg.onTick) {
      self.set('tick', () => {
        cfg.onTick();
        self.graph.refreshPositions();
      });
    }
  }
  isTicking() {
    return this.get('ticking');
  }
  getSimulation() {
    return this.get('forceSimulation');
  }
  destroy() {
    if (this.get('ticking')) {
      this.getSimulation().stop();
    }
    super.destroy();
  }
}
module.exports = Force;
