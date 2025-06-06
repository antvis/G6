/* @jsx preserve */
/* @jsxImportSource solid-js */
import { render } from '@antv/g6-extension-solid';
import { RouteDefinition, Router, RouteSectionProps, useMatch, useNavigate } from '@solidjs/router';
import * as demos from './demos';

const App = (props: RouteSectionProps) => {
  const navigate = useNavigate();
  const match = useMatch(() => '/*');

  return (
    <Flex vertical>
      <Select
        value={match()?.params['*'] || Object.keys(demos)[0]}
        options={Object.keys(demos).map((label) => ({ label, value: label }))}
        style={{ width: 100 }}
        onChange={(value) => navigate(value)}
      />
      {props.children}
    </Flex>
  );
};

const routes = {
  path: '/',
  component: App,
  children: Object.entries(demos).map(([key, Demo]) => ({
    path: key,
    component: Demo,
  })),
} satisfies RouteDefinition;

const container = document.getElementById('root')!;

render(
  () => <Router>{routes}</Router>,
  container,
);
