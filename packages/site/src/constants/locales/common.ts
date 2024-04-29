export enum LocaleLanguage {
  EN = 'en-US',
  ZH = 'zh-CN',
}

export const getIntl = (obj: Record<string, string[]>) => {
  return (key: string, language: LocaleLanguage) => {
    const [en, zh] = obj[key];
    return language === LocaleLanguage.EN ? en : zh;
  };
};
