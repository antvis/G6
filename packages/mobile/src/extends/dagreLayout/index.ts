import { DagreLayout } from '@antv/layout/es/layout/dagre';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('dagre', DagreLayout);
}

export default getExtender(layoutExtender);
