import { Encode } from '../types/item';

export const isEncode = (value): value is Encode<any> =>
  Boolean((value as Encode<any>)?.fields && (value as Encode<any>).formatter);

export const convertToNumber = (_: number | string) => _ as number;
