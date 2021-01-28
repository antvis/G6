import { ConcentricLayout } from '@antv/layout/es/layout/concentric';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('concentric', ConcentricLayout);
}
