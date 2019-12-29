export function mathEqual(a: number, b: number) {
  return Math.abs(a - b) < 1;
}

export function numberEqual(a: number, b: number, gap?: number) {
  return Math.abs(a - b) <= (gap || 0.001);
}
