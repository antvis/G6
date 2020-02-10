import G6 from '@antv/g6';

const data = {
  nodes: [{
    id: '1',
    dataType: 'alps',
    name: 'alps_file1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '2',
    dataType: 'alps',
    name: 'alps_file2',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '3',
    dataType: 'alps',
    name: 'alps_file3',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '4',
    dataType: 'sql',
    name: 'sql_file1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '5',
    dataType: 'sql',
    name: 'sql_file2',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '6',
    dataType: 'feature_etl',
    name: 'feature_etl_1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '7',
    dataType: 'feature_etl',
    name: 'feature_etl_1',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  },
  {
    id: '8',
    dataType: 'feature_extractor',
    name: 'feature_extractor',
    conf: [{
      label: 'conf',
      value: 'pai_graph.conf'
    },
    {
      label: 'dot',
      value: 'pai_graph.dot'
    },
    {
      label: 'init',
      value: 'init.rc'
    }]
  }],
  edges: [{
    source: '1',
    target: '2'
  },
  {
    source: '1',
    target: '3'
  },
  {
    source: '2',
    target: '4'
  },
  {
    source: '3',
    target: '4'
  },
  {
    source: '4',
    target: '5'
  },
  {
    source: '5',
    target: '6'
  },
  {
    source: '6',
    target: '7'
  },
  {
    source: '6',
    target: '8'
  }]
};

G6.registerNode('sql', {
  drawShape(cfg, group) {
    const rect = group.addShape('rect', {
      attrs: {
        x: -75,
        y: -25,
        width: 150,
        height: 50,
        radius: 10,
        stroke: '#5B8FF9',
        fill: '#C6E5FF',
        lineWidth: 3
      },
      name: 'rect-shape'
    });
    if (cfg.name) {
      group.addShape('text', {
        attrs: {
          text: cfg.name,
          x: 0,
          y: 0,
          fill: '#00287E',
          fontSize: 14,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 'bold'
        },
        name: 'text-shape'
      });
    }
    return rect;
  }
},
'single-node');
G6.Global.nodeStateStyle.selected = {
  stroke: '#d9d9d9',
  fill: '#5394ef'
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'dagre',
    nodesepFunc: d => {
      if (d.id === '3') {
        return 500;
      }
      return 50;
    },
    ranksep: 70
  },
  defaultNode: {
    type: 'sql'
  },
  defaultEdge: {
    type: 'polyline',
    style: {
      radius: 20,
      offset: 45,
      endArrow: true,
      lineWidth: 2,
      stroke: '#C2C8D5'
    }
  },
  modes: {
    default: [ 'drag-canvas', 'zoom-canvas', 'click-select', {
      type: 'tooltip',
      formatText(model) {
        const cfg = model.conf;
        const text = [];
        cfg.forEach(row => {
          text.push(row.label + ':' + row.value + '<br>');
        });
        return text.join('\n');
      },
      shouldUpdate: e => {
        // 如果移动到节点文本上显示，不是文本上不显示
        if (e.target.type !== 'text') {
          return false;
        }
        return true;
      }
    }]
  },
  fitView: true
});
graph.data(data);
graph.render();
