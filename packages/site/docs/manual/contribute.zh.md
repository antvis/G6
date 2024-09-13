---
title: 参与贡献
order: 8
---

要参与贡献，你需要了解 G6 的代码结构和开发流程。G6 的代码仓库地址是：https://github.com/antvis/G6

如果你想要修复一个 bug 或者增加一个新功能，你需要先 fork 一份代码到你的仓库，然后在你的仓库中进行修改，最后提交 PR 到 G6 的仓库。

## 项目结构

<Tree>
  <ul>
    <li>
      packages
      <ul>
        <li>
          g6
          <small>G6 核心实现</small>
          <ul>
            <li>
              __tests__
              <small>测试及开发环境</small>
              <ul>
                <li>
                  assets
                  <small>测试静态资源</small>
                </li>
                <li>
                  bugs
                  <small>Bug 修复测试用例</small>
                </li>
                <li>
                  dataset
                  <small>测试数据集</small>
                </li>
                <li>
                  demos
                  <small>开发示例</small>
                </li>
                <li>
                  snapshots
                  <small>测试截图</small>
                </li>
                <li>
                  perf
                  <small>性能测试用例</small>
                </li>
                <li>
                  perf-report
                  <small>性能测试报告</small>
                </li>
                <li>
                  unit
                  <small>测试用例</small>
                </li>
                <li>
                  utils
                  <small>测试工具函数</small>
                </li>
              </ul>
            </li>
            <li>
              src
              <ul>
                <li>
                  animations
                  <small>动画执行器及内置动画</small>   
                </li>
                <li>
                  behaviors
                  <small>内置交互</small>   
                </li>
                <li>
                  constants
                  <small>常量及枚举值</small>   
                </li>
                <li>
                  elements
                  <small>内置元素</small>
                  <ul>
                    <li>
                      combos
                      <small>内置组合</small>
                    </li>
                    <li>
                      edges
                      <small>内置边</small>
                    </li>
                    <li>
                      nodes
                      <small>内置节点</small>
                    </li>
                    <li>
                      shapes
                      <small>复合图形</small>
                    </li>
                  </ul>
                </li>
                <li>
                  layouts
                  <small>布局引用及封装</small>   
                </li>
                <li>
                  palettes
                  <small>内置色板</small>   
                </li>
                <li>
                  plugins
                  <small>内置插件</small>   
                </li>
                <li>
                  registry
                  <small>注册模块</small>   
                </li>
                <li>
                  runtime
                  <small>Graph 及核心控制器</small>   
                </li>
                <li>
                  spec
                  <small>Specification 类型定义</small>   
                </li>
                <li>
                  themes
                  <small>内置主题</small>   
                </li>
                <li>
                  transforms
                  <small>内置数据转换</small>   
                </li>
                <li>
                  types
                  <small>类型定义</small>   
                </li>
                <li>
                  utils
                  <small>工具函数</small>   
                </li>
                <li>
                  exports.ts
                  <small>导出项</small>   
                </li>
                <li>
                  preset.ts
                  <small>预操作</small>
                </li>
              </ul>
            </li>
            <li>
              vite.config.js
              <small>开发环境 Vite 配置</small>
            </li>
          </ul>
        </li>
        <li>
          g6-extension-3d/src
          <small>3D 扩展</small>
          <ul>
            <li>
              behaviors
              <small>3D 交互</small>
            </li>
            <li>
              elements
              <small>3D 元素</small>
            </li>
            <li>
              plugins
              <small>3D 插件</small>
            </li>
            <li>
              renderer.ts
              <small>3D 渲染器</small>
            </li>
          </ul>
        </li>
        <li>
          g6-extension-react/src
          <small>React 节点扩展</small>
          <ul>
            <li>
              elements
              <small>React 元素</small>
            </li>
            <li>
              graph
              <small>React Graph 封装</small>
            </li>
          </ul>
        </li>
        <li>
          site
          <small>官网及文档</small>
          <ul>
            <li>
              docs
              <small>教程及 API</small>
            </li>
            <li>
              examples
              <small>图表示例</small>
            </li>
            <li>
              .dumirc.ts
              <small>配置文件</small>
            </li>
          </ul>
        </li>
      </ul>
    </li>

  </ul>
</Tree>

## 开发流程

1. Fork 并拉取代码

在 Github 中 Fork [G6](https://github.com/antvis/G6) 到你的仓库，并拉取到本地。

```bash
# 进入你的工作目录
cd /path/to/your/workspace

# 克隆 G6 代码
git clone git@github.com:[your username]/G6.git
```

2. 安装依赖

:::warning{title=注意}
请验证你的本地环境是否符合要求：

- [Node.js](https://nodejs.org/) 版本 >= 18
- [pnpm](https://pnpm.io/) 版本 >= 8

:::

```bash
# 进入 G6 代码目录
cd G6

# 安装依赖
pnpm install
```

3. 启动开发环境

```bash
# 进入 G6 代码目录
cd ./packages/g6

# 启动开发环境
pnpm dev
```

此时，你可以在浏览器中访问 `http://127.0.0.1:8080` 查看 G6 的开发环境并预览开发示例。

4. 开发新功能或修复 bug

切换到开发分支：

```bash
git checkout -b [branch name]
```

根据你的需求，修改代码并在本地测试。

5. 编写测试用例

在 `packages/g6/__tests__/unit` 目录下编写测试用例，确保你的代码符合预期。

确保你的代码通过测试：

```bash
pnpm test
```

6. 提交 PR

```bash
# 添加修改
git add .

# 提交修改
git commit -m "[commit type]: commit message"

# 推送到你的仓库
git push
```

在 Github 中提交 PR 到 G6 仓库。

## 测试与覆盖率

G6 使用 Jest 进行单元测试，测试用例位于 `packages/g6/__tests__/unit` 目录下。

我们要求所有的代码提交都需要通过测试，确保代码质量。

当前 PR 提交的覆盖率不建议低于当前代码库的覆盖率，且<text style="color: red;">不得低于 90%</text>。

### 更新测试截图

G6 扩展了 Jest 测试，提供了 `toMatchSnapshot` 断言用于生成以及对比快照。

如果当前可能修改影响了部分截图的生成，需要通过执行 `pnpm test` 检查是否有测试用例失败。

当发现测试失败的用例时，控制台会打印出失败的测试路径，以及基准截图和当前截图的路径信息。你可以按住 `Ctrl` 或 `Command` 键并点击路径，查看具体的测试用例或截图。

<img width="500px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*39j5TKAePWsAAAAAAAAAAAAADmJ7AQ/original"/>

如果确认本次修改是正确的，那么请手动删除对应的基准截图，并重新生成截图：

**重新生成全部截图**：

1. 删除 `packages/g6/__tests__/unit/snapshots` 目录下的所有文件
2. 执行 `pnpm test`

**重新生成单个截图**：

1. 删除 `packages/g6/__tests__/snapshots` 目录下对应的文件（`unit`目录下测试用例会在`snapshots`下生成对应的目录）
2. 执行 `npx jest __tests__/unit/xx/xxx.spec.ts`

## 代码规范

G6 编码尊循以下规范：

- eslint:recommended
- @typescript-eslint/recommended
- jsdoc/recommended-error

## 提交规范

G6 采用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，提交信息格式如下：

```
<type>[optional scope]: <description>
```

type 有以下几种：

- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码格式（不影响代码运行的变动）
- refactor: 重构
- perf: 性能优化
- test: 测试
- build: 构建工具相关的变动
- ci: CI 配置
- chore: 其他无关紧要的变动
- revert: 撤销

例如：

```
feat: add new feature
refactor(behavior): refactor drag-canvas behavior
```

请确保你的提交信息符合规范，并尽量使用英文描述，这样有助于我们更好地管理代码。

## PR 规范

完成上述步骤后，你可以提交 PR 到 G6 仓库。请确保你的 PR 符合以下规范：

- 一个 PR 只解决一个问题
- PR 的标题简洁明了
- PR 的描述清晰详细，涉及视图的变动请附上截图
- PR 必需能够通过 CI 检查

## 代码 Review

PR 提交后，我们会对你的代码进行 Review。请耐心等待 Review 结果，如果有需要修改的地方，我们会在 PR 中提出。

## 发布流程

我们会定期发布新版本，如果你的 PR 是非紧急缺陷修复，我们会在下一个版本中发布。如果你的 PR 是紧急缺陷修复，我们会尽快发布新版本。
