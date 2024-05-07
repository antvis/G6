import type { IDocNodeParameters } from '@microsoft/tsdoc';
import { DocNode } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocText}.
 */
export interface IDocTextParameters extends IDocNodeParameters {
  text: string;
}

/**
 * Different from DocPlainText, DocText won't do parsing for the text.
 */
export class DocText extends DocNode {
  public readonly text: string;

  public constructor(parameters: IDocTextParameters) {
    super(parameters);
    this.text = parameters.text;
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.Text;
  }
}
