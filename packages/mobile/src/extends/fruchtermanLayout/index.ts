import { FruchtermanLayout } from '@antv/layout/es/layout/fruchterman';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('fruchterman', FruchtermanLayout);
}
