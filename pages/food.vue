<template>
  <div>
    <content-card title="Danh sách món ăn">
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
            :busy="isLoading"
            :current-page="curPage"
            :fields="fields"
            :items="foods"
            :per-page="0"
            bordered
            head-variant="light"
            hover
            responsive
            show-empty
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
                  :disabled="
                    $auth.user.role !== SYSADMIN && row.item.school === null
                  "
                  class="mr-1"
                  size="sm"
                  variant="primary"
                  @click="updateFood(row.item)"
                  >Cập nhật</b-button
                >
              </span>
              <b-tooltip
                v-if="$auth.user.role !== SYSADMIN && row.item.school === null"
                :target="`tooltip-update-${row.item._id}`"
                triggers="hover"
              >
                Đây là món ăn mặc định của hệ thống
              </b-tooltip>
              <span :id="`tooltip-delete-${row.item._id}`">
                <b-button
                  :disabled="
                    $auth.user.role !== SYSADMIN && row.item.school === null
                  "
                  class="mr-1"
                  size="sm"
                  variant="danger"
                  @click="deleteFood(row.item)"
                >
                  Xoá
                </b-button>
              </span>
              <b-tooltip
                v-if="$auth.user.role !== SYSADMIN && row.item.school === null"
                :target="`tooltip-delete-${row.item._id}`"
                triggers="hover"
              >
                Đây là món ăn mặc định của hệ thống
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

    <food-modal ref="modal" :on-action-success="reloadData" />
  </div>
</template>

<script>
import { ACTIVE, PENDING, STATUS } from '~/constants/status.constant'
import NotifyMixin from '~/components/base/form/NotifyMixin'
import { ERROR_CODES } from '~/constants/error-code.constants'
import { ADMIN, SYSADMIN } from '~/constants/role.constant'

export default {
  name: 'FoodsPage',
  mixins: [NotifyMixin],
  data() {
    return {
      foods: [],
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
      title: 'Foods',
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
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'name',
            label: 'Tên món ăn',
            sortable: true,
            thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'power',
            label: 'Năng lượng (kcal)',
            thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'protein',
            label: 'Protein (g)',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'lipid',
            label: 'Lipid (g)',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'glucid',
            label: 'Glucid (g)',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'ca',
            label: 'Canxi (mg)',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'fe',
            label: 'Sắt (mg)',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'zn',
            label: 'Kẽm (mg)',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'fiber',
            label: 'Chất xơ (g)',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
          },
          {
            key: 'action',
            label: 'Hành động',
            thStyle: { width: '25%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true, 'align-middle': true },
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
            label: 'Tên món ăn',
            sortable: true,
            thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'power',
            label: 'Năng lượng',
            thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'protein',
            label: 'Protein',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'lipid',
            label: 'Lipid',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'glucid',
            label: 'Glucid',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'ca',
            label: 'Canxi',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'fe',
            label: 'Sắt',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'zn',
            label: 'Kẽm',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
            tdClass: { 'text-center': true },
          },
          {
            key: 'fiber',
            label: 'Chất xơ',
            thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
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
        await this.loadFoods()
      },
    },
    keyword: {
      async handler(value) {
        this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${value}&sortBy=${this.sortBy}&sortType=${this.sortType}`
        await this.loadFoods()
      },
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    this.loadFoods()
  },

  methods: {
    show() {
      this.$refs.modal.show()
    },

    async reloadData() {
      await this.loadFoods()
    },

    async loadFoods() {
      this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        this.limit
      }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${this.sortType}`
      this.isLoading = true
      await this.delay(500)
      try {
        const { data } = await this.$axios.get(`/foods?${this.params}`)

        this.foods = data.results
        this.totalRows = data.total
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    updateFood(food) {
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
            this.$notifySuccess(this.notifyTitle, 'Xoá món ăn thành công!')
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
