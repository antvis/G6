import { DocNode, type IDocNodeParameters } from '@microsoft/tsdoc';
import { LocaleLanguage } from '../constants/locale';
import { PageTitle } from '../constants/page';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocPageTitle}.
 */
export interface IDocPageTitleParameters extends IDocNodeParameters {
  key: string;
  locale: string;
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
    const { key, locale, order } = parameters;
    const arr = PageTitle[key];
    this.title = arr ? (locale === LocaleLanguage.EN ? arr[0] : arr.join(' ')) : key;
    this.order = order;
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.PageTitle;
  }
}
