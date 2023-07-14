import { routeMenu } from '~/config/menu.config'
export default function ({ $auth, route, redirect }) {
  if (
    route.fullPath === '/error' ||
    route.fullPath === '/login' ||
    route.fullPath === '/test'
  ) {
    return
  }
  const isExistRoute = routeMenu.some((item) => {
    return item.route === route.fullPath
  })

  if (!isExistRoute) {
    return redirect('/error')
  }

  const hasPermission = routeMenu.some((item) => {
    return item.role.includes($auth.user.role) && item.route === route.fullPath
  })

  if (!hasPermission) {
    return redirect('/error')
  }
}
