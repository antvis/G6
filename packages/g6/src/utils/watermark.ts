// Only use one instance.
let canvas: HTMLCanvasElement;

/**
 * Create a canvas instance.
 * @param width - width
 * @param height - height
 * @returns a new Canvas
 */
function createCanvas(width: number, height: number): HTMLCanvasElement {
  if (!canvas) {
    canvas = document.createElement('canvas');
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx!.clearRect(0, 0, width, height);
  return canvas;
}

/**
 * 从文本获取水印的 base64
 * @param width - width
 * @param height - height
 * @param text - 样式
 * @param style - 样式
 * @returns 水印的 base64
 */
export async function getTextWatermark(width: number, height: number, text: string, style: any) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d')!;

  const {
    rotate,
    opacity,
    textFill,
    textFontSize,
    textFontFamily,
    textFontVariant,
    textFontWeight,
    textAlign,
    textBaseline,
  } = style;

  // Set the style.
  // Default is align center and middle.
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.translate(width / 2, height / 2);

  ctx.font = `${textFontSize}px ${textFontFamily} ${textFontVariant} ${textFontWeight}`;

  rotate && ctx.rotate(rotate);
  opacity && (ctx.globalAlpha = opacity);
  if (textFill) {
    ctx.fillStyle = textFill;
    // Draw the text.
    ctx.fillText(`${text}`, 0, 0);
  }

  // Return the base64.
  return canvas.toDataURL();
}

/**
 * Get the image base64 of the watermark.
 * @param width - width
 * @param height - height
 * @param imageURL - image URL
 * @param style - 样式
 * @returns 水印的 base64
 */
export async function getImageWatermark(width: number, height: number, imageURL: string, style: any) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d')!;
  const { rotate, opacity } = style;

  rotate && ctx.rotate(rotate);
  opacity && (ctx.globalAlpha = opacity);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imageURL;

  return new Promise((resolve) => {
    img.onload = function () {
      const sepX = width > img.width ? (width - img.width) / 2 : 0;
      const sepY = height > img.height ? (height - img.height) / 2 : 0;
      ctx.drawImage(img, 0, 0, img.width, img.height, sepX, sepY, width - sepX * 2, height - sepY * 2);
      resolve(canvas.toDataURL());
    };
  });
}
