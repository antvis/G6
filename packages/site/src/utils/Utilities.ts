// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { ApiParameterListMixin, type ApiItem } from '@microsoft/api-extractor-model';

export class Utilities {
  private static readonly _badFilenameCharsRegExp: RegExp = /[^a-z0-9_\-.]/gi;
  /**
   * Generates a concise signature for a function.  Example: "getArea(width, height)"
   * @param apiItem
   */
  public static getConciseSignature(apiItem: ApiItem): string {
    if (ApiParameterListMixin.isBaseClassOf(apiItem)) {
      return apiItem.displayName + '(' + apiItem.parameters.map((x) => x.name).join(', ') + ')';
    }
    return apiItem.displayName;
  }

  /**
   * Converts bad filename characters to underscores.
   * @param name
   */
  public static getSafeFilenameForName(name: string): string {
    // TODO: This can introduce naming collisions.
    // We will fix that as part of https://github.com/microsoft/rushstack/issues/1308
    return name.replace(Utilities._badFilenameCharsRegExp, '_').toLowerCase();
  }
}
