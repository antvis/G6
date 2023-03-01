import React from 'react';
import Page from '../../pages/largegraph';
import { Header } from '@antv/dumi-theme-antv/dist/slots/Header';
import { Footer } from '@antv/dumi-theme-antv/dist/slots/Footer';

const LargeGraph: React.FC = () => {
  return (
    <>
      <Header />
      <Page />
      <Footer />
    </>
  );
};

export default LargeGraph;