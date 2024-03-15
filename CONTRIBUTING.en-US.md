# Contribution Guide

## Introduction

First of all, thank you for considering contributing to G6! It's people like you that make the open-source community such a fantastic place to learn, inspire, and create. This document provides guidelines for contributing to G6. Please respect these guidelines to help maintain a collaborative and inclusive environment.

## Ways to Contribute

There are many ways you can contribute to G6:

- **Reporting bugs**: If you find a bug, please check the issue tracker to see if it has already been reported. If not, open a new issue. Be sure to include a clear title, a detailed description, and as much relevant information as possible.
- **Suggesting enhancements**: New ideas are always welcome. Open an issue to suggest improvements or new features.
- **Writing documentation**: Good documentation is as important as the code itself. If you enjoy writing and are looking to help out, consider improving the docs.
- **Submitting pull requests**: Pull requests are essential for us to keep moving forward. Whether it's fixing a bug, implementing a feature, or improving documentation, every contribution is valuable.

## Getting Started

Before starting to contribute, make sure to:

1. Fork the repository and create your branch from `v5s`.
2. If you're adding code, add tests that cover the new functionality/bug fix.
3. Ensure the test suite passes locally.
4. If you've changed APIs, update the documentation.
5. Make sure your code lints.
6. Write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should include more detail.

## Pull Request Process

1. Make sure your code adheres to the project's coding conventions (indentation, accurate comments, etc.) and that all of your commits are signed.
2. Update the README.md with any changes that are crucial to the project.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## How to run the Project

- Install dependence:

```bash
$ pnpm install
```

- Debugger with live demo:

```bash
$ cd packasges/g6

$ npm run dev
```

- Run test cases:

```bash
$ cd packasges/g6

$ npm run test
```

- Preview locale website:

```bash
$ cd packasges/site

$ npm run dev
```
