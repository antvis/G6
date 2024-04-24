import type { IDocNodeParameters } from '@microsoft/tsdoc';
import { DocNode } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocHeading}.
 */
export interface IDocHeadingParameters extends IDocNodeParameters {
  title: string;
  level?: number;
}

/**
 * Represents a section header similar to an HTML `<h1>` or `<h2>` element.
 */
export class DocHeading extends DocNode {
  public readonly title: string;
  public readonly level: number;

  public constructor(parameters: IDocHeadingParameters) {
    super(parameters);
    this.title = parameters.title;
    this.level = parameters.level !== undefined ? parameters.level : 1;

    if (this.level < 1 || this.level > 5) {
      throw new Error('IDocHeadingParameters.level must be a number between 1 and 5');
    }
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.Heading;
  }
}
