import { MDSLayout } from '@antv/layout/es/layout/mds';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('mds', MDSLayout);
}
