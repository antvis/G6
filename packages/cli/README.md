# @antv/g6-cli

`@antv/g6-cli` is a G6 template generation tool that comes with several templates.

Currently, it owns a built-in template called `extension`. This template handles the boilerplate setup, which encompasses a seamless local development environment, linting, code formatting, Jest for snapshot testing and bundling with Rollup etc.

`@antv/g6-cli` i

## Getting Started

To start using `@antv/g6-cli`, you'll first need to install it globally.

```bash
npm i @antv/g6-cli -g
```

Once installed, you can easily scaffold a new project:

```bash
create-g6
```

Then follow the prompts!

![prompts](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*09BKQrIcZUMAAAAAAAAAAAAADmJ7AQ/original)

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a **G6 Extension** project, run:

```bash
create-g6 g6-extension-test --template extension
```
