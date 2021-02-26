import G6, { GraphData } from '@antv/g6';
import TimeBar from '../../src/timeBar';

const div = document.createElement('div');
div.id = 'timebar-plugin';
document.body.appendChild(div);

const data: GraphData = {
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

  const edgeDate = Math.round(Math.random() * 100)
  data.edges.push({
    date: edgeDate,
    label: edgeDate,
    source: `node-${Math.round(Math.random() * 90)}`,
    target: `node-${Math.round(Math.random() * 90)}`,
  });
}

describe('timeline filter edges', () => {
  it('timeline filter edges', () => {
    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      timeBarData.push({
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
      filterEdge: true,
      trend: {
        data: timeBarData,
        isArea: true,
        tickLabelFormatter: d => {
          const i = d.date;
          const month = i < 30 ? '01' : '02';
          const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
          return `2020${month}${day}`
        }
      },
      controllerCfg: {
        // scale: 0.7,
        // offsetY: 20,
        // offsetX: -250,
        x: 200,
        width: 100,
        preBtnStyle: {
          fill: '#f00'
        },
        nextBtnStyle: {
        },
        playBtnStyle: {
          fill: '#0f0',
          stroke: '#00f',
        },
        speedControllerStyle: {
          pointer: {
            stroke: '#f00',
            fill: '#0f0',
            lineWidth: 2
          },
          scroller: {
            stroke: '#0f0',
          },
          text: {
            fill: '#00f',
          },
          
        },
        timeTypeControllerStyle: {
          box: {
            fill: '#f00',
            fillOpacity: 0.1,
            stroke: '#f00'
          },
          check: {
            lineWidth: 1,
            stroke: '#000'
          },
          text: {
            fill: '#00f'
          }
        }
      }
    });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 250,
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
  });

});

describe('timeline play with timebar', () => {
  it('trend timebar', () => {
    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      timeBarData.push({
        date: parseInt(`2020${month}${day}`, 10),
        value: Math.round(Math.random() * 300),
      });
    }

    const intervalData = [];
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
          lineWidth: 1,
        },
        interval: {
          data: intervalData.map((d) => d.value),
          style: {
            // stroke: '#ccc',
            fill: '#ccc',
          },
        },
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
    });
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
  });

  it('simple timebar', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
      ],
    };
    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      timeBarData.push({
        date: parseInt(`2020${month}${day}`, 10),
        value: Math.round(Math.random() * 300),
      });
    }
    const intervalData = [];
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
          lineWidth: 1,
        },
        interval: {
          data: intervalData.map((d) => d.value),
          style: {
            // stroke: '#ccc',
            fill: '#ccc',
          },
        },
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
      },
      // loop: true
    });
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
  });

  it('simple timebar', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
      ],
    };
    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      timeBarData.push({
        date: parseInt(`2020${month}${day}`, 10),
        value: Math.round(Math.random() * 300),
      });
    }

    const intervalData = [];
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
          lineWidth: 1,
        },
        interval: {
          data: intervalData.map((d) => d.value),
          style: {
            // stroke: '#ccc',
            fill: '#ccc',
          },
        },
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
      },
      // loop: true
    });
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
  });

  it('slice timebar', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
      ],
    };
    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      timeBarData.push({
        date: parseInt(`2020${month}${day}`, 10),
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
      },
    });
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
  });
});


xdescribe('timebar filter edges', () => {
  it('trend timebar', () => {
    const timeBarData = [];

    for (let i = 1; i < 60; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      timeBarData.push({
        date: i,//parseInt(`2020${month}${day}`, 10),
        value: Math.round(Math.random() * 300),
      });
    }

    const intervalData = [];
    for (let i = 0; i < 50; i++) {
      intervalData.push({
        date: i,
        value: Math.round(Math.random() * 300),
      });
    }

    const timeLine = new TimeBar({
      x: 20,
      y: 0,
      width: 450,
      height: 150,
      padding: 10,
      type: 'simple',
      tick: {
        tickLabelFormatter: d => {
          const i = d.date;
          const month = i < 30 ? '01' : '02';
          const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
          return `2020${month}${day}`;
        }
      }, 
      trend: {
        data: timeBarData,
        // isArea: true,
        // // areaStyle: {
        // //   fill: 'pink'
        // // },
        // lineStyle: {
        //   stroke: 'green',
        //   lineWidth: 1,
        // },
        // interval: {
        //   data: intervalData.map((d) => d.value),
        //   style: {
        //     // stroke: '#ccc',
        //     fill: '#ccc',
        //   },
        // },
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
    });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 300,
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
    console.log('data', data)

    graph.data(data);
    graph.render();
    // graph.on('sliderchange', evt => {
    //   console.log('范围', evt)
    // })

    // graph.on('timelinechange', evt => {
    //   console.log('timeline', evt)
    // })
  });

});