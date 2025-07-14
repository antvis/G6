import { Alert } from 'ant-design-vue';
import { createApp } from 'vue-demi';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import * as demos from './demos';

const NotFount = () => {
  return <Alert message="Demo Not Found" type="error" />;
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      children: Object.entries(demos).map(([key, Demo]) => {
        return {
          path: `/${key}`,
          name: key,
          component: typeof Demo === 'function' ? Demo() : Demo,
        };
      }),
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFount,
    },
  ],
});

createApp(App).use(router).mount('#root');
