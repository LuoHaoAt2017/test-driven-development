import { defineConfig } from 'umi';

export default defineConfig({
  title: '测试驱动开发',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
    },
  ],
  fastRefresh: {},
});
