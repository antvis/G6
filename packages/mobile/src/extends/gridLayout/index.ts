import { GridLayout } from '@antv/layout/es/layout/grid';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('grid', GridLayout);
}
