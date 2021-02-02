import { CircularLayout } from '@antv/layout/lib/layout/circular';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('circular', CircularLayout);
}

export default getExtender(layoutExtender);
