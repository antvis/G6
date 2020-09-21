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

describe('TimeBar', () => {
  it('TimeBar with default', () => {
    const timeBarData = [];

    for (let i = 0; i < 100; i++) {
      timeBarData.push({
        date: `2020${i}`,
        value: Math.round(Math.random() * 300),
      });
    }
    const timebar = new G6.TimeBar({
      timebar: {
        trend: {
          data: timeBarData,
          isArea: false,
          smooth: true,
        },
      },
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [timebar],
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

    expect(graph.get('plugins').length).toBe(1);
    const timebarPlugin = graph.get('plugins')[0];
    expect(timebarPlugin).not.toBe(null);
    expect(timebarPlugin.get('trendData')).toEqual(timeBarData);
    expect(timebarPlugin.get('timebar').x).toBe(10);
    expect(timebarPlugin.get('timebar').y).toBe(10);
    expect(timebarPlugin.get('timebar').width).toBe(380);
    expect(timebarPlugin.get('timebar').start).toBe(0.1);

    const slider = timebarPlugin.get('slider');
    expect(slider.get('name')).toEqual('slider');
    expect(slider.get('maxText')).toEqual('202090'); // 0.9
    expect(slider.get('minText')).toEqual('202010'); // 0.1
    expect(slider.get('height')).toBe(26);
    graph.destroy();
  });

  it('config TimeBar style', () => {
    const timeBarData = [];

    for (let i = 0; i < 100; i++) {
      timeBarData.push({
        date: i,
        value: Math.round(Math.random() * 300),
      });
    }
    const timebar = new G6.TimeBar({
      timebar: {
        start: 0,
        end: 1,
        backgroundStyle: {
          fill: '#08979c',
          opacity: 0.3,
        },
        foregroundStyle: {
          fill: '#40a9ff',
          opacity: 0.4,
        },
        trend: {
          data: timeBarData,
          isArea: false,
          smooth: true,
          lineStyle: {
            stroke: '#9254de',
          },
        },
      },
      rangeChange: (graph, min, max) => {
        // 拿到 Graph 实例和 timebar 上范围，自己可以控制图上的渲染逻辑
        // console.log(graph, min, max);
      },
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [timebar],
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

    expect(graph.get('plugins').length).toBe(1);
    const timebarPlugin = graph.get('plugins')[0];
    expect(timebarPlugin).not.toBe(null);
    const timeBar = timebarPlugin.get('timebar');
    expect(timebarPlugin.get('trendData')).toEqual(timeBarData);
    expect(timeBar.x).toBe(10);
    expect(timeBar.y).toBe(10);
    expect(timeBar.width).toBe(380);
    expect(timeBar.start).toBe(0);

    const backgroundStyle = timeBar.backgroundStyle;
    expect(backgroundStyle.fill).toEqual('#08979c');
    expect(backgroundStyle.opacity).toBe(0.3);

    const foregroundStyle = timeBar.foregroundStyle;
    expect(foregroundStyle.fill).toEqual('#40a9ff');
    expect(foregroundStyle.opacity).toBe(0.4);

    const slider = timebarPlugin.get('slider');
    expect(slider.get('name')).toEqual('slider');
    expect(slider.get('maxText')).toEqual(99);
    expect(slider.get('minText')).toEqual(0);
    expect(slider.get('height')).toBe(26);
    graph.destroy();
  });
});

describe.only('timeline play with timebar', () => {
  it('trend timebar', () => {
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
    console.log(graph)
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
    console.log(graph)
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
    console.log(graph)
    // graph.on('sliderchange', evt => {
    //   console.log('范围', evt)
    // })

    // graph.on('timelinechange', evt => {
    //   console.log('timeline', evt)
    // })
  })
})
