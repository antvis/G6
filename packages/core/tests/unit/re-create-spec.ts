import Graph from './implement-graph';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('re-create graph', () => {
  const graph1 = new Graph({
    container: div,
    width: 500,
    height: 500,
  });
  graph1.destroy();
  debugger;
  const graph2 = new Graph({
    container: div,
    width: 500,
    height: 500,
  });
});
