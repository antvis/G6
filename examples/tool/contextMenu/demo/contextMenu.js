import G6 from '@antv/g6';
import insertCss from 'insert-css';

// define the CSS with the id of your menu
// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  #contextMenu {
    position: absolute;
    list-style-type: none;
    padding: 10px 8px;
    left: -150px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
  }
  #contextMenu li {
    cursor: pointer;
		list-style-type:none;
    list-style: none;
    margin-left: 0px;
  }
  #contextMenu li:hover {
    color: #aaa;
  }
`);

const descriptionDiv = document.createElement('div');
descriptionDiv.id = 'discription';
descriptionDiv.innerHTML = 'Right click a node to activate a contextMenu.';
document.getElementById('container').appendChild(descriptionDiv);


const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const contextMenu = new G6.Menu({
  getContent(evt) {
    let header;
    if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
      header = 'Canvas ContextMenu';
    } else if (evt.item) {
      const itemType = evt.item.getType();
      header = `${itemType.toUpperCase()} ContextMenu`;
    }
    return `
    <h3>${header}</h3>
    <ul>
      <li title='1'>li 1</li>
      <li title='2'>li 2</li>
      <li>li 3</li>
      <li>li 4</li>
      <li>li 5</li>
    </ul>`;
  },
  handleMenuClick: (target, item) => {
    console.log(target, item);
  },
  // offsetX and offsetY include the padding of the parent container
  // 需要加上父级容器的 padding-left 16 与自身偏移量 10
  offsetX: 16 + 10,
  // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
  offsetY: 0,
  // the types of items that allow the menu show up
  // 在哪些类型的元素上响应
  itemTypes: ['node', 'edge', 'canvas'],
});

const graph = new G6.Graph({
  // 使用 contextMenu plugins 时，需要将 container 设置为 position: relative;
  container: 'container',
  width,
  height,
  linkCenter: true,
  plugins: [contextMenu],
  defaultNode: {
    size: [80, 40],
    type: 'rect',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    style: {
      stroke: '#b5b5b5',
      lineAppendWidth: 3, // Enlarge the range the edge to be hitted
    },
    labelCfg: {
      autoRotate: true,
      style: {
        // A white stroke with width 5 helps show the label more clearly avoiding the interference of the overlapped edge
        stroke: 'white',
        lineWidth: 5,
      },
    },
  },
  modes: {
    default: ['drag-node'],
  },
});

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      x: 200,
      y: 100,
      type: 'rect',
    },
    {
      id: 'node2',
      label: 'node2',
      x: 250,
      y: 250,
      type: 'rect',
    },
    {
      id: 'node3',
      label: 'node3',
      x: 350,
      y: 100,
      type: 'rect',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'Test Label',
    },
    {
      source: 'node1',
      target: 'node3',
      label: 'Test Label 2',
    },
  ],
};

graph.data(data);
graph.render();

if (window && typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };