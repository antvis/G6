/**
 * optionName: 选项名
 * shouldBe: 合法的输入参数
 * now: 当前用户输入值
 * scope: 选项所属的模块
 */
type WarnOption = {
  optionName: string;
  shouldBe: any;
  now: string | number;
  scope: string;
};

/**
 *
 * @param root0
 * @param root0.optionName
 * @param root0.shouldBe
 * @param root0.now
 * @param root0.scope
 */
export function warn({ optionName, shouldBe, now, scope }: WarnOption) {
  console.warn(`G6 [${scope}]: Invalid option, ${optionName} must be one of ${shouldBe.join(', ')}, but got ${now}`);
}
