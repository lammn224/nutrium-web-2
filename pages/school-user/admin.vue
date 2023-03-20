<template>
  <content-card title="Danh sách tài khoản quản trị viên">
    <template #toolbar>
      <b-button
        v-if="$auth.user.role === ADMIN()"
        variant="primary"
        @click="show()"
      >
        <i class="flaticon2-plus" /> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/school-users/admin"
        hide-action-column
      />

      <user-modal ref="modal" :on-action-success="reloadData" />

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
  pageTitle: 'Quản lý tài khoản quản trị viên',
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

    show() {
      this.$refs.modal.show()
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
