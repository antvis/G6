import type { ApiItem, IResolveDeclarationReferenceResult } from '@microsoft/api-extractor-model';
import { ApiDocumentedItem, ApiItemContainerMixin, ApiModel } from '@microsoft/api-extractor-model';
import type * as tsdoc from '@microsoft/tsdoc';
import { FileSystem } from '@rushstack/node-core-library';
import * as path from 'path';
import { MarkdownDocumenter } from './MarkdownDocumenter';

interface IBuildApiModelResult {
  apiModel: ApiModel;
  inputFolder: string;
  outputFolder: string;
}

export class MarkdownAction {
  public async onExecute(): Promise<void> {
    const { apiModel, outputFolder } = this.buildApiModel();

    const markdownDocumenter: MarkdownDocumenter = new MarkdownDocumenter({
      apiModel,
      outputFolder,
    });

    await markdownDocumenter.generateFiles();
  }

  /**
   * Builds the ApiModel by loading all .api.json files from the input folder.
   * @returns The ApiModel and the input/output folders.
   */
  protected buildApiModel(): IBuildApiModelResult {
    const apiModel: ApiModel = new ApiModel();

    const inputFolder = './support/api';
    const outputFolder = './docs/apis';

    if (!FileSystem.exists(inputFolder)) {
      throw new Error('The input folder does not exist: ' + inputFolder);
    }
    FileSystem.ensureFolder(outputFolder);

    for (const filename of FileSystem.readFolderItemNames(inputFolder)) {
      if (filename.match(/\.api\.json$/i)) {
        console.log(`Reading ${filename}`);
        const filenamePath: string = path.join(inputFolder, filename);
        apiModel.loadPackage(filenamePath);
      }
    }

    this._applyInheritDoc(apiModel, apiModel);

    return { apiModel, inputFolder, outputFolder };
  }

  // TODO: This is a temporary workaround.  The long term plan is for API Extractor's DocCommentEnhancer
  // to apply all @inheritDoc tags before the .api.json file is written.
  // See DocCommentEnhancer._applyInheritDoc() for more info.
  private _applyInheritDoc(apiItem: ApiItem, apiModel: ApiModel): void {
    if (apiItem instanceof ApiDocumentedItem) {
      if (apiItem.tsdocComment) {
        const inheritDocTag: tsdoc.DocInheritDocTag | undefined = apiItem.tsdocComment.inheritDocTag;

        if (inheritDocTag && inheritDocTag.declarationReference) {
          // Attempt to resolve the declaration reference
          const result: IResolveDeclarationReferenceResult = apiModel.resolveDeclarationReference(
            inheritDocTag.declarationReference,
            apiItem,
          );

          if (result.errorMessage) {
            console.log(`Warning: Unresolved @inheritDoc tag for ${apiItem.displayName}: ` + result.errorMessage);
          } else {
            if (
              result.resolvedApiItem instanceof ApiDocumentedItem &&
              result.resolvedApiItem.tsdocComment &&
              result.resolvedApiItem !== apiItem
            ) {
              this._copyInheritedDocs(apiItem.tsdocComment, result.resolvedApiItem.tsdocComment);
            }
          }
        }
      }
    }

    // Recurse members
    if (ApiItemContainerMixin.isBaseClassOf(apiItem)) {
      for (const member of apiItem.members) {
        this._applyInheritDoc(member, apiModel);
      }
    }
  }

  /**
   * Copy the content from `sourceDocComment` to `targetDocComment`.
   * This code is borrowed from DocCommentEnhancer as a temporary workaround.
   * @param targetDocComment - The target doc comment to copy into
   * @param sourceDocComment - The source doc comment to copy from
   * @internal
   */
  private _copyInheritedDocs(targetDocComment: tsdoc.DocComment, sourceDocComment: tsdoc.DocComment): void {
    targetDocComment.summarySection = sourceDocComment.summarySection;
    targetDocComment.remarksBlock = sourceDocComment.remarksBlock;

    targetDocComment.params.clear();
    for (const param of sourceDocComment.params) {
      targetDocComment.params.add(param);
    }
    for (const typeParam of sourceDocComment.typeParams) {
      targetDocComment.typeParams.add(typeParam);
    }
    targetDocComment.returnsBlock = sourceDocComment.returnsBlock;

    targetDocComment.inheritDocTag = undefined;
  }
}
