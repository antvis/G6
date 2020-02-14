// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import FileSystem from './component/file-system';
import LargeDataTree from './component/large-data';

export default { title: 'Tree' };

storiesOf('Tree', module)
  .add('indented tree file system', () => <FileSystem />)
  .add('large data custom tree', () => <LargeDataTree />);
