/**
 * @fileOverview G6 Mapper Plugin base on d3 tech stack
 * d3-scale  https://github.com/d3/d3-scale
 * d3-legend https://github.com/susielu/d3-legend
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const d3 = require('d3');
const Util = G6.Util;
const DEFAULT_LEGEND_FILL = '#199CFB';
const DEFAULT_LEGEND_STROKE = '#199CFB';
const d3Legend = require('d3-svg-legend');

Util.mix(d3, d3Legend);

class Plugin {
  constructor(itemType, dim, channel, range, otherCfg) {
    Util.mix(this, {
      /**
       * 子项类型
       * @type  {String}
       */
      itemType: null,

      /**
       * 数据纬度
       * @type  {String}
       */
      dim: null,

      /**
       * 映射域
       * @type  {Array}
       */
      range: null,

      /**
       * 视觉通道
       * @type  {String}
       */
      channel: null,

      /**
       * 度量配置
       * @type  {object}
       */
      scaleCfg: {},

      /**
       * 图例配置
       * @type  {object}
       */
      legendCfg: {},

      /**
       * 是否数据对齐
       * @type  {boolean}
       */
      nice: true
    }, {
      itemType,
      dim,
      channel,
      range
    }, otherCfg);
  }
  init() {
    const graph = this.graph;
    graph.on('beforechange', ev => {
      if (ev.action === 'changeData') {
        const { data } = ev;
        this._createScale(graph.parseSource(data));
        this._mapping();
        this.legendCfg && this._createLegend();
      }
    });
  }
  _trainCategoryScale(itemType, data) {
    const dim = this.dim;
    const domainMap = {};
    const domain = [];
    data.forEach(model => {
      if (!domainMap[model[dim]]) {
        domainMap[model[dim]] = true;
        domain.push(model[dim]);
      }
    });
    return domain;
  }
  _trainNumberScale(itemType, data) {
    const dim = this.dim;
    const domain = [ Infinity, -Infinity ];
    data.forEach(model => {
      if (domain[0] > model[dim]) {
        domain[0] = model[dim];
      }
      if (domain[1] < model[dim]) {
        domain[1] = model[dim];
      }
    });
    return domain;
  }
  _getScaleType(data) {
    const dim = this.dim;
    const scaleCfg = this.scaleCfg;
    if (!scaleCfg.type) {
      if (Util.isNumber(data[0][dim])) {
        scaleCfg.type = 'linear';
      } else {
        scaleCfg.type = 'ordinal';
      }
    }
    return Util.upperFirst(scaleCfg.type);
  }
  _createScale(sourceData) {
    const itemType = this.itemType;
    const data = sourceData[itemType + 's'];
    const scaleType = this._getScaleType(data);
    const scaleCfg = this.scaleCfg;
    const nice = this.nice;
    const range = this.range;
    const scale = new d3['scale' + scaleType]();

    let domain;

    if (scaleType === 'Ordinal') {
      domain = this._trainCategoryScale(itemType, data);
    } else {
      domain = this._trainNumberScale(itemType, data);
    }
    const rangeLength = range.length;
    const domainLength = domain.length;
    if (rangeLength !== domainLength) {
      const domainStep = (domain[1] - domain[0]) / (rangeLength - 1);
      range.forEach((v, i) => {
        domain[i] = domain[0] + i * domainStep;
      });
    }
    if (domain[0] === domain[1]) {
      if (domain[0] > 0) {
        domain[0] = 0;
      } else if (domain[0] < 0) {
        domain[1] = 0;
      } else {
        domain[0] = -1;
      }
    }
    scale.range(range);
    scale.domain(domain);
    if (nice !== false && scale.nice) {
      scale.nice();
    }
    Util.isFunction(scaleCfg.callBack) && scaleCfg.callBack(scale, domain);
    this.scale = scale;
  }
  _getLegend() {
    const channel = this.channel;
    const scale = this.scale;
    const itemType = this.itemType;
    const shape = itemType === 'node' ? 'circle' : 'line';
    const legendCfg = this.legendCfg;
    const callback = legendCfg.callback;
    const legend = d3['legend' + Util.upperFirst(channel)]();
    if (channel === 'size') {
      if (itemType === 'node') {
        const sizeScale = scale.copy();
        sizeScale.range([ 4, 16 ]);
        legend.scale(sizeScale).shape(shape).shapePadding(8);
      } else {
        const sizeScale = scale.copy();
        sizeScale.range([ 2, 16 ]);
        legend.scale(sizeScale).shape(shape).shapePadding(8);
      }
    } else {
      if (itemType === 'node') {
        legend.scale(scale).shape(shape).shapePadding(8)
          .shapeRadius(5);
      } else {
        legend.scale(scale).shape(shape);
      }
    }
    Util.isFunction(callback) && callback(legend);
    return legend;
  }
  _getLegendContainer() {
    const legendCfg = this.legendCfg;
    const { containerId } = legendCfg;
    const graph = this.graph;
    if (legendCfg.containerId) {
      return document.getElementById(containerId);
    }
    return graph.getGraphContainer();
  }
  _createLegend() {
    const padding = 10;
    const channel = this.channel;
    const legendCfg = this.legendCfg;
    const graph = this.graph;
    const graphWidth = graph.getWidth();
    const graphHeight = graph.getHeight();
    const position = legendCfg.position ? legendCfg.position : 'br';
    const legendContainer = this._getLegendContainer();
    const marginTop = legendCfg.marginTop ? legendCfg.marginTop : 0;
    const marginLeft = legendCfg.marginLeft ? legendCfg.marginLeft : 0;
    const marginBottom = legendCfg.marginBottom ? legendCfg.marginBottom : 0;
    const marginRight = legendCfg.marginRight ? legendCfg.marginRight : 0;
    const legend = this._getLegend();
    const svg = d3.select(legendContainer)
      .append('svg')
      .style('position', 'absolute');
    const legendCells = svg.call(legend).select('.legendCells');
    const legendTitle = svg.call(legend).select('.legendTitle');
    const swatchs = legendCells.selectAll('.swatch');
    const node = legendCells.node();
    const bbox = node.getBBox();
    const tl = Util.getNineBoxPosition(position, {
      x: 0,
      y: 0,
      width: graphWidth,
      height: graphHeight
    }, bbox.width + 2 * padding, bbox.height + 2 * padding, [ marginTop + padding, marginRight + padding, marginBottom + padding, marginLeft + padding ]);
    if (legendTitle) {
      legendTitle.attr('font-size', '14px');
    }
    if (channel === 'size') {
      const legendFill = legendCfg.fill ? legendCfg.fill : DEFAULT_LEGEND_FILL;
      const legendStroke = legendCfg.fill ? legendCfg.fill : DEFAULT_LEGEND_STROKE;
      swatchs.attr('fill', legendFill);
      swatchs.attr('stroke', legendStroke);
    }
    svg.style('overflow', 'visible')
      .style('padding', padding + 'px')
      .style('top', tl.y + 'px')
      .style('left', tl.x + 'px')
      .style('width', bbox.width + 'px')
      .style('height', bbox.height + 'px');
    this.legendCanvas = svg;
  }
  _mapping() {
    const graph = this.graph;
    const dim = this.dim;
    const itemType = this.itemType;
    const scale = this.scale;
    const channel = this.channel;
    const mapper = {};
    mapper[channel] = model => {
      if (itemType === 'node' && channel === 'size') {
        return scale(model[dim]);
      }
      return scale(model[dim]);
    };
    graph[itemType](mapper);
  }
  destroy() {
    this.legendCanvas && this.legendCanvas.remove();
  }
}

G6.Plugins['tool.d3.mapper'] = Plugin;

module.exports = Plugin;
