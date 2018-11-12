import Vue from 'vue';
import Router from 'vue-router';
import HotelsList from './views/HotelsList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'hotels',
      component: HotelsList,
    },
    {
      path: '/hotels/:id',
      name: 'hotel',
      component: () => import(/* webpackChunkName: "about" */ './views/Hotel.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
