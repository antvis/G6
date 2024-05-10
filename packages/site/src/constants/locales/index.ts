import { FileSystem } from '@rushstack/node-core-library';
import * as path from 'path';
import type { LocaleType } from './enum';
import { LocaleLanguage } from './enum';

const localeMap = new Map<LocaleType, Record<string, string[]>>();

export const intl = (type: LocaleType, key: string, lang: LocaleLanguage): string => {
  if (!localeMap.has(type)) {
    const filePath = path.join(__dirname, `${type}.json`);
    if (!FileSystem.exists(filePath)) {
      throw new Error(`The locale file does not exist: ${filePath}`);
    }
    localeMap.set(type, JSON.parse(FileSystem.readFile(filePath)));
  }
  const [en, zh] = localeMap.get(type)?.[key] || [key, key];
  return lang === LocaleLanguage.EN ? en : zh;
};
