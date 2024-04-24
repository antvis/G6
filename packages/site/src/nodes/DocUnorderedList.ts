import type { DocNode, IDocNodeParameters } from '@microsoft/tsdoc';
import { DocNodeContainer } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocUnorderedList}.
 */
export interface IDocUnorderedListParameters extends IDocNodeParameters {}

/**
 * Represents an unordered list of spans.
 */
export class DocUnorderedList extends DocNodeContainer {
  public constructor(parameters: IDocUnorderedListParameters, children?: DocNode[]) {
    super(parameters, children);
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.UnorderedList;
  }
}
