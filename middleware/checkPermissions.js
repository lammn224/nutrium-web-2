import { routeMenu } from '~/config/menu.config'
export default function ({ $auth, route, redirect }) {
  if (
    route.fullPath === '/error' ||
    route.fullPath === '/login' ||
    route.fullPath === '/test' ||
    route.fullPath === '/profile'
  ) {
    return
  }
  const isExistRoute = routeMenu.some((item) => {
    return item.route === route.matched[0].path
  })

  if (!isExistRoute) {
    return redirect('/error')
  }

  const hasPermission = routeMenu.some((item) => {
    return (
      item.role.includes($auth.user.role) &&
      item.route === route.matched[0].path
    )
  })

  if (!hasPermission) {
    return redirect('/error')
  }
}
