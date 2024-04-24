import type { IDocNodeParameters } from '@microsoft/tsdoc';
import { DocNode, DocSection } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocNoteBox}.
 */
export interface IDocNoteBoxParameters extends IDocNodeParameters {}

/**
 * Represents a note box, which is typically displayed as a bordered box containing informational text.
 */
export class DocNoteBox extends DocNode {
  public readonly content: DocSection;

  public constructor(parameters: IDocNoteBoxParameters, sectionChildNodes?: ReadonlyArray<DocNode>) {
    super(parameters);
    this.content = new DocSection({ configuration: this.configuration }, sectionChildNodes);
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.NoteBox;
  }

  /** @override */
  protected onGetChildNodes(): ReadonlyArray<DocNode | undefined> {
    return [this.content];
  }
}
