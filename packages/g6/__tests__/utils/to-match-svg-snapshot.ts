import type { Graph } from '@/src';
import { Canvas } from '@antv/g';
import * as fs from 'fs';
import * as path from 'path';
import xmlserializer from 'xmlserializer';
import { getSnapshotDir } from './dir';
import { sleep } from './sleep';

export type ToMatchSVGSnapshotOptions = {
  fileFormat?: string;
  keepSVGElementId?: boolean;
};
const formatSVG = (svg: string, keepSVGElementId: boolean) => {
  return (keepSVGElementId ? svg : svg.replace(/id="[^"]*"/g, '').replace(/clip-path="[^"]*"/g, '')).replace(
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

  const { fileFormat = 'svg', keepSVGElementId = true } = options;
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

  actual += svg ? formatSVG(xmlserializer.serializeToString(svg as any), keepSVGElementId) : 'null';

  // Remove ';' after format by babel.
  if (actual !== 'null') actual = actual.slice(0, -2);

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
      return {
        message: () => `mismatch ${namePath}`,
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
  return await toMatchSVGSnapshot(Object.values(graph.getCanvas().canvas), ...getSnapshotDir(dir, detail), options);
}
