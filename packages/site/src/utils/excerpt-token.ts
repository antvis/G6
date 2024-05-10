import { ApiInterface, ApiModel, ExcerptTokenKind, type ExcerptToken } from '@microsoft/api-extractor-model';
import { camelCase } from 'lodash';
import { interfacesToSkipParsing } from '../MarkdownDocumenter';

export type BaseExcerptToken = {
  text: string;
  canonicalReference?: ExcerptToken['canonicalReference'];
  interface?: ApiInterface;
  children?: ICustomExcerptToken[];
  parent?: ICustomExcerptToken;
};

export type ICustomExcerptToken =
  | ({
      type: 'Prefix';
      prefix: string;
    } & BaseExcerptToken)
  | ({
      type: 'Omit' | 'Pick';
      fields: string[];
    } & BaseExcerptToken)
  | ({ type: 'Default' } & BaseExcerptToken);

/**
 * 将 ExcerptToken 按 'Prefix'、'Omit'、'Pick'、'Default' 分类
 * @param apiModel
 * @param apiItem
 * @param parentToken
 * @param flatten
 * @returns
 */
export function parseExcerptTokens(
  apiModel: ApiModel,
  apiItem: ApiInterface,
  parentToken?: ICustomExcerptToken,
  flatten?: boolean,
): ICustomExcerptToken[] {
  const customExcerptTokens: ICustomExcerptToken[] = [];
  let flag = false;

  for (const [index, token] of apiItem.excerptTokens.entries()) {
    let customToken: ICustomExcerptToken | undefined = undefined;
    if (token.kind === ExcerptTokenKind.Reference) {
      const excludeTags = ['Record', 'Partial'];
      if (excludeTags.includes(token.text)) continue;
      if (token.text === 'Prefix') {
        const content = apiItem.excerptTokens[index + 1].text;
        const prefixMatch = content.match(/<\s*'(\w+)'/)!;
        const referenceToken = apiItem.excerptTokens[index + 2];
        customToken = {
          type: token.text,
          prefix: prefixMatch[1],
          fields: undefined,
          text: referenceToken.text,
          canonicalReference: referenceToken.canonicalReference,
        } as ICustomExcerptToken;
        flag = true;
      } else if (['Omit', 'Pick'].includes(token.text)) {
        const content = apiItem.excerptTokens[index + 3].text;
        const referenceToken = apiItem.excerptTokens[index + 2];
        const fields = (content.match(/'(\w+)'/g) || []).map((x) => x.replace(/'/g, ''));
        customToken = {
          type: token.text,
          fields: fields,
          text: referenceToken.text,
          canonicalReference: referenceToken.canonicalReference,
        } as ICustomExcerptToken;
        flag = true;
      } else {
        if (!flag) {
          customToken = { type: 'Default', text: token.text, canonicalReference: token.canonicalReference };
        }
        flag = false;
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

export const liftPrefixExcerptTokens = (items: ICustomExcerptToken[]): ICustomExcerptToken[] => {
  let topLevelPrefixes: ICustomExcerptToken[] = [];

  for (const item of items) {
    if (interfacesToSkipParsing.includes(item.text)) continue;

    if (item.type === 'Prefix') {
      const newItem = { ...item, prefix: getAccessorExcerptTokensPrefixes(item) };
      topLevelPrefixes.push(newItem);
    }

    if (item.children && item.children.length > 0) {
      const childPrefixes = liftPrefixExcerptTokens(item.children);
      topLevelPrefixes = topLevelPrefixes.concat(childPrefixes);
    }
  }

  return topLevelPrefixes;
};

/**
 *
 * @param targetToken
 * @param includeSelf
 */
export function findAccessorExcerptTokens(targetToken: ICustomExcerptToken, includeSelf = true): ICustomExcerptToken[] {
  let path: ICustomExcerptToken[] = [targetToken];
  let currentToken = targetToken.parent;

  while (currentToken) {
    path = [currentToken, ...path];
    currentToken = currentToken.parent;
  }

  return includeSelf ? path : path.slice(1);
}

/**
 *
 * @param targetToken
 */
export function getAccessorExcerptTokensPrefixes(targetToken: ICustomExcerptToken) {
  const tokens = findAccessorExcerptTokens(targetToken);
  const tokenString = tokens
    .map((token) => (token as any).prefix || '')
    .filter(Boolean)
    .join(' ');
  return camelCase(tokenString);
}
