import * as path from 'path';
import * as fs from 'fs';
import { Canvas } from '@antv/g';
import xmlserializer from 'xmlserializer';
import { format } from 'prettier';
import { sleep } from './sleep';

export type ToMatchSVGSnapshotOptions = {
  selector?: string;
  fileFormat?: string;
  keepSVGElementId?: boolean;
};
const formatSVG = (svg: string, keepSVGElementId: boolean) => {
  return keepSVGElementId
    ? svg
    : svg.replace(/id="[^"]*"/g, '').replace(/clip-path="[^"]*"/g, '');
};

// @see https://jestjs.io/docs/26.x/expect#expectextendmatchers
export async function toMatchSVGSnapshot(
  gCanvas: Canvas,
  dir: string,
  name: string,
  options: ToMatchSVGSnapshotOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  await sleep(300);

  const { selector, fileFormat = 'svg', keepSVGElementId = true } = options;
  const namePath = path.join(dir, name);
  const actualPath = path.join(dir, `${name}-actual.${fileFormat}`);
  const expectedPath = path.join(dir, `${name}.${fileFormat}`);
  const dom = gCanvas
    .getContextService()
    .getDomElement() as unknown as SVGElement;

  let actual;
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    actual = dom
      ? formatSVG(
          format(xmlserializer.serializeToString(dom as any), {
            parser: 'babel',
          }),
          keepSVGElementId,
        )
      : 'null';

    // Remove ';' after format by babel.
    if (actual !== 'null') actual = actual.slice(0, -2);

    if (!fs.existsSync(expectedPath)) {
      if (process.env.CI === 'true') {
        throw new Error(`Please generate golden image for ${namePath}`);
      }
      console.warn(`! generate ${namePath}`);
      await fs.writeFileSync(expectedPath, actual);
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
