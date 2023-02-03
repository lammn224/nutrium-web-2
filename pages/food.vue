<template>
  <content-card title="Danh sách món ăn">
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
        remote-url="/foods"
        :hide-action-column="$auth.user.role !== ADMIN()"
        @editRow="editFood"
        @deleteRow="deleteFood"
      />
      <food-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { ADMIN } from '~/constants/role.constant'

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
    sortBy: 'asc',
  },
  {
    field: 'protein',
    key: 'c',
    title: 'Protein',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'lipid',
    key: 'd',
    title: 'Lipid',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'glucid',
    key: 'e',
    title: 'Glucid',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'ca',
    key: 'f',
    title: 'Canxi',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'fe',
    key: 'g',
    title: 'Sắt',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'zn',
    key: 'h',
    title: 'Kẽm',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'fiber',
    key: 'i',
    title: 'Chất xơ',
    align: 'left',
    sortBy: 'asc',
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
    ADMIN() {
      return ADMIN
    },
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
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa món ăn "${food.name}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/foods/' + food._id)
            this.$notifyDeleteSuccess('món ăn')
            this.reloadData()
          }
        })
        .catch(() => {
          this.$notifyTryAgain()
        })
    },
  },
}
</script>
