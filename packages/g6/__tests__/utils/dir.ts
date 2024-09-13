import path from 'path';

/**
 * <zh/> 获取快照目录
 *
 * <en/> Get snapshot directory
 * @param dir - __filename
 * @param detail - <zh/> 快照详情 | <en/> snapshot detail
 * @returns <zh/> 快照目录 | <en/> snapshot directory
 */
export function getSnapshotDir(dir: string, detail: string = 'default'): [string, string] {
  const root = process.cwd();

  const relativeDir = dir.replace(root, '');

  const relativeDirSlices = relativeDir.split(path.sep);

  const testsPartIdx = relativeDirSlices.findIndex((slice) => slice === '__tests__');
  if (testsPartIdx !== -1) relativeDirSlices[testsPartIdx] = '';
  const unitPartIdx = relativeDirSlices.findIndex((slice) => slice === 'unit');
  if (unitPartIdx !== -1) relativeDirSlices[unitPartIdx] = '';

  const outputDir = path.join(root, '__tests__', 'snapshots', ...relativeDirSlices).replace('.spec.ts', '');
  return [outputDir, detail];
}
