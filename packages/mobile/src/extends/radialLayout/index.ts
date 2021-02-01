import { RadialLayout } from '@antv/layout/es/layout/radial';
import { getExtender } from '../../util/extend';

function layoutExtender(option: any, G6: { registerLayout: Function; }) {
  const { registerLayout } = G6;
  registerLayout('radial', RadialLayout);
}

export default getExtender(layoutExtender);
