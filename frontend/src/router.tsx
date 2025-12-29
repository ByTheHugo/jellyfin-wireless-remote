import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import App from "./App"
import Login from "./pages/login/Login"
import JellyfinUserLoginForm from "./pages/login/components/jellyfin-user-login-form/JellyfinUserLoginForm"
import JellyfinHostForm from "./pages/login/components/jellyfin-host-form/JellyfinHostForm"
import JellyfinServerSelector from "./pages/login/components/jellyfin-server-selector/JellyfinServerSelector"

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => (<p> 404 Whoops this route does not exist</p>)
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <App />
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <Login />
})

const loginHostRoute = createRoute({
  getParentRoute: () => loginRoute,
  path: '/',
  component: () => <>
    <JellyfinHostForm />
    <JellyfinServerSelector />
  </>
})

const loginRouteByServerId = createRoute({
  getParentRoute: () => loginRoute,
  path: '/server/$serverAddress',
  component: () => <JellyfinUserLoginForm />
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  loginHostRoute,
  loginRouteByServerId
])

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
export const router = createRouter({
  routeTree,
})

