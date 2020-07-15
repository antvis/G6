import G6 from '../../../src';
const div = document.createElement('div');
div.id = 'timebar-plugin';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      x: 100,
      y: 100
    },
    {
      id: 'node2',
      label: 'node2',
      x: 150,
      y: 300
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    }
  ]
}

for(let i = 0; i < 100; i++) {
  const id = `node-${i}`
  data.nodes.push({
    id,
    label: `node${i}`,
    date: `2020${i}`,
    value: Math.round(Math.random() * 300)
  })

  const edgeId = i + 3
  data.edges.push({
    source: `node-${Math.round(Math.random() * 90)}`,
    target: `node-${Math.round(Math.random() * 90)}`
  })
}

describe('tooltip', () => {
  it('tooltip with default', () => {
    const timeBarData = []

    for(let i = 0; i < 100; i++) {
      timeBarData.push({
        date: `2020${i}`,
        value: Math.round(Math.random() * 300)
      })
    }
    const timebar = new G6.TimeBar({
      timebar: {
        trend: {
          data: timeBarData,
          isArea: false,
          smooth: true,
        }
      }
    });
    const tooltip = new G6.Tooltip()

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [timebar, tooltip],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas']
      },
      defaultEdge: {
        style: {
          lineAppendWidth: 20
        }
      }
    });

    graph.data(data)
    graph.render()

    const timebarPlugin = graph.get('plugins')[0]
    console.log(timebarPlugin)
    // expect(timebarPlugin.get('offset')).toBe(6)
    // expect(timebarPlugin.get('tooltip').outerHTML).toBe(`<div class="g6-component-tooltip" style="position: absolute; visibility: hidden;"></div>`)

    // graph.destroy()
  })
});
