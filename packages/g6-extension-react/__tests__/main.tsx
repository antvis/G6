import { render } from '@antv/g6-extension-react';
import { Alert, Flex, Select } from 'antd';
import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter, useMatch, useNavigate } from 'react-router-dom';
import * as demos from './demos';

const App = () => {
  const navigate = useNavigate();
  const match = useMatch('/*');

  return (
    <Flex vertical>
      <Select
        value={match?.params['*'] || Object.keys(demos)[0]}
        options={Object.keys(demos).map((label) => ({ label, value: label }))}
        style={{ width: 100 }}
        onChange={(value) => navigate(value)}
      />
      <Outlet />
    </Flex>
  );
};

const NotFount = () => {
  return <Alert message="Demo Not Found" type="error" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFount />,
    children: Object.entries(demos).map(([key, Demo]) => ({
      path: key,
      element: <Demo />,
    })),
  },
]);

const container = document.getElementById('root')!;

render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  container,
);
