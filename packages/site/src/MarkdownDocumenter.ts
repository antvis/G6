/* eslint-disable jsdoc/require-param */
import {
  ApiAbstractMixin,
  ApiClass,
  ApiDeclaredItem,
  ApiDocumentedItem,
  ApiEnum,
  ApiInitializerMixin,
  ApiInterface,
  ApiItem,
  ApiItemKind,
  ApiMethod,
  ApiModel,
  ApiNamespace,
  ApiOptionalMixin,
  ApiPackage,
  ApiParameterListMixin,
  ApiPropertyItem,
  ApiProtectedMixin,
  ApiReadonlyMixin,
  ApiReleaseTagMixin,
  ApiReturnTypeMixin,
  ApiStaticMixin,
  ApiTypeAlias,
  Excerpt,
  ExcerptToken,
  ExcerptTokenKind,
  IFindApiItemsResult,
  IResolveDeclarationReferenceResult,
  ReleaseTag,
} from '@microsoft/api-extractor-model';
import {
  DocBlock,
  DocCodeSpan,
  DocComment,
  DocFencedCode,
  DocHtmlStartTag,
  DocLinkTag,
  DocNode,
  DocNodeContainer,
  DocNodeKind,
  DocParagraph,
  DocPlainText,
  DocSection,
  StandardTags,
  StringBuilder,
  TSDocConfiguration,
} from '@microsoft/tsdoc';
import { FileSystem, NewlineKind, PackageName } from '@rushstack/node-core-library';
import { camelCase, isBoolean, kebabCase, startCase, upperFirst } from 'lodash';
import * as path from 'path';
import prettier from 'prettier';
import { intl } from './constants';
import { links } from './constants/link';
import { Keyword, LocaleLanguage, LocaleType } from './constants/locales/enum';
import { CustomMarkdownEmitter } from './markdown/CustomMarkdownEmitter';
import { CustomDocNodes } from './nodes/CustomDocNodeKind';
import { DocDetails } from './nodes/DocDetails';
import { DocEmphasisSpan } from './nodes/DocEmphasisSpan';
import { DocHeading } from './nodes/DocHeading';
import { DocNoteBox } from './nodes/DocNoteBox';
import { DocPageTitle } from './nodes/DocPageTitle';
import { DocTable } from './nodes/DocTable';
import { DocTableCell } from './nodes/DocTableCell';
import { DocTableRow } from './nodes/DocTableRow';
import { DocText } from './nodes/DocText';
import { DocUnorderedList } from './nodes/DocUnorderedList';
import { Utilities } from './utils/Utilities';
import {
  ICustomExcerptToken,
  findAccessorExcerptTokens,
  liftPrefixExcerptTokens,
  parseExcerptTokens,
} from './utils/excerpt-token';
import { initGitignore, syncToGitignore } from './utils/gitignore';
import { getBlockTagByName } from './utils/parser';

const referenceFoldername = 'reference';

const supportedApiItems = [ApiItemKind.Interface, ApiItemKind.Enum, ApiItemKind.Class, ApiItemKind.TypeAlias];

// 需要跳过解析的复杂类型 | Complex types that need to be skipped for parsing
export const interfacesToSkipParsing = ['BaseNodeStyleProps', 'BaseEdgeStyleProps', 'BaseComboStyleProps'];

const typesToSkipParsing = ['CallableValue'];

/**
 * A page and its associated API items.
 */
export interface IPageData {
  readonly name: string;
  readonly apiItems: ApiItem[];
  readonly group: string;
}

export interface ICollectedData {
  readonly apiModel: ApiModel;
  /**
   * Page data keyed by page name.
   * Entries in this object are unique.
   */
  readonly pagesByName: Map<string, IPageData>;
  /**
   * `pagesByName` re-keyed by API name for lookup convenience.
   * Entries are the same objects from `pagesByName`, but each page may appear multiple times.
   */
  readonly pagesByApi: Map<string, IPageData>;
}

export interface IMarkdownDocumenterOptions {
  apiModel: ApiModel;
  outputFolder: string;
}

export class MarkdownDocumenter {
  private readonly _apiModel: ApiModel;
  private readonly _tsdocConfiguration: TSDocConfiguration;
  private readonly _markdownEmitter: CustomMarkdownEmitter;
  private readonly _outputFolder: string;

  private locale: LocaleLanguage = LocaleLanguage.EN;
  /**
   * The reference level of the current page, used to determine the heading level of the current page.
   * 0: API Reference
   * 1: Extension
   * 2: Element Style Props
   */
  private referenceLevel = 0;

  public constructor(options: IMarkdownDocumenterOptions) {
    this._apiModel = options.apiModel;
    this._outputFolder = options.outputFolder;
    this._tsdocConfiguration = CustomDocNodes.configuration;
    this._markdownEmitter = new CustomMarkdownEmitter(this._apiModel);
  }

  public async generateFiles() {
    initGitignore(this._outputFolder);

    const collectedData = this._initPageData(this._apiModel);

    // Write the API model page
    this.referenceLevel = 0;
    await this._generateBilingualPages(this._writeApiItemPage.bind(this), this._apiModel);

    // Write the API pages classified by extension
    for (const [_, pageData] of collectedData.pagesByName.entries()) {
      // 对于交互、插件、布局、数据处理
      const extensions = ['behaviors', 'plugins', 'layouts', 'transforms'];
      if (extensions.includes(pageData.group) && !pageData.name.startsWith('Base')) {
        this.referenceLevel = 1;
        await this._generateBilingualPages(this._writeExtensionPage.bind(this), pageData);
      }

      // 对于数据
      if (pageData.group === 'spec' && pageData.name === 'Data') {
        const dataTypes = ['GraphData', 'NodeData', 'EdgeData', 'ComboData'];
        dataTypes.forEach(async (name) => {
          this.referenceLevel = 1;
          const apiInterface = pageData.apiItems.find(
            (apiItem) => apiItem instanceof ApiInterface && apiItem.displayName === name,
          ) as ApiInterface;
          if (apiInterface) {
            await this._generateBilingualPages(this._writeDataPage.bind(this), apiInterface);
          }
        });
      }

      // 对于元素
      if (['elements/nodes', 'elements/edges', 'elements/combos'].includes(pageData.group)) {
        this.referenceLevel = 2;
        await this._generateBilingualPages(this._writeElementPage.bind(this), pageData);
      }

      // 对于图实例，将拆分成三个页面： 配置项，实例方法，属性
      // For graph instance, split into three pages: options, methods, properties
      if (pageData.group === 'runtime' && pageData.name === 'Graph') {
        this.referenceLevel = 1;
        this._generateBilingualPages(this._writeGraphOptionsPage.bind(this), pageData);
        this._generateBilingualPages(this._writeGraphMethodsPage.bind(this), pageData);
        this._generateBilingualPages(this._writeGraphPropertiesPage.bind(this), pageData);
      }
    }
  }

  private _initPageData(apiModel: ApiModel): ICollectedData {
    const collectedData: ICollectedData = {
      apiModel,
      pagesByName: new Map(),
      pagesByApi: new Map(),
    };

    for (const apiPackage of collectedData.apiModel.packages) {
      for (const entryPoint of apiPackage.entryPoints) {
        this._initPageDataForItem(collectedData, entryPoint, apiPackage.entryPoints as unknown as ApiItem[]);
      }
    }

    return collectedData;
  }

  private _initPageDataForItem(collectedData: ICollectedData, apiItem: ApiItem, siblingApiItems?: ApiItem[]) {
    if (
      supportedApiItems.includes(apiItem.kind as unknown as ApiItemKind) &&
      apiItem instanceof ApiDeclaredItem &&
      apiItem.fileUrlPath
    ) {
      const paths = apiItem.fileUrlPath?.split('/').slice(1);
      // For elements, group by the first two levels of the path, such as `elements.nodes`
      // For others, group by the first level of the path, such as `behaviors`, `plugins`, `layouts`
      const topGroup = paths?.[0];
      let group = topGroup === 'elements' ? paths.slice(0, 2).join('/') : topGroup;
      const target = paths?.[paths.length - 1].replace(/\.d\.ts$/, '');
      let pageName = upperFirst(camelCase(target === 'index' ? paths?.[paths.length - 2] : target));

      if (topGroup === 'elements' && paths[1] === 'combos') {
        const elementType = upperFirst(paths[1].slice(0, -1));
        if (!pageName.endsWith(elementType)) pageName += elementType;
      }

      // Special handling for @antv/layout
      if (apiItem.fileUrlPath.includes('@antv/layout')) {
        group = 'layouts';
        const name =
          target === 'types'
            ? paths?.[paths.length - 2] === 'lib'
              ? (apiItem as ApiInterface).name.replace('LayoutOptions', '')
              : paths?.[paths.length - 2]
            : target;
        pageName = upperFirst(camelCase(name) + 'Layout');
      }

      if (!pageName) return;

      let pageData = collectedData.pagesByName.get(pageName);

      if (!pageData) {
        pageData = {
          name: pageName,
          apiItems: [],
          group,
        };
        collectedData.pagesByName.set(pageName, pageData);
      }
      collectedData.pagesByApi.set(apiItem.displayName, pageData);
      pageData.apiItems.push(apiItem);
    }

    for (const memberApiItem of apiItem.members) {
      this._initPageDataForItem(collectedData, memberApiItem, apiItem.members as ApiItem[]);
    }
  }

  /**
   * Generate bilingual pages
   */
  private async _generateBilingualPages<T>(func: (params: T) => Promise<void>, params: T) {
    const languages = [LocaleLanguage.EN, LocaleLanguage.ZH];

    for (const language of languages) {
      this.locale = language;
      await func(params);
    }
  }

  private async _writeApiItemPage(apiItem: ApiItem) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    const scopedName: string = apiItem.getScopedNameWithinPackage();
    let title = '';

    switch (apiItem.kind) {
      case ApiItemKind.Class:
        title = `${scopedName} class`;
        break;
      case ApiItemKind.Enum:
        title = `${scopedName} enum`;
        break;
      case ApiItemKind.Interface:
        title = `${scopedName} interface`;
        break;
      case ApiItemKind.Constructor:
      case ApiItemKind.ConstructSignature:
        title = scopedName;
        break;
      case ApiItemKind.Method:
      case ApiItemKind.MethodSignature:
        title = `${scopedName} method`;
        break;
      case ApiItemKind.Function:
        title = `${scopedName} function`;
        break;
      case ApiItemKind.Model:
        title = `API Reference`;
        break;
      case ApiItemKind.Namespace:
        title = `${scopedName} namespace`;
        break;
      case ApiItemKind.Package: {
        const unscopedPackageName: string = PackageName.getUnscopedName(apiItem.displayName);
        title = unscopedPackageName;
        break;
      }
      case ApiItemKind.Property:
      case ApiItemKind.PropertySignature:
        title = `${scopedName} property`;
        break;
      case ApiItemKind.TypeAlias:
        title = `${scopedName} type`;
        break;
      case ApiItemKind.Variable:
        title = `${scopedName} variable`;
        break;
      default:
        throw new Error('Unsupported API item kind: ' + apiItem.kind);
    }

    this._appendPageTitle(output, title);
    this._writeBreadcrumb(output, apiItem);
    output.appendNode(new DocHeading({ configuration, title }));

    if (ApiReleaseTagMixin.isBaseClassOf(apiItem)) {
      if (apiItem.releaseTag === ReleaseTag.Alpha) {
        this._writeAlphaWarning(output);
      } else if (apiItem.releaseTag === ReleaseTag.Beta) {
        this._writeBetaWarning(output);
      }
    }

    const decoratorBlocks: DocBlock[] = [];

    if (apiItem instanceof ApiDocumentedItem) {
      const tsdocComment: DocComment | undefined = apiItem.tsdocComment;

      if (tsdocComment) {
        decoratorBlocks.push(
          ...tsdocComment.customBlocks.filter(
            (block) => block.blockTag.tagNameWithUpperCase === StandardTags.decorator.tagNameWithUpperCase,
          ),
        );

        if (tsdocComment.deprecatedBlock) {
          output.appendNode(
            new DocNoteBox({ configuration }, [
              new DocParagraph({ configuration }, [
                new DocPlainText({
                  configuration,
                  text: 'Warning: This API is now obsolete. ',
                }),
              ]),
              ...tsdocComment.deprecatedBlock.content.nodes,
            ]),
          );
        }
        this._writeSummarySection(output, apiItem);
      }
    }

    if (apiItem instanceof ApiDeclaredItem) {
      if (apiItem.excerpt.text.length > 0) {
        output.appendNode(
          new DocFencedCode({
            configuration,
            code: apiItem.getExcerptWithModifiers(),
            language: 'typescript',
          }),
        );
      }

      this._writeHeritageTypes(output, apiItem);
    }

    if (decoratorBlocks.length > 0) {
      output.appendNodeInParagraph(
        new DocEmphasisSpan({ configuration, bold: true }, [new DocPlainText({ configuration, text: 'Decorators:' })]),
      );
      for (const decoratorBlock of decoratorBlocks) {
        output.appendNodes(decoratorBlock.content.nodes);
      }
    }

    let appendRemarks: boolean = true;
    switch (apiItem.kind) {
      case ApiItemKind.Class:
      case ApiItemKind.Interface:
      case ApiItemKind.Namespace:
      case ApiItemKind.Package:
        this._writeRemarksSection(output, apiItem);
        appendRemarks = false;
        break;
    }

    switch (apiItem.kind) {
      case ApiItemKind.Class:
        this._writeClassTables(output, apiItem as ApiClass);
        break;
      case ApiItemKind.Enum:
        this._writeEnumTables(output, apiItem as ApiEnum);
        break;
      case ApiItemKind.Interface:
        this._writeInterfaceTables(output, apiItem as ApiInterface);
        break;
      case ApiItemKind.Constructor:
      case ApiItemKind.ConstructSignature:
      case ApiItemKind.Method:
      case ApiItemKind.MethodSignature:
      case ApiItemKind.Function:
        this._writeParameterTables(output, apiItem as ApiParameterListMixin);
        this._writeThrowsSection(output, apiItem);
        break;
      case ApiItemKind.Namespace:
        this._writePackageOrNamespaceTables(output, apiItem as ApiNamespace);
        break;
      case ApiItemKind.Model:
        this._writeModelTable(output, apiItem as ApiModel);
        break;
      case ApiItemKind.Package:
        this._writePackageOrNamespaceTables(output, apiItem as ApiPackage);
        break;
      case ApiItemKind.Property:
      case ApiItemKind.PropertySignature:
        break;
      case ApiItemKind.TypeAlias:
        break;
      case ApiItemKind.Variable:
        break;
      default:
        throw new Error('Unsupported API item kind: ' + apiItem.kind);
    }

    if (appendRemarks) {
      this._writeRemarksSection(output, apiItem);
    }

    const filename: string = path.join(this._outputFolder, referenceFoldername, this._getFilenameForApiItem(apiItem));

    if (filename.startsWith('index')) return;

    await this._writeFile(filename, output, apiItem);
  }

  private async _writeExtensionPage(pageData: IPageData) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    this._appendPageTitle(output, pageData.name);

    const apiClass = pageData.apiItems.find((apiItem) => apiItem instanceof ApiClass) as ApiClass;
    const apiInterface = pageData.apiItems.find((apiItem) => apiItem instanceof ApiInterface) as ApiInterface;

    if (apiClass) {
      this._writeRemarksSection(output, apiClass);
    }

    this._assertDemo(output, pageData);

    if (apiInterface) {
      this._writeOptions(output, apiInterface, { includeExcerptTokens: true });
    }

    if (apiClass) this._writeAPIMethods(output, apiClass);

    const filename: string = path.join(this._outputFolder, pageData.group, `${pageData.name}.${this._getLang()}.md`);

    await this._writeFile(
      filename,
      output,
      pageData.apiItems.find((apiItem) => apiItem instanceof ApiClass),
    );
  }

  private async _writeDataPage(apiInterface: ApiInterface) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    const name = apiInterface.displayName;

    const DATA_INDEX: Record<string, number> = {
      GraphData: 0,
      NodeData: 1,
      EdgeData: 2,
      ComboData: 3,
    };

    this._appendPageTitle(output, name, DATA_INDEX[name]);

    this._writeRemarksSection(output, apiInterface);

    this._writeOptions(output, apiInterface, { includeExcerptTokens: true, showTitle: false });

    const filename: string = path.join(this._outputFolder, 'data', `${name}.${this._getLang()}.md`);

    await this._writeFile(filename, output);
  }

  private async _writeElementPage(pageData: IPageData) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    this._appendPageTitle(output, pageData.name);

    const apiInterface = pageData.apiItems.find((apiItem) => apiItem instanceof ApiInterface) as ApiInterface;
    const apiClass = pageData.apiItems.find((apiItem) => apiItem instanceof ApiClass) as ApiClass;

    const isBase = pageData.name.startsWith('Base');

    if (apiClass && !isBase) {
      this._writeRemarksSection(output, apiClass);
    }

    this._assertDemo(output, pageData);

    if (apiInterface) {
      this._writeElementOptions(output, apiInterface, pageData, isBase);
    }

    const filename: string = path.join(this._outputFolder, pageData.group, `${pageData.name}.${this._getLang()}.md`);

    await this._writeFile(filename, output);
  }

  /**
   * Special for Element options, which needs to handle `Prefix`
   */
  private _writeElementOptions(output: DocSection, apiInterface: ApiInterface, pageData: IPageData, isBase: boolean) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    if (!isBase) {
      const elementType = pageData.group.split('/')[1].slice(0, -1);
      const baseStyleFileName = upperFirst(camelCase(`base ${elementType}`));
      const quoteText =
        '> ' +
        this._intl('base-props-style-tip', LocaleType.HELPER) +
        this._getLinkInMarkdownFormat(baseStyleFileName, `./${baseStyleFileName}.${this._getLang()}.md`);
      output.appendNodeInParagraph(new DocText({ configuration, text: quoteText }));
    }

    this._writeOptions(output, apiInterface, { showTitle: false, includeExcerptTokens: true });
  }

  private _getLinkFromExcerptToken(excerptToken: ICustomExcerptToken): string | undefined {
    return this._getLinkFromlinks(excerptToken) || this._getLinkFromCanonicalReference(excerptToken);
  }

  private _getLinkFromlinks(excerptToken: ICustomExcerptToken): string | undefined {
    return links[excerptToken.text];
  }

  private _getLinkFromCanonicalReference(excerptToken: ICustomExcerptToken): string | undefined {
    let link: string | undefined = undefined;

    if (excerptToken.canonicalReference) {
      const apiItemResult = this._apiModel.resolveDeclarationReference(
        excerptToken.canonicalReference,
        undefined,
      ).resolvedApiItem;

      if (apiItemResult && apiItemResult instanceof ApiInterface) {
        link = this._getLinkFilenameForApiItem(apiItemResult);
      }
    }

    return link;
  }

  private _writeOptions(
    output: DocSection,
    apiItem: ApiInterface | ApiClass,
    options?: { showTitle?: boolean; prefix?: string; includeExcerptTokens?: boolean },
  ) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const { showTitle = true, prefix = '', includeExcerptTokens } = options || {};
    const apiMembers: readonly ApiItem[] = this._getMembersAndWriteIncompleteWarning(apiItem, output);

    if (showTitle && apiMembers.length > 0) {
      output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.OPTIONS) }));
    }

    if (includeExcerptTokens && this._isApiInterface(apiItem)) {
      const filteredTokens = this._extractAndFilterExcerptTokens(apiItem as ApiInterface);
      this._writeExcerptTokens(output, filteredTokens);
    }

    apiMembers.forEach((apiMember) => {
      if (this._isApiProperty(apiMember)) {
        this._writePropertySections(output, apiMember, prefix, configuration);
      }
    });

    if (includeExcerptTokens && apiItem instanceof ApiInterface) {
      const liftedTokens = this._liftPrefixExcerptTokens(apiItem);
      this._writeExcerptTokens(output, liftedTokens);
    }
  }

  private _extractAndFilterExcerptTokens(apiItem: ApiInterface): ICustomExcerptToken[] {
    const excerptTokens = parseExcerptTokens(this._apiModel, apiItem);

    const filterTokens = (tokens: ICustomExcerptToken[]): ICustomExcerptToken[] => {
      return tokens
        .filter((token) => token.type !== 'Prefix' && !interfacesToSkipParsing.includes(token.text))
        .map((token) => ({
          ...token,
          children: token.children ? filterTokens(token.children) : [],
        }));
    };

    return filterTokens(excerptTokens);
  }

  private _writePropertySections(
    output: DocSection,
    apiMember: ApiPropertyItem,
    prefix: string,
    configuration: TSDocConfiguration,
  ): void {
    const name = Utilities.getConciseSignature(apiMember);
    const isRequired =
      ApiOptionalMixin.isBaseClassOf(apiMember) &&
      isBoolean(apiMember.isOptional) &&
      !apiMember.isOptional &&
      apiMember.parent?.kind === ApiItemKind.Interface;
    const title = prefix ? camelCase(`${prefix} ${name}`) : name;

    output.appendNode(
      new DocHeading({
        configuration,
        title,
        level: 2,
        prefix: isRequired ? '<Badge type="success">Required</Badge>' : '',
      }),
    );

    // write property type
    const propertyContent: DocNode[] = [
      new DocEmphasisSpan({ configuration, italic: true }, [
        ...this._createParagraphForTypeExcerpt(apiMember.propertyTypeExcerpt).getChildNodes(),
        new DocPlainText({ configuration, text: ' ' }),
      ]),
    ];

    // write @defaultValue tag
    if (apiMember instanceof ApiDocumentedItem) {
      if (apiMember.tsdocComment !== undefined) {
        const defaultValueBlock: DocBlock | undefined = apiMember.tsdocComment.customBlocks?.find(
          (x) => x.blockTag.tagNameWithUpperCase === StandardTags.defaultValue.tagNameWithUpperCase,
        );

        if (defaultValueBlock) {
          propertyContent.push(
            new DocEmphasisSpan({ configuration, bold: true }, [
              new DocPlainText({
                configuration,
                text: 'Default: ',
              }),
            ]),
            this._createStaticCode(defaultValueBlock.content.nodes[0] as DocSection),
          );
        }
      }
    }

    output.appendNode(new DocNoteBox({ configuration }, [new DocParagraph({ configuration }, propertyContent)]));

    this._writeSummarySection(output, apiMember);
    this._writeRemarksSection(output, apiMember);
  }

  private _isApiProperty(apiItem: ApiItem): apiItem is ApiPropertyItem {
    return apiItem.kind === ApiItemKind.Property || apiItem.kind === ApiItemKind.PropertySignature;
  }

  private _isApiInterface(apiItem: ApiItem): apiItem is ApiInterface {
    return apiItem.kind === ApiItemKind.Interface;
  }

  private _liftPrefixExcerptTokens(apiItem: ApiInterface): ICustomExcerptToken[] {
    const excerptTokens = parseExcerptTokens(this._apiModel, apiItem);
    return liftPrefixExcerptTokens(excerptTokens);
  }

  private _writeExcerptTokens(output: DocSection, customExcerptTokens: ICustomExcerptToken[]) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    for (const customExcerptToken of customExcerptTokens) {
      const texts: { text: string; minor?: string }[] = [];

      const { type, text } = customExcerptToken;

      if (type === 'Prefix') {
        const { prefix } = customExcerptToken;
        output.appendNode(
          new DocHeading({
            configuration: this._tsdocConfiguration,
            title: startCase(prefix) + ' ' + this._intl('style', LocaleType.HELPER),
            escaped: false,
          }),
        );
        if (!customExcerptToken.interface) {
          const link = this._getLinkFromExcerptToken(customExcerptToken);
          texts.push({ text: this._getLinkInMarkdownFormat(text, link) });
        }
      }

      const flattenTokens = (tokens: ICustomExcerptToken[]): ICustomExcerptToken[] => {
        return tokens.flatMap((token) => {
          if (Array.isArray(token.children) && token.children.length > 0) {
            return flattenTokens(token.children);
          } else {
            return [token];
          }
        });
      };

      const formattedTokens = flattenTokens([customExcerptToken]).filter((token) => token.type !== 'Prefix');
      formattedTokens.forEach((token) => {
        const link = this._getLinkFromExcerptToken(token);
        const linkMd = this._getLinkInMarkdownFormat(token.text, link);
        switch (token.type) {
          case 'Omit':
          case 'Pick': {
            const fieldString = token.fields.join(',');
            texts.push({
              text: linkMd,
              minor: this._intl(token.type === 'Omit' ? 'excludes' : 'includes', LocaleType.HELPER) + ' ' + fieldString,
            });
            break;
          }
          case 'Default': {
            if (!token.interface) texts.push({ text: linkMd });
            break;
          }
          default:
            break;
        }
      });

      if (customExcerptToken.type === 'Prefix') {
        texts.forEach(({ text, minor }) => {
          const title = `${customExcerptToken.prefix}{${text}}`;
          const template = `TextStyleProps ${this._intl('prefix-description-1', LocaleType.HELPER)}

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} ${this._intl('prefix-description-2', LocaleType.HELPER)}

- iconFill
- iconFontSize
- iconFontWeight
- ...
`;

          const nodes: DocNode[] = [
            new DocHeading({ configuration, title, level: 2 }),
            new DocDetails({ configuration }, this._intl('prefix-summary', LocaleType.HELPER), [
              new DocParagraph({ configuration }, [new DocText({ configuration, text: template })]),
            ]),
          ];

          if (minor) {
            nodes.splice(
              1,
              0,
              new DocParagraph({ configuration }, [new DocText({ configuration, text: '> ' + minor })]),
            );
          }

          output.appendNodes(nodes);
        });
      }

      const cache = new Set();

      if (
        (customExcerptToken.type === 'Prefix' || customExcerptToken.type === 'Default') &&
        customExcerptToken.interface
      ) {
        if (cache.has(customExcerptToken.interface.name)) continue;
        this._writeOptions(output, customExcerptToken.interface, {
          showTitle: false,
          prefix: 'prefix' in customExcerptToken ? customExcerptToken.prefix : '',
        });
        cache.add(customExcerptToken.interface.name);
      }

      formattedTokens.forEach((newToken) => {
        const accessors = findAccessorExcerptTokens(newToken, false);
        for (const _token of accessors) {
          if (_token.interface) {
            if (cache.has(_token.interface.name)) continue;
            this._writeOptions(output, _token.interface, {
              showTitle: false,
              prefix: (customExcerptToken as any).prefix,
            });
            cache.add(_token.interface.name);
          }
        }
      });
    }
  }

  private _writeAPIMethods(
    output: DocSection,
    apiClass: ApiClass,
    options?: { showTitle?: boolean; showSubTitle?: boolean },
  ) {
    const { showTitle = true, showSubTitle = false } = options || {};
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const apiMembers: ApiItem[] = this._getMembersAndWriteIncompleteWarning(apiClass, output) as ApiItem[];

    const groupMembers: { [key: string]: ApiItem[] } = {};

    if (!showSubTitle) groupMembers['undeclared'] = apiMembers;

    if (showSubTitle) {
      for (const apiMember of apiMembers) {
        if (apiMember instanceof ApiDocumentedItem) {
          const tsdocComment: DocComment | undefined = apiMember.tsdocComment;
          let ApiCategoryDefined = false;
          if (tsdocComment && tsdocComment.customBlocks) {
            const apiCategoryBlock = getBlockTagByName('@apiCategory', tsdocComment);
            if (apiCategoryBlock) {
              const apiCategory = this._extractContentFromSection(apiCategoryBlock);
              ApiCategoryDefined = true;
              groupMembers[apiCategory] ||= [];
              groupMembers[apiCategory].push(apiMember);
            }
          }
          if (!ApiCategoryDefined) {
            groupMembers['undeclared'] ||= [];
            groupMembers['undeclared'].push(apiMember);
          }
        }
      }
    }

    if (apiMembers.length > 0 && showTitle) output.appendNode(new DocHeading({ configuration, title: 'API' }));

    Object.entries(groupMembers).forEach(([category, apiMembers]) => {
      if (category !== 'undeclared' && showSubTitle) {
        const title = this._intl(category, LocaleType.API_CATEGORY);
        output.appendNode(new DocHeading({ configuration, title, level: 1 }));
      }
      if (apiMembers.length > 0) {
        for (const apiMember of apiMembers) {
          switch (apiMember.kind) {
            case ApiItemKind.Method: {
              output.appendNode(
                new DocHeading({
                  configuration,
                  title: Utilities.getConciseSignature(apiMember, true),
                  level: 2,
                  prefix: (apiMember as ApiMethod).overloadIndex > 1 ? '<Badge type="warning">Overload</Badge>' : '',
                }),
              );

              if (apiMember instanceof ApiDocumentedItem) {
                if (apiMember.tsdocComment !== undefined) {
                  this._appendSection(
                    output,
                    this._localizeSection(apiMember.tsdocComment.summarySection, this.locale),
                  );
                }
              }
              if (apiMember instanceof ApiDeclaredItem) {
                if (apiMember.excerpt.text.length > 0) {
                  output.appendNode(
                    new DocFencedCode({
                      configuration,
                      code: apiMember.getExcerptWithModifiers(),
                      language: 'typescript',
                    }),
                  );
                }
                this._writeHeritageTypes(output, apiMember);
              }

              this._writeRemarksSection(output, apiMember);

              const detailSection = new DocSection({ configuration });

              const hasParameterAndReturn = this._writeParameterTables(
                detailSection,
                apiMember as ApiParameterListMixin,
                { showTitle: false },
              );

              if (hasParameterAndReturn) {
                output.appendNode(
                  new DocDetails({ configuration }, this._intl(Keyword.VIEW_PARAMETERS), detailSection.nodes),
                );
              }
              break;
            }
          }
        }
      }
    });
  }
  private async _writeGraphOptionsPage(pageData: IPageData) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    this._appendPageTitle(output, 'GraphOptions', 0);

    const apiInterface = pageData.apiItems.find((apiItem) => apiItem instanceof ApiInterface) as ApiInterface;

    if (apiInterface) {
      this._writeRemarksSection(output, apiInterface);
      this._writeOptions(output, apiInterface, { showTitle: false, includeExcerptTokens: true });
    }

    const filename: string = path.join(this._outputFolder, 'graph', `option.${this._getLang()}.md`);

    await this._writeFile(filename, output);
  }

  private async _writeGraphMethodsPage(pageData: IPageData) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    this._appendPageTitle(output, 'GraphMethods', 1);

    const apiClass = pageData.apiItems.find((apiItem) => apiItem instanceof ApiClass) as ApiClass;

    if (apiClass) this._writeAPIMethods(output, apiClass, { showTitle: false, showSubTitle: true });

    const filename: string = path.join(this._outputFolder, 'graph', `method.${this._getLang()}.md`);

    await this._writeFile(filename, output);
  }

  private async _writeGraphPropertiesPage(pageData: IPageData) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    this._appendPageTitle(output, 'GraphProperties', 2);

    const apiClass = pageData.apiItems.find((apiItem) => apiItem instanceof ApiClass) as ApiClass;

    if (apiClass) this._writeOptions(output, apiClass, { showTitle: false });

    const filename: string = path.join(this._outputFolder, 'graph', `property.${this._getLang()}.md`);

    await this._writeFile(filename, output);
  }

  private async _writeFile(filename: string, output: DocSection, apiItem?: ApiItem) {
    const stringBuilder: StringBuilder = new StringBuilder();

    this._markdownEmitter.emit(stringBuilder, output, {
      contextApiItem: apiItem,
      onGetFilenameForApiItem: (apiItemForFilename: ApiItem) => {
        return this._getLinkFilenameForApiItem(apiItemForFilename);
      },
    });

    const pageContent: string = await prettier.format(stringBuilder.toString(), { parser: 'markdown' });

    FileSystem.ensureFolder(path.dirname(filename));

    FileSystem.writeFile(filename, pageContent, {
      convertLineEndings: NewlineKind.CrLf,
    });

    syncToGitignore(this._outputFolder, filename);
  }

  private _writeHeritageTypes(output: DocSection, apiItem: ApiDeclaredItem): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    if (apiItem instanceof ApiClass) {
      if (apiItem.extendsType) {
        const extendsParagraph: DocParagraph = new DocParagraph({ configuration }, [
          new DocEmphasisSpan({ configuration, bold: true }, [
            new DocPlainText({
              configuration,
              text: this._intl(Keyword.EXTENDS) + this._intl(Keyword.COLON),
            }),
          ]),
        ]);
        this._appendExcerptWithHyperlinks(extendsParagraph, apiItem.extendsType.excerpt);
        output.appendNode(extendsParagraph);
      }
      if (apiItem.implementsTypes.length > 0) {
        const implementsParagraph: DocParagraph = new DocParagraph({ configuration }, [
          new DocEmphasisSpan({ configuration, bold: true }, [
            new DocPlainText({
              configuration,
              text: this._intl(Keyword.IMPLEMENTS) + this._intl(Keyword.COLON),
            }),
          ]),
        ]);
        let needsComma: boolean = false;
        for (const implementsType of apiItem.implementsTypes) {
          if (needsComma) {
            implementsParagraph.appendNode(
              new DocPlainText({
                configuration,
                text: this._intl(Keyword.COMMA),
              }),
            );
          }
          this._appendExcerptWithHyperlinks(implementsParagraph, implementsType.excerpt);
          needsComma = true;
        }
        output.appendNode(implementsParagraph);
      }
    }

    if (apiItem instanceof ApiInterface) {
      if (apiItem.extendsTypes.length > 0) {
        const extendsParagraph: DocParagraph = new DocParagraph({ configuration }, [
          new DocEmphasisSpan({ configuration, bold: true }, [
            new DocPlainText({
              configuration,
              text: this._intl(Keyword.EXTENDS) + this._intl(Keyword.COLON),
            }),
          ]),
        ]);
        let needsComma: boolean = false;
        for (const extendsType of apiItem.extendsTypes) {
          if (needsComma) {
            extendsParagraph.appendNode(
              new DocPlainText({
                configuration,
                text: this._intl(Keyword.COMMA),
              }),
            );
          }
          this._appendExcerptWithHyperlinks(extendsParagraph, extendsType.excerpt);
          needsComma = true;
        }
        output.appendNode(extendsParagraph);
      }
    }

    if (apiItem instanceof ApiTypeAlias) {
      const refs: ExcerptToken[] = apiItem.excerptTokens.filter(
        (token) =>
          token.kind === ExcerptTokenKind.Reference &&
          token.canonicalReference &&
          this._apiModel.resolveDeclarationReference(token.canonicalReference, undefined).resolvedApiItem,
      );
      if (refs.length > 0) {
        const referencesParagraph: DocParagraph = new DocParagraph({ configuration }, [
          new DocEmphasisSpan({ configuration, bold: true }, [
            new DocPlainText({
              configuration,
              text: this._intl(Keyword.REFERENCES) + this._intl(Keyword.COLON),
            }),
          ]),
        ]);
        let needsComma: boolean = false;
        const visited: Set<string> = new Set();
        for (const ref of refs) {
          if (visited.has(ref.text)) {
            continue;
          }
          visited.add(ref.text);

          if (needsComma) {
            referencesParagraph.appendNode(
              new DocPlainText({
                configuration,
                text: this._intl(Keyword.COMMA),
              }),
            );
          }

          this._appendExcerptTokenWithHyperlinks(referencesParagraph, ref);
          needsComma = true;
        }
        output.appendNode(referencesParagraph);
      }
    }
  }

  private _writeRemarksSection(output: DocSection, apiItem: ApiItem): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    if (apiItem instanceof ApiDocumentedItem) {
      const tsdocComment: DocComment | undefined = apiItem.tsdocComment;

      if (tsdocComment) {
        // Write the @remarks block
        if (tsdocComment.remarksBlock) {
          this._appendSection(output, this._localizeSection(tsdocComment.remarksBlock.content, this.locale));
        }

        // Write the @example blocks
        const exampleBlocks: DocBlock[] = tsdocComment.customBlocks.filter(
          (x) => x.blockTag.tagNameWithUpperCase === StandardTags.example.tagNameWithUpperCase,
        );

        let exampleNumber: number = 1;
        for (const exampleBlock of exampleBlocks) {
          const heading: string = this._intl(Keyword.EXAMPLE) + (exampleBlocks.length > 1 ? ' ' + exampleNumber : '');
          const exampleTitle =
            this.referenceLevel === 0
              ? new DocHeading({ configuration, title: heading })
              : new DocParagraph({ configuration }, [
                  new DocEmphasisSpan({ configuration, bold: true }, [
                    new DocPlainText({ configuration, text: heading }),
                  ]),
                ]);
          output.appendNode(exampleTitle);

          this._appendSection(output, exampleBlock.content);

          ++exampleNumber;
        }
      }
    }
  }

  private _writeThrowsSection(output: DocSection, apiItem: ApiItem): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    if (apiItem instanceof ApiDocumentedItem) {
      const tsdocComment: DocComment | undefined = apiItem.tsdocComment;

      if (tsdocComment) {
        // Write the @throws blocks
        const throwsBlocks: DocBlock[] = tsdocComment.customBlocks.filter(
          (x) => x.blockTag.tagNameWithUpperCase === StandardTags.throws.tagNameWithUpperCase,
        );

        if (throwsBlocks.length > 0) {
          const heading: string = this._intl(Keyword.EXCEPTIONS);
          output.appendNode(new DocHeading({ configuration, title: heading }));

          for (const throwsBlock of throwsBlocks) {
            this._appendSection(output, throwsBlock.content);
          }
        }
      }
    }
  }

  /**
   * GENERATE PAGE: MODEL
   */
  private _writeModelTable(output: DocSection, apiModel: ApiModel): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const packagesTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.PACKAGE), this._intl(Keyword.DESCRIPTION)],
    });

    for (const apiMember of apiModel.members) {
      const row: DocTableRow = new DocTableRow({ configuration }, [
        this._createTitleCell(apiMember),
        this._createDescriptionCell(apiMember),
      ]);

      switch (apiMember.kind) {
        case ApiItemKind.Package:
          packagesTable.addRow(row);
          this._writeApiItemPage(apiMember);
          break;
      }
    }

    if (packagesTable.rows.length > 0) {
      output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.PACKAGES) }));
      output.appendNode(packagesTable);
    }
  }

  /**
   * GENERATE PAGE: PACKAGE or NAMESPACE
   */
  private _writePackageOrNamespaceTables(output: DocSection, apiContainer: ApiPackage | ApiNamespace): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const abstractClassesTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.ABSTRACT_CLASS), this._intl(Keyword.DESCRIPTION)],
    });

    const classesTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.CLASS), this._intl(Keyword.DESCRIPTION)],
    });

    const enumerationsTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.ENUMERATION), this._intl(Keyword.DESCRIPTION)],
    });

    const functionsTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.FUNCTION), this._intl(Keyword.DESCRIPTION)],
    });

    const interfacesTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.INTERFACE), this._intl(Keyword.DESCRIPTION)],
    });

    const namespacesTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.NAMESPACE), this._intl(Keyword.DESCRIPTION)],
    });

    const variablesTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.VARIABLE), this._intl(Keyword.DESCRIPTION)],
    });

    const typeAliasesTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.TYPE_ALIAS), this._intl(Keyword.DESCRIPTION)],
    });

    const apiMembers: ReadonlyArray<ApiItem> =
      apiContainer.kind === ApiItemKind.Package
        ? (apiContainer as ApiPackage).entryPoints[0].members
        : (apiContainer as ApiNamespace).members;

    for (const apiMember of apiMembers) {
      const row: DocTableRow = new DocTableRow({ configuration }, [
        this._createTitleCell(apiMember),
        this._createDescriptionCell(apiMember),
      ]);

      switch (apiMember.kind) {
        case ApiItemKind.Class:
          if (ApiAbstractMixin.isBaseClassOf(apiMember) && apiMember.isAbstract) {
            abstractClassesTable.addRow(row);
          } else {
            classesTable.addRow(row);
          }
          this._writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Enum:
          enumerationsTable.addRow(row);
          this._writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Interface:
          interfacesTable.addRow(row);
          this._writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Namespace:
          namespacesTable.addRow(row);
          this._writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Function:
          functionsTable.addRow(row);
          this._writeApiItemPage(apiMember);
          break;

        case ApiItemKind.TypeAlias:
          typeAliasesTable.addRow(row);
          this._writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Variable:
          variablesTable.addRow(row);
          this._writeApiItemPage(apiMember);
          break;
      }
    }

    if (classesTable.rows.length > 0) {
      output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.CLASSES) }));
      output.appendNode(classesTable);
    }

    if (abstractClassesTable.rows.length > 0) {
      output.appendNode(
        new DocHeading({
          configuration,
          title: this._intl(Keyword.ABSTRACT_CLASSES),
        }),
      );
      output.appendNode(abstractClassesTable);
    }

    if (enumerationsTable.rows.length > 0) {
      output.appendNode(
        new DocHeading({
          configuration,
          title: this._intl(Keyword.ENUMERATIONS),
        }),
      );
      output.appendNode(enumerationsTable);
    }
    if (functionsTable.rows.length > 0) {
      output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.FUNCTIONS) }));
      output.appendNode(functionsTable);
    }

    if (interfacesTable.rows.length > 0) {
      output.appendNode(
        new DocHeading({
          configuration,
          title: this._intl(Keyword.INTERFACES),
        }),
      );
      output.appendNode(interfacesTable);
    }

    if (namespacesTable.rows.length > 0) {
      output.appendNode(
        new DocHeading({
          configuration,
          title: this._intl(Keyword.NAMESPACES),
        }),
      );
      output.appendNode(namespacesTable);
    }

    if (variablesTable.rows.length > 0) {
      output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.VARIABLES) }));
      output.appendNode(variablesTable);
    }

    if (typeAliasesTable.rows.length > 0) {
      output.appendNode(
        new DocHeading({
          configuration,
          title: this._intl(Keyword.TYPE_ALIASES),
        }),
      );
      output.appendNode(typeAliasesTable);
    }
  }

  /**
   * GENERATE PAGE: CLASS
   */
  private _writeClassTables(
    output: DocSection,
    apiClass: ApiClass,
    options?: {
      showTarget?: string[];
      showEventsTableTitle?: boolean;
      showPropertiesTableTitle?: boolean;
      showConstructorsTableTitle?: boolean;
      showMethodsTableTitle?: boolean;
    },
  ): void {
    const {
      showTarget = ['events', 'constructors', 'properties', 'methods'],
      showEventsTableTitle = true,
      showPropertiesTableTitle = true,
      showConstructorsTableTitle = true,
      showMethodsTableTitle = true,
    } = options || {};

    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const eventsTable: DocTable = new DocTable({
      configuration,
      headerTitles: [
        this._intl(Keyword.PROPERTY),
        this._intl(Keyword.MODIFIERS),
        this._intl(Keyword.TYPE),
        this._intl(Keyword.DESCRIPTION),
      ],
    });

    const constructorsTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.CONSTRUCTOR), this._intl(Keyword.MODIFIERS), this._intl(Keyword.DESCRIPTION)],
    });

    const propertiesTable: DocTable = new DocTable({
      configuration,
      headerTitles: [
        this._intl(Keyword.PROPERTY),
        this._intl(Keyword.MODIFIERS),
        this._intl(Keyword.TYPE),
        this._intl(Keyword.DEFAULT_VALUE),
        this._intl(Keyword.DESCRIPTION),
      ],
    });

    const methodsTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.METHOD), this._intl(Keyword.MODIFIERS), this._intl(Keyword.DESCRIPTION)],
    });

    const apiMembers: readonly ApiItem[] = this._getMembersAndWriteIncompleteWarning(apiClass, output);
    for (const apiMember of apiMembers) {
      const isInherited: boolean = apiMember.parent !== apiClass;
      switch (apiMember.kind) {
        case ApiItemKind.Constructor: {
          constructorsTable.addRow(
            new DocTableRow({ configuration }, [
              this._createTitleCell(apiMember),
              this._createModifiersCell(apiMember),
              this._createDescriptionCell(apiMember, isInherited),
            ]),
          );

          this._writeApiItemPage(apiMember);
          break;
        }
        case ApiItemKind.Method: {
          methodsTable.addRow(
            new DocTableRow({ configuration }, [
              this._createTitleCell(apiMember),
              this._createModifiersCell(apiMember),
              this._createDescriptionCell(apiMember, isInherited),
            ]),
          );

          this._writeApiItemPage(apiMember);
          break;
        }
        case ApiItemKind.Property: {
          if ((apiMember as ApiPropertyItem).isEventProperty) {
            eventsTable.addRow(
              new DocTableRow({ configuration }, [
                this._createTitleCell(apiMember),
                this._createModifiersCell(apiMember),
                this._createPropertyTypeCell(apiMember),
                this._createDescriptionCell(apiMember, isInherited),
              ]),
            );
          } else {
            propertiesTable.addRow(
              new DocTableRow({ configuration }, [
                this._createTitleCell(apiMember),
                this._createModifiersCell(apiMember),
                this._createPropertyTypeCell(apiMember),
                this._createDefaultValueCell(apiMember),
                this._createDescriptionCell(apiMember, isInherited),
              ]),
            );
          }

          this._writeApiItemPage(apiMember);
          break;
        }
      }
    }

    if (showTarget.includes('events') && eventsTable.rows.length > 0) {
      showEventsTableTitle && output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.EVENTS) }));
      output.appendNode(eventsTable);
    }

    if (showTarget.includes('constructors') && constructorsTable.rows.length > 0) {
      showConstructorsTableTitle &&
        output.appendNode(
          new DocHeading({
            configuration,
            title: this._intl(Keyword.CONSTRUCTORS),
          }),
        );
      output.appendNode(constructorsTable);
    }

    if (showTarget.includes('properties') && propertiesTable.rows.length > 0) {
      showPropertiesTableTitle &&
        output.appendNode(
          new DocHeading({
            configuration,
            title: this._intl(Keyword.PROPERTIES),
          }),
        );
      output.appendNode(propertiesTable);
    }

    if (showTarget.includes('methods') && methodsTable.rows.length > 0) {
      showMethodsTableTitle && output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.METHODS) }));
      output.appendNode(methodsTable);
    }
  }

  /**
   * GENERATE PAGE: ENUM
   */
  private _writeEnumTables(output: DocSection, apiEnum: ApiEnum): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const enumMembersTable: DocTable = new DocTable({
      configuration,
      headerTitles: ['Member', 'Value', this._intl(Keyword.DESCRIPTION)],
    });

    for (const apiEnumMember of apiEnum.members) {
      enumMembersTable.addRow(
        new DocTableRow({ configuration }, [
          new DocTableCell({ configuration }, [
            new DocParagraph({ configuration }, [
              new DocPlainText({
                configuration,
                text: Utilities.getConciseSignature(apiEnumMember),
              }),
            ]),
          ]),
          this._createInitializerCell(apiEnumMember),
          this._createDescriptionCell(apiEnumMember),
        ]),
      );
    }

    if (enumMembersTable.rows.length > 0) {
      output.appendNode(
        new DocHeading({
          configuration,
          title: this._intl(Keyword.ENUMERATION_MEMBERS),
        }),
      );
      output.appendNode(enumMembersTable);
    }
  }

  /**
   * GENERATE PAGE: INTERFACE
   */
  private _writeInterfaceTables(
    output: DocSection,
    apiInterface: ApiInterface,
    options?: {
      showTarget?: string[];
      showEventsTableTitle?: boolean;
      showPropertiesTableTitle?: boolean;
      showMethodsTableTitle?: boolean;
    },
  ): void {
    const {
      showEventsTableTitle = true,
      showPropertiesTableTitle = true,
      showMethodsTableTitle = true,
      showTarget = ['events', 'properties', 'methods'],
    } = options || {};

    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const eventsTable: DocTable = new DocTable({
      configuration,
      headerTitles: [
        this._intl(Keyword.PROPERTY),
        this._intl(Keyword.MODIFIERS),
        this._intl(Keyword.TYPE),
        this._intl(Keyword.DESCRIPTION),
      ],
    });

    const propertiesTable: DocTable = new DocTable({
      configuration,
      headerTitles: [
        this._intl(Keyword.PROPERTY),
        this._intl(Keyword.TYPE),
        this._intl(Keyword.DEFAULT_VALUE),
        this._intl(Keyword.DESCRIPTION),
      ],
    });

    const methodsTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.METHOD), this._intl(Keyword.DESCRIPTION)],
    });

    const apiMembers: readonly ApiItem[] = this._getMembersAndWriteIncompleteWarning(apiInterface, output);
    for (const apiMember of apiMembers) {
      const isInherited: boolean = apiMember.parent !== apiInterface;
      switch (apiMember.kind) {
        case ApiItemKind.ConstructSignature:
        case ApiItemKind.MethodSignature: {
          methodsTable.addRow(
            new DocTableRow({ configuration }, [
              this._createTitleCell(apiMember),
              this._createDescriptionCell(apiMember, isInherited),
            ]),
          );

          this._writeApiItemPage(apiMember);
          break;
        }
        case ApiItemKind.PropertySignature: {
          if ((apiMember as ApiPropertyItem).isEventProperty) {
            eventsTable.addRow(
              new DocTableRow({ configuration }, [
                this._createTitleCell(apiMember),
                this._createPropertyTypeCell(apiMember),
                this._createDefaultValueCell(apiMember),
                this._createDescriptionCell(apiMember, isInherited),
              ]),
            );
          } else {
            propertiesTable.addRow(
              new DocTableRow({ configuration }, [
                this._createTitleCell(apiMember),
                this._createPropertyTypeCell(apiMember),
                this._createDefaultValueCell(apiMember),
                this._createDescriptionCell(apiMember, isInherited),
              ]),
            );
          }

          this._writeApiItemPage(apiMember);
          break;
        }
      }
    }

    if (showTarget.includes('events') && eventsTable.rows.length > 0) {
      showEventsTableTitle && output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.EVENTS) }));
      output.appendNode(eventsTable);
    }

    if (showTarget.includes('properties') && propertiesTable.rows.length > 0) {
      showPropertiesTableTitle &&
        output.appendNode(
          new DocHeading({
            configuration,
            title: this._intl(Keyword.PROPERTIES),
          }),
        );
      output.appendNode(propertiesTable);
    }

    if (showTarget.includes('methods') && methodsTable.rows.length > 0) {
      showMethodsTableTitle && output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.METHODS) }));
      output.appendNode(methodsTable);
    }
  }

  /**
   * GENERATE PAGE: FUNCTION-LIKE
   */
  private _writeParameterTables(
    output: DocSection,
    apiParameterListMixin: ApiParameterListMixin,
    options: { showTitle?: boolean } = { showTitle: true },
  ): boolean {
    const { showTitle } = options;
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    /**
     * Check if there are any parameters or returns to show
     */
    let hasParameters = false;
    let hasReturns = false;

    const parametersTable: DocTable = new DocTable({
      configuration,
      headerTitles: [this._intl(Keyword.PARAMETER), this._intl(Keyword.TYPE), this._intl(Keyword.DESCRIPTION)],
    });
    for (const apiParameter of apiParameterListMixin.parameters) {
      parametersTable.addRow(
        new DocTableRow({ configuration }, [
          new DocTableCell({ configuration }, [
            new DocParagraph({ configuration }, [new DocPlainText({ configuration, text: apiParameter.name })]),
          ]),
          new DocTableCell({ configuration }, [this._createParagraphForTypeExcerpt(apiParameter.parameterTypeExcerpt)]),
          new DocTableCell(
            { configuration },
            this._createSectionForParameter(apiParameter.tsdocParamBlock as DocBlock).nodes,
          ),
        ]),
      );
    }

    if (parametersTable.rows.length > 0) {
      hasParameters = true;
      showTitle && output.appendNode(new DocHeading({ configuration, title: 'Parameters' }));
      output.appendNode(parametersTable);
    }

    if (ApiReturnTypeMixin.isBaseClassOf(apiParameterListMixin)) {
      const returnTypeExcerpt: Excerpt = apiParameterListMixin.returnTypeExcerpt;

      // Return type
      const returnNodes: DocNode[] = [];

      const typeExcerptNodes = this._createParagraphForTypeExcerpt(returnTypeExcerpt).nodes;

      if (typeExcerptNodes.length > 0) {
        if (
          !(
            typeExcerptNodes.length === 1 &&
            typeExcerptNodes[0] instanceof DocPlainText &&
            typeExcerptNodes[0].text === 'void'
          )
        ) {
          hasReturns ||= true;
        }

        returnNodes.push(
          new DocParagraph({ configuration }, [
            new DocEmphasisSpan({ configuration, bold: true }, [
              new DocPlainText({
                configuration,
                text: this._intl(Keyword.TYPE) + this._intl(Keyword.COLON),
              }),
            ]),
            ...typeExcerptNodes,
          ]),
        );
      }

      // Return description
      if (apiParameterListMixin instanceof ApiDocumentedItem) {
        if (apiParameterListMixin.tsdocComment && apiParameterListMixin.tsdocComment.returnsBlock) {
          returnNodes.push(
            new DocParagraph({ configuration }, [
              new DocEmphasisSpan({ configuration, bold: true }, [
                new DocPlainText({
                  configuration,
                  text: this._intl(Keyword.DESCRIPTION) + this._intl(Keyword.COLON),
                }),
              ]),
              ...this._createSectionForParameter(apiParameterListMixin.tsdocComment.returnsBlock)
                .getChildNodes()[0]
                .getChildNodes(),
            ]),
          );
        }
      }

      if (returnNodes.length > 0) {
        // If there are parameters, add a newline before the returns section
        this._assertNewline(output);

        output.appendNode(
          new DocParagraph({ configuration }, [
            new DocEmphasisSpan({ configuration, bold: true }, [
              new DocPlainText({
                configuration,
                text: this._intl(Keyword.RETURNS),
              }),
            ]),
            new DocPlainText({
              configuration,
              text: this._intl(Keyword.COLON),
            }),
          ]),
        );
        output.appendNode(new DocParagraph({ configuration }, [new DocUnorderedList({ configuration }, returnNodes)]));
      }
    }

    return hasParameters || hasReturns;
  }

  private _assertNewline(output: DocSection): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    output.appendNode(new DocParagraph({ configuration }));
  }

  private _createSectionForParameter(block: DocBlock): DocSection {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const description: DocSection = new DocSection({
      configuration,
    });

    if (block) {
      const nodes = block.content.getChildNodes()[0]?.getChildNodes() || [];

      let matchBilingual = false;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node instanceof DocHtmlStartTag && node.selfClosingTag) {
          matchBilingual = true;
          const text = (nodes[i + 1] as DocPlainText).text.replace('|', '').trim();

          description.appendNode(new DocParagraph({ configuration }, [new DocPlainText({ configuration, text })]));
          break;
        }
      }

      if (!matchBilingual) {
        this._appendAndMergeSection(description, block.content);
      }
    }

    return description;
  }

  private _createParagraphForTypeExcerpt(excerpt: Excerpt): DocParagraph {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const paragraph: DocParagraph = new DocParagraph({ configuration });

    if (!excerpt.text.trim()) {
      paragraph.appendNode(new DocPlainText({ configuration, text: '(not declared)' }));
    } else {
      this._appendExcerptWithHyperlinks(paragraph, excerpt);
    }

    return paragraph;
  }

  private _appendExcerptWithHyperlinks(docNodeContainer: DocNodeContainer, excerpt: Excerpt): void {
    for (const token of excerpt.spannedTokens) {
      this._appendExcerptTokenWithHyperlinks(docNodeContainer, token);
    }
  }

  private _parseTypeAliasTokens(apiTypeAlias: ApiTypeAlias): ExcerptToken[] {
    const tokens = apiTypeAlias.excerptTokens.slice(1, -1).flatMap((token) => {
      if (token.kind === ExcerptTokenKind.Reference && token.canonicalReference) {
        const apiItemResult: IResolveDeclarationReferenceResult = this._apiModel.resolveDeclarationReference(
          token.canonicalReference,
          undefined,
        );
        if (apiItemResult.resolvedApiItem instanceof ApiTypeAlias) {
          return this._parseTypeAliasTokens(apiItemResult.resolvedApiItem);
        }
      }
      return token;
    });
    return tokens;
  }

  private _appendExcerptTokenWithHyperlinks(docNodeContainer: DocNodeContainer, token: ExcerptToken): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    // Markdown doesn't provide a standardized syntax for hyperlinks inside code spans, so we will render
    // the type expression as DocPlainText.  Instead of creating multiple DocParagraphs, we can simply
    // discard any newlines and let the renderer do normal word-wrapping.
    const unwrappedTokenText: string = token.text.replace(/[\r\n]+/g, ' ');

    // If it's hyperlinkable, then append a DocLinkTag
    if (token.kind === ExcerptTokenKind.Reference && token.canonicalReference) {
      const apiItemResult: IResolveDeclarationReferenceResult = this._apiModel.resolveDeclarationReference(
        token.canonicalReference,
        undefined,
      );

      if (apiItemResult.resolvedApiItem) {
        if (
          apiItemResult.resolvedApiItem.kind === ApiItemKind.TypeAlias &&
          this.referenceLevel > 0 &&
          !typesToSkipParsing.includes(apiItemResult.resolvedApiItem.displayName)
        ) {
          const typeAliasTokens = this._parseTypeAliasTokens(apiItemResult.resolvedApiItem as ApiTypeAlias);
          // If the type alias is a simple single-line type alias, then render it as plain text
          // Otherwise, render it as a hyperlink
          if (typeAliasTokens.every((token) => !token.text.includes('\n') && !token.text.includes('\r'))) {
            docNodeContainer.appendNode(
              new DocPlainText({
                configuration,
                text: typeAliasTokens
                  .map((token) => token.text.trim())
                  .join('')
                  .split('|')
                  .filter((item, index, arr) => arr.indexOf(item) === index)
                  .join(' | '),
              }),
            );
            return;
          }
        }

        docNodeContainer.appendNode(
          new DocLinkTag({
            configuration,
            tagName: '@link',
            linkText: unwrappedTokenText,
            urlDestination: this._getLinkFilenameForApiItem(apiItemResult.resolvedApiItem),
          }),
        );
        return;
      }
    }

    // Otherwise append non-hyperlinked text
    docNodeContainer.appendNode(new DocPlainText({ configuration, text: unwrappedTokenText }));
  }

  private _createTitleCell(apiItem: ApiItem): DocTableCell {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const section: DocSection = new DocSection({ configuration });

    section.appendNodeInParagraph(
      new DocLinkTag({
        configuration,
        tagName: '@link',
        linkText: Utilities.getConciseSignature(apiItem),
        urlDestination: this._getLinkFilenameForApiItem(apiItem),
      }),
    );

    return new DocTableCell({ configuration }, section.nodes);
  }

  private _createDescriptionCell(apiItem: ApiItem, isInherited: boolean = false): DocTableCell {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const section: DocSection = new DocSection({ configuration });

    if (ApiReleaseTagMixin.isBaseClassOf(apiItem)) {
      if (apiItem.releaseTag === ReleaseTag.Alpha || apiItem.releaseTag === ReleaseTag.Beta) {
        section.appendNodesInParagraph([
          new DocEmphasisSpan({ configuration, bold: true, italic: true }, [
            new DocPlainText({
              configuration,
              text: `(${apiItem.releaseTag === ReleaseTag.Alpha ? 'ALPHA' : 'BETA'})`,
            }),
          ]),
          new DocPlainText({ configuration, text: ' ' }),
        ]);
      }
    }

    if (ApiOptionalMixin.isBaseClassOf(apiItem) && apiItem.isOptional) {
      section.appendNodesInParagraph([
        new DocEmphasisSpan({ configuration, italic: true }, [
          new DocPlainText({
            configuration,
            text:
              this._intl(Keyword.LEFT_PARENTHESIS) +
              this._intl(Keyword.OPTIONAL) +
              this._intl(Keyword.RIGHT_PARENTHESIS),
          }),
        ]),
        new DocPlainText({ configuration, text: ' ' }),
      ]);
    }

    if (apiItem instanceof ApiDocumentedItem) {
      if (apiItem.tsdocComment !== undefined) {
        this._writeSummarySection(section, apiItem);
      }
    }

    if (isInherited && apiItem.parent) {
      section.appendNode(
        new DocParagraph({ configuration }, [
          new DocPlainText({ configuration, text: '(Inherited from ' }),
          new DocLinkTag({
            configuration,
            tagName: '@link',
            linkText: apiItem.parent.displayName,
            urlDestination: this._getLinkFilenameForApiItem(apiItem.parent),
          }),
          new DocPlainText({ configuration, text: ')' }),
        ]),
      );
    }

    return new DocTableCell({ configuration }, section.nodes);
  }

  private _createModifiersCell(apiItem: ApiItem): DocTableCell {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const section: DocSection = new DocSection({ configuration });

    // Output modifiers in syntactically correct order: first access modifier (here: `protected`), then
    // `static` or `abstract` (no member can be both, so the order between the two of them does not matter),
    // last `readonly`. If `override` was supported, it would go directly before `readonly`.

    if (ApiProtectedMixin.isBaseClassOf(apiItem)) {
      if (apiItem.isProtected) {
        section.appendNode(
          new DocParagraph({ configuration }, [new DocCodeSpan({ configuration, code: 'protected' })]),
        );
      }
    }

    if (ApiStaticMixin.isBaseClassOf(apiItem)) {
      if (apiItem.isStatic) {
        section.appendNode(new DocParagraph({ configuration }, [new DocCodeSpan({ configuration, code: 'static' })]));
      }
    }

    if (ApiAbstractMixin.isBaseClassOf(apiItem)) {
      if (apiItem.isAbstract) {
        section.appendNode(new DocParagraph({ configuration }, [new DocCodeSpan({ configuration, code: 'abstract' })]));
      }
    }

    if (ApiReadonlyMixin.isBaseClassOf(apiItem)) {
      if (apiItem.isReadonly) {
        section.appendNode(new DocParagraph({ configuration }, [new DocCodeSpan({ configuration, code: 'readonly' })]));
      }
    }

    return new DocTableCell({ configuration }, section.nodes);
  }

  private _createPropertyTypeCell(apiItem: ApiItem): DocTableCell {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const section: DocSection = new DocSection({ configuration });

    if (apiItem instanceof ApiPropertyItem) {
      section.appendNode(this._createParagraphForTypeExcerpt(apiItem.propertyTypeExcerpt));
    }

    return new DocTableCell({ configuration }, section.nodes);
  }

  private _createDefaultValueCell(apiItem: ApiItem): DocTableCell {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const section: DocSection = new DocSection({ configuration });

    if (apiItem instanceof ApiDocumentedItem) {
      if (apiItem.tsdocComment !== undefined) {
        const defaultValueBlock: DocBlock | undefined = apiItem.tsdocComment.customBlocks?.find(
          (x) => x.blockTag.tagNameWithUpperCase === StandardTags.defaultValue.tagNameWithUpperCase,
        );

        if (defaultValueBlock) {
          this._appendStaticCodeNode(section, defaultValueBlock.content.nodes[0] as DocSection);
        } else {
          section.appendNode(new DocParagraph({ configuration }, [new DocPlainText({ configuration, text: '/' })]));
        }
      }
    }

    return new DocTableCell({ configuration }, section.nodes);
  }

  private _createInitializerCell(apiItem: ApiItem): DocTableCell {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const section: DocSection = new DocSection({ configuration });

    if (ApiInitializerMixin.isBaseClassOf(apiItem)) {
      if (apiItem.initializerExcerpt) {
        section.appendNodeInParagraph(
          new DocCodeSpan({
            configuration,
            code: apiItem.initializerExcerpt.text,
          }),
        );
      }
    }

    return new DocTableCell({ configuration }, section.nodes);
  }

  private _writeBreadcrumb(output: DocSection, apiItem: ApiItem): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    let init = true;

    for (const hierarchyItem of apiItem.getHierarchy()) {
      switch (hierarchyItem.kind) {
        case ApiItemKind.Model:
        case ApiItemKind.EntryPoint:
          // We don't show the model as part of the breadcrumb because it is the root-level container.
          // We don't show the entry point because today API Extractor doesn't support multiple entry points;
          // this may change in the future.
          break;
        default:
          output.appendNodesInParagraph([
            new DocPlainText({
              configuration,
              text: !init ? ' > ' : '',
            }),
            new DocLinkTag({
              configuration,
              tagName: '@link',
              linkText: hierarchyItem.displayName,
              urlDestination: this._getLinkFilenameForApiItem(hierarchyItem),
            }),
          ]);
          init = false;
      }
    }
  }

  private _writeAlphaWarning(output: DocSection): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const betaWarning: string =
      'This API is provided as an alpha preview for developers and may change' +
      ' based on feedback that we receive.  Do not use this API in a production environment.';
    output.appendNode(
      new DocNoteBox({ configuration }, [
        new DocParagraph({ configuration }, [new DocPlainText({ configuration, text: betaWarning })]),
      ]),
    );
  }

  private _writeBetaWarning(output: DocSection): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const betaWarning: string =
      'This API is provided as a beta preview for developers and may change' +
      ' based on feedback that we receive.  Do not use this API in a production environment.';
    output.appendNode(
      new DocNoteBox({ configuration }, [
        new DocParagraph({ configuration }, [new DocPlainText({ configuration, text: betaWarning })]),
      ]),
    );
  }

  private _appendSection(output: DocSection, docSection: DocSection): void {
    for (const node of docSection.nodes) {
      output.appendNode(node);
    }
  }

  private _appendAndMergeSection(output: DocSection, docSection: DocSection): void {
    let firstNode: boolean = true;
    for (const node of docSection.nodes) {
      if (firstNode) {
        if (node.kind === DocNodeKind.Paragraph) {
          output.appendNodesInParagraph(node.getChildNodes());
          firstNode = false;
          continue;
        }
      }
      firstNode = false;

      output.appendNode(node);
    }
  }

  private _createStaticCode(docSection: DocSection): DocCodeSpan {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const content = docSection
      .getChildNodes()
      .map((node) => {
        if (node instanceof DocPlainText) return node.text;
      })
      .join('');

    return new DocCodeSpan({ configuration, code: content });
  }

  private _extractContentFromSection(docSection: DocSection): string {
    const nodes = docSection.getChildNodes();
    for (const node of nodes) {
      if (node instanceof DocParagraph) {
        return this._extractContentFromSection(node as DocSection);
      } else if (node instanceof DocPlainText) {
        return node.text;
      }
    }
    return '';
  }

  private _appendStaticCodeNode(output: DocSection, docSection: DocSection): void {
    const content = this._extractContentFromSection(docSection);
    output.appendNodeInParagraph(
      new DocCodeSpan({
        configuration: this._tsdocConfiguration,
        code: content,
      }),
    );
  }

  private _appendPageTitle(output: DocSection, key: string, order?: number): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const en = intl(LocaleType.PAGE_NAME, key, LocaleLanguage.EN);
    const zh = intl(LocaleType.PAGE_NAME, key, LocaleLanguage.ZH);
    const title = this.locale === LocaleLanguage.ZH && en !== zh ? `${en} ${zh}` : en;

    output.appendNode(new DocPageTitle({ configuration, title, order }));
  }

  /**
   * Handle text nodes that contain a dash, should be treated as a unordered list
   */
  private _handleTextNodes(node: DocNode): DocNode[] {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    if (node instanceof DocPlainText && node.text.includes(' - ')) {
      const texts = node.text.split(/ - /g);
      return [
        new DocPlainText({ configuration, text: texts[0] }),
        ...(texts.slice(1) || []).flatMap((text) => [
          new DocPlainText({ configuration, text: '-' }),
          new DocPlainText({ configuration, text }),
        ]),
      ];
    }
    return [node];
  }

  private _parseParagraph(paragraph: DocParagraph): DocNode[][] {
    const formattedNodes = paragraph.getChildNodes().flatMap((node) => this._handleTextNodes(node));

    return formattedNodes.reduce((acc: DocNode[][], node: DocNode) => {
      if (node instanceof DocPlainText && node.text === '-') {
        acc.push([]);
      } else if (acc.length) {
        acc[acc.length - 1].push(node);
      } else {
        acc.push([node]);
      }
      return acc;
    }, []);
  }

  private _handleHtmlStartTag(ps: DocNode[], configuration: TSDocConfiguration, formattedSection: DocSection): boolean {
    if (ps.length > 0 && ps[0] instanceof DocHtmlStartTag) {
      const [_htmlStartTag, ...rest] = ps;
      formattedSection.appendNode(new DocParagraph({ configuration }, rest));
      return true;
    }
    return false;
  }

  private _writeSummarySection(output: DocSection, apiItem: ApiItem): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    if (apiItem instanceof ApiDocumentedItem) {
      if (apiItem.tsdocComment !== undefined) {
        const localizedSection: DocSection = this._localizeSection(apiItem.tsdocComment.summarySection, this.locale);

        const formattedSection = new DocSection({ configuration });

        for (const nodes of localizedSection.getChildNodes()) {
          const paragraphs = this._parseParagraph(nodes as DocParagraph);

          const latest: DocNode[][] = [];

          for (const ps of paragraphs) {
            if (!this._handleHtmlStartTag(ps, configuration, formattedSection)) {
              latest.push(ps);
            }
          }

          formattedSection.appendNode(
            new DocUnorderedList(
              { configuration },
              latest.map((nodes) => new DocParagraph({ configuration }, nodes)),
            ),
          );
        }

        this._appendAndMergeSection(output, formattedSection);
      }
    }
  }

  private _getMembersAndWriteIncompleteWarning(
    apiClassOrInterface: ApiClass | ApiInterface,
    output: DocSection,
  ): readonly ApiItem[] {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const showInheritedMembers: boolean = false;
    if (!showInheritedMembers) {
      return apiClassOrInterface.members;
    }

    const result: IFindApiItemsResult = apiClassOrInterface.findMembersWithInheritance();

    // If the result is potentially incomplete, write a short warning communicating this.
    if (result.maybeIncompleteResult) {
      output.appendNode(
        new DocParagraph({ configuration }, [
          new DocEmphasisSpan({ configuration, italic: true }, [
            new DocPlainText({
              configuration,
              text: '(Some inherited members may not be shown because they are not represented in the documentation.)',
            }),
          ]),
        ]),
      );
    }

    // Log the messages for diagnostic purposes.
    for (const message of result.messages) {
      // console.log(`Diagnostic message for findMembersWithInheritance: ${message.text}`);
    }

    return result.items;
  }

  private _getFilenameForApiItem(apiItem: ApiItem): string {
    if (apiItem.kind === ApiItemKind.Model) {
      return `index.${this._getLang()}.md`;
    }

    let baseName: string = '';
    for (const hierarchyItem of apiItem.getHierarchy()) {
      // For overloaded methods, add a suffix such as "MyClass.myMethod_2".
      let qualifiedName: string = Utilities.getSafeFilenameForName(hierarchyItem.displayName);
      if (ApiParameterListMixin.isBaseClassOf(hierarchyItem)) {
        if (hierarchyItem.overloadIndex > 1) {
          // Subtract one for compatibility with earlier releases of API Documenter.
          // (This will get revamped when we fix GitHub issue #1308)
          qualifiedName += `_${hierarchyItem.overloadIndex - 1}`;
        }
      }

      switch (hierarchyItem.kind) {
        case ApiItemKind.Model:
        case ApiItemKind.EntryPoint:
        case ApiItemKind.EnumMember:
          break;
        case ApiItemKind.Package:
          baseName = Utilities.getSafeFilenameForName(PackageName.getUnscopedName(hierarchyItem.displayName));
          break;
        default:
          baseName += '.' + qualifiedName;
      }
    }
    return baseName + `.${this._getLang()}.md`;
  }

  private _getLinkFilenameForApiItem(apiItem: ApiItem): string {
    const relativeUrl: Record<number, string> = {
      0: './',
      1: '../reference/',
      2: '../../reference/',
    };
    const prefix = relativeUrl[this.referenceLevel];
    return prefix + this._getFilenameForApiItem(apiItem);
  }

  private _localizeSection(section: DocSection, language: LocaleLanguage): DocSection {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const trimmed: DocSection = new DocSection({ configuration });

    let isSpecificLanguage = false;

    for (const node of section.getChildNodes()) {
      if (node instanceof DocParagraph) {
        for (const childNode of node.getChildNodes()) {
          if (
            childNode instanceof DocHtmlStartTag &&
            childNode.selfClosingTag &&
            (childNode.name === 'zh' || childNode.name === 'en')
          ) {
            isSpecificLanguage = true;
            const currentLanguage =
              childNode.selfClosingTag && childNode.name === 'zh' ? LocaleLanguage.ZH : LocaleLanguage.EN;
            if (currentLanguage == language) {
              trimmed.appendNode(node);
            }
          }
        }
        // If the paragraph does not have a language tag, it is considered to be a common paragraph
        if (!isSpecificLanguage) {
          trimmed.appendNode(node);
        }
      } else if (node instanceof DocFencedCode) {
        trimmed.appendNode(
          new DocFencedCode({
            configuration,
            code: node.code,
            language: 'typescript',
          }),
        );
      }
    }

    return trimmed;
  }

  private _intl(keyword: Keyword): string;
  private _intl(keyword: string, type: LocaleType): string;
  private _intl(keyword: string, type: LocaleType = LocaleType.KEYWORD): string {
    return intl(type, keyword, this.locale);
  }

  private _getLang() {
    return this.locale === LocaleLanguage.ZH ? 'zh' : 'en';
  }

  private _getLinkInMarkdownFormat(text: string, url?: string) {
    return url ? `[${text}](${url})` : text;
  }

  private _assertDemo(output: DocSection, pageData: IPageData): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    const demoPath = path.join('common/api/', pageData.group, kebabCase(pageData.name) + '.md');

    if (FileSystem.exists(demoPath)) {
      output.appendNode(
        new DocParagraph({ configuration }, [
          new DocText({ configuration, text: `<embed src="@/${demoPath}"></embed>` }),
        ]),
      );
    }
  }
}
