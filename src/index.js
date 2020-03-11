import "./my-header";
import "./views/my-content";
import "./my-footer";
import { Router } from "@vaadin/router";

window.addEventListener("load", () => {
  initRouter();
});

function initRouter() {
  const router = new Router(document.querySelector("main"));
  router.setRoutes([
    {
      path: "/",
      component: "my-content",
      action: () => import ("./views/my-content")
    },
    {
      path: "/users",
      component: "users",
      action: () => import("./views/users")
    },
   {
      path: "(.*)",
      component: "not-found-view",
      action: () => import("./views/not-found-view")
    }
  ]);
}