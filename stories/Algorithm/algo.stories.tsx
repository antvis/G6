import { storiesOf } from '@storybook/react';
import React from 'react';
import FindPath from './component/path';
import PageRank from './component/pagerank'

export default { title: 'Algorithm' };

storiesOf('Algorithm', module)
  .add('find path', () => <FindPath />)
  .add('get pagerank', () => <PageRank />)
  ;
