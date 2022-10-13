import Graph from '../implement-graph';
import G6 from '../../../src'
import { clone } from '@antv/util';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph node states', () => {
  const data = {
    nodes: [{ id: 'node1', x: 100, y: 100 }]
  };

  it('image state changing', (done) => {
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
      },
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
    graph.destroy();
    done();
  });

  it('custom node with image and state changing', (done) => {
    G6.registerNode(
      'item-node',
      {
        options: {
          stateStyles: {
            highlight: {
              'image-shape': {
                opacity: 0.2,
              }
            },
          },
        },
        // @ts-ignore
        draw(cfg: ModelConfig, group: IGroup) {
          // @ts-ignore
          const styles = { width: 50, height: 40, }
          const { labelCfg = {} } = cfg || {}

          const w = styles.width
          const h = styles.height

          const keyShape = group.addShape('rect', {
            attrs: {
              ...styles,
              fill: '#0ff',
              x: -w / 2,
              y: -h / 2,
              width: styles.width + 10,
            },
          })

          group.addShape('image', {
            attrs: {
              width: 20,
              height: 20,
              img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ',
              x: -w / 2,
              y: -20 / 2,
            },
            name: 'image-shape'
          })

          group.addShape('text', {
            attrs: {
              fontSize: 12,
              fill: '#000',
              text: 'test',
              x: -w / 2 + 20 + 4,
              y: 6,
            },
            name: 'text-shape',
          })

          return keyShape
        },
      },
      'rect',
    );
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      fitCenter: true,
      defaultNode: {
        type: 'item-node'
      }
    });
    graph.data({nodes: [{ id: 'node1', x: 100, y: 100 }]});
    graph.render();

    const node = graph.getNodes()[0];
    graph.setItemState(node, 'highlight', true)
    expect(node.getContainer().find(e => e.get('name') === 'image-shape').attr('opacity')).toBe(0.2);
    
    setTimeout(() => {
      graph.setItemState(node, 'highlight', false)
      console.log(node)
    }, 500)

    // graph.destroy();
    done();
  })
});
