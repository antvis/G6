import { Graph, Util } from '@antv/g6';

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const data = Util.mock(6).circle();
const layout = {
  type: 'grid',
};

new Graph({
  container: 'container',
  width,
  height,
  data,
  layout,
  plugins: ['toolbar'],
});
