import { ComboForceLayout } from '@antv/layout/es/layout/comboForce';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('comboForce', ComboForceLayout);
}
