import Graph from '../implement-graph';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph node states', () => {
  const data = {
    nodes: [{ id: 'node1', x: 100, y: 100 }]
  };

  it('image state changes', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      fitCenter: true,
      defaultNode: {
        type: 'image',
        img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ',
        size: 24,
        labelCfg: {
          position: 'bottom',
          style: {  fill: '#e80a0a', fontSize: 10,}
        },
      }
      nodeStateStyles: {
        hover: {
          img: 'https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg',
        }
      },
    });
    graph.data(data);
    graph.render();

    const node = graph.getNodes()[0]
    graph.setItemState(node, 'hover', true)
    expect(node.getKeyShape().attr('img')).toBe('https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg')
    graph.setItemState(node, 'hover', false)
    expect(node.getKeyShape().attr('img')).toBe('https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ')
  });
});
