import G6, { GraphData } from '@antv/g6';
import insertCss from 'insert-css';
import { data } from './data';
import Anotation from '../../src/annotation';

// insertCss(`
//   .g6-annotation-header-wapper {
//     background-color: #f00
//   }
// `);

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe('edge bundling', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    layout: {
      type: 'force',
    },
    defaultNode: { size: 10 },
    modes: {
      default: ['drag-canvas', 'zoom-canvas']
    }
  });

  graph.data(data);
  graph.render();

  it('edge bundling on circular layout with default configs', () => {
    const annotation = new Anotation({
      // containerCfg: {
      //   position: 'right',
      //   width: 'fit-content',
      //   height: 'fit-content',
      //   backgroundColor: 'rgba(255, 255, 255, 0.3)'
      // },
      linkStyle: {
        stroke: '#5B8FF9',
        lineWidth: 3,
        opacity: 0.5
      },
      itemHighlightState: 'selected'
      // editable: false
    });
    graph.addPlugin(annotation);

    annotation.toggleAnnotation(graph.getNodes()[0], { x: 100, y: 200 })
    let data;
    graph.on('canvas:click', e => {
      data = annotation.saveData(true);
      console.log(JSON.stringify(data));
      // annotation.destroy();

      // const annotation2 = new Anotation({
      //   containerCfg: {
      //     position: 'right',
      //     width: 'fit-content',
      //     height: 'fit-content',
      //     backgroundColor: 'rgba(255, 255, 255, 0.3)'
      //   },
      //   linkStyle: {
      //     stroke: '#f00'
      //   },
      //   defaultData: data
      // });
      // graph.addPlugin(annotation2);
      // // annotation2.readData(data)
    })
  });
});
