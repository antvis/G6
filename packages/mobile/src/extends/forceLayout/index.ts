import { ForceLayout } from '@antv/layout/es/layout/force';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('force', ForceLayout);
}

export default getExtender(layoutExtender);
