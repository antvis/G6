import { Graph as BaseGraph, Extensions, Util, extend } from '@antv/g6';
import insertCss from 'insert-css';
const Graph = extend(BaseGraph, {
  plugins: {
    toolbar: Extensions.Toolbar,
    history: Extensions.History,
  },
});

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const data = Util.mock(6).circle();

const graph = new Graph({
  container,
  width,
  height,
  renderer: 'canvas',
  layout: {
    type: 'grid',
  },
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
  },
  node: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
  },

  data,
});

const toolbar = {
  key: 'toolbar-1',
  type: 'toolbar',
  className: 'my-toolbar',
  getContent: () => {
    return `
      <ul>
        <li code='alert'>alert</li>
        <li code='add'>add node</li>
        <li code='remove'>random remove node</li>
        <li code='redo'>redo</li>
        <li code='undo'>undo</li>
      </ul>
    `;
  },
  handleClick: (code) => {
    if (code === 'alert') {
      alert('hello world');
    }
    if (code === 'add') {
      graph.startBatch();
      graph.addData('node', {
        id: 'node2',
        data: {
          x: 600,
          y: 100,
        },
      });
      graph.addData('node', {
        id: 'node3',
        data: {
          x: 300,
          y: 100,
        },
      });
      graph.addData('edge', {
        id: 'edge2',
        source: 'node2',
        target: 'node3',
        data: {
          type: 'line-edge',
        },
      });
      graph.stopBatch();
    }
    if (code === 'remove') {
      graph.removeData('node', 'node2');
    }
    if (code === 'redo') {
      if (graph.canRedo()) {
        graph.redo();
      } else {
        alert('can not redo');
      }
    }
    if (code === 'undo') {
      if (graph.canUndo()) {
        graph.undo();
      } else {
        alert('can not undo');
      }
    }
  },
};

graph.addPlugins([toolbar]);

/** set the style of minimap  */
insertCss(`
  .my-toolbar {
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    top:40px;
    right:40px;
    height:50px;
    line-height:50px;
    box-shadow:0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  }
  .my-toolbar>li{
    height:50px;
    line-height:50px;
    flex:1;
  }
  
`);
