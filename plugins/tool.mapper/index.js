/**
 * @fileOverview G6 Mapper Plugin base on d3 tech stack
 * d3-scale  https://github.com/d3/d3-scale
 * d3-legend https://github.com/susielu/d3-legend
 * @author shiwu.wyy@antfin.com
 */
const G6 = require('@antv/g6');
const { Legend } = require('@antv/component/lib');
const { Color, CircleSize, Category } = Legend;
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
        title: {
          fill: '#333'
        },
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
    let legendContainer = this.legendCfg.containerDOM;
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
    const domain = this.scale.values;
    const dim = this.dim;
    if (scaleType === 'Category') {
      legend = this._createCatLegend(canvas);
      // the listener for category legend to filter nodes and edges
      graph.addFilter(item => {
        if (this.curRange[0] === 0 && this.curRange[1] === 100) {
          return true;
        }
        if (item.isNode) {
          const val = item.model[dim];
          let visible = true;
          Util.each(this.curRange, r => {
            const checked = r.get('checked');
            const name = r.get('value');
            if (!checked && name === val) {
              visible = false;
            }
          });
          return visible;
        } else if (item.isEdge) {
          const sourceVal = item.source.model[dim];
          let sourceVisible = true;
          const targetVal = item.target.model[dim];
          let targetVisible = true;
          Util.each(this.curRange, r => {
            const checked = r.get('checked');
            const name = r.get('value');
            if (!checked && name === sourceVal) {
              sourceVisible = false;
            }
            if (!checked && name === targetVal) {
              targetVisible = false;
            }
          });
          if (!sourceVisible || !targetVisible) return false;
          return true;
        }
      });
      legend.on('itemclick', () => {
        const itemsGroup = legend.get('itemsGroup');
        this.curRange = itemsGroup.get('children');
        graph.filter();
        legend.get('canvas').draw();
      });
    } else {
      if (channel === 'color') {
        legend = this._createContinuousColorLegend(canvas);
      } else {
        legend = this._createContinuousSizeLegend(canvas);
      }
      // the listener to filter nodes and edges
      const slider = legend.get('slider');
      if (itemType === 'node') {
        graph.addFilter(item => {
          if (item.isNode) {
            const val = item.model[dim];
            const percent = 100 * (val - domain[0]) / (domain[domain.length - 1] - domain[0]);
            if (percent > this.curRange[1] || percent < this.curRange[0]) {
              return false;
            }
          } else if (item.isEdge) {
            const sourceVal = item.source.model[dim];
            const sourcePercent = 100 * (sourceVal - domain[0]) / (domain[domain.length - 1] - domain[0]);
            const sourceVisible = (sourcePercent <= this.curRange[1] && sourcePercent >= this.curRange[0]);
            const targetVal = item.target.model[dim];
            const targetPercent = 100 * (targetVal - domain[0]) / (domain[domain.length - 1] - domain[0]);
            const targetVisible = (targetPercent <= this.curRange[1] && targetPercent >= this.curRange[0]);
            if (!sourceVisible || !targetVisible) return false;
          }
          return true;
        });
      } else if (itemType === 'edge') {
        graph.addFilter(item => {
          if (item.isEdge) {
            const val = item.model[dim];
            const percent = 100 * (val - domain[0]) / (domain[domain.length - 1] - domain[0]);
            if (percent > this.curRange[1] || percent < this.curRange[0]) {
              return false;
            }
          }
          return true;
        });
      }
      // });

      legend.get('slidable') && slider.on('sliderchange', Util.throttle(ev => {
        this.curRange = ev.range;
        graph.filter();
      }, 100));
    }
    const bbox = legend.get('group').getBBox();
    const padding = 6;
    const legendWidth = bbox.maxX - bbox.minX;
    const legendHeight = bbox.maxY - bbox.minY;
    legend.move(-bbox.minX + padding, -bbox.minY + padding);
    canvas.changeSize(legendWidth + 2 * padding, legendHeight + 2 * padding);
    this.legend = legend;
    this.legendCanvas = canvas;
    canvas.draw();
  }
  _createCatLegend(canvas) {
    const scale = this.scale;
    const range = scale.range;
    const domain = scale.values;
    const items = [];
    Util.each(range, (val, i) => {
      items.push({
        value: domain[i], // marker text
        marker: {
          symbol: 'circle',
          radius: 5,
          fill: val // marker color
        },
        checked: true
      });
    });
    const cfg = Util.mix({
      items,
      checkable: true,
      clickable: true,
      container: canvas
    }, this.legendCfg);
    const legend = new Category(cfg);
    return legend;
  }
  _getLegendCfg(defaultCfg) {
    const legendCfg = this.legendCfg;
    if (Util.isNil(legendCfg.width) && Util.isNil(legendCfg.height)) {
      if (legendCfg.layout === 'horizontal') {
        legendCfg.width = 150;
        legendCfg.height = 15;
      } else {
        legendCfg.width = 15;
        legendCfg.height = 150;
      }
    }
    if (!Util.isNil(legendCfg.width) && Util.isNil(legendCfg.height)) {
      if (legendCfg.layout === 'horizontal') {
        legendCfg.height = legendCfg.width / 10;
      } else {
        legendCfg.height = legendCfg.width * 10;
      }
    } else if (Util.isNil(legendCfg.width) && !Util.isNil(legendCfg.height)) {
      if (legendCfg.layout === 'horizontal') {
        legendCfg.width = legendCfg.height * 10;
      } else {
        legendCfg.width = legendCfg.height / 10;
      }
    }
    return Util.mix(true, {}, defaultCfg, legendCfg);
  }
  _createContinuousColorLegend(canvas) {
    const scale = this.scale;
    const range = scale.range;
    const domain = scale.values;
    const domainStep = (domain[domain.length - 1] - domain[0]) / (range.length - 1);
    const items = [];
    Util.each(range, (val, i) => {
      const itemText = domain[0] + domainStep * i;
      const percentage = (itemText - domain[0]) / (domain[domain.length - 1] - domain[0]);
      items.push({
        color: val,
        value: itemText, // the number label of the slider
        percentage
      });
    });
    const cfg = this._getLegendCfg({
      items,
      container: canvas,
      title: {
        text: this.dim
      }
    });
    const legend = new Color(cfg);
    // const legend = canvas.addGroup(Color, cfg);
    return legend;
  }
  _createContinuousSizeLegend(canvas) {
    const scale = this.scale;
    const range = scale.range;
    const domain = scale.values;
    const domainStep = (domain[domain.length - 1] - domain[0]) / (range.length - 1);

    const items = [];
    Util.each(range, (val, i) => {
      const dom = domain[0] + domainStep * i;
      items.push({
        attrValue: val,
        value: dom // the number label of the slider
      });
    });
    const cfg = this._getLegendCfg({
      items,
      container: canvas,
      attrType: 'size',
      title: {
        text: this.dim
      }
    });
    const legend = new CircleSize(cfg);
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
