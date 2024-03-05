import { runtime } from '@antv/g';
import { registerBuiltInExtensions } from './registry';

const onload = () => {
  runtime.enableCSSParsing = false;
  registerBuiltInExtensions();
};

onload();
