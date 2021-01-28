import { GForceLayout } from '@antv/layout/es/layout/gForce';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('gForce', GForceLayout);
}
