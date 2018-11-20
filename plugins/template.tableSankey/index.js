/**
 * @fileOverview table sankey
 * show the table in sankey view
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const {
  sankey,
  sankeyLeft,
  sankeyRight,
  sankeyCenter,
  sankeyJustify
} = require('d3-sankey');
const Util = G6.Util;
const ALIGN_METHOD = {
  sankeyLeft,
  sankeyRight,
  sankeyCenter,
  sankeyJustify
};

G6.registerNode('sankey-node', {
  getPath(item) {
    const model = item.getModel();
    const { x, y, x0, y0, x1, y1 } = model;
    return [
      [ 'M', x0 - x, y0 - y ],
      [ 'L', x1 - x, y0 - y ],
      [ 'L', x1 - x, y1 - y ],
      [ 'L', x0 - x, y1 - y ],
      [ 'Z' ]
    ];
  }
});

G6.registerEdge('sankey-edge', {
  getPath(item) {
    const model = item.getModel();
    const source = item.getSource();
    const target = item.getTarget();
    const sourceBox = source.getBBox();
    const targetBox = target.getBBox();
    const sourceModel = source.getModel();
    const targetModel = target.getModel();
    let { y0, y1, sourceOffset = 0, targetOffset = 0 } = model;
    y0 = sourceBox.minY + y0 - sourceModel.y0;
    y1 = targetBox.minY + y1 - targetModel.y0;
    let startX = sourceBox.maxX + sourceOffset;
    let endX = targetBox.minX - targetOffset;
    let hgap = endX - startX;
    if (sourceBox.centerX > targetBox.centerX) {
      startX = targetBox.maxX + targetOffset;
      endX = sourceBox.minX - sourceOffset;
      hgap = endX - startX;
    }
    return [
      [ 'M', startX, y0 ],
      [ 'C', startX + hgap / 4, y0, endX - hgap / 2, y1, endX, y1 ]
    ];
  }
});

G6.registerGuide('col-names', {
  draw(item) {
    const group = item.getGraphicGroup();
    const graph = item.getGraph();
    const nodes = graph.getNodes();
    const model = item.getModel();
    const colMap = {};
    const { textStyle, fields } = model;
    let minY = Infinity;
    nodes.forEach(node => {
      const model = node.getModel();
      const { field, y, x, colIndex } = model;

      if (minY > y) {
        minY = y;
      }
      if (!colMap[field]) {
        colMap[field] = {
          field,
          x,
          colIndex
        };
      }
    });
    Util.each(colMap, ({ field, x, colIndex }) => {
      group.addShape('text', {
        attrs: {
          text: field,
          x,
          y: minY - 12,
          textAlign: colIndex === fields.length - 1 ? 'right' : 'left',
          ...textStyle
        }
      });
    });
    return group;
  }
});

class Plugin {
  constructor(options) {
    Util.mix(this, {
      /**
       * @type  {array} table - table data
       */
      table: null,

      /**
       * @type  {array} fields - table data fields
       */
      fields: null,

      /**
       * @type  {function} onBeforeRender - trigger before render
       */
      onBeforeRender: null,

      /**
       * @type  {boolean} showColName - show col name or not
       */
      showColName: true,

      /**
       * @type  {object} colNameTextStyle - col name text style
       */
      colNameTextStyle: {
        fill: '#333'
      },

      /**
       * @type  {object} labelStyle - label style
       */
      labelStyle: {

      },

      /**
       * @type  {string} align - could be `sankeyLeft` `sankeyRight` `sankeyCenter` `sankeyJustify`
       */
      align: 'sankeyJustify',

      /**
       * @type  {array} padding - top、right、bottom、left
       */
      padding: [ 40, 24, 24, 24 ],

      /**
       * @type {function} combine - comine the node id
       * @param  {object} cfg - combine cfg
       * @property  {string} cfg.field -field
       * @property  {string} cfg.value - value
       * @property  {string} cfg.colIndex - colIndex
       * @property  {object} cfg.rowIndex - rowIndex
       * @property  {object} cfg.row - row
       * @return {string} combine id
       */
      combine({ field, value }) {
        return field + value;
      },
      /**
       * @type  {function} onBeforeSankeyProcessorExecute - trigger before sankeyProcessor execute
       */
      onBeforeSankeyProcessorExecute(/* sankeyProcessor */) {},

      /**
       * @type  {function} onBeforeSankeyProcessorExecute - trigger after sankeyProcessor execute
       */
      onAfterSankeyProcessorExecute(/* sankeyProcessor */) {}
    }, options);
  }
  _getFields() {
    let { table, fields } = this;
    if (!fields) {
      fields = [];
      Util.each(table[0], (v, k) => {
        fields.push(k);
      });
      return fields;
    }
    return fields;
  }
  _object2values(obj) {
    const rst = [];
    Util.each(obj, v => {
      rst.push(v);
    });
    return rst;
  }
  _getNodes(table, fields) {
    const map = {};
    table.forEach((row, rowIndex) => {
      fields.forEach((field, colIndex) => {
        const value = row[field];
        const id = this.combine({ field, value, colIndex, rowIndex, row });
        if (!map[id]) {
          map[id] = {
            id,
            field,
            rowIndex,
            colIndex,
            fieldValue: value
          };
        }
      });
    });
    return this._object2values(map);
  }
  _getEdges(table, fields) {
    const map = {};
    table.forEach((row, rowIndex) => {
      fields.forEach((field, colIndex) => {
        const nextColIndex = colIndex + 1;
        const nextField = fields[nextColIndex];
        if (!nextField) {
          return;
        }
        const value = row[field];
        const nextValue = row[nextField];
        const source = this.combine({ field, value, colIndex, rowIndex, row });
        const target = this.combine({ field: nextField, value: nextValue, colIndex: nextColIndex, rowIndex, row });
        const id = source + '-' + target;
        if (!map[id]) {
          map[id] = {
            id,
            source,
            target,
            value: 1
          };
        } else {
          map[id].value++;
        }
      });
    });
    return this._object2values(map);
  }
  init() {
    const graph = this.graph;
    if (!this.table) {
      throw new Error('please input valid table data!');
    }
    graph.on('beforerender', () => {
      this.onBeforeRender && this.onBeforeRender(graph);
    });
    graph.on('afterrender', () => {
      graph.getItems().forEach(item => {
        if (item.isEdge) {
          graph.toBack(item);
        }
      });
      this.onAfterRender && this.onAfterRender(graph);
    });
    graph.on('afterinit', () => {
      this._initSankeyProcessor();
      const data = this._getData();
      this._graphMapping();
      graph.read(data);
    });
  }
  _graphMapping() {
    const graph = this.graph;
    const width = graph.getWidth();
    graph.node({
      label: model => {
        const label = {
          text: model.fieldValue,
          ...this.labelStyle
        };
        if (model.x > width / 2) {
          label.textAlign = 'right';
        } else {
          label.textAlign = 'left';
        }
        return label;
      },
      labelOffsetX: model => {
        const labelGap = 8;
        if (model.x > width / 2) {
          return -(model.x1 - model.x0) / 2 - labelGap;
        }
        return (model.x1 - model.x0) / 2 + labelGap;
      }
    });
  }
  _getGuides() {
    const guides = [];
    if (this.showColName) {
      guides.push({
        shape: 'col-names',
        textStyle: this.colNameTextStyle,
        fields: this._getFields()
      });
    }
    return guides;
  }
  _getData() {
    const table = this.table;
    const fields = this._getFields();
    const sankeyProcessor = this.sankeyProcessor;
    const data = {
      nodes: this._getNodes(table, fields),
      edges: this._getEdges(table, fields),
      guides: this._getGuides()
    };
    this.onBeforeSankeyProcessorExecute(sankeyProcessor);
    sankeyProcessor(data);
    this.onAfterSankeyProcessorExecute(sankeyProcessor);
    data.nodes.forEach(node => {
      node.x = (node.x0 + node.x1) / 2;
      node.y = (node.y0 + node.y1) / 2;
      node.shape = 'sankey-node';
      node.label = node.fieldValue;
    });
    data.edges.forEach(edge => {
      edge.source = edge.source.id;
      edge.target = edge.target.id;
      edge.shape = 'sankey-edge';
      edge.size = edge.width;
    });
    return data;
  }
  _initSankeyProcessor() {
    const graph = this.graph;
    const padding = this.padding;
    const graphWidth = graph.getWidth();
    const graphHeight = graph.getHeight();
    const sankeyProcessor = sankey()
    .nodeId(d => {
      return d.id;
    })
    .links(d => d.edges)
    .extent([[ padding[3], padding[0] ], [ graphWidth - padding[1], graphHeight - padding[2] ]]);
    sankeyProcessor.nodeAlign(ALIGN_METHOD[this.align]);
    this.sankeyProcessor = sankeyProcessor;
  }
  change(cfg) {
    Util.mix(this, cfg);
    const graph = this.graph;
    const data = this._getData();
    graph.read(data);
  }
}

G6.Plugins['template.tableSankey'] = Plugin;

module.exports = Plugin;
