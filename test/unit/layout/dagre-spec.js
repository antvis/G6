const expect = require('chai').expect;
// const G6 = require('../../../src');
const G6 = require('../../../src');
// const data = require('./data');

const div = document.createElement('div');
div.id = 'dagre';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: '2',
      type: 'alps',
      name: 'alps_file2',
      label: '2',
      conf: [
        {
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
        }
      ]
    },
    {
      id: '1',
      type: 'alps',
      name: 'alps_file1',
      label: '1',
      conf: [
        {
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
        }
      ]
    },
    {
      id: '4',
      type: 'sql',
      name: 'sql_file1',
      label: '4',
      conf: [
        {
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
        }
      ]
    },
    {
      id: '5',
      type: 'sql',
      name: 'sql_file2',
      label: '5',
      conf: [
        {
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
        }
      ]
    },
    {
      id: '6',
      type: 'feature_etl',
      name: 'feature_etl_1',
      label: '6',
      conf: [
        {
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
        }
      ]
    },
    {
      id: '3',
      type: 'alps',
      name: 'alps_file3',
      label: '3',
      conf: [
        {
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
        }
      ]
    },
    {
      id: '7',
      type: 'feature_etl',
      name: 'feature_etl_1',
      label: '7',
      conf: [
        {
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
        }
      ]
    },
    {
      id: '8',
      type: 'feature_extractor',
      name: 'feature_extractor',
      label: '8',
      conf: [
        {
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
        }
      ]
    }
  ],
  edges: [
    {
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
      source: '7',
      target: '8'
    }
  ]
};

function mathEqual(a, b) {
  return Math.abs(a - b) < 1;
}

describe.only('dagre layout', () => {
  it('layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'dagre'
      },
      width: 500,
      height: 500,
      fitView: true
    });
    graph.data(data);
    graph.render();
    const node = data.nodes[0];
    const edge = data.edges[0];
    expect(mathEqual(node.x, 215));
    expect(mathEqual(node.y, 196));
    expect(mathEqual(edge.startPoint.x, 522));
    expect(mathEqual(edge.startPoint.y, 440));
    expect(mathEqual(edge.endPoint.x, 765));
    expect(mathEqual(edge.endPoint.y, 498));
    graph.destroy();
  });
  it('modify configs', () => {
    data.edges.forEach(edge => {
      delete edge.startPoint;
      delete edge.endPoint;
      delete edge.controlPoints;
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        marginx: 100,
        marginy: 100,
        controlPoints: false
      },
      width: 500,
      height: 500,
      fitView: true
    });
    graph.data(data);
    graph.render();

    const node = data.nodes[0];
    const edge = data.edges[0];
    expect(mathEqual(node.x, 600));
    expect(mathEqual(node.y, 1075));
    expect(mathEqual(edge.startPoint.x, 531));
    expect(mathEqual(edge.startPoint.y, 594));
    expect(mathEqual(edge.endPoint.x, 597));
    expect(mathEqual(edge.endPoint.y, 854));
    expect(edge.controlPoints).to.be.undefined;
    graph.destroy();
  });
});
