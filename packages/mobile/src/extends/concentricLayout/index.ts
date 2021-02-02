import { ConcentricLayout } from '@antv/layout/lib/layout/concentric';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('concentric', ConcentricLayout);
}

export default getExtender(layoutExtender);
