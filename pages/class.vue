<template>
  <content-card title="Danh sách lớp học">
    <template #toolbar>
      <b-button variant="primary" @click="show()">
        <i class="flaticon2-plus" /> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/classes"
        :hide-action-column="true"
      />
      <class-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
const columns = [
  {
    field: 'name',
    key: 'a',
    title: 'Tên lớp',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'member',
    key: 'b',
    title: 'Sĩ số',
    align: 'left',
    renderBodyCell: ({ row, column, rowIndex }, h) => {
      return <span>{row.members.length}</span>
    },
  },
]
export default {
  name: 'FoodPage',
  pageTitle: 'Quản lý món ăn',
  data() {
    return {
      columns,
    }
  },
  head() {
    return {
      title: 'Foods',
    }
  },
  methods: {
    show() {
      this.$refs.modal.show()
    },
    reloadData() {
      this.$refs.table.loadData()
    },
  },
}
</script>
