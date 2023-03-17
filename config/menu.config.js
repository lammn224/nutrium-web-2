import { ADMIN, PARENTS, STUDENT } from '~/constants/role.constant'

export default [
  {
    title: 'Dashboard',
    icon: 'flaticon2-architecture-and-city',
    route: '/',
  },
  {
    title: 'Lập lịch bữa ăn',
    icon: 'flaticon-calendar-2',
    route: '/calendar',
    role: [ADMIN, PARENTS, STUDENT],
  },
  {
    title: 'Quản lý người dùng',
    icon: 'flaticon2-user',
    role: [ADMIN],
    subMenus: [
      {
        title: 'Tài khoản Học sinh',
        route: '/student',
        icon: 'flaticon2-user',
        role: [ADMIN],
      },
      {
        title: 'Tài khoản phụ huynh',
        route: '/school-user',
        icon: 'flaticon2-user',
        role: [ADMIN],
      },
    ],
  },
  {
    title: 'Quản lý khối lớp',
    icon: 'flaticon-map',
    route: '/grade',
    role: [ADMIN],
  },
  {
    title: 'Quản lý lớp học',
    icon: 'flaticon-map',
    route: '/class',
    role: [ADMIN],
  },
  {
    title: 'Thông tin món ăn',
    icon: 'flaticon2-chart2',
    route: '/food',
    role: [ADMIN, PARENTS, STUDENT],
  },
]
