<template>
  <div>
    <content-card title="Danh sách bài tập">
      <template #toolbar>
        <b-button
          v-if="$auth.user.role === ADMIN || $auth.user.role === SYSADMIN"
          variant="primary"
          size="sm"
          @click="show"
        >
          <i class="flaticon2-plus"></i> Thêm mới
        </b-button>
      </template>
      <template #body>
        <b-overlay
          :show="isLoading"
          spinner-variant="primary"
          spinner-type="grow"
          spinner-small
          rounded="sm"
        >
          <b-input-group class="float-right pb-2" style="width: 300px">
            <template #prepend>
              <b-input-group-text>
                <i class="flaticon-search"></i>
              </b-input-group-text>
            </template>
            <b-form-input
              v-model="keyword"
              :placeholder="'Tìm kiếm'"
              debounce="500"
            ></b-form-input>
          </b-input-group>
          <b-table
            ref="table"
            hover
            bordered
            show-empty
            head-variant="light"
            :items="activities"
            :fields="fields"
            :current-page="curPage"
            :per-page="0"
            :busy="isLoading"
            thead-class="font-weight-bold font-size-lg text-center"
          >
            <template #empty>
              <h4 class="text-center">Không có dữ liệu</h4>
            </template>
            <template #cell(idx)="row">
              {{ ++row.index + limit * (curPage - 1) }}
            </template>
            <template
              v-if="$auth.user.role === SYSADMIN || $auth.user.role === ADMIN"
              #cell(action)="row"
            >
              <span :id="`tooltip-update-${row.item._id}`">
                <b-button
                  size="sm"
                  variant="primary"
                  class="mr-1"
                  :disabled="
                    $auth.user.role !== SYSADMIN && row.item.school === null
                  "
                  @click="updateActivity(row.item)"
                  >Cập nhật</b-button
                >
              </span>
              <b-tooltip
                v-if="$auth.user.role !== SYSADMIN && row.item.school === null"
                :target="`tooltip-update-${row.item._id}`"
                triggers="hover"
              >
                Đây là bài tập mặc định của hệ thống
              </b-tooltip>
              <span :id="`tooltip-delete-${row.item._id}`">
                <b-button
                  size="sm"
                  variant="danger"
                  class="mr-1"
                  :disabled="
                    $auth.user.role !== SYSADMIN && row.item.school === null
                  "
                  @click="deleteActivity(row.item)"
                >
                  Xoá
                </b-button>
              </span>
              <b-tooltip
                v-if="$auth.user.role !== SYSADMIN && row.item.school === null"
                :target="`tooltip-delete-${row.item._id}`"
                triggers="hover"
              >
                Đây là bài tập mặc định của hệ thống
              </b-tooltip>
            </template>
          </b-table>
          <b-pagination
            v-model="curPage"
            :total-rows="totalRows"
            :per-page="limit"
            class="justify-content-end"
            pills
          ></b-pagination>
        </b-overlay>
      </template>
    </content-card>

    <activity-modal ref="modal" :on-action-success="reloadData" />
  </div>
</template>

<script>
import { ACTIVE, PENDING, STATUS } from '~/constants/status.constant'
import NotifyMixin from '~/components/base/form/NotifyMixin'
import { ERROR_CODES } from '~/constants/error-code.constants'
import { ADMIN, SYSADMIN } from '~/constants/role.constant'

export default {
  name: 'ActivityPage',
  mixins: [NotifyMixin],
  data() {
    return {
      activities: [],
      curPage: 1,
      keyword: '',
      totalRows: 0,
      limit: 10,
      params: '',
      isLoading: false,
      delay: null,
      sortBy: 'name',
      sortType: 'asc',
    }
  },

  head() {
    return {
      title: 'Activities',
    }
  },

  computed: {
    STATUS() {
      return STATUS
    },
    SYSADMIN() {
      return SYSADMIN
    },
    ADMIN() {
      return ADMIN
    },
    fields() {
      if (this.$auth.user.role === ADMIN || this.$auth.user.role === SYSADMIN) {
        return [
          {
            key: 'idx',
            label: 'STT',
            thStyle: { width: '3%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'name',
            label: 'Tên hoạt động',
            sortable: true,
            thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'metIdx',
            label: 'Chỉ số MET',
            thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'action',
            label: 'Hành động',
            thStyle: { width: '15%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
        ]
      } else {
        return [
          {
            key: 'idx',
            label: 'STT',
            thStyle: { width: '3%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'name',
            label: 'Tên hoạt động',
            sortable: true,
            thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'metIdx',
            label: 'Chỉ số MET',
            thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
        ]
      }
    },
  },

  watch: {
    curPage: {
      async handler(value) {
        this.params = `offset=${(value - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${
          this.sortType
        }`
        await this.loadActivities()
      },
    },
    keyword: {
      async handler(value) {
        this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${value}&sortBy=${this.sortBy}&sortType=${this.sortType}`
        await this.loadActivities()
      },
    },
  },

  created() {
    this.loadActivities()
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))
  },

  methods: {
    show() {
      this.$refs.modal.show()
    },

    async reloadData() {
      await this.loadActivities()
    },

    async loadActivities() {
      this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        this.limit
      }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${this.sortType}`
      try {
        const { data } = await this.$axios.get(`/activities?${this.params}`)
        this.isLoading = true
        await this.delay(500)
        this.activities = data.results
        this.totalRows = data.total
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    updateActivity(food) {
      this.$refs.modal.show(food)
    },

    deleteActivity(food) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa bài tập "${food.name}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/activities/' + food._id)
            this.$notifySuccess(this.notifyTitle, 'Xoá bài tập thành công!')
            await this.reloadData()
          }
        })
        .catch((e) => {
          if (e.response) {
            if (e.response.status === 422) {
              this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
            } else if (e.response.status === 500) {
              this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
            } else {
              this.$notifyTryAgain(
                this.notifyTitle,
                ERROR_CODES.get(e.response.data.code)
              )
            }
          } else {
            this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
          }
        })
    },

    getStatusClass(status) {
      return status === ACTIVE
        ? 'text-success'
        : status === PENDING
        ? 'text-danger'
        : 'text-warning'
    },
  },
}
</script>

<style lang="scss">
@import './assets/sass/init';
th {
  vertical-align: middle !important;
}

td {
  vertical-align: middle !important;
}
</style>
