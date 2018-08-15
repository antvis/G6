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
const Scale = require('@antv/scale');
const { Util, G } = G6;

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
        layout: 'horizontal' // horizontal or vertical
      },

      /**
       * 是否数据对齐
       * @type  {boolean}
       */
      nice: true,
      curRange: [ 0, 100 ]
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
        scaleCfg.type = 'category';
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
      if (scaleType === 'Category') {
        domain = this._trainCategoryScale(itemType, data);
      } else {
        domain = this._trainNumberScale(itemType, data);
      }
    }
    const domainLength = domain.length;
    if (domainLength === 2 && domain[0] === domain[1]) {
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

    const containerId = this.legendCfg.containerId;
    let legendContainer = this.legendCfg.container;
    if (legendContainer === undefined) {
      if (containerId === undefined) {
        legendContainer = Util.createDOM('<div class="legend-container"></div>');
        const container = graph.getGraphContainer();
        container.appendChild(legendContainer);
      } else {
        legendContainer = document.getElementById(containerId);
        if (legendContainer === undefined || legendContainer === null) {
          throw new Error('please set the container for the graph !');
        }
      }
    }

    const canvas = new G.Canvas({
      containerId, // dom_id,
      containerDOM: legendContainer,
      width: 500,
      height: 500
    });
    let legend;
    if (scaleType === 'Category') {
      legend = this._createCatLegend(canvas);
    } else {
      if (channel === 'color') {
        legend = this._createContinuousColorLegend(canvas);
      } else {
        legend = this._createContinuousSizeLegend(canvas);
      }
      // the listener to filter nodes and edges
      const slider = legend.get('slider');
      const domain = this.scale.values;
      const dim = this.dim;
      graph.addFilter(item => {
        if (item.isNode) {
          const val = item.model[dim];
          const percent = 100 * (val - domain[0]) / (domain[domain.length - 1] - domain[0]);
          if (percent > this.curRange[1] || percent < this.curRange[0]) {
            return false;
          }
          return true;
        } else if (item.isEdge) {
          const sourceVal = item.source.model[dim];
          const sourcePercent = 100 * (sourceVal - domain[0]) / (domain[domain.length - 1] - domain[0]);
          const sourceVisible = (sourcePercent <= this.curRange[1] && sourcePercent >= this.curRange[0]);
          const targetVal = item.target.model[dim];
          const targetPercent = 100 * (targetVal - domain[0]) / (domain[domain.length - 1] - domain[0]);
          const targetVisible = (targetPercent <= this.curRange[1] && targetPercent >= this.curRange[0]);
          if (!sourceVisible || !targetVisible) return false;
          return true;
        }
      });

      slider.on('sliderchange', Util.throttle(ev => {
        this.curRange = ev.range;
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
  _createCatLegend(canvas) {
    const scale = this.scale;
    const range = scale.range;
    const domain = scale.values;
    const itemType = this.itemType;
    const legendCfg = this.legendCfg;
    const items = [];
    let lengendTitle = legendCfg.title;
    if (lengendTitle === '' || lengendTitle === undefined) {
      lengendTitle = this.dim;
    }
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
        layout: legendCfg.layout,
        marker: {
          symbol: 'circle',
          radius: 5,
          fill: value
        },
        title: {
          text: lengendTitle,
          fill: '#333',
          textBaseline: 'middle'
        },
        checked: true
      });
    });
    const legend = canvas.addGroup(Legend.Category, cfg);
    return legend;
  }
  _createContinuousColorLegend(canvas) {
    const scale = this.scale;
    const range = scale.range;
    const domain = scale.values;
    const legendCfg = this.legendCfg;
    let legendTitle = legendCfg.title;
    if (legendTitle === '' || legendTitle === undefined) {
      legendTitle = this.dim;
    }
    let legendLayout = legendCfg.layout;
    if (legendLayout === '' || legendLayout === undefined) {
      legendLayout = 'horizontal';
    }

    let legendWidth = legendCfg.lengedWidth;
    let legendHeight = legendCfg.legendHeight;
    if (legendWidth === null || legendWidth === undefined) {
      if (legendLayout === 'horizontal') {
        legendWidth = 150;
        legendHeight = 15;
      } else {
        legendWidth = 15;
        legendHeight = 150;
      }
    }

    const domainStep = (domain[domain.length - 1] - domain[0]) / (range.length - 1);
    const items = [];
    Util.each(range, (val, i) => {
      let itemText = domain[0] + domainStep * i;
      const percent = (itemText - domain[0]) / (domain[domain.length - 1] - domain[0]);
      if (legendCfg.formatter !== undefined && legendCfg.formatter !== null) {
        itemText = legendCfg.formatter(domain[i]);
      }
      items.push({
        text: domain[i],
        attrValue: val,
        value: itemText, // the number label of the slider
        scaleValue: percent
      });
    });
    const cfg = {
      items,
      layout: legendLayout,
      title: {
        text: legendTitle,
        fill: '#333'
      },
      width: legendWidth,
      height: legendHeight
    };
    const legend = canvas.addGroup(Color, cfg);

    return legend;
  }
  _createContinuousSizeLegend(canvas) {
    const scale = this.scale;
    const range = scale.range;
    const domain = scale.values;
    const domainStep = (domain[domain.length - 1] - domain[0]) / (range.length - 1);
    const legendCfg = this.legendCfg;
    let legendTitle = legendCfg.title;
    if (legendTitle === '' || legendTitle === undefined) {
      legendTitle = this.dim;
    }
    let legendLayout = legendCfg.layout;
    if (legendLayout === '' || legendLayout === undefined) {
      legendLayout = 'horizontal';
    }

    let legendWidth = legendCfg.lengedWidth;
    let legendHeight = legendCfg.legendHeight;
    if (legendWidth === null || legendWidth === undefined) {
      if (legendLayout === 'horizontal') {
        legendWidth = 150;
        legendHeight = 15;
      } else {
        legendWidth = 15;
        legendHeight = 150;
      }
    }

    const items = [];
    Util.each(range, (val, i) => {
      const dom = domain[0] + domainStep * i;
      let itemText = dom;
      if (legendCfg.formatter !== undefined && legendCfg.formmater !== null) {
        itemText = legendCfg.formatter(dom);
      }
      items.push({
        text: dom,
        attrValue: val,
        value: itemText // the number label of the slider
      });
    });
    const cfg = {
      items,
      layout: legendLayout,
      attrType: 'size',
      title: {
        text: legendTitle,
        fill: '#333'
      },
      width: legendWidth,
      height: legendHeight
    };
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
        return scale.scale(model[dim]);
      } else if (channel === 'color') {
        return color.mapping(model[dim])[0];
      }
      // itemType === 'edge' && channel === 'size'
      return scale.scale(model[dim]);
    });
  }
  _scaleSelector(type, domain) {
    const params = {
      min: domain[0],
      max: domain[domain.length - 1]
    };
    switch (type) {
      case 'Category':
        return Scale.cat({
          values: domain
        });
      default:
        return Scale.linear(params);
    }
  }
  destroy() {
    this.legendCanvas && this.legendCanvas.destroy();
  }
}

G6.Plugins['tool.mapper'] = Plugin;

module.exports = Plugin;
