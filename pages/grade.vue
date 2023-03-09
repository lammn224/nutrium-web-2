<template>
  <content-card title="Danh sách khối lớp">
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
        remote-url="/grade"
        hide-action-column
        @editRow="editGrade"
      />
      <grade-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { ADMIN } from '~/constants/role.constant'

export default {
  name: 'GradePage',
  pageTitle: 'Quản lý khối lớp',
  data() {
    return {
      columns: [
        {
          field: 'name',
          key: 'a',
          title: 'Tên khối lớp',
          align: 'left',
          sortBy: 'asc',
        },
        {
          field: '',
          key: 'defaultAction',
          title: 'Hành động',
          width: 150,
          align: 'center',
          fixed: 'right',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span>
                <button
                  class="btn btn-sm btn-primary"
                  on-click={() => this.editGrade(row)}
                >
                  Cập nhật
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
      title: 'Grade',
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
    editGrade(grade) {
      this.$refs.modal.show(grade)
    },
  },
}
</script>
