import { MDSLayout } from '@antv/layout/lib/layout/mds';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('mds', MDSLayout);
}

export default getExtender(layoutExtender);
