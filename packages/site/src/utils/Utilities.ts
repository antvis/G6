import type { ApiItem } from '@microsoft/api-extractor-model';
import { ApiParameterListMixin } from '@microsoft/api-extractor-model';
export class Utilities {
  private static readonly _badFilenameCharsRegExp: RegExp = /[^a-z0-9_\-.]/gi;

  /**
   * Generates a concise signature for a function.  Example: "getArea(width, height)"
   * @param apiItem - The ApiItem for which to generate a signature.
   * @param scoped - If true, the signature will include the parent name.  Example: "Rectangle.getArea(width, height)"
   * @returns The concise signature.
   */
  public static getConciseSignature(apiItem: ApiItem, scoped = false): string {
    let prefixString = '';
    if (scoped) {
      prefixString = apiItem.getScopedNameWithinPackage().split('.').slice(0, -1).join('.') + '.';
      // [MARK]: 特殊处理，History_2 -> History
      if (prefixString.endsWith('_2.')) {
        prefixString = prefixString.slice(0, -3) + '.';
      }
    }
    if (ApiParameterListMixin.isBaseClassOf(apiItem)) {
      return prefixString + apiItem.displayName + '(' + apiItem.parameters.map((x) => x.name).join(', ') + ')';
    }
    return prefixString + apiItem.displayName;
  }

  /**
   * Converts bad filename characters to underscores.
   * @param name - The name to convert.
   */
  public static getSafeFilenameForName(name: string): string {
    // TODO: This can introduce naming collisions.
    // We will fix that as part of https://github.com/microsoft/rushstack/issues/1308
    return name.replace(Utilities._badFilenameCharsRegExp, '_').toLowerCase();
  }
}
