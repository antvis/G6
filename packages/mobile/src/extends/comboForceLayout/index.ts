import { ComboForceLayout } from '@antv/layout/es/layout/comboForce';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('comboForce', ComboForceLayout);
}

export default getExtender(layoutExtender);
