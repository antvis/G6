export type TextStyle = {
  fill: string;
  text: string;
  rotate: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontVariant: string;
  opacity: number;
  align: CanvasTextAlign;
  baseline: CanvasTextBaseline;
};

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
  const context = canvas.getContext('2d');
  context!.clearRect(0, 0, width, height);
  return canvas;
}

/**
 * 从文本获取水印的 base64
 * @param width - width
 * @param height - height
 * @param style - 样式
 * @returns 水印的 base64
 */
export function getTextWateramrk(width: number, height: number, style: TextStyle): string {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d')!;

  const { text, fill, rotate, opacity, fontSize, fontFamily, fontVariant, fontWeight, align, baseline } = style;

  // Set the style.
  // Default is align center and middle.
  context.textAlign = align;
  context.textBaseline = baseline;
  context.translate(width / 2, height / 2);

  context.font = `${fontSize}px ${fontFamily} ${fontVariant} ${fontWeight}`;

  rotate && context.rotate(rotate);

  if (opacity) {
    context.globalAlpha = opacity;
  }
  if (fill) {
    context.fillStyle = fill;
    // Draw the text.
    context.fillText(`${text}`, 0, 0);
  }

  // Return the base64.
  return canvas.toDataURL();
}
