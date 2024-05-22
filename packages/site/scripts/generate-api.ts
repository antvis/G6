/**
 * @file Using API Extractor to generate API Document Model files
 */
import { getPackages } from '@manypkg/get-packages';
import type { ExtractorResult, IConfigFile } from '@microsoft/api-extractor';
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import { EnumMemberOrder } from '@microsoft/api-extractor-model';
import { FileSystem } from '@rushstack/node-core-library';
import { execSync } from 'child_process';
import * as path from 'path';

/**
 * Get a path relative to the base directory of this project. If called with no
 * arguments it will return the base directory.
 * @param paths - the paths to join
 * @returns the resolved path
 */
export function baseDir(...paths: string[]): string {
  return path.resolve('../../', path.join(...paths));
}

const separator = '__';

/**
 * Mangle a scoped package name. Which removes the `@` symbol and adds a `__`
 * separator.
 * @example `@antv/g6` => `antv__g6`
 * @param packageName - the package name to mangle
 * @returns the mangled package name
 */
export function mangleScopedPackageName(packageName: string): string {
  const [scope, name] = packageName.split('/');
  if (name) {
    return [scope.replace('@', ''), name].join(separator);
  }

  return scope;
}

const reportFolderRoot = path.resolve(path.join('support', 'api'));
const reportTempFolderRoot = path.resolve(reportFolderRoot, 'temp');
const includePackages = new Set<string>(['@antv/g6', '@antv/g6-extension-react']);

/**
 * Get all typed packages.
 * @returns the list of packages
 */
async function getTypedPackages() {
  const packages = await getPackages(baseDir());
  return packages.packages.filter((pkg) => {
    const json = pkg.packageJson;
    return !json.private && includePackages.has(json.name);
  });
}

/**
 * Run the api extractor for each package that extracts API type information and comments.
 */
async function runApiExtractor() {
  const packages = await getTypedPackages();

  const packageNameSet = new Set([...packages.map((pkg) => pkg.packageJson.name), '@antv/layout']);

  for (const pkg of packages) {
    const json = pkg.packageJson;
    const name = mangleScopedPackageName(json.name);
    const types = (json as any).types;

    if (!types) {
      throw new Error(`unable to find "types" in ${pkg.dir}`);
    }

    const relativePath = path.relative(baseDir(), pkg.dir);
    const projectFolder = baseDir(relativePath);
    const mainEntryPointFilePath = path.join(pkg.dir, types);
    const packageJsonFullPath = path.join(pkg.dir, 'package.json');
    const apiJsonFilePath = path.join(reportFolderRoot, `${name}.api.json`);
    const reportFilePath = path.join(reportFolderRoot, `${name}.api.md`);
    const reportTempFilePath = path.join(reportTempFolderRoot, `${name}.api.md`);
    const reportFileName = path.parse(reportFilePath).base;
    const reportFolder = path.parse(reportFilePath).dir;
    const reportTempFolder = path.parse(reportTempFilePath).dir;

    if (FileSystem.exists(packageJsonFullPath)) {
      const packageJson = JSON.parse(FileSystem.readFile(packageJsonFullPath));
      if ('build:cjs' in packageJson.scripts) {
        execSync(`cd ${projectFolder} && pnpm run build:cjs`);
      } else {
        execSync(`cd ${projectFolder} && pnpm run build`);
      }
    } else {
      console.error('package.json 文件未找到');
    }

    const configObject: IConfigFile = {
      projectFolder,
      mainEntryPointFilePath,
      apiReport: {
        enabled: true,
        reportFolder,
        reportFileName,
        reportTempFolder,
      },
      docModel: {
        enabled: true,
        apiJsonFilePath,
      },
      compiler: {
        tsconfigFilePath: path.join(projectFolder, 'src', 'tsconfig.json'),
        overrideTsconfig: {
          moduleResolution: 'nodenext',
        },
        skipLibCheck: true,
      },
      enumMemberOrder: EnumMemberOrder.Preserve,
      // Make `export * from 'other-remirror-packages'` to work
      bundledPackages: [
        ...Object.keys(pkg.packageJson.dependencies ?? {}),
        ...Object.keys(pkg.packageJson.devDependencies ?? {}),
        ...Object.keys(pkg.packageJson.peerDependencies ?? {}),
      ].filter((name) => packageNameSet.has(name)),
    };

    const extractorConfig: ExtractorConfig = ExtractorConfig.prepare({
      configObject,
      configObjectFullPath: undefined,
      packageJson: json as any,
      packageJsonFullPath,
    });

    console.log(`running API Extractor for ${json.name}`);

    const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
      // Equivalent to the "--local" command-line parameter
      localBuild: true,

      // Equivalent to the "--verbose" command-line parameter
      showVerboseMessages: true,
    });

    if (extractorResult.succeeded) {
      console.log(`successfully completed API Extractor for ${json.name}`);
    } else {
      console.error(
        `API Extractor completed with ${extractorResult.errorCount} errors and ${extractorResult.warningCount} warnings`,
      );
      throw new Error('failed to run API Extractor');
    }
  }
}

/**
 * Run the API extractor and then delete the temp folder.
 * Self invoking function.
 */
(async function run() {
  await FileSystem.deleteFolder(reportFolderRoot);
  await runApiExtractor();
  await FileSystem.deleteFolder(reportTempFolderRoot);
})();
