import { Graph as G6Graph } from '@antv/g6';
import { existsSync, lstatSync, writeFileSync } from 'fs';
import { createCanvas } from './canvas';
import type { Graph, Options } from './types';

/**
 * <zh/> 获取输出文件的扩展名
 *
 * <en/> Get the extension name of the output file
 * @param options - <zh/>配置项 | <en/>options
 * @returns <zh/>输出文件的扩展名 | <en/>The extension name of the output file
 */
function getExtendNameOf(options: Options) {
  const { outputType } = options;
  if (outputType === 'pdf') return '.pdf';
  if (outputType === 'svg') return '.svg';
  return '.png';
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

  // @ts-expect-error extend Graph
  graph.exportToFile = (file: string) => {
    const extendName = getExtendNameOf(options);
    if (!file.endsWith(extendName)) {
      if (!existsSync(file)) file += extendName;
      else if (lstatSync(file).isDirectory()) file = `${file}/image${extendName}`;
      else file += extendName;
    }

    writeFileSync(file, nodeCanvas.toBuffer());
  };

  // @ts-expect-error extend Graph
  graph.toBuffer = () => nodeCanvas.toBuffer();

  await graph.render();

  return graph as Graph;
}
