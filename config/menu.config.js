import { ADMIN, PARENTS, STUDENT } from '~/constants/role.constant'

export default [
  {
    title: 'Dashboard',
    icon: 'flaticon2-architecture-and-city',
    route: '/',
  },
  // {
  //   title: 'Quản lý nội dung',
  //   icon: 'flaticon2-digital-marketing',
  //   subMenus: [
  //     {
  //       title: 'Bài học',
  //       route: '/lesson',
  //     },
  //     {
  //       title: 'Hội thoại',
  //       route: '/conversation',
  //     },
  //     {
  //       title: 'Bối cảnh',
  //       route: '/background',
  //     },
  //     {
  //       title: 'Nhân vật',
  //       route: '/figure',
  //     },
  //     {
  //       title: 'Phản hồi',
  //       route: '/feedback',
  //     },
  //     {
  //       title: 'Trang',
  //       route: '/page',
  //     },
  //   ],
  // },
  {
    title: 'Lập lịch bữa ăn',
    icon: 'flaticon-calendar-2',
    route: '/calendar',
    role: [ADMIN, PARENTS, STUDENT],
  },
  {
    title: 'Quản lý người dùng',
    icon: 'flaticon2-user',
    route: '/user',
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
