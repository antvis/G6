import { Graph, Extensions, extend, stdLib } from '@antv/g6';

/**
 * Process the long label, hover to show the complete label, click the icon to copy the label
 * provided by GitHub user @WontonCat
 * Thanks for contributing!
 */

const tipDiv = document.createElement('div');
tipDiv.innerHTML = `Hover to show the complete label, click the icon to copy the content. Hover 显示完整 label，点击左侧 icon 复制 label 内容`;
document.getElementById('container').appendChild(tipDiv);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const nodeHeight = 80;
const nodeWidth = 200;
const fillColor = '#f6e9d7';
const fontColor = '#ff7900';
const padding = 7;

class CopyNode extends Extensions.RectNode {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    const keyShapeBBox = shapeMap.keyShape.getLocalBounds();
    const x = -keyShapeBBox.halfExtents[0],
      y = -keyShapeBBox.halfExtents[1];
    const { data: cfg } = model;

    const topGroup = {
      topBox: this.upsertShape(
        'rect',
        'topBox',
        {
          fill: '#fff',
          stroke: '#c7d0d1',
          x: padding,
          y: padding,
          width: nodeWidth - padding * 2,
          height: 0.5 * nodeHeight - padding,
          lineWidth: 1.5,
          radius: 4,
        },
        shapeMap,
        model,
      ),
      topText: this.upsertShape(
        'text',
        'topText',
        {
          // text: fittingString(cfg.topText, nodeWidth - padding * 2 - 10, 14),
          text: cfg.topText,
          x: 0.5 * nodeWidth,
          y: (0.5 * nodeHeight + padding) * 0.5,
          fontSize: 14,
          textAlign: 'center',
          textBaseline: 'middle',
          shadowColor: fontColor,
          fill: fontColor,
        },
        shapeMap,
        model,
      ),
      topImage: this.upsertShape(
        'image',
        'topImage',
        {
          x: padding + 5,
          y: padding + (0.5 * nodeHeight - padding) * 0.5 - 10,
          height: 20,
          width: 20,
          img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          opacity: 0,
          cursor: 'pointer',
        },
        shapeMap,
        model,
      ),
    };

    const bottomGroup = {
      bottomText: this.upsertShape(
        'text',
        'bottomText',
        {
          // text: fittingString(cfg.bottomText, nodeWidth - 10, 14),
          text: cfg.bottomText,
          x: 0.5 * nodeWidth,
          y: nodeHeight - (0.5 * nodeHeight + padding) * 0.5,
          fontSize: 14,
          textAlign: 'center',
          textBaseline: 'middle',
          shadowColor: fontColor,
          fill: fontColor,
        },
        shapeMap,
        model,
      ),
      bottomImage: this.upsertShape(
        'image',
        'bottomImage',
        {
          x: 5,
          y: 0.5 * nodeHeight + 8,
          height: 20,
          width: 20,
          img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          opacity: 0,
          cursor: 'pointer',
        },
        shapeMap,
        model,
      ),
    };

    return { ...topGroup, ...bottomGroup };
  }

  setState(name, value, item) {
    const group = item.get('group');
    const model = item.get('model');
    const { topText, bottomText } = model;
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'copy-node': CopyNode,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  autoFit: 'view',
  modes: {
    default: ['drag-node'],
  },
  data: {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 100,
          y: 100,
          topText: 'This label is too long to be displayed',
          bottomText: 'This label is too long to be displayed',
        },
      },
      {
        id: 'node2',
        data: {
          x: 100,
          y: 200,
          topText: 'Short Label',
          bottomText: 'Click the Logo to Copy!',
        },
      },
    ],
  },
  node: {
    type: 'copy-node',
    keyShape: {
      x: nodeWidth / 2,
      y: nodeHeight / 2,
      width: nodeWidth,
      height: nodeHeight,
      fill: fillColor,
      lineWidth: 2,
      stroke: fontColor,
      radius: 5,
    },
    otherShapes: {},
  },
});

graph.on('topText:mouseenter', (e) => {
  console.log('enter');
  // graph.setItemState(e.item, "top-group-active", true);
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
