import { Graph, Util } from '@antv/g6';

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const data = Util.mock(6).circle();

const toolbar = {
  key: 'toolbar-1',
  type: 'toolbar',
  getContent: () => {
    return `
      <ul>
        <li code='alert'>Alert</li>
      </ul>
    `;
  },
  handleClick: (code, graph) => {
    if (code === 'alert') {
      alert('hello world');
    }
  },
};

new Graph({
  container,
  width,
  height,
  renderer: 'canvas',
  layout: {
    type: 'grid',
  },
  node: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
  },
  plugins: [
    toolbar,
    {
      ...toolbar,
      key: 'toolbar-2',
      position: {
        x: 0,
        y: 200,
      },
    },
  ],
  data,
});
