import type { BaseTestCase } from '../demo/types';

export function getCases<T extends BaseTestCase>(module: Record<string, T>) {
  const cases = Object.entries(module);
  const only = cases.filter(([, { only = false }]) => only);
  if (only.length !== 0 && process.env.CI === 'true') throw new Error('Cannot run only tests in CI');
  return (only.length !== 0 ? only : cases)
    .filter(([, { skip = false }]) => !skip)
    .map(([name, testCase]) => [kebabCase(name), testCase] as [string, T]);
}

const kebabCase = (str: string) => str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
