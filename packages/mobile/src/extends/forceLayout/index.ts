import { ForceLayout } from '@antv/layout/lib/layout/force';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('force', ForceLayout);
}

export default getExtender(layoutExtender);
