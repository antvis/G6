import type { ApiItem, ApiModel, IResolveDeclarationReferenceResult } from '@microsoft/api-extractor-model';
import type { DocLinkTag, DocNode, StringBuilder } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from '../nodes/CustomDocNodeKind';
import type { DocContainer } from '../nodes/DocContainer';
import type { DocDetails } from '../nodes/DocDetails';
import type { DocEmphasisSpan } from '../nodes/DocEmphasisSpan';
import type { DocHeading } from '../nodes/DocHeading';
import type { DocNoteBox } from '../nodes/DocNoteBox';
import type { DocPageTitle } from '../nodes/DocPageTitle';
import type { DocTable } from '../nodes/DocTable';
import type { DocTableCell } from '../nodes/DocTableCell';
import type { DocText } from '../nodes/DocText';
import type { DocUnorderedList } from '../nodes/DocUnorderedList';
import type { IndentedWriter } from '../utils/IndentedWriter';
import type { IMarkdownEmitterContext, IMarkdownEmitterOptions } from './MarkdownEmitter';
import { MarkdownEmitter } from './MarkdownEmitter';

export interface ICustomMarkdownEmitterOptions extends IMarkdownEmitterOptions {
  contextApiItem: ApiItem | undefined;

  onGetFilenameForApiItem: (apiItem: ApiItem) => string | undefined;
}

export class CustomMarkdownEmitter extends MarkdownEmitter {
  private _apiModel: ApiModel;

  public constructor(apiModel: ApiModel) {
    super();

    this._apiModel = apiModel;
  }

  public emit(stringBuilder: StringBuilder, docNode: DocNode, options: ICustomMarkdownEmitterOptions): string {
    return super.emit(stringBuilder, docNode, options);
  }

  /** @override */
  protected writeNode(docNode: DocNode, context: IMarkdownEmitterContext, docNodeSiblings: boolean): void {
    const writer: IndentedWriter = context.writer;

    switch (docNode.kind) {
      case CustomDocNodeKind.Text: {
        const docText: DocText = docNode as DocText;
        writer.ensureNewLine();
        writer.write(docText.text);
        writer.ensureNewLine();
        break;
      }
      case CustomDocNodeKind.Heading: {
        const docHeading: DocHeading = docNode as DocHeading;
        writer.ensureSkippedLine();

        let prefix: string;
        switch (docHeading.level) {
          case 1:
            prefix = '##';
            break;
          case 2:
            prefix = '###';
            break;
          case 3:
            prefix = '####';
            break;
          default:
            prefix = '####';
        }

        const _prefix = docHeading.prefix ? docHeading.prefix + ' ' : '';
        const _suffix = docHeading.suffix ? ' ' + docHeading.suffix : '';

        writer.writeLine(prefix + ' ' + _prefix + this.getEscapedText(docHeading.title) + _suffix);
        writer.writeLine();
        break;
      }
      case CustomDocNodeKind.NoteBox: {
        const docNoteBox: DocNoteBox = docNode as DocNoteBox;
        writer.ensureNewLine();

        writer.increaseIndent('> ');

        this.writeNode(docNoteBox.content, context, false);
        writer.ensureNewLine();

        writer.decreaseIndent();

        writer.writeLine();
        break;
      }
      case CustomDocNodeKind.Table: {
        const docTable: DocTable = docNode as DocTable;
        // GitHub's markdown renderer chokes on tables that don't have a blank line above them,
        // whereas VS Code's renderer is totally fine with it.
        writer.ensureSkippedLine();

        // Markdown table rows can have inconsistent cell counts.  Size the table based on the longest row.
        let columnCount: number = 0;
        if (docTable.header) {
          columnCount = docTable.header.cells.length;
        }
        for (const row of docTable.rows) {
          if (row.cells.length > columnCount) {
            columnCount = row.cells.length;
          }
        }

        writer.write('<table>');
        if (docTable.header) {
          writer.write('<thead><tr>');
          for (let i: number = 0; i < columnCount; ++i) {
            writer.write('<th>');
            writer.ensureNewLine();
            writer.writeLine();
            const cell: DocTableCell | undefined = docTable.header.cells[i];
            if (cell) {
              this.writeNode(cell.content, context, false);
            }
            writer.ensureNewLine();
            writer.writeLine();
            writer.write('</th>');
          }
          writer.write('</tr></thead>');
        }
        writer.writeLine();

        writer.write('<tbody>');
        for (const row of docTable.rows) {
          writer.write('<tr>');
          for (const cell of row.cells) {
            writer.write('<td>');
            writer.ensureNewLine();
            writer.writeLine();
            this.writeNode(cell.content, context, false);
            writer.ensureNewLine();
            writer.writeLine();
            writer.write('</td>');
          }
          writer.write('</tr>');
          writer.writeLine();
        }
        writer.write('</tbody>');
        writer.write('</table>');
        writer.writeLine();

        break;
      }
      case CustomDocNodeKind.EmphasisSpan: {
        const docEmphasisSpan: DocEmphasisSpan = docNode as DocEmphasisSpan;
        const oldBold: boolean = context.boldRequested;
        const oldItalic: boolean = context.italicRequested;
        context.boldRequested = docEmphasisSpan.bold;
        context.italicRequested = docEmphasisSpan.italic;
        this.writeNodes(docEmphasisSpan.nodes, context);
        context.boldRequested = oldBold;
        context.italicRequested = oldItalic;
        break;
      }
      case CustomDocNodeKind.PageTitle: {
        const docPageTitle: DocPageTitle = docNode as DocPageTitle;

        writer.writeLine('---');
        writer.writeLine('title: ' + docPageTitle.title);
        if (docPageTitle.order !== undefined) {
          writer.ensureNewLine();
          writer.writeLine('order: ' + docPageTitle.order);
        }
        writer.writeLine('---');
        break;
      }
      case CustomDocNodeKind.Details: {
        const docDetails: DocDetails = docNode as DocDetails;

        writer.write('<details>');

        writer.write('<summary>');
        writer.write(docDetails.summary || '');
        writer.write('</summary>');

        writer.ensureSkippedLine();
        this.writeNode(docDetails.content, context, false);
        writer.ensureNewLine();
        writer.write('</details>');

        writer.ensureSkippedLine();
        break;
      }
      case CustomDocNodeKind.UnorderedList: {
        const docUnorderedList: DocUnorderedList = docNode as DocUnorderedList;

        writer.writeLine();

        for (const docNode of docUnorderedList.getChildNodes()) {
          writer.ensureNewLine();
          writer.writeLine('- ');
          this.writeNode(docNode, context, false);
        }

        writer.writeLine();
        break;
      }
      case CustomDocNodeKind.Container: {
        const container: DocContainer = docNode as DocContainer;
        writer.ensureSkippedLine();
        writer.write(`:::${container.status}` + (container.title ? `{title=${container.title}}` : ''));
        writer.ensureSkippedLine();
        this.writeNodes(container.getChildNodes(), context);
        writer.write(':::');
        writer.ensureSkippedLine();
        break;
      }
      default:
        super.writeNode(docNode, context, docNodeSiblings);
    }
  }

  /** @override */
  protected writeLinkTagWithCodeDestination(
    docLinkTag: DocLinkTag,
    context: IMarkdownEmitterContext<ICustomMarkdownEmitterOptions>,
  ): void {
    const options: ICustomMarkdownEmitterOptions = context.options;

    const result: IResolveDeclarationReferenceResult = this._apiModel.resolveDeclarationReference(
      docLinkTag.codeDestination!,
      options.contextApiItem,
    );

    if (result.resolvedApiItem) {
      const filename: string | undefined = options.onGetFilenameForApiItem(result.resolvedApiItem);

      if (filename) {
        let linkText: string = docLinkTag.linkText || '';
        if (linkText.length === 0) {
          // Generate a name such as Namespace1.Namespace2.MyClass.myMethod()
          linkText = result.resolvedApiItem.getScopedNameWithinPackage();
        }
        if (linkText.length > 0) {
          const encodedLinkText: string = this.getEscapedText(linkText.replace(/\s+/g, ' '));

          context.writer.write('[');
          context.writer.write(encodedLinkText);
          context.writer.write(`](${filename!})`);
        } else {
          console.log('WARNING: Unable to determine link text');
        }
      }
    } else if (result.errorMessage) {
      console.log(
        `WARNING: Unable to resolve reference "${docLinkTag.codeDestination!.emitAsTsdoc()}": ` + result.errorMessage,
      );
    }
  }
}
