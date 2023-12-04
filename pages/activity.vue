<template>
  <div>
    <content-card title="Danh sách bài tập">
      <template #toolbar>
        <b-button
          v-if="$auth.user.role === ADMIN || $auth.user.role === SYSADMIN"
          size="sm"
          variant="primary"
          @click="show"
        >
          <i class="flaticon2-plus"></i> Thêm mới
        </b-button>
      </template>
      <template #body>
        <b-overlay
          :show="isLoading"
          rounded="sm"
          spinner-small
          spinner-type="grow"
          spinner-variant="primary"
        >
          <div class="row align-items-end mb-8">
            <div class="col-5">
              <div>
                <label class="font-weight-bold font-size-lg"
                  >Mức vận động</label
                >
              </div>
              <el-select
                v-model="selectedLevel"
                :placeholder="'Chọn mức vận động'"
                class="pr-5"
                value-key="_id"
              >
                <el-option
                  v-for="item in levelOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <b-input-group class="ml-auto mr-4 h-100" style="width: 250px">
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
          </div>

          <b-table
            ref="table"
            :busy="isLoading"
            :current-page="curPage"
            :fields="fields"
            :items="activities"
            :per-page="0"
            bordered
            head-variant="light"
            hover
            show-empty
            thead-class="font-weight-bold font-size-lg text-center"
          >
            <template #empty>
              <h4 class="text-center">Không có dữ liệu</h4>
            </template>

            <template #cell(idx)="row">
              {{ ++row.index + limit * (curPage - 1) }}
            </template>

            <template #cell(level)="row">
              <span>{{ ACTIVITY_LEVEL.get(row.item.level) }}</span>
            </template>

            <template
              v-if="$auth.user.role === SYSADMIN || $auth.user.role === ADMIN"
              #cell(action)="row"
            >
              <span :id="`tooltip-update-${row.item._id}`">
                <b-button
                  :disabled="
                    $auth.user.role !== SYSADMIN && row.item.school === null
                  "
                  class="mr-1"
                  size="sm"
                  variant="primary"
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
                  :disabled="
                    $auth.user.role !== SYSADMIN && row.item.school === null
                  "
                  class="mr-1"
                  size="sm"
                  variant="danger"
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
            :per-page="limit"
            :total-rows="totalRows"
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
import {
  ACTIVITY_LEVEL,
  HEAVY,
  LIGHT,
  MODERATE,
} from '~/constants/level.constant'

export default {
  name: 'ActivityPage',
  mixins: [NotifyMixin],
  data() {
    return {
      activities: [],
      selectedLevel: '',
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
    ACTIVITY_LEVEL() {
      return ACTIVITY_LEVEL
    },
    STATUS() {
      return STATUS
    },
    SYSADMIN() {
      return SYSADMIN
    },
    ADMIN() {
      return ADMIN
    },
    levelOptions() {
      return [
        {
          value: '',
          label: 'Tất cả',
          key: 'all',
        },
        {
          value: HEAVY,
          label: ACTIVITY_LEVEL.get(HEAVY),
          key: HEAVY,
        },
        {
          value: MODERATE,
          label: ACTIVITY_LEVEL.get(MODERATE),
          key: MODERATE,
        },
        {
          value: LIGHT,
          label: ACTIVITY_LEVEL.get(LIGHT),
          key: LIGHT,
        },
      ]
    },
    fields() {
      const defaultActivityField = [
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
        },
        {
          key: 'metIdx',
          label: 'Chỉ số MET',
          thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
        {
          key: 'level',
          label: 'Mức vận động',
          thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
      ]

      if (this.$auth.user.role === ADMIN || this.$auth.user.role === SYSADMIN) {
        return [
          ...defaultActivityField,
          {
            key: 'action',
            label: 'Hành động',
            thStyle: { width: '15%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
        ]
      } else {
        return [...defaultActivityField]
      }
    },
  },

  watch: {
    curPage: {
      async handler(value) {
        this.params = `offset=${(value - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${this.keyword}&level=${this.selectedLevel}&sortBy=${
          this.sortBy
        }&sortType=${this.sortType}`
        await this.loadActivities()
      },
    },
    keyword: {
      async handler(value) {
        // this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        //   this.limit
        // }$level=${this.selectedLevel}&keyword=${value}&sortBy=${this.sortBy}&sortType=${this.sortType}`
        // console.log('watch keyword', this.params)
        this.curPage = 1
        await this.loadActivities()
      },
    },
    selectedLevel: {
      async handler(value) {
        this.curPage = 1
        // this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        //   this.limit
        // }&level=${this.selectedLevel}&keyword=${value}&sortBy=${this.sortBy}&sortType=${this.sortType}`
        // console.log('watch level', this.params)
        await this.loadActivities()
      },
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    this.loadActivities()
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
      }&keyword=${this.keyword}&level=${this.selectedLevel}&sortBy=${
        this.sortBy
      }&sortType=${this.sortType}`
      this.isLoading = true
      await this.delay(500)

      try {
        const { data } = await this.$axios.get(`/activities?${this.params}`)

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
