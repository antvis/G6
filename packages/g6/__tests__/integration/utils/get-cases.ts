import type { TestCase } from '../../demo/types';

export function getCases(module: Record<string, TestCase>) {
  const cases = Object.entries(module);
  const only = cases.filter(([, { only = false }]) => only);
  if (only.length !== 0 && process.env.CI === 'true') throw new Error('Cannot run only tests in CI');
  return (only.length !== 0 ? only : cases).filter(([, { skip = false }]) => !skip);
}
