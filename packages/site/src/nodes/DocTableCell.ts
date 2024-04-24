import type { IDocNodeParameters } from '@microsoft/tsdoc';
import { DocNode, DocSection } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocTableCell}.
 */
export interface IDocTableCellParameters extends IDocNodeParameters {}

/**
 * Represents table cell, similar to an HTML `<td>` element.
 */
export class DocTableCell extends DocNode {
  public readonly content: DocSection;

  public constructor(parameters: IDocTableCellParameters, sectionChildNodes?: ReadonlyArray<DocNode>) {
    super(parameters);

    this.content = new DocSection({ configuration: this.configuration }, sectionChildNodes);
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.TableCell;
  }
}
