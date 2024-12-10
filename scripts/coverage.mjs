import { copyFileSync, mkdirSync } from 'fs';
import { globSync } from 'glob';
import { join } from 'path';

const pattern = 'packages/g6/__tests__/snapshots/**/*-actual.svg';

const files = globSync(pattern, { nodir: true });

mkdirSync('artifact');

for (const file of files) {
  const path = file.split('/');
  const fileName = path.pop();
  const folder = path.slice(4).join('/');

  mkdirSync(`artifact/${folder}`, { recursive: true });
  copyFileSync(file, join('artifact', folder, fileName));

  const original = file.replace('-actual', '');
  copyFileSync(original, join('artifact', folder, fileName.replace('-actual', '')));
}
