---
title: Error in Angular with G6
order: 2
---

**This doc is only for Angular 9 and above and the solution is only tested on Angular 9 and above.**

There's no special settings or differences to use G6 in Angular if you just start a new Angular project from latest Angular CLI. Do it like you normal do when adding new dependency

However, if your application is upgraded from older angular version (for example, my project is from angular 6), you may run into trouble.

If you see `cannot read property 'webpackChunkAlgorithm'` error like following picture shows
![image](https://user-images.githubusercontent.com/12276316/110507994-8e108e00-80ce-11eb-9f40-653f2181e44b.png)

Please refer to https://github.com/antvis/G6/issues/2691 for solution

basically to make G6 work for angular:

1. Create a .browserslistrc file under your application directory, same level as package.json. `please notice that browserslist won't working.`
2. opt-out the IE support.
