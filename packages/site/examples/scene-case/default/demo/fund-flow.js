import { Rect as GRect, Text as GText } from '@antv/g';
import {
  Badge,
  CommonEvent,
  ExtensionCategory,
  Graph,
  GraphEvent,
  iconfont,
  Label,
  Rect,
  register,
  treeToGraphData,
} from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const COLORS = {
  B: '#1783FF',
  R: '#F46649',
  Y: '#DB9D0D',
  G: '#60C42D',
  DI: '#A7A7A7',
};
const GREY_COLOR = '#CED4D9';

class TreeNode extends Rect {
  get data() {
    return this.context.model.getNodeLikeDatum(this.id);
  }

  get childrenData() {
    return this.context.model.getChildrenData(this.id);
  }

  getLabelStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 8,
      y: -height / 2 + 16,
      text: this.data.name,
      fontSize: 12,
      opacity: 0.85,
      fill: '#000',
      cursor: 'pointer',
    };
  }

  getPriceStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 8,
      y: height / 2 - 8,
      text: this.data.label,
      fontSize: 16,
      fill: '#000',
      opacity: 0.85,
    };
  }

  drawPriceShape(attributes, container) {
    const priceStyle = this.getPriceStyle(attributes);
    this.upsert('price', GText, priceStyle, container);
  }

  getCurrencyStyle(attributes) {
    const [, height] = this.getSize(attributes);
    return {
      x: this.shapeMap['price'].getLocalBounds().max[0] + 4,
      y: height / 2 - 8,
      text: this.data.currency,
      fontSize: 12,
      fill: '#000',
      opacity: 0.75,
    };
  }

  drawCurrencyShape(attributes, container) {
    const currencyStyle = this.getCurrencyStyle(attributes);
    this.upsert('currency', GText, currencyStyle, container);
  }

  getPercentStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: width / 2 - 4,
      y: height / 2 - 8,
      text: `${((Number(this.data.variableValue) || 0) * 100).toFixed(2)}%`,
      fontSize: 12,
      textAlign: 'right',
      fill: COLORS[this.data.status],
    };
  }

  drawPercentShape(attributes, container) {
    const percentStyle = this.getPercentStyle(attributes);
    this.upsert('percent', GText, percentStyle, container);
  }

  getTriangleStyle(attributes) {
    const percentMinX = this.shapeMap['percent'].getLocalBounds().min[0];
    const [, height] = this.getSize(attributes);
    return {
      fill: COLORS[this.data.status],
      x: this.data.variableUp ? percentMinX - 18 : percentMinX,
      y: height / 2 - 16,
      fontFamily: 'iconfont',
      fontSize: 16,
      text: '\ue62d',
      transform: this.data.variableUp ? [] : [['rotate', 180]],
    };
  }

  drawTriangleShape(attributes, container) {
    const triangleStyle = this.getTriangleStyle(attributes);
    this.upsert('triangle', Label, triangleStyle, container);
  }

  getVariableStyle(attributes) {
    const [, height] = this.getSize(attributes);
    return {
      fill: '#000',
      fontSize: 12,
      opacity: 0.45,
      text: this.data.variableName,
      textAlign: 'right',
      x: this.shapeMap['triangle'].getLocalBounds().min[0] - 4,
      y: height / 2 - 8,
    };
  }

  drawVariableShape(attributes, container) {
    const variableStyle = this.getVariableStyle(attributes);
    this.upsert('variable', GText, variableStyle, container);
  }

  getCollapseStyle(attributes) {
    if (this.childrenData.length === 0) return false;
    const { collapsed } = attributes;
    const [width, height] = this.getSize(attributes);
    return {
      backgroundFill: '#fff',
      backgroundHeight: 16,
      backgroundLineWidth: 1,
      backgroundRadius: 0,
      backgroundStroke: GREY_COLOR,
      backgroundWidth: 16,
      cursor: 'pointer',
      fill: GREY_COLOR,
      fontSize: 16,
      text: collapsed ? '+' : '-',
      textAlign: 'center',
      textBaseline: 'middle',
      x: width / 2,
      y: 0,
    };
  }

  drawCollapseShape(attributes, container) {
    const collapseStyle = this.getCollapseStyle(attributes);
    const btn = this.upsert('collapse', Badge, collapseStyle, container);

    if (btn && !Reflect.has(btn, '__bind__')) {
      Reflect.set(btn, '__bind__', true);
      btn.addEventListener(CommonEvent.CLICK, () => {
        const { collapsed } = this.attributes;
        const graph = this.context.graph;
        if (collapsed) graph.expandElement(this.id);
        else graph.collapseElement(this.id);
      });
    }
  }

  getProcessBarStyle(attributes) {
    const { rate, status } = this.data;
    const { radius } = attributes;
    const color = COLORS[status];
    const percent = `${Number(rate) * 100}%`;
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2,
      y: height / 2 - 4,
      width: width,
      height: 4,
      radius: [0, 0, radius, radius],
      fill: `linear-gradient(to right, ${color} ${percent}, ${GREY_COLOR} ${percent})`,
    };
  }

  drawProcessBarShape(attributes, container) {
    const processBarStyle = this.getProcessBarStyle(attributes);
    this.upsert('process-bar', GRect, processBarStyle, container);
  }

  getKeyStyle(attributes) {
    const keyStyle = super.getKeyStyle(attributes);
    return {
      ...keyStyle,
      fill: '#fff',
      lineWidth: 1,
      stroke: GREY_COLOR,
    };
  }

  render(attributes = this.parsedAttributes, container) {
    super.render(attributes, container);

    this.drawPriceShape(attributes, container);
    this.drawCurrencyShape(attributes, container);
    this.drawPercentShape(attributes, container);
    this.drawTriangleShape(attributes, container);
    this.drawVariableShape(attributes, container);
    this.drawProcessBarShape(attributes, container);
    this.drawCollapseShape(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'tree-node', TreeNode);

fetch('https://assets.antv.antgroup.com/g6/decision-tree.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data, {
        getNodeData: (datum, depth) => {
          if (!datum.style) datum.style = {};
          datum.style.collapsed = depth >= 2;
          if (!datum.children) return datum;
          const { children, ...restDatum } = datum;
          return { ...restDatum, children: children.map((child) => child.id) };
        },
      }),
      node: {
        type: 'tree-node',
        style: {
          size: [202, 60],
          ports: [{ placement: 'left' }, { placement: 'right' }],
          radius: 4,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          stroke: GREY_COLOR,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 300,
        getHeight: () => 60,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.once(GraphEvent.AFTER_RENDER, () => {
      graph.fitView();
    });

    graph.render();
  });
