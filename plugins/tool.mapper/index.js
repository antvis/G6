/**
 * @fileOverview G6 Mapper Plugin base on d3 tech stack
 * d3-scale  https://github.com/d3/d3-scale
 * d3-legend https://github.com/susielu/d3-legend
 * @author shiwu.wyy@antfin.com
 */
const G6 = require('@antv/g6');
const Legend = require('@antv/g2/src/component/legend');
const Util = G6.Util;
const Canvas = require('../../src/extend/g/canvas');
const Scale = require('@antv/scale');
// const d3 = require('d3');

class Plugin {
  constructor(options) {
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
      * @type  {Object}
      */
      scaleCfg: {},

      /**
      * 图例配置
      * @type  {Object}
      */
      legendCfg: {}
    }, options);
  }
  init() {
    const graph = this.get('graph');
    graph.on('beforerender', () => {
      if (this._checkInput()) {
        const legendCfg = this.get('legendCfg');
        this._createScale();
        this._mapping();
        legendCfg && this._createLegend();
        graph.on('changesize', () => {
          this.updateLegendPosition();
        });
      }
    });
    graph.on('afterclear', () => {
      const legendCanvas = this.get('legendCanvas');
      const filterCallback = this.get('filterCallback');
      const graph = this.get('graph');
      const itemType = this.get('itemType');
      graph['remove' + Util.ucfirst(itemType) + 'Filter'](filterCallback);
      legendCanvas.destroy();
    });
  }
  _trainCategoryScale(itemType) {
    const dim = this.get('dim');
    const graph = this.get('graph');
    const itemModels = graph.get(itemType + 's');
    const domainMap = {};
    const domain = [];
    Util.each(itemModels, model => {
      if (!domainMap[model[dim]]) {
        domainMap[model[dim]] = true;
        domain.push(model[dim]);
      }
    });
    return domain;
  }
  _trainNumberScale(itemType) {
    const dim = this.get('dim');
    const graph = this.get('graph');
    const itemModels = graph.getComputedStyle(itemType + 's');
    const domain = [ Infinity, -Infinity ];
    Util.each(itemModels, model => {
      if (domain[0] > model[dim]) {
        domain[0] = model[dim];
      }
      if (domain[1] < model[dim]) {
        domain[1] = model[dim];
      }
    });
    return domain;
  }
  _getScaleType() {
    const itemType = this.get('itemType');
    const dim = this.get('dim');
    const graph = this.get('graph');
    const data = graph.get(itemType + 's');
    const scaleCfg = this.get('scaleCfg');
    if (!scaleCfg.type) {
      if (Util.isNumber(data[0][dim])) {
        scaleCfg.type = 'linear';
      } else {
        scaleCfg.type = 'oridinal';
      }
    }
    return Util.ucfirsts(scaleCfg.type);
  }
  _createScale() {
    const itemType = this.get('itemType');
    const scaleCfg = this.get('scaleCfg');
    const scaleType = this._getScaleType();
    const scale = new Scale['scale' + scaleType]();
    const range = this.getComputedStyle('range');
    const nice = scaleCfg.nice;
    let domain = scaleCfg.domain;
    scale.range(range);
    if (!domain) {
      if (scaleType === 'Ordinal') {
        domain = this._trainCategoryScale(itemType, scale);
      } else {
        domain = this._trainNumberScale(itemType, scale);
      }
    }
    const rangeLength = range.length;
    const domainLength = domain.length;
    if (rangeLength !== domainLength) {
      const domainStep = (domain[1] - domain[0]) / (rangeLength - 1);
      Util.each(range, (v, i) => {
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
    scale.domain(domain);
    if (nice !== false && scale.nice) {
      scale.nice();
    }
    Util.isFunction(scaleCfg.callback) && scaleCfg.callback(scale, domain);
    this.set('scale', scale);

  }
  _createLegend() {
    const scaleType = this._getScaleType();
    const channel = this.get('channel');
    const graph = this.get('graph');
    const graphContainer = graph.get('graphContainer');
    const canvas = new Canvas({
      containerDOM: graphContainer,
      width: 200,
      height: 200
    });
    let legend;
    if (scaleType === 'Ordinal') {
      legend = this._createLegend(canvas);
    } else {
      if (channel === 'color') {
        legend = this._createContinuousColorLegend(canvas);
      } else {
        legend = this._createContinuousSizeLegend(canvas);
      }
    }
    const bbox = legend.getBBox();
    const padding = 6;
    const legendWidth = bbox.maxX - bbox.minX;
    const legendHeight = bbox.maxY - bbox.minY;
    legend.move(-bbox.minX + padding, -bbox.minY + padding);
    canvas.changeSize(legendWidth + 2 * padding, legendHeight + 2 * padding);
    this.set('legend', legend);
    this.set('legendCanvas', canvas);
    this.set('legendWidth', legendWidth);
    this.set('legendHeight', legendHeight);
    canvas.draw();
  }
  updateLegendPosition() {
    const legend = this.get('legend');
    if (!legend) {
      return;
    }
    const canvas = this.get('legendCanvas');
    const legendCfg = this.getComputedStyle('legendCfg');
    const marginTop = legendCfg.marginTop ? legendCfg.marginTop : 0;
    const marginLeft = legendCfg.marginLeft ? legendCfg.marginLeft : 0;
    const marginBottom = legendCfg.marginBottom ? legendCfg.marginBottom : 0;
    const marginRight = legendCfg.marginRight ? legendCfg.marginRight : 0;
    const position = legendCfg.position ? legendCfg.position : 'br';
    const graph = this.get('graph');
    const graphWidth = graph.get('width');
    const graphHeight = graph.get('height');
    const el = canvas.get('el');
    const legendWidth = this.get('legendWidth');
    const legendHeight = this.get('legendHeight');

    const tl = Util.getNineBoxPosition(position, {
      x: 0,
      y: 0,
      width: graphWidth,
      height: graphHeight
    }, legendWidth, legendHeight, [ marginTop, marginRight, marginBottom, marginLeft ]);

    el.style.position = 'absolute';
    el.style.top = tl.y + 'px';
    el.style.left = tl.x + 'px';
  }
  _createCatLegend(canvas) {
    const scale = this.get('scale');
    const range = scale.range();
    const domain = scale.domain();
    const itemType = this.get('itemType');
    const legendCfg = this.get('legendCfg');
    const items = [];
    const cfg = Util.mix({
      items,
      checkable: false
    }, legendCfg);
    Util.each(range, (value, i) => {
      items.push({
        name: domain[i],
        color: value,
        type: itemType === 'node' ? 'circle' : 'line',
        layout: 'vertical',
        marker: {
          symbol: 'circle',
          radius: 5,
          fill: value
        },
        checked: true
      });
    });
    const legend = canvas.addGroup(Legend.Category, cfg);
    return legend;
  }
  _createContinuousColorLegend(canvas) {
    const itemType = this.get('itemType');
    const scale = this.get('scale');
    const range = scale.range();
    const domain = scale.domain();
    const domainStep = (domain[domain.length - 1] - domain[0]) / (range.length - 1);
    const legendCfg = this.get('legendCfg');
    const items = [];
    const cfg = Util.mix({
      items,
      theme: 'gradient',
      attrType: 'color',
      titleText: itemType,
      title: {
        fill: '#333',
        textBaseline: 'bottom'
      },
      width: 15,
      height: 150
    }, legendCfg);
    Util.each(range, (value, i) => {
      const name = domain[0] + domainStep * i;
      items.push({
        name,
        value: i / (range.length - 1),
        color: value
      });
    });
    const legend = canvas.addGroup(Legend.Continuous, cfg);
    this.reBindLegendUI(legend, scale);
    return legend;
  }
  _createContinuousSizeLegend(canvas) {
    const itemType = this.get('itemType');
    const scale = this.get('scale');
    const range = scale.range();
    const domain = scale.domain();
    const domainStep = (domain[domain.length - 1] - domain[0]) / (range.length - 1);
    const legendCfg = this.get('legendCfg');
    const items = [];
    Util.each(range, (value, i) => {
      const name = domain[0] + domainStep * i;
      items.push({
        name,
        value: i / (range.length - 1)
      });
    });
    const cfg = Util.mix({
      items,
      attrType: 'size',
      titleText: itemType,
      title: {
        fill: '#333',
        textBaseline: 'bottom'
      },
      width: 15,
      height: 150
    }, legendCfg);
    const legend = canvas.addGroup(Legend.Continuous, cfg);
    this.reBindLegendUI(legend, scale);
    return legend;
  }
  _mapping() {
    const graph = this.get('graph');
    const dim = this.get('dim');
    const itemType = this.get('itemType');
    const scale = this.get('scale');
    const channel = this.get('channel');
    graph[itemType]()[channel](model => {
      if (itemType === 'node' && channel === 'size') {
        return scale(model[dim]) * 2;
      }
      return scale(model[dim]);
    });
  }
  reBindLegendUI(legend, scale) {
    const graph = this.get('graph');
    const dim = this.get('dim');
    const itemType = this.get('itemType');
    const domain = scale.domain();
    const domainMin = domain[0];
    const domainMax = domain[domain.length - 1];
    const domainFilter = [ domainMin, domainMax ];
    const rangeElement = legend.get('rangeElemeng');
    const legendCfg = this.get('legendCfg');
    const callback = model => {
      return model[dim] >= domainFilter[0] && model[dim] <= domainFilter[1];
    };
    const trigerWidth = legendCfg.trigerWidth ? legendCfg.trigerWidth : 16;
    const trigerMarginLeft = legendCfg.trigerMarginLeft ? legendCfg.trigerMarginLeft : trigerWidth / 2;
    legend.get('minTextElement').translate(trigerMarginLeft, -(16 - trigerWidth) / 2);
    legend.get('maxTextElement').translate(trigerMarginLeft, +(16 - trigerWidth) / 2);
    graph['add' + Util.ucfirst(itemType) + 'Filter'](callback);
    rangeElement.on('rangeChange', ev => {
      domainFilter[0] = domainMin + (domainMax - domainMin) * (ev.range[0] / 100);
      domainFilter[1] = domainMin + (domainMax - domainMin) * (ev.range[1] / 100);
      graph.BiquadFilterNode(itemType);
    });
    legend._updateElement = function(min, max) {
      min = Number(min);
      max = Number(max);
      const minTextElement = legend.get('minTextElement');
      const maxTextElement = legend.get('maxTextElement');
      const minText = legendCfg.formatter ? legendCfg.formatter(min) : min;
      const maxText = legendCfg.formatter ? legendCfg.formmater(max) : max;
      minTextElement.attr('text', minText + '');
      maxTextElement.attr('text', maxText + '');
      if (legend.get('attrType') === 'color') {
        const minButtonElement = legend.get('minButtonElement');
        const maxButtonElement = legend.get('maxButtonElement');
        minButtonElement.attr('fill', scale(min));
        maxButtonElement.attr('fill', scale(max));
      }
    };
    legend._updateElement(domainMin, domainMax);
    this.set('filterCallback', callback);
  }
  _checkInput() {
    const itemType = this.get('itemType');
    const graph = this.get('graph');
    const itemModels = graph.get(itemType + 's');
    return graph && itemModels && itemModels.length > 0;
  }
}

G6.Plugins['tool.mapper'] = Plugin;

module.exports = Plugin;
