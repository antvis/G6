import { Graph, Extensions, extend, stdLib } from '@antv/g6';

const container = document.getElementById('container');

const tipDiv = document.createElement('div');
tipDiv.innerHTML = `Click to show the complete label. <br/> Click the icon to copy the content.`;
container.appendChild(tipDiv);

const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const nodeHeight = 80;
const nodeWidth = 200;
const fillColor = '#f6e9d7';
const fontColor = '#ff7900';
const padding = 7;

class CopyNode extends Extensions.RectNode {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
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
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      ),
      topText: this.upsertShape(
        'text',
        'topText',
        {
          // text: fittingString(cfg.topText, nodeWidth - padding * 2 - 10, 14),
          text: cfg.topText,
          x: cfg.isTopTextEllipsis ? padding : padding + 24,
          y: (0.5 * nodeHeight + padding) * 0.5,
          fontSize: 14,
          textAlign: 'start',
          textBaseline: 'middle',
          shadowColor: fontColor,
          fill: fontColor,
          wordWrap: cfg.isTopTextEllipsis,
          wordWrapWidth: nodeWidth - padding * 2,
          textOverflow: 'ellipsis',
          maxLines: 1,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
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
          opacity: cfg.isTopTextEllipsis ? 0 : 1,
          cursor: 'pointer',
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      ),
    };

    const bottomGroup = {
      bottomText: this.upsertShape(
        'text',
        'bottomText',
        {
          // text: fittingString(cfg.bottomText, nodeWidth - 10, 14),
          text: cfg.bottomText,
          x: cfg.isBottomTextEllipsis ? padding : padding + 20,
          y: nodeHeight - (0.5 * nodeHeight + padding) * 0.5,
          fontSize: 14,
          textAlign: 'start',
          textBaseline: 'middle',
          shadowColor: fontColor,
          fill: fontColor,
          wordWrap: cfg.isBottomTextEllipsis,
          wordWrapWidth: nodeWidth,
          textOverflow: 'ellipsis',
          maxLines: 1,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
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
          opacity: cfg.isBottomTextEllipsis ? 0 : 1,
          cursor: 'pointer',
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      ),
    };

    return { ...topGroup, ...bottomGroup };
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
          isTopTextEllipsis: true,
          isBottomTextEllipsis: true,
        },
      },
      {
        id: 'node2',
        data: {
          x: 100,
          y: 200,
          topText: 'Short Label',
          bottomText: 'Click the Logo to Copy!',
          isTopTextEllipsis: true,
          isBottomTextEllipsis: true,
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

const copyStr = (str) => {
  const input = document.createElement('textarea');
  input.value = str;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
  alert('Copy Success!');
};

const resetTextEllipsis = () => {
  const nodeIds = graph.getAllNodesData().map((node) => node.id);
  nodeIds.map((nodeId) => {
    graph.updateData('node', {
      id: nodeId,
      data: {
        isTopTextEllipsis: true,
        isBottomTextEllipsis: true,
      },
    });
  });
};

graph.on('node:pointermove', (event) => {
  const { itemId, target } = event;
  resetTextEllipsis();
  if (target.id === 'topText' || target.id === 'topImage') {
    graph.updateData('node', {
      id: itemId,
      data: {
        isTopTextEllipsis: false,
      },
    });
  }
  if (target.id === 'bottomText' || target.id === 'bottomImage') {
    graph.updateData('node', {
      id: itemId,
      data: {
        isBottomTextEllipsis: false,
      },
    });
  }
});

graph.on('node:click', (event) => {
  const { itemId, target } = event;
  if (target.id === 'topImage') {
    const model = graph.getNodeData(itemId);
    const text = model.data.topText;
    copyStr(text);
  }
  if (target.id === 'bottomImage') {
    const model = graph.getNodeData(itemId);
    const text = model.data.bottomText;
    copyStr(text);
  }
});

graph.on('node:pointerleave', (event) => {
  resetTextEllipsis();
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
