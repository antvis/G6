// TODO import from built in theme
declare type BuiltInTheme = 'light' | 'dark';

export type ThemeOption<RegisterTheme extends string = BuiltInTheme> = RegisterTheme | BuiltInTheme;
