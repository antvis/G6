import G6, { GraphData } from '@antv/g6';
import TimeBar from '../../src/timeBar';

const div = document.createElement('div');
div.id = 'timebar-plugin';
document.body.appendChild(div);
// div.style.backgroundColor = '#252728'

const generateData = (nodeNum = 100) => {
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

  for (let i = 0; i < nodeNum; i++) {
    const id = `node-${i}`;
    data.nodes.push({
      id,
      label: `node${i}`,
      date: i,
      value: Math.round(Math.random() * 300),
    });

    const edgeDate = Math.round(Math.random() * 100);
    data.edges.push({
      date: edgeDate,
      label: `${edgeDate}`,
      source: `node-${Math.floor(Math.random() * nodeNum)}`,
      target: `node-${Math.floor(Math.random() * nodeNum)}`,
    });
  }
  return data;
};

const data = generateData();

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
      x: 15,
      y: 0,
      width: 500,
      height: 150,
      padding: 10,
      type: 'trend',
      filterEdge: true,
      trend: {
        data: timeBarData,
        isArea: true,
        areaStyle: {
          fill: '#08214E',
          opacity: 0.3,
        },
      },
      tick: {
        data: timeBarData,
        tickLabelFormatter: (d) => {
          const i = d.date;
          const month = i < 30 ? '01' : '02';
          const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
          return `2020${month}${day}`;
        },
        tickLabelStyle: {
          fill: '#000',
        },
        tickLineStyle: {
          stroke: '#000',
        },
      },
      backgroundStyle: {
        fill: '#115EEB',
        opacity: 0.3,
      },
      foregroundStyle: {
        fill: '#000',
        opacity: 0.25,
      },
      textStyle: {
        fill: '#000',
        fontWeight: 500,
      },
      controllerCfg: {
        // scale: 0.7,
        // offsetX: -250,
        x: 200,
        y: 45,
        width: 480,
        fill: '#fff',
        stroke: '#fff',
        // defaultTimeType: 'single',
        preBtnStyle: {
          fill: '#155EE1',
          stroke: '#155EE1',
          opacity: 0.85,
        },
        nextBtnStyle: {
          fill: '#155EE1',
          stroke: '#155EE1',
          opacity: 0.85,
        },
        playBtnStyle: {
          fill: '#155EE1',
          stroke: '#155EE1',
          opacity: 0.85,
          fillOpacity: 0.2,
        },
        speedControllerStyle: {
          pointer: {
            fill: '#155EE1',
            lineWidth: 0,
          },
          scroller: {
            fill: '#155EE1',
            stroke: '#155EE1',
          },
          text: {
            fill: '#000',
            opacity: 0.65,
          },
        },
        timeTypeControllerStyle: {
          box: {
            fillOpacity: 0,
            stroke: '#155EE1',
          },
          check: {
            lineWidth: 1,
            stroke: '#155EE1',
          },
          text: {
            fill: '#000',
            opacity: 0.65,
          },
        },
      },
      slider: {
        handlerStyle: {
          fill: '#497CD8',
          stroke: '#497CD8',
          highLightFill: '#f00',
        },
      },
    });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 250,
      // renderer: 'svg',
      plugins: [timeLine],
      // layout: {
      //   type: 'force'
      // },
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
    // graph.destroy();
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
        // areaStyle: {
        //   fill: 'pink'
        // },
        isArea: true,
        lineStyle: {
          stroke: 'green',
          lineWidth: 1,
        },
        interval: {
          data: intervalData.map((d) => d.value),
          style: {
            // stroke: '#ccc',
            fill: '#ccc',
            stroke: '#5E6B73',
            barWidth: 10,
            // lineWidth: 3
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
      nodes: [],
      edges: [],
    };

    for (let i = 0; i < 100; i++) {
      const month = i < 30 ? '01' : '02';
      const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
      const id = `node-${i}`;
      data.nodes.push({
        id,
        // date: parseInt(`2020${month}${day}`, 10),
        // value: Math.round(Math.random() * 300),
        properties: {
          date111: parseInt(`2020${month}${day}`, 10),
          value111: Math.round(Math.random() * 300),
        },
      });

      data.edges.push({
        source: `node-${Math.round(Math.random() * 90)}`,
        target: `node-${Math.round(Math.random() * 90)}`,
        // date: parseInt(`2020${month}${day}`, 10),
        // value: Math.round(Math.random() * 300),
        properties: {
          date111: parseInt(`2020${month}${day}`, 10),
          value111: Math.round(Math.random() * 300),
        },
      });
    }

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
      // filterEdge: true,
      filterItemTypes: ['edge'], // 'node',
      getDate: (d) => {
        return d.properties.date111;
      },
      containerCSS: {
        position: 'absolute',
        bottom: '50px',
      },
      trend: {
        data: timeBarData,
        // isArea: true,
        // areaStyle: {
        //   fill: 'pink'
        // },
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
        start: 0,
        end: 1,
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
      tick: {
        tickLabelStyle: {
          rotate: Math.PI / 4,
        },
      },
      // loop: true
    });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      // renderer: 'SVG',
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
        date: i, //parseInt(`2020${month}${day}`, 10),
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
        tickLabelFormatter: (d) => {
          const i = d.date;
          const month = i < 30 ? '01' : '02';
          const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
          return `2020${month}${day}`;
        },
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
      },
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
    console.log('data', data);

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

describe('timebar dependent on graph container', () => {
  const timebarContainer = document.createElement('div');
  timebarContainer.id = 'time-bar-container';
  // timebarContainer.style.position = 'absolute';
  // timebarContainer.style.bottom = '400px';
  document.body.appendChild(timebarContainer);

  it('slice timebar', () => {
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

    const timeline = new TimeBar({
      x: 0,
      y: 0,
      width: 500,
      height: 150,
      padding: 10,
      type: 'trend',
      container: timebarContainer,
      putInGraphContainer: false,
      trend: {
        data: timeBarData,
        isArea: true,
        lineStyle: {
          stroke: 'green',
          lineWidth: 1,
        },
        interval: {
          data: intervalData.map((d) => d.value),
          style: {
            fill: '#ccc',
          },
        },
      },
      slider: {
        textStyle: {
          fill: 'red',
          fontSize: 16,
        },
      },
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 300,
      // renderer: 'svg',
      plugins: [timeline],
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
    graph.removePlugin(timeline);
  });
});