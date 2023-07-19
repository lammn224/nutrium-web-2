<template>
  <content-card title="Danh sách trường học">
    <template #toolbar>
      <b-button variant="primary" @click="show()">
        <i class="flaticon2-plus" /> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/schools"
        @editRow="editFood"
        @deleteRow="deleteFood"
      />
      <school-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
const columns = [
  {
    field: 'name',
    key: 'a',
    title: 'Tên trường học',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'code',
    key: 'b',
    title: 'Mã trường học',
    align: 'left',
    width: 150,
    sortBy: 'asc',
  },
  {
    field: 'fullName',
    key: 'c',
    title: 'Tạo bởi',
    align: 'left',
    width: 200,
    sortBy: 'asc',
    renderBodyCell: ({ row, column, rowIndex }, h) => {
      return row.createdBy.fullName
    },
  },
  {
    field: 'phoneNumber',
    key: 'd',
    title: 'Số điện thoại',
    align: 'left',
    width: 150,
    sortBy: 'asc',
    renderBodyCell: ({ row, column, rowIndex }, h) => {
      return row.createdBy.phoneNumber
    },
  },
]
export default {
  name: 'SchoolPage',
  pageTitle: 'Quản lý trường học',
  data() {
    return {
      columns,
    }
  },
  head() {
    return {
      title: 'Schools',
    }
  },
  methods: {
    show() {
      this.$refs.modal.show()
    },
    reloadData() {
      this.$refs.table.loadData()
    },
    editFood(food) {},
    deleteFood(food) {},
  },
}
</script>
