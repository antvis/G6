import * as fs from 'fs';
import * as path from 'path';
import { Canvas, CanvasLike } from '@antv/g';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { sleep } from './sleep';

export type ToMatchWebGLSnapshotOptions = {
  maxError?: number;
};

/**
 * create PNG with rawdata
 * @see https://github.com/lukeapage/pngjs/blob/master/examples/newfile.js
 */
const createPNGFromRawdata = async (
  target: string,
  width: number,
  height: number,
  data: Uint8Array,
) => {
  const newfile = new PNG({ width, height });
  for (let y = 0; y < newfile.height; y++) {
    for (let x = 0; x < newfile.width; x++) {
      const idx = (newfile.width * y + x) << 2;
      // flipY
      const idx2 = (newfile.width * (newfile.height - y) + x) << 2;
      newfile.data[idx] = data[idx2];
      newfile.data[idx + 1] = data[idx2 + 1];
      newfile.data[idx + 2] = data[idx2 + 2];
      newfile.data[idx + 3] = data[idx2 + 3];
    }
  }

  return new Promise((resolve) => {
    newfile
      .pack()
      .pipe(fs.createWriteStream(target))
      .on('finish', function () {
        resolve(newfile);
      });
  });
};

async function writePNG(canvas: CanvasLike, path: string) {
  const gl = canvas.getContext('webgl') as WebGLRenderingContext;
  const width = canvas.width;
  const height = canvas.height;

  const pixels = new Uint8Array(width * height * 4);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  await createPNGFromRawdata(path, width, height, pixels);
}

/**
 * diff between PNGs
 */
function diff(
  src: string,
  target: string,
  diff: string,
  maxError = 0,
  showMismatchedPixels = true,
) {
  const img1 = PNG.sync.read(fs.readFileSync(src));
  const img2 = PNG.sync.read(fs.readFileSync(target));
  const { width, height } = img1;

  let diffPNG: PNG | null = null;
  let output: Buffer | null = null;
  if (showMismatchedPixels) {
    diffPNG = new PNG({ width, height });
    output = diffPNG.data;
  }

  // @see https://github.com/mapbox/pixelmatch#pixelmatchimg1-img2-output-width-height-options
  const mismatch = pixelmatch(img1.data, img2.data, output, width, height, {
    threshold: 0.1,
  });

  if (showMismatchedPixels && mismatch > maxError && diffPNG) {
    fs.writeFileSync(diff, PNG.sync.write(diffPNG));
  }

  return mismatch;
}

// @see https://jestjs.io/docs/26.x/expect#expectextendmatchers
export async function toMatchWebGLSnapshot(
  gCanvas: Canvas,
  dir: string,
  name: string,
  options: ToMatchWebGLSnapshotOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  // wait for next tick
  await sleep(20);

  const { maxError = 0 } = options;
  const namePath = path.join(dir, name);
  const actualPath = path.join(dir, `${name}-actual.png`);
  const expectedPath = path.join(dir, `${name}.png`);
  const diffPath = path.join(dir, `${name}-diff.png`);
  const canvas = gCanvas.getConfig().canvas!;
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(expectedPath)) {
      if (process.env.CI === 'true') {
        throw new Error(`Please generate golden image for ${namePath}`);
      }
      console.warn(`! generate ${namePath}`);
      await writePNG(canvas, expectedPath);
      return {
        message: () => `generate ${namePath}`,
        pass: true,
      };
    } else {
      await writePNG(canvas, actualPath);
      const error = diff(actualPath, expectedPath, diffPath, maxError);
      if (error <= maxError) {
        if (fs.existsSync(diffPath)) fs.unlinkSync(diffPath);
        fs.unlinkSync(actualPath);
        return {
          message: () => `match ${namePath}`,
          pass: true,
        };
      }
      return {
        message: () => `mismatch ${namePath} (error: ${error}) `,
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
