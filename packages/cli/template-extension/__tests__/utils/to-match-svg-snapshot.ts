import type { Canvas, IAnimation } from '@antv/g';
import type { Graph, IAnimateEvent } from '@antv/g6';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import format from 'xml-formatter';
import xmlserializer from 'xmlserializer';
import { getSnapshotDir } from './dir';
import { sleep } from './sleep';

export type ToMatchSVGSnapshotOptions = {
  fileFormat?: string;
  keepSVGElementId?: boolean;
};
const formatSVG = (svg: string, keepSVGElementId: boolean) => {
  return (keepSVGElementId ? svg : svg.replace(/ *id="[^"]*" */g, ' ').replace(/clip-path="[^"]*"/g, '')).replace(
    '\r\n',
    '\n',
  );
};

// @see https://jestjs.io/docs/26.x/expect#expectextendmatchers
export async function toMatchSVGSnapshot(
  gCanvas: Canvas | Canvas[],
  dir: string,
  name: string,
  options: ToMatchSVGSnapshotOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  await sleep(300);

  const { fileFormat = 'svg', keepSVGElementId = false } = options;
  const namePath = path.join(dir, name);
  const actualPath = path.join(dir, `${name}-actual.${fileFormat}`);
  const expectedPath = path.join(dir, `${name}.${fileFormat}`);
  const gCanvases = Array.isArray(gCanvas) ? gCanvas : [gCanvas];

  let actual: string = '';

  // Clone <svg>
  const svg = (gCanvases[0].getContextService().getDomElement() as unknown as SVGElement).cloneNode(true) as SVGElement;
  const gRoot = svg.querySelector('#g-root');

  gCanvases.slice(1).forEach((gCanvas) => {
    const dom = (gCanvas.getContextService().getDomElement() as unknown as SVGElement).cloneNode(true) as SVGElement;
    // @ts-expect-error dom is SVGElement
    gRoot?.append(...(dom.querySelector('#g-root')?.childNodes || []));
  });

  actual += svg
    ? formatSVG(format(xmlserializer.serializeToString(svg as any), { indentation: '  ' }), keepSVGElementId)
    : '';

  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(expectedPath)) {
      if (process.env.CI === 'true') {
        throw new Error(`Please generate golden image for ${namePath}`);
      }
      console.warn(`! generate ${namePath}`);
      fs.writeFileSync(expectedPath, actual);
      return {
        message: () => `generate ${namePath}`,
        pass: true,
      };
    } else {
      const expected = fs.readFileSync(expectedPath, {
        encoding: 'utf8',
        flag: 'r',
      });
      if (actual === expected) {
        if (fs.existsSync(actualPath)) fs.unlinkSync(actualPath);
        return {
          message: () => `match ${namePath}`,
          pass: true,
        };
      }

      // Perverse actual file.
      if (actual) fs.writeFileSync(actualPath, actual);

      const formatPath = (p: string) => p.split('/g6/')[1];
      return {
        message: () =>
          `mismatch: \n expected: ${chalk.green(formatPath(expectedPath))}\n received: ${chalk.red(formatPath(actualPath))}`,
        pass: false,
      };
    }
  } catch (e) {
    return {
      message: () => `${e}`,
      pass: false,
    };
  }
}

export async function toMatchSnapshot(
  graph: Graph,
  dir: string,
  detail?: string,
  options: ToMatchSVGSnapshotOptions = {},
) {
  return await toMatchSVGSnapshot(
    Object.values(graph.getCanvas().getLayers()),
    ...getSnapshotDir(dir, detail),
    options,
  );
}

export async function toMatchAnimation(
  graph: Graph,
  dir: string,
  frames: number[],
  operation: () => void | Promise<void>,
  detail = 'default',
  options: ToMatchSVGSnapshotOptions = {},
) {
  const animationPromise = new Promise<IAnimation>((resolve) => {
    graph.once<IAnimateEvent>('beforeanimate', (e) => {
      resolve(e.animation!);
    });
  });

  await operation();

  const animation = await animationPromise;

  animation.pause();

  for (const frame of frames) {
    animation.currentTime = frame;
    await sleep(32);
    const result = await toMatchSVGSnapshot(
      Object.values(graph.getCanvas().getCanvases().canvas),
      ...getSnapshotDir(dir, `${detail}-${frame}`),
      options,
    );

    if (!result.pass) {
      return result;
    }
  }

  return {
    message: () => `match ${detail}`,
    pass: true,
  };
}
