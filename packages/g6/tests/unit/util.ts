export const pxCompare = (px: string, num: number, threshold = 1) => {
  const pxNumber = Number(px.replace('px', ''));
  return Math.abs(pxNumber - num) < threshold;
};
