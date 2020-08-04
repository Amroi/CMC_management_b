import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  title: 'CMC管理系统',
  theme: {
    'primary-color': '#13CDDC',
  },
});
