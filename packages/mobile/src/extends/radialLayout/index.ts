import { RadialLayout } from '@antv/layout/es/layout/radial';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('radial', RadialLayout);
}
