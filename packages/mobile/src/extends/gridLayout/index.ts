import { GridLayout } from '@antv/layout/lib/layout/grid';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('grid', GridLayout);
}

export default getExtender(layoutExtender);
