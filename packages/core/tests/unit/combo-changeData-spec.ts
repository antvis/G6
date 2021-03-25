import Graph from './implement-graph';

const div = document.createElement('div');
div.id = 'combo-shape';
document.body.appendChild(div);
const data = {
  nodes: [
    {
      id: "1",
      label: "1",
      x: 300,
      y: 100
    },
    {
      id: "2",
      label: "2",
      x: 300,
      y: 300
    },
    {
      id: "3",
      label: "3",
      x: 300,
      y: 500,
      comboId: 'c1'
    }
  ],
  edges: [
    {
      source: "1",
      target: "2"
    },
    {
      source: "2",
      target: "3",
      type: "quadratic"
    },
    {
      source: "3",
      target: "2",
      type: "quadratic"
    }
  ],
  // combos: [{
  //   id: 'c1'
  // }
};

const newData = {
  combos: [
    {
      id: "2",
      label: "2"
    }
  ],
  nodes: [
    {
      id: "1",
      label: "1",
      x: 300,
      y: 100
    },
    {
      id: "3",
      label: "3",
      x: 300,
      y: 500
    },
    {
      id: "21",
      comboId: "2",
      x: 200,
      y: 250
    },
    {
      id: "22",
      comboId: "2",
      x: 250,
      y: 250
    },
    {
      id: "23",
      comboId: "2",
      x: 300,
      y: 250
    },
    {
      id: "24",
      comboId: "2",
      x: 350,
      y: 250
    },
    {
      id: "25",
      comboId: "2",
      x: 200,
      y: 300
    },
    {
      id: "26",
      comboId: "2",
      x: 250,
      y: 300
    }
  ],
  edges: [
    {
      source: "1",
      target: "2"
    },
    {
      source: "2",
      target: "3",
      type: "quadratic"
    },
    {
      source: "3",
      target: "2",
      type: "quadratic"
    }
  ]
}
describe('combo changeData', () => {
  it('changeData', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      groupByTypes: false
    });
    graph.read(data);

    setTimeout(() => {
      console.log('data changed')
      graph.changeData(newData);
      expect(graph.getNodes().length).toBe(8);
      expect(graph.getEdges().length).toBe(3);
      expect(graph.getCombos().length).toBe(1);
    }, 200)

  });
});
