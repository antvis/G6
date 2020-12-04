import G6 from '../../../src';
import TimeBar from '../../../src/plugins/timeBar'
const div = document.createElement('div');
div.id = 'timebar-plugin';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      x: 100,
      y: 100,
    },
    {
      id: 'node2',
      label: 'node2',
      x: 150,
      y: 300,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

for (let i = 0; i < 100; i++) {
  const id = `node-${i}`;
  data.nodes.push({
    id,
    label: `node${i}`,
    date: i,
    value: Math.round(Math.random() * 300),
  });

  data.edges.push({
    source: `node-${Math.round(Math.random() * 90)}`,
    target: `node-${Math.round(Math.random() * 90)}`,
  });
}

describe('timeline play with timebar', () => {
  it('trend timebar', () => {

    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      timeBarData.push({
        date: parseInt(`2020${month}${day}`),
        value: Math.round(Math.random() * 300),
      });
    }

    const intervalData = []
    for (let i = 0; i < 50; i++) {
      intervalData.push({
        date: i,
        value: Math.round(Math.random() * 300),
      });
    }

    const timeLine = new TimeBar({
      x: 0,
      y: 0,
      width: 500,
      height: 150,
      padding: 10,
      type: 'trend',
      trend: {
        data: timeBarData,
        isArea: true,
        // areaStyle: {
        //   fill: 'pink'
        // },
        lineStyle: {
          stroke: 'green',
          lineWidth: 1
        },
        interval: {
          data: intervalData.map(d => d.value),
          style: {
            // stroke: '#ccc',
            fill: '#ccc'
          }
        }
      },
      slider: {
        // height: 50,

        // backgroundStyle: {
        //   fill: 'blue',
        //   opacity: 0.2
        // },
        // foregroundStyle: {
        //   fill: 'yellow'
        // },
        textStyle: {
          fill: 'red',
          fontSize: 16,
        },
        // handlerStyle: {
        //   style: {
        //     fill: '#1890ff',
        //     stroke: '#1890ff'
        //   }
        // }
      }
      // loop: true
    })
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      // renderer: 'svg',
      plugins: [timeLine],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultEdge: {
        style: {
          lineAppendWidth: 20,
        },
      },
    });

    graph.data(data);
    graph.render();
    // graph.on('sliderchange', evt => {
    //   console.log('范围', evt)
    // })

    // graph.on('timelinechange', evt => {
    //   console.log('timeline', evt)
    // })
  })

  it('simple timebar', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100
        }
      ]
    }
    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      timeBarData.push({
        date: parseInt(`2020${month}${day}`),
        value: Math.round(Math.random() * 300),
      });
    }
    const intervalData = []
    for (let i = 0; i < 50; i++) {
      intervalData.push({
        date: i,
        value: Math.round(Math.random() * 300),
      });
    }

    const timeLine = new TimeBar({
      x: 0,
      y: 0,
      width: 500,
      height: 150,
      padding: 10,
      type: 'trend',
      trend: {
        data: timeBarData,
        isArea: true,
        // areaStyle: {
        //   fill: 'pink'
        // },
        lineStyle: {
          stroke: 'green',
          lineWidth: 1
        },
        interval: {
          data: intervalData.map(d => d.value),
          style: {
            // stroke: '#ccc',
            fill: '#ccc'
          }
        }
      },
      slider: {
        // height: 50,

        // backgroundStyle: {
        //   fill: 'blue',
        //   opacity: 0.2
        // },
        // foregroundStyle: {
        //   fill: 'yellow'
        // },
        textStyle: {
          fill: 'red',
          fontSize: 16,
        },
        // handlerStyle: {
        //   style: {
        //     fill: '#1890ff',
        //     stroke: '#1890ff'
        //   }
        // }
      }
      // loop: true
    })
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      // renderer: 'svg',
      plugins: [timeLine],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultEdge: {
        style: {
          lineAppendWidth: 20,
        },
      },
    });

    graph.data(data);
    graph.render();
    // graph.on('sliderchange', evt => {
    //   console.log('范围', evt)
    // })

    // graph.on('timelinechange', evt => {
    //   console.log('timeline', evt)
    // })
  })

  it('simple timebar', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100
        }
      ]
    }
    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      timeBarData.push({
        date: parseInt(`2020${month}${day}`),
        value: Math.round(Math.random() * 300),
      });
    }

    const intervalData = []
    for (let i = 0; i < 50; i++) {
      intervalData.push({
        date: i,
        value: Math.round(Math.random() * 300),
      });
    }
    const timeLine = new TimeBar({
      x: 0,
      y: 0,
      width: 500,
      height: 150,
      padding: 10,
      type: 'simple',
      trend: {
        data: timeBarData,
        isArea: true,
        // areaStyle: {
        //   fill: 'pink'
        // },
        lineStyle: {
          stroke: 'green',
          lineWidth: 1
        },
        interval: {
          data: intervalData.map(d => d.value),
          style: {
            // stroke: '#ccc',
            fill: '#ccc'
          }
        }
      },
      slider: {
        // height: 50,

        // backgroundStyle: {
        //   fill: 'blue',
        //   opacity: 0.2
        // },
        // foregroundStyle: {
        //   fill: 'yellow'
        // },
        textStyle: {
          fill: 'red',
          fontSize: 16,
        },
        // handlerStyle: {
        //   style: {
        //     fill: '#1890ff',
        //     stroke: '#1890ff'
        //   }
        // }
      }
      // loop: true
    })
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      // renderer: 'svg',
      plugins: [timeLine],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultEdge: {
        style: {
          lineAppendWidth: 20,
        },
      },
    });

    graph.data(data);
    graph.render();
    // graph.on('sliderchange', evt => {
    //   console.log('范围', evt)
    // })

    // graph.on('timelinechange', evt => {
    //   console.log('timeline', evt)
    // })
  })

  it('slice timebar', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100
        }
      ]
    }
    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      timeBarData.push({
        date: parseInt(`2020${month}${day}`),
        value: Math.round(Math.random() * 300),
      });
    }

    const timeLine = new TimeBar({
      x: 0,
      y: 0,
      width: 500,
      height: 150,
      padding: 10,
      type: 'slice',
      slice: {
        data: timeBarData,
        width: 500,
        height: 42,
        padding: 2,
      }
    })
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      // renderer: 'svg',
      plugins: [timeLine],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultEdge: {
        style: {
          lineAppendWidth: 20,
        },
      },
    });

    graph.data(data);
    graph.render();
    // graph.on('sliderchange', evt => {
    //   console.log('范围', evt)
    // })

    // graph.on('timelinechange', evt => {
    //   console.log('timeline', evt)
    // })
  })
})
