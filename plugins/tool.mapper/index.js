/**
 * @fileOverview G6 Mapper Plugin base on d3 tech stack
 * d3-scale  https://github.com/d3/d3-scale
 * d3-legend https://github.com/susielu/d3-legend
 * @author shiwu.wyy@antfin.com
 */
const G6 = require('@antv/g6');
const Legend = require('@antv/g2/src/component/legend');
const Color = require('@antv/g2/src/component/legend/color');
const Size = require('@antv/g2/src/component/legend/size');
const Attr = require('@antv/attr');
const Util = G6.Util;
const Scale = require('@antv/scale');
const G = require('@antv/g');
const Canvas = G.canvas.Canvas;
const SVG = G.svg.Canvas;

class Plugin {
  constructor(itemType, dim, channel, range, otherCfg) {
    Util.mix(this, {
      /**
       * the type of the item, 'node'/'edge'
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
      range: [ 0, 1 ],

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
      legendCfg: {
        legendTitle: '',
        scale: 1
      },

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
        const {
          data
        } = ev;
        this._createScale(graph.parseSource(data));
        this._mapping();
        this.legendCfg && this._createLegend(graph.parseSource(data));
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
  _scaleConsSelector(scaleType, scaleCfg) {
    switch (scaleType) {
      case 'Linear':
        return new Scale.Linear(scaleCfg);
      case 'Log':
        return new Scale.Log(scaleCfg);
      case 'Pow':
        return new Scale.Pow(scaleCfg);
      default:
        return new Scale.Linear(scaleCfg);
    }
  }
  _createScale(sourceData) {
    const itemType = this.itemType;
    const data = sourceData[itemType + 's'];
    const scaleCfg = this.scaleCfg;
    const scaleType = this._getScaleType(data);
    const scale = this._scaleConsSelector(scaleType, scaleCfg);
    const range = this.range;
    scale.nice = scaleCfg.nice;
    let domain = scaleCfg.domain;
    scale.range = range;
    if (!domain) {
      if (scaleType === 'Ordinal') {
        domain = this._trainCategoryScale(itemType, data);
      } else {
        domain = this._trainNumberScale(itemType, data);
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
    scale.values = domain;
    scale.min = domain[0];
    scale.max = domain[domain.length - 1];
    Util.isFunction(scaleCfg.callback) && scaleCfg.callback(scale, domain);
    this.scale = scale;

  }
  _createLegend(sourceData) {
    const itemType = this.itemType;
    const data = sourceData[itemType + 's'];
    const scaleType = this._getScaleType(data);
    const channel = this.channel;
    const graph = this.graph;

    const legendContainer = Util.createDOM('<div class="legend-container"></div>', {
      position: 'relative'
    });
    const container = graph.getGraphContainer();
    container.appendChild(legendContainer);
    const Constructor = graph.getConstructor(Canvas, SVG);
    const canvas = new Constructor({
      containerId: 'legend',
      width: 500,
      height: 500
    });
    let legend;
    if (scaleType === 'Ordinal') {
      legend = this._createCatLegend(canvas);
    } else {
      if (channel === 'color') {
        legend = this._createContinuousColorLegend(canvas);
      } else {
        legend = this._createContinuousSizeLegend(canvas);
      }
      // the listener to filter nodes and edges
      const slider = legend.get('slider');
      slider.on('sliderchange', Util.throttle(ev => {
        const domain = this.scale.values;
        const cur_range = ev.range;
        const dim = this.dim;
        graph.addFilter(item => {
          if (item.isNode) {
            const val = item.model[dim];
            const percent = 100 * (val - domain[0]) / (domain[domain.length - 1] - domain[0]);
            if (percent > cur_range[1] || percent < cur_range[0]) return false;
            return true;
          } else if (item.isEdge) {
            const source_val = item.source.model[dim];
            const source_percent = 100 * (source_val - domain[0]) / (domain[domain.length - 1] - domain[0]);
            const source_visible = (source_percent <= cur_range[1] && source_percent >= cur_range[0]);
            const target_val = item.target.model[dim];
            const target_percent = 100 * (target_val - domain[0]) / (domain[domain.length - 1] - domain[0]);
            const target_visible = (target_percent <= cur_range[1] && target_percent >= cur_range[0]);
            if (!source_visible || !target_visible) return false;
            return true;
          }
        });
        graph.filter();
      }, 100));
    }


    const bbox = legend.getBBox();
    const padding = 6;
    const legendWidth = bbox.maxX - bbox.minX;
    const legendHeight = bbox.maxY - bbox.minY;
    legend.move(-bbox.minX + padding, -bbox.minY + padding);
    canvas.changeSize(legendWidth + 2 * padding, legendHeight + 2 * padding);
    this.legend = legend;
    this.legendCanvas = canvas;
    this.legendWidth = legendWidth;
    this.legendHeight = legendHeight;
    canvas.draw();
  }
  updateLegendPosition() {
    const legend = this.legend;
    if (!legend) {
      return;
    }
    const canvas = this.legendCanvas;
    const legendCfg = this.legendCfg;
    const marginTop = legendCfg.marginTop ? legendCfg.marginTop : 0;
    const marginLeft = legendCfg.marginLeft ? legendCfg.marginLeft : 0;
    const marginBottom = legendCfg.marginBottom ? legendCfg.marginBottom : 0;
    const marginRight = legendCfg.marginRight ? legendCfg.marginRight : 0;
    const position = legendCfg.position ? legendCfg.position : 'br';
    const graph = this.graph;
    const graphWidth = graph.get('width');
    const graphHeight = graph.get('height');
    const el = canvas.get('el');
    const legendWidth = this.legendWidth;
    const legendHeight = this.legendHeight;

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
    const scale = this.scale;
    const range = scale.range;
    const domain = scale.values;
    const itemType = this.itemType;
    const legendCfg = this.legendCfg;
    const items = [];
    const cfg = Util.mix({
      items,
      checkable: false
    }, legendCfg);
    Util.each(range, (value, i) => {
      items.push({
        name: domain[i],
        value: domain[i],
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
    const itemType = this.itemType;
    const scale = this.scale;
    const range = scale.range;
    const domain = scale.values;
    const legendCfg = this.legendCfg;
    let lengendTitle = legendCfg.legendTitle;
    if (lengendTitle === '') {
      lengendTitle = this.dim;
    }
    if (legendCfg.scale <= 0 || typeof legendCfg.scale === 'undefined') {
      legendCfg.scale = 1;
    }
    const items = [];

    Util.each(range, (val, i) => {
      const percent = (domain[i] - scale.min) / (scale.max - scale.min);
      items.push({
        text: domain[i],
        attrValue: val,
        value: domain[i],
        scaleValue: percent
      });
    });

    const cfg = Util.mix({
      items,
      layout: 'horizontal',
      titleText: itemType,
      title: {
        text: lengendTitle,
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 150 * legendCfg.scale,
      height: 15 // * legendCfg.scale
    }, legendCfg);
    const legend = canvas.addGroup(Color, cfg);

    return legend;
  }
  _createContinuousSizeLegend(canvas) {
    const itemType = this.itemType;
    const scale = this.scale;
    const range = scale.range;
    const domain = scale.values;
    const domainStep = (domain[domain.length - 1] - domain[0]) / (range.length - 1);
    const legendCfg = this.legendCfg;
    let lengendTitle = legendCfg.legendTitle;
    if (lengendTitle === '') {
      lengendTitle = this.dim;
    }
    if (legendCfg.scale <= 0 || typeof legendCfg.scale === 'undefined') {
      legendCfg.scale = 1;
    }
    const items = [];
    Util.each(range, (val, i) => {
      const dom = domain[0] + domainStep * i;
      items.push({
        text: dom,
        attrValue: val * legendCfg.scale,
        value: dom
      });
    });
    const cfg = Util.mix({
      items,
      layout: 'horizontal',
      attrType: 'size',
      titleText: itemType,
      title: {
        text: lengendTitle,
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 150 * legendCfg.scale,
      height: 15 * legendCfg.scale
    }, legendCfg);
    const legend = canvas.addGroup(Size, cfg);
    return legend;
  }
  _mapping() {
    const graph = this.graph;
    const dim = this.dim;
    const itemType = this.itemType;
    const scale = this.scale;
    const channel = this.channel;

    const domain = scale.values;
    const range = scale.range;
    let color;
    if (channel === 'color') {
      const colorScale = this._scaleSelector(Util.upperFirst(scale.type), domain);
      color = new Attr.Color({
        scales: [ colorScale ],
        values: range
      });
    }
    graph[itemType]()[channel](model => {
      if (itemType === 'node' && channel === 'size') {
        return scale.scale(model[dim]) * 2;
      } else if (channel === 'color') {
        return color.mapping(model[dim])[0];
      } else if (itemType === 'edge' && channel === 'size') {
        return scale.scale(model[dim]);
      }
      return scale.scale(model[dim]);
    });
  }
  _checkInput() {
    const itemType = this.itemType;
    const graph = this.graph;
    const itemModels = graph.get(itemType + 's');
    return graph && itemModels && itemModels.length > 0;
  }
  _scaleSelector(type, domain) {
    const params = {
      min: domain[0],
      max: domain[domain.length - 1]
    };
    switch (type) {
      case 'Linear':
        return Scale.linear({
          min: domain[0],
          max: domain[domain.length - 1]
        });
      case 'Identity':
        return Scale.identity({
          value: 'red'
        });
      case 'Ordinal':
        return Scale.cat({
          values: domain
        });
      default:
        return Scale.linear(params);
    }
  }
}

G6.Plugins['tool.mapper'] = Plugin;

module.exports = Plugin;
