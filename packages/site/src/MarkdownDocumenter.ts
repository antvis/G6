/* eslint-disable jsdoc/require-param */
import type {
  ApiEnum,
  ApiItem,
  ApiModel,
  ApiNamespace,
  ApiPackage,
  Excerpt,
  ExcerptToken,
  IFindApiItemsResult,
  IResolveDeclarationReferenceResult,
} from '@microsoft/api-extractor-model';
import {
  ApiAbstractMixin,
  ApiClass,
  ApiDeclaredItem,
  ApiDocumentedItem,
  ApiInitializerMixin,
  ApiInterface,
  ApiItemKind,
  ApiOptionalMixin,
  ApiParameterListMixin,
  ApiPropertyItem,
  ApiProtectedMixin,
  ApiReadonlyMixin,
  ApiReleaseTagMixin,
  ApiReturnTypeMixin,
  ApiStaticMixin,
  ApiTypeAlias,
  ExcerptTokenKind,
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
import * as path from 'path';

import { camelCase, upperFirst } from 'lodash';
import prettier from 'prettier';
import { getApiCategoryName } from './constants/api-category';
import { Keyword, intl } from './constants/keywords';
import { LocaleLanguage } from './constants/locale';
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
import { DocUnorderedList } from './nodes/DocUnorderedList';
import { Utilities } from './utils/Utilities';
import { getBlockTagByName } from './utils/parser';

const supportedApiItems = [ApiItemKind.Interface, ApiItemKind.Enum, ApiItemKind.Class, ApiItemKind.TypeAlias];

/**
 * A page and its associated API items.
 */
export interface IPageData {
  readonly name: string;
  readonly apiItems: ApiItem[];
  readonly group: string;
}

export interface ICollectedData {
  // readonly pageGroups: readonly string[];
  // readonly fallbackGroup: string;
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
   * Whether the current page is a reference page.
   * If true, the page will be generated in the reference folder.
   * If false, the page will be generated in the root folder.
   */
  private isReference: boolean = true;

  public constructor(options: IMarkdownDocumenterOptions) {
    this._apiModel = options.apiModel;
    this._outputFolder = options.outputFolder;
    this._tsdocConfiguration = CustomDocNodes.configuration;
    this._markdownEmitter = new CustomMarkdownEmitter(this._apiModel);
  }

  public async generateFiles() {
    const collectedData = this._initPageData(this._apiModel);

    // Write the API model page
    this.isReference = true;
    await this._generateBilingualPages(this._writeApiItemPage.bind(this), this._apiModel);

    // Write the API pages classified by extension
    for (const [_, pageData] of collectedData.pagesByName.entries()) {
      // 对于交互和插件
      if (['behaviors', 'plugins', 'layouts'].includes(pageData.group)) {
        this.isReference = false;
        await this._generateBilingualPages(this._writeExtensionPage.bind(this), pageData);
      }

      // 对于图实例，将拆分成三个页面： 配置项，实例方法，属性
      // For graph instance, split into three pages: options, methods, properties
      if (pageData.group === 'runtime' && pageData.name === 'Graph') {
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
      let group = paths?.[0];
      const target = paths?.[paths.length - 1].replace(/\.d\.ts$/, '');
      let pageName = upperFirst(camelCase(target === 'index' ? paths?.[paths.length - 2] : target));

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

      // For interface, add the referenced interfaces to pageData.apiItems
      if (apiItem instanceof ApiInterface) {
        const refApiItems = apiItem.excerptTokens
          .filter((token) => token.kind === ExcerptTokenKind.Reference && token.canonicalReference)
          .map(
            (token) => this._apiModel.resolveDeclarationReference(token.canonicalReference!, undefined).resolvedApiItem,
          )
          .filter(Boolean) as ApiItem[];
        pageData.apiItems.unshift(...refApiItems);
      }
    }

    for (const memberApiItem of apiItem.members) {
      this._initPageDataForItem(collectedData, memberApiItem, apiItem.members as ApiItem[]);
    }
  }

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

    this._writeBreadcrumb(output, apiItem);

    const scopedName: string = apiItem.getScopedNameWithinPackage();

    switch (apiItem.kind) {
      case ApiItemKind.Class:
        output.appendNode(new DocHeading({ configuration, title: `${scopedName} class` }));
        break;
      case ApiItemKind.Enum:
        output.appendNode(new DocHeading({ configuration, title: `${scopedName} enum` }));
        break;
      case ApiItemKind.Interface:
        output.appendNode(new DocHeading({ configuration, title: `${scopedName} interface` }));
        break;
      case ApiItemKind.Constructor:
      case ApiItemKind.ConstructSignature:
        output.appendNode(new DocHeading({ configuration, title: scopedName }));
        break;
      case ApiItemKind.Method:
      case ApiItemKind.MethodSignature:
        output.appendNode(new DocHeading({ configuration, title: `${scopedName} method` }));
        break;
      case ApiItemKind.Function:
        output.appendNode(new DocHeading({ configuration, title: `${scopedName} function` }));
        break;
      case ApiItemKind.Model:
        output.appendNode(new DocHeading({ configuration, title: `API Reference` }));
        break;
      case ApiItemKind.Namespace:
        output.appendNode(new DocHeading({ configuration, title: `${scopedName} namespace` }));
        break;
      case ApiItemKind.Package: {
        console.log(`Writing ${apiItem.displayName} package`);
        const unscopedPackageName: string = PackageName.getUnscopedName(apiItem.displayName);
        output.appendNode(
          new DocHeading({
            configuration,
            title: `${unscopedPackageName} package`,
          }),
        );
        break;
      }
      case ApiItemKind.Property:
      case ApiItemKind.PropertySignature:
        output.appendNode(new DocHeading({ configuration, title: `${scopedName} property` }));
        break;
      case ApiItemKind.TypeAlias:
        output.appendNode(new DocHeading({ configuration, title: `${scopedName} type` }));
        break;
      case ApiItemKind.Variable:
        output.appendNode(new DocHeading({ configuration, title: `${scopedName} variable` }));
        break;
      default:
        throw new Error('Unsupported API item kind: ' + apiItem.kind);
    }

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
        this._appendSummarySection(output, apiItem);
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
      output.appendNode(
        new DocParagraph({ configuration }, [
          new DocEmphasisSpan({ configuration, bold: true }, [
            new DocPlainText({ configuration, text: 'Decorators:' }),
          ]),
        ]),
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

    const filename: string = path.join(this._outputFolder, 'reference', this._getFilenameForApiItem(apiItem));

    await this._writeFile(filename, output, apiItem);
  }

  private async _writeExtensionPage(pageData: IPageData) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    this._appendPageTitle(output, pageData.name);

    const apiClass = pageData.apiItems.find((apiItem) => apiItem instanceof ApiClass) as ApiClass;

    if (apiClass) {
      this._appendSummarySection(output, apiClass);
    }

    const apiInterfaces = pageData.apiItems.filter((apiItem) => apiItem instanceof ApiInterface) as ApiInterface[];
    if (apiInterfaces.length > 0)
      apiInterfaces.forEach((apiInterface, i) => this._writeOptions(output, apiInterface, { showTitle: i === 0 }));

    if (apiClass) this._writeAPIMethods(output, apiClass);

    const lang = this.locale === LocaleLanguage.EN ? 'en' : 'zh';
    const filename: string = path.join(this._outputFolder, pageData.group, `${pageData.name}.${lang}.md`);

    await this._writeFile(
      filename,
      output,
      pageData.apiItems.find((apiItem) => apiItem instanceof ApiClass),
    );
  }

  private _writeOptions(output: DocSection, apiItem: ApiInterface | ApiClass, options?: { showTitle?: boolean }) {
    const { showTitle = true } = options || {};
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    showTitle && output.appendNode(new DocHeading({ configuration, title: this._intl(Keyword.OPTIONS) }));

    const apiMembers: readonly ApiItem[] = this._getMembersAndWriteIncompleteWarning(apiItem, output);

    for (const apiMember of apiMembers) {
      const isInherited: boolean = apiMember.parent !== apiItem;
      if (
        (apiMember.kind === ApiItemKind.Property || apiMember.kind === ApiItemKind.PropertySignature) &&
        apiMember instanceof ApiPropertyItem
      ) {
        // property name
        output.appendNode(
          new DocHeading({
            configuration,
            title: Utilities.getConciseSignature(apiMember),
            level: 2,
          }),
        );

        // property type, optional, readonly, default value
        const isOptional = ApiOptionalMixin.isBaseClassOf(apiMember) && apiMember.isOptional;

        const nodes: DocNode[] = [
          //  property type
          new DocEmphasisSpan({ configuration, bold: true }, [
            ...this._createParagraphForTypeExcerpt(apiMember.propertyTypeExcerpt).getChildNodes(),
            new DocPlainText({ configuration, text: '  ' }),
          ]),
          //  optional
          new DocEmphasisSpan({ configuration, italic: true }, [
            new DocPlainText({
              configuration,
              text: isOptional ? 'Optional' : 'Required',
            }),
            new DocPlainText({ configuration, text: '  ' }),
          ]),
        ];

        if (apiMember instanceof ApiDocumentedItem) {
          if (apiMember.tsdocComment !== undefined) {
            const defaultValueBlock: DocBlock | undefined = apiMember.tsdocComment.customBlocks?.find(
              (x) => x.blockTag.tagNameWithUpperCase === StandardTags.defaultValue.tagNameWithUpperCase,
            );

            if (defaultValueBlock) {
              nodes.push(
                // default value
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

        output.appendNode(new DocNoteBox({ configuration }, [new DocParagraph({ configuration }, nodes)]));

        // summary
        this._appendSummarySection(output, apiMember);
        // remarks
        this._writeRemarksSection(output, apiMember);
      }
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
        const title = getApiCategoryName(category, this.locale);
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

    const apiInterfaces = pageData.apiItems.filter((apiItem) => apiItem instanceof ApiInterface) as ApiInterface[];

    const topApiInterface = apiInterfaces.find((apiInterface) => apiInterface.name === 'GraphOptions');

    if (topApiInterface) {
      this._writeRemarksSection(output, topApiInterface);
    }

    if (apiInterfaces.length > 0)
      apiInterfaces.forEach((apiInterface) => this._writeOptions(output, apiInterface, { showTitle: false }));

    const lang = this.locale === LocaleLanguage.EN ? 'en' : 'zh';
    const filename: string = path.join(this._outputFolder, 'graph', `option.${lang}.md`);

    await this._writeFile(filename, output);
  }

  private async _writeGraphMethodsPage(pageData: IPageData) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    this._appendPageTitle(output, 'GraphMethods', 1);

    const apiClass = pageData.apiItems.find((apiItem) => apiItem instanceof ApiClass) as ApiClass;

    if (apiClass) this._writeAPIMethods(output, apiClass, { showTitle: false, showSubTitle: true });

    const lang = this.locale === LocaleLanguage.EN ? 'en' : 'zh';
    const filename: string = path.join(this._outputFolder, 'graph', `method.${lang}.md`);

    await this._writeFile(filename, output);
  }

  private async _writeGraphPropertiesPage(pageData: IPageData) {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const output: DocSection = new DocSection({ configuration });

    this._appendPageTitle(output, 'GraphProperties', 2);

    const apiClass = pageData.apiItems.find((apiItem) => apiItem instanceof ApiClass) as ApiClass;

    if (apiClass) this._writeOptions(output, apiClass, { showTitle: false });

    const lang = this.locale === LocaleLanguage.EN ? 'en' : 'zh';
    const filename: string = path.join(this._outputFolder, 'graph', `property.${lang}.md`);

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
          output.appendNode(new DocHeading({ configuration, title: heading }));

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
      headerTitles: ['Enumeration', this._intl(Keyword.DESCRIPTION)],
    });

    const functionsTable: DocTable = new DocTable({
      configuration,
      headerTitles: ['Function', this._intl(Keyword.DESCRIPTION)],
    });

    const interfacesTable: DocTable = new DocTable({
      configuration,
      headerTitles: ['Interface', this._intl(Keyword.DESCRIPTION)],
    });

    const namespacesTable: DocTable = new DocTable({
      configuration,
      headerTitles: ['Namespace', this._intl(Keyword.DESCRIPTION)],
    });

    const variablesTable: DocTable = new DocTable({
      configuration,
      headerTitles: ['Variable', this._intl(Keyword.DESCRIPTION)],
    });

    const typeAliasesTable: DocTable = new DocTable({
      configuration,
      headerTitles: ['Type Alias', this._intl(Keyword.DESCRIPTION)],
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
      headerTitles: ['Constructor', this._intl(Keyword.MODIFIERS), this._intl(Keyword.DESCRIPTION)],
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
        this._appendSummarySection(section, apiItem);
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

    output.appendNodeInParagraph(
      new DocLinkTag({
        configuration,
        tagName: '@link',
        linkText: 'Home',
        urlDestination: this._getLinkFilenameForApiItem(this._apiModel),
      }),
    );

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
              text: ' > ',
            }),
            new DocLinkTag({
              configuration,
              tagName: '@link',
              linkText: hierarchyItem.displayName,
              urlDestination: this._getLinkFilenameForApiItem(hierarchyItem),
            }),
          ]);
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

    output.appendNode(new DocPageTitle({ configuration, key, locale: this.locale, order }));
  }

  private _appendSummarySection(output: DocSection, apiItem: ApiItem): void {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;

    if (apiItem instanceof ApiDocumentedItem) {
      if (apiItem.tsdocComment !== undefined) {
        const localizedSection: DocSection = this._localizeSection(apiItem.tsdocComment.summarySection, this.locale);
        const formattedSection = new DocSection({ configuration });

        for (const nodes of localizedSection.getChildNodes()) {
          for (const node of nodes.getChildNodes()) {
            if (node instanceof DocPlainText) {
              const texts = node.text.split(/ - /g);
              const listText = texts.slice(1);

              formattedSection.appendNode(
                new DocParagraph({ configuration }, [new DocPlainText({ configuration, text: texts[0] })]),
              );

              if (listText.length > 0) {
                formattedSection.appendNode(
                  new DocParagraph({ configuration }, [
                    new DocUnorderedList(
                      { configuration },
                      listText.map((text) => new DocPlainText({ configuration, text })),
                    ),
                  ]),
                );
              }
            }
          }
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
      console.log(`Diagnostic message for findMembersWithInheritance: ${message.text}`);
    }

    return result.items;
  }

  private _getFilenameForApiItem(apiItem: ApiItem): string {
    const lang = this.locale === LocaleLanguage.EN ? 'en' : 'zh';

    if (apiItem.kind === ApiItemKind.Model) {
      return `index.${lang}.md`;
    }

    let baseName: string = '';
    for (const hierarchyItem of apiItem.getHierarchy()) {
      // For overloaded methods, add a suffix such as "MyClass.myMethod_2".
      let qualifiedName: string = Utilities.getSafeFilenameForName(hierarchyItem.displayName);
      if (ApiParameterListMixin.isBaseClassOf(hierarchyItem)) {
        if (hierarchyItem.overloadIndex > 1) {
          // Subtract one for compatibility with earlier releases of API Documenter.
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
    return baseName + `.${lang}.md`;
  }

  private _getLinkFilenameForApiItem(apiItem: ApiItem): string {
    const prefix = !this.isReference ? '../reference/' : './';
    return prefix + this._getFilenameForApiItem(apiItem);
  }

  private _localizeSection(section: DocSection, language: 'zh-CN' | 'en-US'): DocSection {
    const configuration: TSDocConfiguration = this._tsdocConfiguration;
    const trimmed: DocSection = new DocSection({ configuration });

    let isSpecificLanguage = false;

    for (const node of section.getChildNodes()) {
      if (node instanceof DocParagraph) {
        for (const childNode of node.getChildNodes()) {
          if (childNode instanceof DocHtmlStartTag) {
            isSpecificLanguage = true;
            const currentLanguage = childNode.selfClosingTag && childNode.name === 'zh' ? 'zh-CN' : 'en-US';
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

  private _intl(keyword: Keyword) {
    return intl(keyword, this.locale);
  }
}
