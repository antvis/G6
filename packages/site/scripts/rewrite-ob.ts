import fs from 'fs';
import path from 'path';

/**
 * Rewrites code blocks from createGraph format to Graph instance format
 *
 * Transforms:
 * createGraph(options, {width: $1, height: $2})
 *
 * To:
 * import { Graph } from "@antv/g6"
 * const graph = new Graph({ container:'container', width: $1, height: $2, ...options })
 * graph.render()
 *
 * Also ensures that ```js | ob {} includes inject: true
 */

// Regular expression to match ob code blocks with createGraph
const OB_CODE_BLOCK_REGEX = /```js\s*\|\s*ob(.*?)\n([\s\S]*?)```/g;
const CREATE_GRAPH_REGEX =
  /createGraph\(\s*(\{[\s\S]*?\})\s*,\s*\{\s*width\s*:\s*(\d+)\s*,\s*height\s*:\s*(\d+)\s*\},\s*\);/g;

/**
 * Transform createGraph code to Graph instance code
 * @param match
 * @param options
 * @param width
 * @param height
 */
function transformCreateGraphToGraphInstance(match: string, options: string, width: string, height: string): string {
  return `import { Graph } from "@antv/g6";

const graph = new Graph({
  container: 'container',
  width: ${width},
  height: ${height},${options.trim().slice(1, -1)}
});

graph.render();`;
}

/**
 * Ensure inject: true is included in ob options
 * @param obOptions The options string like ' { pin: false }' or ''
 * @returns Updated options string with inject: true
 */
function ensureinject(obOptions: string): string {
  // If there are no options, add them with inject: true
  if (!obOptions || obOptions.trim() === '') {
    return ' { inject: true }';
  }

  // Check if there are already options
  const trimmed = obOptions.trim();
  if (!trimmed.includes('{')) {
    return ` { inject: true }`;
  }

  // Parse the options to see if inject already exists
  const optionsMatch = trimmed.match(/\{(.*)\}/);
  if (!optionsMatch) {
    return ` { inject: true }`;
  }

  const optionsContent = optionsMatch[1].trim();
  if (optionsContent === '') {
    return ` { inject: true }`;
  }

  // Check if inject already exists
  if (optionsContent.includes('inject:')) {
    return obOptions;
  }

  // Add inject: true to existing options
  const updatedOptions = trimmed.replace(/\{(.*)\}/, (match, content) => {
    const separator = content.trim() ? ', ' : '';
    return `{ ${content}${separator}inject: true }`;
  });

  return ` ${updatedOptions}`;
}

/**
 * Process a single file to rewrite ob code blocks
 * @param filePath
 */
function processFile(filePath: string): void {
  try {
    // Read file content
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Find ob code blocks and replace createGraph pattern
    content = content.replace(OB_CODE_BLOCK_REGEX, (match, obOptions: string, codeContent: string) => {
      // Ensure inject: true is included in ob options
      const updatedObOptions = ensureinject(obOptions);

      // Replace createGraph with Graph instance in the code content
      const updatedCodeContent = codeContent.replace(
        CREATE_GRAPH_REGEX,
        (createGraphMatch: string, options: string, width: string, height: string) => {
          modified = true;
          return transformCreateGraphToGraphInstance(createGraphMatch, options, width, height);
        },
      );

      // If code was modified or options were updated, the file needs to be saved
      if (updatedCodeContent !== codeContent || updatedObOptions !== obOptions) {
        modified = true;
      }

      // Return the updated code block
      return `\`\`\`js | ob${updatedObOptions}\n${updatedCodeContent}\`\`\``;
    });

    // Save changes if the file was modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Transformed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

/**
 * Recursively find all markdown files in a directory
 * @param dir
 */
async function findMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  // Read directory contents
  const dirEntries = await fs.promises.readdir(dir, { withFileTypes: true });

  // Process each entry
  for (const entry of dirEntries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively search subdirectories
      const subFiles = await findMarkdownFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Add markdown files to result
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Main function to scan and process files
 */
async function main() {
  try {
    // Find all markdown files in packages/site
    const siteDir = path.resolve('..');
    const files = await findMarkdownFiles(siteDir);
    console.log(`Found ${files.length} markdown files to scan`);

    let processedCount = 0;

    // Process each file
    for (const file of files) {
      processFile(file);
      processedCount++;

      // Log progress periodically
      if (processedCount % 50 === 0) {
        console.log(`Processed ${processedCount}/${files.length} files`);
      }
    }

    console.log(`Completed processing ${processedCount} files`);
  } catch (error) {
    console.error('Error scanning files:', error);
  }
}

// Run the script
main().catch((error) => {
  console.error('Error executing script:', error);
  process.exit(1);
});
