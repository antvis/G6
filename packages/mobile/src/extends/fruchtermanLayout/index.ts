import { FruchtermanLayout } from '@antv/layout/es/layout/fruchterman';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('fruchterman', FruchtermanLayout);
}

export default getExtender(layoutExtender);
