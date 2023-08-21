// @ts-nocheck

import { DisplayObject } from '@antv/g';
import { clone } from '@antv/util';
import G6, { EdgeDisplayModel, NodeDisplayModel } from '../../src/index';
import { LineEdge } from '../../src/stdlib/item/edge';
import { CircleNode } from '../../src/stdlib/item/node';
import { NodeModelData, NodeShapeMap } from '../../src/types/node';
import { extend } from '../../src/util/extend';
import { upsertShape } from '../../src/util/shape';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

const data = {
  nodes: [
    {
      id: 'node1',
      data: { x: 100, y: 200, a: 'xxx' },
    },
    {
      id: 'node2',
      data: { x: 300, y: 200 },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: { keyShape: { stroke: '#000', lineWidth: 2 } },
    },
  ],
};

class CustomNode extends CircleNode {
  public defaultStyles = {
    keyShape: {
      r: 25,
      x: 0,
      y: 0,
      fill: '#f00',
      lineWidth: 0,
      stroke: '#0f0',
    },
  };
  public drawLabelShape(
    model: NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { oldData: NodeModelData; newData: NodeModelData },
  ) {
    console.log('othsershapestyle', this.defaultStyles);
    const extraShape = upsertShape(
      'circle',
      'extraShape',
      {
        r: 4,
        fill: '#0f0',
        x: -20,
        y: 0,
        ...this.defaultStyles.otherShapes?.extraShape,
      },
      shapeMap,
      model,
    );
    const { labelShape: propsLabelStyle } = model.data;
    const labelStyle = Object.assign(
      {},
      this.defaultStyles.labelShape,
      propsLabelStyle,
    );
    const labelShape = upsertShape(
      'text',
      'labelShape',
      {
        ...labelStyle,
        text: model.id,
      },
      shapeMap,
      model,
    );
    return { labelShape, extraShape };
  }
}

class CustomEdge extends LineEdge {
  public afterDraw(
    model: EdgeDisplayModel,
    shapeMap: { [shapeId: string]: DisplayObject<any, any> },
  ): { [otherShapeId: string]: DisplayObject } {
    const { keyShape } = shapeMap;
    const styles = this.mergedStyles.runningCircle;
    return {
      runningCircle: upsertShape(
        'circle',
        'runningCircle',
        {
          ...styles,
          r: 6,
          x: 0,
          y: 0,
          fill: '#0f0',
          offsetPath: keyShape,
        },
        shapeMap,
        model,
      ),
    };
  }
}

const CustomGraph = extend(G6.Graph, {
  edges: {
    'custom-edge': CustomEdge,
  },
  nodes: {
    'custom-node': CustomNode,
  },
});

const createGraph = (props) => {
  const clonedData = clone(data);
  return new CustomGraph({
    container,
    width: 500,
    height: 500,
    data: clonedData,
    ...props,
  });
};

describe('node show up animations', () => {
  it('in the same time', (done) => {
    const graph = createGraph({
      node: (innerModel) => {
        const { x, y, keyShape = {} } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            animates: {
              show:
                innerModel.id === 'node1'
                  ? [
                      {
                        fields: ['opacity'],
                        duration: 2000,
                        shapeId: 'keyShape',
                        order: 0,
                      },
                      {
                        // fields is array, excuted in the same time
                        fields: ['transform'], // , 'size'
                        duration: 1000,
                        order: 0,
                      },
                    ]
                  : [
                      {
                        fields: ['transform'],
                        duration: 1000,
                        order: 0,
                      },
                    ],
            },
            // animate in shapes, unrelated to each other, excuted parallely
            keyShape: {
              ...keyShape,
              r: 15,
              lineDash: ['100%', 0],
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap['node1'];
      const node1KeyShapeBBox = graph.getRenderBBox('node1');
      const node2 = graph.itemController.itemMap['node2'];
      const node2KeyShapeBBox = graph.getRenderBBox('node2');
      expect(node1.shapeMap.keyShape.attributes.opacity).toBe(0);
      expect(node1KeyShapeBBox.max[0] - node1KeyShapeBBox.min[0]).toBe(0);
      expect(node2.shapeMap.keyShape.attributes.opacity).toBe(1);
      expect(node2KeyShapeBBox.max[0] - node2KeyShapeBBox.min[0]).toBe(0);
      setTimeout(() => {
        expect(node1.shapeMap.keyShape.attributes.opacity).not.toBe(0);
        expect(node1KeyShapeBBox.max[0] - node1KeyShapeBBox.min[0]).not.toBe(0);
        expect(node2KeyShapeBBox.max[0] - node2KeyShapeBBox.min[0]).not.toBe(0);
        graph.destroy();
        done();
      }, 2000);
    });
  });
  it('in order', (done) => {
    setTimeout(() => {
      const graph = createGraph({
        node: (innerModel) => {
          const { x, y, keyShape = {} } = innerModel.data;
          return {
            ...innerModel,
            data: {
              x,
              y,
              animates: {
                show: [
                  {
                    fields: ['opacity'],
                    shapeId: 'keyShape',
                    duration: 1000,
                    order: 0,
                  },
                  {
                    fields: ['lineWidth'],
                    duration: 1000,
                    shapeId: 'keyShape',
                    order: 1,
                    delay: 500,
                  },
                ],
              },
              // animate in shapes, unrelated to each other, excuted parallely
              keyShape: {
                ...keyShape,
                r: 15,
                lineDash: ['100%', 0],
                lineWidth: 5,
              },
            },
          };
        },
      });

      graph.on('afterrender', () => {
        const node1 = graph.itemController.itemMap['node1'];
        expect(node1.shapeMap.keyShape.attributes.opacity).toBe(0);
        expect(node1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
        setTimeout(() => {
          console.log('opacity', node1.shapeMap.keyShape.attributes.opacity);
          expect(node1.shapeMap.keyShape.attributes.opacity).not.toBe(0);
          expect(node1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
          setTimeout(() => {
            expect(node1.shapeMap.keyShape.attributes.lineWidth > 1).toBe(true);
            done();
          }, 2500);
        }, 1500);
      });
    }, 500);
  });
});

// edge show up animations in the same time
// edge show up animations in order
describe('edge show up animations', () => {
  it('in the same time', (done) => {
    const graph = createGraph({
      edge: (innerModel) => {
        const { keyShape = {} } = innerModel.data;
        return {
          ...innerModel,
          data: {
            keyShape: {
              ...keyShape,
              lineWidth: 4,
            },
            animates: {
              show: [
                {
                  fields: ['opacity'],
                  duration: 1000,
                  shapeId: 'keyShape',
                  order: 0,
                },
                {
                  // fields is array, excuted in the same time
                  fields: ['lineWidth'], // , 'size'
                  duration: 1000,
                  shapeId: 'keyShape',
                  order: 0,
                },
              ],
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      const edge1 = graph.itemController.itemMap['edge1'];
      expect(edge1.shapeMap.keyShape.attributes.opacity).toBe(0);
      expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
      setTimeout(() => {
        expect(edge1.shapeMap.keyShape.attributes.opacity).not.toBe(0);
        expect(edge1.shapeMap.keyShape.attributes.lineWidth).not.toBe(1);
        graph.destroy();
        done();
      }, 2000);
    });
  });
  it('in order', (done) => {
    setTimeout(() => {
      const graph = createGraph({
        edge: (innerModel) => {
          const { keyShape = {} } = innerModel.data;
          return {
            ...innerModel,
            data: {
              keyShape: {
                ...keyShape,
                lineWidth: 4,
              },
              animates: {
                show: [
                  {
                    fields: ['opacity'],
                    duration: 1000,
                    shapeId: 'keyShape',
                    order: 0,
                  },
                  {
                    // fields is array, excuted in the same time
                    fields: ['lineWidth'], // , 'size'
                    duration: 1000,
                    shapeId: 'keyShape',
                    order: 1,
                    delay: 500,
                  },
                ],
              },
            },
          };
        },
      });

      graph.on('afterrender', () => {
        const edge1 = graph.itemController.itemMap['edge1'];
        expect(edge1.shapeMap.keyShape.attributes.opacity).toBe(0);
        expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
        setTimeout(() => {
          expect(edge1.shapeMap.keyShape.attributes.opacity).not.toBe(0);
          expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
          setTimeout(() => {
            expect(edge1.shapeMap.keyShape.attributes.opacity).not.toBe(0);
            expect(edge1.shapeMap.keyShape.attributes.lineWidth > 1).toBe(true);
            graph.destroy();
            done();
          }, 2500);
        }, 1500);
      });
    }, 500);
  });
});

// node update animates in the same time
// node update animations in order
// node state update animates in the same time
// node state update animations in order

describe('node update animations', () => {
  it('update in the same time', (done) => {
    const graph = createGraph({
      node: (innerModel) => {
        const { x, y, keyShape = {} } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            animates: {
              update: [
                {
                  fields: ['x', 'y'],
                  duration: 2000,
                  shapeId: 'group',
                  order: 0,
                },
                {
                  fields: ['lineWidth'],
                  duration: 1000,
                  shapeId: 'keyShape',
                  order: 0,
                },
              ],
            },
            // animate in shapes, unrelated to each other, excuted parallely
            keyShape: {
              ...keyShape,
              r: 15,
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      setTimeout(() => {
        graph.updateData('node', {
          id: 'node1',
          data: {
            x: 300,
            y: 400,
            keyShape: {
              lineWidth: 4,
            },
          },
        });
        const node1 = graph.itemController.itemMap['node1'];
        expect(node1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
        expect(node1.group.attributes.x).toBe(100);
        expect(node1.group.attributes.y).toBe(200);
        setTimeout(() => {
          expect(node1.shapeMap.keyShape.attributes.lineWidth).not.toBe(1);
          expect(node1.group.attributes.x).not.toBe(100);
          expect(node1.group.attributes.y).not.toBe(200);
          graph.destroy();
          done();
        }, 1000);
      }, 500);
    });
  });
  it('update in order', (done) => {
    setTimeout(() => {
      const graph = createGraph({
        node: (innerModel) => {
          const { x, y, keyShape = {} } = innerModel.data;
          return {
            ...innerModel,
            data: {
              x,
              y,
              animates: {
                update: [
                  {
                    fields: ['x', 'y'],
                    duration: 2000,
                    shapeId: 'group',
                    order: 0,
                  },
                  {
                    fields: ['lineWidth'],
                    duration: 1000,
                    shapeId: 'keyShape',
                    order: 1,
                  },
                ],
              },
              // animate in shapes, unrelated to each other, excuted parallely
              keyShape: {
                ...keyShape,
                r: 15,
              },
            },
          };
        },
      });

      graph.on('afterrender', () => {
        setTimeout(() => {
          graph.updateData('node', {
            id: 'node1',
            data: {
              x: 300,
              y: 400,
              keyShape: {
                lineWidth: 4,
              },
            },
          });
          const node1 = graph.itemController.itemMap['node1'];
          expect(node1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
          expect(node1.group.attributes.x).toBe(100);
          expect(node1.group.attributes.y).toBe(200);
          setTimeout(() => {
            expect(node1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
            expect(node1.group.attributes.x).not.toBe(100);
            expect(node1.group.attributes.y).not.toBe(200);
            setTimeout(() => {
              expect(node1.shapeMap.keyShape.attributes.lineWidth).not.toBe(1);
              expect(node1.group.attributes.x).not.toBe(100);
              expect(node1.group.attributes.y).not.toBe(200);
              graph.destroy();
              done();
            }, 2000);
          }, 1000);
        }, 500);
      });
    }, 500);
  });
  it('state update in the same time', (done) => {
    const graph = createGraph({
      node: (innerModel) => {
        const { x, y, keyShape = {} } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            animates: {
              update: [
                {
                  fields: ['lineWidth'],
                  duration: 1000,
                  shapeId: 'keyShape',
                  order: 0,
                },
                {
                  fields: ['fill'],
                  duration: 1000,
                  shapeId: 'keyShape',
                  order: 0,
                },
              ],
            },
            // animate in shapes, unrelated to each other, excuted parallely
            keyShape: {
              ...keyShape,
              r: 15,
            },
          },
        };
      },
      nodeState: {
        selected: {
          keyShape: {
            lineWidth: 4,
            fill: '#f00',
          },
        },
      },
    });

    graph.on('afterrender', () => {
      setTimeout(() => {
        graph.setItemState('node1', 'selected', true);
        const node1 = graph.itemController.itemMap['node1'];
        expect(node1.shapeMap.keyShape.attributes.fill).toBe(
          'rgb(239, 244, 255)',
        );
        expect(node1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
        setTimeout(() => {
          expect(node1.shapeMap.keyShape.attributes.fill).not.toBe(
            'rgb(239, 244, 255)',
          );
          expect(node1.shapeMap.keyShape.attributes.lineWidth > 1).toBe(true);
          graph.destroy();
          done();
        }, 1000);
      }, 500);
    });
  });
  it('state update in order', (done) => {
    const graph = createGraph({
      node: (innerModel) => {
        const { x, y, keyShape = {} } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            animates: {
              update: [
                {
                  fields: ['lineWidth'],
                  duration: 1000,
                  shapeId: 'keyShape',
                  order: 0,
                },
                {
                  fields: ['fill'],
                  duration: 1000,
                  shapeId: 'keyShape',
                  order: 1,
                },
              ],
            },
            // animate in shapes, unrelated to each other, excuted parallely
            keyShape: {
              ...keyShape,
              r: 15,
            },
          },
        };
      },
      nodeState: {
        selected: {
          keyShape: {
            lineWidth: 4,
            fill: '#f00',
          },
        },
      },
    });

    graph.on('afterrender', () => {
      setTimeout(() => {
        graph.setItemState('node1', 'selected', true);
        const node1 = graph.itemController.itemMap['node1'];
        expect(node1.shapeMap.keyShape.attributes.lineWidth).toBe(1);
        expect(node1.shapeMap.keyShape.attributes.fill).toBe(
          'rgb(239, 244, 255)',
        );
        setTimeout(() => {
          expect(node1.shapeMap.keyShape.attributes.lineWidth > 1).toBe(true);
          expect(node1.shapeMap.keyShape.attributes.fill).toBe(
            'rgb(239, 244, 255)',
          );
          setTimeout(() => {
            expect(node1.shapeMap.keyShape.attributes.lineWidth > 1).toBe(true);
            expect(node1.shapeMap.keyShape.attributes.fill).toBe(
              'rgba(255,0,0,1)',
            );
            graph.destroy();
            done();
          }, 1000);
        }, 1000);
      }, 500);
    });
  });
});

// edge update animates in the same time
// edge update animations in order
// edge state update animates in the same time
// edge state update animations in order

describe('edge update animations', () => {
  it('update in the same time', (done) => {
    const graph = createGraph({
      edge: (innerModel) => {
        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            animates: {
              update: [
                {
                  fields: ['stroke'],
                  duration: 1000,
                  shapeId: 'keyShape',
                  order: 0,
                },
                {
                  fields: ['lineWidth'],
                  duration: 1000,
                  shapeId: 'keyShape',
                  order: 0,
                },
              ],
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      setTimeout(() => {
        graph.updateData('edge', {
          id: 'edge1',
          data: {
            keyShape: {
              lineWidth: 4,
              stroke: '#f00',
            },
          },
        });
        const edge1 = graph.itemController.itemMap['edge1'];
        expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#000');
        expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(2);
        setTimeout(() => {
          expect(edge1.shapeMap.keyShape.attributes.stroke).not.toBe('#000');
          expect(edge1.shapeMap.keyShape.attributes.lineWidth > 1).toBe(true);
          graph.destroy();
          done();
        }, 1000);
      }, 500);
    });
  });
  it('update in order', (done) => {
    setTimeout(() => {
      const graph = createGraph({
        edge: (innerModel) => {
          return {
            ...innerModel,
            data: {
              ...innerModel.data,
              animates: {
                update: [
                  {
                    fields: ['stroke'],
                    duration: 1000,
                    shapeId: 'keyShape',
                    order: 0,
                  },
                  {
                    fields: ['lineWidth'],
                    duration: 1000,
                    shapeId: 'keyShape',
                    order: 1,
                  },
                ],
              },
            },
          };
        },
      });

      graph.on('afterrender', () => {
        setTimeout(() => {
          graph.updateData('edge', {
            id: 'edge1',
            data: {
              keyShape: {
                lineWidth: 4,
                stroke: '#f00',
              },
            },
          });
          const edge1 = graph.itemController.itemMap['edge1'];
          expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#000');
          expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(2);
          setTimeout(() => {
            expect(edge1.shapeMap.keyShape.attributes.stroke).not.toBe('#000');
            setTimeout(() => {
              expect(edge1.shapeMap.keyShape.attributes.stroke).not.toBe(
                '#000',
              );
              expect(edge1.shapeMap.keyShape.attributes.lineWidth > 1).toBe(
                true,
              );
              graph.destroy();
              done();
            }, 1000);
          }, 1000);
        }, 500);
      });
    }, 1000);
  });
  it('state update in the same time', (done) => {
    const graph = createGraph({
      edge: (innerModel) => {
        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            animates: {
              update: [
                {
                  fields: ['stroke'],
                  duration: 1000,
                  states: ['selected'],
                  shapeId: 'keyShape',
                  order: 0,
                },
                {
                  fields: ['lineWidth'],
                  duration: 1000,
                  states: ['selected'],
                  shapeId: 'keyShape',
                  order: 0,
                },
              ],
            },
          },
        };
      },
      edgeState: {
        selected: {
          keyShape: {
            lineWidth: 4,
            stroke: '#f00',
          },
        },
      },
    });

    graph.on('afterrender', () => {
      setTimeout(() => {
        graph.setItemState('edge1', 'selected', true);
        const edge1 = graph.itemController.itemMap['edge1'];
        expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#000');
        expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(2);
        setTimeout(() => {
          expect(edge1.shapeMap.keyShape.attributes.stroke).not.toBe('#000');
          expect(edge1.shapeMap.keyShape.attributes.lineWidth).not.toBe(2);
          graph.destroy();
          done();
        }, 1000);
      }, 500);
    });
  });
  it('state update in order', (done) => {
    const graph = createGraph({
      edge: (innerModel) => {
        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            animates: {
              update: [
                {
                  fields: ['stroke'],
                  duration: 1000,
                  states: ['selected'],
                  shapeId: 'keyShape',
                  order: 0,
                },
                {
                  fields: ['lineWidth'],
                  duration: 1000,
                  states: ['selected'],
                  shapeId: 'keyShape',
                  order: 1,
                },
              ],
            },
          },
        };
      },
      edgeState: {
        selected: {
          keyShape: {
            lineWidth: 4,
            stroke: '#f00',
          },
        },
      },
    });

    graph.on('afterrender', () => {
      setTimeout(() => {
        graph.setItemState('edge1', 'selected', true);
        const edge1 = graph.itemController.itemMap['edge1'];
        expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#000');
        expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(2);
        setTimeout(() => {
          expect(edge1.shapeMap.keyShape.attributes.stroke).not.toBe('#000');
          expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(2);
          setTimeout(() => {
            expect(edge1.shapeMap.keyShape.attributes.stroke).not.toBe('#000');
            expect(edge1.shapeMap.keyShape.attributes.lineWidth).not.toBe(2);
            graph.destroy();
            done();
          }, 1000);
        }, 1000);
      }, 500);
    });
  });
});

// node show up animates broke by update animates
// node update animates broke by update animates
describe('node show up animations', () => {
  it('show up broke by update', (done) => {
    const graph = createGraph({
      node: (innerModel) => {
        const { x, y, keyShape = {} } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            animates: {
              show: [
                {
                  fields: ['opacity'],
                  shapeId: 'keyShape',
                  duration: 2000,
                  order: 0,
                },
              ],
              update: [
                {
                  fields: ['fill'],
                  shapeId: 'keyShape',
                  duration: 500,
                  order: 0,
                },
              ],
            },
            keyShape: {
              ...keyShape,
              r: 15,
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap['node1'];
      expect(node1.shapeMap.keyShape.attributes.opacity).toBe(0);
      expect(node1.shapeMap.keyShape.attributes.fill).toBe(
        'rgb(239, 244, 255)',
      );
      setTimeout(() => {
        graph.updateData('node', {
          id: 'node1',
          data: {
            keyShape: {
              fill: '#f00',
            },
          },
        });
        // to the end of show immediatly
        expect(node1.shapeMap.keyShape.attributes.opacity).toBe(1);
        setTimeout(() => {
          expect(node1.shapeMap.keyShape.attributes.opacity).toBe(1);
          expect(node1.shapeMap.keyShape.attributes.fill).not.toBe(
            'rgb(239, 244, 255)',
          );
          graph.destroy();
          done();
        }, 1000);
      }, 500);
    });
  });
  it('update broke by update', (done) => {
    const graph = createGraph({
      node: (innerModel) => {
        const { x, y, keyShape = {} } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            animates: {
              update: [
                {
                  fields: ['fill'],
                  shapeId: 'keyShape',
                  duration: 500,
                  order: 0,
                },
              ],
            },
            keyShape: {
              ...keyShape,
              r: 15,
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap['node1'];
      expect(node1.shapeMap.keyShape.attributes.fill).toBe(
        'rgb(239, 244, 255)',
      );
      graph.updateData('node', {
        id: 'node1',
        data: {
          keyShape: {
            fill: '#f00',
          },
        },
      });
      expect(node1.shapeMap.keyShape.attributes.fill).toBe(
        'rgb(239, 244, 255)',
      );
      setTimeout(() => {
        graph.updateData('node', {
          id: 'node1',
          data: {
            keyShape: {
              fill: '#0f0',
            },
          },
        });
        // to the end of show immediatly
        expect(node1.shapeMap.keyShape.attributes.fill).toBe('#f00');
        setTimeout(() => {
          expect(node1.shapeMap.keyShape.attributes.fill).not.toBe('#f00');
          graph.destroy();
          done();
        }, 1000);
      }, 500);
    });
  });
});

// edge show up animates broke by update animates
// edge update animates broke by update animates
describe('edge show up animations', () => {
  it('show up broke by update', (done) => {
    const graph = createGraph({
      edge: (innerModel) => {
        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            animates: {
              show: [
                {
                  fields: ['opacity'],
                  shapeId: 'keyShape',
                  duration: 2000,
                  order: 0,
                },
              ],
              update: [
                {
                  fields: ['stroke'],
                  shapeId: 'keyShape',
                  duration: 500,
                  order: 0,
                },
              ],
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      const edge1 = graph.itemController.itemMap['edge1'];
      expect(edge1.shapeMap.keyShape.attributes.opacity).toBe(0);
      expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#000');
      setTimeout(() => {
        graph.updateData('edge', {
          id: 'edge1',
          data: {
            keyShape: {
              stroke: '#f00',
            },
          },
        });
        // to the end of show immediatly
        expect(edge1.shapeMap.keyShape.attributes.opacity).toBe(1);
        setTimeout(() => {
          expect(edge1.shapeMap.keyShape.attributes.opacity).toBe(1);
          expect(edge1.shapeMap.keyShape.attributes.stroke).not.toBe('#000');
          graph.destroy();
          done();
        }, 1000);
      }, 500);
    });
  });
  it('update broke by update', (done) => {
    const graph = createGraph({
      edge: (innerModel) => {
        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            animates: {
              update: [
                {
                  fields: ['stroke'],
                  shapeId: 'keyShape',
                  duration: 500,
                },
              ],
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      const edge1 = graph.itemController.itemMap['edge1'];
      expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#000');
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          keyShape: {
            stroke: '#f00',
          },
        },
      });
      expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#000');
      setTimeout(() => {
        graph.updateData('edge', {
          id: 'edge1',
          data: {
            keyShape: {
              stroke: '#0f0',
            },
          },
        });
        // to the end of show immediatly
        expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#f00');
        setTimeout(() => {
          expect(edge1.shapeMap.keyShape.attributes.stroke).not.toBe('#f00');
          graph.destroy();
          done();
        }, 1000);
      }, 500);
    });
  });
});

// custom node animates
describe('custom node animations', () => {
  it('show up', (done) => {
    const graph = createGraph({
      node: (innerModel) => {
        const { x, y, keyShape = {} } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            type: 'custom-node',
            animates: {
              show: [
                {
                  fields: ['opacity'],
                  shapeId: 'extraShape',
                  duration: 1000,
                  order: 0,
                },
              ],
            },
            // animate in shapes, unrelated to each other, excuted parallely
            keyShape,
            labelShape: {
              text: 'node-label',
            },
            otherShapes: {
              extraShape: {
                opacity: 1,
              },
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap['node1'];
      expect(node1.shapeMap.extraShape.attributes.opacity).toBe(0);
      setTimeout(() => {
        expect(node1.shapeMap.keyShape.attributes.opacity > 0).toBe(true);
        graph.destroy();
        done();
      }, 1500);
    });
  });
});

// custom edge animates
describe('custom node animations', () => {
  it('show up', (done) => {
    const graph = createGraph({
      edge: (innerModel) => {
        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            type: 'custom-edge',
            animates: {
              show: [
                {
                  fields: ['offsetDistance'],
                  shapeId: 'runningCircle',
                  duration: 1000,
                  order: 0,
                  // iterations: Infinity is not encouraged at show animations, because it cannot be stopped. Use 'update' instead
                  iterations: Infinity,
                },
              ],
            },
            otherShapes: {
              runningCircle: {
                offsetDistance: 1,
                // display: 'none',
              },
            },
          },
        };
      },
    });

    graph.on('afterrender', () => {
      const edge1 = graph.itemController.itemMap['edge1'];
      expect(edge1.shapeMap.runningCircle.attributes.offsetDistance).toBe(0);
      setTimeout(() => {
        const currentOffsetDistance =
          edge1.shapeMap.runningCircle.attributes.offsetDistance;
        expect(currentOffsetDistance).not.toBe(0);
        setTimeout(() => {
          expect(
            edge1.shapeMap.runningCircle.attributes.offsetDistance,
          ).not.toBe(currentOffsetDistance);
          graph.destroy();
          done();
        }, 200);
      }, 500);
    });
  });
});

// node position animates affects edges
describe('node update position with edges', () => {
  it('node update position with edges', (done) => {
    const graph = createGraph({
      node: (innerModel) => {
        const { x, y, keyShape = {} } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            animates: {
              update: [
                {
                  fields: ['x'],
                  duration: 500,
                  order: 0,
                },
                {
                  fields: ['y'],
                  duration: 1000,
                  order: 0,
                },
              ],
            },
          },
        };
      },
      nodeState: {
        selected: {
          keyShape: {
            lineWidth: 4,
            fill: '#f00',
          },
        },
      },
    });
    const oriData = clone(data);

    graph.on('afterrender', () => {
      const edge = graph.itemController.itemMap['edge1'];
      let { keyShape: edgeKeyShape } = edge.shapeMap;
      expect(edgeKeyShape.attributes.x1).toBe(oriData.nodes[0].data.x);
      expect(edgeKeyShape.attributes.y1).toBe(oriData.nodes[0].data.y);
      expect(edgeKeyShape.attributes.x2).toBe(oriData.nodes[1].data.x);
      expect(edgeKeyShape.attributes.y2).toBe(oriData.nodes[1].data.y);
      graph.updateData('node', {
        id: 'node1',
        data: {
          x: 200,
          y: 300,
        },
      });
      graph.updateData('node', {
        id: 'node2',
        data: {
          x: 100,
          y: 100,
        },
      });
      setTimeout(() => {
        const node1 = graph.itemController.itemMap['node1'];
        expect(node1.model.data.x).not.toBe(oriData.nodes[0].data.x);
        const node2 = graph.itemController.itemMap['node2'];
        expect(node2.model.data.x).not.toBe(oriData.nodes[1].data.x);
        edgeKeyShape = edge.shapeMap.keyShape;
        expect(edgeKeyShape.attributes.x1).not.toBe(oriData.nodes[0].data.x);
        expect(edgeKeyShape.attributes.x2).not.toBe(oriData.nodes[1].data.x);
        setTimeout(() => {
          expect(node1.model.data.y).not.toBe(oriData.nodes[0].data.y);
          expect(node2.model.data.y).not.toBe(oriData.nodes[1].data.y);
          expect(edgeKeyShape.attributes.y1).not.toBe(oriData.nodes[0].data.y);
          expect(edgeKeyShape.attributes.y2).not.toBe(oriData.nodes[1].data.y);
          graph.destroy();
          done();
        }, 500);
      }, 500);
    });
  });
});
