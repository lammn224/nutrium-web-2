<template>
  <content-card title="Danh sách bài tập">
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
        remote-url="/activities"
        :hide-action-column="$auth.user.role !== ADMIN()"
        @editRow="editActivity"
        @deleteRow="deleteActivity"
      />
      <activity-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { ADMIN } from '~/constants/role.constant'

export default {
  name: 'ActivityPage',
  pageTitle: 'Quản lý bài tập',
  data() {
    return {
      columns: [
        {
          field: 'name',
          key: 'a',
          title: 'Tên bài tập',
          width: 250,
          align: 'left',
          sortBy: 'asc',
        },
        {
          field: 'metIdx',
          key: 'b',
          title: 'Chỉ số MET',
          width: 250,
          align: 'left',
          sortBy: 'asc',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Activity',
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
    editActivity(activity) {
      this.$refs.modal.show(activity)
    },
    deleteActivity(activity) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa bài tập "${activity.name}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/activities/' + activity._id)
            this.$notifyDeleteSuccess('bài tập')
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
