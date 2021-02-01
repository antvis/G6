import { GForceLayout } from '@antv/layout/es/layout/gForce';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('gForce', GForceLayout);
}

export default getExtender(layoutExtender);
