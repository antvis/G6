/**
 * @file Generate API Markdown documentation from the API Document Model files
 */
import { ApiModel } from '@microsoft/api-extractor-model';
import { FileSystem } from '@rushstack/node-core-library';
import * as path from 'path';
import { MarkdownDocumenter } from '../src/MarkdownDocumenter';

const inputFolder = 'support/api';
const outputFolder = 'docs/api';

(async function runApiDocumenter() {
  const apiModel: ApiModel = new ApiModel();

  if (!FileSystem.exists(inputFolder)) {
    throw new Error('The input folder does not exist: ' + inputFolder);
  }
  FileSystem.ensureFolder(outputFolder);

  for (const filename of FileSystem.readFolderItemNames(inputFolder)) {
    if (filename.match(/\.api\.json$/i)) {
      console.log(`Reading ${filename}`);
      const filenamePath: string = path.join(inputFolder, filename);
      apiModel.loadPackage(filenamePath);
    }
  }

  const markdownDocumenter: MarkdownDocumenter = new MarkdownDocumenter({
    apiModel,
    outputFolder,
  });

  await markdownDocumenter.generateFiles();
})();
