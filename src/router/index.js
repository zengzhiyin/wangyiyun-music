import Vue from "vue";
import VueRouter from "vue-router";

const Discovery = () => import(/* webpackChunkName: "Discovery" */ '@/views/discovery')



// 内容需要居中的页面
export const layoutCenterNames = ['discovery', 'playlists', 'songs', 'mvs']
// 需要显示在侧边栏菜单的页面
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: {
      title: '发现音乐',
      icon: 'music',
    },
  }
]

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/discovery',
  },
  ...menuRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
