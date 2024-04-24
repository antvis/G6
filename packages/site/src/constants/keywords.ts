import { LocaleLanguage } from './locale';

export enum Keyword {
  ABSTRACT_CLASS = 'abstract-class',
  ABSTRACT_CLASSES = 'abstract-classes',
  CLASS = 'class',
  CLASSES = 'classes',
  COLON = 'colon',
  COMMA = 'comma',
  CONSTRUCTORS = 'constructors',
  DECORATOR = 'decorator',
  DEFAULT_VALUE = 'defaultValue',
  DESCRIPTION = 'description',
  ENUMERATION_MEMBERS = 'enumeration-members',
  ENUMERATIONS = 'enumerations',
  EVENTS = 'events',
  EXAMPLE = 'example',
  EXCEPTIONS = 'exceptions',
  EXTENDS = 'extends',
  FUNCTIONS = 'functions',
  IMPLEMENTS = 'implements',
  INTERFACE = 'interface',
  INTERFACES = 'interfaces',
  LEFT_PARENTHESIS = 'leftParenthesis',
  METHOD = 'method',
  METHODS = 'methods',
  MODIFIERS = 'modifiers',
  NAMESPACES = 'namespaces',
  OPTIONAL = 'optional',
  OPTIONS = 'options',
  PACKAGE = 'package',
  PACKAGES = 'packages',
  PARAMETER = 'parameter',
  PROPERTIES = 'properties',
  PROPERTY = 'property',
  REFERENCES = 'references',
  REMARKS = 'remarks',
  RETURNS = 'returns',
  RIGHT_PARENTHESIS = 'rightParenthesis',
  TYPE = 'type',
  TYPE_ALIASES = 'type-aliases',
  VARIABLES = 'variables',
  VIEW_PARAMETERS = 'view-parameters',
}

export const KeywordMapping: Record<Keyword, string[]> = {
  [Keyword.ABSTRACT_CLASS]: ['Abstract Class', '抽象类'],
  [Keyword.ABSTRACT_CLASSES]: ['Abstract Classes', '抽象类'],
  [Keyword.CLASS]: ['Class', '类'],
  [Keyword.CLASSES]: ['Classes', '类'],
  [Keyword.COLON]: [':', '：'],
  [Keyword.COMMA]: [',', '，'],
  [Keyword.CONSTRUCTORS]: ['Constructors', '构造函数'],
  [Keyword.DECORATOR]: ['Decorator', '装饰器'],
  [Keyword.DEFAULT_VALUE]: ['Default Value', '默认值'],
  [Keyword.DESCRIPTION]: ['Description', '描述'],
  [Keyword.ENUMERATION_MEMBERS]: ['Enumeration Members', '枚举成员'],
  [Keyword.ENUMERATIONS]: ['Enumerations', '枚举'],
  [Keyword.EVENTS]: ['Events', '事件'],
  [Keyword.EXAMPLE]: ['Example', '示例'],
  [Keyword.EXCEPTIONS]: ['Exceptions', '异常'],
  [Keyword.EXTENDS]: ['Extends', '继承自'],
  [Keyword.FUNCTIONS]: ['Functions', '函数'],
  [Keyword.IMPLEMENTS]: ['Implements', '实现自'],
  [Keyword.INTERFACE]: ['Interface', '接口'],
  [Keyword.INTERFACES]: ['Interfaces', '接口'],
  [Keyword.LEFT_PARENTHESIS]: ['(', '（'],
  [Keyword.METHOD]: ['Method', '方法'],
  [Keyword.METHODS]: ['Methods', '方法'],
  [Keyword.MODIFIERS]: ['Modifiers', '修饰符'],
  [Keyword.NAMESPACES]: ['Namespaces', '命名空间'],
  [Keyword.OPTIONAL]: ['Optional', '可选'],
  [Keyword.OPTIONS]: ['Options', '配置项'],
  [Keyword.PACKAGE]: ['Package', '包'],
  [Keyword.PACKAGES]: ['Packages', '包'],
  [Keyword.PARAMETER]: ['Parameter', '参数'],
  [Keyword.PROPERTIES]: ['Properties', '属性'],
  [Keyword.PROPERTY]: ['Property', '属性'],
  [Keyword.REFERENCES]: ['References', '引用'],
  [Keyword.REMARKS]: ['Remarks', '备注'],
  [Keyword.RETURNS]: ['Returns', '返回值'],
  [Keyword.RIGHT_PARENTHESIS]: [')', '）'],
  [Keyword.TYPE_ALIASES]: ['Type Aliases', '类型别名'],
  [Keyword.TYPE]: ['Type', '类型'],
  [Keyword.VARIABLES]: ['Variables', '变量'],
  [Keyword.VIEW_PARAMETERS]: ['View Parameters', '相关参数'],
};

export const intl = (keyword: Keyword, language: LocaleLanguage) => {
  const [en, zh] = KeywordMapping[keyword];
  return language === LocaleLanguage.EN ? en : zh;
};
