/**
 * @file Generate API Markdown documentation from the API Document Model files
 */
import { MarkdownAction } from '../src/MarkdownAction';

(function runApiDocumenter() {
  new MarkdownAction().onExecute();
})();
