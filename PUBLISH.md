This project uses changeset to manage version release, and the specific release process is as follows:

1. Complete related development work
2. Create a branch from v5 (any name you want)
3. Run `npm run version` command, fill in the information according to the prompt, and the version number will be updated automatically
4. Commit the changes to the remote repository
5. Create a PR on GitHub, add the `publish` label, and merge the branch to v5
6. After the branch is merged, GitHub Actions will be triggered automatically, and the package will be published to npm

---

本项目通过 changeset 来管理版本发布，具体的发布流程如下：

1. 完成相关的开发工作
2. 从 v5 分支创建一个分支（任意分支名均可）
3. 执行 `npm run version` 命令，根据提示填写相关信息，会自动更新版本号
4. 将变更提交到远程仓库
5. 在 GitHub 上创建一个 PR，并添加 `publish` 标签，将该分支合并到 v5 分支
6. 分支合并后，会自动触发 GitHub Actions，发布到 npm
