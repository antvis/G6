import '@antv/g';

declare module '@antv/g' {
  interface DisplayObject {
    $layer?: string;
  }

  interface IChildNode {
    $layer?: string;
  }

  interface DisplayObjectConfig {
    /**
     * <zh/> 图形所在的图层，默认为 'main'。
     *
     * <en/> The layer where the shape is located, default is 'main'.
     */
    $layer?: string;
  }
}
