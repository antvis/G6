import { ForceLayout } from '@antv/layout/es/layout/force';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('force', ForceLayout);
}
