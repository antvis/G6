import { Graph as G6Graph } from '@antv/g6';
import { existsSync, lstatSync, writeFileSync } from 'fs';
import { createCanvas } from './canvas';
import type { Graph, MetaData, Options } from './types';

/**
 * <zh/> 获取输出文件的扩展名
 *
 * <en/> Get the extension name of the output file
 * @param options - <zh/>配置项 | <en/>options
 * @returns <zh/>输出文件的扩展名 | <en/>The extension name of the output file
 */
function getInfoOf(options: Options) {
  const { outputType } = options;
  if (outputType === 'pdf') return ['.pdf', 'application/pdf'] as const;
  if (outputType === 'svg') return ['.svg', undefined] as const;
  return ['.png', 'image/png'] as const;
}

/**
 * <zh/> 创建图并等待渲染完成
 *
 * <en/> Create a graph and wait for the rendering to complete
 * @param options - <zh/>图配置项 | <en/>Graph options
 * @returns <zh/>扩展图实例 | <en/>Extended graph instance
 */
export async function createGraph(options: Options) {
  const [g6Canvas, nodeCanvas] = createCanvas(options);

  const { outputType, ...restOptions } = options;
  const graph = new G6Graph({
    animation: false,
    ...restOptions,
    container: g6Canvas,
  });

  const [extendName, mimeType] = getInfoOf(options);

  // @ts-expect-error extend Graph
  graph.exportToFile = (file: string, meta?: MetaData) => {
    if (!file.endsWith(extendName)) {
      if (!existsSync(file)) file += extendName;
      else if (lstatSync(file).isDirectory()) file = `${file}/image${extendName}`;
      else file += extendName;
    }

    // @ts-expect-error skip type check
    writeFileSync(file, nodeCanvas.toBuffer(mimeType, meta));
  };

  // @ts-expect-error extend Graph
  graph.toBuffer = (meta?: MetaData) => nodeCanvas.toBuffer(mimeType, meta);

  await graph.render();

  return graph as Graph;
}
