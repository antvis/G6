import type { IDocNodeParameters } from '@microsoft/tsdoc';
import { DocNode } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocPageTitle}.
 */
export interface IDocPageTitleParameters extends IDocNodeParameters {
  title: string;
  order?: number;
}

/**
 * Represents a page title as the following format:
 * ```
 * ---
 * title: 文档标题
 * order: 1 <!-- order 越小越靠前，默认为 0 -->
 * ---
 * ```
 */
export class DocPageTitle extends DocNode {
  public readonly title: string;
  public readonly order?: number;

  public constructor(parameters: IDocPageTitleParameters) {
    super(parameters);
    this.title = parameters.title;
    this.order = parameters.order;
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.PageTitle;
  }
}
