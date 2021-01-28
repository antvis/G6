import { DagreLayout } from '@antv/layout/es/layout/dagre';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('dagre', DagreLayout);
}
