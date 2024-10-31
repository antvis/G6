/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const cac = require('cac');
const fs = require('fs');
const { createGraph } = require('../dist/g6-ssr.cjs');
const { version } = require('../package.json');

const cli = cac();

cli.version(version);

cli.command('version', 'Show version').action(() => {
  console.log(version);
});

cli
  .command('export', 'Export G6 Options to Image, PDF or SVG')
  .option('-i, --input <inputPath>', 'Path to the G6 options file')
  .option('-o, --output <outputPath>', 'Path to the export file')
  .option('-t, --type [type]', 'File type, default is image')
  .action(async (options) => {
    const { input, output, type } = options;

    if (!input) {
      console.log('\x1b[31m%s\x1b[0m', 'Please provide a path to the G6 options file');
      process.exit(1);
    }

    if (!fs.existsSync(input)) {
      console.log('\x1b[31m%s\x1b[0m', 'File does not exist: ', input);
      process.exit(1);
    }

    let graphOptions;

    try {
      graphOptions = JSON.parse(fs.readFileSync(input, 'utf-8'));
    } catch (e) {
      console.log('\x1b[31m%s\x1b[0m', 'Invalid JSON file');
      process.exit(1);
    }

    if (!graphOptions.outputType) {
      if (type === 'svg' || type === 'pdf') {
        graphOptions.outputType = type;
      }
    }

    console.log(`Exporting to ${type || 'image'}...`);

    const graph = await createGraph(graphOptions);

    graph.exportToFile(output, type);

    console.log('\x1b[32m%s\x1b[0m', 'Exported successfully!');

    process.exit(0);
  });

cli.help();

cli.parse();
