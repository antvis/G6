import { runtime } from '@antv/g';
import { registerBuiltInPlugins } from './registry';

const onload = () => {
  runtime.enableCSSParsing = false;
  registerBuiltInPlugins();
};

onload();
