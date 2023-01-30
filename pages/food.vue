<template>
  <content-card title="Danh sách món ăn">
    <template #toolbar>
      <b-button variant="primary" @click="show()">
        <i class="flaticon2-plus" /> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/foods"
        @editRow="editFood"
        @deleteRow="deleteFood"
      />
      <!--      <character-modal ref="modal" :on-action-success="reloadData" />-->
    </template>
  </content-card>
</template>

<script>
const columns = [
  {
    field: 'name',
    key: 'a',
    title: 'Tên món ăn',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'power',
    key: 'b',
    title: 'Năng lượng',
    align: 'left',
  },
  {
    field: 'protein',
    key: 'c',
    title: 'Protein',
    align: 'left',
  },
  {
    field: 'lipid',
    key: 'd',
    title: 'Lipid',
    align: 'left',
  },
  {
    field: 'glucid',
    key: 'e',
    title: 'Glucid',
    align: 'left',
  },
  {
    field: 'ca',
    key: 'f',
    title: 'Canxi',
    align: 'left',
  },
  {
    field: 'fe',
    key: 'g',
    title: 'Sắt',
    align: 'left',
  },
  {
    field: 'zn',
    key: 'h',
    title: 'Kẽm',
    align: 'left',
  },
  {
    field: 'fiber',
    key: 'i',
    title: 'Chất xơ',
    align: 'left',
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
  methods: {
    show() {
      this.$refs.modal.show()
    },
    reloadData() {
      this.$refs.table.loadData()
    },
    editFood(food) {
      this.$refs.modal.show(food)
    },
    deleteFood(food) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa nhân vật "${food.name}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/foods/' + food._id)
            // this.$notifyDeleteSuccess('nhân vật')
            this.reloadData()
          }
        })
        .catch(() => {
          // this.$notifyTryAgain()
        })
    },
  },
}
</script>
