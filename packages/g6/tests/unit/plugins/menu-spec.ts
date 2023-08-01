import { Graph } from '../../../src/index';
import { pxCompare } from '../util';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

const createGraph = (plugins) => {
  return new Graph({
    container,
    width: 500,
    height: 500,
    type: 'graph',
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

describe('plugin', () => {
  it('menu with default config', (done) => {
    const graph = createGraph(['menu']);
    graph.on('afterlayout', (e) => {
      const contextmenuDiv = document.getElementsByClassName(
        'g6-component-contextmenu',
      )?.[0];
      expect(contextmenuDiv).not.toBe(undefined);
    });
  });

  it('menu with string config', (done) => {
    const graph = createGraph([
      {
        key: 'menu1',
        type: 'menu',
        trigger: 'contextmenu',
        /** async string menu */
        getContent: (e) => {
          return `
          <ul class='g6-contextmenu-ul'>
            <li class='g6-contextmenu-li'>菜单1</li>
            <li class='g6-contextmenu-li'>菜单2</li>
          </ul>
        `;
        },
      },
    ]);
    graph.on('afterlayout', (e) => {
      const contextmenuDiv = document.getElementsByClassName(
        'g6-component-contextmenu',
      )?.[0];
      expect(contextmenuDiv).not.toBe(undefined);
    });
  });

  it('menu with html element config', (done) => {
    const graph = createGraph([
      {
        key: 'menu1',
        type: 'menu',
        trigger: 'contextmenu',
        /** async string menu */
        getContent: (e) => {
          const outDiv = document.createElement('div');
          outDiv.style.width = '180px';
          outDiv.innerHTML = `<ul>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
      </ul>`;
          return outDiv;
        },
      },
    ]);
    graph.on('afterlayout', (e) => {
      const contextmenuDiv = document.getElementsByClassName(
        'g6-component-contextmenu',
      )?.[0];
      expect(contextmenuDiv).not.toBe(undefined);
    });
  });

  it('menu with async `getContent`config', (done) => {
    const graph = createGraph([
      {
        key: 'menu1',
        type: 'menu',
        trigger: 'contextmenu',
        /** async string menu */
        getContent: (e) => {
          return new Promise((resolve) => {
            const data = `
          <ul class='g6-contextmenu-ul'>
            <li class='g6-contextmenu-li'>异步菜单项1</li>
            <li class='g6-contextmenu-li'>异步菜单项2</li>
          </ul>
        `;
            setTimeout(() => {
              resolve(data);
            }, 1000);
          });
        },
      },
    ]);

    graph.on('afterlayout', (e) => {
      const contextmenuDiv = document.getElementsByClassName(
        'g6-component-contextmenu',
      )?.[0];
      expect(contextmenuDiv).not.toBe(undefined);
    });
  });
});
