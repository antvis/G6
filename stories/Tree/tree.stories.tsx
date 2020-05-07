// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import FileSystem from './component/file-system';
import LargeDataTree from './component/large-data';
import SlefTree from './component/self-tree'
import OriganizationTree from './component/organization-tree'

export default { title: 'Tree' };

storiesOf('Tree', module)
  .add('indented tree file system', () => <FileSystem />)
  .add('large data custom tree', () => <LargeDataTree />)
  .add('register flow tree', () => <SlefTree />)
  .add('origanization tree', () => <OriganizationTree />)
