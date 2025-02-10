import type { Graph, IAnimateEvent } from '@/src';
import type { CanvasLayer } from '@/src/types';
import type { Canvas, IAnimation } from '@antv/g';
import chalk from 'chalk';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { optimize } from 'svgo';
import { serializeToString } from 'xmlserializer';
import { getSnapshotDir } from './dir';
import { sleep } from './sleep';

const format = (svg: SVGElement) => {
  return optimize(serializeToString(svg as any), {
    js2svg: {
      pretty: true,
      indent: 2,
    },
    plugins: [
      'cleanupIds',
      'cleanupAttrs',
      'sortAttrs',
      'sortDefsChildren',
      'removeUselessDefs',
      {
        name: 'convertPathData',
        params: {
          floatPrecision: 4,
          forceAbsolutePath: true,

          applyTransforms: false,
          applyTransformsStroked: false,
          straightCurves: false,
          convertToQ: false,
          lineShorthands: false,
          convertToZ: false,
          curveSmoothShorthands: false,
          smartArcRounding: false,
          removeUseless: false,
          collapseRepeated: false,
          utilizeAbsolute: false,
          negativeExtraSpace: false,
        },
      },
      {
        name: 'convertTransform',
        params: {
          floatPrecision: 4,

          convertToShorts: false,
          matrixToTransform: false,
          shortTranslate: false,
          shortScale: false,
          shortRotate: false,
          removeUseless: false,
          collapseIntoOne: false,
        },
      },
      {
        name: 'cleanupNumericValues',
        params: {
          floatPrecision: 4,
        },
      },
    ],
  }).data;
};

export type ToMatchSVGSnapshotOptions = {
  fileFormat?: string;
};

// @see https://jestjs.io/docs/26.x/expect#expectextendmatchers
export async function toMatchSVGSnapshot(
  gCanvas: Record<CanvasLayer, Canvas>,
  dir: string,
  name: string,
  options: ToMatchSVGSnapshotOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  await sleep(300);

  const { fileFormat = 'svg' } = options;
  const namePath = join(dir, name);
  const actualPath = join(dir, `${name}-actual.${fileFormat}`);
  const expectedPath = join(dir, `${name}.${fileFormat}`);

  let actual: string = '';

  // Clone <svg>
  const svg = (gCanvas.main.getContextService().getDomElement() as unknown as SVGElement).cloneNode(true) as SVGElement;
  const gRoot = svg.querySelector('#g-root');

  // remove css style
  svg.style.gridArea = '';

  Object.entries(gCanvas).forEach(([key, gCanvas]) => {
    if (key === 'main') return;
    const dom = (gCanvas.getContextService().getDomElement() as unknown as SVGElement).cloneNode(true) as SVGElement;
    // @ts-expect-error dom is SVGElement
    gRoot?.append(...(dom.querySelector('#g-root')?.childNodes || []));
  });

  actual += svg ? format(svg) : '';

  try {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    if (!existsSync(expectedPath)) {
      if (process.env.CI === 'true') {
        throw new Error(`Please generate golden image for ${namePath}`);
      }
      console.warn(`! generate ${namePath}`);
      writeFileSync(expectedPath, actual);
      return {
        message: () => `generate ${namePath}`,
        pass: true,
      };
    } else {
      const expected = readFileSync(expectedPath, {
        encoding: 'utf8',
        flag: 'r',
      });
      if (actual === expected) {
        if (existsSync(actualPath)) unlinkSync(actualPath);
        return {
          message: () => `match ${namePath}`,
          pass: true,
        };
      }

      // Perverse actual file.
      if (actual) writeFileSync(actualPath, actual);

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
  return await toMatchSVGSnapshot(graph.getCanvas().getLayers(), ...getSnapshotDir(dir, detail), options);
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
      graph.getCanvas().getLayers(),
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
