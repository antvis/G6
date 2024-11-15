import '@antv/g';
import type { RuntimeContext } from './runtime/types';

declare module '@antv/g' {
  interface BaseStyleProps {
    /**
     * <zh/> 图形所在的图层，默认为 'main'。
     *
     * <en/> The layer where the shape is located, default is 'main'.
     */
    $layer?: string;
  }

  interface DisplayObjectConfig {
    context?: RuntimeContext;
  }
}
