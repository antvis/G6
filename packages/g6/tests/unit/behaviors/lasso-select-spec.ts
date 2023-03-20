import G6 from '../../../src/index'
const container = document.createElement('div');
document.querySelector('body').appendChild(container);


describe('lasso-select behavior with selectSetMode', () => {
  it('lasso-select with default selectSetMode: latest', (done) => {
    let times = 0;
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          onSelect: (selectedIds) => {
            if (times === 0 || times === 2) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            } else {
              expect(selectedIds.nodes.length).toBe(2);
              expect(selectedIds.edges.length).toBe(1);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(2);
              expect(selectedEdges.length).toBe(1);
            }
          },
          onDeselect: (selectedIds, deselectedIds) => {
            if (times === 0) {
              expect(selectedIds.nodes.length).toBe(0);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedEdges.length).toBe(0);
              expect(selectedNodes.length).toBe(0);
            } else if (times === 2) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            }
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 }, shiftKey: true });
      // expect in onSelect
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect in onDeselect

      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 }, shiftKey: true });
      // expect in onSelect

      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect in onSelect

      graph.destroy();
      done();
    });

  });
  it('lasso-select with selectSetMode: diff', (done) => {
    let times = 0;
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          selectSetMode: 'diff',
          onSelect: (selectedIds) => {
            if (times === 0) {
              expect(selectedIds.nodes.length).toBe(2);
              expect(selectedIds.edges.length).toBe(1);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(2);
              expect(selectedEdges.length).toBe(1);
            } else {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.nodes[0]).toBe('node2');
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            }
          },
          onDeselect: (selectedIds, deslectedIds) => {
             if (times === 1) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.nodes[0]).toBe('node2');
              expect(selectedIds.edges.length).toBe(0);

              expect(deslectedIds.nodes.length).toBe(1);
              expect(deslectedIds.nodes[0]).toBe('node1');
              expect(deslectedIds.edges.length).toBe(1);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            }
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      // select two nodes
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 100, y: 250 }, shiftKey: true });
      // expect in onSelect

      // brush one of the selected nodes, the brushed one will be deselect
      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect in onSelect

      graph.destroy();
      done();
    });
  });
  it('lasso-select with selectSetMode: union', (done) => {
    let times = 0;
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          selectSetMode: 'union',
          onSelect: (selectedIds) => {
            if (times === 0) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            } else {
              expect(selectedIds.nodes.length).toBe(2);
              expect(selectedIds.edges.length).toBe(1);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(2);
              expect(selectedEdges.length).toBe(1);
            }
          },
          onDeselect: (selectedIds, deslectedIds) => {
            expect(selectedIds.nodes.length).toBe(0);
            expect(selectedIds.edges.length).toBe(0);

            expect(deslectedIds.nodes.length).toBe(2);
            expect(deslectedIds.edges.length).toBe(1);

            const selectedNodes = graph.findIdByState('node', 'selected');
            const selectedEdges = graph.findIdByState('edge', 'selected');
            expect(selectedNodes.length).toBe(0);
            expect(selectedEdges.length).toBe(0);
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      // select one nodes
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: {x: 100, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: {x: 200, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect in onSelect

      // brush other one nodes, all the nodes and edges will be selected
      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 250 }, shiftKey: true });
      // expect in onSelect
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });

      graph.destroy();
      done();
    });
  });
  it('lasso-select with selectSetMode: intersect', (done) => {
    let times = 0;
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          selectSetMode: 'intersect',
          onSelect: (selectedIds) => {
            if (times === 0 || times === 3) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            } else if (times === 1) {
              expect(selectedIds.nodes.length).toBe(0);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(0);
              expect(selectedEdges.length).toBe(0);
            } else if (times === 2) {
              expect(selectedIds.nodes.length).toBe(2);
              expect(selectedIds.edges.length).toBe(1);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(2);
              expect(selectedEdges.length).toBe(1);
            }
          },
          onDeselect: (selectedIds, deslectedIds) => {
            if (times === 3) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
  
              expect(deslectedIds.nodes.length).toBe(1);
              expect(deslectedIds.edges.length).toBe(1);
  
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            } else {
              expect(selectedIds.nodes.length).toBe(0);
              expect(selectedIds.edges.length).toBe(0);
  
              expect(deslectedIds.nodes.length).toBe(1);
              expect(deslectedIds.edges.length).toBe(0);
  
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(0);
              expect(selectedEdges.length).toBe(0);
            }
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      // select one nodes
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect in onSelect

      // brush other one nodes, intersect set will be empty
      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 250 }, shiftKey: true });

      // brush all
      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 }, shiftKey: true });
      
      // brush one of it
      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 250 }, shiftKey: true });

      graph.destroy();
      done();
    });
  });
});


describe('lasso-select behavior with itemTypes', () => {
  it('lasso-select with itemTypes: [node]', (done) => {
    let times = 0;
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          itemTypes: ['node'],
          onSelect: (selectedIds) => {
            if (times === 0 || times === 2) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            } else {
              expect(selectedIds.nodes.length).toBe(2);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(2);
              expect(selectedEdges.length).toBe(0);
            }
          },
          onDeselect: (selectedIds, deselectedIds) => {
            if (times === 0) {
              expect(selectedIds.nodes.length).toBe(0);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedEdges.length).toBe(0);
              expect(selectedNodes.length).toBe(0);
            } else if (times === 2) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            }
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 100, y: 150 }, shiftKey: true });
      // expect in onSelect
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect in onDeselect

      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 }, shiftKey: true });
      // expect in onSelect

      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 100, y: 150 }, shiftKey: true });
      // expect in onSelect

      graph.destroy();
      done();
    });

  });
  it('lasso-select with itemTypes: [edge]', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          itemTypes: ['edge'],
          onSelect: (selectedIds) => {
            expect(selectedIds.nodes.length).toBe(0);
            expect(selectedIds.edges.length).toBe(1);
            const selectedNodes = graph.findIdByState('node', 'selected');
            const selectedEdges = graph.findIdByState('edge', 'selected');
            expect(selectedNodes.length).toBe(0);
            expect(selectedEdges.length).toBe(1);
          },
          onDeselect: (selectedIds, deselectedIds) => {
            expect(deselectedIds.nodes.length).toBe(0);
            expect(deselectedIds.edges.length).toBe(1);

            const selectedNodes = graph.findIdByState('node', 'selected');
            const selectedEdges = graph.findIdByState('edge', 'selected');
            expect(selectedEdges.length).toBe(0);
            expect(selectedNodes.length).toBe(0);
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 250 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 }, shiftKey: true });
      // expect in onSelect
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect in onDeselect

      graph.destroy();
      done();
    });

  });
  it('lasso-select with itemTypes: []', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          itemTypes: [],
          onSelect: (selectedIds) => {
            expect(selectedIds.nodes.length).toBe(0);
            expect(selectedIds.edges.length).toBe(0);
            const selectedNodes = graph.findIdByState('node', 'selected');
            const selectedEdges = graph.findIdByState('edge', 'selected');
            expect(selectedNodes.length).toBe(0);
            expect(selectedEdges.length).toBe(0);
          },
          onDeselect: (selectedIds, deselectedIds) => {
            expect(deselectedIds.nodes.length).toBe(0);
            expect(deselectedIds.edges.length).toBe(0);

            const selectedNodes = graph.findIdByState('node', 'selected');
            const selectedEdges = graph.findIdByState('edge', 'selected');
            expect(selectedEdges.length).toBe(0);
            expect(selectedNodes.length).toBe(0);
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 250 }, shiftKey: true });
      // expect in onSelect
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect in onDeselect

      graph.destroy();
      done();
    });

  });
});

describe('lasso-select behavior with trigger', () => {
  it('lasso-select with trigger: drag', (done) => {
    let times = 0;
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          trigger: 'drag',
          onSelect: (selectedIds) => {
            if (times === 0 || times === 2) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            } else {
              expect(selectedIds.nodes.length).toBe(2);
              expect(selectedIds.edges.length).toBe(1);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(2);
              expect(selectedEdges.length).toBe(1);
            }
          },
          onDeselect: (selectedIds, deselectedIds) => {
            if (times === 0) {
              expect(selectedIds.nodes.length).toBe(0);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedEdges.length).toBe(0);
              expect(selectedNodes.length).toBe(0);
            } else if (times === 2) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            }
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      graph.emit('canvas:pointerdown', { canvas: { x: 100, y: 50 } });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 } });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 } });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 } });
      // expect in onSelect
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 } });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 } });
      // expect in onDeselect

      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 } });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 } });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 250 } });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 } });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 } });
      // expect in onSelect

      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 } });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 } });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 } });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 } });
      // expect in onSelect

      graph.destroy();
      done();
    });

  });
  it('lasso-select with trigger: ctrl', (done) => {
    let times = 0;
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          trigger: 'ctrl',
          onSelect: (selectedIds) => {
            if (times === 0 || times === 2) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            } else {
              expect(selectedIds.nodes.length).toBe(2);
              expect(selectedIds.edges.length).toBe(1);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(2);
              expect(selectedEdges.length).toBe(1);
            }
          },
          onDeselect: (selectedIds, deselectedIds) => {
            if (times === 0) {
              expect(selectedIds.nodes.length).toBe(0);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedEdges.length).toBe(0);
              expect(selectedNodes.length).toBe(0);
            } else if (times === 2) {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            }
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      graph.emit('canvas:pointerdown', { canvas: { x: 100, y: 50 }, ctrlKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, ctrlKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, ctrlKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 }, ctrlKey: true });
      // expect in onSelect
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, ctrlKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, ctrlKey: true });
      // expect in onDeselect

      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, ctrlKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 100, y: 250 }, ctrlKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 250 }, ctrlKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, ctrlKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 }, ctrlKey: true });
      // expect in onSelect

      times ++;
      graph.emit('canvas:pointerdown', { canvas: {x: 100, y: 50 }, ctrlKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, ctrlKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, ctrlKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 50 }, ctrlKey: true });
      // expect in onSelect

      graph.destroy();
      done();
    });

  });
});

describe('lasso-select behavior with shouldBegin and shouldUpdate', () => {
  it('lasso-select with shouldBegin, shouldUpdate', (done) => {
    let times = 0;
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          shouldBegin: (evt) => {
            const { canvas } = evt;
            if (canvas.x === 0 && canvas.y === 0) return false;
            return true;
          },
          shouldUpdate: (itemType, id, action, behavior) => {
            if (id === 'node1') return false;
            return true;
          },
          onSelect: (selectedIds) => {
            if (times === 0) {
              expect(selectedIds.nodes.length).toBe(0);
              expect(selectedIds.nodes[0]).toBe('node2');
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(0);
              expect(selectedEdges.length).toBe(0);
            } else {
              expect(selectedIds.nodes.length).toBe(1);
              expect(selectedIds.nodes[0]).toBe('node2');
              expect(selectedIds.edges.length).toBe(0);
              const selectedNodes = graph.findIdByState('node', 'selected');
              const selectedEdges = graph.findIdByState('edge', 'selected');
              expect(selectedNodes.length).toBe(1);
              expect(selectedEdges.length).toBe(0);
            }
          },
          onDeselect: (selectedIds, deselectedIds) => {
            expect(selectedIds.nodes.length).toBe(0);
            expect(selectedIds.edges.length).toBe(0);
            const selectedNodes = graph.findIdByState('node', 'selected');
            const selectedEdges = graph.findIdByState('edge', 'selected');
            expect(selectedEdges.length).toBe(0);
            expect(selectedNodes.length).toBe(0);
          },
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      graph.emit('canvas:pointerdown', { canvas: { x: 0, y: 0 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 250 }, shiftKey: true })

      times ++;
      graph.emit('canvas:pointerdown', { canvas: { x: 100, y: 200 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 300 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 200 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 200 }, shiftKey: true });

      // expect in onSelect
      graph.emit('canvas:pointerdown', { canvas: {x: 0, y: 0 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // deselect faild, block by should begin
      expect(graph.findIdByState('node', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      graph.emit('canvas:pointerdown', { canvas: {x: 200, y: 0 }, shiftKey: true });
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect in onDeselect
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);

      graph.destroy();
      done();
    });

  });
});


describe('lasso-select behavior with brushStyle', () => {
  it('lasso-select with brushStyle', (done) => {
    let times = 0;
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      layout: {
        type: 'grid'
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
       },
      modes: {
        default: [{
          key: 'x',
          type: 'lasso-select',
          brushStyle: {
            fill: '#f00',
            fillOpacity: 0.5
          }
        }]
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#000'
          }
        }
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#000'
          }
        }
      }
    });

    graph.on('afterlayout', e => {
      graph.emit('canvas:pointerdown', { canvas: { x: 0, y: 0 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      graph.emit('canvas:pointermove', { canvas: { x: 200, y: 50 }, shiftKey: true });
      // console.log('root', graph.transientCanvas.getRoot())
      expect(graph.transientCanvas.getRoot().childNodes.length).toBe(1);
      expect(graph.transientCanvas.getRoot().childNodes[0].config.id).toBe('g6-lasso-select-brush-shape');
      expect(graph.transientCanvas.getRoot().childNodes[0].style.fill).toBe('#f00');
      expect(graph.transientCanvas.getRoot().childNodes[0].style.fillOpacity).toBe(0.5);
      graph.emit('canvas:pointerup', { canvas: { x: 200, y: 150 }, shiftKey: true });
      expect(graph.transientCanvas.getRoot().childNodes.length).toBe(0);

      // TODO: wait for correct removeBehaviors
      // graph.emit('canvas:pointerdown', { canvas: { x: 0, y: 0 }, shiftKey: true });
      // graph.emit('canvas:pointermove', { canvas: { x: 200, y: 150 }, shiftKey: true });
      // expect(graph.transientCanvas.getRoot().childNodes.length).toBe(1);
      // graph.removeBehaviors(['x'], 'default');
      // expect(graph.transientCanvas.getRoot().childNodes.length).toBe(0);
      graph.destroy();
      done();
    });
  });
});