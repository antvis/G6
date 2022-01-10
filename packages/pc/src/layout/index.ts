import {
  Layouts as Layout,
  registerLayout as oRegisterLayout,
  GridLayout,
  RandomLayout,
  ForceLayout,
  CircularLayout,
  DagreLayout,
  RadialLayout,
  ConcentricLayout,
  MDSLayout,
  FruchtermanGPULayout,
  FruchtermanLayout,
  GForceLayout,
  GForceGPULayout,
  ComboForceLayout,
  ComboCombinedLayout,
  ForceAtlas2Layout,
} from '@antv/layout/lib';

import TreeLayout from './tree-layout';

oRegisterLayout('grid', GridLayout);
oRegisterLayout('random', RandomLayout);
oRegisterLayout('force', ForceLayout);
oRegisterLayout('circular', CircularLayout);
oRegisterLayout('dagre', DagreLayout);
oRegisterLayout('radial', RadialLayout);
oRegisterLayout('concentric', ConcentricLayout);
oRegisterLayout('mds', MDSLayout);
oRegisterLayout('fruchterman', FruchtermanLayout);
oRegisterLayout('fruchterman-gpu', FruchtermanGPULayout);
oRegisterLayout('gForce', GForceLayout);
oRegisterLayout('gForce-gpu', GForceGPULayout);
oRegisterLayout('comboForce', ComboForceLayout);
oRegisterLayout('comboCombined', ComboCombinedLayout);
oRegisterLayout('forceAtlas2', ForceAtlas2Layout);

const registerLayout = (name: string, layoutOverride: any) => {
  layoutOverride.isCustomLayout = true;
  Layout[name] = oRegisterLayout(name, layoutOverride);
};

export { TreeLayout, Layout, registerLayout };
