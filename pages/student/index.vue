<template>
  <content-card title="Danh sách tài khoản học sính">
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
        remote-url="/students"
        hide-action-column
      />

      <student-modal ref="modal" :on-action-success="reloadData" />

      <student-reset-password-modal
        ref="resetPasswordModal"
        :on-action-success="reloadData"
      />
    </template>
  </content-card>
</template>

<script>
import { ADMIN } from '~/constants/role.constant'
import { convertTimeStampsToString } from '~/services/convertTimeStamps.service'

export default {
  name: 'StudentPage',
  pageTitle: 'Quản lý tài khoản học sinh',
  data() {
    return {
      columns: [
        {
          field: 'studentId',
          key: 'mhs',
          title: 'Mã học sinh',
          width: 100,
          align: 'left',
          sortBy: 'asc',
        },
        {
          field: 'fullName',
          key: 'a',
          title: 'Họ và tên',
          width: 200,
          align: 'left',
          sortBy: 'asc',
        },
        {
          field: 'dateOfBirth',
          key: 'b',
          title: 'Ngày sinh',
          width: 200,
          align: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return convertTimeStampsToString(row.dateOfBirth)
          },
        },
        {
          field: 'class',
          key: 'c',
          title: 'Lớp',
          width: 200,
          align: 'left',
          renderBodyCell: ({ row, column }, h) => {
            return <span>{row.class.name}</span>
          },
        },
        {
          field: '',
          key: 'action',
          title: 'Hành động',
          width: 250,
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
                &nbsp;
                <button
                  class="btn btn-sm btn-primary"
                  on-click={() => {
                    this.getDetailsStudent(row._id)
                  }}
                >
                  Chi tiết
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
      title: 'Student',
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

    getDetailsStudent(rowVal) {
      this.$router.push({ path: `/student/${rowVal}` })
    },
  },
}
</script>
