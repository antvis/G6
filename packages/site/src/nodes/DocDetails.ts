import type { IDocNodeParameters } from '@microsoft/tsdoc';
import { DocNode, DocSection } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocDetails}.
 */
export interface IDocDetailsParameters extends IDocNodeParameters {}

/**
 * Represents a detail box, which is a collapsible section that can contain arbitrary content as the following format:
 *
 * ```
 * <details>
 *    <summary>Click to expand</summary>
 *    <p>Content goes here</p>
 * </details>
 */
export class DocDetails extends DocNode {
  public readonly summary: string;
  public readonly content: DocSection;

  public constructor(parameters: IDocDetailsParameters, summary: string, sectionChildNodes?: ReadonlyArray<DocNode>) {
    super(parameters);
    this.summary = summary;
    this.content = new DocSection({ configuration: this.configuration }, sectionChildNodes);
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.Details;
  }

  /** @override */
  protected onGetChildNodes(): ReadonlyArray<DocNode | undefined> {
    return [this.content];
  }
}
