import G6 from '../../../src';
import { LesMiserables as testData } from './legendTestData'
import Simulate from 'event-simulate';
const div = document.createElement('div');
div.id = 'legend-plugin';
document.body.appendChild(div);

describe('category legend', () => {
  it('legend with default config & destroy', () => {
    const legend = new G6.Legend({
      nodeAttr: 'group',
    });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'force'
      },
      plugins: [legend],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas']
      }
    });
    graph.data(testData)
    graph.render()

    const legendItems = legend.get('legend').getElementsByClassName('g6-legend-item')
    for (let item of legendItems) {
      const itemSelected = item.classList.contains('selected')
      Simulate.simulate(item, 'click')
      expect(item.classList.contains('selected') === !itemSelected).toBe(true)
    }

    const container = graph.get('container');
    expect(container.childNodes.length).toEqual(2);

    graph.destroy();
    expect(container.childNodes.length).toEqual(0);
  })

  it('use custom change handler', () => {
    const legend = new G6.Legend({
      nodeAttr: 'group',
      handleLegendChange: (evt, type) => {
        console.log(`legend type : ${type}`)
        console.log(evt)
      }
    });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'force'
      },
      plugins: [legend],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas']
      }
    });

    graph.data(testData)
    graph.render()
    const legendItems = legend.get('legend').getElementsByClassName('g6-legend-item')
    for (let item of legendItems) {
      Simulate.simulate(item, 'click')
    }
    graph.destroy()
  })

  it('legend with custom legendData & custom color map', () => {
    testData.edges = testData.edges.map(e => {
      return {
        ...e,
        group: `eGroup${Math.round(Math.random() * 5)}`
      }
    })

    const edgeLegendData = [0, 1, 2, 3, 4, 5].map(item => {
      return { val: `eGroup${item}`, label: `edge ${item}` }
    })
    const nodeColors = [
      '#F8D0CB',
      '#6DC8EC',
      '#D3EEF9',
      '#945FB9',
      '#DECFEA',
      '#FF9845',
      '#FFE0C7',
      '#1E9493',
      '#BBDEDE',
      '#FF99C3',
      '#FFE0ED'
    ];
    const edgeColors = [
      '#5B8FF9',
      '#CDDDFD',
      '#5AD8A6',
      '#CDF3E4',
      '#5D7092',
      '#CED4DE',
      '#F6BD16',
      '#FCEBB9',
      '#E86452',
      '#FF99C3',
      '#FFE0ED'
    ];
    const edgeColorMap = {}
    edgeLegendData.forEach((cat, i) => {
      edgeColorMap[cat.val] = edgeColors[i]
    })
    const legend = new G6.Legend({
      nodeAttr: 'group',
      edgeAttr: 'group',
      nodeLegendData: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      edgeLegendData,
      nodeColorMap: nodeColors,
      edgeColorMap
    });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'force'
      },
      plugins: [legend],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas']
      }
    });
    graph.data(testData)
    graph.render()
    graph.destroy()
  })
})
