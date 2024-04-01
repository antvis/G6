import { runtime } from '@antv/g';
import { registerBuiltInExtensions } from './registry';

runtime.enableCSSParsing = false;
registerBuiltInExtensions();
