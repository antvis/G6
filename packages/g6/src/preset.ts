import { runtime } from '@antv/g';
import { registerBuiltInExtensions } from './registry/build-in';

runtime.enableCSSParsing = false;
registerBuiltInExtensions();
