import { Graph } from '../../../src/index';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

const createGraph = (plugins) => {
  return new Graph({
    container,
    width: 500,
    height: 500,
    data: {
      nodes: [
        { id: 'node1', data: { x: 100, y: 200 } },
        { id: 'node2', data: { x: 200, y: 250 } },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => {
            return model.id;
          },
        },
      },
    },
    modes: {
      default: ['brush-select'],
    },
    plugins,
  });
};

describe('tooltip-plugin', () => {
  it('tooltip with default config', (done) => {
    const graph = createGraph(['tooltip']);
    graph.on('afterlayout', (e) => {
      const toolTipDiv = document.getElementsByClassName('g6-component-tooltip')?.[0];
      expect(toolTipDiv).not.toBe(undefined);
    });
  });

  it('tooltip with string config', (done) => {
    const graph = createGraph([
      {
        key: 'tooltip1',
        type: 'tooltip',
        trigger: 'click',
        getContent: (e) => {
          return `
        <div class='g6-component-tooltip'>
          <h4 class='tooltip-type'>类型: ${e.itemType}</h4>
          <span class='tooltip-id'>ID: ${e.itemId}</span>
        </div>
            `;
        },
      },
    ]);
    graph.on('afterlayout', (e) => {
      const toolTipDiv = document.getElementsByClassName('g6-component-tooltip')?.[0];
      expect(toolTipDiv).not.toBe(undefined);
    });
  });

  it('tooltip with fixToNode config', (done) => {
    const graph = createGraph([
      {
        key: 'tooltip1',
        type: 'tooltip',
        fixToNode: [1, 0.5],
      },
    ]);

    graph.on('afterlayout', (e) => {
      const toolTipDiv = document.getElementsByClassName('g6-component-tooltip')?.[0];
      expect(toolTipDiv).not.toBe(undefined);
    });
  });

  it('tooltip with html element config', (done) => {
    const graph = createGraph([
      {
        key: 'tooltip1',
        type: 'tooltip',
        getContent: (e) => {
          const outDiv = document.createElement('div');
          outDiv.style.width = '180px';
          outDiv.innerHTML = `<h4 class='tooltip-type'>类型: ${e.itemType}</h4>
          <span class='tooltip-id'>ID: ${e.itemId}</span>`;
          return outDiv;
        },
      },
    ]);
    graph.on('afterlayout', (e) => {
      const toolTipDiv = document.getElementsByClassName('g6-component-tooltip')?.[0];
      expect(toolTipDiv).not.toBe(undefined);
    });
  });

  it('tooltip with async `getContent`config', (done) => {
    const graph = createGraph([
      {
        key: 'tooltip1',
        type: 'tooltip',
        trigger: 'click',
        // fixToNode: [1, 0.5],
        /**
         * async string tooltip
         * @param e
         */
        getContent: (e) => {
          return new Promise((resolve) => {
            const data = `
        <div class='g6-component-tooltip'>
          <h4 class='tooltip-type'>类型: ${e.itemType}</h4>
          <span class='tooltip-id'>ID: ${e.itemId}</span>
        </div>
            `;
            setTimeout(() => {
              resolve(data);
            }, 1000);
          });
        },
      },
    ]);
    graph.on('afterlayout', (e) => {
      const toolTipDiv = document.getElementsByClassName('g6-component-tooltip')?.[0];
      expect(toolTipDiv).not.toBe(undefined);
    });
  });
});
