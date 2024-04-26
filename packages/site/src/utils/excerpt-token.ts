import { ApiInterface, ApiModel, ExcerptTokenKind, type ExcerptToken } from '@microsoft/api-extractor-model';

export type BaseExcerptToken = {
  text: string;
  canonicalReference?: ExcerptToken['canonicalReference'];
  interface?: ApiInterface;
  children?: ICustomExcerptToken[];
  parent?: ICustomExcerptToken;
};

export type ICustomExcerptToken =
  | ({
      type: 'PrefixObject';
      prefix: string;
    } & BaseExcerptToken)
  | ({
      type: 'Omit' | 'Pick';
      fields: string[];
    } & BaseExcerptToken)
  | BaseExcerptToken;

/**
 *
 * @param apiModel
 * @param apiItem
 * @param parentToken
 */
export function parseExcerptTokens(
  apiModel: ApiModel,
  apiItem: ApiInterface,
  parentToken?: ICustomExcerptToken,
): ICustomExcerptToken[] {
  let tag = '';
  const customExcerptTokens: ICustomExcerptToken[] = [];
  for (const [index, token] of apiItem.excerptTokens.entries()) {
    let customToken: ICustomExcerptToken | undefined = undefined;
    if (token.kind === ExcerptTokenKind.Reference) {
      const tags = ['PrefixObject', 'Omit', 'Pick'];
      const excludeTags = ['Record'];
      if (tags.includes(token.text)) {
        tag = token.text;
        continue;
      }
      if (excludeTags.includes(token.text)) continue;
      if (!tag) {
        customToken = { text: token.text, canonicalReference: token.canonicalReference };
      } else {
        const content = apiItem.excerptTokens[index + 1].text;
        const prefixMatch = content.match(/, '(\w+)'>/);
        const fieldsMatch = content.match(/, '(.+?)'>/);
        customToken = {
          type: tag,
          prefix: tag === 'PrefixObject' ? prefixMatch![1] : undefined,
          fields:
            tag === 'Omit' || tag === 'Pick' ? fieldsMatch![1].split(' | ').map((x) => x.replace(/'/g, '')) : undefined,
          text: token.text,
          canonicalReference: token.canonicalReference,
        } as ICustomExcerptToken;
        tag = '';
      }
    }

    if (customToken && customToken.canonicalReference) {
      const resolvedApiItem = apiModel.resolveDeclarationReference(
        customToken.canonicalReference,
        undefined,
      ).resolvedApiItem;
      if (resolvedApiItem instanceof ApiInterface) {
        customToken.interface = resolvedApiItem;
        customToken.children = parseExcerptTokens(apiModel, resolvedApiItem, customToken);
      }
      customToken.parent = parentToken;
      customExcerptTokens.push(customToken);
    }
  }

  return customExcerptTokens;
}

/**
 *
 * @param targetToken
 */
export function findAccessorExcerptTokens(targetToken: ICustomExcerptToken): ICustomExcerptToken[] {
  let path: ICustomExcerptToken[] = [targetToken];
  let currentToken = targetToken.parent;

  while (currentToken) {
    path = [currentToken, ...path];
    currentToken = currentToken.parent;
  }

  return path;
}

/**
 *
 * @param targetToken
 */
export function getAccessorExcerptTokensPrefixes(targetToken: ICustomExcerptToken) {
  const tokens = findAccessorExcerptTokens(targetToken);
  return tokens
    .map((token) => (token as any).prefix || '')
    .filter(Boolean)
    .join(' ');
}
