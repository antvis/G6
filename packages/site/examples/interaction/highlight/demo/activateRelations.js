import G6 from '@antv/g6';
import insertCss from 'insert-css';

insertCss(`
  .g6-component-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);

const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  fixToNode: [1, 0.5],
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node', 'edge'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const outDiv = document.createElement('div');
    outDiv.style.width = 'fit-content';
    outDiv.style.height = 'fit-content';
    const model = e.item.getModel();
    if (e.item.getType() === 'node') {
      outDiv.innerHTML = `${model.name}`;
    } else {
      const source = e.item.getSource();
      const target = e.item.getTarget();
      outDiv.innerHTML = `来源：${source.getModel().name}<br/>去向：${target.getModel().name}`;
    }
    return outDiv;
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'force',
    edgeStrength: 0.7,
  },
  plugins: [tooltip],
  modes: {
    default: ['drag-canvas', 'activate-relations'],
  },
  defaultNode: {
    size: [10, 10],
    /* style for the keyShape */
    // style: {
    //   lineWidth: 2,
    //   fill: '#DEE9FF',
    //   stroke: '#5B8FF9',
    // },
  },
  defaultEdge: {
    /* style for the keyShape */
    style: {
      stroke: '#aaa',
      lineAppendWidth: 2,
      opacity: 0.3,
    },
  },
  /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
  // nodeStateStyles: {
  //   active: {
  //     opacity: 1,
  //   },
  //   inactive: {
  //     opacity: 0.2,
  //   },
  // },
  // edgeStateStyles: {
  //   active: {
  //     stroke: '#999',
  //   },
  // },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    graph.data(data);
    graph.render();
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
