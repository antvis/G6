import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import Chart from '@antv/chart-node-g6'

const pointData = [
  {
      "continent": "Americas",
      "Country": "Argentina",
      "LifeExpectancy": 75.32,
      "GDP": 12779.37964,
      "Population": 40301927
  },
  {
      "continent": "Americas",
      "Country": "Brazil",
      "LifeExpectancy": 72.39,
      "GDP": 9065.800825,
      "Population": 190010647
  },
  {
      "continent": "Americas",
      "Country": "Canada",
      "LifeExpectancy": 80.653,
      "GDP": 36319.23501,
      "Population": 33390141
  },
  {
      "continent": "Americas",
      "Country": "Chile",
      "LifeExpectancy": 78.553,
      "GDP": 13171.63885,
      "Population": 16284741
  },
  {
      "continent": "Americas",
      "Country": "Colombia",
      "LifeExpectancy": 72.889,
      "GDP": 7006.580419,
      "Population": 44227550
  },
  {
      "continent": "Americas",
      "Country": "Costa Rica",
      "LifeExpectancy": 78.782,
      "GDP": 9645.06142,
      "Population": 4133884
  },
  {
      "continent": "Americas",
      "Country": "Cuba",
      "LifeExpectancy": 78.273,
      "GDP": 8948.102923,
      "Population": 11416987
  },
  {
      "continent": "Americas",
      "Country": "Dominican Republic",
      "LifeExpectancy": 72.235,
      "GDP": 6025.374752,
      "Population": 9319622
  },
  {
      "continent": "Americas",
      "Country": "Ecuador",
      "LifeExpectancy": 74.994,
      "GDP": 6873.262326,
      "Population": 13755680
  },
  {
      "continent": "Americas",
      "Country": "El Salvador",
      "LifeExpectancy": 71.878,
      "GDP": 5728.353514,
      "Population": 6939688
  },
  {
      "continent": "Americas",
      "Country": "Guatemala",
      "LifeExpectancy": 70.259,
      "GDP": 5186.050003,
      "Population": 12572928
  },
  {
      "continent": "Americas",
      "Country": "Honduras",
      "LifeExpectancy": 70.198,
      "GDP": 3548.330846,
      "Population": 7483763
  },
  {
      "continent": "Americas",
      "Country": "Jamaica",
      "LifeExpectancy": 72.567,
      "GDP": 7320.880262,
      "Population": 2780132
  },
  {
      "continent": "Americas",
      "Country": "Mexico",
      "LifeExpectancy": 76.195,
      "GDP": 11977.57496,
      "Population": 108700891
  },
  {
      "continent": "Americas",
      "Country": "Nicaragua",
      "LifeExpectancy": 72.899,
      "GDP": 2749.320965,
      "Population": 5675356
  },
  {
      "continent": "Americas",
      "Country": "Panama",
      "LifeExpectancy": 75.537,
      "GDP": 9809.185636,
      "Population": 3242173
  },
  {
      "continent": "Americas",
      "Country": "Paraguay",
      "LifeExpectancy": 71.752,
      "GDP": 4172.838464,
      "Population": 6667147
  },
  {
      "continent": "Americas",
      "Country": "Peru",
      "LifeExpectancy": 71.421,
      "GDP": 7408.905561,
      "Population": 28674757
  },
  {
      "continent": "Americas",
      "Country": "Puerto Rico",
      "LifeExpectancy": 78.746,
      "GDP": 19328.70901,
      "Population": 3942491
  },
  {
      "continent": "Americas",
      "Country": "Trinidad and Tobago",
      "LifeExpectancy": 69.819,
      "GDP": 18008.50924,
      "Population": 1056608
  },
  {
      "continent": "Americas",
      "Country": "United States",
      "LifeExpectancy": 78.242,
      "GDP": 42951.65309,
      "Population": 301139947
  },
  {
      "continent": "Americas",
      "Country": "Uruguay",
      "LifeExpectancy": 76.384,
      "GDP": 10611.46299,
      "Population": 3447496
  },
  {
      "continent": "Americas",
      "Country": "Venezuela",
      "LifeExpectancy": 73.747,
      "GDP": 11415.80569,
      "Population": 26084662
  },
  {
      "continent": "Asia",
      "Country": "China",
      "LifeExpectancy": 72.961,
      "GDP": 4959.114854,
      "Population": 1318683096
  },
  {
      "continent": "Asia",
      "Country": "Hong Kong, China",
      "LifeExpectancy": 82.208,
      "GDP": 39724.97867,
      "Population": 6980412
  },
  {
      "continent": "Asia",
      "Country": "Japan",
      "LifeExpectancy": 82.603,
      "GDP": 31656.06806,
      "Population": 127467972
  },
  {
      "continent": "Asia",
      "Country": "Korea, Dem. Rep.",
      "LifeExpectancy": 67.297,
      "GDP": 1593.06548,
      "Population": 23301725
  },
  {
      "continent": "Asia",
      "Country": "Korea, Rep.",
      "LifeExpectancy": 78.623,
      "GDP": 23348.13973,
      "Population": 49044790
  },
  {
      "continent": "Europe",
      "Country": "Albania",
      "LifeExpectancy": 76.423,
      "GDP": 5937.029526,
      "Population": 3600523
  },
  {
      "continent": "Europe",
      "Country": "Austria",
      "LifeExpectancy": 79.829,
      "GDP": 36126.4927,
      "Population": 8199783
  },
  {
      "continent": "Europe",
      "Country": "Belgium",
      "LifeExpectancy": 79.441,
      "GDP": 33692.60508,
      "Population": 10392226
  },
  {
      "continent": "Europe",
      "Country": "Bosnia and Herzegovina",
      "LifeExpectancy": 74.852,
      "GDP": 7446.298803,
      "Population": 4552198
  },
  {
      "continent": "Europe",
      "Country": "Bulgaria",
      "LifeExpectancy": 73.005,
      "GDP": 10680.79282,
      "Population": 7322858
  },
  {
      "continent": "Europe",
      "Country": "Croatia",
      "LifeExpectancy": 75.748,
      "GDP": 14619.22272,
      "Population": 4493312
  },
  {
      "continent": "Europe",
      "Country": "Czech Republic",
      "LifeExpectancy": 76.486,
      "GDP": 22833.30851,
      "Population": 10228744
  },
  {
      "continent": "Europe",
      "Country": "Denmark",
      "LifeExpectancy": 78.332,
      "GDP": 35278.41874,
      "Population": 5468120
  },
  {
      "continent": "Europe",
      "Country": "Finland",
      "LifeExpectancy": 79.313,
      "GDP": 33207.0844,
      "Population": 5238460
  },
  {
      "continent": "Europe",
      "Country": "France",
      "LifeExpectancy": 80.657,
      "GDP": 30470.0167,
      "Population": 61083916
  },
  {
      "continent": "Europe",
      "Country": "Germany",
      "LifeExpectancy": 79.406,
      "GDP": 32170.37442,
      "Population": 82400996
  },
  {
      "continent": "Europe",
      "Country": "Greece",
      "LifeExpectancy": 79.483,
      "GDP": 27538.41188,
      "Population": 10706290
  },
  {
      "continent": "Europe",
      "Country": "Hungary",
      "LifeExpectancy": 73.338,
      "GDP": 18008.94444,
      "Population": 9956108
  },
  {
      "continent": "Europe",
      "Country": "Iceland",
      "LifeExpectancy": 81.757,
      "GDP": 36180.78919,
      "Population": 301931
  },
  {
      "continent": "Europe",
      "Country": "Ireland",
      "LifeExpectancy": 78.885,
      "GDP": 40675.99635,
      "Population": 4109086
  },
  {
      "continent": "Europe",
      "Country": "Italy",
      "LifeExpectancy": 80.546,
      "GDP": 28569.7197,
      "Population": 58147733
  },
  {
      "continent": "Europe",
      "Country": "Montenegro",
      "LifeExpectancy": 74.543,
      "GDP": 9253.896111,
      "Population": 684736
  },
  {
      "continent": "Europe",
      "Country": "Netherlands",
      "LifeExpectancy": 79.762,
      "GDP": 36797.93332,
      "Population": 16570613
  },
  {
      "continent": "Europe",
      "Country": "Norway",
      "LifeExpectancy": 80.196,
      "GDP": 49357.19017,
      "Population": 4627926
  },
  {
      "continent": "Europe",
      "Country": "Poland",
      "LifeExpectancy": 75.563,
      "GDP": 15389.92468,
      "Population": 38518241
  },
  {
      "continent": "Europe",
      "Country": "Portugal",
      "LifeExpectancy": 78.098,
      "GDP": 20509.64777,
      "Population": 10642836
  },
  {
      "continent": "Europe",
      "Country": "Romania",
      "LifeExpectancy": 72.476,
      "GDP": 10808.47561,
      "Population": 22276056
  },
  {
      "continent": "Europe",
      "Country": "Serbia",
      "LifeExpectancy": 74.002,
      "GDP": 9786.534714,
      "Population": 10150265
  },
  {
      "continent": "Europe",
      "Country": "Slovak Republic",
      "LifeExpectancy": 74.663,
      "GDP": 18678.31435,
      "Population": 5447502
  },
  {
      "continent": "Europe",
      "Country": "Slovenia",
      "LifeExpectancy": 77.926,
      "GDP": 25768.25759,
      "Population": 2009245
  },
  {
      "continent": "Europe",
      "Country": "Spain",
      "LifeExpectancy": 80.941,
      "GDP": 28821.0637,
      "Population": 40448191
  },
  {
      "continent": "Europe",
      "Country": "Sweden",
      "LifeExpectancy": 80.884,
      "GDP": 33859.74835,
      "Population": 9031088
  },
  {
      "continent": "Europe",
      "Country": "Switzerland",
      "LifeExpectancy": 81.701,
      "GDP": 37506.41907,
      "Population": 7554661
  },
  {
      "continent": "Europe",
      "Country": "Turkey",
      "LifeExpectancy": 71.777,
      "GDP": 8458.276384,
      "Population": 71158647
  },
  {
      "continent": "Europe",
      "Country": "United Kingdom",
      "LifeExpectancy": 79.425,
      "GDP": 33203.26128,
      "Population": 60776238
  },
  {
      "continent": "Oceania",
      "Country": "Australia",
      "LifeExpectancy": 81.235,
      "GDP": 34435.36744,
      "Population": 20434176
  },
  {
      "continent": "Oceania",
      "Country": "New Zealand",
      "LifeExpectancy": 80.204,
      "GDP": 25185.00911,
      "Population": 4115771
  }]

G6.registerNode('node-with-point', {
  draw(cfg, group) {
    const keyShape = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 400,
        height: 200,
        fill: cfg.style.fill
      }
    })

    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 400,
        height: 40,
        fill: '#69c0ff'
      }
    })

    group.addShape('text', {
      attrs: {
        text: '浏览申请完成率',
        x: 10, 
        y:25,
        fontSize: 14,
        fill: '#fff' 
      }
    })

    group.addShape('text', {
      attrs: {
        text: '2020-06-07 ~ 2020-06-14 | 均值',
        x: 20,
        y: 70,
        fontSize: 13,
        fill: '#8c8c8c'
      }
    })

    group.addShape('text', {
      attrs: {
        text: '8.8%',
        x: 20,
        y: 110,
        fontSize: 30,
        fill: '#000'
      }
    })

    const colorMap = {
      Asia: '#1890FF',
      Americas: '#2FC25B',
      Europe: '#FACC14',
      Oceania: '#223273',
    };

    const chart = new Chart({
      group,
      region: {
        start: {
          x: 0.01,
          y: 0.2
        },
        end: {
          x: 0.8,
          y: 0.39
        }
      },
    });

    chart.data(cfg.trendData as any);
    
    (chart as any).point().position('GDP*LifeExpectancy')
      .size('Population', [1, 15])
      .color('continent', val => {
        return colorMap[val];
      })
      .shape('circle')
      .tooltip('Country*Population*GDP*LifeExpectancy')
      .style('continent', (val) => {
        return {
          lineWidth: 1,
          strokeOpacity: 1,
          fillOpacity: 0.3,
          opacity: 0.65,
          stroke: colorMap[val],
        };
      });

    chart.legend('Population', false);
    chart.axis(false)
    
    chart.render();

    return keyShape
  },
  update: null
}, 'single-node')

let graph: IGraph = null;

const PointChart = () => {
  const container = React.useRef();

  const data = {
    nodes: [
      {
        id: '0',
        label: '0',
        trendData: pointData
      },
      {
        id: '5',
        label: '5',
        trendData: pointData
      },
    ],
    edges: [
      {
        source: '0',
        target: '5',
      },
    ],
  };
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        fitView: true,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          align: 'DL',
          nodesepFunc: () => 1,
          ranksepFunc: () => 1,
        },
        defaultNode: {
          // size: [30, 20],
          type: 'node-with-point',
          style: {
            fill: '#e6f7ff',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: 'M 4,0 L -4,-4 L -4,4 Z',
              d: 4,
            },
          },
        },
        nodeStateStyles: {
          hover: {
            stroke: 'red'
          }
        }
      });
    }

    graph.data(data);
    graph.render();

    graph.on('node:click', evt => {
      graph.setItemState(evt.item, 'hover', true)
    })
  });

  return <div ref={container}>
  </div>;
};

export default PointChart;
