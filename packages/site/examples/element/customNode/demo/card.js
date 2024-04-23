import { Extensions, Graph, extend, stdLib } from '@antv/g6';

let graph;

const ERROR_COLOR = '#F5222D';

const getNodeConfig = (node) => {
  if (node.nodeError) {
    return {
      basicColor: ERROR_COLOR,
      fontColor: '#FFF',
      borderColor: ERROR_COLOR,
      bgColor: '#E66A6C',
    };
  }
  let config = {
    basicColor: '#5B8FF9',
    fontColor: '#5B8FF9',
    borderColor: '#5B8FF9',
    bgColor: '#C6E5FF',
  };
  switch (node.type) {
    case 'root': {
      config = {
        basicColor: '#E3E6E8',
        fontColor: 'rgba(0,0,0,0.85)',
        borderColor: '#E3E6E8',
        bgColor: '#5b8ff9',
      };
      break;
    }
    default:
      break;
  }
  return config;
};

class CardNode extends Extensions.RectNode {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    const { data: cfg } = model;
    const config = getNodeConfig(cfg);

    const isRoot = cfg.dataType === 'root';
    const nodeError = cfg.nodeError;

    const otherShapes = {};

    if (!isRoot) {
      otherShapes['left-dot-shape'] = this.upsertShape(
        'circle',
        'left-dot-shape',
        { cx: 3, cy: 32, r: 6, fill: config.basicColor },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );
    }

    /** rect shape */
    otherShapes['rect-shape'] = this.upsertShape(
      'rect',
      'rect-shape',
      {
        x: 3,
        y: 0,
        width: 243 - 19,
        height: 64,
        fill: config.bgColor,
        stroke: config.borderColor,
        radius: 2,
        cursor: 'pointer',
        zIndex: 0,
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );

    /* Left bolder border */
    otherShapes['left-border-shape'] = this.upsertShape(
      'rect',
      'left-border-shape',
      {
        x: 3,
        y: 0,
        width: 3,
        height: 64,
        fill: config.basicColor,
        radius: 1.5,
        zIndex: 0,
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );

    if (cfg.dataType !== 'root') {
      /* the type text */
      otherShapes['type-text-shape'] = this.upsertShape(
        'text',
        'type-text-shape',
        {
          text: cfg.dataType,
          x: 3,
          y: -10,
          fontSize: 12,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'rgba(0,0,0,0.65)',
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );
    }

    if (cfg.ip) {
      /* ip start */
      /* ipBox */
      otherShapes['ip-container-shape'] = this.upsertShape(
        'rect',
        'ip-container-shape',
        {
          fill: nodeError ? 'rgba(0,0,0,0)' : '#fff',
          stroke: nodeError ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0)',
          radius: 2,
          cursor: 'pointer',
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );

      /* ip */
      otherShapes['ip-text-shape'] = this.upsertShape(
        'text',
        'ip-text-shape',
        {
          text: cfg.ip,
          x: 0,
          y: 19,
          fontSize: 12,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: nodeError ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.65)',
          cursor: 'pointer',
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );

      const ipBBox = otherShapes['ip-text-shape'].getBBox();
      console.log('ipBBox', ipBBox);
      /* the distance from the IP to the right is 12px */
      otherShapes['ip-text-shape'].attr({
        x: 224 - 12 - ipBBox.width,
      });
      /* ipBox */
      otherShapes['ip-container-shape'].attr({
        x: 224 - 12 - ipBBox.width - 4,
        y: ipBBox.y - 5,
        width: ipBBox.width + 8,
        height: ipBBox.height + 10,
        cursor: 'pointer',
      });

      /* a transparent shape on the IP for click listener */
      otherShapes['ip-box'] = this.upsertShape(
        'rect',
        'ip-box',
        {
          stroke: '',
          cursor: 'pointer',
          x: 224 - 12 - ipBBox.width - 4,
          y: ipBBox.y - 5,
          width: ipBBox.width + 8,
          height: ipBBox.height + 10,
          fill: '#fff',
          opacity: 0,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );

      /* copyIpLine */
      otherShapes['ip-cp-line'] = this.upsertShape(
        'rect',
        'ip-cp-line',
        {
          x: 194,
          y: 7,
          width: 1,
          height: 24,
          fill: '#E3E6E8',
          opacity: 0,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );

      /* copyIpBG */
      otherShapes['ip-cp-bg'] = this.upsertShape(
        'rect',
        'ip-cp-bg',
        {
          x: 195,
          y: 8,
          width: 22,
          height: 22,
          fill: '#FFF',
          cursor: 'pointer',
          opacity: cfg.showIcon ? 1 : 0,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );

      /* copyIpIcon */
      otherShapes['ip-cp-icon'] = this.upsertShape(
        'image',
        'ip-cp-icon',
        {
          x: 200,
          y: 13,
          height: 12,
          width: 12,
          img: 'https://os.alipayobjects.com/rmsportal/DFhnQEhHyPjSGYW.png',
          cursor: 'pointer',
          opacity: cfg.showIcon ? 1 : 0,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );

      /* a transparent rect on the icon area for click listener */
      otherShapes['ip-cp-box'] = this.upsertShape(
        'rect',
        'ip-cp-box',
        { x: 195, y: 8, width: 22, height: 22, fill: '#FFF', cursor: 'pointer', opacity: 0 },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );
      /* ip end */
    }

    /* name */
    otherShapes['name-text-shape'] = this.upsertShape(
      'text',
      'name-text-shape',
      {
        text: cfg.name,
        x: 19,
        y: 19,
        fontSize: 14,
        fontWeight: 700,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer',
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );

    /* the description text */
    otherShapes['bottom-text-shape'] = this.upsertShape(
      'text',
      'bottom-text-shape',
      {
        text: cfg.keyInfo,
        x: 19,
        y: 45,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer',
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );

    if (nodeError) {
      otherShapes['error-text-shape'] = this.upsertShape(
        'text',
        'error-text-shape',
        {
          x: 191,
          y: 62,
          text: '⚠️',
          fill: '#000',
          fontSize: 18,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );
    }

    const hasChildren = cfg.children && cfg.children.length > 0;
    const keyShapeBBox = shapeMap.keyShape.getLocalBounds();
    if (hasChildren) {
      otherShapes['marker-shape'] = this.upsertShape(
        'path',
        'markerShape',
        {
          zIndex: 10,
          cursor: 'pointer',
          stroke: '#666',
          lineWidth: 1,
          fill: '#fff',
          path: stdLib.markers.expand(keyShapeBBox.max[0] - 15, keyShapeBBox.center[1], 8),
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );
    }
    return otherShapes;
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'card-node': CardNode,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        showIcon: false,
        name: 'cardNodeApp',
        ip: '127.0.0.1',
        nodeError: true,
        dataType: 'root',
        keyInfo: 'this is a card node info',
        x: 100,
        y: 50,
      },
    },
    {
      id: 'node2',
      data: {
        showIcon: false,
        name: 'cardNodeApp',
        ip: '127.0.0.1',
        nodeError: false,
        dataType: 'subRoot',
        keyInfo: 'this is sub root',
        x: 100,
        y: 150,
      },
    },
    {
      id: 'node3',
      data: {
        showIcon: false,
        name: 'cardNodeApp',
        ip: '127.0.0.1',
        nodeError: false,
        dataType: 'subRoot',
        keyInfo: 'this is sub root',
        x: 100,
        y: 250,
        children: [
          {
            name: 'sub',
          },
        ],
      },
    },
  ],
  edges: [],
};

graph = new ExtGraph({
  container,
  width,
  height,
  autoFit: 'center',
  data,
  node: {
    type: 'card-node',
    keyShape: {
      x: 243 / 2,
      y: 32,
      width: 243,
      height: 64,
      fill: 'transport',
    },
    otherShapes: {},
  },
});

graph.on('node:pointermove', (event) => {
  const { itemId, target } = event;
  if (target.id === 'ip-container-shape') {
    graph.updateData('node', {
      id: itemId,
      data: {
        showIcon: true,
      },
    });
  }
});

graph.on('node:pointerleave', (event) => {
  const { itemId } = event;
  graph.updateData('node', {
    id: itemId,
    data: {
      showIcon: false,
    },
  });
});

window.graph = graph;