import { ADMIN, PARENTS, STUDENT } from '~/constants/role.constant'

export default [
  {
    title: 'Dashboard',
    icon: 'flaticon2-architecture-and-city',
    route: '/',
    role: [ADMIN, PARENTS, STUDENT],
  },
  {
    title: 'Quản lý người dùng',
    icon: 'flaticon-users',
    // role: [ADMIN],
    subMenus: [
      {
        title: 'Tài khoản Học sinh',
        icon: 'flaticon2-user',
        route: '/student',
        role: [ADMIN],
      },
      {
        title: 'Tài khoản phụ huynh',
        icon: 'flaticon2-user',
        route: '/school-user/parents',
        role: [ADMIN],
      },
      {
        title: 'Tài khoản quản trị viên',
        icon: 'flaticon2-user',
        route: '/school-user/admin',
        role: [ADMIN],
      },
    ],
  },
  {
    title: 'Quản lý khối - lớp',
    icon: 'flaticon-map',
    // route: '/grade',
    // role: [ADMIN],
    subMenus: [
      {
        title: 'Quản lý khối lớp',
        icon: 'flaticon-map',
        route: '/grade',
        role: [ADMIN],
      },
      {
        title: 'Quản lý lớp học',
        icon: 'flaticon-layers',
        route: '/class',
        role: [ADMIN],
      },
    ],
  },
  {
    title: 'Dinh dưỡng - luyện tập',
    icon: 'flaticon-layers',
    subMenus: [
      {
        title: 'Danh sách bài tập',
        icon: 'flaticon-layers',
        route: '/activity',
        role: [ADMIN, PARENTS, STUDENT],
      },
      {
        title: 'Danh sách món ăn',
        icon: 'flaticon-pie-chart',
        route: '/food',
        role: [ADMIN, PARENTS, STUDENT],
      },
      {
        title: 'Luyện tập',
        icon: 'flaticon2-heart-rate-monitor',
        route: '/schedule-exercise',
        role: [PARENTS, STUDENT],
      },
    ],
  },
  {
    title: 'Lập lịch bữa ăn',
    icon: 'flaticon-calendar-2',
    route: '/calendar',
    role: [ADMIN, PARENTS, STUDENT],
  },
]

export const routeMenu = [
  {
    route: '/calendar',
    role: [ADMIN, PARENTS, STUDENT],
  },
  {
    route: '/schedule-exercise',
    role: [PARENTS, STUDENT],
  },
  {
    route: '/food',
    role: [ADMIN, PARENTS, STUDENT],
  },
  {
    route: '/activity',
    role: [ADMIN, PARENTS, STUDENT],
  },
  {
    route: '/class',
    role: [ADMIN],
  },
  {
    route: '/grade',
    role: [ADMIN],
  },
  {
    route: '/student',
    role: [ADMIN],
  },
  {
    route: '/school-user/parents',
    role: [ADMIN],
  },
  {
    route: '/school-user/admin',
    role: [ADMIN],
  },
  {
    route: '/',
    role: [ADMIN, PARENTS, STUDENT],
  },
]
