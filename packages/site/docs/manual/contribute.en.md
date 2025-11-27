---
title: contribute
order: 14
---

To contribute, you need to understand G6's code structure and development workflow. The code repository for G6 is located at: https://github.com/antvis/G6

If you want to fix a bug or add a new feature, you need to first fork a copy of the code to your repository, then make modifications in your repository, and finally submit a Pull Request (PR) to the G6 repository.

## Project Structure

<Tree>
  <ul>
    <li>
      packages
      <ul>
        <li>
          g6
          <small>G6 Core Implementation</small>
          <ul>
            <li>
              __tests__
              <small>Testing and Development Environment</small>
              <ul>
                <li>
                  assets
                  <small>Test Static Resources</small>
                </li>
                <li>
                  bugs
                  <small>Bugfix Test Case</small>
                </li>
                <li>
                  dataset
                  <small>Test Dataset</small>
                </li>
                <li>
                  demos
                  <small>Development Demos</small>
                </li>
                <li>
                  snapshots
                  <small>Test Snapshots</small>
                </li>
                <li>
                  perf
                  <small>Performance Test Case</small>
                </li>
                <li>
                  perf-report
                  <small>Performance Test Reports</small>
                </li>
                <li>
                  unit
                  <small>Test Cases</small>
                </li>
                <li>
                  utils
                  <small>Test Utility Functions</small>
                </li>
              </ul>
            </li>
            <li>
              src
              <ul>
                <li>
                  animations
                  <small>Animation Executors and Built-in Animations</small>   
                </li>
                <li>
                  behaviors
                  <small>Built-in Interactions</small>   
                </li>
                <li>
                  constants
                  <small>Constants and Enumeration Values</small>   
                </li>
                <li>
                  elements
                  <small>Built-in Elements</small>
                  <ul>
                    <li>
                      combos
                      <small>Built-in Combos</small>
                    </li>
                    <li>
                      edges
                      <small>Built-in Edges</small>
                    </li>
                    <li>
                      nodes
                      <small>Built-in Nodes</small>
                    </li>
                    <li>
                      shapes
                      <small>Composite Shapes</small>
                    </li>
                  </ul>
                </li>
                <li>
                  layouts
                  <small>Layout References and Encapsulation</small>   
                </li>
                <li>
                  palettes
                  <small>Built-in Palettes</small>   
                </li>
                <li>
                  plugins
                  <small>Built-in Plugins</small>   
                </li>
                <li>
                  registry
                  <small>Registry Module</small>   
                </li>
                <li>
                  runtime
                  <small>Graph and Core Controller</small>   
                </li>
                <li>
                  spec
                  <small>Specification Type Definitions</small>   
                </li>
                <li>
                  themes
                  <small>Built-in Themes</small>   
                </li>
                <li>
                  transforms
                  <small>Built-in Data Transformations</small>   
                </li>
                <li>
                  types
                  <small>Type Definitions</small>   
                </li>
                <li>
                  utils
                  <small>Utility Functions</small>   
                </li>
                <li>
                  exports.ts
                  <small>Export Items</small>   
                </li>
                <li>
                  preset.ts
                  <small>Pre-operations</small>
                </li>
              </ul>
            </li>
            <li>
              vite.config.js
              <small>Development Environment Vite Configuration</small>
            </li>
          </ul>
        </li>
        <li>
          g6-extension-3d/src
          <small>3D Extension</small>
          <ul>
            <li>
              behaviors
              <small>3D Behaviors</small>
            </li>
            <li>
              elements
              <small>3D Elements</small>
            </li>
            <li>
              plugins
              <small>3D Plugins</small>
            </li>
            <li>
              renderer.ts
              <small>3D Renderer</small>
            </li>
          </ul>
        </li>
        <li>
          g6-extension-react/src
          <small>React Node Extension</small>
          <ul>
            <li>
              elements
              <small>React Elements</small>
            </li>
            <li>
              graph
              <small>React Graph Encapsulation</small>
            </li>
          </ul>
        </li>
        <li>
          site
          <small>Official Website and Documentation</small>
          <ul>
            <li>
              docs
              <small>Tutorials and API</small>
            </li>
            <li>
              examples
              <small>Graph Examples</small>
            </li>
            <li>
              .dumirc.ts
              <small>Configuration File</small>
            </li>
          </ul>
        </li>
      </ul>
    </li>

  </ul>
</Tree>

## Development Process

1. Fork and Pull the Code

Fork the G6 repository on Github to your account, then clone it locally.

```bash
# Navigate to your workspace
cd /path/to/your/workspace

# Navigate to the G6 directory
git clone git@github.com:[your username]/G6.git
```

2. Install Dependencies

:::warning{title=Warning}
Please ensure your local environment meets the following requirements:

- [Node.js](https://nodejs.org/) version >= 18
- [pnpm](https://pnpm.io/) version >= 8

:::

```bash
# Enter the G6 code directory
cd G6

# Install Dependencies
pnpm install
```

3. Start the Development Environment

```bash
# Enter the g6 code directory.
cd ./packages/g6

# Start the development environment
pnpm dev
```

At this point, you can access G6's development environment and preview the examples by visiting http://127.0.0.1:8080 in your web browser.

4. Develop New Features or Fix Bugs

Switch to a development branch:

```bash
git checkout -b [branch name]
```

Make code modifications according to your needs and test locally.

5. Write Test Cases

In the `packages/g6/__tests__/unit` directory, write test cases to ensure your code behaves as expected.

Validate Your Code with Tests：

```bash
pnpm test
```

6. Submit a Pull Request (PR)

```bash
# Stage changes
git add .

# Commit Changes
git commit -m "[commit type]: commit message"

# Push to Your Repository
git push
```

Submit a Pull Request (PR) to the G6 repository on GitHub.

## Testing and Coverage

G6 utilizes Jest for conducting unit tests, with the test cases situated in the `packages/g6/__tests__/unit` directory.

We require that all code submissions must pass tests to ensure code quality.

The coverage rate for the current PR (Pull Request) submission is advised not to fall below the coverage rate of the existing codebase, and it is <text style="color: red;">not to fall below 90%</text>.

### Update Test Snapshots

G6 extends Jest tests and provides the `toMatchSnapshot` assertion for generating and comparing snapshots.

If the current possible modification affects the generation of some screenshots, it is necessary to check whether there are failed test cases by executing `pnpm test`.

When a failed test case is found, the console will print the path of the failed test, as well as the path information of the benchmark screenshot and the current screenshot. You can hold the `Ctrl` or `Command` key and click the path to view the specific test case or screenshot.

<img width="500px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*39j5TKAePWsAAAAAAAAAAAAADmJ7AQ/original"/>

If it is confirmed that this modification is correct, then please manually delete the corresponding benchmark screenshots and regenerate the screenshots:

**Regenerate all screenshots**:

1. Delete all files in the `packages/g6/__tests__/unit/snapshots` directory
2. Execute `pnpm test`

**Regenerate a single screenshot**:

1. Delete the corresponding file in the `packages/g6/__tests__/snapshots` directory (test cases in the `unit` directory will generate the corresponding directory under `snapshots`)
2. Execute `npx jest __tests__/unit/xx/xxx.spec.ts`

## Code Standards

The G6 code adheres to the following standards:

- eslint:recommended
- @typescript-eslint/recommended
- jsdoc/recommended-error

## Commit Conventions

G6 adopts the [Conventional Commits](https://www.conventionalcommits.org/) specification, and the commit message format is as follows:

```
<type>[optional scope]: <description>
```

The type field can be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation update
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- refactor: Code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- build: Changes that affect the build system or external dependencies
- ci: Changes to our CI configuration files and scripts
- chore: Other changes that don't modify src or test files
- revert: Reverts a previous commit

For example:

```
feat: add new feature
refactor(behavior): refactor drag-canvas behavior
```

Please ensure that your commit messages conform to the standards, and try to use English descriptions whenever possible. This helps us better manage the code.

## Pull Request (PR) Standards

After completing the above steps, you can submit a PR to the G6 repository. Please ensure that your PR adheres to the following standards:

- A single PR should address only one issue.
- The title of the PR should be concise and clear.
- The description of the PR should be clear and detailed. If the changes involve the user interface, please include screenshots.
- The PR must pass CI (Continuous Integration) checks.

## Code Review

After your PR is submitted, we will review your code. Please be patient and await the results of the review. If there are any areas that require modification, we will point them out within the PR.

## Release Process

We regularly release new versions. If your PR is for a non-urgent bug fix, it will be included in the next release. If your PR addresses an urgent bug fix, we will release a new version as soon as possible.

This project uses changeset to manage version release, and the specific release process is as follows:

1. Complete related development work
2. Create a branch from v5 (any name you want)
3. Run `npm run version` command, fill in the information according to the prompt, and the version number will be updated automatically
4. Commit the changes to the remote repository
5. Create a PR on GitHub, add the `publish` label, and merge the branch to v5
6. After the branch is merged, GitHub Actions will be triggered automatically, and the package will be published to npm
7. After the release, the Release note needs to be updated. Execute "pnpm tag" in the packages/g6
8. Fill in the tag information on the newly opened Github link. First, select the previous tag, and then select the current tag to obtain the changes. After confirming that there are no issues, release it.
