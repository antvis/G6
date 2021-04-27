import { Graph } from '../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('donut test', () => {
  const cfg = {
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      type: 'donut',
      size: 50,
      style: {
        fill: '#bae637',
        stroke: '#eaff8f',
        lineWidth: 5,
      },
      linkPoints: {
        top: true,
        bottom: true,
        left: true,
        right: true,
        fill: '#fff',
        size: 5,
      },
      icon: {
        show: true,
        //img: '...', 可更换为其他图片地址
        width: 25,
        height: 25,
      },
      labelCfg: {
        position: 'bottom',
        offset: 10,
        style: {
          // ... 文本样式的配置
        },
      }
    },
  };
  const graph = new Graph(cfg);
  it('default donut config', () => {
    const data = {
      nodes: [
        {
          id: 'node',
          x: 100,
          y: 100,
          label: 'donut',
          donutAttrs: {
            prop1: 10,
            prop2: 20,
            prop3: 25,
            prop5: 10,
            prop6: 20,
          },
          donutColorMap: {
            prop1: '#8eaade',
            prop2: '#55a9f2',
            prop3: '#0d47b5',
            prop5: '#7b8085',
            prop6: '#003870'
          },
        },
      ],
    };
    graph.data(data);
    graph.render();

    const donutGroup = graph.getNodes()[0].getContainer();
    expect(donutGroup.get('children').length).toBe(12)
    
  });
});