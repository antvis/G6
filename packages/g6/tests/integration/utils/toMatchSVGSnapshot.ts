import * as fs from 'fs';
import * as path from 'path';
import { Canvas } from '@antv/g';
import xmlserializer from 'xmlserializer';

export type ToMatchSVGSnapshotOptions = {
  maxError?: number;
};

// @see https://jestjs.io/docs/26.x/expect#expectextendmatchers
export async function toMatchSVGSnapshot(
  gCanvas: Canvas,
  dir: string,
  name: string,
  options: ToMatchSVGSnapshotOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  const namePath = path.join(dir, name);
  const actualPath = path.join(dir, `${name}-actual.svg`);
  const expectedPath = path.join(dir, `${name}.svg`);
  // @ts-ignore
  const dom = gCanvas.getConfig().renderer.dom as any;
  const containerId = gCanvas.getConfig().container as string;
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(expectedPath)) {
      if (process.env.CI === 'true') {
        throw new Error(`Please generate golden image for ${namePath}`);
      }
      const actual = xmlserializer.serializeToString(
        dom.window.document.getElementById(containerId).children[0],
      );
      fs.writeFileSync(expectedPath, actual);
      return {
        message: () => `generate ${namePath}`,
        pass: true,
      };
    } else {
      const actual = xmlserializer.serializeToString(
        dom.window.document.getElementById(containerId).children[0],
      );
      const snapshot = fs.readFileSync(expectedPath, {
        encoding: 'utf8',
        flag: 'r',
      });

      if (actual !== snapshot) {
        fs.writeFileSync(actualPath, actual);
        return {
          message: () => `mismatch ${namePath} `,
          pass: false,
        };
      } else {
        return {
          message: () => `match ${namePath}`,
          pass: true,
        };
      }
    }
  } catch (e) {
    return {
      message: () => `${e}`,
      pass: false,
    };
  }
}
