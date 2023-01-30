import { ADMIN, PARENTS } from '~/constants/role.constant'

export default [
  {
    title: 'Dashboard',
    icon: 'flaticon2-architecture-and-city',
    route: '/dashboard',
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
    title: 'Quản lý người dùng',
    icon: 'flaticon2-user',
    route: '/user',
    role: [ADMIN],
  },
  {
    title: 'Quản lý lớp học',
    icon: 'flaticon2-user',
    route: '/class',
  },
  {
    title: 'Quản lý thực phẩm',
    icon: 'flaticon2-user',
    route: '/food',
    role: [ADMIN, PARENTS],
  },
]