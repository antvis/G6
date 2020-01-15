// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import FileSystem from './component/file-system'

export default { title: 'Tree' };


storiesOf('Tree', module)
  .add('indented tree file system', () => (  // 一个 add 表示添加一个 story
    <FileSystem />
  ))