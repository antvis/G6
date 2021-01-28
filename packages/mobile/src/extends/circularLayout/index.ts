import { CircularLayout } from '@antv/layout/es/layout/circular';

export default (option, G6) => {
  const { registerLayout } = G6;
  registerLayout('circular', CircularLayout);
}
