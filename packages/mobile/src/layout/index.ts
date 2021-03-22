import { Layout } from '@antv/layout/lib/layout/layout';
import { registerLayout, unRegisterLayout } from '@antv/layout/lib/registy';
import { RandomLayout } from '@antv/layout/lib/layout/random';

// 默认提供 random 布局
registerLayout('random', RandomLayout);

export { Layout, registerLayout, unRegisterLayout };
