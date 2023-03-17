<template>
  <content-card title="Danh sách tài khoản phụ huynh">
    <template #toolbar> </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/school-users"
        hide-action-column
      />

      <user-reset-password-modal
        ref="resetPasswordModal"
        :on-action-success="reloadData"
      />
    </template>
  </content-card>
</template>

<script>
import { ADMIN } from '~/constants/role.constant'

export default {
  name: 'SchoolUser',
  pageTitle: 'Quản lý tài khoản phụ huynh',
  data() {
    return {
      columns: [
        {
          field: 'fullName',
          key: 'a',
          title: 'Họ và tên',
          width: 200,
          align: 'left',
          sortBy: 'asc',
        },
        {
          field: 'phoneNumber',
          key: 'b',
          title: 'Số điện thoại',
          width: 200,
          align: 'left',
        },
        {
          field: '',
          key: 'action',
          title: 'Hành động',
          width: 100,
          align: 'center',
          fixed: 'right',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span>
                <button
                  class="btn btn-sm btn-info"
                  on-click={() => this.resetPassword(row)}
                >
                  Đổi mật khẩu
                </button>
              </span>
            )
          },
        },
      ],
    }
  },
  head() {
    return {
      title: 'School User',
    }
  },

  methods: {
    ADMIN() {
      return ADMIN
    },

    reloadData() {
      this.$refs.table.loadData()
    },

    resetPassword(user) {
      this.$refs.resetPasswordModal.show(user)
    },
  },
}
</script>
