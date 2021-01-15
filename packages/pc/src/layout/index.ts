import { Layouts as Layout, registerLayout as oRegisterLayout } from '@antv/layout'; // , Layout as oLayout

const registerLayout = (name: string, layoutOverride: any) => {
  layoutOverride.isCustomLayout = true;
  oRegisterLayout(name, layoutOverride);
};

export { Layout, registerLayout };
