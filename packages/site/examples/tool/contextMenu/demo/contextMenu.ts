import { Graph, Util } from '@antv/g6';

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const data = Util.mock(6).circle();

const graph = new Graph({
  container,
  width,
  height,
  data,
  modes: {
    default: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-node'],
  },
});

const contextMenu = {
  type: 'menu',
  key: 'my-context-menu',
  trigger: 'contextmenu',
  /** async string menu */
  getContent: (e) => {
    return `
    <ul class='g6-contextmenu-ul'>
      <li class='g6-contextmenu-li' code='delete'> Delete </li>
      <li class='g6-contextmenu-li' code='add' > Add </li>
    </ul>
  `;
  },
  handleMenuClick: (target: HTMLLIElement, itemId, graph) => {
    //@ts-ignore
    const { value } = Object.values(target.attributes).find((item) => item.name === 'code');
    alert(`Item ID: ${itemId} \n Code: ${value}`);
  },
};

graph.addPlugins([contextMenu]);
