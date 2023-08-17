import { ArrowType } from '../types/edge';

/**
 * Get the path of different arrow types.
 * @param type Type of the arrow.
 * @param width The width of the arrow.
 * @param height The height of the arrow.
 * @returns
 */
export const getArrowPath = (
  type: ArrowType,
  width: number,
  height: number,
) => {
  switch (type) {
    case 'triangle':
      return `M 0,0 L ${width},-${height / 2} L ${width},${height / 2} Z`;
    case 'circle':
      const r = Math.max(width, height) / 2;
      return `M 0, 0
        a ${r},${r} 0 1,0 ${r * 2},0
        a ${r},${r} 0 1,0 ${-r * 2},0`;
    case 'diamond':
      return `M 0,0 
        L ${width / 2},${-height / 2} 
        L ${width},0 
        L ${width / 2},${height / 2} Z`;
    case 'vee':
      return `M 0,0 L ${width},-${height / 2}
              L ${(2 * width) / 3},0 L ${width},${height / 2} Z`;
    case 'rect':
      return `M 0,${-height / 2} 
                L ${width},${-height / 2} 
                L ${width},${height / 2} 
                L 0,${height / 2} Z`;
    case 'triangle-rect':
      const tWidth = width / 2;
      const rWidth = width / 7;
      const rBeginX = width - rWidth;
      return `M 0,0 L ${tWidth},-${height / 2} L ${tWidth},${height / 2} Z
                        M ${rBeginX}, -${height / 2}
                        L ${rBeginX + rWidth} -${height / 2}
                        L ${rBeginX + rWidth} ${height / 2}
                        L ${rBeginX} ${height / 2}
                        Z`;
    case 'simple':
      return `M ${width},-${height / 2} L 0,0 L ${width},${height / 2}`;
    default:
      return `M 0,0 L ${width},-${height / 2} L ${width},${height / 2} Z`;
  }
};

/**
 * Default arrow config.
 */
export const DEFAULT_ARROW_CONFIG = {
  type: 'triangle',
  width: 10,
  height: 10,
};
