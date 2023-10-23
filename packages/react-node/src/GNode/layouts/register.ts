// import { CSS } from '@antv/g';
// import { Layout as BlockFlowLayout } from '@antv/g-layout-blocklike';
import { Plugin as PluginYoga } from '@antv/g-plugin-yoga';
import { Renderer } from '../typings';

export const register = (renderer?: Renderer) => {
  // CSS.registerLayout('block', BlockFlowLayout);

  if (renderer) {
    renderer.registerPlugin(new PluginYoga({}));
  }
};
