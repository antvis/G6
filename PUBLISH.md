This project uses changeset to manage version release, and the specific release process is as follows:

1. Complete related development work
2. Create a branch from v5 (any name you want)
3. Run `pnpm changeset` and fill in the information as prompted
4. run `pnpm run version` to generate the version number
5. Merge the branch into the v5 branch by creating a PR on GitHub and adding a `publish` tag
6. When a branch is merged, GitHub Actions are automatically triggered and published to npm

---

本项目通过 changeset 来管理版本发布，具体的发布流程如下：

1. 完成相关的开发工作
2. 从 v5 分支创建一个分支（任意分支名均可）
3. 执行 `pnpm changeset` 命令，根据提示填写相关信息
4. 执行 `pnpm run version` 命令，生成版本号
5. 在 GitHub 上创建一个 PR，并添加 `publish` 标签，将该分支合并到 v5 分支
6. 分支合并后，会自动触发 GitHub Actions，发布到 npm