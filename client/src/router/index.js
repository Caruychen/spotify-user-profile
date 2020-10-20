import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/user",
        name: "User",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/top/:slug",
        name: "TopItems",
        props: true,
        component: () =>
          import(/* webpackChunkName: "topitems" */ "../views/TopItems.vue"),
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
          const test = ["artists", "tracks"];
          const exists = test.find(type => {
            return type === to.params.slug;
          });
          if (exists) {
            next();
          } else {
            next({ name: "NotFound" });
          }
        }
      },
      {
        path: "/recent",
        name: "Recent",
        component: () =>
          import(/* webpackChunkName: "recent" */ "../views/Recent.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "",
        redirect: "/user"
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // Triggered when callback returns with tokens
  if (to.query.access_token) {
    localStorage.setItem("access_token", to.query.access_token);
    localStorage.setItem("refresh_token", to.query.refresh_token);

    next({
      path: "/"
    });
  }

  // Routes requiring authentication are redirected to login if access token not available
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.access_token) {
      next({
        name: "Login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
