import { DocNodeKind, TSDocConfiguration } from '@microsoft/tsdoc';
import { DocContainer } from './DocContainer';
import { DocDetails } from './DocDetails';
import { DocEmphasisSpan } from './DocEmphasisSpan';
import { DocHeading } from './DocHeading';
import { DocNoteBox } from './DocNoteBox';
import { DocPageTitle } from './DocPageTitle';
import { DocTable } from './DocTable';
import { DocTableCell } from './DocTableCell';
import { DocTableRow } from './DocTableRow';
import { DocText } from './DocText';
import { DocUnorderedList } from './DocUnorderedList';

/**
 * Identifies custom subclasses
 */
export const enum CustomDocNodeKind {
  EmphasisSpan = 'EmphasisSpan',
  Heading = 'Heading',
  NoteBox = 'NoteBox',
  Table = 'Table',
  TableCell = 'TableCell',
  TableRow = 'TableRow',
  PageTitle = 'PageTitle',
  Details = 'Details',
  UnorderedList = 'UnorderedList',
  Container = 'Container',
  Text = 'Text',
}

export class CustomDocNodes {
  private static _configuration: TSDocConfiguration | undefined;

  public static get configuration(): TSDocConfiguration {
    if (CustomDocNodes._configuration === undefined) {
      const configuration: TSDocConfiguration = new TSDocConfiguration();

      configuration.docNodeManager.registerDocNodes('@micrososft/api-documenter', [
        {
          docNodeKind: CustomDocNodeKind.EmphasisSpan,
          constructor: DocEmphasisSpan,
        },
        { docNodeKind: CustomDocNodeKind.Heading, constructor: DocHeading },
        { docNodeKind: CustomDocNodeKind.NoteBox, constructor: DocNoteBox },
        { docNodeKind: CustomDocNodeKind.Table, constructor: DocTable },
        {
          docNodeKind: CustomDocNodeKind.TableCell,
          constructor: DocTableCell,
        },
        { docNodeKind: CustomDocNodeKind.TableRow, constructor: DocTableRow },
        {
          docNodeKind: CustomDocNodeKind.PageTitle,
          constructor: DocPageTitle,
        },
        { docNodeKind: CustomDocNodeKind.Details, constructor: DocDetails },
        {
          docNodeKind: CustomDocNodeKind.UnorderedList,
          constructor: DocUnorderedList,
        },
        {
          docNodeKind: CustomDocNodeKind.Container,
          constructor: DocContainer,
        },
        {
          docNodeKind: CustomDocNodeKind.Text,
          constructor: DocText,
        },
      ]);

      configuration.docNodeManager.registerAllowableChildren(CustomDocNodeKind.EmphasisSpan, [
        DocNodeKind.PlainText,
        DocNodeKind.SoftBreak,
        DocNodeKind.Paragraph,
        DocNodeKind.LinkTag,
        DocNodeKind.CodeSpan,
      ]);

      configuration.docNodeManager.registerAllowableChildren(CustomDocNodeKind.UnorderedList, [
        DocNodeKind.PlainText,
        DocNodeKind.LinkTag,
        DocNodeKind.Paragraph,
        DocNodeKind.CodeSpan,
      ]);

      configuration.docNodeManager.registerAllowableChildren(DocNodeKind.Section, [
        CustomDocNodeKind.Heading,
        CustomDocNodeKind.NoteBox,
        CustomDocNodeKind.Table,
        CustomDocNodeKind.PageTitle,
        CustomDocNodeKind.Details,
        CustomDocNodeKind.Container,
        CustomDocNodeKind.UnorderedList,
      ]);

      configuration.docNodeManager.registerAllowableChildren(DocNodeKind.Paragraph, [
        CustomDocNodeKind.EmphasisSpan,
        CustomDocNodeKind.UnorderedList,
        CustomDocNodeKind.Text,
      ]);

      configuration.docNodeManager.registerAllowableChildren(CustomDocNodeKind.Container, [DocNodeKind.Paragraph]);

      CustomDocNodes._configuration = configuration;
    }
    return CustomDocNodes._configuration;
  }
}
