export function getEnv() {
  if (typeof process !== 'undefined') return 'node';
  return 'browser';
}
