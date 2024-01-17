import { Encode } from '../types/item';

/**
 * Whether value is a Encode<T> type with fields and formatter function.
 * @param value
 * @returns
 */
export const isEncode = (value): value is Encode<any> =>
  Boolean((value as Encode<any>)?.fields && (value as Encode<any>).formatter);

export const convertToNumber = (_: unknown) => _ as number;
